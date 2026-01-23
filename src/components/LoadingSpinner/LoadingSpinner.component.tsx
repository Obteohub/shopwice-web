/**
 * Loading spinner, shows while loading products or categories.
 * Uses Styled-Components
 */
const LoadingSpinner = () => (
  <div className="w-full h-full flex justify-center items-center p-4 mt-2">
    <span className="text-gray-500 text-lg">Loading...</span>
  </div>
);

export default LoadingSpinner;
