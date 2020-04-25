from rest_framework import serializers

from babies.models import Baby
# from parents.models import Parent

class BabySerializer(serializers.ModelSerializer):
    class Meta:
        model = Baby
        fields = (
            'id',
            'firstname',
            'lastname',
            'parent'
        )