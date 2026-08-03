from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.utils import timezone

from ..models.inventory_model import Inventory
from ..models.blood_request_model import BloodRequest
from ..models.organisation_model import OrganisationPartner

from ..serializers.inventory_serializer import InventorySerializer
from ..serializers.blood_request_serializer import BloodRequestSerializer



class HospitalDashboardView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def get(self, request):

        user = request.user


        organisation = user.organisation


        # Inventory belonging to this hospital
        inventory = Inventory.objects.filter(
            organisation=organisation
        )


        # Pending requests
        requests = BloodRequest.objects.filter(
            organisation=organisation,
            request_status="PENDING"
        )


        # Partners
        partners = OrganisationPartner.objects.filter(
            organisation=organisation
        )


        total_units = sum(
            item.quantity_units 
            for item in inventory
        )


        available_types = inventory.values(
            "blood_group"
        ).distinct().count()



        # Blood expiring within 7 days
        expiring_blood = inventory.filter(
            expiry_date__lte=
            timezone.now().date()
            + timezone.timedelta(days=7)
        ).count()



        return Response({

            "organisation": {

                "id":
                organisation.organisation_id,

                "name":
                organisation.name,

                "type":
                organisation.organisation_type

            },


            "cards": {

                "total_units":
                total_units,


                "active_requests":
                requests.count(),


                "available_types":
                available_types,


                "expiring_units":
                expiring_blood

            },


            "inventory":
            InventorySerializer(
                inventory,
                many=True
            ).data,



            "active_requests":
            BloodRequestSerializer(
                requests,
                many=True
            ).data,



            "partners":[

                {
                    "id":
                    partner.partner.organisation_id,

                    "name":
                    partner.partner.name,

                    "type":
                    partner.partner.organisation_type
                }

                for partner in partners

            ]

        })