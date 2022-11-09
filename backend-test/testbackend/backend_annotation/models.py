from django.db import models

# Create your models here.
class Document(models.Model):
    title = models.CharField(max_length=65)
    text = models.CharField(max_length=1000)
