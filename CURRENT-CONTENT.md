# Tufan Studio Website — Current Content Inventory (extracted 2026-07-21)

Everything the live site currently says, pulled straight from the code. Almost all content lives in **`src/lib/constants.ts`** — edit there and it updates everywhere. Section copy that's hardcoded in components is marked with its file.

Mark your changes inline (✏️) and hand this to Kimmy with KIMMY-DEPLOY-PLAN.md.

---

## Brand (`src/lib/constants.ts` → `BRAND`)
| Field | Current value |
|---|---|
| Name | Tufan Studio |
| Tagline | We Are The Storm |
| Description | Game development, cinematics, graphic design, and digital experiences — crafted with the force of a storm. |

## Navigation (`NAV_LINKS`)
Services · Portfolio · About · Team · Contact (single-page anchors)

## Hero (`src/components/Hero.tsx`)
- Kitsune logo + glitch title **"TUFAN STUDIO"** + tagline **"WE ARE THE STORM"**
- Background: `/images/hero-bg.png`, particle canvas
- Bottom marquee (`src/components/Marquee.tsx`): FIVEM SERVERS · FIVEM SCRIPTS · GTA V CINEMATICS · WEBSITES · 3D MODELING · LEVEL DESIGN · GAME DEVELOPMENT · COMMUNITY MANAGEMENT

## Services (`SERVICES`) — 4 cards
| Title | Description |
|---|---|
| FiveM Servers | Full server setup, management, optimization, and infrastructure — built to handle any load. |
| FiveM Scripts | Custom scripts and resources that hit the market. **10+ sales without any marketing.** |
| GTA V Cinematics | Cinematic videos with GTA V-style production quality and ancient cinema aesthetics. |
| Websites | High-end web development — from portfolio sites to full-stack applications. |

## Portfolio (`PORTFOLIO_ITEMS`) — 5 cards
| Title | Category | Description | Link | Status |
|---|---|---|---|---|
| FiveM Server Management | FiveM | Full-stack server management and infrastructure solutions | tufanstudio.tebex.io | Live |
| FiveM Server Development | FiveM | Custom scripts, resources, and server development | tufanstudio.tebex.io | Live |
| Cinematic Videos | Cinematics | GTA V-style and ancient cinema video productions | youtube.com/@tufanstudio_ts | Live |
| Next Creation | Coming Soon | Something massive is brewing in the storm | — | Coming Soon |
| The Untold | Coming Soon | Stay tuned for the next chapter | — | Coming Soon |

## About (`src/components/About.tsx` — hardcoded copy)
- Heading: **THE STORM BEHIND THE SCREENS**
- Para 1: "Tufan Studio isn't just a studio — it's a force. We craft games, cinematics, and digital experiences that hit different."
- Para 2: "From GTA V-style cinematics to beast-level FiveM servers, from scripts that sell themselves to communities that thrive — we build what others talk about."
- Para 3: "Small team. Big storms. No limits."

## Stats (`STATS` — animated counters)
| Label | Value |
|---|---|
| Projects Delivered | 15+ |
| Scripts Sold | 10+ |
| Communities Built | 5+ |
| Lines of Code | 50K+ |

## Team (`TEAM_MEMBERS`) — 5 members
| Name | Username | AKA | Role | Tags |
|---|---|---|---|---|
| Nafis Iqbal | DRgost1 | Obai ZORO | Founder | Full-Stack Developer, Animator, Administrator |
| Nayeem Hossain | alhossain | LiQuid Gaming | Co-Founder | 3D Modeler / 3D Artist, Video Editor, Administrator |
| Foysal Ahmed | .bugfire | Mukhosh | Owner | Level Designer, Administrator |
| Humaira | mild2004 | Kanao / Mitsuri | 3D Developer | 3D Modeler, AI Artist, Beginner, Beta Tester, Level Designer, Administrator |
| Fariza | peekab0w0 | Peekab0w0 | Community Manager | Beta Tester, Game Administrator, Discord Administrator |

## Contact section (`src/components/Contact.tsx` — hardcoded copy)
- Heading: **JOIN THE STORM**
- Copy: "Ready to create something extraordinary? Jump into our Discord — that's where the storm begins."
- CTA button: **Join Our Discord**
- Footer: © {year} Tufan Studio. All rights reserved. / WE ARE THE STORM

## Social links (`SOCIALS`)
| Platform | URL |
|---|---|
| Discord | https://discord.gg/tufanstudio |
| YouTube | https://youtube.com/@tufanstudio_ts |
| Tebex store | https://tufanstudio.tebex.io/ |

## SEO / Metadata (`src/app/layout.tsx`)
- Title: **Tufan Studio | We Are The Storm** (template: `%s | Tufan Studio`)
- Description: "Tufan Studio is a game development and digital services studio. We build FiveM servers, create GTA V-style cinematics, develop market-ready scripts, and craft high-end websites. We are the storm."
- Keywords: Tufan Studio, game development, FiveM server, FiveM scripts, GTA V cinematics, Roblox game development, web development, game server management, gaming community, 3D modeling, level design, graphic design, digital studio
- OG/Twitter image: `/logo.png` (512×512) — ⚠️ plan already switches this to `/images/og-banner.png`
- `metadataBase`: `http://217.217.253.236:6900` — ⚠️ plan already fixes this to `https://tufanstudio.net`

## Extras
- Background music: `public/music/track1.mp3`, opt-in prompt "Enable Background Music?" with a mini player (play/next/volume)
- Fonts: Bebas Neue (headings, local woff2) + Inter (body)
- VFX: loading screen, custom cursor, floating embers, 20-formation particle system, scroll progress arrow, storm-red (#E63946) on black/light alternating sections
