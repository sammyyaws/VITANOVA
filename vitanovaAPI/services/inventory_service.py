from django.db import transaction
from django.core.exceptions import ValidationError

from ..models.inventory_model import Inventory, InventoryTransaction


class InventoryService:
    """
    Handles all inventory-related operations.
    All inventory changes should go through this service.
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
        """
        Add blood units to inventory.

        If a batch with the same:
        - organisation
        - blood group
        - expiry date

        exists, increase its quantity.
        Otherwise create a new batch.
        """

        if quantity_units <= 0:
            raise ValidationError(
                "Quantity must be greater than zero."
            )


        inventory = Inventory.objects.filter(
            organisation=organisation,
            blood_group=blood_group,
            expiry_date=expiry_date,
            status="AVAILABLE"
        ).first()


        if inventory:

            inventory.quantity_units += quantity_units

            inventory.save()


        else:

            inventory = Inventory.objects.create(

                organisation=organisation,

                blood_group=blood_group,

                quantity_units=quantity_units,

                donation_date=donation_date,

                expiry_date=expiry_date,

                unit_volume_ml=unit_volume_ml,

                status="AVAILABLE",

                notes=notes
            )


        InventoryTransaction.objects.create(

            inventory=inventory,

            transaction_type=transaction_type,

            quantity_units=quantity_units,

            performed_by=performed_by,

            reference_number=reference_number,

            notes=notes

        )


        return inventory



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
        """
        Remove blood units from inventory.
        """

        if quantity_units <= 0:
            raise ValidationError(
                "Quantity must be greater than zero."
            )


        if inventory.quantity_units < quantity_units:
            raise ValidationError(
                "Insufficient inventory."
            )


        inventory.quantity_units -= quantity_units


        inventory.save()


        InventoryTransaction.objects.create(

            inventory=inventory,

            transaction_type=transaction_type,

            quantity_units=quantity_units,

            performed_by=performed_by,

            reference_number=reference_number,

            notes=notes

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
        """
        Manual inventory correction.
        """

        if new_quantity < 0:

            raise ValidationError(
                "Quantity cannot be negative."
            )


        difference = (
            new_quantity -
            inventory.quantity_units
        )


        inventory.quantity_units = new_quantity

        inventory.save()


        InventoryTransaction.objects.create(

            inventory=inventory,

            transaction_type=InventoryTransaction.ADJUSTMENT,

            quantity_units=abs(difference),

            performed_by=performed_by,

            notes=notes

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
        """
        Mark a blood batch as expired.
        """

        inventory.status = "EXPIRED"

        inventory.save()


        InventoryTransaction.objects.create(

            inventory=inventory,

            transaction_type=InventoryTransaction.EXPIRED,

            quantity_units=inventory.quantity_units,

            performed_by=performed_by,

            notes=notes or "Inventory expired."

        )


        return inventory