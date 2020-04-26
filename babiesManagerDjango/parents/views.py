from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from parents.models import Parent
from parents.serializers import ParentSerializer
from babies.serializers import BabySerializer


class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

    @action(detail=True, methods=['get'])
    def babies(self, request, pk=None):
        parent = self.get_object()
        babies = parent.baby_set.all()

        return Response({
            'status': 'ok',
            'babies': [BabySerializer(baby).data for baby in babies]
        })

'''
CRUD
'''
