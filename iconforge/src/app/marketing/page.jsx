export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">IconForge</h1>
      <p className="mt-2 text-slate-600">
        Genera todos tus assets desde un solo logo: PWA, Apple, favicons, ICO y Open Graph. 100% local.
      </p>
      <a href="/studio" className="btn mt-6">Abrir Studio</a>

      <section className="grid md:grid-cols-3 gap-4 mt-12">
        <div className="card p-4">
          <h3 className="font-semibold">Privacidad</h3>
          <p className="text-sm text-slate-600">No subimos tus archivos: todo se procesa en tu navegador.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Dev-first</h3>
          <p className="text-sm text-slate-600">ZIP + snippets listos para Next/Vite/HTML.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Completo</h3>
          <p className="text-sm text-slate-600">PWA (maskable), Apple 180, favicons, ICO y OG 1200×630.</p>
        </div>
      </section>
    </main>
  );
}
