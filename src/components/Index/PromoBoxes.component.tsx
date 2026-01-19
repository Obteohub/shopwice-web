
import React from 'react';
import Link from 'next/link';

const PromoBoxes = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Box 1: Large Featured (Flash Sale Style) */}
                    <div className="bg-[#EEEBFD] p-6 rounded-none border border-gray-100 flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <span className="bg-[#EE7E02] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase mb-4 inline-block">
                                Flash Sale
                            </span>
                            <h3 className="text-xl font-extrabold text-[#2c3338] mb-2 leading-tight">Infinix Hot 40 <br /> Pro Series</h3>
                            <p className="text-[#0C6DC9] font-bold text-lg mb-4">Under GH₵ 2,450</p>
                        </div>
                        <div className="relative h-48 mt-4">
                            <img
                                src="https://cdn.shopwice.com/2024/04/Infinix-Hot-40-Pro.jpg"
                                alt="Infinix"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <Link href="/product-category/mobile-phones" className="mt-4 text-[#F07F02] font-bold text-sm uppercase flex items-center gap-1 hover:gap-2 transition-all">
                            Shop Now <span>&rarr;</span>
                        </Link>
                    </div>

                    {/* Box 2: iPhone 2x2 Grid */}
                    <div className="bg-white p-6 rounded-none border border-gray-100 flex flex-col justify-between group">
                        <h3 className="text-lg font-extrabold text-[#2c3338] mb-4">Apple iPhone <br /> Shop</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-50 rounded-full overflow-hidden p-2 border border-gray-100 hover:border-[#0C6DC9] transition-colors">
                                    <img
                                        src={`https://cdn.shopwice.com/2025/01/apple-iphone.webp`}
                                        alt="iPhone"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <Link href="/product-category/mobile-phones" className="text-[#0C6DC9] font-bold text-sm uppercase">Shop All &rarr;</Link>
                    </div>

                    {/* Box 3: Electronics 2x2 Grid */}
                    <div className="bg-white p-6 rounded-none border border-gray-100 flex flex-col justify-between group">
                        <h3 className="text-lg font-extrabold text-[#2c3338] mb-4">Household <br /> Essentials</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[
                                'https://cdn.shopwice.com/2024/02/westpoint-wasing-machine-t.webp',
                                'https://cdn.shopwice.com/2024/04/simple-computer-laptop-isolated-png.webp',
                                'https://cdn.shopwice.com/2024/02/westpoint-wasing-machine-t.webp',
                                'https://cdn.shopwice.com/2024/04/simple-computer-laptop-isolated-png.webp'
                            ].map((src, i) => (
                                <div key={i} className="aspect-square bg-gray-50 rounded-full overflow-hidden p-2 border border-gray-100 hover:border-[#0C6DC9] transition-colors">
                                    <img
                                        src={src}
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <Link href="/product-category/electronics" className="text-[#0C6DC9] font-bold text-sm uppercase">Shop All &rarr;</Link>
                    </div>

                    {/* Box 4: Lifestyle/Sneakers */}
                    <div className="bg-[#EEEBFD] p-6 rounded-none border border-gray-100 flex flex-col justify-between group">
                        <div>
                            <h3 className="text-lg font-extrabold text-[#2c3338] mb-2">Trendy <br /> Sneakers</h3>
                            <p className="text-[#EE7E02] font-bold text-sm">New Collection Arrival</p>
                        </div>
                        <div className="relative h-40 my-4">
                            <img
                                src="https://cdn.shopwice.com/2025/04/trendy-sneaker-image-shopwice-ghana_result.avif"
                                alt="Sneakers"
                                className="w-full h-full object-contain group-hover:rotate-12 transition-transform duration-500"
                            />
                        </div>
                        <Link href="/product-category/shoes" className="text-[#F07F02] font-bold text-sm uppercase">View All &rarr;</Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PromoBoxes;
