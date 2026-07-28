from django.db import models

from .organisation_model import Organisation


class Inventory(models.Model):

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

    STATUS_CHOICES = (
        ("Available", "Available"),
        ("Reserved", "Reserved"),
        ("Expired", "Expired"),
    )

    inventory_id = models.AutoField(primary_key=True)

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="inventory"
    )

    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES
    )

    quantity_ml = models.PositiveIntegerField()

    donation_date = models.DateField()

    expiry_date = models.DateField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Available"
    )

    class Meta:
        db_table = "Inventory"

    def __str__(self):
        return f"{self.blood_group} ({self.quantity_ml}ml)"