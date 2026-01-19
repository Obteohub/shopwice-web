import { useState } from 'react';
import { Product, ProductType } from '@/types/product';
import { getUniqueProductTypes } from '@/utils/functions/productUtils';

export const useProductFilters = (products: Product[]) => {
  const [sortBy, setSortBy] = useState('popular');
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showOnSaleOnly, setShowOnSaleOnly] = useState<boolean>(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>(() =>
    products ? getUniqueProductTypes(products) : [],
  );

  const toggleProductType = (id: string) => {
    setProductTypes((prev) =>
      prev.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type,
      ),
    );
  };

  const toggleAttribute = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => {
      const current = prev[attributeName] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (newValues.length === 0) {
        const { [attributeName]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [attributeName]: newValues };
    });
  };

  const resetFilters = () => {
    setSelectedAttributes({});
    setSelectedBrands([]);
    setSelectedLocations([]);
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setMinRating(0);
    setShowOnSaleOnly(false);
    setProductTypes((prev) =>
      prev.map((type) => ({ ...type, checked: false })),
    );
  };

  const filterProducts = (products: Product[]) => {
    const filtered = products?.filter((product: Product) => {
      // Filter by price
      const priceString = product.price || '0';
      const productPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
      const withinPriceRange =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];
      if (!withinPriceRange) return false;

      // Filter by product type
      const selectedTypes = productTypes
        .filter((t) => t.checked)
        .map((t) => t.name.toLowerCase());
      if (selectedTypes.length > 0) {
        const productCategories =
          product.productCategories?.nodes.map((cat) =>
            cat.name.toLowerCase(),
          ) || [];
        if (!selectedTypes.some((type) => productCategories.includes(type)))
          return false;
      }

      // Filter by dynamic attributes
      for (const [attrName, selectedValues] of Object.entries(selectedAttributes)) {
        if (selectedValues.length > 0) {
          const productAttr = product.attributes?.nodes.find(
            (attr) => attr.name === attrName
          );
          const productOptions = productAttr?.options || [];

          if (!selectedValues.some((value) => productOptions.includes(value))) {
            return false;
          }
        }
      }

      // Filter by brand
      if (selectedBrands.length > 0) {
        const productBrands =
          product.productBrand?.nodes.map((node) => node.name) || [];
        if (!selectedBrands.some((brand) => productBrands.includes(brand)))
          return false;
      }

      // Filter by location
      if (selectedLocations.length > 0) {
        const productLocations =
          product.productLocation?.nodes.map((node) => node.name) || [];
        if (!selectedLocations.some((location) => productLocations.includes(location)))
          return false;
      }

      // Filter by category
      if (selectedCategories.length > 0) {
        const productCats =
          product.productCategories?.nodes.map((cat) => cat.name) || [];
        if (!selectedCategories.some((category) => productCats.includes(category)))
          return false;
      }

      // Filter by minimum rating
      if (minRating > 0) {
        const rating = product.averageRating || 0;
        if (rating < minRating) return false;
      }

      // Filter by on-sale
      if (showOnSaleOnly && !product.onSale) {
        return false;
      }

      return true;
    });

    // Sort products
    return [...(filtered || [])].sort((a, b) => {
      const priceAString = a.price || '0';
      const priceBString = b.price || '0';
      const priceA = parseFloat(priceAString.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(priceBString.replace(/[^0-9.]/g, ''));

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return b.databaseId - a.databaseId;
        case 'avg-rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        default: // 'popular'
          return 0;
      }
    });
  };

  return {
    sortBy,
    setSortBy,
    selectedAttributes,
    toggleAttribute,
    selectedBrands,
    setSelectedBrands,
    selectedLocations,
    setSelectedLocations,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    showOnSaleOnly,
    setShowOnSaleOnly,
    productTypes,
    toggleProductType,
    resetFilters,
    filterProducts,
  };
};
