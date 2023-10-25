from django.urls import path

from .views import JobList, JobDetails

urlpatterns = (
    path('', JobList.as_view(), name='jobs'),
    path('<int:pk>/', JobDetails.as_view(), name='single job'),
)
