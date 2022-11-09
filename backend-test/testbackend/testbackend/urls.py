from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from backend_annotation import views

router = routers.DefaultRouter()
router.register(r'docs', views.TodoView, 'document')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
