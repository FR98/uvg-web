from django.shortcuts import render
from rest_framework import viewsets

from parents.models import Parent
from parents.serializers import ParentSerializer


class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
