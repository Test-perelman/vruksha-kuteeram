/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    const immutableAssetCache = 'public, max-age=31536000, immutable';
    const staticPageCache = 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800';

    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: staticPageCache
          }
        ]
      },
      {
        source: '/brand-assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: immutableAssetCache
          }
        ]
      }
    ];
  }
};

export default nextConfig;
