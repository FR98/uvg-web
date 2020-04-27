from rest_framework import serializers

from events.models import Event
from babies.models import Baby
from babies.serializers import BabySerializer

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'event_type',
            'comment',
            'created_on',
            'baby'
        )
