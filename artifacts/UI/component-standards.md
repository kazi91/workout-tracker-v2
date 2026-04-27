WORKOUT TRACKER V2 — COMPONENT STANDARDS
==========================================
> Last touched: 2026-04-26 — extracted from UIdesign.md (alignment, buttons, components, interactions)

Purpose: Build specs for every component. This is the reference when building or
reviewing a screen. Pair with design-tokens.md for the underlying values.
Rationale and brainstorming live in UIdesign.md.

Cross-reference: UIdesign.md (principles, theme), design-tokens.md (color, type, spacing),
master-schematics.md (layout contracts), all tab schematics (component specs)

---

TABLE OF CONTENTS
------------------
  1. Alignment Standards
  2. Button Design Standards
  3. Component Standards
  4. Interaction Patterns

---

1. ALIGNMENT STANDARDS
-----------------------
Rule: alignment communicates structure. Use it deliberately, not decoratively.

  CENTER-ALIGNED
    Use when the screen has a single focal point and no competing elements.
      - Page titles (all pages)
      - Auth forms (login, signup)
      - Modal content
      - Empty state (icon + message + hint)
      - Completion / achievement moments (finish flow gold screen)

  LEFT-ALIGNED
    Use when content has multiple elements the user needs to scan or compare.
      - Card content (title, subtitle, metadata)
      - Exercise rows and set rows
      - List items
      - Input fields and their labels
      - Error messages (sit directly below their field)
      - Section headers / date dividers

  RIGHT-ALIGNED
    Reserved for contextual UI that belongs to the right edge.
      - FAB label ("Resume Workout")
      - Timestamps on list items when paired with left-aligned title
      - Badges on cards (right side of card header row)

  NEVER
    - Center body text inside cards — breaks scanning flow
    - Mix alignments within the same content block
    - Center error messages — they must read as attached to the field

---

