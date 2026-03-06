from rest_framework import serializers
from .models import Product, ProductImage, Category

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text']
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
        
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    seller = serializers.CharField(source='seller.business_name', read_only=True)
    category = CategorySerializer(read_only=True)
    discount_percentage = serializers.FloatField(read_only=True)
    final_price = serializers.FloatField(read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'seller', 'slug', 'description', 'category', 'price', 'discount_price',
            'discount_percentage', 'final_price', 'stock_quantity', 'unit', 'sku',
            'status', 'is_featured', 'average_rating', 'total_reviews', 'total_sold',
            'images', 'is_in_stock', 'created_at', 'updated_at'
        ]
        