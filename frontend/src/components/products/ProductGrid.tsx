import ProductCard from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (productId: number) => void;
}

export default function ProductGrid({ products, loading, onAddToCart }: ProductGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="mt-2 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
}
