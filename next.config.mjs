/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trackPages/base',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
