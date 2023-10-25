from django.shortcuts import render
from rest_framework import generics as api_views
from .serializers import FieldSerializer
from .models import Field


class FieldListCreateView(api_views.ListCreateAPIView):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer


class FieldRetrieveUpdateDestroyView(api_views.RetrieveUpdateDestroyAPIView):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer
