from django.db.models import Avg, F, Count
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Art, Author, Location, Gallery, GalleryAuthor
from .serializers import ArtSerializerList, ArtSerializer, AuthorSerializer, LocationSerializer, GallerySerializer, AuthorSerializerList, GallerySerializerList, LocationSerializerList
from .serializers import GalleryAuthorSerializer, GalleryAuthorSerializerList, AuthorGalleryPeriodReport, GalleryNbAuthors


class GalleryAuthorList(generics.ListCreateAPIView):
    queryset = GalleryAuthor.objects.all()
    serializer_class = GalleryAuthorSerializer


class GalleryAuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryAuthor.objects.all()
    serializer_class = GalleryAuthorSerializerList


class ArtList(generics.ListCreateAPIView):
    queryset = Art.objects.all()
    serializer_class = ArtSerializerList


class ArtDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer


class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializerList


class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class GalleryList(generics.ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializerList


class GalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer


class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializerList


class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class AuthorWithPeriod(generics.ListAPIView):
    serializer_class = AuthorGalleryPeriodReport

    def get_queryset(self):
        queryset = Author.objects\
                .annotate(showing=Avg('authors__nb_participants'))\
                .order_by(F('showing').desc(nulls_last=True))
        return queryset


class GalleryByAuthor(generics.ListAPIView):
    serializer_class = GalleryNbAuthors

    def get_queryset(self):
        queryset = Gallery.objects \
            .annotate(nb_authors=Count('galleries__author')) \
            .order_by(F('nb_authors').desc(nulls_last=True))
        return queryset


@api_view(['GET', 'POST'])
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)


    elif request.method == 'POST':

        serializer = AuthorSerializerList(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def author_from_gallery(request, pk, pk2):
    try:
        au = GalleryAuthor.objects.get(gallery=pk2)
        author = Author.objects.get(id=au.author.id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializerList(author)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AuthorSerializerList(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)












