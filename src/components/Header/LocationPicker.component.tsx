import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_ALL_LOCATIONS_QUERY } from '@/utils/gql/GQL_QUERIES';
import { useLocationStore } from '@/stores/locationStore';

const LocationPicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { selectedLocation, setSelectedLocation } = useLocationStore();
    const { data, loading } = useQuery(FETCH_ALL_LOCATIONS_QUERY);

    const locations = data?.productLocations?.nodes || [];

    // Set default location if none selected and data is loaded
    useEffect(() => {
        if (!selectedLocation && locations.length > 0) {
            setSelectedLocation({ name: locations[0].name, slug: locations[0].slug });
        }
    }, [locations, selectedLocation, setSelectedLocation]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDetectLocation = () => {
        setIsDetecting(true);
        setGeoError(null);

        if (!navigator.geolocation) {
            setGeoError('Geolocation is not supported by your browser');
            setIsDetecting(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Use OSM Nominatim for free reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                    );
                    const data = await response.json();

                    const detectedCity = data.address?.city || data.address?.town || data.address?.suburb || data.address?.state;

                    if (detectedCity) {
                        // Find closest match in our locations
                        const match = locations.find((loc: any) =>
                            loc.name.toLowerCase().includes(detectedCity.toLowerCase()) ||
                            detectedCity.toLowerCase().includes(loc.name.toLowerCase())
                        );

                        if (match) {
                            setSelectedLocation({ name: match.name, slug: match.slug });
                            setIsOpen(false);
                        } else {
                            // If no direct match, we could potentially set it as a "custom" location
                            // block or just inform the user. For now, let's just use the name if it's high quality.
                            setGeoError(`Detected "${detectedCity}" but it's not in our delivery areas yet.`);
                        }
                    } else {
                        setGeoError('Could not determine your city.');
                    }
                } catch (error) {
                    setGeoError('Failed to fetch address details.');
                } finally {
                    setIsDetecting(false);
                }
            },
            (error) => {
                setGeoError(error.message);
                setIsDetecting(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 group p-1 transition-colors"
                aria-label="Select Location"
            >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#0C6DC9] group-hover:text-[#0a59a4]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] uppercase text-gray-500 font-bold leading-tight">Deliver to</span>
                    <span className="text-sm font-bold text-[#0C6DC9] group-hover:text-[#0a59a4] truncate max-w-[120px]">
                        {selectedLocation ? selectedLocation.name : 'Select Location'}
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3 h-3 text-[#0C6DC9]/80 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white shadow-xl rounded-lg border border-gray-100 z-[120] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pb-3 border-b border-gray-50">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Options</h3>

                        <button
                            onClick={handleDetectLocation}
                            disabled={isDetecting}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0C6DC9] rounded-lg transition-colors border border-blue-100 group"
                        >
                            {isDetecting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0C6DC9]"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            )}
                            <span className="text-sm font-bold">Use My Current Location</span>
                        </button>

                        {geoError && (
                            <p className="mt-2 text-[10px] text-red-500 font-medium bg-red-50 p-2 rounded text-center">
                                {geoError}
                            </p>
                        )}
                    </div>

                    <div className="px-4 py-2 bg-gray-50/50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Or Select Manually</span>
                    </div>

                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="py-4 text-center text-sm text-gray-500">Loading areas...</div>
                        ) : (
                            locations.map((loc: any) => (
                                <button
                                    key={loc.id}
                                    onClick={() => {
                                        setSelectedLocation({ name: loc.name, slug: loc.slug });
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors border-l-2 ${selectedLocation?.slug === loc.slug
                                        ? 'bg-blue-50 border-[#0C6DC9] text-[#0C6DC9] font-bold'
                                        : 'bg-white border-transparent text-gray-700 hover:bg-gray-50 font-medium'
                                        }`}
                                >
                                    <span className="text-sm">{loc.name}</span>
                                    {selectedLocation?.slug === loc.slug && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
