from django.db import models

class Album(models.Model):
    titulo = models.CharField(max_length=50)
    artista = models.CharField(max_length=50)
    ano = models.DateField()
    avaliação = models.FloatField()
    def __str__(self):
        return self.titulo