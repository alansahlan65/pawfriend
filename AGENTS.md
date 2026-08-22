# PawFriend Coding Guide

## Objective

Build and maintain the PawFriend frontend as a fast, accessible, editorial pet-adoption landing page. The attached reference and the approved comp define the visual bar. Product truth lives in `PRODUCT.md`.

## Working Rules

1. State assumptions when product facts are missing. Resident records are static local content until a verified shelter source replaces them. Public copy should say that profiles and availability can change; keep internal implementation caveats out of the visitor experience.
2. Prefer the smallest implementation that fulfills the requested behavior. Do not add speculative routes, APIs, authentication, CMS plumbing, or abstractions for one-off components.
3. Keep changes surgical. Preserve existing visual tokens, copy conventions, accessibility behavior, and motion fallbacks. Do not refactor unrelated code.
4. Every changed line must trace to the current task. Remove only imports, variables, and styles made unused by the current change.
5. Use semantic HTML and native controls. Maintain keyboard access, visible focus, useful alternative text, 44px minimum touch targets, and `prefers-reduced-motion` behavior.
6. Motion must communicate hierarchy or state. Prefer `transform`, `opacity`, and `clip-path`; dynamically load GSAP/ScrollTrigger after the critical interface, scope it with `gsap.context()`, and clean it up on unmount.
7. Treat the mobile composition as a separate design pass. Disable pinned scrolling, magnetic pointer effects, and heavy parallax on touch or reduced-motion devices.
8. Keep user-facing copy in the content layer. Button labels must name outcomes, and no control may use vague labels such as “Submit,” “OK,” or “Click here.”
9. Do not introduce Lenis unless the user requests it or a measured motion defect justifies it.
10. Preserve the current resident flow: five featured cards, the expandable nine-resident catalog, persistent favorites, save notifications, and the focus-managed shortlist dialog.
11. Keep repository documentation synchronized with shipped behavior. Product truth belongs in `PRODUCT.md`; visual tokens and interaction doctrine belong in `DESIGN.md`; historical critiques remain explicitly marked as historical.

## Definition of Done

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- The page works at desktop and mobile widths without horizontal document overflow.
- Keyboard focus and favorite controls work.
- The shortlist traps focus while open, restores focus on close, and works from desktop and mobile launchers.
- The full resident catalog opens, closes, and preserves equal-height card rhythm without document overflow.
- Disabling motion does not hide content or block navigation.
- The primary “Meet the pets” action is understandable within five seconds.
- Visual changes are checked against `.impeccable/mocks/pawfriend-comp-b-approved.png`.

## Project Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
