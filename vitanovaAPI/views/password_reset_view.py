from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from django_rest_passwordreset.views import ResetPasswordRequestToken
from django_rest_passwordreset.views import ResetPasswordConfirm


User = get_user_model()


class PasswordResetRequestView(ResetPasswordRequestToken):
    pass


class PasswordResetConfirmView(ResetPasswordConfirm):
    pass