from rest_framework import serializers

from ..models.blood_donation_model import Donation


class DonationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation
        fields = "__all__"
        read_only_fields = [
            "donation_id",
        ]