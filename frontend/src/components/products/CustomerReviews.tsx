'use client';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

interface CustomerReviewsProps {
  reviews?: Review[];
  averageRating: string;
  totalReviews: number;
}

export default function CustomerReviews({
  reviews = [],
  averageRating,
  totalReviews,
}: CustomerReviewsProps) {
  // Mock reviews if none provided
  const displayReviews: Review[] = reviews.length > 0 ? reviews : [
    {
      id: 1,
      user: 'Jane Doe',
      rating: 5,
      comment: 'The crispiest apples ever! Absolutely worth it. You can really taste the difference between these and supermarket apples. Super juicy and perfectly sweet!',
      verified: true,
      date: '2025-12-20',
    },
    {
      id: 2,
      user: 'Mark Smith',
      rating: 5,
      comment: 'The delivery was fast and the apples arrived in perfect condition. They\'re a bit expensive but for organic farm-fresh quality, I\'m happy!',
      verified: true,
      date: '2025-12-18',
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <button className="text-green-600 hover:text-green-700 font-semibold">
          Write a review
        </button>
      </div>

      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-center gap-3 mb-2">
              {/* User Avatar */}
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-semibold text-sm">
                  {review.user.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{review.user}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-xs text-green-600">• Verified Buyer</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-700 ml-13">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
