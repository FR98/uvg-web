# Generated by Django 3.0.5 on 2020-04-25 19:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parents', '0001_initial'),
        ('babies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='baby',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='parents.Parent'),
        ),
    ]
