from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models.donor_match_model import DonorMatch
from ..serializers.donor_match_serializer import DonorMatchSerializer
from ..models.patient_bloodRequest_models import PatientBloodRequest


class DonorMatchListView(generics.ListAPIView):
    """
    Returns all donor matches for a specific patient blood request.
    """

    serializer_class = DonorMatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        request_id = self.kwargs.get("pk")

        return DonorMatch.objects.filter(
            patient_request_id=request_id
        ).select_related(
            "donor",
            "patient_request"
        )