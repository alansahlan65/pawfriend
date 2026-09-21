# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router with React 19, TypeScript 6, Tailwind CSS 4 tooling, hand-authored global CSS, Lucide icons, and dynamically loaded GSAP/ScrollTrigger. Lenis is intentionally absent.

## Users

First-time and returning prospective pet adopters browsing on desktop or mobile. They may be hopeful, curious, and emotionally invested, but overwhelmed by choosing a compatible pet and uncertain about the adoption process.

## Product Purpose

PawFriend helps prospective adopters discover shelter pets through personality-led stories, understand the adoption journey, and confidently choose to meet a pet. Success means visitors can understand the offer and find the primary adoption action within five seconds, then build enough trust to continue exploring.

## Positioning

PawFriend presents adoptable animals as distinct companions with recognizable personalities, not inventory. It pairs emotional storytelling with practical compatibility cues and a transparent four-step adoption journey.

## Operating Context

This is a public, image-led marketing landing page. Visitors scan quickly, compare five featured profiles or open the complete nine-resident catalog, save a persistent shortlist on their device, learn how adoption works, and prepare practical questions before meeting a pet.

## Capabilities and Constraints

- Production-ready static frontend with local resident content. A verified shelter feed can replace the content layer without changing the page architecture.
- No backend, database, authentication, CMS, API integration, admin dashboard, or adoption submission is connected in the current delivery.
- The landing page includes navigation, hero, shelter introduction, featured resident gallery, expandable catalog, persistent shortlist dialog, personality profile, adoption journey, patient-match story, visitor preparation, adoption FAQ, final invitation, and policy-aware footer.
- The visual experience uses two desktop narrative handoffs, resident travel, purposeful state feedback, and calm touch/reduced-motion fallbacks.
- Favorites persist in local storage when available, synchronize with save/remove notices, and remain usable for the current session when storage is unavailable.
- Production metadata includes canonical URLs, Open Graph, Twitter cards, JSON-LD, robots, sitemap, a web manifest, privacy, and accessibility pages. `NEXT_PUBLIC_SITE_URL` controls the canonical production origin.
- Individual shelter facts, statistics, addresses, and adoption claims are not confirmed and must not be presented as verified real-world evidence.
- Pet details and availability can change; the public footer asks visitors to confirm them before planning a visit.

## Brand Commitments

- Product name: PawFriend.
- Voice: warm, direct, playful, and accessible, like a knowledgeable shelter volunteer who respects the seriousness of adoption.
- The attached Good Paws reference image is binding visual direction, not a brand identity to copy literally.
- Preserve oversized condensed typography, expressive pet photography, asymmetric editorial composition, warm paper-like grounds, ink-like annotations, bold color fields, and personality-driven copy.
- Avoid generic SaaS card grids, glassmorphism, blue-purple gradients, excessive rounding, random decorative blobs, and symmetrical template layouts.

## Evidence on Hand

- Visual UI reference: `C:/Users/Asus/Downloads/ChatGPT Image Aug 21, 2026, 10_31_12 PM.png`.
- Detailed landing-page brief: `C:/Users/Asus/.codex/attachments/28dcda43-1cd9-459c-b63b-97a3c0f0d85d/pasted-text.txt`.
- No verified shelter statistics, testimonials, adoption outcomes, contact information, or live availability source has been provided. Resident profiles and stories are local content that must be connected to verified shelter data before launch operations treat them as live records.

## Product Principles

1. Personality before paperwork: help visitors feel compatibility before explaining process details.
2. One obvious next step: keep “Meet the pets” visually dominant wherever a decision is invited.
3. Earn trust through clarity: show how adoption works, avoid invented proof, and remind visitors that profile details and availability should be confirmed.
4. Motion guides attention: animation creates narrative rhythm without blocking content or accessibility.
5. Mobile is a designed experience: simplify choreography while preserving photography, hierarchy, and touch targets.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Use semantic HTML, logical heading order, keyboard-operable controls, visible focus states, meaningful alternative text, minimum 44px touch targets, sufficient contrast, and a complete `prefers-reduced-motion` path.
