# 🚀 TeamSync AI — Cloudflare Pages Deployment Guide

TeamSync AI is optimized for fast global edge deployment on **Cloudflare Pages**.

---

## ⚡ Method 1: Git Integration (Recommended)

1. Push this repository to **GitHub** or **GitLab**.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set the following build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Build output directory**: `frontend/dist`
   - **Root directory**: `/` (or leave empty)
5. **Environment Variables** (Optional):
   - `VITE_API_URL`: Your hosted backend API URL (e.g. `https://api.yourdomain.com` or Render/Railway/Fly.io URL). If not set, it defaults to the local backend during development and falls back gracefully.
6. Click **Save and Deploy**. Cloudflare will build and publish your site with a free `*.pages.dev` domain and automatic SSL!

---

## 📦 Method 2: Direct CLI Deployment (Wrangler)

If you have Cloudflare Wrangler installed:

```bash
# 1. Build the production assets
cd frontend
npm install
npm run build

# 2. Deploy directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=teamsync-ai
```

Or from the project root:
```bash
npm run deploy
```

---

## 🌐 Method 3: Drag & Drop (Direct Upload)

1. Run the build command locally:
   ```bash
   cd frontend
   npm run build
   ```
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
3. Drag and drop the `frontend/dist` folder.
4. Set project name to `teamsync-ai` and click **Deploy site**.

---

## ⚙️ Included Cloudflare Configurations

- `frontend/public/_redirects`: Configures Single-Page Application (SPA) client-side routing so URLs like `/dashboard`, `/projects`, `/workspace`, `/messages`, and `/profile` don't trigger 404s on page refresh.
- `frontend/public/_headers`: Enforces strict security headers (HSTS, X-Frame-Options, No-Sniff) and enables 1-year immutable caching for static assets on Cloudflare's CDN.
- `wrangler.toml`: Preconfigured Wrangler settings for one-command deployment.
