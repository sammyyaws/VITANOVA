from django.db import transaction
from django.core.exceptions import ValidationError

from ..models.blood_request_model import BloodRequest
from .inventory_service import InventoryService


class BloodRequestService:
    """
    Handles hospital blood requests.
    """

    @staticmethod
    @transaction.atomic
    def create_request(
        *,
        organisation,
        blood_group_needed,
        quantity_units,
        urgency_level,
        required_by_time
    ):

        if quantity_units <= 0:
            raise ValidationError(
                "Quantity must be greater than zero."
            )

        request = BloodRequest.objects.create(
            organisation=organisation,
            blood_group_needed=blood_group_needed,
            quantity_units=quantity_units,
            urgency_level=urgency_level,
            required_by_time=required_by_time,
            request_status="PENDING"
        )

        return request


    @staticmethod
    @transaction.atomic
    def reserve_request(
        *,
        blood_request,
        performed_by=None
    ):

        if blood_request.request_status != "PENDING":
            raise ValidationError(
                "Request cannot be reserved."
            )

        reservations = InventoryService.reserve_blood(
            blood_request=blood_request,
            organisation=blood_request.organisation,
            blood_group=blood_request.blood_group_needed,
            quantity_units=blood_request.quantity_units,
            performed_by=performed_by,
            notes=f"Reservation for request {blood_request.request_id}"
        )

        blood_request.request_status = "RESERVED"
        blood_request.save(
            update_fields=["request_status"]
        )

        return {
            "request": blood_request,
            "reservations": reservations
        }


    @staticmethod
    @transaction.atomic
    def cancel_request(
        *,
        blood_request
    ):

        if blood_request.request_status == "COMPLETED":
            raise ValidationError(
                "Completed request cannot be cancelled."
            )

        blood_request.request_status = "CANCELLED"

        blood_request.save(
            update_fields=["request_status"]
        )

        return blood_request