from django.db import models
from django.core.exceptions import ValidationError
import datetime

"""
{
"name": ,
"date_birth":,
"dat_death":,
"period":,
"originated":,
}
"""



def integer_poz_validator(value):
    if value > 0:
        return value
    else:
        raise ValidationError("This field does not accept negative values.")


def not_current_date(value):
    current_date = datetime.date.today()
    if value != current_date:
        return value
    else:
        raise ValidationError("The current date is invalid for this field.")


def capacity_validator(value):
    if value < 10000:
        return value
    else:
        raise ValidationError("This field does not accept values over 1000.")


class Author(models.Model):
    name = models.CharField(max_length=100)
    date_birth = models.CharField(max_length=100)
    date_death = models.CharField(max_length=100)
    period = models.CharField(max_length=100)
    originated = models.CharField(max_length=100)

    def __str__(self):
        return self.name


"""
{
"country": ,
"city":,
}
"""


class Location(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    to_visit = models.CharField(max_length=100000, default='No locations to visit yet.')


'''class Theme(models.Model):
    name = models.CharField(max_length=100)'''

"""
{
"name": ,
"location":,
"theme":,
"street":,
"capacity":,
}
"""


class Gallery(models.Model):
    name = models.CharField(max_length=100)
    location = models.ForeignKey(Location, related_name='galleries', on_delete=models.CASCADE)
    theme = models.CharField(max_length=100)
    street = models.CharField(max_length=100, default="unknown")
    capacity = models.IntegerField(validators=[capacity_validator])
    members = models.ManyToManyField(Author, through="GalleryAuthor")

    def __str__(self):
        return self.name


"""
{
"title": ,
"author":,
"year":,
"type":,
"material":,
"gallery":,
}
"""


class Art(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name='arts', on_delete=models.CASCADE, default=0)
    year = models.IntegerField(validators=[integer_poz_validator])
    type = models.CharField(max_length=100)
    material = models.CharField(max_length=200)
    gallery = models.ForeignKey(Gallery, related_name='arts', on_delete=models.CASCADE, default=0)

    def __str__(self):
        return self.title


class GalleryAuthor(models.Model):
    author = models.ForeignKey(Author, related_name='galleries', on_delete=models.CASCADE)
    gallery = models.ForeignKey(Gallery, related_name='authors', on_delete=models.CASCADE)
    starting_exposition = models.CharField(max_length=100)
    ending_exposition = models.CharField(max_length=100)
    nb_participants = models.IntegerField(default=0, validators=[integer_poz_validator])
    invited = models.IntegerField(default=0, validators=[integer_poz_validator])

