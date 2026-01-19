
import React from 'react';
import Link from 'next/link';
import Button from '@/components/UI/Button.component';
import Image from 'next/image';

const EmptyCart: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg border border-gray-100 shadow-sm min-h-[500px]">
            <div className="w-32 h-32 relative mb-6 opacity-80">
                {/* Placeholder SVG or Image for empty cart */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-full h-full text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5c.07.286.074.575.008.857-.11.474-.436.883-.873 1.096A3.012 3.012 0 0117.7 16.5H6.3a3.012 3.012 0 01-1.753-.54c-.437-.213-.763-.622-.873-1.096-.066-.282-.062-.57.008-.857l1.263-5a1.875 1.875 0 011.819-1.428h8.868a1.875 1.875 0 011.819 1.428z" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
                Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
            </p>

            <Link href="/products">
                <Button variant="primary" className="px-8 py-3 text-lg">
                    Start Shopping
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCart;
