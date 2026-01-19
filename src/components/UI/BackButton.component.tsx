import { useRouter } from 'next/router';

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2 md:hidden"
            aria-label="Go back"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="text-sm font-medium">Back</span>
        </button>
    );
};

export default BackButton;
