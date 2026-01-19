
import React from 'react';
import StarRating from '../UI/StarRating.component';

interface Review {
    id: string;
    content: string;
    date: string;
    rating?: number;
    author: {
        node: {
            name: string;
        };
    };
}

interface ProductReviewsProps {
    reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-8 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-400">Be the first to create a review</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.author.node.name}</h4>
                        <span className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                        </span>
                    </div>
                    <div
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductReviews;
