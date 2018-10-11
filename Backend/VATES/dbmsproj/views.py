from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from dbmsproj.models import Cab,AppUsers,type,voice_commands
from dbmsproj.serializers import CabSerialize,ModelSerialize,VoiceSerialize
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User

# Create your views here.

def cab_api(request):
    cabs = Cab.objects.all()
    serializer = CabSerialize(cabs,many=True)
    arr = [i['model'] for i in serializer.data]
    model = [type.objects.get(id=i) for i in arr]
    mod_ser = ModelSerialize(model,many=True)
    return JsonResponse({'data':serializer.data,'mode_data':mod_ser.data},safe=False)

@csrf_exempt
def user_login(request):
    if request.method=='POST':
        print(request)
        data = JSONParser().parse(request)
        print(data)
        u_name = data['username']
        p_word = data['password']
        u = authenticate(username = u_name,password=p_word)
        if u:
            login(request,u)
            return JsonResponse({'login':"true"},status=201)
        else:
            return JsonResponse({'login':"false"},status=201)
@csrf_exempt
@login_required
def user_logout(request):
    logout(request)
    return JsonResponse({'data':"I dont give a shit"})

@csrf_exempt
def user_create(request):
    if request.method=="POST":
        data = JSONParser().parse(request)
        print(data)
        u_name = data['username']
        p_word = data['password']
        priv = data['privilege']
        phone_no = data['phone_no']
        email = data['email']
        u = User(username=u_name,email=email)
        u.set_password(p_word)
        u.save()
        app_u = AppUsers.objects.create(u=u,priv=priv,phone_no=phone_no)
        return JsonResponse({'data':'success'})
def voice(request):
    voice = voice_commands.objects.all()
    serializer = VoiceSerialize(voice,many=True)
    return JsonResponse({'data':serializer.data},safe=False)
