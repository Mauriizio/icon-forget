import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Si despliegas bajo un subpath (p. ej. GitHub Pages /icon-full), define:
  // NEXT_PUBLIC_BASE_PATH=/icon-full
  basePath,
  assetPrefix: basePath || undefined,

  // Si haces export estático (GitHub Pages/Netlify sin imágenes optimizadas)
  images: { unoptimized: true },

  turbopack: {
    root: path.join(__dirname, "..", "..")
  },

  allowedDevOrigins: ["127.0.0.1"],

  // Quita esta línea si NO haces export estático:
  // output: "export",
};

export default nextConfig;
