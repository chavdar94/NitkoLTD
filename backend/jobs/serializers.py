from rest_framework.serializers import ModelSerializer
from .models import Job
from fields.serializers import FieldBriefSerializer
from workers.serializers import WorkerJobSerializer
from fields.serializers import FieldBriefSerializer


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class JobBriefSerializer(ModelSerializer):
    worker = WorkerJobSerializer()
    field = FieldBriefSerializer()

    class Meta:
        model = Job
        fields = '__all__'


class WorkerJobSerializer(ModelSerializer):
    field = FieldBriefSerializer()

    class Meta:
        model = Job
        fields = ('id', 'job_type', 'field')
