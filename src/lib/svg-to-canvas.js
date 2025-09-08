import { Canvg } from "canvg";

export async function rasterizeSvgToImage(svgText, sizeHint = 1024) {
  const c = document.createElement("canvas");
  c.width = sizeHint; c.height = sizeHint;
  const ctx = c.getContext("2d");
  const v = Canvg.fromString(ctx, svgText, { enableRedraw: false });
  await v.render();
  const dataUrl = c.toDataURL("image/png");
  return new Promise((resolve, reject) => {
    const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = dataUrl;
  });
}
