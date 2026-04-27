WORKOUT TRACKER V2 — UI DESIGN REFERENCE
==========================================
> Last touched: 2026-04-26 — split into four documents (this file: principles, direction, brainstorm, decisions)

Purpose: Establish UI standards before build begins. Brainstorm visual features and ideas,
note what aligns with current plans and what changes each idea would require.
This is a living document — update as decisions are made or ideas surface.
Refer to coreprocess.md and follow the fundamental philosophy behind the current task and project as a whole,
across all stages of development.

Cross-reference:
  - design-tokens.md       (colors, typography, spacing — the lookup tables)
  - component-standards.md (alignment, buttons, components, interactions — the build specs)
  - future-ui.md           (post-MVP UI ambitions: AI search, voice, light mode)
  - master-schematics.md   (layout contracts)
  - all tab schematics     (component specs)

---

TABLE OF CONTENTS
------------------
  1. Core UI Principles
  2. Locked Layout Contracts
  3. Design Direction & Theme
  4. UI Ideas Brainstorm
  5. Open Design Questions
  6. Decisions Locked

---

1. CORE UI PRINCIPLES
----------------------
These are derived from coreprocess.md and user goals. Every design decision should be
checked against this list before being accepted.

  CLARITY FIRST
    Every element must be immediately obvious — no learning curve.
    If a user has to wonder what a button does, it has failed.
    Use contrast + size + label together, never rely on color alone to communicate state.

  ANTI-CLUTTER
    This app exists because competitors are too busy.
    Every element on screen must justify its presence.
    When in doubt, remove it.

  GYM CONTEXT
    Users are at the gym — sweaty hands, bright lighting, mid-set.
    Tap targets must be unambiguous. Text must be readable at a glance.
    No interaction should require precision or concentration.

  MOBILE FIRST
    Design for thumb reach zones before mouse hover.
    Every interaction pattern assumes a phone in one hand.

  ALL AGES
    No pattern recognition required for trendy interactions.
    Icons always paired with labels. Generous spacing. High contrast.
    Nothing that looks or feels like a social media app.

  POLISHED AND PREMIUM
    Feels like a quality tool, not a rushed MVP.
    Consistent rules applied everywhere — no one-off treatments.
    Every state is designed: empty, error, loading, completion. Nothing left blank.
    Gold accent used sparingly — it feels premium precisely because it's rare.

  TOOL, NOT SOCIAL APP
    No gamification or vanity metrics on primary surfaces.
    Future: rankings/leaderboards for exercises are a known future feature (not MVP).
    The experience is about the user's own performance, not comparison.

  MULTIMODAL READY
    Every primary action must be reachable by tap, by voice, and (post-MVP) by AI command.
    Where modalities differ in confirmation pattern, document it.
    The user should never have to choose a modality based on what works — only on what's
    faster in the moment.
    See future-ui.md for AI search and voice planning.

  PORTFOLIO LEGIBILITY
    This codebase is public and read by recruiters. Code structure must be self-explanatory.
    - Use distinctive, descriptive file and folder names — not generic (App.js, utils.js, helpers.ts)
    - Clear folder organization that communicates purpose at a glance
    - Comments explaining non-obvious decisions (why, not what)

  MVP DISCIPLINE
    If it requires a schema change, it is post-MVP by default.
    Exceptions can be made for changes that are important enough — evaluate explicitly.

---

2. LOCKED LAYOUT CONTRACTS
----------------------------
From master-schematics.md. Non-negotiable for MVP.

  - Mobile-only: 480px max-width, centered on larger screens
  - Bottom navigation bar: 4 tabs — Logs | Programs | Statistics | Profile
  - Bottom nav hidden on /login and /signup
  - WorkoutFAB: floating action button, global, bottom-right
  - CSS Modules: scoped per component, no global class conflicts
  - No explicit save buttons (except WorkoutDetailPage edit mode)
  - Modals for all destructive actions and multi-step flows
  - Inline validation errors — field stays editable, error clears on valid input

---

