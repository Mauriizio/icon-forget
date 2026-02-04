import { downloadZip } from "client-zip";

export async function zipAndDownload(files /* Array<{name, input, lastModified?}> */, zipName = "iconfull-assets.zip") {
  const blob = await downloadZip(files).blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
