import { gql } from '@apollo/client';

// For location pages - fetch products and filter client-side
export const GET_LOCATION_PRODUCTS = gql`
  query LocationProducts($after: String) {
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

export const GET_LOCATION_DATA_BY_SLUG = gql`
  query LocationData($slug: ID!, $after: String) {
    productLocation(id: $slug, idType: SLUG) {
      id
      name
    }
    products(
      first: 50
      after: $after
      where: { 
        taxonomyFilter: { 
          filters: [{ taxonomy: PRODUCTLOCATION, terms: [$slug] }] 
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
        ... on ExternalProduct {
          price
          id
          externalUrl
        }
        ... on GroupProduct {
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
              }
            }
          }
          id
        }
      }
    }
  }
`;
