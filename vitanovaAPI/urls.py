from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import user_views
from  rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.donor_views import DonorProfileCreateView, DonorProfileView
from .views.verification_views import VerifyEmailView
from  .views.organisation_view import OrganizationCreateView
from .views.hospital_dashboard_view import HospitalDashboardView

from django_rest_passwordreset.views import (
    ResetPasswordRequestToken,
    ResetPasswordConfirm,
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
]
