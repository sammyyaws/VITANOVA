from rest_framework import serializers
from ..models.blood_issue_model import BloodIssue


class BloodIssueSerializer(serializers.ModelSerializer):

    class Meta:

        model = BloodIssue

        fields = "__all__"

        read_only_fields = [
            "issue_id",
            "issue_date",
        ]