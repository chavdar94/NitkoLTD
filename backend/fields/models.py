from django.db import models
from workers.models import Worker


class Field(models.Model):
    name = models.CharField(max_length=50)
    size = models.PositiveIntegerField()
    workersIds = models.ManyToManyField(Worker, null=True)

    def __str__(self):
        return self.name
