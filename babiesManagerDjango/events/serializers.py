from rest_framework import serializers

from enumchoicefield import ChoiceEnum, EnumChoiceField
from events.models import Event, EventType
# from babies.models import Baby

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
    
    event_type = EnumChoiceField(enum_class = EventType)
