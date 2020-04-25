# Generated by Django 3.0.5 on 2020-04-25 19:16

from django.db import migrations, models
import events.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_type', models.CharField(choices=[(events.models.EventType['siesta'], 'Siesta'), (events.models.EventType['pacha'], 'Pacha'), (events.models.EventType['pipi'], 'Pipi'), (events.models.EventType['popo'], 'Popo'), (events.models.EventType['pecho'], 'Pecho')], max_length=25)),
                ('comment', models.CharField(max_length=250)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]