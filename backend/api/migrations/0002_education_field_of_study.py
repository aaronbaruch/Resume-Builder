# Generated by Django 5.0.1 on 2024-01-10 20:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="education",
            name="field_of_study",
            field=models.CharField(default="Not Specified", max_length=100),
            preserve_default=False,
        ),
    ]
