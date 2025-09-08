export const metadata = {
  title: "IconForge — All-in-one icon & OG generator",
  description:
    "Sube tu logo y descarga ICO, PWA, Apple, favicons y Open Graph. Todo se procesa en tu navegador.",
};
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
