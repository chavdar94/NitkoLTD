from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['user']

    def validate_user(self, value):
        request = self.context.get('request')
        if value != request.user:
            raise serializers.ValidationError(
                'Cannot create profile for other users.')
        return value
