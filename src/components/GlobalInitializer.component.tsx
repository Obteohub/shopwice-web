import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useGlobalStore } from '@/stores/globalStore';
import { FETCH_ALL_CATEGORIES_QUERY, FETCH_HOME_PAGE_DATA } from '@/utils/gql/GQL_QUERIES';

/**
 * GlobalInitializer component to prefetch and cache common data on the client.
 * This ensures data is available for instant navigation without SSR overhead
 * or hydration mismatches.
 */
const GlobalInitializer = () => {
    const [isMounted, setIsMounted] = useState(false);
    const setCategories = useGlobalStore((state) => state.setCategories);
    const setHomeData = useGlobalStore((state) => state.setHomeData);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fetch Categories for navigation
    const { data: categoryData } = useQuery(FETCH_ALL_CATEGORIES_QUERY, {
        fetchPolicy: 'cache-first',
        skip: !isMounted,
    });

    // Prefetch Home Page data to warm the cache
    const { data: homeData } = useQuery(FETCH_HOME_PAGE_DATA, {
        variables: { promoProductSlug: "microsoft-xbox-x-wireless-controller" },
        fetchPolicy: 'cache-and-network',
        skip: !isMounted,
    });

    useEffect(() => {
        if (categoryData?.productCategories?.nodes) {
            setCategories(categoryData.productCategories.nodes);
        }
    }, [categoryData, setCategories]);

    useEffect(() => {
        if (homeData) {
            console.log('[GlobalInitializer] Fetched homeData:', homeData);
            const topRated = homeData.topRatedProducts?.nodes || [];
            if (topRated.length > 0 && !topRated[0].slug) {
                console.warn('[GlobalInitializer] Fetched data missing slugs!', topRated[0]);
            }

            setHomeData({
                topRatedProducts: topRated,
                bestSellingProducts: homeData.bestSellingProducts?.nodes || [],
                airConditionerProducts: homeData.airConditionerProducts?.nodes || [],
                mobilePhonesOnSale: homeData.mobilePhonesOnSale?.nodes || [],
                laptopsProducts: homeData.laptopsProducts?.nodes || [],
                speakersProducts: homeData.speakersProducts?.nodes || [],
                televisionsProducts: homeData.televisionsProducts?.nodes || [],
                promoProduct: homeData.promoProduct || null,
            });
        }
    }, [homeData, setHomeData]);

    return null;
};

export default GlobalInitializer;
