from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email']
            #추가
        )
        return user
    
    def delete(self, validated_data):
        email = validated_data['email']
        try:
            user = User.objects.get(email=email)
            user.delete()
            return True
        except User.DoesNotExist:
            return False
