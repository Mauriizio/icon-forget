# iconfull CLI

Generate all required app icon assets from a single image.

## Installation

```bash
npm install -g iconfull
```

Or run with npx:

```bash
npx iconfull --input ./logo.png --out ./dist --zip
```

> `iconfull` is self-contained; no extra core package install is required.

## Usage

```bash
iconfull --input ./logo.png --out ./dist --zip
```

### Options

- `--input <path>` (required): PNG, JPG, or SVG input image.
- `--out <dir>` (required): Output directory for generated assets.
- `--zip`: Bundle outputs into `iconfull-assets.zip`.

## Outputs

- `favicon.ico` (16, 32, 48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `og-1200x630.png`
- `manifest.webmanifest`
