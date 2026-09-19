# 005 - Make the shortlist drawer interruptible

- **Status**: DONE
- **Commit**: 6a02838
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 2 files, moderate state and CSS change

## Problem

The shortlist drawer uses entry keyframes at `src/app/globals.css:484` and is conditionally unmounted at `src/components/landing-page.tsx:688`. Rapid toggles restart the keyframe and closing removes the drawer immediately.

## Target

Keep the drawer mounted through a `200ms` pointer-driven exit. Use interruptible transitions with `280ms var(--ease-drawer)` for entry and `200ms var(--ease-out)` for exit. Define `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`. Keyboard opening and closing must be instant. The closing drawer must be inert and hidden from assistive technology.

## Repo conventions to follow

- Preserve the existing focus trap, body scroll lock, Escape handling, and return-focus reference.
- Animate only transform and opacity.

## Steps

1. Split visible state from mounted state and add an exit timer ref.
2. Add open and close helpers that accept whether the interaction is instant.
3. Keep the closing dialog mounted, `inert`, and `aria-hidden` until the exit completes.
4. Replace keyframes with state classes and transitions for panel and backdrop.
5. Remove obsolete shortlist keyframes.

## Boundaries

- Do not change shortlist content, persistence, sharing, focus order, or drawer dimensions.
- Do not add dependencies.

## Verification

- **Mechanical**: run `npm run typecheck`, `npm run lint`, and `npm run build`.
- **Feel check**: rapidly open and close with a pointer. Motion must reverse from its current position. Open with keyboard and close with Escape; both must be instant. Confirm focus remains trapped while open and returns to the launcher on close.
- **Done when**: pointer exit is visible and interruptible, keyboard actions are instant, and focus behavior is unchanged.
