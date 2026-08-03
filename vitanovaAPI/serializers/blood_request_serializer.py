from rest_framework import serializers
from ..models.blood_request_model import BloodRequest


class BloodRequestSerializer(serializers.ModelSerializer):

    class Meta:

        model = BloodRequest

        fields = [
            "request_id",
            "organisation",
            "blood_group_needed",
            "quantity_units",
            "urgency_level",
            "request_status",
            "request_time",
            "required_by_time",
        ]


        read_only_fields = [
            "request_id",
            "request_time",
        ]