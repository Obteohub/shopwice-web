
import React from 'react';

interface StarRatingProps {
    rating: number; // 0 to 5
    size?: number; // size in px, default 16
    activeColor?: string; // default '#FBBF24' (yellow-400)
    inactiveColor?: string; // default '#E5E7EB' (gray-200)
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    size = 16,
    activeColor = '#F97316', // Orange-500
    inactiveColor = '#E5E7EB',
}) => {
    // Round to nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (roundedRating >= i) {
            // Full star
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={activeColor}
                    width={size}
                    height={size}
                    className="w-4 h-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        } else if (roundedRating >= i - 0.5) {
            // Half star (approximate with a partial fill or just full star for simplicity if SVG masking is complex, but standard icon set usually has full stars. Let's use a standard star for now, ensuring 0-5)
            // Actually, standard Heroicons (used elsewhere) doesn't have a half-star easily without defining a defs/mask.
            // For simplicity and robustness in this specific tech stack (Tailwind/Heroicons), I will stick to full stars for filled and empty for empty, or just color them.
            // If higher precision is needed I can implement SVG masking.
            // Let's implement full stars, but colored appropriately.
            // Wait, standard e-commerce usually does half stars.
            // I'll stick to full/empty for now to match the existing icon style unless I see a simpler way.
            // Actually, let's just do full stars colored/uncolored.

            // Correct logic for simple full/empty stars:
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="url(#half-star)"
                    width={size}
                    height={size}
                    className="w-4 h-4"
                >
                    {/* Half star logic is tricky with single path. Let's rely on Full vs Empty for MVP or verification. */}
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            )
            // Let's keep it simple: Filled or Gray.
            // The previous loop logic was: if rating >= i (e.g. 4.5 >= 1 .. 4), fill.
        } else {
            // Empty star
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={inactiveColor}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor" // Use stroke for empty? Or just gray fill.
                    // Let's use gray fill for consistency
                    width={size}
                    height={size}
                    className="w-4 h-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }
    }

    // Re-rewriting the star logic to be cleaner and just handle full/empty for now, as half-stars require defining gradients or masks which might clutter the DOM if reused many times without a sprite.
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(rating) ? activeColor : inactiveColor}
                    className="w-4 h-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
