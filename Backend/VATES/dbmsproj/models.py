from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class voice_commands(models.Model):
    voice_id = models.IntegerField(primary_key = True)
    voice_string = models.CharField(max_length=60)
    action = models.CharField(max_length=30)

    def __str__(self):
        return self.voice_string
class AppUsers(models.Model):
    u = models.OneToOneField(User,on_delete = models.CASCADE)
    priv = models.BooleanField()
    phone_no = models.CharField(max_length=15)
    def __str__(self):
        return self.u.username
class type(models.Model):
    models = models.CharField(max_length=15)
    type = models.TextField(max_length=15)
    no_of_seats = models.IntegerField()

    def __str__(self):
        return self.models
class daily_dist(models.Model):
    date = models.DateTimeField()
    distance = models.IntegerField()

    def __str__(self):
        return str(self.date)
class Cab(models.Model):
    cab_id = models.IntegerField(primary_key=True)
    driver_name = models.CharField(max_length=60)
    latitude = models.DecimalField(max_digits=6, decimal_places=4)
    longitude = models.DecimalField(max_digits=6, decimal_places=4)
    user_id = models.ForeignKey(AppUsers,on_delete= models.CASCADE)
    rating = models.IntegerField()
    total_dist = models.IntegerField()
    model = models.ForeignKey(type,on_delete=models.CASCADE)
    daily_dist = models.ForeignKey(daily_dist,on_delete=models.CASCADE)
    def __str__(self):
        return self.driver_name
class trips(model.Model):
    trip_id = models.IntegerField(primary_key=True)
    cab_id = models.ForeignKey(Cab,on_delete = models.CASCADE)
    u_id = models.ForeignKey(User,on_delete = models.CASCADE)
    amount = models.IntegerField()
    source_latitude = models.DecimalField(max_digits=6, decimal_places=4)
    source_longitude = models.DecimalField(max_digits=6, decimal_places=4)
    dest_latitude = models.DecimalField(max_digits=6, decimal_places=4)
    dest_longitude = models.DecimalField(max_digits=6, decimal_places=4)
    distance = models.IntegerField()
    no_of_pass = models.IntegerField()

    def __str__(self):
        return str(self.trip_id)
