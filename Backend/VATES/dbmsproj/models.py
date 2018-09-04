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
    model = models.CharField(max_length=15)
    type = models.TextField(max_length=15)
    no_of_seats = models.IntegerField()

    def __str__(self):
        return self.model
class daily_dist(models.Model):
    date = models.DateField()
    distance = models.DecimalField(max_digits=8,decimal_places=3)
    def __str__(self):
        return str(self.date)
class Cab(models.Model):
    cab_id = models.IntegerField(primary_key=True)
    car_no = models.CharField(max_length=30)
    driver_name = models.CharField(max_length=60)
    latitude = models.DecimalField(max_digits=6, decimal_places=4)
    longitude = models.DecimalField(max_digits=6, decimal_places=4)
    user_id = models.ForeignKey(AppUsers,on_delete= models.CASCADE)
    rating = models.DecimalField(max_digits=2,decimal_places=1)
    total_dist = models.DecimalField(max_digits=8,decimal_places=3)
    model = models.ForeignKey(type,on_delete=models.CASCADE)
    daily_dist = models.ForeignKey(daily_dist,on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self):
        return self.driver_name
class trips(models.Model):
    trip_id = models.IntegerField(primary_key=True)
    cab_id = models.ForeignKey(Cab,on_delete = models.CASCADE)
    u_id = models.ForeignKey(User,on_delete = models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    source_latitude = models.DecimalField(max_digits=6, decimal_places=4)
    source_longitude = models.DecimalField(max_digits=6, decimal_places=4)
    dest_latitude = models.DecimalField(max_digits=6, decimal_places=4)
    dest_longitude = models.DecimalField(max_digits=6, decimal_places=4)
    distance = models.DecimalField(max_digits=8,decimal_places=3)
    no_of_pass = models.IntegerField()

    def __str__(self):
        return str(self.trip_id)
