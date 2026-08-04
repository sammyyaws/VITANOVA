from rest_framework import serializers
from ..models.blood_donation_model import BloodDonation


class BloodDonationSerializer(serializers.ModelSerializer):

    class Meta:

        model = BloodDonation

        fields = "__all__"

        read_only_fields = [
            "donation_id",
        ]

