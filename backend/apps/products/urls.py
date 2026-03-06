from django.urls import path
from .views import CategoryListView, ProductListViewSet, ProductDetailView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListViewSet.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]