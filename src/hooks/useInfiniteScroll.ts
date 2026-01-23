import { useState, useEffect, useCallback, useRef } from 'react';
import client from '@/utils/apollo/ApolloClient';
import { GET_CATEGORY_DATA_BY_SLUG } from '@/utils/gql/GQL_QUERIES';
import { Product } from '@/types/product';
import { DocumentNode } from '@apollo/client';

interface UseInfiniteScrollProps {
    initialProducts: Product[];
    initialHasNextPage: boolean;
    initialEndCursor: string | null;
    slug: string;
    query?: DocumentNode;
    queryVariables?: Record<string, any>;
    context?: any;
}

export const useInfiniteScroll = ({
    initialProducts,
    initialHasNextPage,
    initialEndCursor,
    slug,
    query,
    queryVariables = {},
    context = {},
}: UseInfiniteScrollProps) => {
    const observerTarget = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
    const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
    const [isLoading, setIsLoading] = useState(false);

    // Update state when initial props change (e.g. navigation)
    useEffect(() => {
        setProducts(initialProducts);
        setHasNextPage(initialHasNextPage);
        setEndCursor(initialEndCursor);
    }, [initialProducts, initialHasNextPage, initialEndCursor]);

    const loadMore = useCallback(async () => {
        if (!hasNextPage || isLoading) return;

        setIsLoading(true);
        try {
            // Determine query and variables
            const activeQuery = query || GET_CATEGORY_DATA_BY_SLUG;
            const activeVariables = {
                first: 24, // Default to 24 if not specified
                ...queryVariables,
                after: endCursor,
                // Ensure slug and id are present if the query might need them
                ...(slug && !queryVariables.slug ? { slug } : {}),
                ...(slug && !queryVariables.id ? { id: slug } : {}),
            };

            console.log('LoadMore sending variables:', activeVariables);

            let data;

            if (context?.useDirectFetch) {
                // Direct fetch fallback to bypass Apollo Client middleware
                const fetchOptions = context?.fetchOptions || {};
                const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'omit',
                    cache: 'no-store', // Ensure we don't get cached stale pages
                    ...fetchOptions,
                    body: JSON.stringify({
                        query: require('graphql').print(activeQuery),
                        variables: activeVariables
                    }),
                });

                const json = await response.json();
                if (json.errors) throw new Error(json.errors[0].message);

                // Mock the data structure expected below
                data = json.data;
            } else {
                // Standard Apollo Client query
                const result = await client.query({
                    query: activeQuery,
                    variables: activeVariables,
                    context: context,
                    fetchPolicy: 'network-only',
                });
                data = result.data;
            }

            console.log('LoadMore Context:', context);
            console.log('LoadMore Data:', data);

            // Handle different response structures
            let newProducts: Product[] = [];
            let newPageInfo = { hasNextPage: false, endCursor: null };

            if (data?.productBrand?.products) {
                newProducts = data.productBrand.products.nodes;
                newPageInfo = data.productBrand.products.pageInfo;
            } else if (data?.productLocation?.products) {
                newProducts = data.productLocation.products.nodes;
                newPageInfo = data.productLocation.products.pageInfo;
            } else if (data?.productCategory?.products) {
                // Some queries might be nested under category
                newProducts = data.productCategory.products.nodes;
                newPageInfo = data.productCategory.products.pageInfo;
            } else if (data?.products) {
                // Standard structure or fallback
                newProducts = data.products.nodes;
                newPageInfo = data.products.pageInfo;
            }

            console.log('New Products Count:', newProducts.length);
            console.log('Next Page Info:', newPageInfo);

            if (newProducts.length > 0) {
                setProducts((prev) => [...prev, ...newProducts]);
                setHasNextPage(newPageInfo.hasNextPage);
                setEndCursor(newPageInfo.endCursor);
            } else {
                setHasNextPage(false);
            }
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [hasNextPage, isLoading, endCursor, slug, query, queryVariables, context]);

    // Intersection Observer effect
    useEffect(() => {
        const element = observerTarget.current;
        if (!element || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px', // Trigger slightly before the element is fully in view
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [loadMore, hasNextPage, isLoading]);

    return {
        products,
        hasNextPage,
        isLoading,
        loadMore,
        observerTarget, // Return the ref to be attached to a sentinel element
    };
};
