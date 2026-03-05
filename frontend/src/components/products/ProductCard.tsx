import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus } from "react-icons/fa6";

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 cursor-pointer">
          {product.discount_percentage > 0 && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
              {product.discount_percentage}% OFF
            </span>
          )}
          {product.is_featured && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
              FEATURED
            </span>
          )}
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].image_url}
              alt={product.images[0].alt_text || product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Image src="/placeholder.png" alt="Placeholder" fill className="object-cover" />
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          {product.stock_quantity}{product.unit} • {product.category.name}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < Math.floor(parseFloat(product.average_rating)) ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.average_rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${product.final_price.toFixed(2)}
            </span>
            {product.discount_price && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.price}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            disabled={!product.is_in_stock}
            className={`p-2 rounded-lg transition-colors ${
              product.is_in_stock
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title={product.is_in_stock ? 'Add to cart' : 'Out of stock'}
          >
            <FaCartPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
