from rest_framework import serializers
from .models import *

class Cinema_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['id', 'name', 'star', 'like_cnt', 'location']

class Cinema_Detail(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['name', 'cite_url', 'star', 'like_cnt', 'discription', 'location']