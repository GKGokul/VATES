# Generated by Django 2.0.2 on 2018-09-04 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbmsproj', '0003_auto_20180904_0620'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cab',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=2),
        ),
    ]
