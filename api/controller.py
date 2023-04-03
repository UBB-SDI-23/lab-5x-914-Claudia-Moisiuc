#TODO: create a controller
from rest_framework import generics
from .models import Art
from .serializers import ArtSerializer


class ArtbyYear(generics.ListCreateAPIView):
    serializer_class = ArtSerializer

    def get_queryset(self):
        queryset = Art.objects.all()
        var = self.request.GET.get('var', 1885)
        if var is not None:
            queryset = queryset.filter(year__gt=var)
        return queryset

