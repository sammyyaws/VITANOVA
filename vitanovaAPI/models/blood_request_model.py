from django.db import models

from .organisation_model import Organisation


class BloodRequest(models.Model):

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

    URGENCY_CHOICES = (
        ("ROUTINE", "Routine"),
        ("EMERGENCY", "Emergency"),
    )

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Completed", "Completed"),
        ("Rejected", "Rejected"),
    )

    request_id = models.AutoField(primary_key=True)

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="blood_requests"
    )

    blood_group_needed = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES
    )

    quantity_units = models.PositiveIntegerField()

    urgency_level = models.CharField(
        max_length=20,
        choices=URGENCY_CHOICES
    )

    request_status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    request_time = models.DateTimeField(auto_now_add=True)

    required_by_time = models.DateTimeField()

    class Meta:
        db_table = "Blood_Request"

    def __str__(self):
        return f"{self.organisation.name} - {self.blood_group_needed}"