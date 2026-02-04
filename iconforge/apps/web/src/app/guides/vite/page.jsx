import Link from "next/link";

export default function ViteGuidePage() {
  return (
    <main className="min-h-dvh bg-app text-white">
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Guía rápida
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Integración con Vite
        </h1>
        <p className="mt-4 text-base text-slate-100/80">
          Usa los assets generados por IconFull en tu proyecto Vite en menos de cinco
          minutos. Aquí tienes el checklist con los archivos clave y dónde colocarlos.
        </p>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">1) Copia los archivos</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-100/80">
              <li>
                <strong>favicon.ico</strong> y la carpeta <strong>icons/</strong> dentro de
                <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">public/</code>.
              </li>
              <li>
                <strong>apple-touch-icon-180.png</strong> en
                <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">public/</code>.
              </li>
              <li>
                <strong>og/1200x630.png</strong> si vas a usar Open Graph en tu sitio.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">2) Actualiza el HTML base</h2>
            <p className="mt-2 text-sm text-slate-100/80">
              En Vite el archivo principal es
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">index.html</code>.
              Añade estos enlaces dentro de la etiqueta
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">&lt;head&gt;</code>.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-100">
{`<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
<meta property="og:image" content="/og/1200x630.png" />`}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">3) Usa el manifest</h2>
            <p className="mt-2 text-sm text-slate-100/80">
              Copia el archivo
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">site.webmanifest</code>
              dentro de
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">public/</code> y añade
              la referencia en el head.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-100">
{`<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0ea5e9" />`}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">4) Verifica en local</h2>
            <p className="mt-2 text-sm text-slate-100/80">
              Ejecuta tu app con
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">npm run dev</code> y
              confirma el favicon en la pestaña del navegador. Para PWA, usa
              <code className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">Lighthouse</code> o el
              panel de Application en DevTools.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/studio"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg"
          >
            Crear nuevos assets
          </Link>
          <Link
            href="/guides/next"
            className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:text-white"
          >
            Ver guía para Next.js
          </Link>
        </div>
      </section>
    </main>
  );
}
