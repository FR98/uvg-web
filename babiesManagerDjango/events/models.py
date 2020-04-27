from django.db import models
from django.utils.translation import gettext_lazy as _

class Event(models.Model):
    class EventType(models.TextChoices):
        siesta  = 'Siesta', _('Siesta')
        pacha   = 'Pacha', _('Pacha')
        pipi    = 'Pipi', _('Pipi')
        popo    = 'Popo', _('Popo')
        pecho   = 'Pecho', _('Pecho')

    event_type = models.CharField(
        choices = EventType.choices,
        max_length = 50,
        # default = EventType.siesta,
        # editable = False
    )
    comment = models.CharField(
        max_length = 250,
        null = True
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
