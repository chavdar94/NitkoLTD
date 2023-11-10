from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.serializers import ModelSerializer
from fields.models import Field

UserModel = get_user_model()

class FieldSerializer(ModelSerializer):
    class Meta:
        model = Field
        fields = '__all__'


class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'password']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('password')
        return data

    def save(self, **kwargs):
        user = super().save(**kwargs)
        user.set_password(user.password)
        user.save()

        return user

    def validate(self, attrs):
        password = attrs.get('password')

        try:
            validate_password(password)
        finally:
            return attrs



class UserListSeriazlizer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
