# 006 - Gate hover motion to fine pointers

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: MEDIUM
- **Category**: Input handling
- **Estimated scope**: 1 file, CSS selector organization

## Problem

Spatial hover effects in `src/app/globals.css` run outside any hover-capability media query. Touch browsers can leave cards, icons, and images in false hover states after a tap.

## Target

Move all spatial `:hover` transforms into one `@media (hover: hover) and (pointer: fine)` block. Keep persistent state selectors such as `[aria-expanded="true"]` and `.is-favorite` outside the block.

## Repo conventions to follow

- Desktop GSAP uses fine-pointer media conditions.
- Touch layouts must stay in normal flow with no hover-only displacement.

## Steps

1. Move navigation underline, CTA arrow, card lift, card zoom, gallery scaling, catalog movement, journey zoom, and shortlist count hover rules into the fine-pointer block.
2. Preserve non-hover expanded and favorite states outside the block.
3. Do not duplicate selectors outside the capability query.

## Boundaries

- Do not change resting styles or focus-visible behavior.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: use desktop hover and confirm the current feedback remains. Emulate touch and tap every affected control; no lifted or translated state may stick.
- **Done when**: every transform-based hover effect is inside the fine-pointer query.
