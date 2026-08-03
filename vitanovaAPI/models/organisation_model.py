from django.db import models
from .location_models import Location
import uuid


class Organisation(models.Model):

    HOSPITAL = "hospital"
    BLOOD_BANK = "blood_bank"

    ORGANISATION_TYPES = [
        (HOSPITAL, "Hospital"),
        (BLOOD_BANK, "Blood Bank"),
    ]

    organisation_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(
        max_length=255,
        unique=True
    )

    organisation_type = models.CharField(
        max_length=20,
        choices=ORGANISATION_TYPES
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
        related_name="organisations"
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



class OrganisationPartner(models.Model):

    partnership_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="partners"
    )


    partner = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="partnered_with"
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "organisation",
                    "partner"
                ],
                name="unique_organisation_partner"
            ),

            models.CheckConstraint(
                condition=~models.Q(
                    organisation=models.F("partner")
                ),
                name="organisation_cannot_partner_with_self"
            )

        ]


    def __str__(self):
        return (
            f"{self.organisation.name} "
            f"<-> "
            f"{self.partner.name}"
        )