3. DESIGN DIRECTION & THEME
-----------------------------

  OVERALL DIRECTION
    Clean, fast, focused. Feels like a precision tool, not a social app.
    The user is at the gym — the interface must get out of their way.
    Dark mode primary. Premium. Uncluttered.

  NATURE — SUBTLE UNDERLYING THEME (confirmed direction)
    The app's color language evokes the natural world:
      dark backgrounds  → forest floor at night, deep canopy
      green accent      → living leaf, fresh growth
      gold accent       → sunlight, warmth, achievement
      white             → clean light, clarity
      red               → embers, berries — danger, not traffic sign

    What this means in practice:
      - Color choices lean organic, not synthetic or corporate
      - Surface colors carry a subtle warm undertone (barely visible, felt not seen)
      - The palette as a whole reads "grounded" not "cold tech"

    What it does NOT mean:
      - No leaf icons, grass textures, or decorative nature motifs
      - The app is still a clean functional tool
      - The theme is felt through color, not illustrated

    Pros:
      + Distinctive in the fitness app market (competitors use blue, orange, red)
      + Appeals to a broad age range — warm and inviting without being trendy
      + Subtle enough not to conflict with clarity-first principle
      + Green + gold is a premium pairing; feels intentional

    Cons:
      - Green is also a universal UI "success" signal — requires strict semantic discipline
        to avoid confusion between "primary action" (green button) and "success state" (also green)
      - Could be misread as a wellness/yoga app rather than a serious lifting tracker
        — mitigated by the overall clean, tool-like design language

  LIGHT / DARK MODE
    Dark mode primary — gym lighting, battery, modern feel
    Light mode: post-MVP (palette already locked in design-tokens.md, implementation deferred)

  TYPOGRAPHY APPROACH
    System font stack — native feel, zero load cost, renders with OS-level polish
      iOS:     -apple-system, SF Pro
      Android: Roboto
      Fallback: Segoe UI, sans-serif
    No decorative fonts. Legibility at a glance is the only criterion.
    See design-tokens.md for the type scale.

---

