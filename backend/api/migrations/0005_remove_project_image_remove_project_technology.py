# Generated by Django 5.0.1 on 2024-01-29 23:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_skills_category_alter_education_related_courses"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="image",
        ),
        migrations.RemoveField(
            model_name="project",
            name="technology",
        ),
    ]