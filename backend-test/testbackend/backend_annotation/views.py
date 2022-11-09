from rest_framework import viewsets
from .serializers import DocumentSerializer
from .models import Document

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()