/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pin',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