4. UI IDEAS BRAINSTORM
-----------------------
Tagged by implementation status:

  [ALIGNED]   — fits current spec, no changes needed
  [ADDITIVE]  — adds UI only, no schema or service changes needed
  [REQUIRES]  — needs spec/schema changes before implementing
  [POST-MVP]  — known future feature; tracked here, not built yet

  VISUAL FEEDBACK
    [ALIGNED]   Unit label beside every weight input (lb/kg) — Decision #23
    [ALIGNED]   Inline validation errors on inputs — Decision #11
    [ALIGNED]   "In Progress" badge on workout cards
    [ADDITIVE]  Subtle animation when a set is saved — set row briefly flashes gold (achievement color)
    [ADDITIVE]  FAB pulse animation when workout is active — draws attention to Resume Workout
    [REQUIRES]  FAB as intra-workout tool hub — during active workout, FAB stays visible and opens a radial/popover menu with quick-access tools (rest timer, notes, swap exercise, workout timer). Replaces current hidden state with a contextual action launcher. Needs: F5 (rest timer), tool menu component, FAB state machine (idle/open/disabled)
    [ADDITIVE]  Progress indicator on active workout — "X of Y exercises logged" or simple bar
    [REQUIRES]  Set completion checkmark — needs isCompleted on logSets

  NAVIGATION AND LAYOUT
    [ALIGNED]   Bottom nav with 4 tabs
    [ALIGNED]   "← Back" button top-left on all sub-pages
    [ADDITIVE]  Sticky section headers in Logs history (Today / Yesterday / etc.)
    [ADDITIVE]  Pull-to-refresh on Logs and Programs list pages
    [ADDITIVE]  Empty state illustrations — Lucide icon + hint text on all empty states
    [REQUIRES]  Swipe-to-delete on log cards or exercise rows — needs gesture handling spec

  ACTIVE WORKOUT SCREEN
    [ALIGNED]   Column header row above first set: "Best | lbs | reps" — static labels; Best shows previous weight × reps or "—"
    [ALIGNED]   Finish + Discard buttons fixed at bottom
    [ADDITIVE]  Set row auto-scroll — page scrolls to newly added set after "+ Add Set"
    [POST-MVP]  Workout timer in header — elapsed time since startedAt; cosmetic only (OD5)
    [ADDITIVE]  Keyboard dismissal — tap outside input closes keyboard without triggering auto-save
    [REQUIRES]  Rest timer between sets — needs timer state, sound/vibration; full spec needed (F5)
    [REQUIRES]  Set completion indicator — needs isCompleted on logSets (F2)

  PROGRAMS / TEMPLATE SCREENS
    [ALIGNED]   Target line tappable → Edit Targets Modal — G2
    [ALIGNED]   "bodyweight" shown when targetWeight = 0
    [ADDITIVE]  Workout card shows muscle group chips based on exercises (e.g. "Chest · Shoulders")
                — derivable via `getExerciseGroup(exercise)` at display time (Decision #28), no schema change
    [ADDITIVE]  Program card color accent or icon — visual distinction (post-MVP branding)
    [REQUIRES]  Drag-to-reorder exercises within workout — needs reorder UX (service already specced)
    [REQUIRES]  Drag-to-reorder workouts within program — same pattern

  FINISH FLOW
    [ALIGNED]   "Save to program?" Modal — Decision #17
    [ALIGNED]   "Update [Workout Name]?" Modal — Decision #19
    [POST-MVP]  Workout summary screen before navigating to /logs (OD4)
                — sets logged, duration, exercises; derivable from existing data; gold highlight moment
    [ADDITIVE]  Celebration moment on workout finish — gold flash or brief animation; no spec change

  PROFILE / SETTINGS
    [ALIGNED]   Imperial / Metric toggle — Decisions #22, #23
    [ADDITIVE]  Unit preference reminder on first workout if profile incomplete
    [POST-MVP]  Light mode toggle — palette locked in design-tokens.md; implementation post-MVP
    [REQUIRES]  Body weight entry history — needs new table; post-MVP

  POST-MVP MODALITIES (see future-ui.md for full specs)
    [POST-MVP]  AI search assistant — in-app questions, navigation, optional log-by-command
    [POST-MVP]  Voice command capabilities — push-to-talk for logging and querying
    [POST-MVP]  Rankings / leaderboards for exercises

---

5. OPEN DESIGN QUESTIONS
--------------------------
Resolve before building the affected component.

  OD6 — CSS button standards / design token system
        Status: PENDING — needs brainstorm session
        Task: Encode the rules in component-standards.md (buttons, inputs, cards) and the
        scales in design-tokens.md as CSS custom properties on :root, so future components
        reference variables instead of hardcoded values. Goal: consistency is automatic, not
        manual; light mode becomes a single [data-theme] override instead of a refactor.
        Block: do not enforce until decision is locked here.

  OD1 — Accent color
        Status: LOCKED — dark mode: #3BAF6A (Leafy Mid) / light mode: #2D9F58 (Deeper Leafy)
        Rationale: brighter green has better contrast on dark surfaces; darker green has
        better contrast on white. Full candidate analysis in design-tokens.md.

  OD2 — Icon set
        Status: LOCKED — Lucide
        Reason: MIT license, tree-shakeable, consistent 2px stroke weight, works at small sizes

  OD3 — Border-radius hierarchy
        Status: LOCKED — 8px inputs / 12px cards / 16px modals
        Reason: different radii encode component type, establishes clear visual hierarchy

  OD4 — Workout summary screen at finish
        Status: LOCKED — post-MVP
        Deferred: keep the finish flow clean for MVP; summary screen is an iteration feature

  OD5 — Elapsed workout timer on active screen
        Status: LOCKED — post-MVP
        Deferred: cosmetic only, but adds scope; revisit in first iteration after MVP ships

---

6. DECISIONS LOCKED FROM THIS DOCUMENT
-----------------------------------------

  Nature theme       — subtle underlying theme confirmed; felt through color, not illustrated
  Semantic colors    — Green=action, Gold=achievement, Red=danger, White=content
  Red usage          — strictly delete / warning / alert / destructive; never decorative
  Gold value         — #D4A853 (hover: #C09040); used sparingly for completion/achievement only
  White              — #FFFFFF primary text
  Icon set           — Lucide (MIT, tree-shakeable, consistent stroke)
  Border-radius      — 8px inputs / 12px cards / 16px modals
  Page transitions   — slide for drill-down, instant for tab switches
  Error surface      — global top banner on DB failure, danger color, dismissable
  Auth page layout   — full-screen dark, centered Surface card, unit pref as two-button toggle
  Loading states     — no spinner/skeleton; render empty state directly
  Safe area          — env(safe-area-inset-top/bottom) on app shell and bottom nav
  Social features    — rankings/leaderboards are a known future feature, not MVP
  Multimodal ready   — tap, voice, AI command must all reach every primary action (post-MVP)
