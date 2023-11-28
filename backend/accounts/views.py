from rest_framework import generics as api_views
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .permissions import IsOwnerOrReadOnly
from .serializers import ProfileSerializer


class ProfileDetailsUpdateView(api_views.ListCreateAPIView, api_views.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def get_object(self):
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        self.check_object_permissions(request, self.get_object())
        return super().update(request, *args, **kwargs)
