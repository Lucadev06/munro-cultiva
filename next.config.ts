/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 🔥 Aumenta el límite aquí (podes poner '20mb' si querés)
    },
  },
};

export default nextConfig;
