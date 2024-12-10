/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `https://${process.env.NEXT_PUBLIC_PROXY_IP}/api/:path*, http://localhost:5000/:path*`, // Прокси сервер на локальный API сервер
        },
      ];
    },
  };
  
  module.exports = nextConfig;
