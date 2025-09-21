export function drawToCanvas({ img, size, padding = 0.06, bg = "transparent" }) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  c.width = size; c.height = size;

  if (bg !== "transparent") { ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size); }
  else { ctx.clearRect(0, 0, size, size); }

  const pad = Math.max(0, Math.min(size / 2, Math.floor(size * padding)));
  const drawW = size - pad * 2, drawH = size - pad * 2;
  const ratio = Math.min(drawW / img.width, drawH / img.height);
  const w = Math.round(img.width * ratio), h = Math.round(img.height * ratio);
  const x = Math.floor((size - w) / 2), y = Math.floor((size - h) / 2);

  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, x, y, w, h);
  return c;
}

export function drawOG({ img, w = 1200, h = 630, bg = "#ffffff", title, subtitle }) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  c.width = w; c.height = h;

  ctx.fillStyle = bg || "#ffffff";
  ctx.fillRect(0, 0, w, h);

  const margin = Math.round(Math.min(w, h) * 0.08);

  const targetH = Math.round(h * 0.5);
  const ratio = targetH / img.height;
  const lw = Math.round(img.width * ratio);
  const lh = targetH;
  const lx = margin;
  const ly = Math.round((h - lh) / 2);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, lx, ly, lw, lh);

  const tx = lx + lw + margin;
  let ty = ly;

  ctx.fillStyle = "#0f172a"; // slate-900
  ctx.font = `700 ${Math.round(h * 0.08)}px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial`;
  ctx.textBaseline = "top";
  if (title) { ty += wrapText(ctx, title, tx, ty, w - tx - margin, Math.round(h * 0.11)); }

  ctx.fillStyle = "#334155"; // slate-600
  ctx.font = `500 ${Math.round(h * 0.045)}px system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial`;
  if (subtitle) { wrapText(ctx, subtitle, tx, ty + Math.round(h * 0.04), w - tx - margin, Math.round(h * 0.06)); }

  return c;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(/\s+/);
  let line = "", yy = y;
  for (let n = 0; n < words.length; n++) {
    const test = line ? line + " " + words[n] : words[n];
    if (ctx.measureText(test).width > maxWidth && n > 0) {
      ctx.fillText(line, x, yy);
      line = words[n];
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
  return yy;
}

export function blobFromCanvas(canvas, type = "image/png", quality) {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
