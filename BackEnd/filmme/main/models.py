from django.db import models

# Create your models here.

class Cinema(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    discription = models.TextField()
    cite_url = models.URLField(max_length=200)
    star = models.DecimalField(max_digits=2, decimal_places=1)
    like_cnt = models.IntegerField(default=0)
    location = models.CharField(max_length=50, default='')
    latitude = models.FloatField(default=37.579472)
    longitude = models.FloatField(default=126.976872)
    class Meta:
        db_table = 'Cinema'

class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    cinema = models.ForeignKey(Cinema, related_name='movies', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    poster_url = models.URLField(max_length=200, blank=True)
    class Meta:
        db_table = 'Movie'