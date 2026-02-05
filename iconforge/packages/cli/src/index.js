const fs = require("fs/promises");
const path = require("path");
const { createWriteStream } = require("fs");
const sharp = require("sharp");
const pngToIco = require("png-to-ico");
const archiver = require("archiver");

const ICON_SPECS = [
  { names: ["favicon-16x16.png"], size: 16 },
  { names: ["favicon-32x32.png"], size: 32 },
  { names: ["apple-touch-icon.png"], size: 180 },
  { names: ["icon-192.png", "android-chrome-192x192.png"], size: 192 },
  { names: ["icon-256.png"], size: 256 },
  { names: ["icon-384.png"], size: 384 },
  { names: ["icon-512.png", "android-chrome-512x512.png"], size: 512 }
];

const OG_SPEC = { name: "og-1200x630.png", width: 1200, height: 630 };

function sharpOptionsForInput(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (ext === ".svg") {
    return { density: 300 };
  }
  return {};
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function renderIcon(inputPath, outputPath, size) {
  const options = sharpOptionsForInput(inputPath);
  await sharp(inputPath, options)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(outputPath);
}

async function renderOgImage(inputPath, outputPath) {
  const options = sharpOptionsForInput(inputPath);
  await sharp(inputPath, options)
    .resize(OG_SPEC.width, OG_SPEC.height, {
      fit: "cover",
      position: "center"
    })
    .png()
    .toFile(outputPath);
}

async function generateFaviconIco(inputPath, outputDir) {
  const options = sharpOptionsForInput(inputPath);
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map((size) =>
      sharp(inputPath, options)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer()
    )
  );
  const icoBuffer = await pngToIco(buffers);
  const icoPath = path.join(outputDir, "favicon.ico");
  await fs.writeFile(icoPath, icoBuffer);
  return icoPath;
}

function buildManifest() {
  return {
    name: "IconFull",
    short_name: "IconFull",
    description: "Assets generated with IconFull",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b0b0b",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}

async function writeManifest(outputDir) {
  const manifestPath = path.join(outputDir, "manifest.webmanifest");
  const manifest = buildManifest();
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  return manifestPath;
}

async function zipOutput(outputDir) {
  const zipPath = path.join(outputDir, "iconfull-assets.zip");
  await new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(output);
    archive.glob("**/*", {
      cwd: outputDir,
      ignore: ["iconfull-assets.zip"]
    });
    archive.finalize();
  });

  return zipPath;
}

async function generateAssets({ inputPath, outputDir, zip }) {
  await ensureDir(outputDir);

  const files = [];

  for (const spec of ICON_SPECS) {
    const firstOutputPath = path.join(outputDir, spec.names[0]);
    await renderIcon(inputPath, firstOutputPath, spec.size);
    files.push(firstOutputPath);

    for (const aliasName of spec.names.slice(1)) {
      const aliasPath = path.join(outputDir, aliasName);
      await fs.copyFile(firstOutputPath, aliasPath);
      files.push(aliasPath);
    }
  }

  const ogPath = path.join(outputDir, OG_SPEC.name);
  await renderOgImage(inputPath, ogPath);
  files.push(ogPath);

  const icoPath = await generateFaviconIco(inputPath, outputDir);
  files.push(icoPath);

  const manifestPath = await writeManifest(outputDir);
  files.push(manifestPath);

  let zipPath = null;
  if (zip) {
    zipPath = await zipOutput(outputDir);
  }

  return { files, zipPath };
}

module.exports = {
  generateAssets,
  buildManifest
};
