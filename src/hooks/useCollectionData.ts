import { useState, useEffect } from 'react';

interface CollectionData {
    price_range: {
        min: number;
        max: number;
    };
    brands: string[];
    locations: string[];
    attributes: Array<{
        name: string;
        options: string[];
    }>;
    categories: string[];
}

export const useCollectionData = () => {
    const [data, setData] = useState<CollectionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/collection-data`);
                if (!response.ok) {
                    throw new Error('Failed to fetch collection data');
                }
                const json = await response.json();
                setData(json);
            } catch (err: any) {
                console.error('Error fetching collection data:', err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, isLoading, error };
};
