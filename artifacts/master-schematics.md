# Workout Tracker — Master Schematic

> **Purpose:** Source of truth for the entire application. Covers architecture, tech stack, DB schema, service layer, routing, state, and cross-cutting concerns. Update this file whenever a decision changes at the app level. Sub-schematics (per tab) live in `artifacts/tabs/` and are the source of truth for individual tab features.
>
> **Working agreements:** Every phase is a back-and-forth. Do not advance to the next phase without explicit agreement. Before moving on, update this doc and the relevant sub-schematics with what was decided. User stories should be referenced and cross-checked at every stage of development.
>
> **Reading guide:**
> - Building a feature → Service Layer + relevant DB tables only
> - Debugging a flow → Issue Tracker + relevant Decision(s)
> - Architecture question → Key Design Decisions section
> - Full read only needed when: starting a new phase

---

## Project Status

| Phase | Description | Status |
|-------|-------------|--------|
| 1. Research | Requirements, market, problem definition, tech stack, costs | Done |
| 2. Blueprint | Architecture, DB schema, component plan, contracts | Complete — all decisions locked (#1–23) |
| 3. Build | Implement step by step — frontend first, backend later | Complete — all 6 steps built |
| 4. Test | Unit → integration → e2e, bug tracking | Not started |
| 5. Iteration | Repeat phases 1–4 for each new feature set | Not started |

---

## Phase Contracts

> Decisions locked per phase. Do not revisit without explicit discussion. Add entries here after each phase is agreed on.

**Phase 1 — Research (locked)**
- Problem: cluttered, unintuitive apps that don't fit a gym workflow
- Target user: gym-goer logging workouts on their phone
- Core value: fast, clean workout logging with progress visibility
- Competition: heavy — Hevy, Strong, JEFIT, MyFitnessPal; differentiate on simplicity, speed, no paywall
- Re-run competitor research before each major feature iteration to validate we're solving a real gap

**Phase 2 — Blueprint MVP (complete — all decisions locked)**
- React + TypeScript frontend, Vite, React Router v7, CSS Modules
- Dexie.js (IndexedDB) for local storage — no backend for MVP
- Service layer abstraction — swap Dexie for API calls later without touching components
- Mobile-only layout (480px max-width), bottom nav, 4 tabs
- Local auth (plain text, localStorage) — replaced when backend is added
- Unit storage: all weights in lb, heights in inches — canonical; convert at display time via UserSettingsContext; unitPreference: 'imperial' | 'metric'
- DB schema v2 (replaces v1): 8 tables — users, exercises, programs, workouts, workoutExercises, workoutLogs, logExercises, logSets; `programExercises` removed; `workoutLogs.workoutId` (nullable) replaces `programId`; `logExercises.notes` (nullable string) added
- Program → Workout → Exercise hierarchy; every workout belongs to a program; no standalone workout templates
- Quick-start logs have `workoutId: null` — valid unassigned logs
- New services: WorkoutService, WorkoutExerciseService; removed: ProgramExerciseService
- New page: WorkoutTemplatePage — editing workout templates (exercises + targets); separate from WorkoutDetailPage (active/past logs)
- New routes: /programs/:programId/workouts/new, /programs/:programId/workouts/:workoutId
- Refactoring: see Development Philosophy — service layer and type definitions are the primary surfaces to review before future integration phases (backend, mobile, devices)
- Free navigation during active workout — workout persists in Dexie (finishedAt === null) until explicitly finished or deleted; user can navigate all tabs freely
- ActiveWorkoutContext — global context initialized on app mount (not just login) — checks Dexie for finishedAt === null; drives WorkoutFAB state app-wide
- WorkoutFAB visibility rules: "Start Workout" on Logs tab only (no active workout); "Resume Workout" all tabs (active workout); disabled/inert (visible, no action) on /logs/:id active mode; hidden on /login, /signup
- WorkoutLogService.getActive() — new method returns active log or null for current user
- Auto-save on all editable pages except WorkoutDetailPage edit mode — changes persist to Dexie on blur; no explicit save buttons on Profile or active workout inputs
- WorkoutDetailPage edit mode — keeps explicit "Save Edits" as commit point; "← Back" without saving discards changes
- Input validation + inline error — invalid numeric input shows "Enter a valid number" below field; blank text shows "Name can't be blank"; clears on valid input
- Confirm prompt only on destructive actions — delete workout, delete program, discard active session; all other navigation always safe

> Phase 2 is locked. Do not reopen decisions without explicit discussion.

**Phase 3 — Build MVP (complete — 2026-04-10)**
- Build order: project setup → auth → shared components → Programs tab → Logs tab → Profile tab → Statistics placeholder
- All 6 steps built and verified. UI polish pass complete. See recap.txt for full session history.

**Phase 4 — Test MVP (not started)**

**Phase 5 — Iteration (not started)**
- Repeat phases 1–4 for each new feature set after MVP is complete and tested

---

## Problem Statement

Most workout tracking apps in the market are cluttered, unintuitive, and designed for power users rather than everyday gym-goers. They bury core functionality behind subscriptions, social feeds, and feature bloat. The result: users either abandon the app mid-workout or never build a consistent tracking habit.

**Goal:** Build a clean, fast, mobile-first workout tracker that gets out of the user's way. Log a workout in seconds. Review history without noise. No clutter, no confusion.

---

## Development Philosophy

- **Solo developer** — scope decisions should account for maintainability by one person
- **Agile principles** — iterate in small, testable increments; adjust based on real use
- **Mobile-first** — design and build for phone users at the gym first; web/desktop is secondary
- **Lean MVP** — build the minimum that proves the core value, then iterate
- **Backend-ready** — service layer abstraction means no frontend rewrites when backend is added
- **Refactoring** — before each build phase, review open Refactor and Planning items in the Issue Tracker; must-fix items are resolved before proceeding, minor items deferred with an explicit note; future integration phases (backend, mobile, devices) will treat refactoring as a formal pre-build step
- **Coding standards** (JSDoc, comment rules, CSS conventions) — see CLAUDE.md → Coding Standards section

---

## Market Context

**Competition:** Heavy. Key players include Hevy, Strong, JEFIT, MyFitnessPal, and others.

**Differentiation opportunity:**
- Ruthless simplicity — fewer taps to log a set
- No paywall on core features
- Fast, offline-capable (local-first)
- Clean mobile UI without social/feed clutter

> Research note: evaluate top competitors before each major feature iteration to ensure we're solving a real gap, not duplicating what already exists well.

---

## Overview

A workout tracking app with a React web frontend (mobile-only layout). Data stored locally via Dexie.js (IndexedDB) for the MVP. Architecture is designed for a future migration to a Node.js backend — the service layer abstracts all data access so swapping Dexie for API calls requires no components changes.

**Current target:** Mobile-only web app (PWA-ready)
**Planned:** Node.js backend + real auth + mobile app (scope TBD)

---

## Tech Stack

| Layer | Current (MVP) | Planned |
|-------|--------------|---------|
| Frontend | React 18 + TypeScript | Same |
| Build tool | Vite 5 | Same |
| Routing | React Router v7 | Same |
| Styling | CSS Modules + flexbox | Same |
| Local DB | Dexie.js v4 (IndexedDB) | Replaced by API calls |
| Backend | None | Node.js (TBD) |
| Auth | Local (plain-text, localStorage) | Real auth (TBD) |
| Mobile | None | React Native or PWA (TBD) |

---

## Navigation

- **Bottom nav bar** (always visible on authenticated routes): Logs | Programs | Statistics | Profile
- Hidden on `/login` and `/signup`
- Each tab owns its own routes (see Routing section)

---

## Routing

| Route | Page | Tab | Notes |
|-------|------|-----|-------|
| /login | LoginPage | — | Unauthenticated only |
| /signup | SignupPage | — | Unauthenticated only — includes unit preference selection (Imperial/Metric) at account creation |
| /logs | LogsPage | Logs | Default landing after login |
| /logs/:id | WorkoutDetailPage | Logs | Active or past workout detail |
| /programs | ProgramsPage | Programs | List of programs |
| /programs/new | ProgramDetailPage | Programs | Create new program |
| /programs/:id | ProgramDetailPage | Programs | View/edit program — shows list of workouts |
| /programs/:programId/workouts/new | WorkoutTemplatePage | Programs | Create workout within program |
| /programs/:programId/workouts/:workoutId | WorkoutTemplatePage | Programs | View/edit workout template |
| /statistics | StatisticsPage | Statistics | Placeholder |
| /profile | ProfilePage | Profile | |

---

## DB Schema (Dexie — v2)

> **v2** replaces v1. New hierarchy: Program → Workout → Exercise. `programExercises` removed, `workouts` and `workoutExercises` added. `workoutLogs.programId` replaced by `workoutId`.

### users
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| email | string | Unique |
| password | string | Plain text (MVP only — replace with hashed + backend) |
| name | string | |
| height | number | Stored in inches — converted to ft+in or cm at display time |
| weight | number | Stored in lb — converted to kg at display time |
| unitPreference | string | 'imperial' (default) or 'metric' — controls all Layer 1 unit displays: lb/kg, ft+in/cm, in/cm |
| createdAt | Date | |

### exercises
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| name | string | |
| category | string | chest, back, legs, shoulders, arms, core |
| isCustom | boolean | false = pre-seeded, true = user-created |

### programs
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| name | string | |
| createdAt | Date | |

### workouts
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| programId | number | FK → programs — every workout belongs to a program |
| name | string | e.g. "Push Day", "Legs Day 1" |
| order | number | Display order within program |
| createdAt | Date | |

### workoutExercises
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| workoutId | number | FK → workouts |
| exerciseId | number | FK → exercises |
| targetSets | number | |
| targetReps | number | |
| targetWeight | number | Stored in lb — converted to kg at display time if unitPreference = 'metric' |
| order | number | Display order |

### workoutLogs
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| workoutId | number | Nullable — null if quick-start |
| name | string | |
| startedAt | Date | |
| finishedAt | Date | Nullable — null = in progress |

### logExercises
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| workoutLogId | number | FK → workoutLogs |
| exerciseId | number | FK → exercises |
| notes | string | Nullable — free-text note per exercise (e.g. "felt strong", "left shoulder tight"); UI deferred post-MVP, field exists now to avoid future migration |
| order | number | Display order |

### logSets
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| logExerciseId | number | FK → logExercises |
| setNumber | number | |
| weight | number | Stored in lb — converted to kg at display time if unitPreference = 'metric' |
| reps | number | |
| previousWeight | number | Stored in lb — snapshotted at set creation; matched by set number from last session, falls back to last set |
| previousReps | number | Displayed as "90 × 8" (with converted weight), null shows "—" |

### Dexie Schema String (locked — D1 resolved)

```
users:            '++id, email'
exercises:        '++id, name, category'
programs:         '++id, userId'
workouts:         '++id, programId'
workoutExercises: '++id, workoutId'
workoutLogs:      '++id, userId'
logExercises:     '++id, workoutLogId'
logSets:          '++id, logExerciseId'
```

Notes:
- No compound indexes — per-user and per-exercise result sets are small enough for JS filtering at MVP scale
- `finishedAt === null` remains the canonical definition of "active" — do not introduce an `isActive` field
- `name` on exercises supports Dexie prefix search (`.startsWithIgnoreCase()`)

---

## Service Layer

All services are plain modules exporting functions. Currently call Dexie directly. Swap internals to `fetch()` when backend is built — components don't change.

| Service | Methods |
|---------|---------|
| AuthService | signup (accepts unitPreference — set at account creation), login, logout, getCurrentUser, getCurrentUserId |
| UserService | getProfile, updateProfile |
| ExerciseService | getAll, search (query + category), create |
| ProgramService | getAll, getById, create, update, delete (cascade order: workoutExercises → workouts → program; children deleted before parent to prevent orphaned rows) |
| WorkoutService | getByProgramId, getById, create, update, delete (cascade order: workoutExercises → workout), reorder, createFromLog(logId, programId, workoutName) — creates workout + workoutExercises from a log; targetSets = logSet count per exercise, targetReps/targetWeight = first set values (0 if none) |
| WorkoutExerciseService | getByWorkoutId, add, update, remove, reorder, syncFromLog(workoutId, logId) — adds exercises in log but not in template, removes exercises in template but not in log; existing template exercises untouched; order of new exercises follows log order; getCountsByProgramId(programId) — returns Record<workoutId, number> of exercise counts for all workouts in a program in a single batch query (replaces N+1 pattern in ProgramDetailPage) |
| WorkoutLogService | getAll, getById, create (userId, workoutId nullable, name — quick-start: name = "Quick Workout [n+1]" where n = getAll(userId).length; from-program: name = workout template name; if workoutId provided, atomically copies workoutExercises → logExercises), finish, update, delete (cascade order: logSets → logExercises → workoutLog), getActive (returns log with finishedAt === null for current user, or null) |
| LogExerciseService | getByWorkoutId, add, remove, reorder |
| LogSetService | getByExerciseId, add, update, delete, getPreviousData (returns weight+reps by set number, fallback to last set) |

---

## State Management

| Context | What it holds | Where used |
|---------|--------------|------------|
| AuthContext | Current user session (user object, loading, login, signup, logout) | App-wide via AuthGuard |
| UserSettingsContext | User preferences (unitPreference: 'imperial' | 'metric') — controls all Layer 1 unit displays; extensible for future settings | Any component displaying a weight, height, or measurement |
| ActiveWorkoutContext | Active workoutLog ID (workoutLogs.id) if one exists (finishedAt === null) — initialized on app mount regardless of whether user just logged in or returned via a persisted localStorage session; drives FAB label and visibility app-wide | App shell, BottomNav, FAB |

- All page-level data: `useState` + service calls in `useEffect`
- No Redux — page-level state is sufficient for current scope

---

## Exercise Library (Shared Resource)

- Global list of exercises available across all tabs
- 29 pre-seeded exercises across 6 categories: chest, back, legs, shoulders, arms, core
- Users can create custom exercises (stored with `isCustom: true`)
- Search/filter by name + category
- Surfaced via `ExerciseSearchModal` (bottom drawer overlay) — used by both Programs and Logs tabs

### ExerciseSearchModal Spec (C5 resolved — MVP minimal)

Bottom drawer overlay. Used from WorkoutDetailPage (active/edit) and WorkoutTemplatePage.

**Layout:**
- Category filter chips: All | Chest | Back | Legs | Shoulders | Arms | Core — "All" selected by default
- Search input — instant name filter as user types; no debounce (29 items, Dexie reads near-instant)
- Results list — exercises filtered by name + selected category chip
- Empty state: "No exercises found" + "＋ Create custom exercise" option

**Custom exercise creation (inline, no new page):**
- Name input + category picker (required)
- Blank name → "Name can't be blank"
- Save → `ExerciseService.create()` → exercise added to list and immediately selected → modal closes

**Selection:**
- Tap exercise → modal closes → exercise added to workout (`LogExerciseService.add()` or `WorkoutExerciseService.add()` depending on context)

**Dismissal:**
- Tap outside overlay → modal closes, no exercise added

---

## Folder Structure

```
src/
├── App.tsx                        — Root component, routing, seed trigger; on mount: db.exercises.count() === 0 → seed() (C8 resolved)
│                                    ⚠ AUDIT C8: Seed trigger mechanism unspecced — when/how seed.ts runs is not documented. Resolve before build step 1.
├── index.css                      — Global reset, mobile-first base styles (480px max-width)
├── main.tsx                       — Vite entry point
├── types/
│   └── index.ts                   — All TypeScript interfaces
├── db/
│   ├── db.ts                      — Dexie DB class, 8 tables, indexed fields
│   └── seed.ts                    — 29 default exercises; trigger: App.tsx on mount checks db.exercises.count() === 0 → runs seed(); fires once on first install, never again
├── services/                      — Data access layer (one file per service)
├── context/
│   ├── AuthContext.tsx
│   ├── UserSettingsContext.tsx
│   └── ActiveWorkoutContext.tsx   — Tracks active workout ID app-wide
├── components/                    — Shared components
│   ├── AuthGuard.tsx
│   ├── BottomNav.tsx + .module.css
│   ├── Modal.tsx + .module.css
│   ├── ExerciseSearchModal.tsx + .module.css  — shared overlay; spec below (C5 resolved)
│   └── WorkoutFAB.tsx + .module.css  — Global FAB: "Start Workout" or "Resume Workout"
└── pages/
    ├── LoginPage/
    ├── SignupPage/
    ├── LogsPage/
    ├── WorkoutDetailPage/
    │   └── components/            — ExerciseCard, SetRow (colocated)
    ├── ProgramsPage/
    │   └── components/
    ├── ProgramDetailPage/
    │   └── components/
    ├── WorkoutTemplatePage/       — Edit workout template (exercises + targets within a program)
    │   └── components/
    ├── ProfilePage/
    └── StatisticsPage/
```

---

## Auth

- Session stored in `localStorage` (key: `workout_tracker_user_id`) — persists across tab closes and browser restarts; user stays logged in until they explicitly log out
- Password: plain text in Dexie (MVP only — will be replaced with hashed + backend auth)
- `AuthGuard` component wraps all protected routes — redirects to `/login` if unauthenticated
- BottomNav hidden on `/login` and `/signup`

**SignupPage spec (C3 resolved — MVP minimal):**
- Fields: name, email, password, unit preference toggle (Imperial | Metric — default Imperial)
- Validation: blank fields → "Can't be blank" (Decision #11 pattern); no duplicate email check (local-only MVP)
- Post-signup: auto-login → `/logs`
- Layout: full-screen dark, centered card (UIdesign.txt auth layout)
- AuthService.signup() accepts: name, email, password, unitPreference

**LoginPage spec (C4 — deferred to login.md, resolve before build step 2):**
- Fields: email, password
- Error: "Invalid email or password"
- Success: redirect to `/logs`

> **AUDIT M8:** AuthContext loading state unspecced — while checking localStorage on mount, the app needs to avoid a flash of unauthenticated content or premature redirect. Decide handling at auth build step.
- **localStorage security notes (MVP context):**
  - Only a userId (number) is stored — not a password or token; harmless without direct device access
  - XSS risk is the same as sessionStorage — negligible for a local-only app with no third-party scripts
  - Shared across tabs on the same origin — consistent behavior, not a concern for a single-user app
  - Device sharing: session persists until explicit logout; acceptable for a personal gym app on a personal phone
  - Plain-text password risk (R3) exists independently of this decision and is already tracked for replacement
- **ActiveWorkoutContext initialization:** must run on app mount — not just on login. A user returning via a persisted localStorage session bypasses the login flow entirely; ActiveWorkoutContext must still query Dexie for any log with `finishedAt === null` on mount to restore correct FAB state

---

## Key Design Decisions

| # | Decision | Reason |
|---|----------|--------|
| 1 | Service layer abstraction | Dexie today, API calls tomorrow — zero component changes needed |
| 2 | Local auth for MVP | Simple; replaced when backend is added |
| 3 | Mobile-only layout | Target use case is at the gym on a phone |
| 4 | CSS Modules | Scoped styles, no global conflicts |
| 5 | ExerciseSearchModal as overlay | Doesn't break navigation state |
| 6 | previousWeight + previousReps snapshotted at set creation | Editing old logs doesn't corrupt reference data |
| 7 | Editable finished logs | User may need to correct mistakes after finishing |
| 8 | UserSettingsContext extensible | unitPreference today ('imperial' | 'metric'), other preferences later — single toggle controls all Layer 1 units |
| 9 | Cascade deletes in services | Referential integrity without a relational DB |
| 10 | Auto-save on all editable pages | Eliminates data loss from accidental navigation — no unsaved state anywhere |
| 11 | Input validation with inline error | Invalid numeric input shows "Enter a valid number" below field; blank text fields show "Name can't be blank"; field stays editable, error clears on valid input |
| 12 | Confirm prompt only on destructive actions | Delete workout, delete program, discard active workout session — all other navigation is always safe |
| 13 | Free navigation during active workout | User can navigate all tabs while a workout is in progress — workout persists until explicitly finished or deleted |
| 14 | ActiveWorkoutContext | Global context tracks whether a workout is in progress — drives FAB state app-wide; checks Dexie on login/app open for any log with finishedAt === null |
| 15 | WorkoutFAB behavior | No active workout: "Start Workout" on Logs tab only — hidden on all other tabs; Active workout: "Resume Workout" on all tabs → /logs/:id; Hidden on /logs/:id in active mode (redundant with Finish/Discard buttons); Hidden on /login and /signup |
| 16 | Device keyboard handles text correction | Mobile keyboards provide native auto-correct on all text inputs — no custom implementation needed |
| 17 | Quick-start finish flow — save to program | Modal: "Save to program?" → Skip: log stays unassigned (/logs); Save: picker shows existing programs + "＋ New Program" at top; if zero programs, skip picker and show blank inputs directly. Workout name input is always blank (no pre-fill). Cancel at any point after finishing navigates to /logs. |
| 18 | WorkoutLogService.create pre-fill behavior | When workoutId is provided, create atomically copies workoutExercises → logExercises in the same call. When workoutId is null (quick-start), creates an empty log with no exercises. Caller never manages the copy step. |
| 19 | From-program finish flow — exercise sync | Unmodified (same exercise set): finish silently → /logs. Modified (any addition or removal): Modal "Update [Workout Name]?" → [Update Template]: syncFromLog adds/removes exercises to match log, existing targets untouched → /logs; [Keep Original] → /logs. Order changes are ignored — set comparison only. |
| 20 | Start Workout from empty template | Tapping "Start Workout" on a WorkoutTemplatePage with zero exercises shows inline message: "Add at least one exercise to start." User stays on page. Starting an empty template is blocked — quick-start via FAB is the correct path for an unplanned session. |
| 21 | WorkoutDetailPage mode-switching | Mode derived from finishedAt on load: null = Active, value = Read-only. Edit is always a local state transition from Read-only — never loaded directly from URL. Back tap in Edit mode shows "Discard changes?" Modal (not silent discard) — protects against accidental loss of re-edit work. |
| 22 | Unit storage and conversion | All weights stored in lb, heights in inches — canonical units regardless of user preference. Conversion to kg/cm happens at display time only via UserSettingsContext. unitPreference: 'imperial' (default) or 'metric' replaces the old 'lb'/'kg' string — one toggle controls all Layer 1 units (weight, height, body measurements). Layer 2 units (time, distance, calories, HR) are universal or require new tables — unaffected by this decision. Floating point drift (~0.1%) is imperceptible in a gym context. Future: per-entry unit override (e.g. powerlifting/competition lifts logged in kg regardless of global preference) is a known need — requires storing unit per entry; deferred post-MVP. |
| 23 | Unit visibility and signup | Unit label shown beside every weight input ("lb" or "kg" from UserSettingsContext) — user always knows what unit they are entering. Unit preference selected at signup (Imperial/Metric) — prevents corrupt historical data before user visits Profile. Note shown at signup: preference can be changed anytime in Profile. All weight inputs and displayed values across active workout, read-only, edit mode, and Edit Targets Modal follow this rule. |

---

## User Stories

> Cross-reference these at every stage of development. Update when new stories are confirmed or existing ones change. Stories drive feature decisions — if a feature doesn't map to a story, question whether it belongs.

| # | As a... | I want to... | So that... | Status |
|---|---------|-------------|------------|--------|
| U1 | gym-goer | log my sets and reps quickly during a workout | I don't lose focus or momentum | Done (MVP) |
| U2 | gym-goer | start a workout from a saved template | I don't have to re-enter the same exercises each session | Done (MVP) |
| U3 | gym-goer | see what weight I used last time for each set | I know where to start this session | Done (MVP) |
| U4 | gym-goer | review my past workouts | I can track what I've done over time | Done (MVP) |
| U5 | gym-goer | create and manage programs containing multiple workouts | I have a consistent training structure | Done (MVP) |
| U6 | gym-goer | edit a finished workout log | I can correct mistakes I made during logging | Done (MVP) |
| U7 | gym-goer | see my progress on a specific exercise over time | I know if I'm getting stronger | Deferred — Statistics tab post-MVP |
| U8 | gym-goer | use the app on my phone without it feeling like a desktop site | it fits naturally into my gym routine | Done (MVP) |

> Add new stories here before building new features. A story should be agreed on before any blueprint or build work begins for that feature.

---

## Testing Strategy

Applied at every iteration. Each phase has a defined scope — don't skip phases or batch them all at the end.

| Phase | Method | When | Status |
|-------|--------|------|--------|
| 4a | Unit testing | After each build phase — every page, button, DB function | Pre-demo code review complete (2026-04-10) — all critical flows verified clean; no automated tests yet (D8 deferred) |
| 4b | Runtime optimization | After unit audit is clean and no must-fix items remain — render performance, DB query efficiency, bundle size | Not started |
| 4c | Integration testing | After backend is connected | Not started |
| 4d | End-to-end testing | After full user flows are stable | Not started |
| 4e | Bug tracking | Ongoing — compile and update Issue Tracker as encountered | See Issue Tracker below |

---

## Issue Tracker

> Single running list for bugs, gaps, and refactors. Add as discovered, mark resolved when fixed. Never delete entries — resolved items are part of the record.
> - **Bug** — broken or unintended behavior
> - **Gap** — feature specified but not yet built
> - **Refactor** — correct behavior, suboptimal implementation
> - **Planning** — architectural or design decision that must be resolved before building continues

### Active Issues

| # | Type | Item | Severity | Area | Status |
|---|------|------|----------|------|--------|
| G4 | Gap | No "change exercise" on active workout | Nice to have | Logs | Pending |
| R3 | Refactor | Password stored as plain text in Dexie — replace with hashed auth when backend is added | Must fix before real users | Auth | Pending |
| P5 | Planning | Charting library not selected — must decide before building Statistics | Decide before Statistics build | Statistics | Pending |
| F1 | Future | Auto-suggest exercise names from library in text input fields | Post-MVP | Logs, Programs | Future |
| F2 | Future | Set completion indicator — visual feedback (checkmark or color change) on set row after auto-save | Post-MVP | Logs | Future |
| F3 | Future | Smart defaults — pre-fill weight/reps inputs with previousWeight/previousReps when new set added | Post-MVP | Logs | Future |
| F4 | Future | Workout duration — display finishedAt - startedAt on finished log cards and read-only view | Post-MVP | Logs | Future |
| F5 | Future | Basic rest timer — auto-starts on set log, sound/vibration at zero, non-customizable | Post-MVP | Logs | Future |
| F6 | Future | "Create a program from this workout" — from a finished log, create a new program using that workout's exercises as the template; targets set from logged sets | Post-MVP | Logs, Programs | Future |
| F8 | Future | Bodyweight + added weight display — add `isBodyweight` bool to exercises table; when true and targetWeight > 0, display as "top set: BW +X lbs" instead of "top set: X lbs". Requires schema migration. | Post-MVP schema change | Logs, Programs, DB | Future |
| F9 | Future | Rearrange exercises — drag-to-reorder exercise list on active workout and workout template. Requires `sortOrder` int on `logExercises` and `workoutExercises`. | Post-MVP schema change | Logs, Programs, DB | Future |
| F10 | Future | Redesign WorkoutTemplatePage bottom action area — revisit after OD6 (CSS button token standards) is resolved. | Post-MVP polish | Programs | Future |

### Resolved Issues (record only — do not reopen)

| # | Type | Item | Resolution |
|---|------|------|------------|
| G2 | Gap | No edit UI for workout exercise targets | Built — Edit Targets Modal on WorkoutTemplatePage |
| G3 | Gap | No `.gitignore` | Built — created at project setup |
| G5 | Gap | Back navigation destinations unlocked | Built — ProgramDetailPage → /programs, WorkoutTemplatePage → /programs/:id |
| G6 | Gap | Statistics tab placeholder | Built — "Coming soon" placeholder; full feature deferred to v2 |
| G7 | Gap | No "Discard Workout" option | Built — Discard button in active mode footer with Modal confirm |
| R1 | Refactor | ExerciseService.getAll() called inside .map() | Built — exercises hoisted as lookup map; getCountsByProgramId batch query |
| R2 | Refactor | window.confirm / window.prompt in 3 places | Built — Modal component used throughout |
| P1 | Planning | CSS Modules vs Tailwind | CSS Modules retained for MVP; revisit Tailwind before next major phase |
| P2 | Planning | useState vs shared state | Per-page useState retained; Context API covers shared cases |
| P3 | Planning | Add duration/notes fields | Duration skipped (derivable); notes added to logExercises; notes UI post-MVP |
| P4 | Planning | sessionStorage vs localStorage | Switched to localStorage; persists across tab closes |
| P6 | Planning | Workout detail sub-schematic | Stays in logs.md; mode-switching fully specced (Decision #21) |
| P7 | Planning | Target derivation in createFromLog | First set values — target = starting weight, not peak |
| P8 | Planning | From-program finish flow logic | Resolved — Decision #19 |
| P9 | Planning | Pre-fill on start from program | create handles copy atomically |
| B1 | Bug | Dangling workoutId on program delete | Built — null-check workoutId; falls back to quick-start flow |
| N1 | Planning | WorkoutFAB hidden logic | Built — FAB compares route :id against activeWorkoutId; F11 (2026-04-14): changed from hidden → disabled/inert on active workout page |
| N2 | Planning | Finish flow state machine | Confirmed session 7 — no simplification |
| N3 | Planning | Context dependency chain | Resolved session 7 — UserSettingsContext reads from AuthContext |
| N4 | Planning | Height display format | Resolved session 7 — raw number + label; ft+in post-MVP |
| F7 | Future | Target weight display label | Built session 18 — "| top set: x lbs" |
| G1 | Gap | Delete workout log UI | Resolved during MVP audit |
| G8 | Gap | Previous weight × reps display | Resolved during MVP audit |

> **Pre-demo code review (2026-04-10):** All critical flows verified clean — auth, quick-start workout, from-program workout, finish flows (all 4 state machine paths), read-only/edit modes, B1 edge case, Programs CRUD, Profile, seed guard, FAB hidden logic. No blockers found.
> **False positive on record:** ExerciseSearchModal appears to not close after custom exercise creation (handleCreate calls onSelect but not onClose directly). This is intentional — the parent's onSelect handler (handleExerciseSelect in WorkoutDetailPage L143 / WorkoutTemplatePage L106) calls setShowExerciseSearch(false), which unmounts the modal. Do not flag this as a bug.

---

## UI/UX References

> Add links or file paths to wireframes, mockups, screenshots, or design references here as they are provided. Nothing to reference yet.

| # | Description | File / Link |
|---|-------------|-------------|
| — | None yet | — |

---

## Sub-Schematics

Detailed specs for each tab live here. Cross-reference these during every build step.

| Tab | File |
|-----|------|
| Logs | [artifacts/tabs/logs.md](tabs/logs.md) |
| Programs | [artifacts/tabs/programs.md](tabs/programs.md) |
| Statistics | [artifacts/tabs/statistics.md](tabs/statistics.md) |
| Profile | [artifacts/tabs/profile.md](tabs/profile.md) |

---

## Changelog

> Brief log of significant doc updates. One line per entry. Most recent at top.

| Date | Change |
|------|--------|
| 2026-04-10 | Phase 3 Build marked complete; all user stories U2–U6, U8 marked Done (MVP); issue tracker items G2, G3, G5, G6, G7, R1, R2, B1, N1 marked Resolved — built |
| 2026-04-10 | UI polish pass complete: trash icons replace text Remove/Delete buttons throughout; set-delete icon changed to red X; WorkoutTemplatePage button layout redesigned (shorter labels, auto-width, Start/Done/Delete rows); FAB centered (left: 50%); tab titles standardized to 24px/700; ProgramsPage "New Program" button moved below list; LogsPage empty state text updated; ProfilePage unit labels moved into label text; autocapitalize="words" added to all name inputs app-wide |
| 2026-04-10 | Bug fixes: WorkoutLogService.create now correctly copies workoutExercises → logExercises (from-program exercises were missing); Save Edits reloads from Dexie after saving (display was stale); seed.ts module-level flag prevents React Strict Mode double-seeding (duplicate exercises in search modal) |
| 2026-04-06 | D1 resolved: Dexie schema string locked — no compound indexes; D6 resolved: cascade delete order locked for all 3 delete paths; getCountsByProgramId added to WorkoutExerciseService (resolves R1 N+1 pattern); B1 added: dangling workoutId on program delete |
| 2026-04-05 | Created UIdesign.txt — UI standards, color palette, spacing system, component specs, design brainstorm with ALIGNED/ADDITIVE/REQUIRES tags; added to handoff and recap |
| 2026-04-05 | Final review pass: phase statuses corrected, user story statuses updated, stale references removed, service signatures fixed, duplicate future iteration removed |
| 2026-04-05 | Planning complete — G3 marked build-time, R2 marked specced; all must-fix items resolved; build order documented in recap.txt |
| 2026-04-05 | Decision #23 locked: unit label on all weight inputs; unit preference at signup; profile toggle note; per-entry unit override noted as future need (powerlifting use case) |
| 2026-04-05 | G2 specced: Edit Targets Modal on WorkoutTemplatePage — tap target line, 3 inputs (sets/reps/weight), [Save]/[Cancel], unit-aware display, stores in lb |
| 2026-04-05 | Decision #22 locked: all weights stored in lb, heights in inches; unitPreference 'imperial'|'metric' replaces 'lb'|'kg'; conversion at display time only |
| 2026-04-05 | P7 locked: target derivation = first set values; per-set targets and last-session reference deferred to v2 |
| 2026-04-05 | P4 locked: localStorage confirmed with security notes; ActiveWorkoutContext must initialize on app mount, not just on login |
| 2026-04-05 | P1–P4 locked: CSS Modules retained; per-page useState retained; notes added to logExercises, duration skipped; auth session switched from sessionStorage to localStorage |
| 2026-04-05 | Locked Decision #21: WorkoutDetailPage mode-switching — finishedAt drives mode on load, Edit is local transition, back-tap in Edit confirms before discarding; G6 resolved |
| 2026-04-05 | Locked Decision #20: Start Workout blocked on empty template with inline message; Condition 2 resolved |
| 2026-04-05 | Locked Decision #19: from-program finish flow — silent finish if exercises unchanged, Modal sync prompt if modified, order changes ignored; P8 resolved; WorkoutExerciseService.syncFromLog added |
| 2026-04-05 | Locked Decision #18: WorkoutLogService.create atomically copies workoutExercises → logExercises when workoutId provided; P9 resolved |
| 2026-04-05 | Alignment pass: fixed Start Workout route in logs.md, ProgramDetailPage hint text, Components table in programs.md, all confirm prompts updated to Modal, G7 marked specced, P9 added (pre-fill gap), stale Future Iterations note removed |
| 2026-04-05 | Locked quick-start finish flow (Decision #17): save-to-program picker, no-programs edge case, blank workout name input, skip = unassigned log; added WorkoutService.createFromLog; added P7, P8 to issue tracker |
| 2026-04-05 | Locked schema v2 — Program → Workout → Exercise hierarchy; updated DB schema, service layer, routing, folder structure, issue tracker, user stories throughout |
| 2026-04-04 | Locked 7 contracts into Phase 2; fixed Decision #11 (inline error replaces silent revert); updated logs.md, programs.md, profile.md to align with auto-save, validation, FAB, and edit mode contracts |
| 2026-04-04 | Merged Bug Tracker + Open Gaps + Refactoring Notes into unified Issue Tracker; added Phase Contracts, Changelog, UI/UX References stub |
| 2026-04-04 | Added Problem Statement, Development Philosophy, Market Context, User Stories, Testing Strategy from coreprocess.txt |
| 2026-04-04 | Created master-schematics.md and 4 tab sub-schematics (logs, programs, statistics, profile) |
| 2026-04-02 | MVP audit complete — G1, G7, G8 resolved; DB upgraded to v2 (previousReps) |
