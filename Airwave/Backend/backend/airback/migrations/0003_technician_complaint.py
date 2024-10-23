# Generated by Django 5.1.2 on 2024-10-16 20:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('airback', '0002_enquiry'),
    ]

    operations = [
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('technician_id', models.CharField(max_length=50, unique=True)),
                ('mobile', models.CharField(max_length=15)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Complaint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('phone2', models.CharField(blank=True, max_length=15, null=True)),
                ('address', models.TextField()),
                ('complaint_type', models.CharField(max_length=100)),
                ('complaint_description', models.TextField()),
                ('date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('open', 'Open'), ('resolved', 'Resolved'), ('in-progress', 'In Progress')], default='open', max_length=20)),
                ('resolved_date', models.DateField(blank=True, null=True)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='airback.technician')),
            ],
        ),
    ]
