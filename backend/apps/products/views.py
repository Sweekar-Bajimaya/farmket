from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from .models import Product, ProductImage, Category
from .serializers import ProductSerializer, ProductImageSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class ProductPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class ProductListViewSet(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    pagination_class = ProductPagination
    filterset_fields = ['category__slug', 'status', 'is_featured', 'seller']
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
        