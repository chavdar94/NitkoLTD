from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics as api_views
from rest_framework import permissions

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserCreateSerializer, UserListSeriazlizer, UserDetailSerializer
from .permissions import IsAdminUserPermission


UserModel = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',
        'api/fields',
        'api/users/<int:pk>',
        'api/auth/register',
    ]

    return Response(routes)


class GetUsers(api_views.ListCreateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = [IsAdminUserPermission]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserListSeriazlizer


class UserCreate(api_views.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserCreateSerializer


class UserDetails(api_views.RetrieveDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailSerializer
