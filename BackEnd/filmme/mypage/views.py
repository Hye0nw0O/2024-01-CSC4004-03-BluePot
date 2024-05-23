from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from accounts.models import User, UserManager
from accounts.serializers import UserSerializer
from django.shortcuts import render
from rest_framework.response import Response
import requests
import json
# Create your views here.


@api_view(['GET','POST'])
def get_profile(request):
    access = request.COOKIES['accessToken']
    kakao_profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization":f"Bearer {access}"},
    )
    kakao_profile_json = kakao_profile_request.json()

    kakao_account = kakao_profile_json.get("kakao_account")
    email = kakao_account.get("email", None)
    
    user = User.objects.get(email=email)
    
    user_serializer = UserSerializer(user).data
    res = Response(
            {
                "message" : "Getting Profile success",
                "user" : user_serializer
            },
            status = status.HTTP_200_OK,
        )
    
    return res

@api_view(['POST'])
def modify_profile(request):
    access = request.COOKIES['accessToken']
    kakao_profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization":f"Bearer {access}"},
    )
    kakao_profile_json = kakao_profile_request.json()

    kakao_account = kakao_profile_json.get("kakao_account")

    email = kakao_account.get("email", None)

    new_nickname = request.data.get('nickname')
    user = User.objects.update_user(email=email, nickName=new_nickname)
    user_serializer = UserSerializer(user).data

    res = Response(
            {
                "message" : "Getting Profile success",
                "user" : user_serializer,
            },
            status = status.HTTP_200_OK,
        )
    
    return res


