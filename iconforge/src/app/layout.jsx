// iconforge/src/app/layout.jsx
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://icon-forget.vercel.app"), // cambia si pones dominio propio
  title: "IconForge — All-in-one icon & OG generator",
  description:
    "Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador.",
  themeColor: "#0b0b0b",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon-180.png", sizes: "180x180" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "IconForge — All-in-one icon & OG generator",
    description:
      "Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador.",
    url: "https://icon-forget.vercel.app",
    images: [{ url: "/og/og-1200x630.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "IconForge",
    description: "Genera todos tus assets desde un solo logo. 100% local.",
    images: ["/og/og-1200x630.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
