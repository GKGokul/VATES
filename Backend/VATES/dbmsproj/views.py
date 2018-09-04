from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from dbmsproj.models import Cab,AppUsers,type
from dbmsproj.serializers import CabSerialize,ModelSerialize
from django.contrib.auth import authenticate,login,logout
# Create your views here.
def cab_api(request):
    cabs = Cab.objects.all()
    serializer = CabSerialize(cabs,many=True)
    model = type.objects.get(id=serializer.data[0]['model'])
    mod_ser = ModelSerialize(model)
    return JsonResponse({'data':serializer.data,'mode_data':mod_ser.data},safe=False)

@csrf_exempt
def user_login(request):
    if request.method=='POST':
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
def user_logout(request):
    logout(request)
    return JsonResponse({'data':"I dont give a shit"})
