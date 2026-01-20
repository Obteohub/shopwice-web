import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Cart from './Cart.component';
import NativeSearchBox from '../Search/NativeSearchBox.component';
import MobileNativeSearch from '../Search/MobileNativeSearch.component';
import MegaMenu from './MegaMenu.component';

const CategorySidebar = dynamic(() => import('./CategorySidebar.component'), { ssr: false });
const LocationPicker = dynamic(() => import('./LocationPicker.component'), { ssr: false });

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full">
      <nav id="header" className="z-50 w-full bg-white">
        {/* Mobile Navbar */}
        <div className="flex flex-col md:hidden w-full border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3 bg-white">
            <button
              aria-label="Menu"
              className="p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-[#2c3338]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <Link href="/" className="ml-2">
              <Image
                src="/logo.png"
                alt="Shopwice"
                width={120}
                height={35}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/my-account" aria-label="Account">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2c3338]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </Link>
              <Cart />
            </div>
          </div>

          <div className="w-full bg-[#0C6DC9] px-4 py-3">
            <MobileNativeSearch />
          </div>
        </div>

        {/* Desktop Navbar - Top Bar */}
        <div className="hidden md:block border-b border-gray-100 py-4">
          <div className="w-full px-8 flex items-center justify-between gap-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Shopwice"
                  width={150}
                  height={45}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Search Bar (Expanded) */}
            <div className="flex-grow max-w-4xl">
              <NativeSearchBox />
            </div>

            {/* Location Picker */}
            <div className="block">
              <LocationPicker />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-10">
              {/* Account */}
              <Link href="/my-account" className="flex items-center gap-2.5 group transition-colors">
                <div className="transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0C6DC9] group-hover:text-[#0a59a4]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-[10px] uppercase text-gray-500 font-bold leading-tight">Welcome</span>
                  <span className="text-sm font-bold text-[#0C6DC9] group-hover:text-[#0a59a4] whitespace-nowrap">My Account</span>
                </div>
              </Link>

              {/* Cart */}
              <div className="relative group">
                <div className="flex items-center gap-2.5">
                  <div className="transition-colors">
                    <Cart />
                  </div>
                  <div className="hidden lg:flex flex-col">
                    <span className="text-[10px] uppercase text-gray-500 font-bold leading-tight">Shopping</span>
                    <span className="text-sm font-bold text-[#0C6DC9] whitespace-nowrap">My Basket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navbar - Mega Menu (Row 2) */}
        <MegaMenu />

        {/* Mobile Menu Drawer */}
        <CategorySidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>
    </header>
  );
};

export default Navbar;
