from django.db import models

# Create your models here.
class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    cinema = models.CharField(max_length=100)
    name = models.CharField(max_length=15)

class Cinema(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    discription = models.TextField()
    cite_url = models.URLField(max_length=200)
    star = models.DecimalField(max_digits=2, decimal_places=1)
    like_cnt = models.IntegerField(default=0)
    location = models.CharField(max_length=50, default='')
    class Meta:
        db_table = 'Cinema'