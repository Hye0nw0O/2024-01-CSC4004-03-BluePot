from django.shortcuts import redirect
from django.http import JsonResponse
from .models import *
import requests
import os
import json

BASE_URL = 'http://127.0.0.1:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'api/accounts/kakao/callback'
SOCIAL_AUTH_KAKAO_CLIENT_ID = '541a5b90d0456e285e4d4868e1d7e7be'
SOCIAL_AUTH_KAKAO_SECRET = '9vuPMBan66cByGSk2n7SgjkpLJp9zbpy'


def kakao_login(request):
    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code&scope=account_email")

def kakao_callback(request):

    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    client_secret = SOCIAL_AUTH_KAKAO_SECRET
    code=request.GET.get("code")
    redirect_uri = 'http://127.0.0.1:8000/api/accounts/kakao/callback'

    token_request = requests.get(f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&code={code}")
    token_response_json = token_request.json()
    
    access_token = token_response_json.get("access_token")

    profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization":f"Bearer {access_token}"},
    )
    profile_json = profile_request.json()

    kakao_account = profile_json.get("kakao_account")
    email = kakao_account.get("email", None)

    '''
    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        user = User.objects.get(email=email)

        # FK로 연결되어 있는 socialaccount 테이블에서 해당 이메일의 유저가 있는지 확인
        social_user = SocialAccount.objects.get(user=user)

        # 있는데 카카오계정이 아니어도 에러
        if social_user.provider != 'kakao':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        # 이미 kakao로 제대로 가입된 유저 => 로그인 & 해당 우저의 jwt 발급
        data = {'access_token': access_token, 'code': code, 'id_token':id_token}
        accept = requests.post('http://127.0.0.1:8000/api/accounts/kakao/login/finish', data=data)
        accept_status = accept.status_code

        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 jwt 발급
        data = {'access_token': access_token, 'code': code, 'id_token':id_token}
        accept = requests.post('http://127.0.0.1:8000/api/accounts/kakao/login/finish', data=data)
        accept_status = accept.status_code

        # 뭔가 중간에 문제가 생기면 에러
        if accept_status == 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_id)

        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
        
    except SocialAccount.DoesNotExist:
    	# User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
        return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
    '''

    return JsonResponse(profile_json)
