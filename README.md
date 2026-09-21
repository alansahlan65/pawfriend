# PawFriend

PawFriend is a production-grade, editorial pet-adoption landing page built around personality-first discovery. Visitors can explore nine resident profiles, save a private shortlist on their device, understand the adoption journey, and prepare for a thoughtful first meeting.

## What ships

- Responsive Next.js landing page with a mobile-specific composition
- Five-pet featured contact sheet, an expandable filterable catalog, and individual profile views
- Persistent favorites with save/remove notifications and an accessible shortlist dialog
- Four connected desktop scroll chapters with touch and reduced-motion fallbacks
- Adoption preparation guidance, FAQ, privacy, and accessibility pages
- Canonical metadata, Open Graph and Twitter cards, JSON-LD, robots, sitemap, and web manifest
- Self-hosted Anton, Archivo, and Caveat fonts
- Optimized WebP delivery assets backed by documented source-image provenance

## Stack

- Next.js 16 App Router
- React 19 and TypeScript 6
- Tailwind CSS 4 tooling with a hand-authored global CSS system
- GSAP and ScrollTrigger, dynamically loaded after the critical interface
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Deployment configuration

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin in production. If it is omitted on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used. Localhost builds remain non-indexable; HTTPS production builds enable indexing and emit the configured origin in canonical URLs, the sitemap, and robots metadata.

## Content and availability

Resident profiles currently live in `src/content/site-content.ts`. Connect that content layer to the shelter's verified source before treating availability, pet details, stories, or operational information as live data. The public interface already reminds visitors to confirm profile details before planning a visit.

## Project map

- `src/components/landing-page.tsx`: interaction, motion orchestration, shortlist, and page composition
- `src/content/site-content.ts`: navigation, resident profiles, journey, FAQ, and interface copy
- `src/app/globals.css`: visual tokens, responsive layout, component states, and motion fallbacks
- `src/app/layout.tsx`: fonts and global metadata
- `src/lib/site.ts`: canonical URL, indexing, and shared site metadata
- `PRODUCT.md`: product truth and constraints
- `DESIGN.md`: normative visual system
- `.impeccable/`: approved comp, surface briefs, asset provenance, and historical design reviews

## Design principles

PawFriend treats every pet as a person, not inventory. Keep “Meet the pets” as the obvious primary action, preserve the tactile contact-zine visual world, and ensure the complete page remains usable with a keyboard, touch input, or reduced motion.
