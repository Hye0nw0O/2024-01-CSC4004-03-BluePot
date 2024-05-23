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
        cinemas = Cinema.objects.all().order_by('-like_cnt')
        serializer = Cinema_Serializer(cinemas, many = True)
        return Response(serializer.data)
    
class Detail_Info_Cinema(generics.RetrieveAPIView): # cinema detail info
    queryset = Cinema.objects.all()
    serializer_class = Cinema_Detail

class Like_Cinema(APIView): # like 증가. runserver 하고 우하단 POST 버튼 누르면 like 1씩 증가.
    def post(self, request, pk):
        try:
            cinema = Cinema.objects.get(pk=pk)
            cinema.like_cnt += 1
            cinema.save()
            return Response({'status' : 'success', 'like' : cinema.like_cnt}, status=status.HTTP_200_OK)
        except Cinema.DoesNotExist:
            return RecursionError({'error': 'Cinema not found'}, status=status.HTTP_404_NOT_FOUND)
        
class Location_Cinema_List(APIView):
    def get(self, request, location_name):
        cinemas = Cinema.objects.filter(location = location_name)
        serializers = Cinema_Serializer(cinemas, many = True)
        return Response(serializers.data)
    
class Seoul_Cinema_List(APIView): # 이렇게 하면 모든 지역구 views 만들어야 함. 근데 뭐 만드는건 쉬우니까
    def get(self, request):
        cinemas = Cinema.objects.filter(location = "서울")
        serializers = Cinema_Serializer(cinemas, many = True)
        return Response(serializers.data)