from django.db import models

# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # Add more fields as needed

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(
        default=False, verbose_name='Currently working here')
    description = models.TextField()

    def __str__(self):
        return f"{self.position} at {self.company}"

    def clean(self):
        if self.is_current:
            self.end_date = None

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Leadership(models.Model):
    organization = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(
        default=False, verbose_name='Currently working here')
    description = models.TextField()

    def __str__(self):
        return f"{self.position} at {self.organization}"

    def clean(self):
        if self.is_current:
            self.end_date = None

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Skills(models.Model):
    category = models.CharField(max_length=100)  # New field for category
    description = models.TextField()

    def __str__(self):
        return f"{self.category}: {self.description[:50]}"


class Education(models.Model):
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    gpa = models.CharField(max_length=100)
    related_courses = models.CharField(max_length=1000)
    field_of_study = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.degree} at {self.institution}"


class Interests(models.Model):
    description = models.TextField()

    def __str__(self):
        return f"{self.description[:50]}"
