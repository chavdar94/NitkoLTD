from django.urls import path

from .views import FieldListCreateView, FieldRetrieveUpdateDestroyView

urlpatterns = (
    path('', FieldListCreateView.as_view(), name='fields'),
    path('<int:pk>/', FieldRetrieveUpdateDestroyView.as_view(),
         name='single field'),
)
