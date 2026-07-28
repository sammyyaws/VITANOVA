from django.apps import AppConfig


class VitanovaAPIConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "vitanovaAPI"


    def ready(self):
        import vitanovaAPI.signals