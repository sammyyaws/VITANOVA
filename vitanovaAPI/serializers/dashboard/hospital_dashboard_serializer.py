from rest_framework import serializers


class HospitalDashboardSerializer(serializers.Serializer):

    organisation = serializers.DictField()

    cards = serializers.DictField()

    inventory = serializers.ListField()

    active_requests = serializers.ListField()

    partners = serializers.ListField()