---
target: landing page closing grid and scroll-trigger motion
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
timestamp: 2026-08-22T07-45-26Z
slug: src-components-landing-page-tsx
status: historical
superseded_by: current implementation and DESIGN.md
---
# PawFriend Closing and Motion Critique

> Historical audit snapshot. Its findings describe the landing page at the timestamp above; the current implementation has since restored self-hosted fonts, corrected closing-grid spacing, completed both cinematic handoffs, removed invented proof, aligned CTA destinations, and added the full catalog plus hardened shortlist flow. Use `DESIGN.md` and the active surface brief for current guidance.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3/4 | Primary actions are clear; the scroll story has no progress cue. |
| 2 | Match system / real world | 3/4 | Adoption language is natural, but illustrative pets and metrics can initially read as live. |
| 3 | User control and freedom | 3/4 | Anchors work, but “Meet Miso” does not lead to a Miso-specific outcome. |
| 4 | Consistency and standards | 3/4 | The visual language is cohesive; link promises and destinations diverge. |
| 5 | Error prevention | 2/4 | Prototype qualifiers are too remote from some claims. |
| 6 | Recognition rather than recall | 4/4 | Navigation, CTA labels, headings, and card actions are visible and plain-language. |
| 7 | Flexibility and efficiency | n/a | Persuasive landing page. |
| 8 | Aesthetic and minimalist design | 3/4 | Strong overall, but the closing equal-thirds grid and clipped type weaken the finish. |
| 9 | Error recovery | 3/4 | Share and favorite states are recoverable; no complex error-prone flow is present. |
| 10 | Help and documentation | n/a | Persuasive landing page. |
| **Total** | | **24/32** | **Good foundation; focused motion and closing polish required.** |

## Design Specificity Verdict

PawFriend is strongly authored and adoption-specific. Its cutout pets, contact-sheet/zine grammar, compressed poster type, handwritten volunteer notes, and personality-first copy could not be swapped onto an unrelated product unchanged. The weak point is structural: the closing equal-thirds grid becomes a generic campaign triptych, and the hero boundary does not yet express the editorial motion language shown in the reference video.

The deterministic scan returned `[]` with zero findings, zero rule hits, and no false positives for `src/components/landing-page.tsx`. Browser evidence found the actual failures: `.mission-card` is 475px wide but has a 496px scroll width hidden by `overflow: hidden`; the mission and final headings exceed their intended text boxes; and computed styles resolve to Next fallback aliases for Anton, Archivo, and Caveat despite `document.fonts.status === "loaded"`. No live overlay was injected because the available browser evaluation surface is read-only; native screenshots, computed geometry, media-query state, and console logs were used as fallback evidence.

## Overall Impression

The opening has excellent art direction and immediate emotional pull. The largest opportunity is to turn the hero boundary and final triptych into two confident editorial sequences, then restore the real fonts so those sequences have the typographic authority the design assumes.

## What’s Working

- Milo breaking the hero grid, the orange decision rail, and the direct “Meet the pets” action create a category-specific first viewport.
- Flat color fields, hard seams, portrait-led asymmetry, and the Anton/Archivo/Caveat voice system form a coherent shelter-zine world.
- Touch layouts retain native horizontal scrolling and large targets, while the reduced-motion CSS keeps all content visible.

## Priority Issues

1. **[P1] Hero-to-intro is ordinary scrolling.** The reference derives energy from a held canvas where subject and type move at distinct rates while the next editorial field rises underneath. Current code only gives Milo a small scrub. **Fix:** add a short fine-pointer desktop pin, lift headline and portrait at different rates, use the bottom seam as a page edge, and raise the intro band beneath it. Keep mobile and reduced-motion paths in normal flow. Suggested command: `$impeccable animate`.
2. **[P1] Closing equal thirds have no hierarchy and clip content.** All three messages compete, while real geometry shows 21px of mission content hidden at 1440px. **Fix:** use a deliberate `0.9fr 1.05fr 1.25fr` spread, container-aware display sizes, and a pinned three-chapter entrance that ends in the complete spread. Suggested command: `$impeccable layout` + `$impeccable typeset`.
3. **[P1] Runtime font delivery is broken.** Computed styles resolve to fallback aliases, widening the display face and collapsing the intended poster hierarchy. **Fix:** self-host the cached Latin WOFF2 assets with `next/font/local`. Suggested command: `$impeccable typeset`.
4. **[P1] Closing promises outrun prototype capability.** “Meet Miso” lands on a generic invitation, while the pet profile reads as live availability. **Fix:** qualify the profile next to its facts and rename the link to its actual destination. Suggested command: `$impeccable clarify`.
5. **[P2] Motion gating and anchor semantics are incomplete.** Hero scrub currently runs on touch, reduced motion is sampled only once, and `#mission` lands on Miso before the mission article on mobile. **Fix:** move all heavy hero/closing choreography into GSAP media conditions that include fine pointer and no-reduction, and move the mission anchor to the mission card. Suggested command: `$impeccable animate` + `$impeccable adapt`.

## Persona Red Flags

- **Jordan, first-timer:** “Meet Miso” promises a pet-specific next step but lands on a generic invitation. Tiny remote qualifiers do not reliably prevent mock pets and impact numbers from being understood as verified shelter facts.
- **Riley, stress tester:** Direct geometry exposes a clipped mission headline and hidden overflow. The `#mission` anchor also names a destination whose first mobile panel is a pet profile, not the mission.
- **Casey, distracted mobile user:** Three fixed 600px closing panels delay the final CTA and leave large dead fields. Heavy hero motion should not run on touch devices.

## Minor Observations

- `overflow-x: clip` and panel `overflow: hidden` conceal layout failures; they should not substitute for responsive typography.
- The pink CTA panel is the strongest of the three and should receive the largest compositional share.
- The Miso cutout is strong, but metadata and portrait need a clearer split.
- “Swipe to meet their whole vibe” claims an interaction the personality block does not provide.

## Questions to Consider

- What if the hero’s bottom seam became the physical page edge that reveals the intro?
- What if the final three panels read as one staged editorial spread with a single dominant decision?
- Does Miso earn a pet-specific action if no pet-specific destination exists yet?
