from rest_framework import serializers

from ..models.patient_bloodRequest_models import PatientBloodRequest


class PatientBloodRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientBloodRequest
        fields = "__all__"

        read_only_fields = (
            "request_id",
            "status",
            "created_at",
            "updated_at",
        )