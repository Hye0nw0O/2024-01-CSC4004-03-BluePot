from django.urls import path, include
from .views import kakao_login, kakao_callback
urlpatterns = [
    path('accounts/kakao/login', kakao_login, name='kakao_login'),
    path('accounts/kakao/callback', kakao_callback, name='kakao_callback'),
    #path('dj-rest-auth/', include('dj_rest_auth.urls')),
    #path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
]