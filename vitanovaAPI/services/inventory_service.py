from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Sum

from ..models.inventory_model import Inventory, InventoryReservation, InventoryTransaction


class InventoryService:
    """
    Handles all inventory operations.

    All inventory changes must go through this service.
    """

    @staticmethod
    @transaction.atomic
    def add_stock(
        *,
        organisation,
        blood_group,
        quantity_units,
        donation_date,
        expiry_date,
        performed_by=None,
        transaction_type=InventoryTransaction.DONATION,
        reference_number=None,
        notes=None,
        unit_volume_ml=450,
    ):
        if quantity_units <= 0:
            raise ValidationError("Quantity must be greater than zero.")

        inventory = (
            Inventory.objects.select_for_update()
            .filter(
                organisation=organisation,
                blood_group=blood_group,
                expiry_date=expiry_date,
                status="AVAILABLE",
            )
            .first()
        )

        if inventory:
            inventory.quantity_units += quantity_units
            inventory.save(update_fields=["quantity_units", "updated_at"])
        else:
            inventory = Inventory.objects.create(
                organisation=organisation,
                blood_group=blood_group,
                quantity_units=quantity_units,
                donation_date=donation_date,
                expiry_date=expiry_date,
                unit_volume_ml=unit_volume_ml,
                status="AVAILABLE",
                notes=notes,
            )

        InventoryTransaction.objects.create(
            inventory=inventory,
            transaction_type=transaction_type,
            quantity_units=quantity_units,
            performed_by=performed_by,
            reference_number=reference_number,
            notes=notes,
        )

        return inventory

    @staticmethod
    @transaction.atomic
    def reserve_blood(
        *,
        blood_request,
        organisation,
        blood_group,
        quantity_units,
        performed_by=None,
        expires_at=None,
        notes=None,
    ):
        """
        Reserve blood without removing it.

        Uses FIFO:
        earliest expiry batches are reserved first.
        """
        if quantity_units <= 0:
            raise ValidationError("Quantity must be greater than zero.")

        remaining = quantity_units
        inventories = (
            Inventory.objects.select_for_update()
            .filter(
                organisation=organisation,
                blood_group=blood_group,
                status="AVAILABLE",
                quantity_units__gt=0,
            )
            .order_by("expiry_date")
        )

        reservations = []

        for inventory in inventories:
            if remaining <= 0:
                break

            reserved_amount = (
                InventoryReservation.objects.filter(
                    inventory=inventory,
                    status="ACTIVE",
                )
                .aggregate(total=Sum("quantity_units"))["total"]
                or 0
            )

            available = inventory.quantity_units - reserved_amount

            if available <= 0:
                continue

            units = min(available, remaining)

            reservation = InventoryReservation.objects.create(
                blood_request=blood_request,
                inventory=inventory,
                quantity_units=units,
                expires_at=expires_at,
                notes=notes,
            )

            InventoryTransaction.objects.create(
                inventory=inventory,
                transaction_type=InventoryTransaction.RESERVATION,
                quantity_units=units,
                performed_by=performed_by,
                reference_number=str(blood_request.request_id),
                notes="Blood reserved.",
            )

            reservations.append(reservation)
            remaining -= units

        if remaining > 0:
            raise ValidationError("Not enough blood available.")

        return reservations

    @staticmethod
    @transaction.atomic
    def complete_reservation(
        *,
        reservation,
        performed_by=None,
        notes=None,
    ):
        """
        Convert reserved blood into issued blood.
        """
        reservation = InventoryReservation.objects.select_for_update().get(
            reservation_id=reservation.reservation_id
        )

        if reservation.status != "ACTIVE":
            raise ValidationError("Reservation is not active.")

        inventory = Inventory.objects.select_for_update().get(
            inventory_id=reservation.inventory.inventory_id
        )

        if inventory.quantity_units < reservation.quantity_units:
            raise ValidationError("Insufficient inventory.")

        inventory.quantity_units -= reservation.quantity_units
        inventory.save(update_fields=["quantity_units", "updated_at"])

        reservation.status = "COMPLETED"
        reservation.save(update_fields=["status"])

        InventoryTransaction.objects.create(
            inventory=inventory,
            transaction_type=InventoryTransaction.REQUEST,
            quantity_units=reservation.quantity_units,
            performed_by=performed_by,
            reference_number=str(reservation.blood_request.request_id),
            notes=notes or "Blood issued.",
        )

        return inventory

    @staticmethod
    @transaction.atomic
    def cancel_reservation(
        *,
        reservation,
        performed_by=None,
        notes=None,
    ):
        reservation = InventoryReservation.objects.select_for_update().get(
            reservation_id=reservation.reservation_id
        )

        if reservation.status != "ACTIVE":
            raise ValidationError("Reservation cannot be cancelled.")

        reservation.status = "CANCELLED"
        reservation.save(update_fields=["status"])

        InventoryTransaction.objects.create(
            inventory=reservation.inventory,
            transaction_type=InventoryTransaction.RESERVATION_RELEASE,
            quantity_units=reservation.quantity_units,
            performed_by=performed_by,
            reference_number=str(reservation.blood_request.request_id),
            notes=notes or "Reservation cancelled.",
        )

        return reservation

    @staticmethod
    @transaction.atomic
    def remove_stock(
        *,
        inventory,
        quantity_units,
        performed_by=None,
        transaction_type=InventoryTransaction.REQUEST,
        reference_number=None,
        notes=None,
    ):
        if quantity_units <= 0:
            raise ValidationError("Quantity must be greater than zero.")

        inventory = Inventory.objects.select_for_update().get(
            inventory_id=inventory.inventory_id
        )

        if inventory.quantity_units < quantity_units:
            raise ValidationError("Insufficient inventory.")

        inventory.quantity_units -= quantity_units
        inventory.save(update_fields=["quantity_units", "updated_at"])

        InventoryTransaction.objects.create(
            inventory=inventory,
            transaction_type=transaction_type,
            quantity_units=quantity_units,
            performed_by=performed_by,
            reference_number=reference_number,
            notes=notes,
        )

        return inventory

    @staticmethod
    @transaction.atomic
    def adjust_stock(
        *,
        inventory,
        new_quantity,
        performed_by=None,
        notes=None,
    ):
        if new_quantity < 0:
            raise ValidationError("Quantity cannot be negative.")

        inventory.quantity_units = new_quantity
        inventory.save()

        InventoryTransaction.objects.create(
            inventory=inventory,
            transaction_type=InventoryTransaction.ADJUSTMENT,
            quantity_units=new_quantity,
            performed_by=performed_by,
            notes=notes,
        )

        return inventory

    @staticmethod
    @transaction.atomic
    def expire_inventory(
        *,
        inventory,
        performed_by=None,
        notes=None,
    ):
        inventory.status = "EXPIRED"
        inventory.save(update_fields=["status", "updated_at"])

        InventoryTransaction.objects.create(
            inventory=inventory,
            transaction_type=InventoryTransaction.EXPIRED,
            quantity_units=inventory.quantity_units,
            performed_by=performed_by,
            notes=notes or "Inventory expired.",
        )

        return inventory