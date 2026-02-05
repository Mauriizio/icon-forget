# IconFull Web

**Generate a complete app icon pack from a single image — in seconds.**

IconFull Web is a browser-based icon generation studio built with Next.js that creates production-ready icon assets for websites, PWAs, and apps.

Upload one image → get the full icon ecosystem.

---

## 🌐 Web App

Use IconFull directly in your browser:

https://icon-full.vercel.app/

No installation required.

---

## ✨ What problem does this solve?

Creating favicons and platform-specific icons manually is painful:

- Dozens of sizes to export
- Strict naming conventions
- PWA + social preview requirements
- Easy to forget assets and break production

IconFull automates the entire pipeline from a single source image.

---

## 🚀 What you get from one image

IconFull generates a ready-to-ship icon pack including:

| Asset | Purpose |
|---|---|
| `favicon.ico` | Legacy browser support |
| `favicon-16x16.png` | Small browser tab icon |
| `favicon-32x32.png` | Standard favicon |
| `apple-touch-icon.png` | iOS home screen icon |
| `android-chrome-192x192.png` | Android / PWA icon |
| `android-chrome-512x512.png` | PWA install icon |
| `og-1200x630.png` | Social share preview |
| `manifest.webmanifest` | PWA manifest ready |

All assets come correctly sized, named, and structured.

---

## 🧠 Why use IconFull?

**Fast workflow**  
Go from a single image to production-ready assets in under a minute.

**Privacy-first**  
Processing happens in the browser flow — your files stay under your control.

**Standardized output**  
Correct sizes and naming for modern web and PWA requirements.

**Perfect for iteration**  
Test branding changes instantly before opening design tools.

---

## 💻 CLI for developers

Prefer terminal workflows? IconFull also ships with an official CLI.

### Install globally

```bash
npm install -g iconfull
```

### Or run with npx

```bash
npx iconfull --input ./logo.png --out ./dist --zip
```

The CLI is self-contained. No extra core package installation is required.

---

## ⚙️ CLI Usage

```bash
iconfull --input ./logo.png --out ./dist --zip
```

### Options

| Option | Description |
|---|---|
| `--input <path>` | **Required.** PNG, JPG, or SVG source image |
| `--out <dir>` | **Required.** Output directory |
| `--zip` | Bundle generated assets into `iconfull-assets.zip` |

---

## 📦 Example output structure

```
dist/
├─ favicon.ico
├─ favicon-16x16.png
├─ favicon-32x32.png
├─ apple-touch-icon.png
├─ android-chrome-192x192.png
├─ android-chrome-512x512.png
├─ og-1200x630.png
└─ manifest.webmanifest
```

---

## 🧪 Run the web app locally

```bash
npm install
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

---

## 🎯 Typical use cases

- Launching a new SaaS or startup
- Preparing PWA assets quickly
- Refreshing branding without manual exports
- Generating OG/social preview images
- Automating favicon pipelines in CI/CD

---

## 🤝 Support

Need help or have questions?

Contact details available at:  
https://maurizio.dev

---

## 👨‍💻 Author

Built by **Maurizio Caballero**
