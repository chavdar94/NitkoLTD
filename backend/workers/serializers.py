from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Worker
from jobs.models import Job


class WorkerSerializer(ModelSerializer):
    jobs = SerializerMethodField()
    worker_fields = SerializerMethodField()

    def get_jobs(self, obj):
        jobs = obj.job_set.values('id', 'job_type', 'field__id').distinct()
        return jobs

    def get_worker_fields(self, obj):
        fields = Job.objects.filter(worker=obj).values(
            'field__id', 'field__name').distinct()
        return fields

    class Meta:
        model = Worker
        fields = '__all__'


class WorkerJobSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id', 'first_name', 'last_name')
