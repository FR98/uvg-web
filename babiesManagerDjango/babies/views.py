from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from guardian.shortcuts import assign_perm

from permissions.services import APIPermissionClassFactory
from babies.models import Baby
from babies.serializers import BabySerializer
from events.serializers import EventSerializer


class BabyViewSet(viewsets.ModelViewSet):
    queryset = Baby.objects.all()
    serializer_class = BabySerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='BabyPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': False,
                },
                'instance': {
                    'retrieve': 'babies.view_baby',
                    'update': 'babies.change_baby',
                    'partial_update': 'babies.change_baby',
                    'destroy': False,
                    'events': 'babies.view_baby',
                }
            }
        ),
    )

    def perform_create(self, serializer):
        if serializer.validated_data['parent']:
            baby = serializer.save()
            parent = self.request.user
            assign_perm('pets.view_baby', parent, baby)
            assign_perm('pets.change_baby', parent, baby)
        return Response(serializer.data)

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
