from django.db import models
from accounts.models import User, UserManager
from django.contrib.auth import get_user_model


'''
def mypage_image_upload_path(user, filename):
    return f'mypage/{user.id}/{filename}'

User = get_user_model()

class MovieHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, null=True, default="")
    image = models.ImageField(upload_to=mypage_image_upload_path)

    year = models.IntegerField()
    month = models.IntegerField()
    day = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
'''