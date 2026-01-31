import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
    id: number;
    product_id: number;
    product_name?: string;
    product_permalink?: string;
    product_image?: string;
    status: string;
    reviewer: string;
    reviewer_email: string;
    review: string;
    rating: number;
    verified: boolean;
    date_created: string;
    images?: Array<{ id: number; src: string; alt: string }>;
}

interface ReviewsState {
    reviews: Review[];
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
    fetchAllReviews: (force?: boolean) => Promise<void>;
    getReviewsForProduct: (productId: number) => Review[];
}

export const useReviewsStore = create<ReviewsState>()(
    persist(
        (set, get) => ({
            reviews: [],
            isLoading: false,
            error: null,
            lastFetched: null,

            fetchAllReviews: async (force = false) => {
                const { lastFetched, isLoading } = get();
                const now = Date.now();

                // Fetch once every 24 hours unless forced
                if (!force && lastFetched && now - lastFetched < 24 * 60 * 60 * 1000) {
                    return;
                }

                if (isLoading) return;

                set({ isLoading: true, error: null });

                try {
                    const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;
                    if (!apiUrl) throw new Error('REST API URL is not defined in environment variables');

                    const fetchUrl = `${apiUrl}/products/reviews?per_page=100`;
                    console.log(`[ReviewsStore] Syncing all reviews: ${fetchUrl}`);

                    const response = await fetch(fetchUrl);

                    if (!response.ok) {
                        const errorMsg = `Server returned ${response.status} ${response.statusText}`;
                        console.error(`[ReviewsStore] ${errorMsg}`);
                        throw new Error(errorMsg);
                    }

                    const contentType = response.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error(`Expected JSON but received: ${contentType}`);
                    }

                    const data = await response.json();

                    if (Array.isArray(data)) {
                        set({
                            reviews: data,
                            lastFetched: now,
                            isLoading: false,
                            error: null
                        });
                        console.log(`[ReviewsStore] Successfully synced ${data.length} reviews.`);
                    } else {
                        throw new Error('Invalid reviews data received: expected an array');
                    }
                } catch (error: any) {
                    console.error('Reviews Store Critical Error:', error);
                    const errorMessage = error.message || 'Unknown network or parsing error';
                    set({
                        error: `Fetch Failed: ${errorMessage}`,
                        isLoading: false
                    });
                }
            },

            getReviewsForProduct: (productId: number) => {
                return get().reviews.filter(r => r.product_id === productId);
            }
        }),
        {
            name: 'shopwice-reviews-storage',
            partialize: (state) => ({
                reviews: state.reviews,
                lastFetched: state.lastFetched
            }),
        }
    )
);
