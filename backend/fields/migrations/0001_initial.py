# Generated by Django 4.2.6 on 2023-10-21 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('workers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('size', models.PositiveIntegerField()),
                ('worker', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='workers.worker')),
            ],
        ),
    ]