
import React from 'react';
import Link from 'next/link';

interface SubCategory {
    name: string;
    slug: string;
    image: string;
}

interface CategoryBlockProps {
    title: string;
    slug: string;
    bgColor: string;
    subcategories: SubCategory[];
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ title, slug, bgColor, subcategories }) => {
    return (
        <section className={`py-12 ${bgColor} px-6`}>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left: Info */}
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c3338] mb-6">{title}</h2>
                        <Link
                            href={`/product-category/${slug}`}
                            className="inline-block bg-[#102283] text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md"
                        >
                            Shop All {title}
                        </Link>
                    </div>

                    {/* Right: Subcategories Cards */}
                    <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {subcategories.map((sub, index) => (
                            <Link
                                key={index}
                                href={`/product-category/${sub.slug}`}
                                className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center group"
                            >
                                <div className="w-full aspect-square relative mb-3 overflow-hidden rounded-xl">
                                    <img
                                        src={sub.image}
                                        alt={sub.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-sm font-bold text-[#2c3338] text-center group-hover:text-[#FF9900] transition-colors">
                                    {sub.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryBlock;
