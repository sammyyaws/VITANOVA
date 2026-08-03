from django.db import models
from .organisation_model import Organisation
import uuid


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
        ("AVAILABLE", "Available"),
        ("RESERVED", "Reserved"),
        ("EXPIRED", "Expired"),
        ("DISCARDED", "Discarded"),
    )

    inventory_id = models.AutoField(
        primary_key=True
    )

    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="inventory"
    )

    batch_number = models.CharField(
        max_length=50,
        unique=True,
        editable=False
    )

    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES
    )

    quantity_units = models.PositiveIntegerField(
        default=1
    )

    unit_volume_ml = models.PositiveIntegerField(
        default=450,
        help_text="Volume of a single blood unit (ml)."
    )

    donation_date = models.DateField()

    expiry_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="AVAILABLE"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "Inventory"
        ordering = ["expiry_date"]

    def save(self, *args, **kwargs):

        if not self.batch_number:
            self.batch_number = f"BN-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"{self.organisation.name} | "
            f"{self.blood_group} | "
            f"{self.quantity_units} units"
        )




# inventory transaction model 
from django.db import models

from .inventory_model import Inventory
from .user_models import User


class InventoryTransaction(models.Model):

    DONATION = "DONATION"
    REQUEST = "REQUEST"
    TRANSFER_IN = "TRANSFER_IN"
    TRANSFER_OUT = "TRANSFER_OUT"
    ADJUSTMENT = "ADJUSTMENT"
    EXPIRED = "EXPIRED"

    TRANSACTION_TYPES = (
        (DONATION, "Donation"),
        (REQUEST, "Blood Request"),
        (TRANSFER_IN, "Transfer In"),
        (TRANSFER_OUT, "Transfer Out"),
        (ADJUSTMENT, "Manual Adjustment"),
        (EXPIRED, "Expired"),
    )

    transaction_id = models.AutoField(
        primary_key=True
    )

    inventory = models.ForeignKey(
        Inventory,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPES
    )

    quantity_units = models.PositiveIntegerField()

    performed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="inventory_transactions"
    )

    reference_number = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        db_table = "Inventory_Transaction"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.inventory.batch_number} - "
            f"{self.transaction_type}"
        )