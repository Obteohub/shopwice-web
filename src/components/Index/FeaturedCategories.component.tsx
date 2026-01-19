
import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'Shoes', slug: 'shoes', image: 'https://cdn.shopwice.com/2023/11/shoes.jpg' },
    { name: 'Phones', slug: 'mobile-phones', image: 'https://cdn.shopwice.com/2023/11/phones.jpg' },
    { name: 'Fashion', slug: 'fashion', image: 'https://cdn.shopwice.com/2023/11/fashion.jpg' },
    { name: 'Fragrance', slug: 'fragrance', image: 'https://cdn.shopwice.com/2023/11/fragrance.jpg' },
    { name: 'Computing', slug: 'electronics', image: 'https://cdn.shopwice.com/2023/11/electronics.jpg' },
    { name: 'Beauty', slug: 'health-beauty', image: 'https://cdn.shopwice.com/2023/11/beauty.jpg' },
];

const FeaturedCategories = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-50">
            <div className="container mx-auto px-6">
                {/* Exact 6-column grid for desktop, scrollable for mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/product-category/${cat.slug}`}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#0C6DC9] group-hover:border-[#F07F02] transition-all duration-300 p-1 bg-white shadow-sm">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <span className="mt-4 text-[11px] md:text-[13px] font-bold text-[#2c3338] text-center uppercase tracking-tight group-hover:text-[#0C6DC9] transition-colors leading-tight px-2">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
