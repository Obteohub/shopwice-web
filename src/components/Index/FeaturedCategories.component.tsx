import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { name: 'Shoes', slug: 'shoes', image: 'https://cdn.shopwice.com/homepage-images/shoes.webp' },
    { name: 'Phones', slug: 'mobile-phones', image: 'https://cdn.shopwice.com/homepage-images/testfridge.png' },
    { name: 'Fashion', slug: 'fashion', image: 'https://cdn.shopwice.com/homepage-images/testfridge.png' },
    { name: 'Fragrance', slug: 'fragrance', image: 'https://cdn.shopwice.com/homepage-images/testfridge.png' },
    { name: 'Computing', slug: 'electronics', image: 'https://cdn.shopwice.com/homepage-images/testfridge.png' },
    { name: 'Beauty', slug: 'health-beauty', image: 'https://cdn.shopwice.com/homepage-images/testfridge.png' },
];

const FeaturedCategories = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-50">
            <div className="w-full px-2 md:px-6">
                {/* Exact 6-column grid for desktop, scrollable for mobile */}
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/product-category/${cat.slug}`}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-sm relative group-hover:shadow-md transition-all duration-300">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        sizes="(max-width: 768px) 100px, 150px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
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
