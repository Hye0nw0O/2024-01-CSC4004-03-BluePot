from rest_framework import serializers
from .models import Community, CommunityComment, CommunityImage, CommunityLike

from django.contrib.auth import get_user_model
from main.models import Cinema
import requests

from accounts.models import User

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

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class LikePostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityLike
        fields = '__all__'


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
        return instance.writer.nickName
    
    class Meta:
        model = CommunityComment
        fields = '__all__'

# 커뮤니티 리스트 - tips
class TipListSerializer(serializers.ModelSerializer):
    # writer = serializers.CharField(source='writer.nickname', read_only=True)
    # is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True) 
    cinema = serializers.SerializerMethodField(read_only=True)

    def get_cinema(self, instance):
        cinema_instance = instance.cinema
        if cinema_instance is not None:
            return cinema_instance.name
        else:
            return None
        
    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    class Meta:
        model = Community
        fields = [
            "id",
            "cinema",
            "category",
            "title",
            "comments_cnt",
            "view_cnt",
            "likes_cnt",
            "created_at"
        ]

# 커뮤니티 리스트 - commons
class CommonListSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)

    # def get_cinema(self, instance):
    #     cinema_instance = instance.cinema
    #     if cinema_instance is not None:
    #         return cinema_instance.name
    #     else:
    #         return None
    
    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    def get_is_liked(self, instance):

        # user = get_user(self.context['request'])
        User = get_user_model()
        user = self.context['request'].user if isinstance(self.context['request'].user, User) else None
        
        if user is not None:
            return CommunityLike.objects.filter(community=instance,user=user).exists()
        else:
            return False
    class Meta:
        model = Community
        fields = [
            "id",
            # "cinema",
            "category",
            "title",
            "comments_cnt",
            "view_cnt",
            "is_liked",
            "likes_cnt",
            "created_at"
        ]

# 커뮤니티 리스트 - suggestions
class suggestionListSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    cinema = serializers.SerializerMethodField(read_only=True)

    def get_cinema(self, instance):
        cinema_instance = instance.cinema
        if cinema_instance is not None:
            if cinema_instance.name:
                return cinema_instance.name
            else:
                return "기타"
        else:
            return "기타"
        
    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    def get_is_liked(self, instance):
        # user = get_user(self.context['request'])
        User = get_user_model()
        user = self.context['request'].user if isinstance(self.context['request'].user, User) else None
        if user is not None:
            return CommunityLike.objects.filter(community=instance,user=user).exists()
        else:
            return False
    class Meta:
        model = Community
        fields = [
            "id",
            "cinema",
            "category",
            "title",
            "comments_cnt",
            "view_cnt",
            "is_liked",
            "likes_cnt",
            "created_at"
        ]

# 커뮤니티 디테일 - 자유게시판
class CommonDetailSerializer(serializers.ModelSerializer):
    writer = serializers.CharField(source='writer.nickName', read_only=True)
    images = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()    

    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    def get_is_liked(self, instance):
        
        # user = get_user(self.context['request'])
        User = get_user_model()
        user = self.context['request'].user if isinstance(self.context['request'].user, User) else None
        if user is not None:
            return CommunityLike.objects.filter(community=instance,user=user).exists()
        else:
            return False
    
    # 등록된 이미지들 가져오기
    def get_images(self, obj):
        image = obj.images_community.all()
        return CommunityImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Community
        fields = [
            'id', 
            'category',
            'writer', 
            'title', 
            'content', 
            'is_liked', 
            'view_cnt',
            'comments_cnt',
            'likes_cnt', 
            'images', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = [
            'id', 
            'created_at', 
            'updated_at'
        ]

# 커뮤니티 디테일 - cinema_tip
class cinema_tipDetailSerializer(serializers.ModelSerializer):
    cinema = serializers.CharField(source='cinema.name', read_only=True)
    writer = serializers.CharField(source='writer.nickName', read_only=True)
    images = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()    

    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    def get_is_liked(self, instance):
        # user = get_user(self.context['request'])
        User = get_user_model()
        user = self.context['request'].user if isinstance(self.context['request'].user, User) else None
        if user is not None:
            return CommunityLike.objects.filter(community=instance,user=user).exists()
        else:
            return False
    # 등록된 이미지들 가져오기
    def get_images(self, obj):
        image = obj.images_community.all()
        return CommunityImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Community
        fields = [
            'id', 
            'category',
            'writer', 
            'title', 
            'content', 
            'is_liked', 
            'view_cnt',
            'comments_cnt',
            'likes_cnt', 
            'images', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = [
            'id', 
            'created_at', 
            'updated_at'
        ]

# 커뮤니티 디테일 - suggestion
class suggestionDetailSerializer(serializers.ModelSerializer):
    cinema = serializers.CharField(source='cinema.name', read_only=True)
    writer = serializers.CharField(source='writer.nickName', read_only=True)
    images = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField(read_only=True)
    likes_cnt = serializers.IntegerField(read_only=True)
    comments_cnt = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_at(self, instance):
        return instance.created_at.strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%Y/%m/%d %H:%M")

    def get_comments_cnt(self, instance):
        return instance.comments_community.count()
    
    def get_is_liked(self, instance):
        # user = get_user(self.context['request'])
        User = get_user_model()
        user = self.context['request'].user if isinstance(self.context['request'].user, User) else None
        if user is not None:
            return CommunityLike.objects.filter(community=instance,user=user).exists()
        else:
            return False
        
    # 등록된 이미지들 가져오기
    def get_images(self, obj):
        image = obj.images_community.all()
        return CommunityImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Community
        fields = [
            'id', 
            'category',
            'writer', 
            'title', 
            'content', 
            'cinema',
            'is_liked', 
            'view_cnt',
            'comments_cnt',
            'likes_cnt', 
            'images', 
            'created_at', 
            'updated_at'
        ]
        read_only_fields = [
            'id', 
            'created_at', 
            'updated_at'
        ]
    
# 게시물 작성 & 수정
class CommunityCreateUpdateSerializer(serializers.ModelSerializer):
    writer = serializers.CharField(source='writer.nickName', read_only=True)
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

        if category == 'cinema_tip' and (cinema_title is None or cinema_title == ""):
            raise serializers.ValidationError("영화관 후기 게시물을 작성할 때는 영화관을 선택(입력)해주세요.")

        cinema_instance = None
        if cinema_title:
            try:
                cinema_instance = Cinema.objects.get(name=cinema_title)
            except Cinema.DoesNotExist:
                raise serializers.ValidationError("존재하지 않는 영화관입니다.")
        
        image_data = self.context['request'].FILES
        user = get_user(self.context['request'])
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
                cinema_instance = Cinema.objects.get(name=cinema_title)
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
    #이미지 삭제    
        def clear_existing_images(self, instance):
            instance.images.all().delete()    

    # 게시물 삭제 함수
    def delete(self, instance, validated_data):
        cinema_title = validated_data.get('cinema')

        cinema_instance = None
        if cinema_title:
            try:
                cinema_instance = Cinema.objects.get(title=cinema_title)
            except Cinema.DoesNotExist:
                raise serializers.ValidationError("존재하지 않는 영화관입니다.")

        instance.images.all().delete()
        
        instance.delete()