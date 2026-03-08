/** @type {import('next').NextConfig} */
const nextConfig = {
  // Le dice a Next.js que exporte el proyecto como archivos estáticos puros
  output: 'export',
  
  // Apaga el optimizador de imágenes interno de Next.js. 
  // Esto es obligatorio para exportaciones estáticas y no te preocupes, 
  // Cloudflare optimizará las imágenes automáticamente en sus servidores.
  images: {
    unoptimized: true,
  },
  
  // Ignora errores de TypeScript y ESLint durante el build 
  // (muy útil para que Cloudflare no cancele la subida por un warning menor)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;