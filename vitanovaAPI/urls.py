from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import user_views
from  rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.donor_views import DonorProfileCreateView, DonorProfileView
from .views.verification_views import VerifyEmailView
from  .views.organisation_view import OrganizationCreateView
from  .views.blood_issue_view import BloodIssueView
from .views.hospital_dashboard_view import HospitalDashboardView
from .views.donation_views import DonationAPIView
from  .views.inventory_views import InventoryListView, InventoryDetailView, InventoryTransactionListView
from django_rest_passwordreset.views import (
    ResetPasswordRequestToken,
    ResetPasswordConfirm,
)
from .views.blood_request_view import (
    BloodRequestListCreateView,
    ReserveBloodRequestView,
    IssueBloodRequestView,
)




from .views.appointment_view import (
    AppointmentListCreateView,
    AppointmentDetailView,
)

#from .views.patient_views import PatientProfileCreateView
urlpatterns = [
    path('register/', user_views.RegisterUserView.as_view(), name='register'),
   path('login/', user_views.LoginView.as_view(), name='login'),
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path("profile/donor/", DonorProfileCreateView.as_view()),
   path("profile/donor/me/", DonorProfileView.as_view()),
   path("auth/verify-email/<int:user_id>/<str:token>/", VerifyEmailView.as_view()),
   path("organizations/create/",OrganizationCreateView.as_view(),name="create-organization"
    ),
     path("password-reset/",ResetPasswordRequestToken.as_view(),name="password-reset"
    ),
  path("password-reset-confirm/",ResetPasswordConfirm.as_view(),
        name="password-reset-confirm"
    ),
    path("hospital/dashboard/", HospitalDashboardView.as_view(), name="hospital-dashboard"),
     path(
        "donations/",DonationAPIView.as_view(), name="blood-donation" ),
     
    path(
        "requests/",
        BloodRequestListCreateView.as_view(),
        name="blood-request-list",
    ),

    path(
        "requests/<int:pk>/reserve/",
        ReserveBloodRequestView.as_view(),
        name="reserve-request",
    ),

    path(
        "requests/<int:pk>/issue/",
        IssueBloodRequestView.as_view(),
        name="issue-request",
    ),   
      path(
        "requests/<int:pk>/issue/",
        BloodIssueView.as_view(),
        name="issue-blood"
    ),
      path(
        "inventory/",
        InventoryListView.as_view(),
        name="inventory-list",
    ),

    path(
        "inventory/<int:pk>/",
        InventoryDetailView.as_view(),
        name="inventory-detail",
    ),

    path(
        "inventory/transactions/",
        InventoryTransactionListView.as_view(),
        name="inventory-transactions",
    ),



    path(
        "patient/requests/<int:pk>/matches/",
        DonorMatchListView.as_view(),
        name="patient-request-matches",
    ),

    path(
        "appointments/",
        AppointmentListCreateView.as_view(),
        name="appointment-list",
    ),

    path(
        "appointments/<int:pk>/",
        AppointmentDetailView.as_view(),
        name="appointment-detail",
    ),
    
]
