from rest_framework import serializers
from .models import Project, Experience, Leadership, Skills, Education, Interests


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'  # Or list specific fields you want to include


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'  # Or list specific fields you want to include


class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = '__all__'  # Or list specific fields you want to include


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'  # Or list specific fields you want to include


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'  # Or list specific fields you want to include


class InterestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interests
        fields = '__all__'  # Or list specific fields you want to include
