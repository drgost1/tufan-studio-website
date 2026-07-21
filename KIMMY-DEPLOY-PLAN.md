# Tufan Studio Website — Update + Migrate to yopekka VPS @ tufanstudio.net

Handoff plan for Kimmy. Verified against the live servers on **2026-07-21** — every fact below was checked, not assumed. Work top to bottom; each phase ends in a committed, revertable state. Delete this file when the migration is done.

---

## 0. Current state (verified)

| Thing | State |
|---|---|
| Local repo | `ALL_WEBSITES\clvps1\tufan-studio-website`, branch `master` @ `553b405`, clean, pushed |
| GitHub | `https://github.com/drgost1/tufan-studio-website` (origin) |
| Stack | Next.js **16.2.1** + React 19.2.4, Tailwind v4, GSAP + Framer Motion, TypeScript. Single-page app (`src/app/page.tsx` + ~16 components), no API routes, no DB |
| Current hosting | clvps1 (217.217.253.236) — **IP preview only**: nginx listens on `:8008` → proxies `127.0.0.1:3069`, systemd unit `tufan-studio.service` runs `bun run start -- -p 3069` as user `claude` from `/var/www/tufan-studio-website`. No domain, no SSL |
| tufanstudio.net DNS | Registered, nameservers on **Cloudflare** (`cecelia`/`evan.ns.cloudflare.com`). **NO A record exists yet**; `www` is NXDOMAIN. Nothing to break — clean cutover |
| Target VPS | `yopekka` = **147.93.158.12**, root, key `~/.ssh/id_yopekka` (alias in `~/.ssh/config`). Ubuntu, nginx 1.24, **node v22.22.2 + npm 10.9.7 — NO bun on this server**, certbot installed, pm2 + several bots running. Port **3000 is TAKEN** (site-auditor render sidecar). Port **3069 is free**. 5.6 GB RAM free, 72 GB disk free |

### Known problems the update must fix
1. `src/app/layout.tsx:27` — `metadataBase: new URL("http://217.217.253.236:6900")` → stale IP **and** wrong port. Must become `https://tufanstudio.net`.
2. OG/Twitter cards use `/logo.png` (512×512) while a proper `public/images/og-banner.png` already exists unused.
3. No `robots.ts` / `sitemap.ts` — fine for an IP preview, not for a real domain launch.
4. Leftover Next starter junk in `public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — delete.

---

## ⚠️ Rules of engagement (read before touching anything)

- **Local machine uses bun** (`bun install`, `bun run build`). **Server uses npm only** — bun is not installed on yopekka and we don't install it (matches how yopekka.com itself is deployed).
- The repo has **`bun.lock` only, no `package-lock.json`** → on the server use `npm install`, **never `npm ci`** (it will fail without a lockfile).
- `AGENTS.md` in the repo warns: **Next 16 has breaking changes vs training data.** Before editing any app code, read the relevant guide in `node_modules/next/dist/docs/`.
- Do **not** switch to static export (`output: 'export'`) in this migration — keep the `next start` runtime exactly like the current setup. One change at a time.
- clvps1 stays untouched and running until Phase 6 — it IS the rollback.

---

## Phase 1 — Local update pass

Work in `ALL_WEBSITES\clvps1\tufan-studio-website` on `master` (or a `launch/tufanstudio-net` branch if you prefer; merge before Phase 2).

1. **Fix metadata** in `src/app/layout.tsx`:
   - `metadataBase: new URL("https://tufanstudio.net")`
   - `openGraph.url: "https://tufanstudio.net"`, `openGraph.images` → `/images/og-banner.png` (set real width/height — check the file, likely 1200×630)
   - `twitter.card: "summary_large_image"`, `twitter.images` → `/images/og-banner.png`
   - Add `alternates: { canonical: "/" }`
2. **Add metadata routes** (Next 16 app-router conventions — check `node_modules/next/dist/docs/` first):
   - `src/app/robots.ts` — allow all, point to sitemap
   - `src/app/sitemap.ts` — single entry `https://tufanstudio.net`
3. **Delete starter junk**: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.
4. **Dep refresh (patch-level only)**: `bun update` — stay within existing semver ranges. **No major bumps** in this migration.
5. **GREEN gate (mandatory before anything ships)**:
   ```powershell
   bun install
   bun run lint
   bun run build          # must pass clean
   bun run start          # smoke: open http://localhost:3000 — hero, particles, music player, all sections render, console clean
   ```
6. Commit + push:
   ```powershell
   git add -A
   git commit -m "Point metadata at tufanstudio.net, add robots+sitemap, use OG banner"
   git push origin master
   ```

> If Nafis also wants **content** changes (new team members, portfolio items, copy), get the list from him first — this plan only covers the launch-readiness update. Nothing in the phases below depends on content, so it can also ship later.

---

## Phase 2 — Provision on yopekka

SSH: `ssh yopekka` (root).

1. **Clone + build** (npm, not bun — see rules):
   ```bash
   git clone https://github.com/drgost1/tufan-studio-website.git /var/www/tufanstudio.net
   cd /var/www/tufanstudio.net
   npm install --no-audit --no-fund     # NOT npm ci — repo has no package-lock.json
   npm run build                        # must pass on the server too
   ```
   (`npm install` creates a server-local `package-lock.json`; it's untracked and won't block future `git pull` — leave it.)
