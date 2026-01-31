
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

// Components
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.component';
import CartItem from './CartItem.component';
import CartSummary from './CartSummary.component';
import EmptyCart from './EmptyCart.component';
import UpsellCarousel from './UpsellCarousel.component';

// Utils & State
import { getUpdatedItems, IProductRootObject } from '@/utils/functions/functions';
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { UPDATE_CART } from '@/utils/gql/GQL_MUTATIONS';
import { useCartStore } from '@/stores/cartStore';

const CartContents = () => {
  const { clearWooCommerceSession } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  // -------------------------------------------------------------------------
  // 1. Data Fetching (Strict Network Policy)
  // -------------------------------------------------------------------------
  const { data, loading: isFetching, error, refetch } = useQuery(GET_CART, {
    fetchPolicy: 'network-only', // Always fetch fresh from server
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      console.error('[Cart] Fetch Error:', err);
      // Auto-heal session if invalid
      if (
        err.message.includes('session') ||
        err.message.includes('cookie') ||
        err.message.includes('expired')
      ) {
        handleSessionReset();
      }
    }
  });

  // -------------------------------------------------------------------------
  // 2. Mutations (Update & Remove)
  // -------------------------------------------------------------------------
  const [updateCart] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      setIsUpdating(false);
      refetch();
    },
    onError: (err) => {
      setIsUpdating(false);
      console.error('[Cart] Update Error:', err);

      // Critical: If specific keys fail to update, it means they are "ghosts".
      // We must reset the session.
      if (
        err.message.includes('failed to update') ||
        err.message.includes('session') ||
        err.message.includes('invalid')
      ) {
        handleSessionReset();
      } else {
        alert(`Error updating cart: ${err.message}`);
      }
    }
  });

  // -------------------------------------------------------------------------
  // 3. Handlers
  // -------------------------------------------------------------------------
  const handleSessionReset = async () => {
    console.warn('[Cart] Resetting Session due to sync error...');

    // 1. Clear Local Storage
    clearWooCommerceSession();

    // 2. Clear Server Cookies (HTTPOnly)
    try {
      await fetch('/api/reset-session');
    } catch (e) {
      console.error("Failed to reset server session", e);
    }

    // 3. Reload
    if (typeof window !== 'undefined') window.location.reload();
  };

  const handleUpdateQuantity = (item: IProductRootObject, newQty: number) => {
    if (newQty < 1) return;
    setIsUpdating(true);
    const currentItems = data?.cart?.contents?.nodes || [];
    const updatedItems = getUpdatedItems(currentItems, newQty, item.key);
    executeMutation(updatedItems);
  };

  const handleRemoveItem = (item: IProductRootObject) => {
    if (!confirm('Remove this item?')) return;
    setIsUpdating(true);
    const currentItems = data?.cart?.contents?.nodes || [];
    const updatedItems = getUpdatedItems(currentItems, 0, item.key);
    executeMutation(updatedItems);
  };

  const handleClearCart = () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;
    setIsUpdating(true);
    const currentItems = data?.cart?.contents?.nodes || [];
    // Set all quantities to 0
    const emptyItems = currentItems.map((item: any) => ({
      key: item.key,
      quantity: 0
    }));
    executeMutation(emptyItems);
  };

  const executeMutation = (itemsInput: any[]) => {
    updateCart({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          items: itemsInput,
        },
      },
    });
  };

  // -------------------------------------------------------------------------
  // 4. Derived Data
  // -------------------------------------------------------------------------
  const cartItems = (data?.cart?.contents?.nodes || []) as IProductRootObject[];
  const hasItems = cartItems.length > 0;
  const cartTotal = data?.cart?.total || '0';
  const cartSubtotal = data?.cart?.subtotal || cartTotal;
  const totalProductsCount = data?.cart?.contents?.itemCount || 0;

  // -------------------------------------------------------------------------
  // 5. Render Logic
  // -------------------------------------------------------------------------

  // Initial Load
  if (isFetching && !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner />
        <p className="text-gray-500 animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  // Critical Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 inline-block p-8 rounded-lg border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Cart Error</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={handleSessionReset}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
          >
            Reset Application Session
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  // Content State
  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Header */}
      <div className="flex flex-row justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-1">{totalProductsCount} {totalProductsCount === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium hover:underline transition-colors focus:outline-none"
          disabled={isUpdating}
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main list */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {cartItems.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                loading={isUpdating}
                onUpdateQuantity={(qty) => handleUpdateQuantity(item, qty)}
                onRemove={() => handleRemoveItem(item)}
              />
            ))}
          </div>

          {/* Up-sells */}
          <div className="mt-4">
            <UpsellCarousel title="You might also like" products={[]} />
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <CartSummary
              subtotal={cartSubtotal}
              total={cartTotal}
              totalProductsCount={totalProductsCount}
            />
            {/* Secure Checkout Badges could go here */}
            <div className="mt-6 flex justify-center gap-4 grayscale opacity-60">
              {/* Placeholders for payment icons if needed */}
            </div>
          </div>
        </div>
      </div>

      {/* Global Overlay Loading for mutations */}
      {isUpdating && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center border border-gray-100">
            <LoadingSpinner />
            <p className="text-sm font-semibold text-gray-700 mt-4">Updating Cart...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContents;
