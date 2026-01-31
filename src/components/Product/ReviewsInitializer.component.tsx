import { useEffect } from 'react';
import { useReviewsStore } from '@/stores/reviewsStore';

/**
 * Non-rendering component responsible for initializing the reviews state
 * by fetching data from the REST API once.
 */
const ReviewsInitializer = () => {
    const { fetchAllReviews } = useReviewsStore();

    useEffect(() => {
        fetchAllReviews();
    }, [fetchAllReviews]);

    return null;
};

export default ReviewsInitializer;
