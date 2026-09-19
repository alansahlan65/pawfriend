# 002 - Make keyboard navigation instant

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: HIGH
- **Category**: Purpose and frequency
- **Estimated scope**: 1 file, small interaction change

## Problem

`src/components/landing-page.tsx:226` intercepts all in-page clicks and always uses smooth scrolling unless reduced motion is enabled. Catalog and resident controls also always request smooth scrolling. Keyboard-generated clicks have `MouseEvent.detail === 0` and must not animate.

```ts
behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
```

## Target

Centralize a helper that returns `"auto"` when `detail === 0` or reduced motion is enabled, and `"smooth"` otherwise. Use it for anchors, catalog open/close scrolling, and resident arrow controls.

## Repo conventions to follow

- Browser media queries are read inside event handlers in `src/components/landing-page.tsx`.
- Keep native controls and the existing focus-management order.

## Steps

1. Add a `scrollBehaviorForClick(detail: number): ScrollBehavior` helper.
2. Store catalog scroll behavior in a ref before changing catalog state.
3. Pass `event.detail` from catalog and resident control clicks.
4. Use the helper inside delegated anchor navigation.

## Boundaries

- Do not change destinations, focus targets, or scroll distances.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: activate navigation, catalog, and resident controls with a pointer and then with Enter or Space. Pointer actions may scroll smoothly. Keyboard actions must jump immediately while preserving focus.
- **Done when**: every keyboard-initiated scroll is instant.
