from rest_framework import serializers
from ..models.organisation_model import Organisation


class OrganizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = [
            "organization_id",
            "name",
            "organization_type",
            "email",
            "phone_number",
            "registration_number",
            "location",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "organization_id",
            "created_at",
            "updated_at",
        ]