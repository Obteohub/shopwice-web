import React, { useState } from 'react';

/**
 * SEO Content Section Component
 * Displays informational content about products and shopping at Shopwice
 * @returns {JSX.Element} - Rendered component
 */
const SEOContent: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white py-8" suppressHydrationWarning>
            <div className="container mx-auto px-6">
                {/* SEO Text Content */}
                <div>
                    {/* First 4 Lines - Always Visible */}
                    <div className="mb-4">
                        <div className="mb-6">
                            <h1 className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
                                Online Shopping in Ghana
                            </h1>
                            <p className="text-sm text-gray-600 leading-normal mb-4">
                                Welcome to <strong>Shopwice</strong>, Ghana&apos;s leading online shopping mall, where convenience,
                                affordability, and authentic products meet. Whether you are looking for the latest mobile phones,
                                trendy shoes, premium perfumes, home appliances, electronics, or clothes, we have got you covered.
                                Join thousands of satisfied customers and experience the best online shopping in Ghana for home electronics today!
                                Discover a wide range of Shoes, Jerseys, Perfumes, Computers, Mobile Phones, Home Appliances, Home Audio &amp; Speakers,
                                and unbeatable deals at our online store.
                                Enjoy unbeatable prices and convenient same day delivery across Ghana. Shop securely with multiple
                                payment options including pay on delivery - all from the comfort of your home.
                            </p>
                        </div>
                        <h2 className="text-lg font-medium text-gray-600 mb-2 ">
                            What can you buy online in Ghana at Shopwice?
                        </h2>
                        <h3 className="text-base font-normal text-gray-600 mb-2">Mobile Phones and Accessories</h3>
                    </div>

                    {/* Expandable Content */}
                    {isExpanded && (
                        <div className="mb-4">
                            <p className="text-xs text-gray-600 leading-normal mb-4">
                                Shop the latest mobile phones from top brands like <strong>Samsung</strong>, <strong>Apple</strong>,
                                <strong> Tecno</strong>, <strong>Infinix</strong>, <strong>Oppo</strong>, <strong>Google Pixels</strong>,
                                and more at unbeatable prices at Shopwice. No matter your budget, there is a phone for you at Shopwice.
                                Whether you need a high-performance flagship device like the Galaxy S models, Apple phones, or Google Pixels,
                                a budget-friendly smart or basic keypad phone, we have got your back.
                            </p>
                            <p className="text-xs text-gray-600 leading-normal mb-6">
                                For essential phone accessories such as earbuds, headphones, screen protectors, chargers, and earphones,
                                you&apos;ll find it all at Shopwice.
                            </p>

                            {/* Footwear */}
                            <h3 className="text-base font-normal text-[#2c3338] mb-2">Footwear for Men, Women, and Kids</h3>
                            <p className="text-xs text-gray-600 leading-normal mb-6">
                                Spoil yourself with trendy shoes for men, women, and kids at Shopwice. From casual sneakers to formal shoes,
                                our authentic collection offers top brands like <strong>Nike</strong>, <strong>Adidas</strong>,
                                <strong> Puma</strong>, <strong>Frank Perry</strong>, <strong>Anax</strong>, and <strong>Clarks</strong> so
                                you can strut fashionably every time.
                            </p>

                            {/* Perfumes */}
                            <h3 className="text-base font-normal text-[#2c3338] mb-2">Perfumes</h3>
                            <p className="text-xs text-gray-600 leading-normal mb-6">
                                You are not fully dressed without perfume. Catch attention and steal hearts with perfumes and fragrances
                                on Shopwice. Shop hundreds of perfumes from top beauty brands like <strong>Avon</strong>,
                                <strong> Fragrance World</strong>, <strong>Aventos</strong>, <strong>Dior</strong>, <strong>Chanel</strong>,
                                <strong> Versace</strong>, <strong>Chloe</strong>, <strong>Calvin Klein</strong>,
                                <strong> Paco Rabanne</strong>, <strong>Carolina Herrera</strong>, <strong>Creed</strong>, and more.
                            </p>

                            {/* Electronics */}
                            <h3 className="text-base font-normal text-[#2c3338] mb-2">
                                Buy the Latest Smart Gadgets and Electronics From Shopwice
                            </h3>
                            <p className="text-xs text-gray-600 leading-normal mb-4">
                                Buying on Shopwice guarantees you get the latest smartphones and tablets at any time of the year.
                                Buy original Apple iOS iPhones, iPads, and original Android brands like Samsung, Google Pixels, Xiaomi,
                                Infinix, and many others! Unlock the best functionality of your smartphones with wearable tech products
                                like earphones, TWS earbuds, headphones, Bluetooth speakers, smartwatches, and many more! We have an
                                endless supply of smart mobile accessories from top brands like Oraimo, Apple, Samsung, Bose, JBL, etc.
                            </p>
                            <p className="text-xs text-gray-600 leading-normal mb-4">
                                We also have an amazing collection of top video gaming consoles and accessories from brands like Sony,
                                Microsoft, Nintendo, Meta, and more. You can buy gaming console platforms such as the PlayStation 4 and 5 series,
                                Microsoft Xbox, Meta Quest VR, Nintendo Switch consoles, and more. Shop for gaming accessories like controllers,
                                headsets, keyboards, and monitors to enhance your gaming experience.
                            </p>
                            <p className="text-xs text-gray-600 leading-normal mb-6">
                                Our electronics catalog also offers a vast collection of computing products from top brands like HP, Dell,
                                Toshiba, Asus, Lenovo, Microsoft, and Apple Macbooks. You can get the latest generation (models) of laptops,
                                desktops, and accessories to augment your computer usage experience. Shop for computing accessories such as
                                storage devices, networking devices, printers, scanners, components, and monitors to enhance your computer
                                or laptop experience.
                            </p>

                            {/* How to shop section */}
                            <h2 className="text-lg font-medium text-[#2c3338] mb-2 uppercase tracking-tight">
                                How is online shopping done in Ghana?
                            </h2>
                            <p className="text-xs text-gray-600 leading-normal mb-4">
                                Shopping online in Ghana has been so easy. You do not need to be an internet pro, to shop for goods online.
                                The only tools you need to shop online in Ghana are a smartphone with an active internet connection. When you
                                have these, log on to Shopwice.com and search for the product you want, if there are variations, select your
                                choice from the variations and add to the cart.
                            </p>
                            <p className="text-xs text-gray-600 leading-normal mb-6">
                                Afterward, click on the cart icon on the top right corner of your screen, verify your selections, enter your
                                address to see your delivery charge, and click proceed to checkout button. At the checkout field, enter your
                                details then click the complete checkout button. That&apos;s it! You have successfully finished shopping online at
                                Shopwice. That was as simple and easy as ABC. Go ahead and make your first order NOW.
                            </p>

                            {/* Payment section */}
                            <h2 className="text-lg font-medium text-[#2c3338] mb-2 uppercase tracking-tight">
                                How to pay for online shopping in Ghana
                            </h2>
                            <p className="text-sm text-gray-600 leading-normal mb-4">
                                Sometimes you shop for mobile phones and shoes online at Shopwice and you keep wondering whether you can pay
                                online and if so, how do you pay online? It&apos;s quite very simple when paying for your goods online in Ghana.
                                At Shopwice, we accept cash on delivery and payment online as well.
                            </p>
                            <p className="text-sm text-gray-600 leading-normal mb-6">
                                To pay online, click on the cart button and visit the checkout page. In the payment section, you will see all
                                the accepted payment options which include mobile money, visa cards, and MasterCard. Select your preferred option,
                                and fill in your details to complete the payment online. That was so easy, you have completed paying for goods
                                online in Ghana.
                            </p>

                            {/* Where to shop section */}
                            <h2 className="text-lg font-medium text-[#2c3338] mb-2 uppercase tracking-tight">
                                Where to shop online in Ghana
                            </h2>
                            <p className="text-sm text-gray-600 leading-normal mb-4">
                                I&apos;m glad you&apos;re asking where to shop online in Ghana. Online shopping in Ghana can be done at so many places
                                on the internet. There are hundreds of online shops in Ghana. New online stores are emerging every day while
                                some are going out with the wind. Shopwice has been in operation since 2018, we have emerged from a small
                                buying and selling business to a growing online store.
                            </p>
                            <p className="text-sm text-gray-600 leading-normal mb-4">
                                With a clear goal of delighting customers through faster delivery of high-quality products and providing value
                                for our customers, we have grown to become one of the best online shopping sites in Ghana. So if you seek the
                                best place to shop online in Ghana, Shopwice is number one as we have appeared as number one in search results.
                            </p>
                        </div>
                    )}

                    {/* Read More / Read Less Button */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0C6DC9] text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            {isExpanded ? (
                                <>
                                    Read Less
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOContent;
