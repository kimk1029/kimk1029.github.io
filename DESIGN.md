---
name: KKH-1 Launch Manifest
description: A frontend career flown as a three-stage launch, drawn in 1975 NASA graphics-standards discipline.
colors:
  nasa: "#d4291a"
  flight: "#1d3fbf"
  ink: "#111214"
  pad: "#f2f1ec"
  steel: "#55575c"
  sky: "#cfdeec"
  vacuum: "#05060a"
  signal: "#ff8a78"
typography:
  display:
    fontFamily: "Big Shoulders Display, Black Han Sans, Pretendard Variable, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "normal"
  headline:
    fontFamily: "Big Shoulders Display, Black Han Sans, Pretendard Variable, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.1
  title:
    fontFamily: "Big Shoulders Display, Black Han Sans, Pretendard Variable, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "0.025em"
  stencil:
    fontFamily: "Big Shoulders Stencil Display, Black Han Sans, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 1
  hangul-mark:
    fontFamily: "Black Han Sans, Pretendard Variable, sans-serif"
    fontSize: "clamp(7rem, 24svh, 15rem)"
    fontWeight: 400
    lineHeight: 0.92
  body:
    fontFamily: "Pretendard Variable, Pretendard, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
    fontFeature: "tnum"
rounded:
  none: "0"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter: "24px"
  block: "56px"
  section: "96px"
  container: "1280px"
  header: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.pad}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  button-primary-hover:
    backgroundColor: "{colors.nasa}"
    textColor: "{colors.pad}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.pad}"
  nav-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.pad}"
    height: "{spacing.header}"
  nav-link-hover:
    backgroundColor: "{colors.pad}"
    textColor: "{colors.ink}"
    padding: "6px 12px"
  checklist-pip:
    backgroundColor: "{colors.nasa}"
    size: "6px"
  mission-patch:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "256px"
---

# Design System: KKH-1 Launch Manifest

## Overview

**Creative North Star: "The Launch Manifest"**

Scroll is altitude. The page is a flight: it starts on an off-white launch pad beside a red fuselage, climbs through three career stages whose backgrounds darken from sky to flight blue to vacuum, reaches orbit where shipped products hang as mission patches, and ends on a red fuselage "open channel" for email. The discipline is the 1975 NASA graphics standards manual: flat fields of a few spot colors, tall condensed caps, ruled telemetry, square stencil hardware.

Density is low and declarative. Each section is one big condensed headline, one short paragraph, then a single structured instrument (profile line, patch orbit, ruled archive, checklist grid). Vacuum is earned by scrolling; it never appears on the first viewport.

**Key Characteristics:**
- Flat spot-color fields, no tints of surfaces; depth comes from altitude (background darkening), not cards.
- Condensed uppercase display at weight 900 with ultra-tight leading (0.85 to 0.9).
- Telemetry in monospace with tabular numerals: dates, counts, status, altitude.
- 2px ink rules as the structural line; square corners on everything rectangular, circles reserved for patches, orbits, and signal rings.
- Authored SVG only: patches, rocket, altitude profile. No raster imagery ships.

## Colors

A four-color spot palette (red, blue, ink, paper) plus a sky and a vacuum that exist to mark altitude.

