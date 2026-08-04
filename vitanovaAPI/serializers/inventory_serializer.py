from rest_framework import serializers
from ..models.inventory_model import Inventory,InventoryTransaction,InventoryReservation


class InventorySerializer(serializers.ModelSerializer):

    class Meta:

        model = Inventory

        fields = [
    "inventory_id",
    "organisation",
    "batch_number",
    "blood_group",
    "quantity_units",
    "unit_volume_ml",
    "donation_date",
    "expiry_date",
    "status",
    "notes",
    "created_at",
    "updated_at",
]


        read_only_fields = [
            "inventory_id",
            "created_at",
            "updated_at",
        ]






class InventoryTransactionSerializer(serializers.ModelSerializer):

    class Meta:

        model = InventoryTransaction

        fields = "__all__"


        read_only_fields = [
            "transaction_id",
            "created_at",
        ]



class InventoryReservationSerializer(serializers.ModelSerializer):

    class Meta:

        model = InventoryReservation

        fields = "__all__"

        read_only_fields = [
            "reservation_id",
            "created_at",
        ]