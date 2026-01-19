
import React from 'react';
import Image from 'next/image';
import { IProductRootObject } from '@/utils/functions/functions';

interface CheckoutCartItemProps {
    item: IProductRootObject;
}

const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({ item }) => {
    const { product, variation, quantity, subtotal, total } = item;
    const { node } = product;

    // Get price - use subtotal first, then total as fallback
    const displayPrice = subtotal || total || '₵0.00';

    // Get variation data if it exists (variation has a node property in GET_CART query)
    const variationData = variation?.node;
    const displayName = variationData?.name || node.name;
    const displayImage = variationData?.image?.sourceUrl || node.image?.sourceUrl || '/placeholder.png';

    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden border border-gray-100">
                <Image
                    src={displayImage}
                    alt={displayName}
                    fill
                    className="object-cover"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {quantity}
                </div>
            </div>
            <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{displayName}</p>
                {variationData?.attributes?.nodes && variationData.attributes.nodes.length > 0 && (
                    <p className="text-xs text-gray-500">
                        {variationData.attributes.nodes.map((attr: any) => attr.value).join(', ')}
                    </p>
                )}
                <p className="text-xs text-gray-500">{node.stockStatus === 'IN_STOCK' ? 'In Stock' : ''}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
                {displayPrice}
            </div>
        </div>
    );
};

export default CheckoutCartItem;
