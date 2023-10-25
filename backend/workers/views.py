from rest_framework import generics as api_views

from .serializers import WorkerSerializer
from .models import Worker


class WorkerList(api_views.ListCreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerDetail(api_views.RetrieveUpdateDestroyAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
