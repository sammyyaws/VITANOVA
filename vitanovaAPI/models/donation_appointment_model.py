from django.db import models

from .patient_bloodRequest_models import PatientBloodRequest
from .donor_models import Donor
from .organisation_model import Organisation


class DonationAppointment(models.Model):

    STATUS_CHOICES = (
        ("SCHEDULED", "Scheduled"),
        ("COMPLETED", "Completed"),
        ("MISSED", "Missed"),
        ("CANCELLED", "Cancelled"),
    )

    appointment_id = models.AutoField(primary_key=True)

    patient_request = models.ForeignKey(
        PatientBloodRequest,
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    donor = models.ForeignKey(
        Donor,
        on_delete=models.CASCADE
    )

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE
    )

    appointment_date = models.DateTimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="SCHEDULED"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Donation_Appointment"

    def __str__(self):
        return f"Appointment {self.appointment_id}"