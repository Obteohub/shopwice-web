import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Index/Hero.component'), { ssr: false });
import FeaturedCategories from '@/components/Index/FeaturedCategories.component';

// Dynamic Imports for below-the-fold content
const WhyChooseUs = dynamic(() => import('@/components/Index/WhyChooseUs.component'));
const PromoBoxes = dynamic(() => import('@/components/Index/PromoBoxes.component'));
const InfoBanner = dynamic(() => import('@/components/Index/InfoBanner.component'));
const SEOContent = dynamic(() => import('@/components/Index/SEOContent.component'), { ssr: false });
const Newsletter = dynamic(() => import('@/components/Index/Newsletter.component'));
const ProductList = dynamic(() => import('@/components/Product/ProductList.component'));
const TopRatedProducts = dynamic(() => import('@/components/Index/TopRatedProducts.component'));
const AirConditionerProducts = dynamic(() => import('@/components/Index/AirConditionerProducts.component'));
const MobilePhonesOnSale = dynamic(() => import('@/components/Index/MobilePhonesOnSale.component'));
const LaptopsProducts = dynamic(() => import('@/components/Index/LaptopsProducts.component'));
const SpeakersProducts = dynamic(() => import('@/components/Index/SpeakersProducts.component'));
const TelevisionsProducts = dynamic(() => import('@/components/Index/TelevisionsProducts.component'));
const BestSellingSlider = dynamic(() => import('@/components/Index/BestSellingSlider.component'));
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

// GraphQL
import {
  FETCH_ALL_PRODUCTS_QUERY,
  FETCH_TOP_RATED_PRODUCTS_QUERY,
  FETCH_BEST_SELLING_PRODUCTS_QUERY,
  FETCH_AIR_CONDITIONER_PRODUCTS_QUERY,
  FETCH_MOBILE_PHONES_ON_SALE_QUERY,
  FETCH_LAPTOPS_QUERY,
  FETCH_SPEAKERS_QUERY,
  FETCH_TELEVISIONS_QUERY,
  FETCH_PROMO_PRODUCT_QUERY
} from '@/utils/gql/GQL_QUERIES';

/**
 * Main index page
 * @function Index
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Index: NextPage = ({
  products,
  topRatedProducts,
  bestSellingProducts,
  airConditionerProducts,
  mobilePhonesOnSale,
  laptopsProducts,
  speakersProducts,
  televisionsProducts,
  promoProduct,
  pageInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Shop Online In Ghana | Shopwice" fullWidth={true}>
    <div className="bg-[#F8F8F8]">
      <Hero />
      <FeaturedCategories />
      <TopRatedProducts products={topRatedProducts} />
      <AirConditionerProducts products={airConditionerProducts} />
      <MobilePhonesOnSale products={mobilePhonesOnSale} />
      <LaptopsProducts products={laptopsProducts} />
      <SpeakersProducts products={speakersProducts} />
      <TelevisionsProducts products={televisionsProducts} />
      <WhyChooseUs />
      <PromoBoxes promoProduct={promoProduct} />

      <BestSellingSlider products={bestSellingProducts} />

      <InfoBanner />

      <SEOContent />

      <Newsletter />
    </div>
  </Layout>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const { data: productsData, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  const { data: topRatedData } = await client.query({
    query: FETCH_TOP_RATED_PRODUCTS_QUERY,
  });

  const { data: bestSellingData } = await client.query({
    query: FETCH_BEST_SELLING_PRODUCTS_QUERY,
  });

  const { data: airConditionerData } = await client.query({
    query: FETCH_AIR_CONDITIONER_PRODUCTS_QUERY,
  });

  const { data: mobilePhonesData } = await client.query({
    query: FETCH_MOBILE_PHONES_ON_SALE_QUERY,
  });

  const { data: laptopsData } = await client.query({
    query: FETCH_LAPTOPS_QUERY,
  });

  const { data: speakersData } = await client.query({
    query: FETCH_SPEAKERS_QUERY,
  });

  const { data: televisionsData } = await client.query({
    query: FETCH_TELEVISIONS_QUERY,
  });

  const { data: promoProductData } = await client.query({
    query: FETCH_PROMO_PRODUCT_QUERY,
    variables: { slug: "microsoft-xbox-x-wireless-controller" }
  });

  return {
    props: {
      products: productsData.products.nodes,
      topRatedProducts: topRatedData?.products?.nodes || [],
      bestSellingProducts: bestSellingData?.products?.nodes || [],
      airConditionerProducts: airConditionerData?.products?.nodes || [],
      mobilePhonesOnSale: mobilePhonesData?.products?.nodes || [],
      laptopsProducts: laptopsData?.products?.nodes || [],
      speakersProducts: speakersData?.products?.nodes || [],
      televisionsProducts: televisionsData?.products?.nodes || [],
      promoProduct: promoProductData?.product || null,
      pageInfo: productsData.products.pageInfo,
      loading,
      networkStatus,
    },
    revalidate: 60,
  };
};
