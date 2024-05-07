from django.urls import path
from .views import *

urlpatterns = [
    path('cinemas/', Cinema_List.as_view(), name = 'cinema-list'),
    path('cinemas_star/', Star_Cinema_List.as_view(), name = 'star_cinema'),
]
