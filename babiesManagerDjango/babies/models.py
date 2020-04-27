from django.db import models

class Baby(models.Model):
    firstname = models.CharField(
        max_length = 50,
        null = False
    )
    lastname = models.CharField(
        max_length = 50,
        null = False
    )
    parent = models.ForeignKey(
        'parents.Parent',
        on_delete = models.SET_NULL,
        null = True
    )

    def __str__(self):
        return self.firstname + self.lastname
