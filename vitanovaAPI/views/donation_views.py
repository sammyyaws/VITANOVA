from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError

from ..serializers.blood_donation_serializer import BloodDonationSerializer
from ..services.donation_service import DonationService


class DonationAPIView(APIView):

    def post(self, request):

        serializer = BloodDonationSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        try:

            donation = DonationService.receive_donation(
                donor=serializer.validated_data["donor"],
                organisation=serializer.validated_data["organisation"],
                blood_group=serializer.validated_data["blood_group"],
                quantity_units=serializer.validated_data["quantity_units"],
                donation_date=serializer.validated_data["donation_date"],
                expiry_date=serializer.validated_data["expiry_date"],
                health_check_status=serializer.validated_data["health_check_status"],
                performed_by=request.user,
                notes=serializer.validated_data.get("notes"),
            )

            return Response(
                {
                    "message": "Blood donation recorded successfully.",
                    "donation_id": donation["donation"].donation_id,
                },
                status=status.HTTP_201_CREATED,
            )

        except ValidationError as e:

            return Response(
                {"detail": e.message},
                status=status.HTTP_400_BAD_REQUEST,
            )