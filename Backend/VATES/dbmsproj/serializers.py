from rest_framework import serializers
from dbmsproj.models import Cab,type,voice_commands

class CabSerialize(serializers.ModelSerializer):
    class Meta:
        model=Cab
        fields=('car_no','driver_name','model','rating')
class ModelSerialize(serializers.ModelSerializer):
    class Meta:
        model = type
        fields=('model','type','no_of_seats')
class VoiceSerialize(serializers.ModelSerializer):
    class Meta:
        model = voice_commands
        fields = ('voice_id','voice_string','action')
