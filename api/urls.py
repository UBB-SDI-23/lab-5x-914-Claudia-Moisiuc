from django.urls import path
from .views import ArtList, ArtDetail, GalleryByAuthor, AuthorDetail, AuthorList, AuthorWithPeriod, LocationList, LocationDetail, GalleryList, GalleryDetail, GalleryAuthorList, GalleryAuthorDetail
from .controller import ArtbyYear
from api import views

urlpatterns = [
    path('art/', ArtList.as_view()),
    path('art/<int:pk>/', ArtDetail.as_view()),
    path('author/', AuthorList.as_view()),
    path('author/<int:pk>/', AuthorDetail.as_view()),
    path('author/report/', AuthorWithPeriod.as_view()),
    path('location/', LocationList.as_view()),
    path('location/<int:pk>/', LocationDetail.as_view()),
    path('gallery/', GalleryList.as_view()),
    path('gallery/<int:pk>/', GalleryDetail.as_view()),
    path('gallery/<int:pk>/author/', views.author_from_gallery),
    path('gallery/report/', GalleryByAuthor.as_view()),
    path('galleryauthor/', GalleryAuthorList.as_view()),
    path('galleryauthor/<int:pk>/', GalleryAuthorDetail.as_view()),
    path('filter/', ArtbyYear.as_view())
]