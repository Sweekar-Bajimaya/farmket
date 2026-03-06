'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/api';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductInfo from '@/components/products/ProductInfo';
import CustomerReviews from '@/components/products/CustomerReviews';
import RelatedProducts from '@/components/products/RelatedProducts';

interface ProductImage {
  id: number;
  image_url: string;
  alt_text: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  seller: string;
  price: string;
  discount_price: string | null;
  discount_percentage: number;
  final_price: number;
  stock_quantity: number;
  unit: string;
  sku: string;
  status: string;
  is_featured: boolean;
  average_rating: string;
  total_reviews: number;
  total_sold: number;
  images: ProductImage[];
  is_in_stock: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch product by slug using detail endpoint
      const response = await fetch(API_ENDPOINTS.productDetail(slug));
      
      if (!response.ok) {
        setError('Product not found');
        setLoading(false);
        return;
      }
      
      const foundProduct = await response.json();
      setProduct(foundProduct);

      // Fetch related products from the same category
      const relatedResponse = await fetch(
        `${API_ENDPOINTS.product}?category=${foundProduct.category.slug}&page_size=5`
      );
      const relatedData = await relatedResponse.json();
      const relatedProductsList = relatedData.results || relatedData;
      
      // Filter out current product and limit to 4
      const filtered = relatedProductsList
        .filter((p: Product) => p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(filtered);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId?: number) => {
    const id = productId || product?.id;
    console.log('Add to cart:', id);
    // TODO: Implement add to cart functionality
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product?.id);
    // TODO: Implement buy now functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Product not found'}
          </h2>
          <Link
            href="/products"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>›</span>
          <Link href="/products" className="hover:text-green-600">
            {product.category.name}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo
              name={product.name}
              category={product.category}
              seller={product.seller}
              price={product.price}
              final_price={product.final_price}
              discount_price={product.discount_price}
              discount_percentage={product.discount_percentage}
              unit={product.unit}
              stock_quantity={product.stock_quantity}
              average_rating={product.average_rating}
              total_reviews={product.total_reviews}
              description={product.description}
              is_featured={product.is_featured}
              is_in_stock={product.is_in_stock}
              onAddToCart={() => handleAddToCart()}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews
            averageRating={product.average_rating}
            totalReviews={product.total_reviews}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
