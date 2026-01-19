import { gql } from '@apollo/client';

// For brand pages - fetch products and filter client-side
export const GET_BRAND_PRODUCTS = gql`
  query BrandProducts($after: String) {
    products(first: 1000, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        onSale
        averageRating
        slug
        description
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        name
        ... on SimpleProduct {
          salePrice
          regularPrice
          onSale
          price
          id
          productCategories {
            nodes {
              name
              slug
            }
          }
          productBrand: terms(where: { taxonomies: PRODUCTBRAND }) {
            nodes {
              name
              slug
            }
          }
          productLocation: terms(where: { taxonomies: PRODUCTLOCATION }) {
            nodes {
              name
              slug
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
        ... on VariableProduct {
          salePrice
          regularPrice
          onSale
          price
          id
          productCategories {
            nodes {
              name
              slug
            }
          }
          productBrand: terms(where: { taxonomies: PRODUCTBRAND }) {
            nodes {
              name
              slug
            }
          }
          productLocation: terms(where: { taxonomies: PRODUCTLOCATION }) {
            nodes {
              name
              slug
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;

export const GET_BRAND_DATA_BY_SLUG = gql`
  query BrandData($id: ID!, $slug: [String], $after: String) {
    productBrand(id: $id, idType: SLUG) {
      id
      name
      children {
        nodes {
          id
          name
          slug
        }
      }
    }
    products(
      first: 50
      after: $after
      where: { 
        taxonomyFilter: { 
          filters: [{ taxonomy: PRODUCT_BRAND, terms: $slug }] 
        } 
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        onSale
        averageRating
        slug
        description
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        name
        ... on SimpleProduct {
          salePrice
          regularPrice
          onSale
          price
          id
          productCategories {
            nodes {
              name
              slug
            }
          }
          productBrand: terms(where: { taxonomies: PRODUCTBRAND }) {
            nodes {
              name
              slug
            }
          }
          productLocation: terms(where: { taxonomies: PRODUCTLOCATION }) {
            nodes {
              name
              slug
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
        ... on VariableProduct {
          salePrice
          regularPrice
          onSale
          price
          id
          productCategories {
            nodes {
              name
              slug
            }
          }
          productBrand: terms(where: { taxonomies: PRODUCTBRAND }) {
            nodes {
              name
              slug
            }
          }
          productLocation: terms(where: { taxonomies: PRODUCTLOCATION }) {
            nodes {
              name
              slug
            }
          }
          attributes {
            nodes {
              name
              options
            }
          }
        }
      }
    }
  }
`;
