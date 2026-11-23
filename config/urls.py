from django.contrib import admin
from django.urls import path

from albuns.views import api_album

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/album/", api_album, name="api_album"),
]
