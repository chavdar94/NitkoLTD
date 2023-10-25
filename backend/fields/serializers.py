from rest_framework.serializers import ModelSerializer
from .models import Field


class FieldSerializer(ModelSerializer):
    class Meta:
        model = Field
        fields = '__all__'


class WorkerFieldsSerializer(ModelSerializer):
    class Meta:
        model = Field
        fields = ('id', 'name')


class FieldBriefSerializer(ModelSerializer):
    class Meta:
        model = Field
        fields = ('id', 'name')
