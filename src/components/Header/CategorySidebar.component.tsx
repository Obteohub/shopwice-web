import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { FETCH_ALL_CATEGORIES_QUERY } from '@/utils/gql/GQL_QUERIES';

interface Category {
    id: string;
    name: string;
    slug: string;
    children?: {
        nodes: Category[];
    };
}

const CategorySidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [viewStack, setViewStack] = useState<Category[]>([]);

    useEffect(() => {
        if (isOpen && !data) {
            const CACHE_KEY = 'shopwice_menu_cache';
            const cachedData = localStorage.getItem(CACHE_KEY);

            if (cachedData) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    setData(parsedData);
                    setLoading(false);
                } catch (e) {
                    console.error("Error parsing menu cache", e);
                    localStorage.removeItem(CACHE_KEY);
                }
            }

            // Always set loading true if we are about to fetch, but if we found cache, we are good.
            if (!cachedData) {
                setLoading(true);
                fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'omit',
                    body: JSON.stringify({
                        query: require('graphql').print(FETCH_ALL_CATEGORIES_QUERY)
                    }),
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.errors) throw new Error(json.errors[0].message);
                        setData(json.data);
                        localStorage.setItem(CACHE_KEY, JSON.stringify(json.data));
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Category Fetch Error:', err);
                        setError(err);
                        setLoading(false);
                    });
            }
        }
    }, [isOpen, data]);

    if (!isOpen) return null;

    const currentCategory = viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;
    const categoriesToShow = currentCategory
        ? currentCategory.children?.nodes
        : data?.productCategories?.nodes;

    const handleCategoryClick = (category: Category) => {
        if (category.children && category.children.nodes.length > 0) {
            setViewStack([...viewStack, category]);
        } else {
            onClose();
        }
    };

    const handleBack = () => {
        setViewStack(viewStack.slice(0, -1));
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Sidebar */}
            <div className="relative w-4/5 max-w-xs h-full bg-white shadow-xl flex flex-col font-sans">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    {viewStack.length > 0 ? (
                        <button onClick={handleBack} className="flex items-center text-gray-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Back
                        </button>
                    ) : (
                        <span className="font-bold text-lg text-gray-800">Menu</span>
                    )}
                    <button onClick={onClose} className="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <p className="text-gray-500 text-center py-4">Loading categories...</p>
                    ) : error ? (
                        <div className="p-4 text-center text-red-500 text-sm">
                            <p>Error loading categories.</p>
                            <p className="text-xs mt-1">{error.message}</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {/* Static Links at Root */}
                            {viewStack.length === 0 && (
                                <>
                                    <li className="border-b border-gray-100 pb-2">
                                        <Link href="/" onClick={onClose} className="block py-2 text-[15px] font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">Home</Link>
                                    </li>
                                    <li className="border-b border-gray-100 pb-2">
                                        <Link href="/my-account" onClick={onClose} className="block py-2 text-[15px] font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">My Account</Link>
                                    </li>
                                </>
                            )}

                            {/* "All [Category]" Link for Subcategories */}
                            {currentCategory && (
                                <li className="border-b border-gray-100 bg-gray-50 -mx-4 px-4">
                                    <Link
                                        href={`/product-category/${currentCategory.slug}`}
                                        onClick={onClose}
                                        className="block py-3 text-[15px] font-bold text-gray-900 hover:text-blue-600"
                                    >
                                        All {currentCategory.name}
                                    </Link>
                                </li>
                            )}

                            {/* Dynamic Categories */}
                            {categoriesToShow?.map((cat: Category) => (
                                <li key={cat.id} className="border-b border-gray-50">
                                    {cat.children && cat.children.nodes.length > 0 ? (
                                        <button
                                            onClick={() => handleCategoryClick(cat)}
                                            className="w-full flex items-center justify-between py-2.5 text-left group hover:bg-gray-50"
                                        >
                                            <span className="text-[15px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/product-category/${cat.slug}`}
                                            onClick={onClose}
                                            className="block py-2.5 text-[15px] font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer info? */}
                <div className="p-4 border-t bg-gray-50 text-xs text-gray-400 text-center">
                    &copy; 2025 Shopwice
                </div>
            </div>
        </div>
    );
};

export default CategorySidebar;
