# 003 - Complete the reduced-motion path

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 2 files, focused motion overrides

## Problem

`src/components/landing-page.tsx:40` enables magnetic CTA movement for every fine pointer, including reduced-motion users. `src/app/globals.css:2768` shortens several transitions but leaves catalog entry movement, mobile-menu scaling, status-toast translation, and journey zoom active.

## Target

- Gate magnetism with `(pointer: fine) and (prefers-reduced-motion: no-preference)`.
- Under reduced motion, disable catalog entry keyframes.
- Remove translation and scaling from the mobile menu, status toast, journey images, and shortlist drawer.
- Preserve short opacity, color, and filter feedback at `120ms`.

## Repo conventions to follow

- Reduced-motion overrides live in the single media query at `src/app/globals.css:2768`.
- Heavy GSAP motion already uses `prefers-reduced-motion: no-preference`.

## Steps

1. Tighten the `MagneticLink` media query.
2. Reset magnetic custom properties and transforms in reduced motion.
3. Disable catalog section and card keyframes.
4. Replace remaining positional reduced-motion transitions with opacity, color, or filter-only feedback.

## Boundaries

- Do not globally disable all transitions.
- Do not change GSAP narrative timelines.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: emulate reduced motion and test CTAs, the catalog, mobile navigation, shortlist, status toast, and journey hover. Content must remain visible and state feedback must remain clear without movement.
- **Done when**: reduced motion contains no position or scale changes in the touched interactions.
