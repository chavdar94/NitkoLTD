from rest_framework import generics as api_views

from .serializers import JobSerializer, JobBriefSerializer
from .models import Job


class JobList(api_views.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return JobBriefSerializer
        return JobSerializer


class JobDetails(api_views.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
