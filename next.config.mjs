/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Si despliegas bajo un subpath (p. ej. GitHub Pages /icon-forget), define:
  // NEXT_PUBLIC_BASE_PATH=/icon-forget
  basePath,
  assetPrefix: basePath || undefined,

  // Si haces export estático (GitHub Pages/Netlify sin imágenes optimizadas)
  images: { unoptimized: true },

  // Quita esta línea si NO haces export estático:
  // output: "export",
};

export default nextConfig;
