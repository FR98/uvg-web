from django.shortcuts import render
from rest_framework import viewsets

from babies.models import Baby
from babies.serializers import BabySerializer


class BabyViewSet(viewsets.ModelViewSet):
    queryset = Baby.objects.all()
    serializer_class = BabySerializer
