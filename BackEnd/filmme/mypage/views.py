from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from accounts.models import User, UserManager
from accounts.serializers import UserSerializer
from django.shortcuts import render
from rest_framework.response import Response
import requests
import json
# Create your views here.
from rest_framework.views import APIView
from .models import MovieHistory
from .serializers import MovieHistorySerializer
from django.shortcuts import get_object_or_404
from community.models import *
from community.serializers import *

#쿠키로 읽어오는 부분 request에 담겨진 json으로 읽도록 수정할예정
def get_user(request):
    access = request.COOKIES['accessToken']
    kakao_profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization":f"Bearer {access}"},
    )
    kakao_profile_json = kakao_profile_request.json()

    kakao_account = kakao_profile_json.get("kakao_account")

    email = kakao_account.get("email", None)
    user = User.objects.get(email=email)
    return user


@api_view(['GET'])
def get_profile(request):
    user = get_user(request)

    user_serializer = UserSerializer(user).data
    movie_histories = MovieHistorySerializer.get_by_user(user=user)
    movie_histories_serializer = MovieHistorySerializer(movie_histories, many=True)
    
    communities = Community.objects.filter(writer=user)
    communities_serializer = CommunitySerializer(communities, many=True)

    comments = CommunityComment.objects.filter(writer=user)
    comments_serializer = CommunityCommentSerializer(comments, many=True)

    likePosts = CommunityLike.objects.filter(writer=user)
    likePosts_serializer =  LikePostsSerializer(likePosts, many=True)

    res = Response(
            {
                "message" : "Getting Profile success",
                "user" : user_serializer,
                "communities" : communities_serializer.data,
                "comments" : comments_serializer.data,
                "likePost" : likePosts_serializer.data,
                "movieHistory" : movie_histories_serializer.data,
            },
            status = status.HTTP_200_OK,
        )
    
    return res

@api_view(['POST'])
def modify_profile(request):
    user = get_user(request)
    email = user.email
    nickname = request.data.get('nickname')
    user.update_user(email=email, nickName=nickname)
    user_serializer = UserSerializer(user).data

    res = Response(
            {
                "message" : "Getting Profile success",
                "user" : user_serializer,
            },
            status = status.HTTP_200_OK,
        )
    
    return res


@api_view(['POST'])
def create_movieHistory(request):
    user = get_user(request)
    data = {
        'user' : user,
        'title': request.data.get('title'),
        'content': request.data.get('content'),
        'poster': request.data.get('poster'),
        'year': request.data.get('year'),
        'month': request.data.get('month'),
        'day': request.data.get('day'),
    } 
    serializer = MovieHistorySerializer()
    movie_history = serializer.create(data)  # Pass user instance directly here
    return Response(MovieHistorySerializer(movie_history).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_movieHistory(request):
    user = get_user(request)
    movie_histories = MovieHistorySerializer.get_by_user(user=user)
    serializer = MovieHistorySerializer(movie_histories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def update_movieHistory(request):
    user = get_user(request)
    data = {
        'user': user,
        'title': request.data.get('title'),
        'content': request.data.get('content'),
        'poster' : request.data.get('poster'),
        'year': request.data.get('year'),
        'month': request.data.get('month'),
        'day': request.data.get('day'),
    }
    id = request.data.get('id')
    movie_history = get_object_or_404(MovieHistory, id=id)
    
    serializer = MovieHistorySerializer()
    
    modified_instance = serializer.update(movie_history, data)
    return Response(MovieHistorySerializer(modified_instance).data)
    
@api_view(['POST'])
def remove_movieHistory(request):
    id = request.data.get('id')
    serializer = MovieHistorySerializer()
    serializer.delete(id)
    return Response({'message':'delete success'}, status=status.HTTP_200_OK)
