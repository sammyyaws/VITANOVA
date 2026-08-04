from rest_framework import serializers

from ..models.donation_appointment_model import DonationAppointment


class DonationAppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = DonationAppointment
        fields = "__all__"
        read_only_fields = (
            "appointment_id",
            "created_at",
        )