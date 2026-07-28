

from rest_framework import generics
from ..models.organisation_model import Organization
from ..serializers.organisation_serializer import OrganizationSerializer
from ..permissions import IsSuperAdmin


class OrganizationCreateView(generics.CreateAPIView):

    queryset = Organization.objects.all()

    serializer_class = OrganizationSerializer

    permission_classes = [
        IsSuperAdmin
    ]