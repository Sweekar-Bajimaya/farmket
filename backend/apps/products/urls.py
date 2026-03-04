from django.urls import path
from .views import ProductListViewSet

urlpatterns = [
    path('', ProductListViewSet.as_view(), name='product-list'),
]