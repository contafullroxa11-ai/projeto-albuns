# Generated for the Album model.
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="Album",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=50)),
                ("artista", models.CharField(max_length=50)),
                ("ano", models.DateField()),
                ("avaliação", models.FloatField()),
            ],
        ),
    ]
