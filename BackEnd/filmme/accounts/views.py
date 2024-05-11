from django.shortcuts import redirect, get_object_or_404
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from filmme import settings
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
import requests
import os
import json
import jwt


BASE_URL = 'http://127.0.0.1:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'api/accounts/kakao/callback'
SOCIAL_AUTH_KAKAO_CLIENT_ID = '541a5b90d0456e285e4d4868e1d7e7be'
SOCIAL_AUTH_KAKAO_SECRET = '9vuPMBan66cByGSk2n7SgjkpLJp9zbpy'


def kakao_login(request):
    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={SOCIAL_AUTH_KAKAO_CLIENT_ID}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code&scope=account_email")

@api_view(['GET'])
def kakao_callback(request):

    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    client_secret = SOCIAL_AUTH_KAKAO_SECRET
    code=request.GET.get("code")
    redirect_uri = 'http://127.0.0.1:8000/api/accounts/kakao/callback'

    token_request = requests.get(f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={SOCIAL_AUTH_KAKAO_CLIENT_ID}&client_secret={client_secret}&redirect_uri={redirect_uri}&code={code}")
    token_response_json = token_request.json()
    
    access_token = token_response_json.get("access_token")
    refresh_token = token_response_json.get("refresh_token")
    
    kakao_profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization":f"Bearer {access_token}"},
    )
    kakao_profile_json = kakao_profile_request.json()

    kakao_account = kakao_profile_json.get("kakao_account")
    email = kakao_account.get("email", None)
    
    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)        
    
    try:
        # 로그인 시도
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        user = User.objects.get(email=email)
        user_serializer = UserSerializer(user).data
        res = Response(
            {
                "message" : "login success",
                "user" : user_serializer,
                "email":email,
                "token" : {
                    "access":access_token,
                    "refresh":refresh_token,
                },
            },
            status = status.HTTP_200_OK,
        )
        res.set_cookie("accessToken", value=access_token, max_age=None, expires=None, 
                       secure=True, samesite="None", httponly=True)
        res.set_cookie("refreshToken", value=refresh_token, max_age=None, expires=None, 
                       secure=True, samesite="None",httponly=True)
        return res
    except User.DoesNotExist:
        user = User.objects.create_user(email=email)
        user.user_email = email
        user.user_nickname = None
        user.save()
        user_serializer = UserSerializer(user).data        
        res = Response(
            {
                "message" : "register success",
                "user" : user_serializer,
                "email":email,
                "token" : {
                    "access":access_token,
                    "refresh":refresh_token,
                },
            },
            status = status.HTTP_200_OK,
        )
        res.set_cookie("accessToken", value=access_token, max_age=None, expires=None, 
                       secure=True, samesite="None", httponly=True)
        res.set_cookie("refreshToken", value=refresh_token, max_age=None, expires=None, 
                       secure=True, samesite="None",httponly=True)
        return res

@api_view(['GET'])
def kakao_logout(self):
    response = Response(
        {
            "message":"Logout success"
        }, status = status.HTTP_202_ACCEPTED
    )
    response.delete_cookie('accessToken')
    response.delete_cookie('refreshToken')

    return response


@api_view(['GET'])
def kakao_withdraw(request):
    access = request.COOKIES['access']
    payload = jwt.decode(access, settings.SECRET_KEY, algorithms=['HS256'])
    email = payload.get('email')
    user = get_object_or_404(User, email=email)
    userManager = UserManager()
    userManager.delete(email=email)
    
    res = Response(
            {
                "message" : "withdraw success",
            },
            status = status.HTTP_200_OK,
        )
    
    return res


#필요한지는 잘 모르겠는데 일단 token기반으로 profile 받아오는거 메소드 구현
'''
def user_profile(request):
    try:
        access = request.COOKIES['access']
        payload = jwt.decode(access, settings.SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        user = get_object_or_404(User, email=email)
        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except(jwt.exceptions.ExpiredSignatureError):
        data = {'refresh':request.COOKIES.get('refresh',None)}
        serializer = TokenRefreshSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            access = serializer.data.get('access',None)
            refresh = serializer.data.get('refresh', None)
            payload = jwt.decode(access, settings.SECRET_KEY, algorithms=['HS256'])
            email = payload.get('email')
            user = get_object_or_404(User, email=email)
            serializer = UserSerializer(instance=user)
            res=Response(serializer.data, status=status.HTTP_200_OK)
            res.set_cookie('access',access)
            res.set_cookie('refresh', refresh)
            return res

'''