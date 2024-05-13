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


# 커뮤니티 디테일 - 세 개 다르게

# 게시물 작성 & 수정
class CommunityCreateUpdateSerializer(serializers.ModelSerializer):
    writer = serializers.CharField(source='writer.nickname', read_only=True)
    images = serializers.ListField(child=serializers.ImageField(), required=False)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    cinema = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    def clear_existing_images(self, instance):
        for community_image in instance.images_community.all():
            community_image.image.delete()
            community_image.delete()

    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%Y/%m/%d %H:%M")
    
    # 게시물 작성 함수
    def create(self, validated_data):
        category = validated_data.get('category')
        cinema_title = validated_data.get('cinema')

        if category == 'tip' and (cinema_title is None or cinema_title == ""):
            raise serializers.ValidationError("영화관 후기 게시물을 작성할 때는 영화관을 선택(입력)해주세요.")

        cinema_instance = None
        if cinema_title:
            try:
                cinema_instance = Cinema.objects.get(title=cinema_title)
            except Cinema.DoesNotExist:
                raise serializers.ValidationError("존재하지 않는 영화관입니다.")
        
        image_data = self.context['request'].FILES
        user = self.context['request'].user
        validated_data['writer'] = user
        validated_data['cinema'] = cinema_instance 
        instance = Community.objects.create(**validated_data)
        for image_data in image_data.getlist('image'):
            CommunityImage.objects.create(community=instance, image=image_data)
        return instance
    
    # 게시물 수정 함수
    def update(self, instance, validated_data):
        cinema_title = validated_data.get('cinema')

        cinema_instance = None
        if cinema_title:
            try:
                cinema_instance = Cinema.objects.get(title=cinema_title)
            except Cinema.DoesNotExist:
                raise serializers.ValidationError("존재하지 않는 영화관입니다.")
        
        image_data = self.context['request'].FILES
        validated_data['cinema'] = cinema_instance 
        self.clear_existing_images(instance)
        for image_data in image_data.getlist('image'):
            CommunityImage.objects.create(community=instance, image=image_data)
        return super().update(instance, validated_data)

    class Meta:
        model = Community
        fields = ['id', 'cinema', 'writer', 'category', 'title', 'content', 'images', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']