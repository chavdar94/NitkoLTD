from django.contrib.auth import get_user_model, authenticate, login

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics as api_views, permissions, status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserCreateSerializer, UserListSeriazlizer, UserDetailSerializer, MyTokenObtainPairSerializer, LoginSerializer
from .permissions import IsAdminUserPermission
from accounts.permissions import DeleteOnlyOwner
from accounts.models import Profile


UserModel = get_user_model()


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
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        Profile.objects.create(user=user)


class UserDetails(api_views.RetrieveDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserDetailSerializer

    permission_classes = [DeleteOnlyOwner]


class LoginView(api_views.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = UserModel.objects.get(username=username)

        curr_user = authenticate(username=username, password=password)
        if curr_user is not None:
            login(request, curr_user)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            user_data = {
                'user_id': user.id,
                'username': user.username
            }

            return Response({
                'access': access_token,
                'refresh': refresh_token,
                'user': user_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
