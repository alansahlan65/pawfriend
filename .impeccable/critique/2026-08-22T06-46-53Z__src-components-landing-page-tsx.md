---
target: PawFriend landing page motion and hero-to-next-section transition
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-22T06-46-53Z
slug: src-components-landing-page-tsx
status: historical
superseded_by: current implementation and DESIGN.md
---
# PawFriend Motion Critique

> Historical audit snapshot. Its findings describe the landing page at the timestamp above; the current implementation has since added the two narrative handoffs, corrected reduced-motion and gallery behavior, replaced the false swipe affordance, and completed the production hardening pass. Use `DESIGN.md` and the active surface brief for current guidance.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Favorites, sharing, and story expansion respond, but horizontal galleries lack progress feedback. |
| 2 | Match between system and real world | 4 | Personality-led profiles and plain adoption language fit prospective adopters extremely well. |
| 3 | User control and freedom | 3 | Most states are reversible, but reduced-motion desktop gallery controls use the wrong scroll mode. |
| 4 | Consistency and standards | 3 | The visual system is cohesive; “Swipe to meet their whole vibe” promises an interaction that does not exist. |
| 5 | Error prevention | 3 | Prototype claims are qualified and actions are low-risk and clearly labeled. |
| 6 | Recognition rather than recall | 3 | Primary actions are visible, but galleries do not indicate position or remaining content. |
| 7 | Flexibility and efficiency | n/a | Persuade surface; expert accelerators are not material. |
| 8 | Aesthetic and minimalist design | 3 | Strong hierarchy with some duplicated proof and competing first-viewport paths. |
| 9 | Error recovery | 2 | Share failure has limited recovery, while the reduced-motion gallery can silently move the page instead. |
| 10 | Help and documentation | n/a | Persuade surface; the adoption journey provides the necessary help. |
| **Total** | | **24/32** | **Good, with major motion and interaction gaps** |

## Design Specificity Verdict

PawFriend is strongly authored and adoption-specific. The contact-sheet composition, warm paper world, taped labels, condensed typography, candid portraits, and humane copy could not move unchanged to an unrelated product. The gap is motion specificity: the static art direction is far more distinctive than the current repeated fade-and-rise language.

The deterministic detector returned `[]`: zero findings in `src/components/landing-page.tsx`. That clean scan does not prove the runtime animation path. Browser evidence found that the current environment reports `prefers-reduced-motion: reduce`, so `useLayoutEffect` exits before registering any ScrollTriggers. No pin spacer, GSAP mutation, console error, or horizontal overflow was present. Mutable overlay injection was unavailable, so no user-visible detector overlay exists.

## Overall Impression

The opening image and final invitation are memorable, but the page loses momentum immediately after the hero. Milo simply scrolls away into a thin text band; the page does not turn the emotional first impression into the beginning of an adoption journey.

## What's Working

- The hero establishes affection and one clear action within seconds.
- The editorial visual system remains coherent across a long page.
- Illustrative claims and mock stories are visibly qualified without draining the page of warmth.

## Priority Issues

1. **[P1] No authored hero-to-story transition.** The only scroll relationship is a subtle portrait translation. Build one rehearsed focal sequence that carries Milo, the blue portrait field, or the lime marker into the introduction and resident contact sheet. **Suggested:** `$impeccable animate` + `$impeccable overdrive`.
2. **[P1] Reduced motion becomes no motion.** The early return removes both spatial choreography and useful state feedback. Preserve a calm opacity/color/clip alternative while avoiding pinning and parallax. **Suggested:** `$impeccable animate` + `$impeccable adapt`.
3. **[P1] Reduced-motion desktop resident arrows use the wrong behavior.** Pinning is absent, yet arrow controls still scroll the document vertically. Base control behavior on actual pin activation and use a horizontal scroller otherwise. **Suggested:** `$impeccable harden`.
4. **[P2] Repeated reveals are generic and easy to miss.** Replace broad `.reveal` fade-ups with fewer product-specific sequences: handled contact prints, journey-line activation, and paired Luna photographs. **Suggested:** `$impeccable animate`.
5. **[P2] False swipe affordance.** “Swipe to meet their whole vibe” describes no available interaction. Replace it with truthful copy or implement an accessible profile interaction. **Suggested:** `$impeccable clarify` + `$impeccable delight`.

## Persona Red Flags

- **Jordan, first-time adopter:** the primary CTA is clear, but the static “Swipe” instruction and gallery without progress cues create uncertainty.
- **Riley, stress tester:** reduced motion reveals broken gallery-arrow routing; pet-specific “Meet” links still resolve to a generic destination.
- **Casey, distracted mobile visitor:** horizontal residents and journey tracks lack progress cues, and the page's strongest emotional material becomes comparatively static late in the journey.

## Minor Observations

- The duplicate `4,281` impact figure adds noise without new meaning.
- Desktop navigation has no active-section state.
- The mobile Milo note competes with the face at narrow widths.
- The resident cards feel more alive than the success and mission sections.

## Questions to Consider

1. What if Milo physically introduced the first resident contact sheet instead of disappearing at the hero boundary?
2. If only one scroll sequence can make visitors say “this could only be PawFriend,” should it feel like a contact-sheet handoff, a paper reveal, or a living editorial storyboard?
3. Can reduced motion preserve paper, ink, and state feedback without spatial movement?
