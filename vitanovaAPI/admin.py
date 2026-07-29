from django.contrib import admin
from .models.user_models import User, Role
from .models.donor_models import Donor
from .models.patients_models import Patient
from .models.location_models import Location
from .models.notification_models import Notification
from .models.organisation_model  import Organization
from .models.blood_donation_model import BloodDonation 
from .models.blood_request_model import BloodRequest 
from .models.inventory_model import Inventory 
from .models.blood_models import Blood  
# Register your models here.
admin.site.register(User)
admin.site.register(Role)
admin.site.register(Donor)
admin.site.register(Patient)
admin.site.register(Location)
admin.site.register(Notification)
admin.site.register(Organization)
