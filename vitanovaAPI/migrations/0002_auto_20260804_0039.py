
from django.db import migrations


def create_roles(apps, schema_editor):
    Role = apps.get_model("vitanovaAPI", "Role")

    roles = [
        "SuperAdmin",
        "OrganisationAdmin",
        "Donor",
        "Patient",
    ]

    for role_name in roles:
        Role.objects.get_or_create(role_name=role_name)


def remove_roles(apps, schema_editor):
    Role = apps.get_model("vitanovaAPI", "Role")

    Role.objects.filter(
        role_name__in=[
            "SuperAdmin",
            "OrganisationAdmin",
             "Donor",
            "Patient",
        ]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("vitanovaAPI", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_roles,
            remove_roles,
        ),
    ]