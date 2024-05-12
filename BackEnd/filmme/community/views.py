from rest_framework import viewsets, mixins, filters, status
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
        
