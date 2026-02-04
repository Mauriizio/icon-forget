// /app/page.jsx
import Link from "next/link";
import HeroPreview from "./components/HeroPreview";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-app text-white">
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-14">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-2xl" />
        <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-400/30 blur-3xl" aria-hidden />
        <div className="absolute bottom-4 right-4 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />

        {/* Contenedor responsivo: columna única en móvil, 2 columnas en desktop si luego añades una preview */}
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Columna de texto */}
          <div>
            {/* Orden correcto en móvil: icono → título → (badge) → subtítulo */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img
                src="/logo-if.svg"
                alt="IconFull"
                className="h-12 w-12 rounded-xl shadow-lg ring-2 ring-white/40"
                loading="eager"
              />

              <div className="flex flex-col gap-3 text-center sm:text-left">
                <p className="inline-flex items-center self-center sm:self-start rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 ring-1 ring-white/20">
                  Studio local · sin backend
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_10px_40px_rgba(56,189,248,0.2)]">
                  <span className="bg-gradient-to-r from-cyan-300 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                    IconFull
                  </span>
                </h1>
              </div>

              {/* Badge: visible en sm+; en móvil puedes activarla quitando 'hidden' */}
              <span className="inline-flex justify-center text-center rounded-full px-3 py-1 text-sm bg-white/10 text-cyan-50 ring-1 ring-white/10 max-w-[260px]">
                100% local · Next.js 16.1 · React 19
              </span>
            </div>

            <p className="mt-4 text-lg text-slate-100/90 text-center sm:text-left sm:max-w-xl">
              Genera todos tus assets desde un solo logo: PWA (maskable), Apple Touch, favicons PNG/ICO y Open Graph 1200×630.
              Todo se procesa en tu navegador. Sin subidas, sin esperas.
            </p>

            <ul className="mt-4 grid gap-2 text-slate-100/80 text-left max-sm:max-w-[28rem] max-sm:mx-auto">
              <li>• Exportes nítidos desde 16×16 hasta 512×512</li>
              <li>• Soporta <strong>SVG</strong>, <strong>PNG</strong> y <strong>JPG</strong> (≤ 5 MB)</li>
              <li>• OG automático con tipografía clara y fondo legible</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <Link
                href="/studio"
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] focus:outline-none focus-visible:ring focus-visible:ring-cyan-400/40"
              >
                🚀 Abrir el Studio
              </Link>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Manifest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20"
              >
                ¿Qué es un manifest?
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-100/70 justify-center sm:justify-start">
              <Badge>100% Local</Badge>
              <Badge>Sin backend</Badge>
              <Badge>Next.js 16.1</Badge>
              <Badge>React 19</Badge>
              <Badge>Tailwind CSS 3</Badge>
            </div>
          </div>

          {/* Columna derecha: mockup/slider */}
          <div className="hidden lg:block">
            <HeroPreview />
          </div>
        </div>

        {/* === CTA flotante móvil === */}
        <div className="fixed inset-x-0 bottom-4 z-50 sm:hidden">
          <div className="mx-auto w-[calc(100%-2rem)]">
            <Link
              href="/studio"
              className="block text-center rounded-xl px-5 py-3 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-white font-semibold shadow-lg"
            >
              🚀 Abrir el Studio
            </Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <h2 className="text-xl font-semibold text-white">¿Cómo funciona?</h2>
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
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="text-xl font-semibold text-white">Qué obtienes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FeatureCard
            className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-500/30"
            title="Assets de marca coherentes"
            desc="Con márgenes seguros y maskable listo para PWA. Exportes nítidos desde 16×16 hasta 512×512."
          />
          <FeatureCard
            className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-500/30"
            title="OG 1200×630 con tipografía clara"
            desc="Capa de fondo automática si tu logo es transparente. Títulos y subtítulos personalizables."
          />
          <FeatureCard
            className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-500/30"
            title="Manifest válido"
            desc="Generamos site.webmanifest con purpose 'any maskable' y colores configurables."
          />
          <FeatureCard
            className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-500/30"
            title="Sin dependencia del servidor"
            desc="Todo sucede en tu navegador con Canvas API, canvg y client-zip. Privacidad total."
          />
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-if.svg" alt="IconFull" className="h-8 w-8 rounded-lg ring-1 ring-white/30" />
            <div>
              <p className="font-semibold text-white">IconFull</p>
              <p className="text-slate-100/70">Generador local de assets para PWA, marcas y Open Graph.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-100/70">
            <span>Next.js 16.1 · React 19 · Tailwind CSS 3</span>
            <Link href="/privacy" className="text-white/90 hover:text-cyan-200">
              Privacidad
            </Link>
            <a
              href="https://maurizio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-cyan-200"
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
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10 text-white">
      {children}
    </span>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl">
      <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-xs font-semibold text-white">
        {n}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-100/80">{children}</p>
    </div>
  );
}

function FeatureCard({ title, desc, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl ${className}`}>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-100/80">{desc}</p>
    </div>
  );
}
