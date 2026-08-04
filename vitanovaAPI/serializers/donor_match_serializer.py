from rest_framework import serializers

from ..models.donor_match_model import DonorMatch


class DonorMatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = DonorMatch
        fields = "__all__"
        read_only_fields = (
            "match_id",
            "created_at",
        ) 