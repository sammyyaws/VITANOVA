from rest_framework import serializers
from ..models.inventory_model import Inventory,InventoryTransaction


class InventorySerializer(serializers.ModelSerializer):

    class Meta:

        model = Inventory

        fields = [
            "inventory_id",
            "organisation",
            "blood_group",
            "quantity_units",
            "quantity_ml",
            "donation_date",
            "expiry_date",
            "status",
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