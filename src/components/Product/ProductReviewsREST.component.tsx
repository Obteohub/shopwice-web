import React, { useEffect, useState } from 'react';
import StarRating from '../UI/StarRating.component';

interface Review {
    id: number;
    product_id: number;
    status: string;
    reviewer: string;
    reviewer_email: string;
    review: string;
    rating: number;
    verified: boolean;
    date_created: string;
}

interface ProductReviewsRESTProps {
    productId: number;
}

const ProductReviewsREST: React.FC<ProductReviewsRESTProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.shopwice.com/api/reviews?product_id=${productId}&per_page=100`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setReviews(data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
                setError(err instanceof Error ? err.message : 'Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="py-8 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500">Loading reviews...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 mb-2">Unable to load reviews</p>
                <p className="text-sm text-gray-400">{error}</p>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-8 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-500 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-500">Only customers who have purchased this product may leave a review</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-left justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-sm">{review.reviewer}</h4>
                            <div className="mt-1 flex items-center gap-2">
                                <StarRating rating={review.rating || 0} size={14} />
                                {review.verified && (
                                    <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
                                )}
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">
                            {new Date(review.date_created).toLocaleDateString()}
                        </span>
                    </div>
                    <div
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: review.review }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductReviewsREST;
