from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from guardian.shortcuts import assign_perm

from permissions.services import APIPermissionClassFactory
from events.models import Event
from events.serializers import EventSerializer
from babies.models import Baby

def check_baby_parent(user, obj, request):
    return user.id == obj.baby.parent.id


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='EventPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': False,
                },
                'instance': {
                    'retrieve': check_baby_parent,
                    'update': False,
                    'partial_update': False,
                    'destroy': check_baby_parent,
                }
            }
        ),
    )

    def perform_create(self, serializer):
        parent = self.request.user
        baby = serializer.validated_data['baby']
        if baby.parent.id == parent.id:
            event = serializer.save()
            return Response(serializer.data)
            
        # Retornar error
        return Response(serializer.data)

'''
CRUD
'''
