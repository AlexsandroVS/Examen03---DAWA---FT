// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Agrega otros dominios que uses aquí
      {
        protocol: 'https',
        hostname: '**.example.com', // Reemplaza con tus dominios
        port: '',
        pathname: '/**',
      },
    ],
    // Opcional: configuración de tamaños de imagen
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Otras configuraciones que necesites
};

module.exports = nextConfig;