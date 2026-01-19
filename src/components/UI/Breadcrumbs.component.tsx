
import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
    categories?: {
        nodes: Array<{ name: string; slug: string }>;
    };
    productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ categories, productName }) => {
    const category = categories?.nodes?.[0]; // Show primary category

    return (
        <nav className="text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
            <ul className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <span className="text-gray-400">/</span>
                </li>
                {category && (
                    <>
                        <li>
                            <Link href={`/product-category/${category.slug}`} className="hover:text-black transition-colors">
                                {category.name}
                            </Link>
                        </li>
                        <li>
                            <span className="text-gray-400">/</span>
                        </li>
                    </>
                )}
                <li className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-xs" title={productName}>
                    {productName}
                </li>
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
