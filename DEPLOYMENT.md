# ▲ Deployment Guide — Saad10x TOOL

**Saad10x TOOL** is a static-friendly Next.js 15 app with **no backend, no
database and no environment variables**, so it deploys for **free** on Vercel
(and most other hosts) in minutes.

---

## Option A — Deploy on Vercel (recommended)

### A1. Via the Vercel Dashboard (no CLI)

1. Push the project to a GitHub / GitLab / Bitbucket repository.
2. Go to **https://vercel.com/new**.
3. **Import** your repository.
4. Vercel auto-detects **Next.js** — leave the defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **Deploy**. Done — you'll get a live `*.vercel.app` URL. 🎉

No environment variables are needed.

### A2. Via the Vercel CLI

```bash
# Install the CLI once
npm i -g vercel

# From the project root
vercel            # preview deployment (follow the prompts)
vercel --prod     # production deployment
```

---

## Option B — Other platforms

Because the app is a standard Next.js project, it also runs on:

| Platform | Notes |
|----------|-------|
| **Netlify** | Use the official Next.js runtime; build `next build`. |
| **Cloudflare Pages** | Framework preset: Next.js. |
| **Render / Railway** | Node service: build `npm run build`, start `npm run start`. |
| **Docker / self-host** | `npm run build && npm run start` behind any reverse proxy. |

### Self-host quick start

```bash
npm install
npm run build
npm run start   # listens on port 3000
```

---

## Production Checklist

- [x] `npm run build` completes with no errors
- [x] No environment variables required
- [x] Security headers configured in `next.config.mjs`
- [x] No external API keys or paid services
- [x] All analysis runs client-side (privacy preserved in production)

---

## Custom Domain (Vercel)

1. Open your project → **Settings → Domains**.
2. Add your domain and follow the DNS instructions.
3. Vercel provisions HTTPS automatically.

---

That's all — push, import, deploy. Your premium cybersecurity toolkit is live
and **free**. ▲
