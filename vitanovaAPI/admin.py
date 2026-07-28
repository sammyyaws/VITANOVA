from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models.user_models import User, Role
from .models.donor_models import Donor
from .models.patients_models import Patient
from .models.location_models import Location
from .models.notification_models import Notification
from .models.organisation_model import Organization


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    ordering = ("email",)

    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "organization",
        "is_staff",
        "is_active",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
        "phone_number",
    )

    fieldsets = (
        (None, {
            "fields": (
                "email",
                "password",
            )
        }),
        ("Personal Info", {
            "fields": (
                "first_name",
                "last_name",
                "phone_number",
            )
        }),
        ("Organization", {
            "fields": (
                "organization",
                "role",
            )
        }),
        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "is_verified",
                "groups",
                "user_permissions",
            )
        }),
        ("Important Dates", {
            "fields": (
                "last_login",
                
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "first_name",
                "last_name",
                "phone_number",
                "organization",
                "role",
                "password1",
                "password2",
                "is_staff",
                "is_superuser",
            ),
        }),
    )


admin.site.register(Role)
admin.site.register(Donor)
admin.site.register(Patient)
admin.site.register(Location)
admin.site.register(Notification)
admin.site.register(Organization)