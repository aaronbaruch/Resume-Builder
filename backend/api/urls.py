# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillsViewSet, EducationViewSet, InterestsViewSet, LeadershipViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillsViewSet)
router.register(r'education', EducationViewSet)
router.register(r'interests', InterestsViewSet)
router.register(r'leadership', LeadershipViewSet)
router.register(r'experience', ExperienceViewSet)


urlpatterns = [
    # This includes URL patterns for the API endpoints.
    path('', include(router.urls)),
]
