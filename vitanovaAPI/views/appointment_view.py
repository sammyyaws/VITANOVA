from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models.donation_appointment_model import (
    DonationAppointment,
)

from ..serializers.donation_appointment_serializer import (
    DonationAppointmentSerializer,
)


class AppointmentListCreateView(APIView):

    def get(self, request):

        appointments = DonationAppointment.objects.all()

        serializer = DonationAppointmentSerializer(
            appointments,
            many=True,
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = DonationAppointmentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class AppointmentDetailView(APIView):

    def get(self, request, pk):

        try:
            appointment = DonationAppointment.objects.get(pk=pk)

        except DonationAppointment.DoesNotExist:
            return Response(
                {"message": "Appointment not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = DonationAppointmentSerializer(
            appointment
        )

        return Response(serializer.data) 