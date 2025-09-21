// /app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      {/* HERO */}
      <section className="container-if pt-16 pb-10">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          {/* Columna izquierda: copy + CTA */}
          <div className="min-w-0">
            {/* Fila: icono + título */}
            <div className="flex items-center gap-4">
              <img
                src="/logo-if.svg"
                alt="IconForge logo"
                className="h-12 w-12 shrink-0 rounded-xl shadow-sm ring-1 ring-slate-200"
                loading="eager"
                width="48"
                height="48"
              />
              <h1 className="font-display text-5xl font-extrabold tracking-tight h1-gradient p-2">
                IconForge
              </h1>
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge">100% local</span>
              <span className="badge">Sin backend</span>
              <span className="badge">Next.js 15 + React 19</span>
            </div>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              Genera todos tus assets desde un solo logo: PWA (maskable), Apple Touch, favicons PNG/ICO y Open Graph
              1200×630. Todo se procesa en tu navegador. Sin subidas, sin esperas.
            </p>

            <ul className="mt-5 space-y-2.5 text-slate-700 break-words">
              <li>• Exporta íconos nítidos de 16×16 a 512×512</li>
              <li>
                • Soporta <strong>SVG</strong>, <strong>PNG</strong> y <strong>JPG</strong> (≤ 5 MB)
              </li>
              <li>• OG automático con tipografía clara y fondo legible</li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/studio"
                className="inline-flex items-center rounded-2xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30"
              >
                🚀 Abrir el Studio
              </Link>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Manifest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/30"
              >
                ¿Qué es un manifest?
              </a>
            </div>
          </div>

          {/* Columna derecha: ilustración con el SVG grande */}
          <div className="min-w-0">
            <div className="hero-figure animate-[ifGlow_8s_ease-in-out_infinite] w-full max-w-[520px] rounded-3xl border border-slate-200/60 p-6 shadow-md md:ml-auto">
              {/* Top bar */}
              <div className="flex items-center justify-between pb-3">
                <div className="text-sm font-semibold text-slate-700">Vista del icono</div>
                <span className="badge">SVG</span>
              </div>

              {/* Lienzo del logo */}
              <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6">
                <img
                  src="/logo-if.svg"
                  alt="Logo en tamaño grande"
                  className="w-[300px] max-w-full drop-shadow-sm animate-[floatY_6s_ease-in-out_infinite]"
                  decoding="async"
                  width="300"
                  height="300"
                />
              </div>

              {/* Chips de especificación */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <SpecPill label="512×512" />
                <SpecPill label="Maskable" />
                <SpecPill label="OG 1200×630" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section className="container-if pb-6">
        <h2 className="font-display text-xl font-semibold text-slate-900">¿Cómo funciona?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Step n="1" title="Sube tu logo">
            Aceptamos <strong>SVG</strong>, <strong>PNG</strong> y <strong>JPG</strong> (≤ 5 MB). Si es SVG lo
            rasterizamos con alta calidad.
          </Step>
          <Step n="2" title="Ajusta y previsualiza">
            Fondo transparente o color, título/subtítulo para OG y previsualizaciones en vivo.
          </Step>
          <Step n="3" title="Descarga el ZIP">
            Incluye <em>icons/</em> (16–512), <em>apple-touch-180</em>, <em>favicon.ico</em>, <em>og/1200×630</em> y{" "}
            <em>site.webmanifest</em>.
          </Step>
        </div>
      </section>

      {/* Qué obtienes */}
      <section className="container-if pb-12">
        <h2 className="font-display text-xl font-semibold text-slate-900">Qué obtienes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="Assets de marca coherentes"
            desc="Con márgenes seguros y maskable listo para PWA. Exportes nítidos desde 16×16 hasta 512×512."
          />
          <FeatureCard
            title="OG 1200×630 con tipografía clara"
            desc="Capa de fondo automática si tu logo es transparente. Títulos y subtítulos personalizables."
          />
          <FeatureCard
            title="Manifest válido"
            desc="Generamos site.webmanifest con purpose 'any maskable' y colores configurables."
          />
          <FeatureCard
            title="Sin dependencia del servidor"
            desc="Todo sucede en tu navegador con Canvas API, canvg y client-zip. Privacidad total."
          />
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-if flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <img
              src="/logo-if.svg"
              alt="IconForge"
              className="h-6 w-6 rounded-lg ring-1 ring-slate-200"
              width="24"
              height="24"
            />
            <span>IconForge · Generador de assets</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js 15 · React 19 · Tailwind 3</span>
            <a href="https://maurizio.dev" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Hecho por maurizio.dev
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SpecPill({ label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-xs font-medium text-slate-700">
      {label}
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="card p-5">
      <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
        {n}
      </div>
      <h3 className="font-display text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="card p-5">
      <h3 className="font-display text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
