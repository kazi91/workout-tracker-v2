WORKOUT TRACKER V2 — DESIGN TOKENS
====================================
> Last touched: 2026-04-26 — extracted from UIdesign.md (color, typography, spacing)

Purpose: Flat lookup tables for color, typography, and spacing. This is the reference
when coding — no narrative, no rationale beyond what's needed to apply the value.
Rationale and brainstorming live in UIdesign.md.

Source of truth: when these values are encoded as CSS custom properties (OD6), this
document and the CSS file must stay in sync. Update both, or neither.

Cross-reference: UIdesign.md (principles, theme, decisions), component-standards.md
(how these tokens compose into components)

---

TABLE OF CONTENTS
------------------
  1. Color System
     1a. Semantic Color Roles (locked)
     1b. Background & Surface Palette — Dark Mode (locked)
     1c. Green Accent — Locked (OD1)
     1d. Light Mode Palette (post-MVP, values locked)
     1e. Two-Accent System (green + gold)
     1f. Rejected Color Options
  2. Typography Scale
  3. Spacing System

---

1. COLOR SYSTEM
----------------

  1a. SEMANTIC COLOR ROLES (locked)
  -----------------------------------
  Each color has one job. No exceptions — mixing roles creates ambiguity.

    GREEN   — Action / Interactive
              Buttons, active tab indicator, focus rings, links, interactive states.
              "Tap here. This is active."

    GOLD    — Achievement / Completion
              Workout finish moments, set-saved flash, completion badges, summary screen highlights.
              Used sparingly — its rarity is what makes it feel earned.
              "You did it."

    RED     — Danger / Warning / Destructive
              Delete, Discard, alerts, warnings, error borders, destructive modal actions.
              Strictly limited to these cases. Never decorative.
              "Stop. Be sure."

    WHITE   — Content / Clarity
              Primary text, icons on colored surfaces, labels.
              "Read this."

  1b. BACKGROUND & SURFACE PALETTE — DARK MODE (locked)
  ------------------------------------------------------
  Warm undertone applied throughout. Supports nature theme.

    Background:     #0F0F0F  — near-black (not pure black — easier on eyes)
    Surface:        #1A1A17  — cards, modals, input backgrounds
    Surface raised: #242420  — elevated cards, active states
    Border:         #2E2E29  — subtle dividers, input outlines

    Text primary:   #FFFFFF  — headings, card titles, interactive labels
    Text label:     #C0C0C0  — card subtitles and content descriptors that must be readable
                              (e.g. "Bench · OHP · Triceps", exercise targets, in-card timestamps)
    Text secondary: #8A8A8A  — placeholders, hints, truly de-emphasized info only
    Text disabled:  #4A4A4A  — non-interactive states only

    Danger:         #E05555  — destructive actions (Delete, Discard)
    Danger hover:   #C94444

    Gold:           #D4A853  — achievement / completion moments
    Gold hover:     #C09040

    Green accent:   #3BAF6A  — see 1c below

  1c. GREEN ACCENT — LOCKED (OD1)
  ----------------------------------
  Decision: dark mode #3BAF6A (Leafy Mid) / light mode #2D9F58 (Deeper Leafy).
  Rationale: brighter green clears contrast on dark surfaces; darker green clears contrast on white.
  Candidate analysis preserved below for reference.

  CANDIDATE B: #3BAF6A  "Leafy Mid"  (selected for dark mode)
    Character: Natural leaf green, warm, organic, fresh leaf in daylight.

    Pros:
      + Higher contrast on dark background — clears WCAG AA (4.5:1) for normal text
      + Readable at 12px (tab labels, badges) without adjustment
      + Warmer tone supports the nature theme
      + Less saturated than A — doesn't feel synthetic or manufactured
      + Pairs naturally with gold without competing

    Cons:
      - More saturated than C — could edge toward "garden center" rather than "deep forest"
      - Slightly less premium/moody feel compared to C

  CANDIDATE C: #2D9F58  "Deeper Leafy"  (selected for light mode)
    Character: Richer, more grounded, leans "looking into a canopy."

    Pros:
      + Deeper, richer tone — stronger premium/moody feel
      + Stronger nature association — reads more "forest" than "park"
      + More distinctive and less common in UI design

    Cons:
      - Lower contrast at small sizes — may fall below 4.5:1 at 12px on #0F0F0F
      - Active tab labels (12px) may need a lightened variant to stay readable
      - Slightly less warm than B — edges toward cool if not paired carefully with gold

  SURFACE WARM TINT — LOCKED (applied in 1b)
    Warm undertone confirmed after visual test. Applied to Surface, Surface raised, Border.
    Effect is cumulative — felt as "grounded" rather than "cold tech" without being obvious.

  1d. LIGHT MODE PALETTE (post-MVP — values locked, implementation deferred)
  ---------------------------------------------------------------------------
  Nature-themed light mode. Background tinted warm green-white, not clinical white.
  Green and gold darken for contrast on light surfaces.

    Background:       #F4F7F4  — warm green-white (morning fog on grass)
    Surface:          #FFFFFF  — clean white cards
    Surface raised:   #EEF3EE  — subtle sage tint on elevated elements
    Border:           #D4DDD4  — warm grey-green
    Text primary:     #1A1A1A  — near-black with green undertone
    Text label:       #3A4A3A  — readable descriptors on light BG
    Text secondary:   #5A6A5A  — muted forest green for hints/placeholders
    Text disabled:    #A0ADA0
    Green accent:     #2D9F58  — must darken vs dark mode; #3BAF6A fails contrast on white
    Gold:             #B8860B  — must darken vs dark mode; #D4A853 washes out on white
    Danger:           #D03030  — slightly deeper red for light background

    Note: light mode toggle requires this palette + CSS variable swap. One-day implementation
    once MVP ships. Do not build until MVP is complete.

  1e. TWO-ACCENT SYSTEM (green + gold — confirmed in principle)
  --------------------------------------------------------------
  Using two intentional accent colors instead of one.

    Pros:
      + Semantic clarity — each color has one job, users learn the system quickly
      + Premium feel — gold reserved for achievement moments feels earned
      + Visually distinctive — no other fitness app uses this pairing
      + Nature theme cohesion — green (life) + gold (light) is a natural pair

    Cons:
      - Requires strict discipline — if gold appears outside achievement contexts, it becomes noise
      - More cognitive overhead to maintain consistency across components
      - Two accent colors to document, test, and apply correctly

  1f. REJECTED COLOR OPTIONS
  ----------------------------
  Do not re-propose these.

    Blue (#4F8EF7)
      Rejected: safe and clean but generic — every second fitness app uses blue.
      Does not support the nature theme.

    Electric green (#39FF14)
      Rejected: neon/tennis ball. Synthetic, harsh, inaccessible for all ages.
      Directly contradicts "clear, visible, premium" and nature theme.

    Warm orange (#F97316)
      Rejected: energetic but reads as warning/alert in most UI contexts.
      Would conflict with red's semantic role.

    Pure dark forest green (#1A4731, #1B4332)
      Rejected: too dark to use as an interactive element on a dark background.
      Falls well below contrast requirements.

---

2. TYPOGRAPHY SCALE
--------------------
Keep it tight — mobile screen, every pixel counts.

  Page title:     24px, weight 700
  Section header: 16px, weight 600
  Body / labels:  15px, weight 400
  Secondary text: 13px, weight 400
  Input text:     16px, weight 400   (16px prevents iOS auto-zoom on focus)
  Button text:    15px, weight 600
  Badge / tag:    12px, weight 500

  Line height:    1.4 for body, 1.2 for headings
  Letter spacing: default (no tight tracking — harder to read in motion)

  Font stack (locked — see UIdesign.md §3):
    iOS:      -apple-system, SF Pro
    Android:  Roboto
    Fallback: Segoe UI, sans-serif

---

3. SPACING SYSTEM
------------------
Base unit: 8px. All spacing is a multiple of 4px minimum, 8px preferred.
Err generous — cramped feels cheap, spacious feels premium.

  4px  — tight internal spacing (badge padding, icon gap)
  8px  — default inner padding, small gaps
  12px — input padding, card inner spacing
  16px — section padding, standard gap between elements
  24px — large section gap, modal padding
  32px — page top padding
  48px — bottom padding on scrollable pages (clears FAB and nav bar)
