from rest_framework import serializers
from .models import Art
from .models import Author
from .models import Location
from .models import Gallery
from .models import GalleryAuthor


class ArtSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Art
        fields = ['id', 'title', 'author', 'year', 'type', 'material', 'gallery']


class AuthorSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'date_birth', 'date_death', 'period', 'originated']


class GallerySerializerList(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'name', 'location', 'theme', 'street', 'capacity']


class LocationSerializer(serializers.ModelSerializer):
    galleries = GallerySerializerList(read_only=True, many=True)

    class Meta:
        model = Location
        fields = ['id', 'country', 'city', 'galleries']


class LocationSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'country', 'city']


class GallerySerializer(serializers.ModelSerializer):
    arts = ArtSerializerList(read_only=True, many=True)
    location = LocationSerializerList(read_only=True)
    members = AuthorSerializerList(read_only=True, many=True)

    class Meta:
        model = Gallery
        fields = ['id', 'name', 'location', 'theme', 'street', 'capacity', 'arts', 'members']


class ArtSerializer(serializers.ModelSerializer):
    author = AuthorSerializerList(read_only=True)
    gallery = GallerySerializerList(read_only=True)

    class Meta:
        model = Art
        fields = ['id', 'title', 'author', 'year', 'type', 'material', 'gallery', 'author']


class GalleryAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryAuthor
        fields = ['id', 'author', 'gallery', 'starting_exposition', 'ending_exposition', 'nb_participants', 'invited']


class GalleryAuthorSerializerList(serializers.ModelSerializer):
    author = AuthorSerializerList(read_only=True)
    gallery = GallerySerializerList(read_only=True)

    class Meta:
        model = GalleryAuthor
        fields = ['id', 'author', 'gallery', 'starting_exposition', 'ending_exposition', 'nb_participants', 'invited']


class AuthorGalleryPeriodReport(serializers.ModelSerializer):
    showing = serializers.FloatField()

    class Meta:
        model = Author
        fields = ['id', 'name', 'date_birth', 'date_death', 'period', 'originated', 'showing']



class GalleryNbAuthors(serializers.ModelSerializer):
    nb_authors = serializers.FloatField()

    class Meta:
        model = Gallery
        fields = ['id', 'name', 'location', 'theme', 'street', 'capacity', 'nb_authors']

#class ConnectionAuthorSerializer(serializers.ModelSerializer):
#    gallery = GallerySerializerList(read_only=True)

 #   class Meta:
  #      model = GalleryAuthor
   #     fields = ['gallery']

class GalleryForAuthorSerializerList(serializers.ModelSerializer):
    gallery = GallerySerializerList(read_only=True)

    class Meta:
        model = GalleryAuthor
        fields = ['id', 'gallery', 'starting_exposition', 'ending_exposition', 'nb_participants', 'invited']


class AuthorSerializer(serializers.ModelSerializer):
    arts = ArtSerializerList(read_only=True, many=True)
    galleries = GalleryForAuthorSerializerList(read_only=True, many=True)

    class Meta:
        model = Author
        fields = ['id', 'name', 'date_birth', 'date_death', 'period', 'originated', 'arts', 'galleries']





















