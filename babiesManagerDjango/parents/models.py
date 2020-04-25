from django.db import models
from django.contrib.auth.models import User

class Parent(User):
    firstname = models.CharField(
        max_length = 50
    )
    lastname = models.CharField(
        max_length = 50
    )

    def __str__(self):
        return self.firstname + self.lastname
