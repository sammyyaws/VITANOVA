from django.core.exceptions import ValidationError

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from ..models.blood_request_model import BloodRequest
from ..serializers.blood_issue_serializer import BloodIssueSerializer
from ..services.blood_issue_service import BloodIssueService


class BloodIssueView(GenericAPIView):

    queryset = BloodRequest.objects.all()

    def post(self, request, pk):

        blood_request = self.get_object()

        try:

            issues = BloodIssueService.issue_blood(
                blood_request=blood_request,
                issued_by=request.user,
                notes=request.data.get("notes")
            )

            return Response(
                BloodIssueSerializer(
                    issues,
                    many=True
                ).data,
                status=status.HTTP_201_CREATED
            )

        except ValidationError as e:

            return Response(
                {
                    "detail": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )