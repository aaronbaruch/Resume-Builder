from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Project, Experience, Leadership, Skills, Education, Interests
from .serializers import ProjectSerializer, ExperienceSerializer, LeadershipSerializer, SkillsSerializer, EducationSerializer, InterestsSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class LeadershipViewSet(viewsets.ModelViewSet):
    queryset = Leadership.objects.all()
    serializer_class = LeadershipSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class InterestsViewSet(viewsets.ModelViewSet):
    queryset = Interests.objects.all()
    serializer_class = InterestsSerializer
