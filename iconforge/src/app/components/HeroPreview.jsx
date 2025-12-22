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
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.12),transparent_45%)]" aria-hidden="true" />
        <div className="relative grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
            <div className="mb-2 text-xs font-semibold text-slate-600">Previews en vivo</div>
            <div className="flex flex-wrap gap-3">
              {assets.map((item) => (
                <figure key={item.src} className="flex flex-col items-center gap-1 rounded-xl bg-slate-50/70 p-2 shadow-sm">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    width={item.label.includes("512") ? 80 : 48}
                    height={item.label.includes("512") ? 80 : 48}
                    className="h-12 w-12 sm:h-16 sm:w-16"
                  />
                  <figcaption className="text-[10px] text-slate-600">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-inner backdrop-blur">
            <div className="text-xs font-semibold text-slate-600">Open Graph (1200×630)</div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img
                src="/og/og-1200x630.png"
                alt="Preview OG"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">
              Miniaturas listas sin descargar: valida el maskable, favicons y OG antes de exportar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}