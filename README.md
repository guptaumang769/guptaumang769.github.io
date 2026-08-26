# portfolio-site

Umang Gupta's personal portfolio — a single-page **React 19 + Vite 6 +
TypeScript** static site with a designed, "product-y" look: a **deep navy →
purple gradient hero panel** with a faint grid, a mono/geometric display
headline with a colored `{brace}` accent ("Backend + Agentic AI, built to
`{ship}`"), a rotating role subtitle, count-up **stat tiles**, animated
**Core stack** skill bars, softer gradient project cards, and a **light/dark
toggle** (persisted in `localStorage`). Animated with **Framer Motion**.

Sections: a sticky blur-on-scroll nav, the gradient hero, a count-up stat-tile
row (9 projects · 3 AI systems · 18 concept guides · 40+ services/datastores —
all real numbers), interactive filter tabs
(All / Microservices / Agentic AI / Real-time / Fundamentals) that animate cards
in and out, project cards that open an **animated detail modal** (problem /
approach / tech / links, closes on Esc or backdrop click), a dedicated Agentic
AI section, a **Core stack** section with skill bars that animate on
scroll-into-view (relative emphasis, not fake percentages), an About section,
and a footer. Section content reveals on scroll.

Makes no backend calls — it deploys straight to GitHub Pages. All motion
respects `prefers-reduced-motion` (bars, reveals, and the typewriter fall back
to static).

## Requirements

Requires **Node 24** (see `engines` in `package.json`). React 19 / Vite 6 is the
verified target. On older Node (e.g. Node 18) `npm install` prints a harmless
`EBADENGINE` warning for this package; the build itself has been verified to
still pass on Node 18 on this machine, but Node 24 is the supported runtime and
the CI workflow builds on Node 24.

Stack: React `^19`, react-dom `^19`, Vite `^6`, `@vitejs/plugin-react`,
framer-motion `^11`, TypeScript `^5.7` (strict).

## Run locally

```bash
git clone https://github.com/guptaumang769/portfolio-site.git
cd portfolio-site

npm install
npm run dev        # http://localhost:5179  (static site — no backend needed)
```

Other scripts:

```bash
npm run build      # tsc -b && vite build  →  dist/
npm run preview    # serve the built dist/ locally
```

## Edit the projects

All project data is a typed array in [`src/data/projects.ts`](src/data/projects.ts).
Add or edit an entry — each is a `Project` with
`{ id, title, pitch, problem, approach[], tags[], tech[], repoUrl, demoUrl?,
demoLabel?, icon, isAI? }`:

- `tags` drives the filter tabs (a project can match more than one).
- `isAI: true` gives the card an accent border + "AI" badge and lists it in the
  Agentic AI section.
- `problem` and `approach[]` are shown in the detail modal when a card is clicked.
- `demoUrl` + `demoLabel` add a second link (e.g. "UI", "Dashboard", "Live map",
  "Chat") next to "Repo".
- `icon` is an emoji shown on the card.

No other file needs touching to change the grid. The **Core stack** skill bars
live in [`src/components/Skills.tsx`](src/components/Skills.tsx) (`CORE` for the
bars, `TOOLING` for the chip cloud); the `level` field is visual weight only,
not a metric.

## Placeholders to fill in before publishing

Search for `PLACEHOLDER` / `TODO` comments:

- **LinkedIn** — `LINKEDIN_URL` in
  [`src/components/Nav.tsx`](src/components/Nav.tsx) (used by the nav, hero, and
  footer). Point it at your real profile URL.
- **Résumé** — `RESUME_URL` in
  [`src/components/Hero.tsx`](src/components/Hero.tsx); replace the `#` with a
  link to the hosted résumé (e.g. a PDF).
- **Concept guides** — `CONCEPTS_URL` in
  [`src/components/About.tsx`](src/components/About.tsx) if your notes repo lives
  somewhere other than your GitHub repository list.

Also confirm each card's GitHub link in `src/data/projects.ts` points at your
published repos.

## Deploy to GitHub Pages

`vite.config.ts` ships with `base: '/'` (assumes the **user site**,
`guptaumang769.github.io`). If you deploy this as a **project site**, change
`base` to `'/portfolio-site/'` first.

Two options — full detail in
`book-my-show-backend/guides/04-GITHUB-PAGES-PORTFOLIO.md`:

- **Option A (simplest):** `npm run build`, then push `dist/` to the
  `guptaumang769.github.io` repo (Settings → Pages → Deploy from a branch).
- **Option B (auto-deploy):** push this source to a `portfolio-site` repo — the
  included [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds
  with **Node 24** and publishes on every push to `main` (Settings → Pages →
  Source: GitHub Actions).
