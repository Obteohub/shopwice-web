
import React from 'react';
import Link from 'next/link'; // Still need next/link even if button is wrapped
import Button from '@/components/UI/Button.component';

interface CartSummaryProps {
    subtotal: string;
    total: string;
    totalProductsCount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, total, totalProductsCount }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-3">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal ({totalProductsCount} items):</span>
                    <span className="font-medium text-gray-900">{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 text-sm font-medium">Calculated at checkout</span>
                </div>
                {/* Add Tax if needed */}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900 block leading-none">{total}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <Link href="/checkout" className="block w-full">
                    <Button variant="primary" fullWidth className="h-12 text-base font-bold shadow-md hover:shadow-lg transition-shadow">
                        Proceed to Checkout
                    </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 bg-gray-50 py-2 rounded">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Secure Checkout
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
