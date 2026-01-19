import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout.component';
import ProductList from '@/components/Product/ProductList.component';
import { SEARCH_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';

const SearchPage = () => {
    const router = useRouter();
    const { q } = router.query;
    const searchTerm = typeof q === 'string' ? q : '';

    const [products, setProducts] = useState<any[]>([]);
    const [pageInfo, setPageInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm) {
                setProducts([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Using direct fetch to bypass Apollo Client middleware and avoid session 500 errors
                const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL as string, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'omit',
                    body: JSON.stringify({
                        query: print(SEARCH_PRODUCTS_QUERY),
                        variables: { search: searchTerm }
                    }),
                });

                const json = await response.json();

                if (json.errors) {
                    throw new Error(json.errors[0].message);
                }

                setProducts(json.data?.products?.nodes || []);
                setPageInfo(json.data?.products?.pageInfo);

            } catch (err: any) {
                console.error('Search Page Error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    return (
        <Layout title={`Search: ${searchTerm}`} fullWidth={true}>
            <Head>
                <title>Search Results for "{searchTerm}" | Shopwice</title>
            </Head>

            <div className="pt-1 pb-1">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold mb-4">
                        Search Results for <span className="text-orange-600">"{searchTerm}"</span>
                    </h1>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500">Error loading search results. Please try again.</p>
                        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
                    </div>
                )}

                {!loading && !error && products.length === 0 && searchTerm && (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg">No products found matching "{searchTerm}"</p>
                        <p className="text-gray-500 mt-2">Try checking your spelling or using different keywords.</p>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="pt-1 pb-1">
                        <ProductList
                            products={products}
                            title=""
                            pageInfo={pageInfo}
                            query={SEARCH_PRODUCTS_QUERY}
                            queryVariables={{ search: searchTerm }}
                            context={{ useDirectFetch: true, fetchOptions: { credentials: 'omit' } }}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SearchPage;