2. BUTTON DESIGN STANDARDS
---------------------------
Ground rules for all buttons across the app. Every button decision should
trace back to one of these rules.

  HIERARCHY — four types, each with one job
  ------------------------------------------
    Text color rule: dark mode — white text on all filled buttons.
                     Light mode — text color TBD per button type (white, gold, or other as deemed fit).

    PRIMARY     — the main action on a screen or in a modal
                  Green fill. One per screen/modal. Never two primaries together.
                  Examples: "Start Workout", "Finish Workout", "Save", "Create Program"

    DESTRUCTIVE — irreversible or dangerous actions
                  Red fill. Always inside a confirmation modal — never fires directly.
                  Examples: "Delete", "Discard Workout", "Remove Exercise"

    SECONDARY   — supporting actions, cancellation, low-stakes choices
                  No fill. Border: 1.5px, border color.
                  Examples: "Cancel", "Keep Editing", "Skip", "Go Back"

    GHOST / INLINE — contextual actions embedded in a list or card
                  No fill, no border. Green text (if action) or text-label color (if neutral).
                  Smaller than full buttons — used for in-context add actions.
                  Examples: "+ Add Exercise"
                  Note: "+ Add Set" is full-width within the exercise card — green fill (not ghost)

  SIZE
  -----
    Standard height:   44px — non-negotiable minimum (thumb target)
    Ghost / inline:    36px — only in-card, never as a standalone CTA
    Width (mobile):    Full-width within its container (preferred)
                       Exception: side-by-side button pairs split container 50/50 with 8px gap
    Min width (future web/tablet): 120px with horizontal padding 20px

  TYPOGRAPHY
  -----------
    Font size:     15px
    Font weight:   600
    Case:          Title case ("Start Workout", not "START WORKOUT" or "start workout")
    No icons inside buttons unless the icon adds meaning (e.g. a play icon on "Start Workout")
    Icon + label:  icon left, 8px gap, label — never icon-only on a primary action

  TEXTURE & APPEARANCE
  ---------------------
    Border-radius:    8px — all button types
    Shadow:           none — flat design; FAB is the only element with a drop shadow
    Fill opacity:     100% active, 50% disabled — no in-between states
    No gradients:     solid fill only; keeps color semantic meaning clean
    No outlines on primary/destructive — fill communicates affordance
    Secondary border: 1.5px solid border color (#2E2E29 dark / #D4DDD4 light)

  STATES
  -------
    Default:    full color as specced above
    Pressed:    10% brightness decrease (darken fill or border)
    Disabled:   50% opacity, pointer-events: none, no hover/press effect
    Loading:    not used for MVP — auto-save is silent; no async button states needed yet

  GROUPING RULES
  ---------------
    Single action:     full-width, centered in its container
    Two actions:       side-by-side, 50/50 split, 8px gap
                       Primary always on LEFT, destructive/secondary on RIGHT
                       Exception: modal confirm pairs — destructive LEFT when it is the primary action
    Three+ actions:    stack vertically, full-width, 8px gap between each
                       Primary on top, secondary below, destructive last
    Never:             floating a secondary next to a primary without a container grouping them

  PLACEMENT
  ----------
    Page-level CTAs:   fixed to bottom of screen above nav bar (e.g. Finish / Discard)
    Form CTAs:         at the bottom of the form, full-width
    Modal CTAs:        at the bottom of the modal card, full-width
    In-card actions:   ghost/inline style, within the card padding

---

3. COMPONENT STANDARDS
-----------------------

  BUTTONS
    Primary (accent fill):   main actions — "Start Workout", "Save", "Finish Workout"
    Destructive (danger):    "Delete", "Discard" — always confirmed by Modal before firing
    Ghost / secondary:       "Cancel", "Keep Editing", "Skip" — outline or text, no fill
    Disabled state:          50% opacity, not interactive, no hover effect
    All buttons:             44px min height (thumb target), full width on mobile preferred, 8px border-radius

  INPUTS
    Height:           44px (thumb target)
    Border-radius:    8px
    Background:       Surface
    Border:           border color default, accent on focus, danger on error
    Font size:        16px — non-negotiable; below 16px triggers iOS auto-zoom on focus
    Unit label:       shown inline right of value (e.g. "135 [lb]")
    Error message:    12px danger color, appears below field, clears on valid input
    Placeholder:      text secondary color

  INPUTS — COMPACT VARIANT (set rows only)
    Use only inside ExerciseCard set rows where inputs are tightly grouped.
    Height:           36px
    Padding:          8px vertical (reduced from 12px — keeps visual size down; font stays 16px)
    Border-radius:    8px
    All other rules identical to standard input

  CARDS
    Background:       Surface
    Border-radius:    12px
    Padding:          16px
    Tap feedback:     Surface raised on press
    No box-shadows    (flat design — cleaner on dark backgrounds)

  MODALS
    Overlay:          rgba(0,0,0,0.7) backdrop
    Card:             Surface, 16px border-radius, 24px padding
    Max width:        360px, centered
    Always include:   explicit action button + cancel/dismiss option
    Destructive modals: no tap-outside-to-close (too easy to mis-tap)
    Non-destructive:  tap-outside closes (e.g. Edit Targets)

  BOTTOM NAV BAR
    Height:           56px + safe area inset (notch/home bar)
    Background:       Surface with top border
    Active tab:       accent color icon + label + 2px accent line above tab (top edge)
    Inactive tab:     text secondary color
    Icons:            Lucide (locked — see OD2), simple, single stroke weight
    Labels:           14px below icon (bumped from 12px — all-ages readability)
    Tab switches:     instant, no animation (native app convention)

  WORKOUT FAB
    Size:             52px circle (session 17)
    Background:       accent green
    Icon:             white play/resume icon (Lucide)
    Position:         inline center slot within BottomNav (session 17)
    Shadow:           subtle drop shadow (box-shadow: 0 2px 8px rgba(0,0,0,0.4); disabled state: none)
    States:           "Start Workout" (Logs tab, no active workout)
                      "Resume Workout" (all tabs, active workout)
                      disabled/inert (WorkoutDetailPage active mode — opacity 0.35, no onClick)
                      hidden (/login, /signup)

  BADGES
    "In Progress":    accent color background, white text
    Border-radius:    6px
    Padding:          2px 8px
    Font:             12px, weight 500

  ERROR BANNER (global)
    Position:         top of page, full width
    Color:            danger background, white text
    Content:          "Something went wrong — your data may not have saved."
    Dismissable:      yes — explicit close button
    Trigger:          IndexedDB write failure only (storage quota, Safari private mode, corruption)
    Not a toast:      no queue, no auto-dismiss timer — stays until user clears it

  SECTION DIVIDERS / DATE HEADERS
    Color:            text secondary
    Font size:        12px, weight 500, uppercase
    Margin:           16px top, 8px bottom

  AUTH PAGES (login / signup)
    Layout:           full-screen dark, centered form card (Surface color)
    App name:         bold at top of card, no logo for MVP
    No bottom nav, no FAB
    Unit preference step (signup): two-button toggle — Imperial | Metric (not a dropdown)

  EMPTY STATES
    All list pages require a designed empty state — never a blank screen.
    Structure: simple icon (Lucide) + primary message + hint text
    Copy defined in tab schematics:
      - Logs list empty: "No workouts recorded" (logs.md)
      - Programs list empty: defined in programs.md
      - Program with no workouts: "Add a workout first, or start a quick workout and save it to this program when you're done." (programs.md)
      - Workout with no exercises: "Add exercises to get started." (programs.md)
    Logs list empty state copy still needs to be confirmed in logs.md.

  SAFE AREA HANDLING
    App shell:        padding-top: env(safe-area-inset-top)
    Bottom nav:       padding-bottom: env(safe-area-inset-bottom)
    Full-screen modals: respect both insets

---

4. INTERACTION PATTERNS
------------------------

  Tap feedback:       all tappable surfaces respond immediately (background color shift)
  No hover states:    mobile-first — hover is secondary; add in web iteration
  Auto-save:          no spinner, no toast — silent; surface errors via global banner on failure
  Navigation:         bottom nav switches tabs (instant); "← Back" goes up one level only
  Page transitions:   slide-in from right on drill-down; slide-back on up-navigation
                      instant switch on bottom nav tab changes
  Scroll:             vertical only; no horizontal scroll; no carousels for MVP
  Keyboard:           numeric keypad for weight/reps inputs; text keyboard for names
  Focus management:   after modal opens, first input is auto-focused
  Keyboard / scroll:  active workout screen — scrollIntoView on input focus to keep field visible
                      all other pages — default browser behavior
  Loading states:     no spinner, no skeleton for MVP — Dexie reads are near-instant;
                      flash of loading state feels worse than rendering empty state directly
