// Wrapper para generar favicon.ico en el navegador con PngIcoConverter (vendor)
// Requiere: /lib/vendor/png2icojs.js que exporta { PngIcoConverter }
// Uso: const ico = await pngsToIco([blob16, blob32]); if (ico) downloadBlob(ico, "favicon.ico")

export async function pngsToIco(blobs /* Array<Blob | ArrayBuffer> */) {
  try {
    if (!Array.isArray(blobs) || blobs.length === 0) {
      throw new Error("NO_INPUT");
    }

    // Import dinámico para evitar cargar el vendor si no se usa
    const { PngIcoConverter } = await import("@/lib/vendor/png2icojs");

    // El vendor espera objetos { png: Blob|ArrayBuffer }
    const inputs = await Promise.all(
      blobs.map(async (b) => {
        if (b instanceof Blob) return { png: b };
        // Si llegara un ArrayBuffer/TypedArray, lo normalizamos a Blob PNG
        const buf = b instanceof ArrayBuffer ? b : b.buffer ?? b;
        return { png: new Blob([buf], { type: "image/png" }) };
      })
    );

    const converter = new PngIcoConverter();
    // Devuelve un Blob "image/x-icon"
    const icoBlob = await converter.convertToBlobAsync(inputs, "image/x-icon");
    return icoBlob;
  } catch (e) {
    console.warn("pngsToIco: error generando favicon.ico (¿vendor presente?)", e);
    return null; // La UI ya muestra alerta si es null
  }
}
