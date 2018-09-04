from django.contrib import admin
from dbmsproj.models import AppUsers,Cab,type,trips,voice_commands,daily_dist
# Register your models here.
admin.site.register(AppUsers)
admin.site.register(Cab)
admin.site.register(type)
admin.site.register(trips)
admin.site.register(voice_commands)
admin.site.register(daily_dist)
