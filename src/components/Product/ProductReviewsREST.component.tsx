import React, { useMemo } from 'react';
import StarRating from '../UI/StarRating.component';
import { useReviewsStore } from '@/stores/reviewsStore';
import Image from 'next/image';

interface ProductReviewsRESTProps {
    productId: number;
    productImage?: string;
    productName?: string;
}

import Link from 'next/link';

const ProductReviewsREST: React.FC<ProductReviewsRESTProps> = ({ productId, productImage, productName }) => {
    const { getReviewsForProduct, reviews: allReviews, isLoading, error } = useReviewsStore();
    const [page, setPage] = React.useState(1);
    const perPage = 3;

    const [extraProductData, setExtraProductData] = React.useState<Record<number, { name: string, image: string, permalink: string }>>({});

    // 1. Get current product reviews
    const productReviews = useMemo(() => getReviewsForProduct(productId), [productId, getReviewsForProduct]);

    // 2. Get site-wide reviews (latest 100 fetched) to fill gaps if product has no reviews
    const siteWideReviews = useMemo(() => {
        if (productReviews.length > 0) return [];

        const others = allReviews.filter((r: any) => r.product_id !== productId);
        return others.slice(0, 5);
    }, [allReviews, productId, productReviews.length]);

    // 3. Combine them
    const combinedReviews = useMemo(() => {
        return [...productReviews, ...siteWideReviews];
    }, [productReviews, siteWideReviews]);

    // Fetch details for reviews that are missing product data
    React.useEffect(() => {
        const missingDataIds = combinedReviews
            .filter(r => r.product_id !== productId && !r.product_image && !extraProductData[r.product_id])
            .map(r => r.product_id);

        const uniqueIds = Array.from(new Set(missingDataIds));

        if (uniqueIds.length === 0) return;

        const fetchDetails = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL || '/api';
                // Fetch products by ID using include param
                const res = await fetch(`${apiUrl}/products?include=${uniqueIds.join(',')}`);

                if (!res.ok) {
                    console.warn(`[ProductReviewsREST] Failed to fetch product details. Status: ${res.status}`);
                    return;
                }

                const text = await res.text();
                try {
                    const products = JSON.parse(text);
                    if (Array.isArray(products)) {
                        const newData: typeof extraProductData = {};
                        products.forEach((p: any) => {
                            newData[p.id] = {
                                name: p.name,
                                image: p.images?.[0]?.src || '',
                                permalink: p.permalink
                            };
                        });
                        setExtraProductData(prev => ({ ...prev, ...newData }));
                    }
                } catch (e) {
                    console.error("[ProductReviewsREST] JSON Parse Error. Response:", text.substring(0, 100)); // Log first 100 chars to debug
                }
            } catch (err) {
                console.error("Failed to fetch product details for reviews", err);
            }
        };

        // Debounce slightly or just run
        fetchDetails();
    }, [combinedReviews, productId]); // reliance on extraProductData check prevents loop

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
                <p className="text-[10px] text-gray-400 mt-2">Will retry automatically later.</p>
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
                    const extra = extraProductData[review.product_id];

                    // Use prop fallback ONLY if the review is for the current product
                    const displayImage = isForCurrentProduct
                        ? (review.product_image || productImage)
                        : (review.product_image || extra?.image);

                    const displayName = isForCurrentProduct
                        ? (review.product_name || productName)
                        : (review.product_name || extra?.name);

                    return (
                        <div key={`${review.id}-${index}`} className="pb-8 border-b border-gray-100 last:border-0">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                {/* Left Side: Product Image (Always show for context in global list) */}
                                {displayImage && (
                                    <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden bg-white shadow-sm">
                                        <Image src={displayImage} alt={displayName || 'Product'} fill className="object-cover" />
                                    </div>
                                )}

                                {/* Right Side: Content Stack */}
                                <div className="flex-grow min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                                        <div className="flex flex-col">
                                            {/* Product Title (Link if not current) */}
                                            {displayName && (
                                                <Link
                                                    href={review.product_permalink?.replace('https://shopwice.com', '') || extra?.permalink?.replace('https://shopwice.com', '') || '#'}
                                                    className={`text-sm font-bold uppercase tracking-tight ${isForCurrentProduct ? 'text-gray-900 cursor-default' : 'text-blue-600 hover:underline'}`}
                                                    onClick={(e) => isForCurrentProduct && e.preventDefault()}
                                                >
                                                    {displayName}
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
                                            {review.images.map((img: any) => (
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
