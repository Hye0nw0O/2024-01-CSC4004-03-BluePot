from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
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
    
class Detail_Info_Cinema(generics.RetrieveAPIView): # cinema detail info
    queryset = Cinema.objects.all()
    serializer_class = Cinema_Detail

class Like_Cinema(APIView): # like 증가. runserver 하고 우하단 POST 버튼 누르면 like 1씩 증가.
    def post(self, request, pk):
        try:
            cinema = Cinema.objects.get(pk=pk)
            cinema.like += 1
            cinema.save()
            return Response({'status' : 'success', 'like' : cinema.like}, status=status.HTTP_200_OK)
        except Cinema.DoesNotExist:
            return RecursionError({'error': 'Cinema not found'}, status=status.HTTP_404_NOT_FOUND)