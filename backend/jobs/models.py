from enum import Enum

from django.db import models
from workers.models import Worker
from fields.models import Field


class ChoicesEnum(Enum):
    @classmethod
    def choices(cls):
        return [(c.value, c.value) for c in cls]

    @classmethod
    def max_length(cls):
        return max(len(c.value) for c in cls)


class JobsChoices(ChoicesEnum):
    PLOWING = 'Оран'
    CULTIVATIONG = 'Култивиране'
    SPRAYING_WEEDS = 'Пръскане против треви'
    SPRAYING_FUNGUS = 'Пръскане против гъбични инфекции'
    SPRAYING_BUGS = 'Пръскане против буболечки'
    FERTILIZING = 'Торене'
    PLANTING = 'Сеитба'
    HARVESTING = 'Жътва'


class Job(models.Model):
    job_type = models.CharField(
        max_length=JobsChoices.max_length(), choices=JobsChoices.choices())
    worker = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True)
    field = models.ForeignKey(Field, on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
