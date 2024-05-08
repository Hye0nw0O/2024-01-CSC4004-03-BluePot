from django.db import models
from accounts import models
from users.models import User

# Create your models here.
def community_image_upload_path(instance, filename):
    return f'community/{instance.community.id}/{filename}'


class Community(models.Model):
    id = models.AutoField(primary_key=True)
    # ai = models.ForeignKey(Ai, blank=False, null=True, on_delete=models.CASCADE, related_name='community_ai')
    CATEGORY_LIST = (
        ('common', 'common'),
        ('cinema_tip', 'cinema_tip'),
        ('suggestion', 'suggestion'),
    )
    category = models.CharField(max_length=10, choices=CATEGORY_LIST, blank=False, null=False)
    #writer = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    content = models.TextField(null=False, max_length=5000)
    view_cnt = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_cnt = models.PositiveIntegerField(default=0)
    comment_cnt = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)

class CommunityCategory(models.Model):
    choice = models.AutoField(primary_key=True)
    common = models.AutoField()
    cinema_tip = models.TextField(null=True, max_length=1000)
    suggestion = models.TextField(null=True, max_length=500)

class CommunityComment(models.Model):
    id = models.AutoField(primary_key=True)
    community = models.ForeignKey(Community, blank=False, null=False, on_delete=models.CASCADE, related_name='comments_community')
    #writer = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CommunityImage(models.Model):
    #id = models.AutoField(primary_key=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='images_community')
    community_image = models.ImageField(upload_to=community_image_upload_path)
    community = models.ForeignKey(Community, blank=False, null=False, on_delete=models.CASCADE, related_name='comments_community')

class CommunityLike(models.Model):
    id = models.AutoField(primary_key=True)
    community = models.ForeignKey(Community, blank=False, null=False, on_delete=models.CASCADE, related_name='likes_community')
    #user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name='likes_community')
    user_id = models.AutoField()
    community_id = models.AutoField()

class CommunityPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="boards")
    title = models.CharField("제목", max_length=50, null=False)
    content = models.TextField("내용", null=False)
    dt_created = models.DateTimeField("작성일", auto_now_add=True, null=False)
    dt_modified = models.DateTimeField("수정일", auto_now=True, null=False)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'comment' )