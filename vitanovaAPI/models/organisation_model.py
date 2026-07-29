from django.db import models
from .location_models import Location
import uuid


class Organisation(models.Model):

    HOSPITAL = "hospital"
    BLOOD_BANK = "blood_bank"

    ORGANIZATION_TYPES = [
        (HOSPITAL, "Hospital"),
        (BLOOD_BANK, "Blood Bank"),
    ]

    organization_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(
        max_length=255,
        unique=True
    )

    organization_type = models.CharField(
        max_length=20,
        choices=ORGANIZATION_TYPES
    )

    email = models.EmailField(
        unique=True
    )

    phone_number = models.CharField(
        max_length=20,
        unique=True
    )

    registration_number = models.CharField(
        max_length=100,
        unique=True
    )

    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="organizations"
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    def __str__(self):
        return self.name