from django.urls import path

from .views import WorkerList, WorkerDetail

urlpatterns = (
    path('', WorkerList.as_view(), name='workers'),
    path('<int:pk>/', WorkerDetail.as_view(), name='single worker'),
)
