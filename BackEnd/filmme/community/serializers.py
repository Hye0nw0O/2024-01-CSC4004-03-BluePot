from rest_framework import serializers
from .models import Community, CommunityComment, CommunityImage, CommunityLike
from django.contrib.auth import get_user_model
from main.models import Cinema

# Django 모델 인스턴스나 쿼리셋과 같은 복잡한 데이터 유형을 JSON 형식으로 변환하는 역할

# 이미지
class CommunityImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = CommunityImage
        fields = ['image']


# 댓글
class CommunityCommentSerializer(serializers.ModelSerializer):
    community = serializers.SerializerMethodField()
    writer = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()    

    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%Y/%m/%d %H:%M")
    
    def get_community(self, instance):
        return instance.community.id
    
    def get_writer(self, instance):
        return instance.writer.nickname
    
    class Meta:
        model = CommunityComment
        fields = '__all__'

# 커뮤니티 리스트 - 자유, 영화관 후기, 건의사항 세 개 다르게 시리얼라이저 구현해야 함
