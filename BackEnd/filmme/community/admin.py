from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Community, CommunityComment # 추가

admin.site.register(Community)
admin.site.register(CommunityComment)