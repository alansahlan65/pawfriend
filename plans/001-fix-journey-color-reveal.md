# 001 - Fix the journey color reveal

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: HIGH
- **Category**: Purpose and correctness
- **Estimated scope**: 1 file, small CSS change

## Problem

The grayscale filter is applied to the wrapper at `src/app/globals.css:1361`, while hover removes grayscale from the child image at `src/app/globals.css:1382`. A parent filter still processes the rendered child, so the image remains grayscale.

```css
.journey-image { filter: grayscale(1) contrast(1.08); }
.journey-step:hover .journey-image img { filter: grayscale(0); }
```

## Target

Move `grayscale(1) contrast(1.08)` to `.journey-image img`. On fine-pointer hover, transition to `grayscale(0) contrast(1)` and `scale(1.05)`. Keep `transform 700ms var(--ease-out)` and `filter 500ms ease` because this is explanatory marketing imagery.

## Repo conventions to follow

- Motion tokens live in `src/app/globals.css:19`.
- Fine-pointer choreography uses `(hover: hover) and (pointer: fine)`.

## Steps

1. Remove the filter from `.journey-image`.
2. Add the initial filter to `.journey-image img`.
3. Move the hover rule into the shared fine-pointer hover media query.
4. In reduced motion, keep the color transition but remove image scaling.

## Boundaries

- Do not change journey markup, images, copy, or GSAP timelines.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: hover each desktop journey card. The image must reveal color smoothly. Touch must not retain a zoomed state. Reduced motion must change color without movement.
- **Done when**: the hover reveal visibly reaches full color and no transform runs under reduced motion.
