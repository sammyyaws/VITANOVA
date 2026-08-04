from django.db import transaction
from django.core.exceptions import ValidationError

from ..models.blood_donation_model import BloodDonation

from .inventory_service import InventoryService


class DonationService:
    """
    Handles blood donation workflows.

    Flow:

    Donor
      |
      v
    BloodDonation
      |
      v
    Inventory Update
      |
      v
    InventoryTransaction
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

        Creates:
        1. Blood donation record
        2. Inventory stock
        3. Inventory transaction history
        """


        # Validate quantity

        if quantity_units <= 0:

            raise ValidationError(
                "Donation quantity must be greater than zero."
            )


        # Validate expiry date

        if expiry_date <= donation_date:

            raise ValidationError(
                "Expiry date must be after donation date."
            )


        # Prevent failed blood entering inventory

        if health_check_status == "FAILED":

            raise ValidationError(
                "Blood failed health screening and cannot enter inventory."
            )


        # Create donation record

        donation = BloodDonation.objects.create(

            donor=donor,

            organisation=organisation,

            blood_group=blood_group,

            quantity_units=quantity_units,

            quantity_ml=quantity_units * 450,

            donation_date=donation_date,

            expiry_date=expiry_date,

            health_check_status=health_check_status,

            notes=notes

        )


        # Add blood into inventory

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
                f"Blood donation received. "
                f"Donation ID: {donation.donation_id}"
            )

        )


        return {
            "donation": donation,
            "inventory": inventory
        }