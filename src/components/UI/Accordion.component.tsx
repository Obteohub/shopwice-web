import React, { useState, useRef, useEffect } from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    defaultOpen = false,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [hasBeenOpened, setHasBeenOpened] = useState(defaultOpen);
    const [contentHeight, setContentHeight] = useState<string>('0px');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHasBeenOpened(true);
        }
    }, [isOpen]);

    useEffect(() => {
        // Update height when open state changes
        if (isOpen && contentRef.current) {
            setContentHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setContentHeight('0px');
        }
    }, [isOpen, hasBeenOpened]);

    useEffect(() => {
        // Handle resizing responsiveness
        const handleResize = () => {
            if (isOpen && contentRef.current) {
                setContentHeight(`${contentRef.current.scrollHeight}px`);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    return (
        <div className={`border-b border-gray-200 ${className}`}>
            <button
                className="w-full flex justify-between items-center py-2.5 text-left focus:outline-none focus:text-blue-600 group"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="text-[15px] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors tracking-tight">
                    {title}
                </span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            <div
                style={{ height: contentHeight, overflow: 'hidden' }}
                className="transition-all duration-300 ease-in-out"
            >
                <div ref={contentRef} className="pb-2 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
                    {hasBeenOpened ? children : null}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
