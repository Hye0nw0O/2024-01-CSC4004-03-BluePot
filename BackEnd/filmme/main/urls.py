from django.urls import path
from .views import *

urlpatterns = [
    path('cinemas/', Cinema_List.as_view(), name = 'cinema-list'),
    path('cinemas_star/', Star_Cinema_List.as_view(), name = 'star_cinema'),
    path('cinemas_name/', Name_Cinema_List.as_view(), name = 'name_cinema'),
    path('cinemas_like/', Like_Cinema_List.as_view(), name = 'like_cinema'),
]
