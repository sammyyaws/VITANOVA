from django.db import models

from .donor_models import Donor
from .organisation_model import Organisation


class BloodDonation(models.Model):

    donation_id = models.AutoField(primary_key=True)

    donor = models.ForeignKey(
        Donor,
        on_delete=models.CASCADE,
        related_name="blood_donations"
    )

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="blood_donations"
    )

    blood_group = models.CharField(max_length=3)

    quantity_ml = models.PositiveIntegerField()

    donation_date = models.DateField()

    health_check_status = models.CharField(max_length=50)

    notes = models.TextField(
        blank=True,
        null=True
    )

    class Meta:
        db_table = "Blood_Donation"

    def __str__(self):
        return f"{self.donor.user.first_name} - {self.blood_group}"