# Generated by Django 4.2.6 on 2023-10-21 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fields', '0002_remove_field_worker'),
        ('workers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='fields',
            field=models.ManyToManyField(to='fields.field'),
        ),
    ]
