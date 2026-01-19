
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProductRootObject } from '@/utils/functions/functions';
import QuantityControl from './QuantityControl.component';

interface CartItemProps {
    item: IProductRootObject;
    onUpdateQuantity: (newQty: number) => void;
    onRemove: () => void;
    loading: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove, loading }) => {
    const { product, quantity, subtotal } = item;
    const { node } = product;

    return (
        <div className="flex flex-row items-start sm:items-center py-6 border-b border-gray-100 gap-4 sm:gap-6 px-4 md:px-6">
            {/* Product Image */}
            <div className="relative w-24 h-24 sm:w-25 sm:h-25 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <Image
                    src={node.image?.sourceUrl || '/placeholder.png'}
                    alt={node.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 96px, 128px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow w-full space-y-2">
                <div className="flex justify-between items-start">
                    <Link href={`/product/${node.slug}`} className="text-md font-normal text-blue-900 hover:text-blue-600 line-clamp-2 leading-tight">
                        {node.name}
                    </Link>
                    <div className="text-right sm:hidden block">
                        <p className="text-md font-medium text-black-900">{subtotal}</p>
                        {node.onSale && <span className="text-xs text-red-600 font-normal bg-red-50 px-1 py-0.5 rounded">On Sale</span>}
                    </div>
                </div>

                {/* Meta / Attributes if available could go here */}
                {/* Stock status removed as per user request */}

                <div className="flex items-center justify-between sm:justify-start pt-2 gap-6">
                    <div className="flex items-center gap-4">
                        <QuantityControl
                            quantity={quantity}
                            onDecrease={() => onUpdateQuantity(quantity - 1)}
                            onIncrease={() => onUpdateQuantity(quantity + 1)}
                            loading={loading}
                        />
                        <button
                            onClick={onRemove}
                            disabled={loading}
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors underline decoration-dotted underline-offset-2"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="hidden sm:block text-right">
                        <p className="text-xl font-bold text-gray-900">{subtotal}</p>
                        {quantity > 1 && (
                            <p className="text-xs text-gray-500">
                                {/* Unit price calculation if needed, though usually subtotal is enough */}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
