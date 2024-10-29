/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/shop/t-shirt',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "cdn.sanity.io",
      // },
    ]
  },
  experimental: {
    taint: true,
  }
};

export default nextConfig;
