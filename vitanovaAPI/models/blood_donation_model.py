from django.db import models
from .donor_models import Donor
from .organisation_model import Organisation


class BloodDonation(models.Model):

    BLOOD_GROUP_CHOICES = (
        ("A+", "A+"),
        ("A-", "A-"),
        ("B+", "B+"),
        ("B-", "B-"),
        ("AB+", "AB+"),
        ("AB-", "AB-"),
        ("O+", "O+"),
        ("O-", "O-"),
    )


    HEALTH_STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("PASSED", "Passed"),
        ("FAILED", "Failed"),
    )


    donation_id = models.AutoField(
        primary_key=True
    )


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


    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES
    )


    quantity_units = models.PositiveIntegerField(
        default=1
    )


    quantity_ml = models.PositiveIntegerField(
        default=450
    )


    donation_date = models.DateField()


    expiry_date = models.DateField()


    health_check_status = models.CharField(
        max_length=20,
        choices=HEALTH_STATUS_CHOICES,
        default="PENDING"
    )


    notes = models.TextField(
        blank=True,
        null=True
    )