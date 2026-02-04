IconFull — Assets
=====================

Contenido:
- /icons/*     → PWA icons, apple-touch, favicons PNG
- /og/*        → Open Graph 1200×630
- favicon.ico  → Multi-tamaño (16/32) (si presente)
- site.webmanifest

Instrucciones rápidas (HTML):
  <link rel="icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#000000">

Next.js (coloca los archivos en /public):
  - Copia las carpetas /icons, /og, y los archivos favicon.ico y site.webmanifest dentro de /public.
  - En app/layout.tsx o _document, añade los <link> de arriba.

Nota: si elegiste fondo "transparente", la OG usa blanco para un mejor preview en redes.
Generado 100% en tu navegador con IconFull.