// /app/layout.jsx

import "./globals.css";

export const metadata = {
  title: "IconForge — All-in-one icon & OG generator",
  description:
    "Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Fuentes visibles y modernas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />

        {/* Viewport y PWA meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b0b0b" />

        {/* Open Graph por defecto */}
        <meta property="og:title" content="IconForge — All-in-one icon & OG generator" />
        <meta
          property="og:description"
          content="Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/og-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>

      {/* Tipografías aplicadas aquí; overflow-x hidden para matar scroll lateral */}
      <body
        className="antialiased"
        style={{
          fontFamily:
            "Plus Jakarta Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
