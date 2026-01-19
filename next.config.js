/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swewoocommerce.dfweb.no',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'shopwice.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.shopwice.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopwice.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://shopwice.com/graphql',
      },
    ];
  },
};

module.exports = nextConfig;
