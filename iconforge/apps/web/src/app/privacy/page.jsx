import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-app text-white">
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Privacidad
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Tu información se queda en tu navegador
        </h1>
        <p className="mt-4 text-base text-slate-100/80">
          IconFull funciona 100% en local. No subimos archivos ni guardamos tus
          imágenes en servidores externos. Todo el procesamiento ocurre en tu equipo.
        </p>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Datos que no recopilamos</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-100/80">
              <li>Imágenes, logos o archivos que subas al Studio.</li>
              <li>Metadatos de tus proyectos o marcas.</li>
              <li>Información personal identificable.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Qué sí usamos</h2>
            <p className="mt-2 text-sm text-slate-100/80">
              Solo usamos almacenamiento local para guardar tus preferencias de sesión
              (como el último color o tamaño seleccionado) y mejorar tu experiencia.
              Puedes borrar estos datos desde la configuración de tu navegador.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Recursos externos</h2>
            <p className="mt-2 text-sm text-slate-100/80">
              El sitio incluye enlaces a documentación externa (por ejemplo MDN). Al
              salir de IconFull, aplican las políticas de esos sitios.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white/90 hover:text-white"
          >
            Volver al inicio
          </Link>
          <Link
            href="/studio"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg"
          >
            Abrir el Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
