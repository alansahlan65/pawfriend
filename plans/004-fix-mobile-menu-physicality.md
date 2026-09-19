# 004 - Fix mobile-menu physicality

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: HIGH
- **Category**: Physicality
- **Estimated scope**: 2 files, small state and CSS change

## Problem

The mobile navigation at `src/app/globals.css:2368` opens from `scaleY(0)`, which squashes the menu and its text into a line. The same transition runs for keyboard activation.

```css
transform: scaleY(0);
transition: transform 260ms var(--ease-out), opacity 180ms ease, visibility 180ms;
```

## Target

Use `translateY(-8px) scale(0.97)` plus opacity, entering over `200ms var(--ease-out)` and `160ms ease`. Add an instant state for keyboard-generated clicks and Escape.

## Repo conventions to follow

- The menu remains mounted and uses `visibility` to leave the accessibility tree while closed.
- `MouseEvent.detail === 0` identifies keyboard-generated clicks.

## Steps

1. Add a `menuInstant` state and set it for keyboard toggles, keyboard link activation, and Escape.
2. Add `is-instant` to the menu class when needed.
3. Replace `scaleY(0)` with `translateY(-8px) scale(0.97)` and use `transform-origin: top right`.
4. Keep pointer opening interruptible through CSS transitions.

## Boundaries

- Do not change menu content, breakpoint, focus return, or ARIA state.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: tap the menu repeatedly and confirm the transition reverses cleanly. Open with keyboard and close with Escape; both must be instant.
- **Done when**: no menu state uses zero scale and keyboard activation has no animation.
