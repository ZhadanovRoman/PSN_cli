/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/:path*', // Прокси сервер на локальный API сервер
        },
      ];
    },
  };
  
  module.exports = nextConfig;
