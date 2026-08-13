# Handoff: timeandprice — landing / day view

## Overview
Single-page personal time-tracking interface. A full-viewport hero (wordmark over an animated ink-particle golden-ratio spiral) followed by a "day view": a 24-hour timeline bar, an activity list with per-block monetary value (duration x hourly rate), and a day totals card.

## About the Design Files
The files in this bundle are **design references written in HTML** — a prototype showing the intended look, motion and behavior. They are **not production code to copy directly**. Recreate these designs in the target codebase using its existing framework and patterns (React/Next, Vue, SwiftUI, etc.). If no codebase exists yet, pick the most appropriate framework and implement there.

`timeandprice-landing.dc.html` is authored for a component runtime that expects a template + a logic class; treat the template markup as the reference DOM structure and the logic class as the reference data/behavior layer. Inline styles in the template are intentional to that runtime — in a real codebase move them to whatever styling system is in use.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, easing and animation timings. Recreate pixel-close using the codebase's own component library where equivalents exist.

## Screens / Views

### 1. Hero (full viewport)
- **Purpose:** brand moment; entry point to the day view.
- **Layout:** `<section>`, `height:100vh; min-height:680px; overflow:hidden`, flex column, centered both axes, `position:relative`.
- **Background art layer:** absolutely positioned `inset:0`, flex-centered, `pointer-events:none`. Contains a square box `width/height: min(96vh, 1000px)` holding `assets/spiral-particles.svg` at `filter:invert(1)`, layer `opacity:0.5`.
  - Two-layer CSS mask (composited `intersect` / `-webkit-mask-composite:source-in`):
    1. `linear-gradient(180deg, transparent 2%, #000 26%, #000 60%, transparent 92%)` — fades into the page top and bottom.
    2. `radial-gradient(58% 34% at 50% 62%, transparent 0%, rgba(0,0,0,0.18) 46%, #000 82%)` — clears dust from the band behind the tagline/button.
