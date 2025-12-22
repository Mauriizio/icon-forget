const assets = [
  { src: "/icons/icon-512.png", label: "PWA 512" },
  { src: "/icons/icon-256.png", label: "PWA 256" },
  { src: "/icons/apple-touch-icon-180.png", label: "Apple 180" },
  { src: "/icons/icon-192.png", label: "PWA 192" },
  { src: "/icons/favicon-32.png", label: "Favicon 32" },
  { src: "/icons/favicon-16.png", label: "Favicon 16" },
];

export default function HeroPreview() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-2xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(103,232,249,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.24),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.18),transparent_45%)]" aria-hidden="true" />
        <div className="relative grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-inner backdrop-blur">
            <div className="mb-2 text-xs font-semibold text-cyan-50">Previews en vivo</div>
            <div className="flex flex-wrap gap-3">
              {assets.map((item) => (
                <figure key={item.src} className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-2 shadow-sm ring-1 ring-white/10">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    width={item.label.includes("512") ? 80 : 48}
                    height={item.label.includes("512") ? 80 : 48}
                    className="h-12 w-12 sm:h-16 sm:w-16"
                  />
                  <figcaption className="text-[10px] text-slate-100/80">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-inner backdrop-blur">
            <div className="text-xs font-semibold text-cyan-50">Open Graph (1200×630)</div>
            <div className="overflow-hidden rounded-xl border border-white/20 shadow-lg">
              <img
                src="/og/og-1200x630.png"
                alt="Preview OG"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs text-slate-100/80">
              Miniaturas listas sin descargar: valida el maskable, favicons y OG antes de exportar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}