
import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface GalleryImage {
    id: string;
    sourceUrl: string;
    title?: string;
}

interface ProductGalleryProps {
    mainImage?: {
        sourceUrl: string;
        title?: string;
    };
    galleryImages?: {
        nodes: GalleryImage[];
    };
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ mainImage, galleryImages }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Combine main image and gallery images
    const allImages = [];
    if (mainImage?.sourceUrl) {
        allImages.push({
            id: 'main',
            sourceUrl: mainImage.sourceUrl,
            title: mainImage.title || 'Product Image'
        });
    }

    if (galleryImages?.nodes) {
        allImages.push(...galleryImages.nodes);
    }

    if (allImages.length === 0) return null;

    const scrollToImage = (index: number) => {
        setActiveIndex(index);
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const width = e.currentTarget.offsetWidth;
        const index = Math.round(e.currentTarget.scrollLeft / width);
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full">
            {/* Swipeable Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-square bg-gray-100 rounded-lg"
                onScroll={handleScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {allImages.map((img, index) => (
                    <div key={`${img.id}-${index}`} className="flex-none w-full h-full snap-center relative">
                        <Image
                            src={img.sourceUrl}
                            alt={img.title || 'Product image'}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            quality={90}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            {allImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {allImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent link clicks if nested
                                scrollToImage(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-black w-4' : 'bg-gray-300'
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
