import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReviewsStore } from '@/stores/reviewsStore';

const RecentRefurbishedReviewsREST = () => {
    const { reviews: allReviews, isLoading, error } = useReviewsStore();
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const reviews = useMemo(() => {
        // Shuffle all reviews and take 10
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, 10);
    }, [allReviews]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    if (!mounted) return null;
    if (isLoading && reviews.length === 0) return (
        <div className="mt-6 border-t border-gray-100 pt-4 relative group animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
            <div className="relative overflow-hidden min-h-[140px] bg-gray-50 rounded-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>)}
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2 mt-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
    if (error && reviews.length === 0) return null;
    if (reviews.length === 0 && !isLoading) return null;

    return (
        <div className="mt-6 border-t border-gray-100 pt-4 relative group">
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-tight">Recent Customer Feedback</h4>

            <div className="relative overflow-hidden min-h-[140px] bg-gray-50 rounded-lg border border-gray-100">
                {/* Navigation Arrows */}
                {reviews.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </>
                )}

                <div
                    className="flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {reviews.map((review) => (
                        <div key={review.id} className="min-w-full p-4 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex gap-3 mb-3">
                                    {review.product_image && (
                                        <div className="w-14 h-14 relative rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden shadow-sm bg-white">
                                            <Image
                                                src={review.product_image}
                                                alt={review.product_name || 'Product'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-grow min-w-0 pt-0.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-bold text-gray-900 text-[11px] uppercase tracking-wider truncate">{review.reviewer || 'Customer'}</span>
                                            <span className="text-gray-400 text-[9px] font-medium uppercase tracking-tighter">
                                                {new Date(review.date_created).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {review.rating && (
                                            <div className="flex text-yellow-400 mt-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        )}
                                        {review.verified && (
                                            <span className="text-[8px] text-green-600 font-bold uppercase tracking-widest mt-0.5">
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="text-gray-600 mb-3 leading-relaxed text-xs line-clamp-3 italic opacity-80"
                                    dangerouslySetInnerHTML={{ __html: review.review }}
                                />
                            </div>

                            <div className="mt-auto space-y-3">
                                {review.images && review.images.length > 0 && (
                                    <div className="flex gap-2 overflow-hidden pb-1">
                                        {review.images.slice(0, 3).map((img) => (
                                            <div key={img.id} className="relative w-12 h-12 rounded border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                                                <Image src={img.src} alt="Review" fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {review.product_permalink && review.product_name && (
                                    <Link
                                        href={review.product_permalink.replace('https://shopwice.com', '')}
                                        className="text-[10px] text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 font-bold uppercase tracking-tight border-t border-gray-50 pt-2"
                                    >
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                        View Item
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Indicator */}
            {reviews.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-2">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentRefurbishedReviewsREST;
