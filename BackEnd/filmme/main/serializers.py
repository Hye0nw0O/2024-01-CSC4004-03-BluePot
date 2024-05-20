from rest_framework import serializers
from .models import *

class Cinema_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['id', 'name', 'cite_URl', 'star', 'like']

class Cinema_Detail(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['name', 'cite_URl', 'star', 'like', 'discription']