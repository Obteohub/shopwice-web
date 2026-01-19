import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { FETCH_ALL_CATEGORIES_QUERY } from '@/utils/gql/GQL_QUERIES';
import { useState, useEffect } from 'react';

/**
 * MegaMenu component for desktop navigation
 * Displays top-level categories with hover dropdowns for subcategories
 */
import DesktopSideMenu from './DesktopSideMenu.component';

const MegaMenu = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'omit',
            cache: 'force-cache',
            body: JSON.stringify({
                query: require('graphql').print(FETCH_ALL_CATEGORIES_QUERY)
            }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.errors) throw new Error(json.errors[0].message);
                setData(json.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('MegaMenu Fetch Error:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="h-12 bg-[#0C6DC9]"></div>;
    if (error) return null;

    const categories = (data?.productCategories?.nodes || []).filter(
        (cat: any) => cat.name.toLowerCase() !== 'uncategorized' && cat.slug !== 'uncategorized'
    );

    // Get first 5 categories for the quick bar
    const quickLinks = categories.slice(0, 5);

    return (
        <div className="bg-[#0C6DC9] hidden lg:block relative">
            <div className="w-full px-8">
                <ul className="flex items-center h-12">
                    {/* "All" button for sidebar */}
                    <li className="h-full flex items-center pr-6 mr-6 border-r border-white/20">
                        <button
                            onClick={() => setIsSideMenuOpen(true)}
                            className="flex items-center gap-2 text-white hover:text-white/80 transition-all group py-1.5 px-3 rounded-sm hover:bg-white/5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <span className="text-sm font-bold uppercase tracking-tight">All</span>
                        </button>
                    </li>

                    {/* Quick Category Links */}
                    <div className="flex items-center space-x-8">
                        {quickLinks.map((category: any) => (
                            <li key={category.id} className="h-full flex items-center">
                                <Link
                                    href={`/product-category/${category.slug}`}
                                    className="text-[13px] font-bold text-white hover:text-white/80 transition-colors whitespace-nowrap"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}

                        <li className="h-full flex items-center">
                            <Link
                                href="/products"
                                className="text-[13px] font-bold text-white hover:text-white/80 transition-colors whitespace-nowrap border-b border-transparent hover:border-white/40"
                            >
                                Shop All
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>

            {/* Desktop Sidebar Menu */}
            <DesktopSideMenu
                isOpen={isSideMenuOpen}
                onClose={() => setIsSideMenuOpen(false)}
            />
        </div>
    );
};

export default MegaMenu;
