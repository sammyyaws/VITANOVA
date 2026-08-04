from rest_framework.permissions import BasePermission


class RolePermission(BasePermission):

    required_role = None

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and getattr(request.user.role, "role_name", None) == self.required_role
        )


class IsSuperAdmin(RolePermission):
    required_role = "SuperAdmin"


class IsOrganisationAdmin(RolePermission):
    required_role = "OrganisationAdmin"


class IsPatient(RolePermission):
    required_role = "Patient"


class IsDonor(RolePermission):
    required_role = "Donor"