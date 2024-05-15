from rest_framework import viewsets, mixins, filters, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from django.utils import timezone

from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.contrib.auth import get_user_model

from .models import Community, CommunityComment, CommunityLike
from .serializers import *
from .paginations import CommunityCommentPagination, CommunityPagination
from .permissions import IsOwnerOrReadOnly

# Create your views here.
#리스트 생성
class CommunityListCreate(generics.ListCreateAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunityCreateUpdateSerializer
# 정렬 기능
class CommunityOrderingFilter(filters.OrderingFilter):
    def filter_queryset(self, request, queryset, view):
        order_by = request.query_params.get(self.ordering_param)
        if order_by == 'popular':
            return queryset.order_by('-view_cnt') # 조회순
        elif order_by == 'like':
            return queryset.order_by('-likes_cnt') # 좋아요순
        else:
            # 기본은 최신순으로 설정
            return queryset.order_by('-created_at')
        
# 게시물 작성 & 수정
class CommunityPostViewSet(viewsets.GenericViewSet,
                            mixins.CreateModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin
                            ):
    serializer_class = CommunityCreateUpdateSerializer

    queryset = Community.objects.all()

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        else:
            return [IsOwnerOrReadOnly()]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        
        if 'title' in data or 'content' in data:
            instance.title = data.get('title', instance.title)
            instance.content = data.get('content', instance.content)
            instance.updated_at = timezone.now()
            instance.save()
            
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_cnt += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)