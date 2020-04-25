from django.db import models
from enum import Enum

class EventType(Enum):
    siesta  = 'Siesta'
    pacha   = 'Pacha'
    pipi    = 'Pipi'
    popo    = 'Popo'
    pecho   = 'Pecho'


# Create an Event like this:
#   your_event = Event(event_type = EventType.siesta, comment = "A comment here", baby = Baby)
#   your_event.save()
class Event(models.Model):
    event_type = models.CharField(
        max_length = 25,
        choices = [ (tag, tag.value) for tag in EventType ]
    )
    comment = models.CharField(
        max_length = 250
    )
    created_on = models.DateTimeField(
        auto_now_add = True
    )
    baby = models.ForeignKey(
        'babies.Baby',
        on_delete = models.SET_NULL,
        null = True
    )

    def __str__(self):
        return self.event_type