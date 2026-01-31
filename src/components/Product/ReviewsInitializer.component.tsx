import { useEffect } from 'react';
import { useReviewsStore } from '@/stores/reviewsStore';

/**
 * Non-rendering component responsible for initializing the reviews state
 * by fetching data from the REST API once.
 */
const ReviewsInitializer = () => {
    const { fetchAllReviews, reviews, lastFetched, isLoading } = useReviewsStore();

    useEffect(() => {
        const now = Date.now();
        const isStale = !lastFetched || (now - lastFetched > 24 * 60 * 60 * 1000);

        // Only fetch if we have no reviews, or data is stale, AND we are not currently loading
        if ((reviews.length === 0 || isStale) && !isLoading) {
            fetchAllReviews();
        }
    }, [fetchAllReviews, reviews.length, lastFetched, isLoading]);

    return null;
};

export default ReviewsInitializer;
