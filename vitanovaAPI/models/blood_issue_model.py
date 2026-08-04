from django.db import models

from .organisation_model import Organisation
from .blood_request_model import BloodRequest
from .inventory_model import Inventory
from .user_models import User


class BloodIssue(models.Model):


    issue_id = models.AutoField(
        primary_key=True
    )


    blood_request = models.ForeignKey(
        BloodRequest,
        on_delete=models.CASCADE,
        related_name="issues"
    )


    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="blood_issues"
    )


    inventory = models.ForeignKey(
        Inventory,
        on_delete=models.PROTECT,
        related_name="blood_issues"
    )


    quantity_units = models.PositiveIntegerField()


    issued_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="issued_blood"
    )


    issue_date = models.DateTimeField(
        auto_now_add=True
    )


    notes = models.TextField(
        blank=True,
        null=True
    )


    def __str__(self):

        return (
            f"Issue #{self.issue_id} - "
            f"{self.quantity_units} units"
        )