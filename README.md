# 🛡️ Saad10x TOOL

> A free, modern, privacy-first **cybersecurity toolkit** for the web.
> Scan URLs, detect phishing, audit password strength, and generate cryptographic hashes — all running **100% client-side** in your browser.

![License](https://img.shields.io/badge/license-MIT-00F5D4)
![Next.js](https://img.shields.io/badge/Next.js-15-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8)

---

## ✨ Features

| Tool | What it does |
|------|--------------|
| 🔗 **URL Scanner** | Analyzes URL structure, detects suspicious keywords, shortened links, risky TLDs and IP-based hosts. Returns a 0–100 security score and a `Safe / Suspicious / Malicious` verdict with detailed findings. |
| 🐟 **AI Phishing Detector** | An explainable, AI-style scoring engine that flags fake domains, **typosquatting** (Levenshtein distance), suspicious subdomains, punycode and credential-harvesting indicators. Returns a confidence %, reasons and recommendations. |
| 🔑 **Password Strength Checker** | Real-time entropy analysis with an animated strength meter, crack-time estimate and actionable tips. **Passwords are never stored or transmitted.** |
| #️⃣ **Hash Generator** | Instantly generates **MD5, SHA-1, SHA-256 and SHA-512** with one-click copy. SHA family uses the native Web Crypto API; MD5 is implemented locally. |

### Highlights

- 🎨 Next-generation **SOC-style dashboard** — glassmorphism, cyberpunk neon, dark theme
- 🌌 Animated particle background + smooth Framer Motion transitions
- 📱 Mobile-first, fully responsive, accessibility-friendly
- 🔒 **No backend, no database, no tracking, no analytics** — every computation is local
- 🆓 100% free & open-source (MIT)
- ▲ One-click **Vercel** deployment

---

## 🧱 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + `tailwindcss-animate`
- **Framer Motion**
- **Lucide Icons**
- **ShadCN-style UI** components (local, no external runtime)
- React Hooks
- Vercel-ready

---

## 📁 Project Structure

```
saad10x-tool/
├── app/
│   ├── layout.tsx                 # Root layout (navbar, footer, particles)
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Theme + glassmorphism utilities
│   ├── loading.tsx                # Global loading state
│   ├── not-found.tsx              # Custom 404
│   ├── dashboard/
│   │   └── page.tsx               # Security dashboard
│   └── tools/
│       ├── url-scanner/page.tsx
│       ├── phishing-detector/page.tsx
│       ├── password-checker/page.tsx
│       └── hash-generator/page.tsx
├── components/
│   ├── ui/                        # ShadCN-style primitives (button, card, badge…)
│   ├── layout/                    # Navbar, Footer
│   ├── landing/                   # Hero, Features, Stats, Testimonials
│   ├── tools/                     # Tool UIs + page header
│   ├── particle-background.tsx
│   ├── score-ring.tsx
│   ├── copy-button.tsx
│   └── page-transition.tsx
├── lib/
│   ├── utils.ts                   # cn(), sanitizeInput(), clipboard
│   ├── url-scanner.ts             # URL risk engine
│   ├── phishing.ts                # Phishing detection engine
│   ├── password.ts                # Password entropy analyzer
│   ├── hash.ts                    # MD5 + SHA (Web Crypto)
│   └── tools-meta.ts              # Shared tool catalog
├── tailwind.config.ts
├── next.config.mjs                # Security headers
├── tsconfig.json
├── README.md
├── INSTALLATION.md
└── DEPLOYMENT.md
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

See **[INSTALLATION.md](./INSTALLATION.md)** for detailed setup and
**[DEPLOYMENT.md](./DEPLOYMENT.md)** for deploying free on Vercel.

---

## 🔐 Security & Privacy

- **All inputs are sanitized** (`sanitizeInput`) and never rendered as raw HTML → XSS-safe.
- **No password storage** — passwords stay in component state and are analyzed in-memory only.
- **No network calls** for analysis — URL/phishing/hash logic runs entirely in the browser.
- **No tracking / no analytics / no cookies.**
- Hardened HTTP response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) via `next.config.mjs`.

> ⚠️ **Disclaimer:** The URL Scanner and Phishing Detector use heuristic analysis for educational and triage purposes. They are not a substitute for enterprise threat intelligence. Always exercise caution with unknown links.

---

## 🎨 Color Palette

| Token | Hex |
|-------|-----|
| Background | `#050816` |
| Primary | `#00F5D4` |
| Secondary | `#00B4D8` |
| Accent | `#7B2CBF` |
| Danger | `#FF4D6D` |
| Success | `#06D6A0` |

---

## 📜 License

MIT © Saad Ishaq. Free to use, modify and distribute.
