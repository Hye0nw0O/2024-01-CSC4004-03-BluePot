from django.urls import path, include
from .views import *

urlpatterns = [
    path('mypage/getProfile', get_profile, name='get_profile'),
    path('mypage/modifyProfile', modify_profile,name='modify_profile')
]