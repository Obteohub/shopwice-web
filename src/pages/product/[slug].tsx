// Imports
import { withRouter } from 'next/router';

// Components
import SingleProduct from '@/components/Product/SingleProduct.component';
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';

// GraphQL
import { GET_SINGLE_PRODUCT } from '@/utils/gql/GQL_QUERIES';
import { NextSeo, ProductJsonLd } from 'next-seo';

/**
 * Display a single product with dynamic pretty urls
 * @function Produkt
 * @param {InferGetServerSidePropsType<typeof getServerSideProps>} products
 * @returns {JSX.Element} - Rendered component
 */
const Produkt: NextPage = ({
  product,
  networkStatus,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const hasError = networkStatus === '8';

  // --- SEO Preparation ---
  // Safely extract data
  const name = product?.name || 'Product';
  const slug = product?.slug || '';
  const description = product?.shortDescription?.replace(/<[^>]+>/g, '') || product?.description?.replace(/<[^>]+>/g, '').substring(0, 160) || '';
  const mainImage = product?.image?.sourceUrl || '';
  const gallery = product?.galleryImages?.nodes?.map((img: { sourceUrl: string }) => img.sourceUrl) || [];
  const images = [mainImage, ...gallery].filter(Boolean).map(url => ({ url }));

  // RankMath SEO Data (Fallback to Product Data)
  const seo = product?.seo;
  const seoTitle = seo?.title || name;
  const seoDescription = seo?.description || description;

  // Price & Currency (Assuming simple product for base price, or low price for variable)
  // Converting 'GH₵100' -> 100
  const rawPrice = product?.price || product?.salePrice || product?.regularPrice || '0';
  const priceAmount = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;
  const currency = 'GHS'; // Ghana Cedis

  // Stock
  const isInstock = product?.stockStatus !== 'OUT_OF_STOCK';
  const availability = isInstock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

  // Ratings
  const ratingValue = product?.averageRating || 0;
  const reviewCount = product?.reviewCount || 0;

  return (
    <>
      {product && (
        <>
          <NextSeo
            title={seoTitle}
            description={seoDescription}
            canonical={`https://shopwice.com/product/${slug}`}
            openGraph={{
              type: 'product',
              url: `https://shopwice.com/product/${slug}`,
              title: seoTitle,
              description: seoDescription,
              images: images,
            }}
          />
          <ProductJsonLd
            productName={name}
            images={images.map(i => i.url)}
            description={description}
            brand="Shopwice" // Or product.productBrand if available
            // sku={product.sku} // Add to query if not present
            offers={[
              {
                price: priceAmount.toString(),
                priceCurrency: currency,
                itemCondition: 'https://schema.org/NewCondition', // Assuming new
                availability: availability,
                url: `https://shopwice.com/product/${slug}`,
                seller: {
                  name: 'Shopwice',
                },
              },
            ]}
            aggregateRating={
              reviewCount > 0
                ? {
                  ratingValue: ratingValue.toString(),
                  reviewCount: reviewCount.toString(),
                }
                : undefined
            }
          />
        </>
      )}

      <Layout title={`${product?.name ? product.name : ''}`} fullWidth>
        {product ? (
          <SingleProduct product={product} />
        ) : (
          <div className="mt-8 text-2xl text-center">Laster produkt ...</div>
        )}
        {hasError && (
          <div className="mt-8 text-2xl text-center">
            Feil under lasting av produkt ...
          </div>
        )}
      </Layout>
    </>
  );
};

export default withRouter(Produkt);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res,
}) => {
  // Handle legacy URLs with ID parameter by removing it
  if (query.id) {
    res.setHeader('Location', `/produkt/${params?.slug}`);
    res.statusCode = 301;
    res.end();
    return { props: {} };
  }

  const { data, loading, networkStatus } = await client.query({
    query: GET_SINGLE_PRODUCT,
    variables: { slug: params?.slug },
  });

  return {
    props: { product: data.product, loading, networkStatus },
  };
};
