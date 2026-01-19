
import { useState, useEffect } from 'react';
import { print } from 'graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SEARCH_PRODUCTS_QUERY } from '../../utils/gql/GQL_QUERIES';
import { paddedPrice } from '../../utils/functions/functions';

const MobileNativeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (debouncedTerm.length <= 2) {
                setData(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'omit', // Skip auth headers
                    body: JSON.stringify({
                        query: print(SEARCH_PRODUCTS_QUERY),
                        variables: { search: debouncedTerm }
                    }),
                });

                const json = await response.json();
                if (json.errors) throw new Error(json.errors[0].message);
                setData(json.data);
            } catch (err: any) {
                setError({ message: err.message });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedTerm]);


    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const results = data?.products?.nodes || [];

    return (
        <div className="w-full relative" suppressHydrationWarning>
            <form onSubmit={handleSearchSubmit} className="relative flex w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </form>

            {/* Dropdown Results */}
            {searchTerm.length > 2 && (
                <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl z-[9999] overflow-hidden">
                    {loading && (
                        <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                    )}

                    {error && (
                        <div className="p-4 text-center text-red-500 text-sm">
                            Error: {error.message}
                        </div>
                    )}

                    {!loading && !error && results.length === 0 && (
                        <div className="p-4 text-center text-gray-500 text-sm">No products found.</div>
                    )}

                    {!loading && !error && results.length > 0 && (
                        <ul className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                            {results.map((product: any) => (
                                <li key={product.id || Math.random()}>
                                    <Link href={`/product/${product.slug}`}>
                                        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm text-gray-900 line-clamp-1">{product.name}</span>
                                                <div className="flex items-center gap-2">
                                                    {product.onSale ? (
                                                        <>
                                                            <span className="text-xs font-bold text-red-600">
                                                                {paddedPrice(product.salePrice ?? '', 'GH₵')}
                                                            </span>
                                                            <span className="text-[10px] text-gray-400 line-through">
                                                                {paddedPrice(product.regularPrice ?? '', 'GH₵')}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xs font-bold text-gray-900">
                                                            {paddedPrice(product.price ?? '', 'GH₵')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default MobileNativeSearch;
