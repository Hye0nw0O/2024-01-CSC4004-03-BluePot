from django.urls import path, include
from .views import *
urlpatterns = [
    path('accounts/kakao/login', kakao_login, name='kakao_login'),
    path('accounts/kakao/callback', kakao_callback, name='kakao_callback'),
    #path('accounts/kakao/logout',kakao_logout, name='kakao_logout'),
    #path('accounts/kakao/withdraw', kakao_withdraw, name='kakao_withdraw'),
    #path('accounts/userProfile', user_profile, name='user_profile'),
]