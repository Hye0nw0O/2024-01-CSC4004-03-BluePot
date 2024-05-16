from django.urls import path, include
from rest_framework import routers
from . import views
from .views import CommunityViewSet, CommunityDetailViewSet, CommunityPostViewSet
from .views import CommunityListCreate

app_name = "community"

default_router = routers.SimpleRouter(trailing_slash=False)
default_router.register("communities", CommunityViewSet, basename="")

community_detail_router = routers.SimpleRouter(trailing_slash=False)
community_detail_router.register("communities", CommunityDetailViewSet, basename="commuinties-detail")

community_post_router = routers.SimpleRouter(trailing_slash=False)
community_post_router.register("communities/posts", CommunityPostViewSet, basename="commuinties-post")

community_detail_action = {
    'get' : 'retrieve',
    'post' : 'like_action',
    'delete' : 'like_action'
}

urlpatterns = [
    # 게시글 작성, 수정, 삭제
    path('', include(community_post_router.urls)),

    #게시글 리스트
    path('communities/cinema_tip', views.CommunityViewSet.as_view({'get': 'list'}), {'category': 'cinema_tip'}, name='community-cinema_tip'),
    path('communities/common', views.CommunityViewSet.as_view({'get': 'list'}), {'category': 'common'}, name='community-common'),
    path('communities/suggestion', views.CommunityViewSet.as_view({'get': 'list'}), {'category': 'suggestion'}, name='community-suggestion'),

    # 디테일페이지 url
    path('communities/tips/<int:pk>', views.CommunityDetailViewSet.as_view(community_detail_action), {'category': 'tip'}, name='community-tips-detail'),
    path('communities/commons/<int:pk>', views.CommunityDetailViewSet.as_view(community_detail_action), {'category': 'common'}, name='community-commons-detail'),
    path('communities/qnas/<int:pk>', views.CommunityDetailViewSet.as_view(community_detail_action), {'category': 'qna'}, name='community-questions-detail'),

]
