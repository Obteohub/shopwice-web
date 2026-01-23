import Link from 'next/link';
import dynamic from 'next/dynamic';
import Hero from '@/components/Index/Hero.component';
import FeaturedCategories from '@/components/Index/FeaturedCategories.component';

// Dynamic Imports for below-the-fold content
const WhyChooseUs = dynamic(() => import('@/components/Index/WhyChooseUs.component'));
const PromoBoxes = dynamic(() => import('@/components/Index/PromoBoxes.component'));
const InfoBanner = dynamic(() => import('@/components/Index/InfoBanner.component'));
const Newsletter = dynamic(() => import('@/components/Index/Newsletter.component'));
const ProductList = dynamic(() => import('@/components/Product/ProductList.component'));
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

// GraphQL
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';

/**
 * Main index page
 * @function Index
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Index: NextPage = ({
  products,
  pageInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Shop Online In Ghana | Shopwice" fullWidth={true}>
    <div className="bg-[#F8F8F8]">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
      <PromoBoxes />

      <div className="py-16 container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-black text-[#2c3338] uppercase tracking-tight">Best Selling Products</h3>
          <Link href="/products" className="text-[#0C6DC9] font-bold text-sm uppercase hover:underline">View All</Link>
        </div>
        {products && (
          <ProductList
            products={products}
            title="Best Selling Products"
            pageInfo={pageInfo}
            query={FETCH_ALL_PRODUCTS_QUERY}
          />
        )}
      </div>

      <InfoBanner />

      <Newsletter />
    </div>
  </Layout>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      products: data.products.nodes,
      pageInfo: data.products.pageInfo,
      loading,
      networkStatus,
    },
    revalidate: 60,
  };
};
