from django.db import models

from .patient_bloodRequest_models import PatientBloodRequest
from .donor_models import Donor


class DonorMatch(models.Model):

    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("ACCEPTED", "Accepted"),
        ("DECLINED", "Declined"),
        ("EXPIRED", "Expired"),
    )

    match_id = models.AutoField(primary_key=True)

    patient_request = models.ForeignKey(
        PatientBloodRequest,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    donor = models.ForeignKey(
        Donor,
        on_delete=models.CASCADE,
        related_name="matched_requests"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    match_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Donor_Match"

    def __str__(self):
        return f"{self.patient_request.request_id} - {self.donor.user.first_name}"