2. **Systemd unit** — `/etc/systemd/system/tufan-studio.service` on yopekka:
   ```ini
   [Unit]
   Description=Tufan Studio Website (tufanstudio.net)
   After=network.target

   [Service]
   Type=simple
   WorkingDirectory=/var/www/tufanstudio.net
   ExecStart=/usr/bin/npm start -- -p 3069
   Restart=always
   RestartSec=5
   Environment=NODE_ENV=production

   [Install]
   WantedBy=multi-user.target
   ```
   Root-run matches every other service on this box (pm2-root, discord bots). Port **3069** (verified free; do NOT use 3000 — taken).
   ```bash
   systemctl daemon-reload
   systemctl enable --now tufan-studio.service
   systemctl status tufan-studio.service         # active (running)
   curl -sI http://127.0.0.1:3069 | head -1      # HTTP/1.1 200 OK
   ```
3. **Nginx vhost** — `/etc/nginx/sites-available/tufanstudio.net.conf`:
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name tufanstudio.net www.tufanstudio.net;

       location / {
           proxy_pass http://127.0.0.1:3069;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   ```bash
   ln -s /etc/nginx/sites-available/tufanstudio.net.conf /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   ```

---

## Phase 3 — Cloudflare DNS

In Nafis's Cloudflare account (ask him if you don't have access), zone `tufanstudio.net`:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `147.93.158.12` | **DNS only (grey cloud)** for now |
| CNAME | `www` | `tufanstudio.net` | **DNS only (grey cloud)** for now |

Grey-cloud first so certbot's HTTP-01 validation hits the VPS directly. Verify propagation before Phase 4:
```bash
dig +short tufanstudio.net @1.1.1.1     # → 147.93.158.12
```

---

## Phase 4 — SSL

On yopekka (certbot already installed, renew timer already active for other certs):
```bash
certbot --nginx -d tufanstudio.net -d www.tufanstudio.net --redirect -m dr.gost5@gmail.com --agree-tos -n
nginx -t && systemctl reload nginx
curl -sI https://tufanstudio.net | head -1    # HTTP/2 200
```

**Optional afterwards**: flip both Cloudflare records to proxied (orange cloud) for CDN/DDoS. If you do, set zone SSL mode to **Full (strict)** — never Flexible (redirect loop against certbot's HTTP→HTTPS redirect). Grey cloud is also perfectly fine to keep; that's how most factory sites run.

---

## Phase 5 — Verify live (definition of GREEN, post-deploy)

1. `https://tufanstudio.net` and `https://www.tufanstudio.net` → 200, valid cert, http→https redirect works.
2. Smoke-drive in a real browser at **390 / 768 / 1440** widths: loading screen, hero + particle canvas, marquee, portfolio, team, contact, music player — no horizontal overflow, **console clean**.
3. View source: `og:image` → `https://tufanstudio.net/images/og-banner.png`, canonical correct, no `217.217.253.236` anywhere.
4. `https://tufanstudio.net/robots.txt` and `/sitemap.xml` → 200.
5. `systemctl status tufan-studio.service` still `active (running)` after a reboot-safe check (`systemctl is-enabled` → `enabled`).

---

## Phase 6 — Decommission the clvps1 preview (only after Phase 5 passes)

On clvps1 (`ssh clvps1`):
```bash
systemctl disable --now tufan-studio.service
rm /etc/systemd/system/tufan-studio.service
rm /etc/nginx/sites-enabled/tufan-studio.conf     # the :8008 preview vhost
nginx -t && systemctl reload nginx
# Keep /var/www/tufan-studio-website for ~1 week as a safety copy, then delete.
```

Locally, move the project folder to match the VPS convention (`ALL_WEBSITES\<VPS>\<domain>`):
```powershell
Move-Item "C:\Users\drgos_5ax3dfg\Desktop\ALL_WEBSITES\clvps1\tufan-studio-website" "C:\Users\drgos_5ax3dfg\Desktop\ALL_WEBSITES\yopekka-vps\tufanstudio.net"
```
(The untracked `.codegraph\` folder just moves along — fine.)

Then tell Nafis it's live (success or failure — either way).

---

## Rollback

- **Before Phase 6**: nothing to roll back — clvps1 preview is untouched and DNS didn't exist before, so there is no "old live site" to lose.
- **After Phase 6**: `git log` on the VPS gives the prior commit; `git checkout <sha> && npm install && npm run build && systemctl restart tufan-studio.service` reverts the app. DNS/nginx/cert stay as-is.
- **App down, need it up NOW**: `systemctl restart tufan-studio.service`, check `journalctl -u tufan-studio.service -n 50`.

## Future deploys (once live)

```bash
# local: commit + push (bun for everything local)
ssh yopekka "cd /var/www/tufanstudio.net && git pull && npm install --no-audit --no-fund && npm run build && systemctl restart tufan-studio.service"
```
No FPM/OPcache steps — this is a Node service, restart is the whole story.
