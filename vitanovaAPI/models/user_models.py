from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

from .organisation_model import Organization



#user role model
class Role(models.Model):
    role_id = models.AutoField(primary_key=True)

    role_name = models.CharField(
        max_length=30,
        unique=True
    )

    def __str__(self):
        return self.role_name





#user manager

class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required.")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)
        extra_fields.setdefault("is_active", True)

        admin_role, created = Role.objects.get_or_create(
            role_name="Admin"
        )

        extra_fields["role"] = admin_role

        return self.create_user(
            email,
            password,
            **extra_fields
        )


#user model
class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    organization = models.ForeignKey(
    Organization,
    on_delete=models.SET_NULL,
    null=True,
    blank=True
)
    role = models.ForeignKey(
        'Role',
        on_delete=models.PROTECT
    )

    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "phone_number",
    ]

    def __str__(self):
        return self.email


    


 