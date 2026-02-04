const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const inputPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "apps",
  "web",
  "public",
  "logo-if.svg"
);

if (!fs.existsSync(inputPath)) {
  console.error("Smoke test input missing:", inputPath);
  process.exit(1);
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "iconfull-"));

const result = spawnSync(process.execPath, [
  path.resolve(__dirname, "..", "src", "cli.js"),
  "--input",
  inputPath,
  "--out",
  tempDir,
  "--zip"
]);

if (result.status !== 0) {
  console.error(result.stdout.toString());
  console.error(result.stderr.toString());
  process.exit(result.status || 1);
}

const expected = [
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "og-1200x630.png",
  "manifest.webmanifest",
  "iconfull-assets.zip"
];

const missing = expected.filter(
  (file) => !fs.existsSync(path.join(tempDir, file))
);

if (missing.length > 0) {
  console.error("Missing outputs:", missing.join(", "));
  process.exit(1);
}

console.log("ICONFULL CLI smoke test passed.");
