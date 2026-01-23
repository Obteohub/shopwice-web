import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="https://cdn.shopwice.com/2023/04/banner-homepage-scaled.webp"
          alt="Online Shopping in Ghana - Shopwice Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-black text-[#2c3338] mb-6 tracking-tight leading-tight">
            Online Shopping <br className="hidden md:block" /> in Ghana
          </h1>
          <p className="text-[#2c3338] text-lg md:text-xl leading-relaxed font-medium bg-white/50 backdrop-blur-sm p-4 rounded-lg md:bg-transparent md:backdrop-blur-none md:p-0">
            Join thousands of satisfied customers and experience the best online shopping in Ghana for home electronics today!
            Discover a wide range of Shoes, Jerseys, Perfumes, Computers, Mobile Phones, Home Appliances, Home Audio & Speakers,
            and unbeatable deals at our online store.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
