# ICONFULL

ICONFULL is a monorepo that ships a Next.js demo app and the `iconfull` CLI for generating app icons from a single input image.

## Repo structure

```
apps/web        # Next.js demo application
packages/cli    # iconfull CLI (npm package, includes processing logic)
```

## Requirements

- Node.js >= 18
- npm workspaces

## Scripts

- `npm run dev:web` — run the Next.js demo app
- `npm run build:web` — build the Next.js demo app
- `npm run build:cli` — run the CLI build step
- `npm run test:cli` — smoke test the CLI

## iconfull CLI quickstart

```bash
npm install -g iconfull
iconfull --input ./logo.png --out ./dist --zip
```

For full CLI documentation, see `packages/cli/README.md`.
