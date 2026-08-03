from rest_framework import serializers
from ..models.organisation_model import Organisation,OrganisationPartner

class OrganisationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Organisation

        fields = [
            "organisation_id",
            "name",
            "organisation_type",
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
            "organisation_id",
            "created_at",
            "updated_at",
        ]





class OrganisationPartnerSerializer(serializers.ModelSerializer):

    partner_name = serializers.CharField(
        source="partner.name",
        read_only=True
    )


    class Meta:

        model = OrganisationPartner

        fields = [
            "partnership_id",
            "organisation",
            "partner",
            "partner_name",
            "created_at",
        ]


        read_only_fields = [
            "partnership_id",
            "created_at",
        ]