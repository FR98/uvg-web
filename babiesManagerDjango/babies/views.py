from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from babies.models import Baby
from babies.serializers import BabySerializer
from events.serializers import EventSerializer


class BabyViewSet(viewsets.ModelViewSet):
    queryset = Baby.objects.all()
    serializer_class = BabySerializer

    @action(detail=True, methods=['get'])
    def events(self, request, pk=None):
        baby = self.get_object()
        events = baby.event_set.all()

        return Response({
            'status': 'ok',
            'events': [EventSerializer(event).data for event in events]
        })

'''
CRUD
'''
