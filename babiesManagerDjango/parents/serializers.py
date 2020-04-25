from rest_framework import serializers

from parents.models import Parent


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = (
            'id',
            'firstname',
            'lastname'
        )