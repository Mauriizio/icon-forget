#!/usr/bin/env node

const path = require("path");
const fs = require("fs/promises");
const { program } = require("commander");
const { generateAssets } = require("iconfull-core");

function logStep(message) {
  console.log(`\n${message}`);
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

function assertSupportedInput(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const supported = new Set([".png", ".jpg", ".jpeg", ".svg"]);
  if (!supported.has(ext)) {
    throw new Error(
      `Unsupported input format: ${ext || "(none)"}. Use PNG, JPG, or SVG.`
    );
  }
}

async function run() {
  program
    .name("iconfull")
    .description("Generate icon assets and manifests from a single image.")
    .requiredOption("-i, --input <path>", "Input image path (PNG, JPG, or SVG)")
    .requiredOption("-o, --out <dir>", "Output directory")
    .option("--zip", "Bundle assets into iconfull-assets.zip", false)
    .parse(process.argv);

  const options = program.opts();
  const inputPath = path.resolve(options.input);
  const outputDir = path.resolve(options.out);

  assertSupportedInput(inputPath);

  if (!(await fileExists(inputPath))) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  logStep("ICONFULL — generating assets");
  console.log(`Input: ${inputPath}`);
  console.log(`Output: ${outputDir}`);

  const { files, zipPath } = await generateAssets({
    inputPath,
    outputDir,
    zip: Boolean(options.zip)
  });

  logStep("Assets created");
  files.forEach((file) => console.log(`- ${path.relative(process.cwd(), file)}`));

  if (zipPath) {
    logStep("ZIP bundle created");
    console.log(`- ${path.relative(process.cwd(), zipPath)}`);
  }

  logStep("All done!");
}

run().catch((error) => {
  console.error("\nICONFULL failed to generate assets.");
  console.error(error.message || error);
  process.exit(1);
});
