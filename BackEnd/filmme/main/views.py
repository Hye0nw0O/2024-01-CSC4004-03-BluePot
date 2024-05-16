from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.
class Star_Cinema_List(APIView): # stagr - desc
    def get(self, request):
        cinemas = Cinema.objects.all().order_by('-star')
        serializer = Cinema_Serializer(cinemas, many = True)
        return Response(serializer.data)
    
class Name_Cinema_List(APIView): # abcd... - asc
    def get(self, request):
        cinemas = Cinema.objects.all().order_by('name')
        serializer = Cinema_Serializer(cinemas, many = True)
        return Response(serializer.data)
    
class Like_Cinema_List(APIView): # like - asc
    def get(self, request):
        cinemas = Cinema.objects.all().order_by('-like')
        serializer = Cinema_Serializer(cinemas, many = True)
        return Response(serializer.data)
    
class Detail_Info_Cinema(generics.RetrieveAPIView):
    queryset = Cinema.objects.all()
    serializer_class = Cinema_Detail