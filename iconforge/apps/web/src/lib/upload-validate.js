// /lib/upload-validate.js
// Validación de archivos de logo: tipo y tamaño (<= 5MB)

export const MAX_BYTES = 5 * 1024 * 1024;
export const ALLOWED_MIME = new Set([
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/jpg",
]);

function extFromName(name = "") {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function detectKind(file) {
  const { type, name = "" } = file || {};
  const ext = extFromName(name);
  if (type === "image/svg+xml" || ext === "svg") return "svg";
  if (type === "image/png" || ext === "png") return "png";
  if (type === "image/jpeg" || type === "image/jpg" || ext === "jpg" || ext === "jpeg") return "jpg";
  return "unknown";
}

/**
 * Valida un único File.
 * @param {File} file
 * @returns {{ ok: boolean, error?: string, kind?: 'svg'|'png'|'jpg' }}
 */
export function validateFile(file) {
  if (!file) return { ok: false, error: "No se seleccionó ningún archivo." };

  const kind = detectKind(file);
  if (kind === "unknown" || (!ALLOWED_MIME.has(file.type) && kind === "unknown")) {
    return {
      ok: false,
      error: "Formato no soportado. Sube un archivo SVG, PNG o JPG.",
    };
  }

  if (file.size > MAX_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      ok: false,
      error: `El archivo pesa ${mb} MB. El límite es 5 MB.`,
    };
  }

  return { ok: true, kind };
}

/**
 * Valida una FileList (input multiple o single) y devuelve el primer error encontrado.
 * @param {FileList|File[]} list
 * @returns {{ ok: boolean, error?: string, files?: File[] }}
 */
export function validateFileList(list) {
  if (!list || list.length === 0) {
    return { ok: false, error: "No se seleccionó ningún archivo." };
  }
  const files = Array.from(list);
  for (const f of files) {
    const res = validateFile(f);
    if (!res.ok) return res;
  }
  return { ok: true, files };
}
