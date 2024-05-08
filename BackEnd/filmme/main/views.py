from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Cinema
from .serializers import Cinema_Serializer

# Create your views here.
class Cinema_List(generics.ListAPIView):
    queryset = Cinema.objects.all()
    serializer_class = Cinema_Serializer

class Star_Cinema_List(APIView): # star - desc
    def get(self, request):
        cinemas = Cinema.objects.all().order_by('-star')
        serializer = Cinema_Serializer(cinemas, many = True)
        return Response(serializer.data)