// /app/layout.jsx

import "./globals.css";

export const metadata = {
  title: "IconForge — All-in-one icon & OG generator",
  description:
    "Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador.",
  // Puedes dejar que Next gestione esto, pero igual añadimos manualmente abajo para asegurar compatibilidad.
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap" rel="stylesheet" />


        {/* Viewport con safe-area para móviles */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Favicon ICO (multi-tamaño 16/32). No pasa nada si todavía no existe: sólo 404 en Network. */}
        <link rel="icon" href="/favicon.ico" />

        {/* PNG favicons (opcional pero recomendado) */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16.png"
        />

        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon-180.png"
        />

        {/* Manifest PWA */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color (alineado a valor por defecto del Studio; ajusta si cambias el manifest) */}
        <meta name="theme-color" content="#0b0b0b" />

        {/* OG por defecto (se puede sobreescribir por página si luego generas OG dinámica) */}
        <meta property="og:title" content="IconForge — All-in-one icon & OG generator" />
        <meta
          property="og:description"
          content="Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador."
        />
        <meta property="og:type" content="website" />
        {/* Si copias /og/og-1200x630.png a /public/og, esta ruta funcionará */}
        <meta property="og:image" content="/og/og-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body>{children}</body>
    </html>
  );
}
