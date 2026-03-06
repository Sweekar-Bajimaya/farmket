'use client';

import { FaCheckCircle, FaTruck } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProductInfoProps {
  name: string;
  category: Category;
  seller: string;
  price: string;
  final_price: number;
  discount_price: string | null;
  discount_percentage: number;
  unit: string;
  stock_quantity: number;
  average_rating: string;
  total_reviews: number;
  description: string;
  is_featured: boolean;
  is_in_stock: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export default function ProductInfo({
  name,
  category,
  seller,
  price,
  final_price,
  discount_price,
  discount_percentage,
  unit,
  stock_quantity,
  average_rating,
  total_reviews,
  description,
  is_featured,
  is_in_stock,
  onAddToCart,
  onBuyNow,
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Badge */}
      {is_featured && (
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
          Farm Fresh
        </span>
      )}

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < Math.floor(parseFloat(average_rating))
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {average_rating} ({total_reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gray-900">
          ${final_price.toFixed(2)}
        </span>
        <span className="text-lg text-gray-500">/{unit}</span>
        {discount_price && (
          <span className="text-xl text-gray-400 line-through">${price}</span>
        )}
        {discount_percentage > 0 && (
          <span className="text-green-600 font-semibold">
            {discount_percentage}% OFF
          </span>
        )}
      </div>

      {/* Seller Info */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 font-semibold text-lg">{seller.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{seller}</p>
          <p className="text-sm text-gray-600">
            Food River, Oregon • <span className="text-green-600">Verified Producer</span>
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed">
          {description || `Our ${name} are known for their exceptionally crisp texture and perfectly balanced sweet-tart flavor. Hand-picked at peak ripeness to ensure every bite is bursting with juice.`}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCheckCircle className="text-green-600" />
          <span>Certified USDA Organic</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaTruck className="text-green-600" />
          <span>Delivered within 24 hours of harvest</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCheckCircle className="text-green-600" />
          <span>Stock: {stock_quantity} {unit} available</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onAddToCart}
          disabled={!is_in_stock}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
            is_in_stock
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {is_in_stock ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
        <button
          onClick={onBuyNow}
          disabled={!is_in_stock}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
            is_in_stock
              ? 'bg-gray-900 hover:bg-gray-800 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
