export interface Image {
  __typename: string;
  sourceUrl?: string;
}

export interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ColorNode {
  name: string;
  slug: string;
}

export interface SizeNode {
  name: string;
}

export interface AttributeNode {
  name: string;
  value: string;
}

export interface Product {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  averageRating: number;
  reviewCount?: number;
  shortDescription?: string;
  image: Image;
  galleryImages?: {
    nodes: Image[];
  };
  price: string;
  regularPrice: string;
  salePrice?: string;
  productCategories?: {
    nodes: ProductCategory[];
  };
  allPaColor?: {
    nodes: ColorNode[];
  };
  allPaSize?: {
    nodes: SizeNode[];
  };
  productBrand?: {
    nodes: Array<{ name: string; slug: string }>;
  };
  reviews?: {
    nodes: Array<{
      id: string;
      content: string;
      date: string;
      rating: number;
      author: {
        node: {
          name: string;
        }
      }
    }>;
  };
  productLocation?: {
    nodes: Array<{ name: string; slug: string }>;
  };
  attributes?: {
    nodes: Array<{ name: string; options: string[] }>;
  };
  variations: {
    nodes: Array<{
      price: string;
      regularPrice: string;
      salePrice?: string;
      attributes?: {
        nodes: AttributeNode[];
      };
    }>;
  };
  stockQuantity?: number;
}

export interface ProductType {
  id: string;
  name: string;
  checked: boolean;
}
