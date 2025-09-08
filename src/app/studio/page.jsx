"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { drawToCanvas, blobFromCanvas, downloadBlob, drawOG } from "@/lib/canvas-utils";
import { rasterizeSvgToImage } from "@/lib/svg-to-canvas";
import { pngsToIco } from "@/lib/ico-client";
import { zipAndDownload } from "@/lib/zip-utils";

const SIZES = [
  { label: "icon-512", size: 512, padding: 0.06 },
  { label: "icon-192", size: 192, padding: 0.06 },
  { label: "icon-256", size: 256, padding: 0.06 },
  { label: "icon-384", size: 384, padding: 0.06 },
  { label: "apple-180", size: 180, padding: 0.06 },
  { label: "favicon-32", size: 32,  padding: 0.08 },
  { label: "favicon-16", size: 16,  padding: 0.08 },
];

export default function StudioPage() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [bg, setBg] = useState("transparent");
  const [maskable, setMaskable] = useState(true);
  const [busy, setBusy] = useState(false);

  // OG state
  const [ogTitle, setOgTitle] = useState("IconForge");
  const [ogSubtitle, setOgSubtitle] = useState("Assets completos para tu web — 100% local");

  // manifest state
  const [mfName, setMfName] = useState("Mi App");
  const [mfShort, setMfShort] = useState("MiApp");
  const [mfTheme, setMfTheme] = useState("#0b0b0b");
  const [mfBg, setMfBg] = useState("#f5f5f4");

  const onPick = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true); setFile(f);
    try {
      if (/svg/.test(f.type) || f.name.toLowerCase().endsWith(".svg")) {
        const text = await f.text();
        const image = await rasterizeSvgToImage(text);
        setImg(image);
      } else {
        const dataUrl = await fileToDataURL(f);
        setImg(await dataUrlToImage(dataUrl));
      }
    } finally { setBusy(false); }
  };

  const tiles = useMemo(() => {
    if (!img) return [];
    const list = SIZES.map(({ label, size, padding }) => ({
      label, size, canvas: drawToCanvas({ img, size, padding, bg }),
    }));
    if (maskable) {
      list.unshift({
        label: "icon-512-maskable",
        size: 512,
        canvas: drawToCanvas({ img, size: 512, padding: 0.12, bg }),
      });
    }
    return list;
  }, [img, bg, maskable]);

  const downloadPNG = async (t) => {
    const b = await blobFromCanvas(t.canvas, "image/png");
    downloadBlob(b, `${normalizeFileName(t.label)}.png`);
  };

  const downloadICO = async () => {
    if (!img) return;
    const f16 = tiles.find(t => t.label === "favicon-16");
    const f32 = tiles.find(t => t.label === "favicon-32");
    if (!f16 || !f32) return;

    const [b16, b32] = await Promise.all([
      blobFromCanvas(f16.canvas, "image/png"),
      blobFromCanvas(f32.canvas, "image/png"),
    ]);
    const ico = await pngsToIco([b16, b32]);
    if (!ico) {
      alert("No se pudo generar .ico (falta vendor png2icojs).");
      return;
    }
    downloadBlob(ico, "favicon.ico");
  };

  const downloadOG = async () => {
    if (!img) return;
    const ogBg = bg === "transparent" ? "#ffffff" : bg;
    const c = drawOG({ img, w: 1200, h: 630, bg: ogBg, title: ogTitle, subtitle: ogSubtitle });
    const b = await blobFromCanvas(c, "image/png", 0.92);
    downloadBlob(b, "og-1200x630.png");
  };

  const downloadZIP = async () => {
    if (!img) return;
    const files = [];

    // PNGs
    const pngEntries = await Promise.all(
      tiles.map(async (t) => {
        const b = await blobFromCanvas(t.canvas, "image/png");
        const name = labelToZipPath(t.label);
        return { name, input: b, lastModified: Date.now() };
      })
    );
    files.push(...pngEntries);

    // ICO (si está disponible)
    const f16 = tiles.find(t => t.label === "favicon-16");
    const f32 = tiles.find(t => t.label === "favicon-32");
    if (f16 && f32) {
      const [b16, b32] = await Promise.all([
        blobFromCanvas(f16.canvas, "image/png"),
        blobFromCanvas(f32.canvas, "image/png"),
      ]);
      const ico = await pngsToIco([b16, b32]);
      if (ico) files.push({ name: "favicon.ico", input: ico, lastModified: Date.now() });
    }

    // OG
    const ogBg = bg === "transparent" ? "#ffffff" : bg;
    const ogC = drawOG({ img, w: 1200, h: 630, bg: ogBg, title: ogTitle, subtitle: ogSubtitle });
    const ogB = await blobFromCanvas(ogC, "image/png", 0.92);
    files.push({ name: "og/og-1200x630.png", input: ogB, lastModified: Date.now() });

    // Manifest
    const manifest = buildManifest({
      name: mfName,
      shortName: mfShort,
      themeColor: mfTheme,
      backgroundColor: mfBg,
      includeMaskable: !!maskable,
    });
    const mfBlob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/manifest+json" });
    files.push({ name: "site.webmanifest", input: mfBlob, lastModified: Date.now() });

    // README.txt
    const readme = buildReadme();
    files.push({ name: "README.txt", input: new Blob([readme], { type: "text/plain" }) });

    await zipAndDownload(files, "iconforge-assets.zip");
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">IconForge Studio</h1>
      <p className="text-slate-600">Sube tu logo y descarga todos los assets listos (PNG, ICO, OG, manifest y ZIP).</p>

      <section className="rounded-2xl border bg-white shadow-sm p-4 mt-6">
        <label className="block text-sm font-medium mb-2">1) Logo (SVG/PNG/JPG)</label>
        <input type="file" accept="image/*,.svg" onChange={onPick}
          className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:bg-white file:text-slate-700 hover:file:bg-slate-50"/>
        {file && <p className="mt-2 text-xs text-slate-600">Cargado: <strong>{file.name}</strong>{busy ? " (procesando…)" : ""}</p>}
      </section>

      <section className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border bg-white shadow-sm p-4 space-y-4">
          <h3 className="text-sm font-medium">Opciones</h3>

          <div className="flex items-center justify-between gap-3">
            <label className="text-sm">Fondo</label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setBg("transparent")}
                className={`px-2.5 py-1 rounded border text-xs ${bg==="transparent"?"bg-slate-800 text-white":"bg-white"}`}>
                Transparente
              </button>
              <input type="color" value={bg==="transparent" ? "#ffffff" : bg}
                onChange={(e)=>setBg(e.target.value)} className="h-8 w-10 border rounded" title="Color de fondo"/>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="text-sm">Maskable 512</label>
            <input type="checkbox" checked={maskable} onChange={(e)=>setMaskable(e.target.checked)} />
          </div>

          <h3 className="text-sm font-medium pt-2">Open Graph</h3>
          <input value={ogTitle} onChange={e=>setOgTitle(e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="Título"/>
          <input value={ogSubtitle} onChange={e=>setOgSubtitle(e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm mt-2" placeholder="Subtítulo"/>
          <button onClick={downloadOG} disabled={!img} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white hover:bg-slate-50 disabled:opacity-50">
            Descargar OG (1200×630)
          </button>

          <h3 className="text-sm font-medium pt-2">Manifest</h3>
          <input value={mfName} onChange={e=>setMfName(e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="name"/>
          <input value={mfShort} onChange={e=>setMfShort(e.target.value)} className="w-full border rounded px-3 py-1.5 text-sm mt-2" placeholder="short_name"/>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label className="block text-xs text-slate-600">theme_color</label>
              <input type="color" value={mfTheme} onChange={e=>setMfTheme(e.target.value)} className="h-8 w-full border rounded"/>
            </div>
            <div>
              <label className="block text-xs text-slate-600">background_color</label>
              <input type="color" value={mfBg} onChange={e=>setMfBg(e.target.value)} className="h-8 w-full border rounded"/>
            </div>
          </div>

          <button onClick={downloadICO} disabled={!img} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white hover:bg-slate-50 disabled:opacity-50 w-full mt-3">
            Descargar favicon.ico
          </button>
          <button onClick={downloadZIP} disabled={!img} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 w-full">
            Descargar ZIP (todo)
          </button>
          {!img && <p className="text-xs text-slate-500">Sube un logo para habilitar.</p>}
        </div>

        <div className="md:col-span-3 rounded-2xl border bg-white shadow-sm p-4">
          <h3 className="text-sm font-medium mb-3">Previsualización y descarga</h3>
          {!img && <div className="text-center text-slate-500 py-10">Sube tu logo para ver previsualizaciones</div>}
          {img && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tiles.map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2">
                  <div className="border rounded-xl p-3 bg-[conic-gradient(at_top_left,_#f8fafc,_#e2e8f0)]">
                    <CanvasPreview canvas={t.canvas} viewSize={Math.min(128, t.size)} />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-600">{normalizeFileName(t.label)}</span>
                    <button onClick={() => downloadPNG(t)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-white hover:bg-slate-50">PNG</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CanvasPreview({ canvas, viewSize = 128 }) {
  const ref = useRef(null);
  useEffect(() => {
    const dst = ref.current; if (!dst) return;
    const ctx = dst.getContext("2d");
    dst.width = viewSize; dst.height = viewSize;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0,0,viewSize,viewSize);
    ctx.drawImage(canvas, 0, 0, viewSize, viewSize);
  }, [canvas, viewSize]);
  return <canvas ref={ref} className="block" style={{ width: viewSize, height: viewSize }} />;
}

function normalizeFileName(label) {
  if (label === "apple-180") return "apple-touch-icon-180";
  return label;
}
function labelToZipPath(label) {
  if (label === "apple-180") return "icons/apple-touch-icon-180.png";
  if (label.startsWith("favicon-")) return `icons/${label}.png`;
  return `icons/${label}.png`;
}
function fileToDataURL(file){
  return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
}
function dataUrlToImage(dataUrl){
  return new Promise((resolve,reject)=>{ const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=dataUrl; });
}

function buildManifest({ name, shortName, themeColor, backgroundColor, includeMaskable }) {
  const icons = [
    { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png" },
    { src: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
    { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icons/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" },
  ];
  if (includeMaskable) {
    icons.unshift({ src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "any maskable" });
  }
  return {
    name,
    short_name: shortName,
    description: "Assets generados con IconForge",
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons,
  };
}

function buildReadme() {
  return `IconForge — Assets
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
Generado 100% en tu navegador con IconForge.`;
}
