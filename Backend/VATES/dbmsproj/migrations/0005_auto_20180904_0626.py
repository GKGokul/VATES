# Generated by Django 2.0.2 on 2018-09-04 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbmsproj', '0004_auto_20180904_0620'),
    ]

    operations = [
        migrations.AddField(
            model_name='cab',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cab',
            name='total_dist',
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
        migrations.AlterField(
            model_name='trips',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
        migrations.AlterField(
            model_name='trips',
            name='distance',
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
    ]
