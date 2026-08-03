from django.db import transaction
from django.core.exceptions import ValidationError

from ..models.blood_donation_model import BloodDonation

from .inventory_service import InventoryService


class DonationService:
    """
    Handles blood donation workflows.
    """


    @staticmethod
    @transaction.atomic
    def receive_donation(
        *,
        donor,
        organisation,
        blood_group,
        quantity_units,
        donation_date,
        expiry_date,
        health_check_status,
        performed_by=None,
        notes=None,
    ):
        """
        Process a complete blood donation.

        Flow:

        BloodDonation
              |
              |
              v
        Inventory Update
              |
              |
              v
        InventoryTransaction
        """


        if quantity_units <= 0:

            raise ValidationError(
                "Donation quantity must be greater than zero."
            )


        # 1. Create donation record

        donation = BloodDonation.objects.create(

            donor=donor,

            organisation=organisation,

            blood_group=blood_group,

            quantity_units=quantity_units,

            quantity_ml=quantity_units * 450,

            donation_date=donation_date,

            health_check_status=health_check_status,

            notes=notes

        )


        # 2. Add blood to inventory

        inventory = InventoryService.add_stock(

            organisation=organisation,

            blood_group=blood_group,

            quantity_units=quantity_units,

            donation_date=donation_date,

            expiry_date=expiry_date,

            performed_by=performed_by,

            transaction_type="DONATION",

            reference_number=str(
                donation.donation_id
            ),

            notes=(
                f"Donation from "
                f"{donor.user.first_name}"
            )

        )


        return {
            "donation": donation,
            "inventory": inventory
        }