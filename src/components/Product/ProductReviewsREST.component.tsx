import React, { useMemo } from 'react';
import StarRating from '../UI/StarRating.component';
import { useReviewsStore } from '@/stores/reviewsStore';
import Image from 'next/image';

interface ProductReviewsRESTProps {
    productId: number;
}

import Link from 'next/link';

const ProductReviewsREST: React.FC<ProductReviewsRESTProps> = ({ productId }) => {
    const { getReviewsForProduct, reviews: allReviews, isLoading, error, fetchAllReviews } = useReviewsStore();
    const [page, setPage] = React.useState(1);
    const perPage = 3;

    // 1. Get current product reviews
    const productReviews = useMemo(() => getReviewsForProduct(productId), [productId, getReviewsForProduct]);

    // 2. Get site-wide reviews and SHUFFLE them for variety
    const siteWideReviews = useMemo(() => {
        const others = allReviews.filter(r => r.product_id !== productId);
        // Fisher-Yates Shuffle
        const shuffled = [...others];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [allReviews, productId]);

    // 3. Combine them: Current Product always shows first
    const combinedReviews = useMemo(() => {
        return [...productReviews, ...siteWideReviews];
    }, [productReviews, siteWideReviews]);

    // 4. Paginate
    const pagedReviews = useMemo(() => {
        return combinedReviews.slice(0, page * perPage);
    }, [combinedReviews, page]);

    const hasMore = pagedReviews.length < combinedReviews.length;

    if (isLoading && combinedReviews.length === 0) {
        return (
            <div className="py-8 bg-gray-50 rounded-lg text-center animate-pulse">
                <p className="text-gray-500">Syncing reviews...</p>
            </div>
        );
    }

    if (error && combinedReviews.length === 0) {
        return (
            <div className="py-8 bg-red-50 rounded-lg text-center border border-red-100 flex flex-col items-center gap-2">
                <p className="text-red-600 font-semibold">Unable to sync reviews</p>
                <p className="text-[10px] text-red-400 max-w-xs">{error}</p>
                <button
                    onClick={() => fetchAllReviews(true)}
                    className="mt-2 px-4 py-1.5 bg-red-600 text-white text-[10px] font-bold uppercase rounded-full hover:bg-red-700 transition-colors"
                >
                    Retry Sync
                </button>
            </div>
        );
    }

    if (combinedReviews.length === 0 && !isLoading) {
        return (
            <div className="py-8 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-500 mb-2 font-medium">No reviews yet</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">Be the first to share your experience with this community!</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 prose-sm pb-10">
            <div className="space-y-8">
                {pagedReviews.map((review, index) => {
                    const isForCurrentProduct = review.product_id === productId;
                    return (
                        <div key={`${review.id}-${index}`} className="pb-8 border-b border-gray-100 last:border-0">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                {/* Left Side: Product Image (Always show for context in global list) */}
                                {review.product_image && (
                                    <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden bg-white shadow-sm">
                                        <Image src={review.product_image} alt={review.product_name || 'Product'} fill className="object-cover" />
                                    </div>
                                )}

                                {/* Right Side: Content Stack */}
                                <div className="flex-grow min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                                        <div className="flex flex-col">
                                            {/* Product Title (Link if not current) */}
                                            {review.product_name && (
                                                <Link
                                                    href={review.product_permalink?.replace('https://shopwice.com', '') || '#'}
                                                    className={`text-sm font-bold uppercase tracking-tight ${isForCurrentProduct ? 'text-gray-900 cursor-default' : 'text-blue-600 hover:underline'}`}
                                                    onClick={(e) => isForCurrentProduct && e.preventDefault()}
                                                >
                                                    {review.product_name}
                                                </Link>
                                            )}

                                            {/* Star Rating immediately below title */}
                                            <div className="mt-1 flex items-center gap-2">
                                                <StarRating rating={review.rating || 0} size={12} />
                                                {review.verified && (
                                                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <span className="text-[10px] text-gray-400 font-medium sm:mt-0.5">
                                            {new Date(review.date_created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>

                                    {/* Review Text */}
                                    <div
                                        className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4"
                                        dangerouslySetInnerHTML={{ __html: review.review }}
                                    />

                                    {/* Reviewer Details */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500 uppercase">
                                            {review.reviewer.charAt(0)}
                                        </div>
                                        <span className="text-xs font-bold text-gray-800">{review.reviewer}</span>
                                    </div>

                                    {/* Attached Review Images */}
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex flex-wrap gap-2.5 mt-2">
                                            {review.images.map((img) => (
                                                <div key={img.id} className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm bg-gray-50 group">
                                                    <Image
                                                        src={img.src}
                                                        alt={img.alt || 'Review image'}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300 cursor-zoom-in"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all transform active:scale-95"
                    >
                        Load More Reviews
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductReviewsREST;
