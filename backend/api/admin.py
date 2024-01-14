from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Project, Experience, Leadership, Skills, Education, Interests

admin.site.register(Project)
admin.site.register(Experience)
admin.site.register(Leadership)
admin.site.register(Skills)
admin.site.register(Education)
admin.site.register(Interests)
