from django.db import models

# Create your models here.
class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    cinema = models.CharField(max_length=100)
    name = models.CharField(max_length=15)
    # poster -> 오류

class Cinema(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    discription = models.TextField()
    # pictuer -> 오류
    cite_URl = models.URLField(max_length=200)
    star = models.DecimalField(max_digits=2, decimal_places=1)
    like = models.IntegerField(default=0)
    # movie_list -> ?