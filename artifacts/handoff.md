# HANDOFF — NEW INSTANCE START HERE
Last updated: 2026-04-17 (session 25 — demo done, repo prepped for public)

---

## Read These Files First
Check **CLAUDE.md → CURRENT TASK** for session scope and required reading.
Always read `artifacts/recap.txt`. Read other files only as scoped by CURRENT TASK.

Full file index (reference — do not read all of these every session):
1. `artifacts/recap.txt`            — current state, decisions summary, next steps
2. `artifacts/master-schematics.md` — DB schema, service layer, all locked decisions, issue tracker
3. `artifacts/tabs/logs.md`         — Logs tab spec (user flows complete)
4. `artifacts/tabs/programs.md`     — Programs tab spec (user flow complete)
5. `artifacts/tabs/profile.md`      — Profile tab spec (placeholder — no flow for MVP)
6. `artifacts/tabs/statistics.md`   — Statistics tab spec (placeholder — no flow for MVP)
7. `artifacts/UIdesign.txt`         — UI standards, color palette, component specs, design brainstorm

---

## Project Info
- GitHub repo: https://github.com/kazi91/workout-tracker-v2 (private)
- CLAUDE.md active at project root (auto-loaded by Claude instances)
- .gitignore created at project root

---

## Build State
**Phase 3 Build is complete.** All 6 steps built, verified, and committed. UI polish pass complete. Demo delivered.
**Phase 4 — Testing & cleanup.** Post-demo file cleanup, then Vitest + RTL setup (D8) and unit test audit.

### What is built
- **Step 1** — Vite scaffold, Dexie schema (8 tables), 29 seed exercises, routing stubs, dark theme CSS variables
- **Step 2** — AuthService, AuthContext, AuthGuard, LoginPage, SignupPage (with unit preference toggle)
- **Step 3** — UserSettingsContext, ActiveWorkoutContext, units.ts helpers, ExerciseService, WorkoutLogService (partial), BottomNav, Modal, ExerciseSearchModal, WorkoutFAB (full visibility/hidden logic)
- **Step 4** — ProgramService, WorkoutService, WorkoutExerciseService; ProgramsPage, ProgramDetailPage, WorkoutTemplatePage (inc. Edit Targets Modal)
- **Step 5a** — LogExerciseService, LogSetService; WorkoutDetailPage active mode, ExerciseCard, SetRow
- **Step 5b** — WorkoutDetailPage finish flows: quick-start 4-step state machine, from-program sync modal
- **Step 5c** — WorkoutDetailPage read-only and edit modes; Delete Workout flow
- **Step 6** — UserService, ProfilePage (auto-save name/height/weight, unit toggle, logout), StatisticsPage placeholder

### UI polish pass (2026-04-10)
- Trash icons replace text Remove/Delete buttons throughout; set-delete changed to red X
- WorkoutTemplatePage button layout: shorter labels, auto-width centered, Start/Done/Delete row layout
- FAB centered (left: 50% / translateX); all 4 tab page titles standardized to 24px/700
- ProgramsPage "New Program" button moved below list; LogsPage empty state updated
- ProfilePage unit labels moved into label text ("Height (in)", "Weight (lb)")
- autocapitalize="words" on all name inputs across the app
- Bug fixes: from-program exercises now copy correctly on workout start; Save Edits reloads from Dexie; seed deduplication fix for React Strict Mode

### Active items (do not close without discussion)
- R3: Plain-text password — replace when backend is added
- P5: Charting library — decide before Statistics build in v2
- D5: ErrorContext — replace console.error with user-facing error surface
- D8: Unit tests — Vitest + RTL setup (Phase 4 first action)
- F1–F6, F8–F10: future features — see Issue Tracker
- OD6: CSS button token standards — brainstorm session pending before enforcing
- **Post-demo cleanup:** DONE (session 25) — demo-seed.js, PRESENTATION_AID.md, PRESENTATION_AID.html deleted; README.md created; repo public

