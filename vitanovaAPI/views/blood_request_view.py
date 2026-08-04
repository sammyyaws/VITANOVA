from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models.blood_request_model import BloodRequest
from ..serializers.blood_request_serializer import BloodRequestSerializer
from ..services.blood_request_service import BloodRequestService
from ..services.blood_issue_service import BloodIssueService


class BloodRequestListCreateView(ListCreateAPIView):

    queryset = BloodRequest.objects.all().order_by("-request_time")
    serializer_class = BloodRequestSerializer

    def perform_create(self, serializer):

        self.instance = BloodRequestService.create_request(
            organisation=serializer.validated_data["organisation"],
            blood_group_needed=serializer.validated_data["blood_group_needed"],
            quantity_units=serializer.validated_data["quantity_units"],
            urgency_level=serializer.validated_data["urgency_level"],
            required_by_time=serializer.validated_data["required_by_time"],
        )

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:

            self.perform_create(serializer)

            return Response(
                BloodRequestSerializer(self.instance).data,
                status=status.HTTP_201_CREATED,
            )

        except ValidationError as e:

            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

class ReserveBloodRequestView(GenericAPIView):

    queryset = BloodRequest.objects.all()

    def post(self, request, pk):

        blood_request = self.get_object()

        try:

            result = BloodRequestService.reserve_request(
                blood_request=blood_request,
                performed_by=request.user,
            )

            return Response({
                "message": "Blood reserved successfully.",
                "request": BloodRequestSerializer(
                    result["request"]
                ).data
            })

        except ValidationError as e:

            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

class IssueBloodRequestView(GenericAPIView):

    queryset = BloodRequest.objects.all()

    def post(self, request, pk):

        blood_request = self.get_object()

        try:

            issues = BloodIssueService.issue_blood(
                blood_request=blood_request,
                issued_by=request.user,
            )

            return Response({
                "message": "Blood issued successfully.",
                "issues": len(issues),
            })

        except ValidationError as e:

            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )