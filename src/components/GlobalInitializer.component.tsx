import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useGlobalStore } from '@/stores/globalStore';
import { FETCH_ALL_CATEGORIES_QUERY, FETCH_HOME_PAGE_DATA } from '@/utils/gql/GQL_QUERIES';

/**
 * GlobalInitializer component to prefetch and cache common data
 * This implements the "fetch all" strategy to ensure instant navigation
 */
const GlobalInitializer = () => {
    const setCategories = useGlobalStore((state) => state.setCategories);
    const setHomeData = useGlobalStore((state) => state.setHomeData);

    // Fetch Categories for navigation
    const { data: categoryData } = useQuery(FETCH_ALL_CATEGORIES_QUERY, {
        fetchPolicy: 'cache-first',
    });

    // Prefetch Home Page data to warm the cache
    const { data: homeData } = useQuery(FETCH_HOME_PAGE_DATA, {
        variables: { promoProductSlug: "microsoft-xbox-x-wireless-controller" },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (categoryData?.productCategories?.nodes) {
            setCategories(categoryData.productCategories.nodes);
        }
    }, [categoryData, setCategories]);

    useEffect(() => {
        if (homeData) {
            setHomeData({
                topRatedProducts: homeData.topRatedProducts?.nodes || [],
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
