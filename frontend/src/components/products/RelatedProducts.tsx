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

interface RelatedProductsProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export default function RelatedProducts({ products, onAddToCart }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
