from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from  decouple import config


def send_verification_email(user):

    token = default_token_generator.make_token(user)

    link = (
        f"{config('verif_endpoint')}"
        f"{user.user_id}/{token}"
    )

    send_mail(
        subject="Verify your VitaNova account",
        message=f"Click this link to verify your account: {link}",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
    )