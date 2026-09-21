---
name: "PawFriend"
description: "A tactile adoption zine and portrait contact sheet that presents every pet as a person, not inventory."
colors:
  recycled-paper: "#f5edde"
  deep-paper: "#eadfcd"
  contact-paper: "#ede3d2"
  story-paper: "#eee4d4"
  ink: "#121314"
  safety-orange: "#ef6c1b"
  adoption-lime: "#d9ef42"
  warm-pink: "#efa4b4"
  soft-blue: "#a9d4ee"
  editorial-line: "color-mix(in srgb, #121314 24%, transparent)"
  focus-blue: "#2e64ff"
typography:
  hero:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(72px, 9.3vw, 144px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(56px, 7vw, 104px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  editorial-serif:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(36px, 4vw, 64px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
  annotation:
    fontFamily: "Caveat, cursive"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1
rounded:
  square: "0"
  micro: "2px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  page-gutter: "clamp(24px, 4vw, 64px)"
  section-space: "clamp(80px, 9vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.recycled-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.micro}"
    padding: "12px 16px 12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.adoption-lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.micro}"
  button-header:
    backgroundColor: "{colors.recycled-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.micro}"
    padding: "12px 16px 12px 20px"
    height: "48px"
  button-icon:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.recycled-paper}"
    rounded: "{rounded.circle}"
    size: "48px"
  contact-card:
    backgroundColor: "{colors.contact-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px"
    width: "320px"
---

# Design System: PawFriend

## Overview

**Creative North Star: "The Portrait Contact Zine"**

PawFriend treats every pet as a person, not inventory. Its visual world is a tactile adoption zine crossed with a portrait-studio contact sheet: warm recycled paper, hard ink seams, oversized compressed type, candid pet photography, taped labels, and a few handwritten observations that feel human rather than cute-by-default.

The system is humane, cheeky, direct, editorial, and unmistakably adoption-specific. It uses asymmetry and scale to give animals presence, while plain language, practical preparation, and an availability reminder keep emotion from turning into false evidence. The landing-page story moves from introduction → featured residents → complete catalog → personality → journey → patient-match story → visitor preparation → FAQ → mission → CTA; this is the canonical persuasive rhythm, not a generic page template.

**Key Characteristics:**

- Pet portraits are the protagonists; UI supports recognition and choice.
- Warm paper, black ink, safety orange, and small highlighter accents create a tactile print world.
- Condensed display type carries urgency; Archivo carries clarity; Caveat is a rare human annotation.
- Square editorial bands and imperfect contact prints outrank rounded digital cards.
- Motion reveals hierarchy and state, then disappears on touch and reduced-motion paths.
- Availability-sensitive profile details are framed for confirmation without interrupting the visitor's emotional journey.

**The Personhood Rule.** Lead with a pet's face, name, and personality; never reduce residents to interchangeable inventory tiles.

## Colors

The palette combines warm shelter-paper neutrals with ink-black structure and four flat, high-energy editorial fields. All normative values live in the frontmatter.

### Primary

- **Ink** (`colors.ink`): navigation, footer, primary actions, editorial seams, and the adoption-journey field.
- **Safety Orange** (`colors.safety-orange`): decisive story bands, hero emphasis, and active emotional punctuation.

### Secondary

- **Adoption Lime** (`colors.adoption-lime`): CTA hover, marker strokes, journey progress, selection, and sparse proof highlights.
- **Soft Blue** (`colors.soft-blue`): portrait swipes and mission fields that cool the warm paper without becoming corporate.
- **Warm Pink** (`colors.warm-pink`): taped pet labels and the final invitation field.

### Neutral

- **Recycled Paper** (`colors.recycled-paper`): default page ground and inverse text on ink.
- **Deep Paper** (`colors.deep-paper`): adjacent paper bands and image placeholders.
- **Contact Paper** (`colors.contact-paper`): resident contact prints.
- **Story Paper** (`colors.story-paper`): before-and-after instant-photo mounts.
- **Editorial Line** (`colors.editorial-line`): quiet dividers and rating rows.
- **Focus Blue** (`colors.focus-blue`): the accessible focus ring only; it is functional, not decorative.

**The Flat-Ink Rule.** Use solid color fields and 1px editorial seams; do not introduce gradients, glass, or translucent decorative surfaces.

**The Highlighter Rule.** Lime is a small directional signal, not a background wash for whole sections.

## Typography

**Display Font:** Anton, self-hosted Latin WOFF2 (sans-serif fallback)  
**Body Font:** Archivo variable, self-hosted Latin WOFF2 (sans-serif fallback)  
**Editorial Serif:** Georgia (serif fallback)  
**Handwritten Font:** Caveat variable, self-hosted Latin WOFF2 (cursive fallback)

**Character:** Anton gives the page poster-scale urgency, while Archivo keeps practical adoption information blunt and readable. Georgia appears once as an editorial change of voice; Caveat behaves like a volunteer's margin note, never like a body face.

### Hierarchy

- **Hero** (`typography.hero`): uppercase three-line headline; the first viewport must read exactly “Find your new best friend.”
- **Display** (`typography.display`): uppercase section statements, proof numerals, and journey numbers.
- **Editorial Serif** (`typography.editorial-serif`): the intimate introduction band only.
- **Body** (`typography.body`): descriptions, journey copy, mission copy, and disclosures; keep narrative measures near 30–42 characters where the layout establishes them.
- **Label** (`typography.label`): uppercase navigation, metadata, action labels, pet labels, and compact status copy.
- **Annotation** (`typography.annotation`): names, arrows, and one-line asides; rotate slightly and use sparingly.

Supporting type is intentionally optical rather than a rigid four-step product scale: 10–14px is reserved for metadata and compact utility controls, 16–18px carries readable body and disclosure copy, 21–28px supports card titles and annotations, and authored display sizes range from 40–144px through fluid or container-aware clamps. The large endpoints are compositional values for poster typography, not interchangeable text tokens; each must be tested in its actual panel and breakpoint.

**The Three-Voice Rule.** Anton persuades, Archivo explains, and Caveat reacts; do not let any one voice perform another's job.

## Layout

The page is a sequence of full-width editorial bands separated by ink rules. Desktop compositions use asymmetric two-, three-, and four-column grids, interrupted by cutout portraits and overlapping contact prints. The global gutter is `spacing.page-gutter`; the global vertical rhythm is `spacing.section-space`. Square surfaces, clipped swipes, slight card rotations, and deliberate overlaps create the printed-contact-sheet grammar.

The first viewport is non-negotiable: exact headline “Find your new best friend,” oversized Milo portrait, handwritten personality note, proof cluster, and one dominant “Meet the pets” action. The approved form is the pinned contact-sheet direction identified by seed `6c948c11`.

Responsive behavior is designed in tiers:

- Above 1120px, the hero is a three-part poster: headline, portrait, orange decision rail.
- At 1120px and below, the hero becomes a two-column portrait composition with the orange rail as a horizontal band; dense three-column sections reduce cleanly.
- Below 900px, navigation becomes a native button-controlled menu, the hero stacks, a primary CTA moves directly under the headline, residents and journey steps become horizontal snap scrollers, the full catalog becomes two columns before collapsing to one, and closing sections become single-column.
- At 520px and below, the duplicate CTA in the orange rail is removed, the proof cluster stacks to prevent collision, portrait and print sizes tighten, and touch targets remain at least 44px.
- Desktop pinned residents and connected journey progress run only from 900px on hover-capable fine pointers; touch layouts always scroll normally.

**The Band-and-Break Rule.** Build rhythm with full-width bands and intentional subject overlap, not nested containers floating in empty space.

## Elevation & Depth

The system is flat by default. Depth comes from clipped paint swipes, overlapping photography, 1px rules, small rotations, and shallow paper shadows. Resident cards use a low paper shadow at rest and a stronger shadow with a 12px lift on hover; instant-photo story cards use the same shallow family. Cutout pets use restrained drop shadows for separation from flat color fields.

**The Paper-Only Shadow Rule.** Shadows belong to physical-feeling prints, cutout portraits, and active CTA feedback; never use them to make generic floating panels.

## Shapes

Corners are square by default. Primary CTAs use only a micro-radius (`rounded.micro`), contact prints and editorial bands remain square (`rounded.square`), and circles are reserved for icon controls, proof thumbnails, and hand-drawn annotation marks (`rounded.circle`). Blue swipes and lime marker strokes use irregular polygon clips; labels and photos may rotate by roughly 1–5 degrees to suggest handling without becoming messy.

Borders are direct: 1px ink rules for structure, 2px icon strokes, and a 3px focus outline with a 4px offset. Avoid pill shapes and decorative blobs.

**The Circle-With-A-Job Rule.** A circle must be an icon control, portrait proof, or explicit annotation; it is never a default container shape.

## Components

### Buttons and Links

- **Primary CTA:** black ink block, recycled-paper label, 48px minimum height, uppercase Archivo label, micro-radius, arrow at the far edge. Hover flips to lime, casts a shallow shadow, and shifts the arrow 4px.
- **Header CTA:** the inverse paper-on-ink variant preserves the same size and typography.
- **Magnetism:** fine-pointer devices may offset primary CTAs by 12% of pointer distance; touch and coarse pointers must receive no magnetic behavior.
- **Text links:** retain a 44px minimum target and use arrow translation for feedback.
- **Focus:** all interactive elements use the global 3px focus-blue outline with 4px offset.

### Navigation

The header is a 64px sticky ink bar with a condensed PawFriend wordmark, centered uppercase links, a saved-pet counter, and a clear adoption CTA. Desktop links reveal a 2px lime underline. Below 900px, a native 48px menu button opens a full-width stacked menu with 56px rows, Escape dismissal, focus return, and accurate `aria-expanded` state.

### Resident Contact Cards

Resident cards are 320px square-cornered paper prints with 16px padding, a square portrait, a slightly rotated colored name label, compact pet metadata, a personality-led title, and a real favorite button using `aria-pressed`. Desktop cards alternate small rotations and lift on hover; mobile cards remove vertical staggering and snap horizontally.

Five residents form the authored horizontal contact sheet. “View all 9 residents” expands a separate equal-height catalog grid: three columns on wide screens, two below 900px, and one below 640px. Opening the catalog moves focus to its heading and scrolls it into view; closing restores focus and returns to the featured gallery.

### Portrait Proof Cluster

Three overlapping circular portraits support the message “Start with fit.” The accompanying copy explains the local shortlist rather than presenting an unverified shelter total. On narrow screens, the portraits and copy reflow without competing with the primary CTA.

### Shortlist and Save Feedback

Favorite hearts persist to local storage when available and remain session-usable when storage fails. Saving or removing a pet triggers a compact portrait-led status notice with polite live-region output. The saved-pet drawer is an `aria-modal` dialog with an outside-dismiss backdrop, body scroll lock, focus containment, Escape dismissal, empty and populated states, disabled sharing when empty, native share support, clipboard fallback, and reliable focus restoration to desktop or mobile launchers.

### Personality Matrix

The matrix pairs plain-language traits with five paw icons. Filled paws use ink; empty paws use a quiet ink mix. The row itself remains readable text, and the group exposes an accessible “x out of 5” label.

### Adoption Journey

Four numbered steps sit on an ink field. Desktop uses a lime connecting line and four-column photo sequence; journey photographs begin in black and white and reveal color only on hover. Mobile removes the connector and becomes a horizontal snap scroller. The interaction never hides the step title or practical copy.

### Imagery and Provenance

Use one realistic portrait per story beat. Resident images are warm, eye-level, square editorial shelter portraits with quiet cream interiors; hero and closing figures are transparent, clean-alpha cutouts with complete ears and humane anatomy; journey images are documentary black and white; before-and-after images preserve dignity rather than manufacturing distress. No cages-as-drama, branded collars, readable signage, watermarks, costumes, duplicated animals, or fake transparency.

Generation provenance is durable: the approved comp prompt and structural translation live in `.impeccable/mocks/pawfriend-comp-b-approved.json`; hero/cutout prompts live in `.impeccable/asset-manifest-hero.md`; resident prompts live in `.impeccable/asset-manifest-residents.md` and in each PNG's `impeccable:prompt` metadata; story prompts live in `.impeccable/asset-manifest-story.md` and PNG text metadata. The purpose-sized `journey-*.webp` and `mission-otis.webp` files are mechanical delivery derivatives of those approved PNG sources; the source PNG and its manifest remain the provenance authority. The pinned comp seed is `6c948c11`. Preserve these records when replacing or deriving an asset.

### Motion, Truth, and Metadata

GSAP and ScrollTrigger load asynchronously after the critical interface, then run inside `gsap.context()` plus `gsap.matchMedia()` and clean up on unmount or media-query change. The page has exactly two narrative handoffs. First, the desktop hero pins while the headline and Milo exit upward at different rates, the blue portrait swipe expands, and the paper intro rises from the bottom seam like the next page of the shelter zine. Second, the personality section holds while its copy, Otis, and the rating matrix part sideways; a lime editorial seam travels across the viewport and reveals the black adoption-journey contact sheet from left to right. Its heading, steps, and connector then resolve in the same horizontal reading direction. The change in axis keeps the two scenes distinct while the paper, ink, highlighter, and portrait language makes them one journey. The closing spread remains static so the final decision is never delayed by another pinned scene. Resident travel is secondary supporting motion, not a narrative handoff.

Narrative pinning runs only at `(min-width: 1121px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`. The resident gallery and standalone journey connector keep their existing 900px fine-pointer threshold where the cinematic handoff is unavailable. Touch, narrower layouts, and reduced-motion paths remain in normal document flow with every panel visible; changing the OS motion preference causes GSAP media conditions to revert rather than requiring a reload. Reduced-motion CSS preserves short color and state feedback rather than globally killing every transition. Lenis is not part of this system.

Resident profiles and stories are local content until a verified shelter source replaces them, so the persuasive journey must not lean on invented totals, addresses, contact details, outcomes, or success rates. Keep the footer reminder that profiles and availability can change, and make the rest of the page useful on its own. Controls must do what they say: favorites persist locally, the shortlist has empty, saved, remove, disabled, focus-managed, and share states, story disclosure opens, resident controls scroll, the complete catalog expands and collapses, FAQs use native disclosure, share uses the native share sheet or clipboard fallback, and anchor CTAs navigate correctly across pinned sections. Preserve semantic sections, heading order, meaningful alt text, skip link, live status feedback, high-contrast affordances, WCAG 2.2 AA contrast, 44px touch minimum, and production metadata for canonical URLs, Open Graph, Twitter, JSON-LD, robots, sitemap, manifest, viewport, and theme color.

## Do's and Don'ts

### Do:

- **Do** preserve the thesis that every pet is a person, not inventory.
- **Do** keep “Meet the pets” as the obvious primary outcome within five seconds and show it directly below the headline on mobile.
- **Do** use portrait-led asymmetry, hard editorial seams, square paper surfaces, and restrained handwritten notes.
- **Do** gate pinned scrolling, magnetic response, and heavy parallax to fine-pointer desktop contexts.
- **Do** make the complete experience readable and operable with motion disabled, touch input, or keyboard input.
- **Do** avoid invented proof, retain the discreet footer reminder that profile details and availability should be confirmed, and preserve prompt provenance for every generated raster.

### Don't:

- **Don't** use generic SaaS grids, glassmorphism, blue-purple gradients, excessive rounding, random blobs, or symmetrical template layouts.
- **Don't** turn local resident content, statistics, addresses, contact details, testimonials, or outcomes into verified claims.
- **Don't** hide content behind animation, pin horizontal content on touch, or apply magnetic effects to coarse pointers.
- **Don't** introduce Lenis unless the user explicitly requests it or measured evidence proves it necessary.
- **Don't** add motion, decoration, or copy that competes with the animals or weakens the adoption-specific story.
