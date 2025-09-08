// Wrapper para generar favicon.ico en el navegador con PNG2ICOjs (vendor)
// Necesita: src/lib/vendor/png2icojs.js (GPL-3.0)
export async function pngsToIco(blobs /* Array<Blob PNG> */) {
  try {
    const { PngIcoConverter } = await import("@/lib/vendor/png2icojs");
    const arrays = await Promise.all(blobs.map(b => b.arrayBuffer()));
    const pngs = arrays.map(buf => new Uint8Array(buf));
    const icoUint8 = PngIcoConverter.convert(pngs); // returns Uint8Array
    return new Blob([icoUint8], { type: "image/x-icon" });
  } catch (e) {
    console.warn("png2icojs (vendor) no encontrado. Añade src/lib/vendor/png2icojs.js", e);
    return null;
  }
}