### Primary
- **NASA Fuselage Red** (#d4291a): the fuselage field (hero panel, contact footer, detail header), primary hover, wordmark "-1", checklist pips, flight-log numerals, selection and scrollbar. The direction contract specified #e8321b; the build landed on this deeper red and the build is canonical.

### Secondary
- **Flight Blue** (#1d3fbf): Stage 2 field, the orbit planet, alternate patch field, and the focus ring.

### Tertiary
- **Signal Coral** (#ff8a78): red rendered on vacuum. Fuselage Red reads under 4.5:1 on vacuum at label size, so "Transmitting" status text uses this lifted tint instead.

### Neutral
- **Launch Pad** (#f2f1ec): page ground, light type on red and ink, patch linework.
- **Flight Ink** (#111214): text, 2px rules, header bar, primary buttons, patch body.
- **Gantry Steel** (#55575c): secondary text and telemetry labels on pad only.
- **Low-Altitude Sky** (#cfdeec): Stage 1 field only.
- **Vacuum** (#05060a): orbit, archive, and 404 grounds. White text at 60 to 80% opacity for secondary copy there.

### Named Rules
**The Altitude Rule.** Background darkness tracks altitude: pad and sky low, flight blue mid, vacuum high. Never put vacuum on a ground-level surface or above the fold.

**The Spot Color Rule.** Fields are flat spot colors. The only gradients are physical: fuselage panel seams, the engine flame, the conic roll pattern, and the planet's glow.

## Typography

**Display Font:** Big Shoulders Display (with Black Han Sans for hangul)
**Stencil Font:** Big Shoulders Stencil Display, for the KKH-1 wordmark and the contact email
**Hangul Mark:** Black Han Sans, the vertical 김규현 on the fuselage
**Body Font:** Pretendard Variable (with system-ui)
**Label/Mono Font:** JetBrains Mono

**Character:** Engineering-drawing caps set huge and tight against a quiet, highly legible Korean grotesque; monospace reads as instrument output.

### Hierarchy
- **Display** (900, clamp 3 to 6rem, 0.85): one per section, uppercase. The hero positioning line runs slightly smaller (clamp 3 to 5.75rem, 0.88).
- **Headline** (900, 1.875rem): patch names, archive company heads, uppercase.
- **Title** (900, 1.25rem, wide tracking): button text, nav, checklist group heads, uppercase.
- **Stencil** (900, clamp 2.25 to 5.5rem): the contact email, and the wordmark at 1.25rem with 0.08em tracking.
- **Body** (400, 1.125rem, 1.625): section ledes capped at 48 to 60ch; list copy at 15px; flight-log detail at 17px capped at 68ch.
- **Label** (500, 0.75rem, uppercase, tabular): periods, counts, status, altitude, coordinates. 11px in the HUD and patch captions.

### Named Rules
**The Telemetry Rule.** Mono is for data: dates, counts, status, altitude, IDs. It is never a decorative caption above a headline.

**The Keep-All Rule.** Korean text breaks by word (`word-break: keep-all`); never let hangul split mid-word.

## Layout

A 1280px container with 20px (mobile) / 24px gutters, sections at 96px vertical padding (128px for orbit and contact on desktop), and 56px between a section lede and its instrument. A fixed 48px ink header sits over everything. The hero is a 1.35fr / 1fr split (fuselage / telemetry rail) divided by a 2px ink rule, stacking under 1024px. The ascent is a 420vh scroll track with a sticky viewport at 5fr / 7fr (text / profile) from 768px; below 768px the same three stages stack as plain blocks. The altitude HUD appears only at 1500px and up.

## Elevation & Depth

Flat. Surfaces never float on shadows; depth is altitude, expressed by background color change. Two soft shadows exist and both belong to objects in space, not UI.

### Shadow Vocabulary
- **Patch drop** (`drop-shadow(0 12px 24px rgba(0,0,0,0.5))` in orbit, `0 16px 28px rgba(0,0,0,0.35)` on red): lifts a mission patch off its field.
- **Planet glow** (`0 -30px 120px rgba(29,63,191,0.55)`): the flight-blue horizon in orbit.

### Named Rules
**The No-Card Rule.** Information sits on ruled lines or in 2px-gapped ink grids, never in shadowed cards.

## Shapes

Square corners on every rectangle: buttons, header, grids, checkboxes, HUD. Structure is drawn with 2px ink (or white on dark) rules; row dividers drop to 1px at 20 to 25% opacity. Circles are the second shape and are reserved for space objects: patches, orbit ellipses (dashed 3/9), transmit rings, the planet, and the live status dot.

## Components

### Buttons
Stencil hardware: heavy, square, uppercase.
- **Shape:** square (0 radius).
- **Primary:** ink field, pad text, display caps at 1.25rem, 16px / 20px padding, leading icon and trailing up-right arrow.
- **Hover / Focus:** field flips to Fuselage Red over 300ms on the expo ease; the trailing arrow nudges up-right. Focus is a 3px flight-blue outline at 3px offset. On a red field the primary inverts to pad on hover instead.
- **Outline:** 2px ink border, transparent field, fills ink on hover.

### Navigation
Ink bar, 48px tall. Stencil wordmark "KKH-1" left with the "-1" in red. Desktop links are display caps that invert to a pad block on hover; under 768px the links collapse to a single red "Mail" button.

### Mission Patch (signature)
Authored SVG roundel: ink disc, dashed pad stitch ring, red or blue inner field alternating by index, a tilted orbit ellipse, stencil initials, the product name on the top arc in display caps, "MISSION YYYY" in mono on the bottom arc. Live products render at 224 to 256px with a red transmit ring; launched ones at 112 to 128px. Patches counter-rotate gently with scroll. Hovering or focusing one patch dims its siblings to 22% opacity and 20% saturation.

### Telemetry Strip
A three-column definition list between 2px ink rules top and bottom, columns split by 2px ink rules; mono label over a 2.25rem display numeral.

### Checklist
Skill and tech lists: a 14px square with a 2px ink border holding a 6px red pip, then the item at 15px. Groups sit in a 2px-gap ink grid on pad.

### Ruled Rows
Archive rows and flight-log entries: full-width rows on 1px rules under a 2px head rule. Archive rows invert to a white block with ink text on hover; flight-log rows lead with a red two-digit mono index.

### Altitude Profile
A single cubic path drawn with `pathLength` tied to scroll, 4px stroke over a 25% ghost, dashed horizon lines, four stage markers, and a three-part SVG rocket that drops stages at each third of the scroll.

## Do's and Don'ts

### Do:
- **Do** move from pad to vacuum as the page scrolls; let each section's ground color say how high it is.
- **Do** set every section headline in Big Shoulders Display 900, uppercase, leading 0.85 to 0.9.
- **Do** use mono with tabular numerals for every date, count, and status.
- **Do** draw structure with 2px ink rules and 2px-gap grids.
- **Do** author new imagery as SVG in the patch/rocket vocabulary; do not present placeholders as screenshots.
- **Do** use Signal Coral, not Fuselage Red, for red text on vacuum.
- **Do** honor reduced motion: no lift, spin, flame, or transmit ring when it is requested.

### Don't:
- **Don't** round rectangles. Circles are for space objects only.
- **Don't** put UI in shadowed cards or add hard offset shadows.
- **Don't** introduce colors outside the spot palette for fields or type.
- **Don't** place a mono caption or status kicker above a headline as decoration.
- **Don't** use vacuum on the first viewport.
