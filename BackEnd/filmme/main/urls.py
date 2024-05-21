from django.urls import path
from .views import *

urlpatterns = [
    path('cinemas_star/', Star_Cinema_List.as_view(), name = 'star_cinema'),
    path('cinemas_name/', Name_Cinema_List.as_view(), name = 'name_cinema'),
    path('cinemas_like/', Like_Cinema_List.as_view(), name = 'like_cinema'),
    path('cinemas/detail/<int:pk>/', Detail_Info_Cinema.as_view(), name = 'detail_cinema'),
    path('cinemas/like/<int:pk>/', Like_Cinema.as_view(), name = 'like_plus'),
]
