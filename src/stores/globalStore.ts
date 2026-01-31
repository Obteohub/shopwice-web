import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
    featuredCategories: any[];
    topRatedProducts: any[];
    bestSellingProducts: any[];
    homeDataLoaded: boolean;
    setHomeData: (data: any) => void;
    setCategories: (categories: any[]) => void;
}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            featuredCategories: [],
            topRatedProducts: [],
            bestSellingProducts: [],
            homeDataLoaded: false,
            setHomeData: (data) => set({
                topRatedProducts: data.topRatedProducts || [],
                bestSellingProducts: data.bestSellingProducts || [],
                homeDataLoaded: true
            }),
            setCategories: (categories) => set({ featuredCategories: categories }),
        }),
        {
            name: 'shopwice-global-store',
        }
    )
);
