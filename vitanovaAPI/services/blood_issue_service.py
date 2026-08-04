from django.db import transaction
from django.core.exceptions import ValidationError

from ..models.blood_issue_model import BloodIssue
from ..models.blood_request_model import BloodRequest
from .inventory_service import InventoryService


class BloodIssueService:
    """
    Handles issuing reserved blood to hospitals.
    """

    @staticmethod
    @transaction.atomic
    def issue_blood(
        *,
        blood_request,
        issued_by=None,
        notes=None
    ):

        if blood_request.request_status != "RESERVED":
            raise ValidationError(
                "Only reserved requests can be issued."
            )

        reservations = blood_request.reservations.filter(
            status="ACTIVE"
        )

        if not reservations.exists():
            raise ValidationError(
                "No active reservation found."
            )

        issues = []

        for reservation in reservations:

            InventoryService.complete_reservation(
                reservation=reservation,
                performed_by=issued_by,
                notes=notes
            )

            issue = BloodIssue.objects.create(
                blood_request=blood_request,
                organisation=blood_request.organisation,
                inventory=reservation.inventory,
                quantity_units=reservation.quantity_units,
                issued_by=issued_by,
                notes=notes
            )

            issues.append(issue)

        blood_request.request_status = "COMPLETED"

        blood_request.save(
            update_fields=["request_status"]
        )

        return issues