- **Header (fixed):** `padding:22px 40px`, `backdrop-filter:blur(14px)`, background `linear-gradient(#101011f5, #10101100)`. Left: the glyph `φ` (24px, weight 300, color #dcd9df). Right: nav link "the day" (12px, weight 300, letter-spacing 0.16em, #a19ea7 → #dcd9df on hover).
- **Wordmark (h1):** text `timeandprice`, each letter its own inline-block `<span>`. `font-size: clamp(38px, 8vw, 104px)`, weight 200, letter-spacing 0.16em, `text-indent:0.16em`, line-height 1, color #dcd9df; the letters `a n d` are accent-colored (#7c8798). Rendered as a flex row.
- **Tagline (p):** "Every hour of your day, logged and priced. See where the time went, and what it was worth." — max-width 520px, 15px/1.75, weight 300, letter-spacing 0.03em, color #a19ea7, margin-top 30px.
- **Button:** "See a day" → `#preview`. `padding:13px 30px`, `border-radius:999px`, `1px solid rgba(255,255,255,0.16)`, color #c5c2cb, 13px/weight 300, letter-spacing 0.1em. Hover: border `rgba(124,135,152,0.55)`, color #7c8798, 340ms.
- **Scroll hint:** bottom 44px, centered. Label "SCROLL" (10px, weight 300, letter-spacing 0.34em, #7c7982) above a 1px x 46px vertical rule, `linear-gradient(#dcd9df, transparent)`.

### 2. Day view (`#preview`)
Max-width 1120px, centered, `padding:150px 32px 130px`.
- **Eyebrow:** "TUESDAY, 12 AUGUST" — 10px, weight 400, letter-spacing 0.34em, accent #7c8798.
- **Heading (h2):** "Where the day went." — `clamp(30px, 4.2vw, 48px)`, weight 200, color #dcd9df, margin-top 20px.
- **Sub (p):** "One continuous timeline, priced at $50 an hour. Nothing to start, nothing to stop." (rate is data-driven) — max-width 460px, 14px/1.7, weight 300, #a19ea7.
- **Timeline card** (margin-top 64px): `padding:34px 34px 26px`, `border:1px solid rgba(255,255,255,0.09)`, `border-radius:20px`, background `rgba(255,255,255,0.045)`, `backdrop-filter:blur(6px)`.
  - Axis labels row: 00:00 / 06:00 / 12:00 / 18:00 / 24:00 — space-between, 10px, weight 300, letter-spacing 0.2em, #7c7982, margin-bottom 14px.
  - Track: `height:44px; border-radius:8px; background:rgba(255,255,255,0.06); overflow:hidden; position:relative`.
  - Blocks: absolutely positioned, `left = start/24*100%`, `width = duration/24*100%`, `transform-origin:left center`. `title` = activity label.
  - Legend: flex, gap 22px; 9x9px swatches (radius 2px) + 11px/weight 300 labels (#a19ea7): "deep work", "meetings & admin", "unbilled".
- **Two-column grid** (margin-top 26px, `minmax(0,1.65fr) minmax(0,1fr)`, gap 26px, align-items start):
  - **Activity list card:** same surface treatment as the timeline card, `padding:10px 0`. Each row is a grid `58px 84px minmax(0,1fr) auto`, gap 16px, `padding:17px 28px`, `border-bottom:1px solid rgba(255,255,255,0.06)`; hover background `rgba(124,135,152,0.06)` over 340ms.
    - col 1 start time — 11px, weight 300, letter-spacing 0.09em, #7c7982, tabular-nums
    - col 2 a 3x22px rounded color bar (the block's fill) + duration — 13px, weight 400, #dcd9df, tabular-nums
    - col 3 label — 13px, weight 300, #a19ea7, line-height 1.4
    - col 4 price — 13px, weight 400, tabular-nums; billable #c4cad3, non-billable em dash in #6a6771
    - Footnote row: "Lunch is tracked but not billed." — 11px, weight 300, #7c7982, `padding:18px 28px 12px`.
  - **Totals card:** `border:1px solid rgba(124,135,152,0.32)`, radius 20px, `padding:32px 30px`, background `rgba(255,255,255,0.045)`, `box-shadow:0 22px 60px rgba(0,0,0,0.5)`.
    - "DAY TOTAL" — 10px, weight 400, letter-spacing 0.3em, #7c8798
    - Amount — 54px, weight 200, letter-spacing 0.01em, #dcd9df, tabular-nums, line-height 1, margin-top 26px (counts up on reveal)
    - Sub: "8h 15m billable of 9h tracked" — 13px, weight 300, #a19ea7
    - 1px divider `rgba(255,255,255,0.09)`, margin 28px 0
    - Four label/value rows, gap 16px, 12px: Rate ("$50 / hr"), Deep work ("4h 35m"), Meetings ("1h 45m"), Admin & switching ("1h 55m"). Labels #a19ea7, values #dcd9df tabular-nums.
    - Chip: `padding:14px 16px`, radius 12px, background `rgba(124,135,152,0.10)`, 12px/1.6, #bbb8c1: "Week to date: $1,897.50 across 4 clients." — the amount in #c4cad3, also counted up.
- **Footer:** `padding:34px 40px`, `border-top:1px solid rgba(255,255,255,0.08)`, space-between, 11px, weight 300, letter-spacing 0.16em, #7c7982. Left "timeandprice" (14px, letter-spacing 0.3em), right "© 2026".

## Interactions & Behavior

### Hero entrance (on load, all `cubic-bezier(0.22, 1, 0.36, 1)`)
1. Wordmark letters: 760ms each, staggered 20ms per letter — `opacity 0→1`, `scale(0.92)→1`, `translateY(7px)→0`, `blur(5px)→0`.
2. Spiral art: 1400ms, delay 700ms — `opacity 0→1`, `translateY(-7vh)→0`, `scale(0.965)→1`.
3. Tagline 900ms @1700ms, button row 900ms @1850ms, header 800ms @2000ms, scroll hint 900ms @2200ms — all fade + 16px rise.

### Living motion (hero only)
- Breathing: `scale(1) → scale(1.02)`, 5000ms, `ease-in-out`, infinite, starts at 2200ms.
- Rotation: the spiral image rotates on its own axis, `rotate(0deg) → 360deg`, **120s linear infinite** (deliberately very slow).
- Particle twinkle: inside the SVG, three dot groups animate opacity on 7s / 9s / 11s ease-in-out loops (ranges .62–.92, .72–.96, .58–.86).
- The spiral is hero-only: the section has `overflow:hidden` and the art is absolutely positioned inside it, so it scrolls away and never appears in later sections.

### Scroll reveals (IntersectionObserver, threshold 0.12, rootMargin `0px 0px -8% 0px`, unobserve after firing)
- Elements start at `opacity:0; transform:translateY(20–22px)` and transition to `opacity:1; translateY(0)` over 620–660ms `cubic-bezier(0.22,1,0.36,1)`, staggered by transition-delay (0 / 100 / 120 / 180 / 200 / 240ms).
- On the timeline card's reveal, each bar block animates `scaleX(0) → scaleX(1)`, 620ms same easing, staggered 80ms per block.
- On the totals card's reveal, the money figures count up: requestAnimationFrame over 1200ms with ease-out cubic `1-(1-p)^3`, from 0 to the final value; the formatted string is re-rendered each frame.
- No carousels, sliders, or parallax anywhere. Reduced-motion users should get the end state with no entrance/loop animation.

## State Management
- `count` (0→1): count-up progress for the totals card; drives `totalPrice` and `weekLabel`. Guarded so it only ever runs once.
- IntersectionObserver instance + rAF handle, both torn down on unmount.
- Derived per render from the day data and `hourlyRate`: rows (start, duration label, label, fill, price, price color), bar blocks (left %, width %, fill, stagger delay), legend, `rateLabel`, `totalPrice`, `trackedLabel`, `billableLabel`, `deepLabel`, `weekLabel`.
- Configurable inputs exposed as props: `hourlyRate` (number, default 50) and `goldAccent` (accent hex, default #7c8798).

## Data (dummy, in the logic class)
Rate $50/hr. Durations are formatted `Xh MMm`; money `en-US` with 2 decimals.

| start | end | label | kind | billable |
|---|---|---|---|---|
| 09:00 | 11:15 | deep work — Meridian rebrand | deep | yes |
| 11:15 | 12:00 | email & admin | admin | yes |
| 12:00 | 12:45 | lunch | off | **no** |
| 12:45 | 14:30 | client call — Northbank | meet | yes |
| 14:30 | 15:00 | context switching | admin | yes |
| 15:00 | 17:20 | deep work — build & review | deep | yes |
| 17:20 | 18:00 | planning tomorrow | admin | yes |

Totals: 9h 00m tracked, 8h 15m billable → $412.50. Week-to-date figure = day billable x rate x 4.6.

## Design Tokens

**Color**
| token | value | use |
|---|---|---|
| bg | `#101011` | page background |
| header scrim | `#101011f5 → #10101100` | fixed header gradient |
| text primary | `#dcd9df` | wordmark, headings, values |
| text secondary | `#a19ea7` | body copy, labels |
| text tertiary | `#7c7982` | axis labels, footnotes, footer |
| text quaternary | `#6a6771` | non-billable dash |
| text on accent | `#151218` | (reserved for filled buttons) |
| accent | `#7c8798` | pewter accent |
| accent light | `#c4cad3` | prices, hover text |
| accent dark | `#3f4653` | gradient end |
| accent gradient | `linear-gradient(120deg,#c4cad3 0%,#7c8798 50%,#3f4653 100%)` | deep-work blocks |
| accent gradient soft | `linear-gradient(120deg, rgba(196,202,211,0.40), rgba(63,70,83,0.34))` | admin/meeting blocks |
| neutral block | `rgba(255,255,255,0.14)` | unbilled block |
| surface | `rgba(255,255,255,0.045)` | cards |
| surface subtle | `rgba(255,255,255,0.035)` | secondary cards |
| hairline | `rgba(255,255,255,0.09)` | card borders |
| hairline soft | `rgba(255,255,255,0.06)` | row dividers, track bg |
| border strong | `rgba(255,255,255,0.16)` | outline button, input |
| accent hairline | `rgba(124,135,152,0.32)` | totals card border |
| row hover | `rgba(124,135,152,0.06)` | activity row hover |
| chip bg | `rgba(124,135,152,0.10)` | week-to-date chip |
| shadow | `0 22px 60px rgba(0,0,0,0.5)` | totals card |

**Paper grain:** a fixed full-viewport `body::before` layer at `opacity:0.32`, `pointer-events:none`, filled with an inline-SVG `feTurbulence` (`fractalNoise`, baseFrequency 0.85, 2 octaves, desaturated, rect opacity 0.2, 180x180 tile).

**Typography** — DM Sans (Google Fonts, weights 200/300/400/500), `-webkit-font-smoothing:antialiased`; `font-variant-numeric: tabular-nums` on every number.
| role | size | weight | tracking |
|---|---|---|---|
| wordmark | clamp(38px, 8vw, 104px) | 200 | 0.16em |
| h2 | clamp(30px, 4.2vw, 48px) | 200 | normal |
| big amount | 54px | 200 | 0.01em |
| body | 14–15px / 1.7–1.75 | 300 | 0.02–0.03em |
| row value | 13px | 400 | — |
| label / eyebrow | 10–11px | 300–400 | 0.16em–0.34em |

**Radius:** 999px (pills), 20px (cards), 12px (chip), 8px (timeline track), 2–3px (swatches).
**Spacing:** section padding 150/130px vertical, 32px gutters; card padding 32–34px; row padding 17px 28px; grid gaps 16 / 22 / 26px.
**Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for everything; loops use `ease-in-out`; durations 320–660ms for UI, 760–1400ms for entrance, 5s/120s for loops.

## Assets
- `assets/spiral-particles.svg` — generated artwork (not stock): a logarithmic golden-ratio spiral, `r = a·e^(bθ)` with `b = ln(φ)/(π/2)`, ~3.3 turns, drawn as one 0.9px hand-line plus ~2,750 ink dots scattered along three arms with radial/angular jitter and outward-increasing density. Fill `#141414`, so it is inverted in CSS (`filter:invert(1)`) for the dark theme; viewBox `-215 -275 430 560`, centered on the spiral's eye. Twinkle keyframes live inside the SVG. Regenerate at other densities if needed, or ship as-is.
- No other images, no icon set, no third-party UI library.

## Files
- `timeandprice-landing.dc.html` — the full design reference (template + logic class + configurable props).
- `assets/spiral-particles.svg` — the hero artwork.