### Resolved (record only — do not reopen)
- F7: Target weight display — resolved session 18 ("| top set: x lbs")
- All planning items P1–P4, P6–P9 — resolved during Phase 2
- All gaps G1–G3, G5–G7 — resolved during Phase 3 build
- All pre-build gaps D1–D4, D6–D7 — resolved before or during build
- B1: Dangling workoutId on program delete — resolved session 11

Do not re-open planning decisions unless the user explicitly raises them.

---

## Phase 4 Starting Point

First session: delete demo cleanup files, install Vitest + RTL, configure, write first test.

Priority test order:
1. WorkoutLogService (create, finish, delete cascade)
2. Finish flow state machine paths (all 4 quick-start paths + from-program sync)
3. Auth flow (signup → login → logout)
4. ActiveWorkoutContext initialization

Exit criteria: see recap.txt — PHASE 4 EXIT CRITERIA section.

---

## Recent Sessions (most recent first)

**Session 25 — 2026-04-17:** Demo complete. Repo prepped for public GitHub. Deleted demo-seed.js, PRESENTATION_AID.md, PRESENTATION_AID.html. Created README.md (demo link, tech stack, local setup, auth disclaimer, copyright). Added "Portfolio Legibility" principle to UIdesign.txt section 1 and handoff.md. Post-demo cleanup item closed.

**Session 21 — 2026-04-14:** F11: FAB no longer hidden on /logs/:id active workout page. Changed `return null` to a disabled/inert button render (styles.fabDisabled: opacity 0.35, pointer-events none, no onClick). Keeps nav center slot filled; future hook for intra-workout tool hub (see UIdesign.txt brainstorm). Updated Decision #15 + N1 in master-schematics.md.

**Session 20 — 2026-04-14:** Bug fix: ExerciseSearchModal category filter chips (Arms, Legs, Chest, etc.) were hidden behind the exercise results list on smaller viewports. Added `flex-shrink: 0` to `.chips` in ExerciseSearchModal.module.css so the chip row never collapses.

**Session 18 — 2026-04-10:** Target display "@ x lbs" → "| top set: x lbs" (F7 resolved). WorkoutTemplatePage doneBtn + deleteBtn flex: 1 fix. Issue Tracker: F7 resolved, F8/F9/F10 logged. OD6 added to UIdesign.txt (CSS button token standards). demo-seed.js created (not committed).

**Session 17 — 2026-04-10:** FAB moved from fixed floating to inline BottomNav center slot — eliminates all page overlap. BottomNav refactored LEFT_TABS + fabSlot + RIGHT_TABS. WorkoutFAB always renders (no empty center slot). App.tsx no longer owns FAB. ProfilePage + StatisticsPage top padding fixed. Post-Demo Cleanup section added to CLAUDE.md. Committed: abdc304.

**Session 16 — 2026-04-10:** Pre-demo code review — all critical flows verified clean, no blockers. False positive documented in Issue Tracker: ExerciseSearchModal modal closure after custom exercise creation works correctly via parent's onSelect handler (do not re-flag).

**Session 15 — 2026-04-10:** ProfilePage unit labels in label text; tab titles 24px/700 across all 4; autocapitalize="words" on all name inputs app-wide.

**Session 14 — 2026-04-10:** UI polish pass — trash icons, button redesign, FAB centered, page title centering, empty states, LogsPage text, bug fixes (from-program exercises, Save Edits reload, seed deduplication).

**Session 13 — 2026-04-09:** Step 6 — UserService, ProfilePage, StatisticsPage placeholder.

**Session 12 — 2026-04-09:** Step 5c — WorkoutDetailPage read-only and edit modes.

**Sessions 8–11 — 2026-04-09:** Steps 1–5b built in a single day.

---

## Portfolio Legibility Standard (locked)
- Distinctive, descriptive file/folder names — no generic names (utils.js, helpers.ts, App.js)
- Folder organization must communicate purpose at a glance
- Comments explain non-obvious decisions (why, not what)
- Rationale: repo is public; recruiters read source code

---

