from django.urls import path, include
from rest_framework import routers
from . import views
from .views import CommunityPostViewSet

app_name = "community"

community_post_router = routers.SimpleRouter(trailing_slash=False)
community_post_router.register("communities/posts", CommunityPostViewSet, basename="commuinties-post")

urlpatterns = [
    # 게시글 작성, 수정, 삭제
    path('', include(community_post_router.urls)),
]