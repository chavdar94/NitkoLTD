from django.contrib import admin
from fields.models import Field


@admin.register(Field)
class FieldAdmin(admin.ModelAdmin):
    pass
