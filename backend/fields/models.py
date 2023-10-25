from django.db import models


class Field(models.Model):
    name = models.CharField(max_length=50)
    size = models.PositiveIntegerField()

    def __str__(self):
        return self.name
