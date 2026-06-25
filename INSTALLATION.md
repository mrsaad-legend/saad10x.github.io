# 🛠️ Installation Guide — Saad10x TOOL

This guide walks you through running **Saad10x TOOL** locally from scratch.

## 1. Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | **18.18+** or **20+** (LTS recommended) |
| npm | 9+ (ships with Node) — or `pnpm` / `yarn` |
| Git | optional, for cloning |

Check your versions:

```bash
node -v
npm -v
```

## 2. Get the code

If you received a ZIP, unzip it and `cd` into the folder:

```bash
unzip saad10x-tool.zip
cd saad10x-tool
```

Or clone from a repository:

```bash
git clone <your-repo-url> saad10x-tool
cd saad10x-tool
```

## 3. Install dependencies

```bash
npm install
```

> Using a different package manager?
> - `pnpm install`
> - `yarn install`

## 4. Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. The app supports hot-reload —
edits appear instantly.

## 5. Production build (optional, local)

```bash
npm run build   # compiles an optimized production build
npm run start   # serves the build at http://localhost:3000
```

## 6. Lint

```bash
npm run lint
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Troubleshooting

- **Port 3000 in use:** run `npm run dev -- -p 3001`.
- **Type errors after editing:** restart your editor's TS server or run `npm run build`.
- **Stale cache:** delete the `.next/` folder and rebuild.
- **Node too old:** upgrade to Node 18.18+ / 20+ (e.g. via `nvm install 20`).

That's it — no environment variables, no database, no API keys required. 🎉
