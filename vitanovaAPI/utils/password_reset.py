from django.core.mail import send_mail
from django.conf import settings


def password_reset_email_token_created(sender, instance, reset_password_token, *args, **kwargs):

    user = reset_password_token.user

    reset_url = (
        f"{settings.FRONTEND_URL}/reset-password/"
        f"{reset_password_token.key}"
    )

    send_mail(
        subject="Reset your VitaNova password",
        message=(
            f"Hello {user.first_name},\n\n"
            f"Click the link below to reset your password:\n\n"
            f"{reset_url}\n\n"
            "If you did not request this, ignore this email."
        ),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
    )