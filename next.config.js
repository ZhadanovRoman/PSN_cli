/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: {
      allowedOrigins:["prostudionails.online", "localhost:5000"],
    },
  },
  
  };
  
  module.exports = nextConfig;
