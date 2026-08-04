from django.db import models

from .patients_models import Patient
from .organisation_model import Organisation


class PatientBloodRequest(models.Model):

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
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
        ("CRITICAL", "Critical"),
    )

    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("MATCHING", "Matching"),
        ("MATCHED", "Matched"),
        ("DONATION_SCHEDULED", "Donation Scheduled"),
        ("FULFILLED", "Fulfilled"),
        ("CANCELLED", "Cancelled"),
    )

    request_id = models.AutoField(primary_key=True)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="blood_requests"
    )

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="patient_requests"
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

    required_by_date = models.DateTimeField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Patient_Blood_Request"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"Request {self.request_id} - "
            f"{self.patient.user.first_name} "
            f"({self.blood_group_needed})"
        )