## What Is Fully Locked
- DB schema v2 (8 tables) — see master-schematics.md
- All service contracts — see master-schematics.md Service Layer
- All user flows — Logs (complete), Programs (complete)
- All design decisions #1–23 — see master-schematics.md Key Design Decisions
- All planning items P1–P9 resolved
- Tech stack: React 18 + TypeScript + Vite + React Router v7 + CSS Modules + Dexie.js v4
- Auth: localStorage, plain text password (MVP only)
- State: per-page useState/useEffect + 3 shared contexts (Auth, UserSettings, ActiveWorkout)
- ActiveWorkoutContext initializes on app mount — not just on login

---

## UI Standards Summary (UIdesign.txt — session 4)
These are locked. Do not redesign around them.

- Nature theme: color evokes natural world — felt, not illustrated (no leaf icons etc.)
- Colors: Green=action, Gold=achievement, Red=danger, White=content — strict, no mixing
- Surface tints: #1A1A17 / #242420 / #2E2E29 (warm undertone locked)
- Text tiers: #FFFFFF primary / #C0C0C0 label (card descriptors) / #8A8A8A secondary / #4A4A4A disabled
- Nav: 14px labels, 2px accent line above active tab
- Alignment: page titles + focal-point content centered; multi-element lists/rows left-aligned
- Buttons: 44px min height, flat, no gradients, title case, 15px/600 — see section 8 in UIdesign.txt
- Light mode: palette locked for post-MVP, values in UIdesign.txt section 4c

## Rejected Options — Do Not Re-Propose
These were explicitly discussed and closed. Do not re-propose. Do not ask clarifying questions about them. If the user raises one, acknowledge the prior decision and ask if they want to formally reopen it.

- **Silent revert on invalid input** — causes silent data loss. Use inline error, field stays editable.
- **Lock user to workout page until finished** — replaced with free navigation + ActiveWorkoutContext + "Resume Workout" FAB.
- **Standalone workout templates** — redundant with programs model; conflicts with future sharing. Every workout belongs to a program.
- **"Start Workout" FAB on all tabs** — confusing. FAB shows "Start Workout" on Logs tab only; "Resume Workout" globally when active.
- **Explicit Save button on Profile** — auto-save on blur. Exception: WorkoutDetailPage edit mode keeps "Save Edits".
- **window.confirm / window.prompt** — replaced with Modal component throughout (R2).
- **workoutSets table + isWarmup field for MVP** — deferred; lands with recommendation engine in v2.
- **Heaviest set for target derivation** — first set chosen instead; template target = starting weight, not peak.
- **Per-set targets on WorkoutTemplatePage** — deferred to v2 alongside workoutSets.
- **Store raw number without canonical unit** — breaks silently when user switches unit preference. All weights stored in lb, heights in inches — convert at display time only.
- **No unit label on weight inputs** — users can't tell what unit they're entering in. Unit label always shown beside every weight input (lb or kg from UserSettingsContext).
- **No unit selection at signup** — defaults to imperial silently; metric users corrupt all historical data before discovering the Profile toggle. Unit preference is selected at signup.
- **Store unit per entry (Option C)** — adds schema complexity for imperceptible gain (~0.1% drift); revisit if high-precision features (1RM calculator) are added.
- **Tailwind CSS** — CSS Modules retained for MVP; revisit before next major feature phase.
- **Zustand / Jotai** — per-page useState retained for MVP; evaluate post-MVP.
- **sessionStorage for auth** — switched to localStorage; user stays logged in across tab closes.
- **Blue accent (#4F8EF7)** — generic, used by every fitness app, does not support nature theme.
- **Electric green (#39FF14)** — neon/tennis ball, synthetic, fails all-ages readability.
- **Warm orange (#F97316)** — reads as warning/alert, conflicts with red's semantic role.
- **Pure dark forest green (#1A4731, #1B4332)** — too dark for interactive elements on dark background.
- **Filled circle nav indicator** — replaced with 2px accent line above active tab.
- **12px nav tab labels** — too small for all-ages; locked at 14px.
- **Workout summary screen at finish (OD4)** — post-MVP, not in build scope.
- **Elapsed workout timer (OD5)** — post-MVP, not in build scope.

---

## Keeping This File Current
Update `handoff.md` and `recap.txt` whenever a decision is made, locked, or reversed — without waiting to be asked.
