from rest_framework import serializers
from .models import *

class Cinema_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ['name', 'cite_URl', 'star']