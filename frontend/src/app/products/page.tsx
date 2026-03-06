'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/api';
import ProductGrid from '@/components/products/ProductGrid';


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

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, minPrice, maxPrice, currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (minPrice) params.append('min_price', minPrice);
      if (maxPrice) params.append('max_price', maxPrice);
      params.append('page', currentPage.toString());
      params.append('page_size', ITEMS_PER_PAGE.toString());
      
      const url = `${API_ENDPOINTS.product}?${params.toString()}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if response is paginated
      if (data.results) {
        setProducts(data.results);
        setTotalProducts(data.count);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      } else {
        // If backend doesn't support pagination, handle client-side
        setProducts(data);
        setTotalProducts(data.length);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.category);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? '' : slug);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (productId: number) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">
            {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : 'All Products'}
          </span>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CATEGORY</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category.slug}
                        onChange={() => handleCategoryChange(category.slug)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">PRICE RANGE</h3>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min ($0)"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max ($50+)"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">RATING</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                        <span className="text-sm ml-1">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {selectedCategory ? `Fresh ${categories.find(c => c.slug === selectedCategory)?.name}` : 'All Products'}
                </h1>
                <p className="text-gray-600">
                  Organic seasonal produce delivered straight from our local partner farms.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {products.length > 0 ? ((currentPage - 1) * ITEMS_PER_PAGE) + 1 : 0} - {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of {totalProducts} products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            <ProductGrid 
              products={products} 
              loading={loading} 
              onAddToCart={addToCart} 
            />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  ❮
                </button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`px-4 py-2 rounded ${
                        currentPage === page
                          ? 'bg-green-500 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  ❯
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}