"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { drawToCanvas, blobFromCanvas, downloadBlob, drawOG } from "@/lib/canvas-utils";
import { rasterizeSvgToImage } from "@/lib/svg-to-canvas";
import { pngsToIco } from "@/lib/ico-client";
import { zipAndDownload } from "@/lib/zip-utils";
import { validateFile, MAX_BYTES } from "@/lib/upload-validate";
import { useAsyncTask } from "@/lib/use-async-task";

const SIZES = [
  { label: "icon-512", size: 512, padding: 0.06 },
  { label: "icon-192", size: 192, padding: 0.06 },
  { label: "icon-256", size: 256, padding: 0.06 },
  { label: "icon-384", size: 384, padding: 0.06 },
  { label: "apple-180", size: 180, padding: 0.06 },
  { label: "favicon-32", size: 32,  padding: 0.08 },
  { label: "favicon-16", size: 16,  padding: 0.08 },
];

function Spinner({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent align-[-2px] ${className}`}
    />
  );
}

export default function StudioPage() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [bg, setBg] = useState("transparent");
  const [maskable, setMaskable] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uiError, setUiError] = useState(null);
  const [zipDoneAt, setZipDoneAt] = useState(null);

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

    setUiError(null);
    const res = validateFile(f);
    if (!res.ok) {
      setFile(null);
      setImg(null);
      setUiError(res.error);
      console.warn("[upload] invalid file:", { name: f?.name, size: f?.size, type: f?.type });
      return;
    }

    setBusy(true);
    setFile(f);
    try {
      if (/svg/.test(f.type) || f.name.toLowerCase().endsWith(".svg")) {
        const text = await f.text();
        const image = await rasterizeSvgToImage(text);
        setImg(image);
      } else {
        const dataUrl = await fileToDataURL(f);
        setImg(await dataUrlToImage(dataUrl));
      }
    } catch (err) {
      console.error("[upload] load error", err);
      setUiError("No se pudo cargar el logo. Intenta con otro archivo.");
      setFile(null);
      setImg(null);
    } finally {
      setBusy(false);
    }
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
const previewShots = useMemo(() => {
    if (!img) return null;

    const desired = ["icon-512-maskable", "icon-512", "apple-180", "favicon-32"];
    const thumbs = desired
      .map((label) => tiles.find((t) => t.label === label))
      .filter(Boolean)
      .map((t) => ({
        label: normalizeFileName(t.label),
        size: t.size,
        dataUrl: t.canvas.toDataURL("image/png"),
      }));

    const ogBg = bg === "transparent" ? "#ffffff" : bg;
    const ogCanvas = drawOG({ img, w: 1200, h: 630, bg: ogBg, title: ogTitle, subtitle: ogSubtitle });

    return {
      thumbs,
      ogUrl: ogCanvas.toDataURL("image/png"),
    };
  }, [tiles, bg, ogTitle, ogSubtitle, img]);

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

  // ——— Preset ZIP con aviso de finalización ———
  const downloadZIPPreset = async () => {
    await downloadZIP();
    setZipDoneAt(Date.now());
  };

  // Tareas envueltas
  const { run: runOG,   running: ogRunning,  error: ogError }   = useAsyncTask(downloadOG);
  const { run: runICO,  running: icoRunning, error: icoError }  = useAsyncTask(downloadICO);
  const { run: runZIP,  running: zipRunning, error: zipError }  = useAsyncTask(downloadZIPPreset);

  const sizeLimitMB = (MAX_BYTES / (1024 * 1024)).toFixed(0);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* NAV sticky con regreso al Home */}
      <nav className="sticky top-0 z-40 -mx-4 mb-6 border-b bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-700 hover:text-indigo-600">← Inicio</Link>
          <img src="/logo-if.svg" alt="IconForge" className="h-6 w-6" />
        </div>
      </nav>

      {/* === HEADER STUDIO (ADD) === */}
      <header className="flex flex-col items-center text-center gap-4 mb-8">
        <img src="/logo-if.svg" alt="IconForge" width="72" height="72" />
        <h1 className="font-display text-3xl">IconForge Studio</h1>
        <p className="max-w-2xl text-slate-600">
          Sube tu logo y descarga todos los assets listos (PNG, ICO, OG, manifest y ZIP).
        </p>
      </header>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
          IconForge Studio
        </span>
      </h1>
      <p className="text-slate-600">
        Sube tu logo y descarga todos los assets listos (PNG, ICO, OG, manifest y ZIP).
      </p>

      {/* INPUT más visible/CTA */}
      <section className="rounded-2xl border bg-white shadow-sm p-4 mt-6">
        <label className="block text-sm font-medium mb-2">
          1) Logo (SVG/PNG/JPG) — máx. {sizeLimitMB} MB
        </label>

        <div className="relative">
          <input
            id="filepicker"
            type="file"
            accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
            onChange={onPick}
            className="sr-only"
          />
          <label
            htmlFor="filepicker"
            className="flex items-center justify-between gap-3 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-4 hover:bg-slate-100 cursor-pointer transition"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-slate-800">Seleccionar archivo</p>
              <p className="text-xs text-slate-500">Arrastra y suelta o haz click para elegir</p>
            </div>
            <span className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              Elegir
            </span>
          </label>
        </div>

        {uiError ? (
          <p role="alert" className="mt-2 text-xs text-red-600">{uiError}</p>
        ) : null}
        {file && (
          <p className="mt-2 text-xs text-slate-600">
            Cargado: <strong>{file.name}</strong>{busy ? " (procesando…)" : ""}
          </p>
        )}
      </section>

      <section className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border bg-white shadow-sm p-4 space-y-4">
          {/* PRESET principal */}
          <button
            onClick={runZIP}
            disabled={!img || zipRunning}
            aria-busy={zipRunning ? "true" : "false"}
            title="Genera y descarga: icons PNG (16–512), apple-touch-180, OG 1200×630, site.webmanifest y favicon.ico (si el vendor está disponible)."
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 w-full shadow-sm"
          >
            {zipRunning ? <Spinner className="border-white" /> : null}
            {zipRunning ? "Procesando…" : "PWA completo (ZIP)"}
          </button>
          {zipDoneAt && !zipRunning && !zipError ? (
            <p role="status" className="text-xs text-emerald-600">ZIP listo. Revisa tu carpeta de descargas.</p>
          ) : null}

          <h3 className="text-sm font-semibold text-slate-800">Opciones</h3>

          <div className="flex items-center justify-between gap-3">
            <label className="text-sm">Fondo</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBg("transparent")}
                className={`px-2.5 py-1 rounded border text-xs ${bg==="transparent"?"bg-slate-900 text-white":"bg-white"}`}
              >
                Transparente
              </button>
              <input
                type="color"
                value={bg==="transparent" ? "#ffffff" : bg}
                onChange={(e)=>setBg(e.target.value)}
                className="h-8 w-10 border rounded"
                title="Color de fondo"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="text-sm">Maskable 512</label>
            <input type="checkbox" checked={maskable} onChange={(e)=>setMaskable(e.target.checked)} />
          </div>

          <h3 className="text-sm font-semibold text-slate-800 pt-2">Open Graph</h3>
          <input
            value={ogTitle}
            onChange={e=>setOgTitle(e.target.value)}
            className="w-full border rounded px-3 py-1.5 text-sm"
            placeholder="Título"
          />
          <input
            value={ogSubtitle}
            onChange={e=>setOgSubtitle(e.target.value)}
            className="w-full border rounded px-3 py-1.5 text-sm mt-2"
            placeholder="Subtítulo"
          />

          {/* Botón OG con estado */}
          <button
            onClick={runOG}
            disabled={!img || ogRunning}
            aria-busy={ogRunning ? "true" : "false"}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white hover:bg-slate-50 disabled:opacity-50"
          >
            {ogRunning ? <Spinner /> : null}
            {ogRunning ? "Procesando…" : "Descargar OG (1200×630)"}
          </button>
          {ogError ? <p role="alert" className="mt-1 text-xs text-red-600">OG: {ogError.message}</p> : null}

          {/* MINI PREVIEW OG responsiva SIN overflow */}
          <div className="mt-3">
            <label className="block text-xs text-slate-600 mb-1">Vista previa OG</label>
            <OGMiniPreview
              img={img}
              bg={bg}
              title={ogTitle}
              subtitle={ogSubtitle}
            />
          </div>

          <h3 className="text-sm font-semibold text-slate-800 pt-4">Manifest</h3>
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

          <button
            onClick={runICO}
            disabled={!img || icoRunning}
            aria-busy={icoRunning ? "true" : "false"}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white hover:bg-slate-50 disabled:opacity-50 w-full mt-3"
          >
            {icoRunning ? <Spinner /> : null}
            {icoRunning ? "Procesando…" : "Descargar favicon.ico"}
          </button>
          {icoError ? <p role="alert" className="mt-1 text-xs text-red-600">ICO: {icoError.message}</p> : null}

          <button
            onClick={runZIP}
            disabled={!img || zipRunning}
            aria-busy={zipRunning ? "true" : "false"}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50 w-full"
          >
            {zipRunning ? <Spinner /> : null}
            {zipRunning ? "Procesando…" : "Descargar ZIP (todo)"}
          </button>
          {zipError ? <p role="alert" className="mt-1 text-xs text-red-600">ZIP: {zipError.message}</p> : null}

          {previewShots && (
            <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-3">
              <h4 className="text-xs font-semibold text-slate-700">Previews rápidos</h4>
              <div className="grid grid-cols-2 gap-3">
                {previewShots.thumbs.map((thumb) => (
                  <figure key={thumb.label} className="flex flex-col items-center gap-2 rounded-xl bg-white p-2 shadow-sm">
                    <div className="rounded-lg border bg-[conic-gradient(at_top_left,_#f8fafc,_#e2e8f0)] p-3">
                      <img
                        src={thumb.dataUrl}
                        loading="lazy"
                        alt={`Preview ${thumb.label}`}
                        className="h-16 w-16 object-contain"
                        width={thumb.size}
                        height={thumb.size}
                      />
                    </div>
                    <figcaption className="text-[10px] font-medium text-slate-600">{thumb.label}</figcaption>
                  </figure>
                ))}
              </div>

              {previewShots.ogUrl && (
                <div>
                  <p className="mb-1 text-[11px] font-semibold text-slate-700">Open Graph 1200×630</p>
                  <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <img
                      src={previewShots.ogUrl}
                      alt="Preview OG generada"
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

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
                    <button
                      onClick={() => downloadPNG(t)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-white hover:bg-slate-50"
                    >
                      PNG
                    </button>
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

/** Mini preview OG responsiva con checkerboard y SIN overflow */
function OGMiniPreview({ img, bg, title, subtitle }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const isTransparent = bg === "transparent";
  const ASPECT = 1200 / 630;

  useEffect(() => {
    const dst = ref.current;
    const wrap = wrapRef.current;
    if (!dst || !wrap || !img) return;

    const render = () => {
      const cssWidth = wrap.clientWidth;               // ancho disponible en la columna
      const cssHeight = Math.round(cssWidth / ASPECT); // mantener 1200×630
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // limitar para no gastar GPU

      // Canvas físico (mayor para nitidez en pantallas high-DPI)
      dst.width = Math.round(cssWidth * dpr);
      dst.height = Math.round(cssHeight * dpr);

      // Canvas CSS (tamaño visual)
      dst.style.width = cssWidth + "px";
      dst.style.height = cssHeight + "px";

      const ctx = dst.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, dst.width, dst.height);

      const ogBg = isTransparent ? "#ffffff" : bg;
      const src = drawOG({ img, w: 1200, h: 630, bg: ogBg, title, subtitle });

      // Dibujar escalado a resolución física
      ctx.drawImage(src, 0, 0, dst.width, dst.height);
    };

    render();

    // Redibujar al cambiar tamaño del contenedor
    const ro = new ResizeObserver(render);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [img, bg, title, subtitle, isTransparent]);

  return (
    <div className="relative rounded-xl border bg-white p-2 overflow-hidden">
      <div
        ref={wrapRef}
        className={`rounded-lg ${isTransparent ? "bg-[length:16px_16px] bg-[linear-gradient(45deg,rgba(148,163,184,0.18) 25%,transparent 25%),linear-gradient(-45deg,rgba(148,163,184,0.18) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,rgba(148,163,184,0.18) 75%),linear-gradient(-45deg,transparent 75%,rgba(148,163,184,0.18) 75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0]" : "bg-white"}`}
      >
        <canvas
          ref={ref}
          aria-label="Vista previa Open Graph"
          className="block w-full rounded-lg"
        />
      </div>

      {/* badge dimensiones */}
      <span className="absolute right-3 top-3 inline-flex items-center rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
        1200×630
      </span>
    </div>
  );
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
