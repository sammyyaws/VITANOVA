from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models.inventory_model import Inventory, InventoryTransaction
from ..serializers.inventory_serializer import (
    InventorySerializer,
    InventoryTransactionSerializer,
)


class InventoryListView(ListAPIView):

    serializer_class = InventorySerializer

    queryset = (
        Inventory.objects
        .select_related("organisation")
        .all()
        .order_by(
            "expiry_date"
        )
    )
class InventoryDetailView(RetrieveAPIView):

    serializer_class = InventorySerializer

    queryset = (
        Inventory.objects
        .select_related("organisation")
        .all()
    )

class InventoryTransactionListView(ListAPIView):

    serializer_class = InventoryTransactionSerializer

    queryset = (
        InventoryTransaction.objects
        .select_related(
            "inventory",
            "performed_by"
        )
        .all()
        .order_by("-created_at")
    )