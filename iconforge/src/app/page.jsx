// /app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-slate-50">
      {/* HERO */}
      <section className="mx-auto max-w-5xl lg:max-w-6xl px-4 pt-16 pb-10">
        {/* Contenedor responsivo: columna única en móvil, 2 columnas en desktop si luego añades una preview */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Columna de texto */}
          <div>
            {/* Orden correcto en móvil: icono → título → (badge) → subtítulo */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img
                src="/logo-if.svg"
                alt="IconForge logo"
                className="h-12 w-12 rounded-xl shadow-sm ring-1 ring-slate-200"
                loading="eager"
              />

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-center sm:text-left">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  IconForge
                </span>
              </h1>

              {/* Badge: visible en sm+; en móvil puedes activarla quitando 'hidden' */}
              <span className="inline-flex justify-center text-center rounded-full px-3 py-1 text-sm bg-violet-100 text-violet-700 max-w-[260px]">
                100% local · Sin backend · Next.js 15 + Tailwind 3
              </span>
            </div>

            <p className="mt-4 text-lg text-slate-700 text-center sm:text-left sm:max-w-xl">
              Genera todos tus assets desde un solo logo: PWA (maskable), Apple Touch, favicons PNG/ICO y Open Graph 1200×630.
              Todo se procesa en tu navegador. Sin subidas, sin esperas.
            </p>

            <ul className="mt-4 grid gap-2 text-slate-700 text-left max-sm:max-w-[28rem] max-sm:mx-auto">
              <li>• Exportes nítidos desde 16×16 hasta 512×512</li>
              <li>• Soporta <strong>SVG</strong>, <strong>PNG</strong> y <strong>JPG</strong> (≤ 5 MB)</li>
              <li>• OG automático con tipografía clara y fondo legible</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <Link
                href="/studio"
                className="inline-flex items-center rounded-2xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/40"
              >
                🚀 Abrir el Studio
              </Link>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Manifest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                ¿Qué es un manifest?
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500 justify-center sm:justify-start">
              <Badge>100% Local</Badge>
              <Badge>Sin backend</Badge>
              <Badge>Next.js 15 + React 19</Badge>
              <Badge>Tailwind 3</Badge>
            </div>
          </div>

          {/* Columna derecha reservada por si luego agregas una preview/imagen.
              Si no la usas, no pasa nada; el grid colapsa perfecto en móvil. */}
          <div className="hidden lg:block" />
        </div>

        {/* === CTA flotante móvil === */}
        <div className="fixed inset-x-0 bottom-4 z-50 sm:hidden">
          <div className="mx-auto w-[calc(100%-2rem)]">
            <Link
              href="/studio"
              className="block text-center rounded-xl px-5 py-3 bg-indigo-600 text-white font-semibold shadow-lg"
            >
              🚀 Abrir el Studio
            </Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <h2 className="text-xl font-semibold text-slate-900">¿Cómo funciona?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Step n="1" title="Sube tu logo">
            Aceptamos <strong>SVG</strong>, <strong>PNG</strong> y <strong>JPG</strong> (≤ 5 MB). Si es SVG lo rasterizamos con alta calidad.
          </Step>
          <Step n="2" title="Ajusta y previsualiza">
            Fondo transparente o color, título/subtítulo para OG y previsualizaciones en vivo.
          </Step>
          <Step n="3" title="Descarga el ZIP">
            Incluye <em>icons/</em> (16–512), <em>apple-touch-icon-180</em>, <em>favicon.ico</em>, <em>og/1200×630</em> y <em>site.webmanifest</em>.
          </Step>
        </div>
      </section>

      {/* QUÉ OBTIENES */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-xl font-semibold text-slate-900">Qué obtienes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FeatureCard
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            title="Assets de marca coherentes"
            desc="Con márgenes seguros y maskable listo para PWA. Exportes nítidos desde 16×16 hasta 512×512."
          />
          <FeatureCard
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            title="OG 1200×630 con tipografía clara"
            desc="Capa de fondo automática si tu logo es transparente. Títulos y subtítulos personalizables."
          />
          <FeatureCard
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            title="Manifest válido"
            desc="Generamos site.webmanifest con purpose 'any maskable' y colores configurables."
          />
          <FeatureCard
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            title="Sin dependencia del servidor"
            desc="Todo sucede en tu navegador con Canvas API, canvg y client-zip. Privacidad total."
          />
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-if.svg" alt="IconForge" className="h-6 w-6 rounded-lg ring-1 ring-slate-200" />
            <span>IconForge · Generador de assets</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js 15 · React 19 · Tailwind 3</span>
            <a
              href="https://maurizio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-indigo-600"
            >
              Hecho por <strong>maurizio.dev</strong>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
        {n}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </div>
  );
}

function FeatureCard({ title, desc, className = "" }) {
  return (
    <div className={className || "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"}>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
