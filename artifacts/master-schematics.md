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
| 4. Test | Unit → integration → e2e, bug tracking | Complete — closed 2026-04-22. 72 tests passing across 8 files; service layer guards complete; ErrorContext + ErrorBanner wired app-wide. Remaining flow-level tests (finish state machine, auth, ActiveWorkoutContext init) carried into Phase 5 when touched. |
| 5. Iteration | Statistics page build + new feature sets (repeat phases 1–4 per feature) | In progress — CE1 spec patches active (sessions 41–43); CE1 build, Statistics build, and F20–F39 iteration queued |

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
- All 6 steps built and verified. UI polish pass complete. See recap.md for full session history.

**Phase 4 — Test MVP (complete — 2026-04-22)**
- Vitest 4.1.5 + RTL 16 + fake-indexeddb + jsdom installed (session 29)
- 72 tests passing across 8 files (service layer guards + UI guards)
- Service layer guards on 7 services (session 30)
- ErrorContext + ErrorBanner wired app-wide (session 34 — D5 closed)

**Phase 5 — Statistics page + new features planning (in progress)**
- Active: CE1 spec patches (sessions 41–43) → CE1 build → Statistics build → F20–F39 iteration
- Repeat phases 1–4 loop applies to each new feature set

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
| goalWeight | number | Nullable — stored in lb; display in user's unit preference |
| rpeEnabled | boolean | Default `false` — gates per-set RPE entry UI (Decision #26); will move to feature toggle menu next cycle (F32) |
| trainingAge | `string \| null` | Forward-compat (F30 onboarding / F37 Galpin recovery modifier) — null until populated |
| createdAt | Date | |

### exercises
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| name | string | |
| isCustom | boolean | false = pre-seeded, true = user-created |
| primaryMuscles | `Muscle[]` | One or more — co-primaries allowed when EMG/research supports (Decision #24) |
| secondaryMuscles | `{ muscle: Muscle; role: 'synergist' \| 'stabilizer' }[]` | Role-tagged secondaries (Decision #24 — B-lite); both roles treated at 0.5× in MVP math; future calibration possible without re-curation |
| equipment | `string \| null` | Forward-compat (UX deferred — F39); null until next cycle |
| gripWidth | `string \| null` | Forward-compat (UX deferred — F39) |
| gripOrientation | `string \| null` | Forward-compat (UX deferred — F39) |
| stanceWidth | `string \| null` | Forward-compat (UX deferred — F39) |
| bias | `string \| null` | Forward-compat (UX deferred — F39) |
| jointLoad | `string[]` | Default `[]`; forward-compat for Injury-Warning system (F31) |

> Broad muscle group (chest/back/shoulders/arms/legs/core) is **derived** via `getExerciseGroup(exercise)` — not stored as a column. First entry of `primaryMuscles` is the group anchor when co-primaries span groups (e.g. bench press `[chest, triceps]` → chest). No `category` field (dropped in v3 — Decision #28). See Muscle Taxonomy Model below.

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
| rating | number | Nullable — 1 Struggled / 2 Solid / 3 Crushed it; captured at workout finish |

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
| rpe | `number \| null` | 1–10 scale, half-points allowed (7.5, 8.5); nullable and optional even when `users.rpeEnabled` is true — never blocks set save (Decision #26); no pre-fill |

### bodyMetrics
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | Entry date — multiple entries per day allowed |
| weight | number | Nullable — stored in lb |
| bodyFatPct | number | Nullable — percentage (e.g. 18.5) |
| waistIn | number | Nullable — stored in inches |
| hipIn | number | Nullable — stored in inches |

> All measurements stored in canonical units (lb/inches) — convert to kg/cm at display time. Weight expected daily; other fields monthly.

### dailyCheckins
| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | Entry date — one logical entry per day (upsert pattern) |
| sleepHours | number | Nullable — decimal allowed |
| steps | number | Nullable — integer; manual entry; no derived charts until device sync resolved |

---

### Dexie Schema String (locked — D1 resolved; v3 lock Session 41)

```
users:            '++id, email'
exercises:        '++id, name'
programs:         '++id, userId'
workouts:         '++id, programId'
workoutExercises: '++id, workoutId'
workoutLogs:      '++id, userId'
logExercises:     '++id, workoutLogId'
logSets:          '++id, logExerciseId'
bodyMetrics:      '++id, userId'
dailyCheckins:    '++id, userId'
```

> **Schema version — planned v3 bump (Decision #28, locked Session 41; executes when CE1 build session lands).**
>
> v3 delta:
> - **Nuke + reseed** (D8.1 sub-option B2): `exercises`, `logExercises`, `logSets` dropped and repopulated from the re-curated seed (29 exercises with full-schema tagging). Active/historical log data on these tables is wiped.
> - **Silent migration** (D8.3): no banner, no confirm. Acceptable pre-launch only — post-launch updates switch to in-place + banner pattern (see `memory/project_post_launch_migration_pattern.md`).
> - **Single version hop** (D8.4): all new/renamed fields bundle into one v3 bump — no v2.x intermediate.
> - **Additive nullable fields** (no data loss on unaffected tables): `users.rpeEnabled` (default `false`), `users.trainingAge`; `exercises.primaryMuscles`, `secondaryMuscles`, `equipment`, `gripWidth`, `gripOrientation`, `stanceWidth`, `bias`, `jointLoad`; `logSets.rpe`.
> - **Removed field:** `exercises.category` (broad group now derived via `getExerciseGroup`).
> - **Index changes:** `exercises` loses the `category` compound index (no replacement — broad-group filter is in-memory; 29-exercise scale, sub-millisecond).
> - **Unaffected tables:** `workouts`, `workoutExercises`, `workoutLogs`, `programs`, `bodyMetrics`, `dailyCheckins`. Pending v2-era additions (`bodyMetrics`, `dailyCheckins`, `workoutLogs.rating`, `users.goalWeight`) bundle into the same v3 hop.

Notes:
- No compound indexes — per-user and per-exercise result sets are small enough for JS filtering at MVP scale
- `finishedAt === null` remains the canonical definition of "active" — do not introduce an `isActive` field
- `name` on exercises supports Dexie prefix search (`.startsWithIgnoreCase()`)
- No multi-entry index on `exercises.primaryMuscles` — 29-row library; in-memory filter is <1ms. Re-evaluate if the library grows past ~200.

---

### Muscle Taxonomy Model (Decisions #24, #25, #29 — locked Session 40/41)

**`Muscle` (TS string union — camelCase per #29):**
- **User-surfaced (24):** `chest`, `lats`, `upperBack`, `lowerBack`, `upperTraps`, `lowerTraps`, `frontDelts`, `sideDelts`, `rearDelts`, `serratus`, `biceps`, `brachialis`, `triceps`, `forearms`, `quads`, `hamstrings`, `glutes`, `calves`, `adductors`, `abductors`, `hipFlexors`, `tibialis`, `abs`, `obliques`
- **Background (2) — seed-only, never user-tagged (D6.4):** `neck`, `rotatorCuff`

**`MuscleGroup` (TS string union — 6 broad groups):** `chest`, `back`, `shoulders`, `arms`, `legs`, `core`. Background `neck` attaches to `shoulders` group for derivation purposes.

**`MUSCLE_TO_GROUP: Record<Muscle, MuscleGroup>` (static map):**
- **chest:** chest, serratus
- **back:** lats, upperBack, lowerBack, upperTraps, lowerTraps
- **shoulders:** frontDelts, sideDelts, rearDelts, rotatorCuff, neck
- **arms:** biceps, brachialis, triceps, forearms
- **legs:** quads, hamstrings, glutes, calves, adductors, abductors, tibialis
- **core:** abs, obliques, hipFlexors

**`MUSCLE_LABELS: Record<Muscle, string>`:** Title Case display strings — e.g. `frontDelts → "Front Delts"`, `upperTraps → "Upper Traps"`, `rotatorCuff → "Rotator Cuff"`. Single source for all UI text referencing muscles (#29).

**Volume multipliers (Decision #24):**
- `SECONDARY_VOLUME_MULTIPLIER = 0.5` — applied to both `synergist` and `stabilizer` roles in MVP (B-lite)
- Primary = 1.0×
- Co-primaries allowed (no data cap); no cap on secondary count
- Future calibration of stabilizer vs synergist weighting possible without re-curation — only the multiplier constant changes

**`RECOVERY_WINDOWS: Record<Muscle, number>` (hours — Decision #25, config only; no UI this cycle):**
- **Large bucket (60h, 9):** chest, lats, upperBack, lowerBack, upperTraps, frontDelts, quads, hamstrings, glutes
- **Small bucket (36h, 15):** lowerTraps, sideDelts, rearDelts, serratus, biceps, brachialis, triceps, forearms, abductors, adductors, hipFlexors, calves, tibialis, abs, obliques
- **Background-small (36h, 2):** neck, rotatorCuff
- Galpin training-age modifier deferred to F37. `users.trainingAge` ships forward-compat in v3 so F37 can land without a schema bump.

**`getExerciseGroup(exercise: Exercise): MuscleGroup`** — derivation helper (replaces stored `category`):
- Returns `MUSCLE_TO_GROUP[exercise.primaryMuscles[0]]`
- **Tiebreaker:** first declared primary wins when co-primaries span groups (e.g. bench press `[chest, triceps]` → `chest`)
- All consumers of broad group (filter chips, F27 volume aggregation, F24 neglected callout, F28 push/pull balance, F29 avatar) must call this helper — never read a stored column

---

## Service Layer

All services are plain modules exporting functions. Currently call Dexie directly. Swap internals to `fetch()` when backend is built — components don't change.

| Service | Methods |
|---------|---------|
| AuthService | signup (accepts unitPreference — set at account creation), login, logout, getCurrentUser, getCurrentUserId |
| UserService | getProfile, updateProfile (now accepts `rpeEnabled` and `trainingAge` alongside existing fields) |
| ExerciseService | getAll, search (query + `group?: MuscleGroup`) — broad-group filter derived via `getExerciseGroup`; name search matches exercise name AND muscle tags (D7 — typing "triceps" surfaces exercises with triceps as primary or secondary); create (accepts new-schema fields: `primaryMuscles`, `secondaryMuscles`, and Tier 3 forward-compat fields `equipment`/`gripWidth`/`gripOrientation`/`stanceWidth`/`bias`/`jointLoad` — all nullable or default-empty) |
| ProgramService | getAll, getById, create, update, delete (cascade order: workoutExercises → workouts → program; children deleted before parent to prevent orphaned rows) |
| WorkoutService | getByProgramId, getById, create, update, delete (cascade order: workoutExercises → workout), reorder, createFromLog(logId, programId, workoutName) — creates workout + workoutExercises from a log; targetSets = logSet count per exercise, targetReps/targetWeight = first set values (0 if none) |
| WorkoutExerciseService | getByWorkoutId, add, update, remove, reorder, syncFromLog(workoutId, logId) — adds exercises in log but not in template, removes exercises in template but not in log; existing template exercises untouched; order of new exercises follows log order; getCountsByProgramId(programId) — returns Record<workoutId, number> of exercise counts for all workouts in a program in a single batch query (replaces N+1 pattern in ProgramDetailPage) |
| WorkoutLogService | getAll, getById, create (userId, workoutId nullable, name — quick-start: name = "Quick Workout [n+1]" where n = getAll(userId).length; from-program: name = workout template name; if workoutId provided, atomically copies workoutExercises → logExercises), finish, update, delete (cascade order: logSets → logExercises → workoutLog), getActive (returns log with finishedAt === null for current user, or null) |
| LogExerciseService | getByWorkoutLogId, add, remove, reorder |
| LogSetService | getByExerciseId, add (accepts optional `rpe: number \| null`), update (accepts optional `rpe`; missing RPE never blocks save per Decision #26), delete, getPreviousData (returns weight+reps by set number, fallback to last set — `rpe` is NOT pre-filled) |
| BodyMetricsService | getAll(userId), getRecent(userId, days), log(userId, entry), update(id, entry), delete(id) |
| DailyCheckinService | getAll(userId), getRecent(userId, days), logToday(userId, entry) — upsert, replaces today's entry if exists, delete(id) |
| StatisticsService | getSummary(userId), getExerciseHistory(userId, exerciseId, range), getVolumeByPeriod(userId, period), getPRs(userId), checkForPR(userId, exerciseId, weight, reps) — real-time set-save check, getRollingWeightAverage(userId, days), getRecompositionSignal(userId), getAdherenceRate(userId, weeks) |
| WorkoutLogService | (existing methods) + updateRating(id, rating) — save post-workout feel rating |

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
- 29 pre-seeded exercises — re-curated for CE1 with full-schema tagging: `primaryMuscles`, role-tagged `secondaryMuscles`, plus Tier 3 forward-compat fields (`equipment`, `gripWidth`, `gripOrientation`, `stanceWidth`, `bias`, `jointLoad`) populated where accurate data is available; otherwise null / `[]`
- Broad muscle group (chest/back/shoulders/arms/legs/core) is **derived** via `getExerciseGroup(exercise)` — not a stored column (Decision #28; see Muscle Taxonomy Model above)
- Users can create custom exercises (stored with `isCustom: true`) via the new two-step picker UX (Decision #27 — see ExerciseSearchModal Spec below)
- Search/filter by name + muscle tags + broad-group chip (D7); background muscles (`neck`, `rotatorCuff`) never surface in picker or search
- Surfaced via `ExerciseSearchModal` (bottom drawer overlay) — used by both Programs and Logs tabs

### ExerciseSearchModal Spec (C5 resolved — rewritten Session 41 for Decisions #27 (D6, D7))

Bottom drawer overlay. Used from WorkoutDetailPage (active/edit) and WorkoutTemplatePage. Picker + filter behavior locked via Decision #27.

#### Filter / browse mode (D7)

**Filter bar:**
- Broad-group chips: All | Chest | Back | Shoulders | Arms | Legs | Core — "All" selected by default, **single-select**
- Broad group per exercise computed via `getExerciseGroup(exercise)` — no stored category
- Search input — instant filter as user types; no debounce (29 items; sub-millisecond JS filter). Matches exercise `name` **and** muscle tags in `primaryMuscles` / `secondaryMuscles[].muscle` (e.g. typing "triceps" surfaces any exercise where triceps appears as primary or secondary)

**Results list row metadata:**
- Exercise name (primary line)
- Primary muscles (bold / accent color) + all secondaries in declared order
- Role distinguished by UI color — specific visual element (chip tint / text color / badge) TBD pre-build, flagged for design pass
- Background muscles (`neck`, `rotatorCuff`) never shown in row metadata (D6.4)

**Selection:**
- Tap exercise row → modal closes → exercise added to workout (`LogExerciseService.add()` or `WorkoutExerciseService.add()` depending on caller context)

**Empty state:**
- "No exercises found" + "＋ Create custom exercise" affordance → transitions to creation mode

#### Custom exercise creation (D6 — two-step inline flow, no new page)

**Step 1 — Name + broad groups (multi-select):**
- Name input (required; blank → "Name can't be blank")
- 6 broad-group chips: Chest, Back, Shoulders, Arms, Legs, Core — **multi-select** (tap to toggle; at least one required)
- "Next" advances when name is non-blank AND ≥1 group selected

**Step 2 — Muscle tagging (D6.1 sectioned by selected group, D6.2 two-tap cycle, D6.3 long-press promote):**
- Muscles listed under each group header (only groups selected in Step 1 are shown)
- Background muscles (`neck`, `rotatorCuff`) are NOT shown — seed-only (D6.4)
- Each muscle is a tappable chip with three role states (**two-tap cycle**):
  1. Neutral (nothing tagged) → tap to mark as **synergist**
  2. Synergist → tap to cycle to **stabilizer**
  3. Stabilizer → tap to remove (back to neutral)
- Role visual distinction uses the same UI color rule as filter row metadata (element TBD pre-build)
- Primary selection: **long-press on any tagged muscle → promote to primary** (D6.3). Long-pressing a second tagged muscle creates co-primaries. Long-press on a primary demotes it back to synergist. Tutorial hint queued for F30 (first-run onboarding).
- At least one primary is required to save. If user saves without promoting anything, first selected muscle is auto-promoted (guard — UX copy TBD pre-build).
- **Save** → `ExerciseService.create({ name, primaryMuscles, secondaryMuscles, equipment: null, gripWidth: null, gripOrientation: null, stanceWidth: null, bias: null, jointLoad: [], isCustom: true })` → new exercise added to list and immediately selected → modal closes

**Dismissal:**
- Tap outside overlay → modal closes, no exercise added (from any step)
- Back from Step 2 → returns to Step 1 with name + group selections preserved

**Picker UX alternatives parked for post-build review** (see `memory/project_picker_ux_post_build.md`): Option 2 (two-pane Step 1) and Option 4 (combo shortcuts for common muscle clusters). D6.4 alternatives (B: show background muscles collapsed; C: separate advanced mode) also parked.

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
- Layout: full-screen dark, centered card (UIdesign.md auth layout)
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
| 15 | WorkoutFAB behavior | No active workout: "Start Workout" on Logs tab only — hidden on all other tabs; Active workout: "Resume Workout" on all tabs → /logs/:id; Disabled/inert on /logs/:id in active mode (opacity 0.35, no onClick — keeps nav center slot filled); Hidden on /login and /signup |
| 16 | Device keyboard handles text correction | Mobile keyboards provide native auto-correct on all text inputs — no custom implementation needed |
| 17 | Quick-start finish flow — save to program | Modal: "Save to program?" → Skip: log stays unassigned (/logs); Save: picker shows existing programs + "＋ New Program" at top; if zero programs, skip picker and show blank inputs directly. Workout name input is always blank (no pre-fill). Cancel at any point after finishing navigates to /logs. |
| 18 | WorkoutLogService.create pre-fill behavior | When workoutId is provided, create atomically copies workoutExercises → logExercises in the same call. When workoutId is null (quick-start), creates an empty log with no exercises. Caller never manages the copy step. |
| 19 | From-program finish flow — exercise sync | Unmodified (same exercise set): finish silently → /logs. Modified (any addition or removal): Modal "Update [Workout Name]?" → [Update Template]: syncFromLog adds/removes exercises to match log, existing targets untouched → /logs; [Keep Original] → /logs. Order changes are ignored — set comparison only. |
| 20 | Start Workout from empty template | Tapping "Start Workout" on a WorkoutTemplatePage with zero exercises shows inline message: "Add at least one exercise to start." User stays on page. Starting an empty template is blocked — quick-start via FAB is the correct path for an unplanned session. |
| 21 | WorkoutDetailPage mode-switching | Mode derived from finishedAt on load: null = Active, value = Read-only. Edit is always a local state transition from Read-only — never loaded directly from URL. Back tap in Edit mode shows "Discard changes?" Modal (not silent discard) — protects against accidental loss of re-edit work. |
| 22 | Unit storage and conversion | All weights stored in lb, heights in inches — canonical units regardless of user preference. Conversion to kg/cm happens at display time only via UserSettingsContext. unitPreference: 'imperial' (default) or 'metric' replaces the old 'lb'/'kg' string — one toggle controls all Layer 1 units (weight, height, body measurements). Layer 2 units (time, distance, calories, HR) are universal or require new tables — unaffected by this decision. Floating point drift (~0.1%) is imperceptible in a gym context. Future: per-entry unit override (e.g. powerlifting/competition lifts logged in kg regardless of global preference) is a known need — requires storing unit per entry; deferred post-MVP. |
| 23 | Unit visibility and signup | Unit label shown beside every weight input ("lb" or "kg" from UserSettingsContext) — user always knows what unit they are entering. Unit preference selected at signup (Imperial/Metric) — prevents corrupt historical data before user visits Profile. Note shown at signup: preference can be changed anytime in Profile. All weight inputs and displayed values across active workout, read-only, edit mode, and Edit Targets Modal follow this rule. |
| 24 | Muscle taxonomy + volume model (CE1 — D1, D2, D3, D4) | 24 user-surfaced + 2 background muscles (`neck`, `rotatorCuff`). 6 broad groups (chest/back/shoulders/arms/legs/core) **derived** from specific muscle via static `MUSCLE_TO_GROUP` map — no stored `category`. Primary 1.0× / secondary 0.5× via `SECONDARY_VOLUME_MULTIPLIER`. Co-primaries allowed when EMG/research supports; no cap on secondaries. Each secondary tagged with role `synergist \| stabilizer` (D4 B-lite — both 0.5× in MVP; future calibration without re-curation). Broad group determined by `getExerciseGroup()` — first declared primary wins tiebreaker. |
| 25 | Recovery windows (CE1 — D5) | Static `RECOVERY_WINDOWS` config, no UI this cycle. Large bucket 60h (9 muscles), small bucket 36h (15), background-small 36h (2). Referenced by future fatigue/recovery stats (F29 Muscle Fatigue Avatar). Galpin training-age modifier deferred to F37; `users.trainingAge` ships forward-compat in v3 so the modifier lands without a schema bump. |
| 26 | RPE per set — opt-in (CE1 — D-new-3) | `users.rpeEnabled` (default `false`). When true, per-set RPE input (1–10 scale, half-points allowed: 7.5, 8.5) in active workout and edit mode. Optional even when enabled — never blocks set save. No pre-fill (always starts blank). Toggle exposed app-wide via `UserSettingsContext.rpeEnabled` (hydrated from `AuthContext.user` on login alongside `unitPreference`; reset on logout). Toggle surfaced in Profile for MVP; introduced to users via first-run onboarding tutorial (F30); moves to feature toggle menu next cycle (F32). All RPE-derived stats (e1RM, RPE-adjusted volume, fatigue curves, etc.) deferred to F34 — only raw capture ships this cycle. |
| 27 | Exercise picker + filter UX (CE1 — D6, D7) | **Filter:** 6 broad-group chips single-select + name/tag search (matches name AND muscle tags). Row metadata shows primary + all secondaries; role distinguished by UI color (specific element TBD pre-build). **Custom create:** two-step flow — Step 1 name + multi-select broad groups → Step 2 sectioned muscle chips with two-tap role cycle (neutral → synergist → stabilizer → remove); long-press to promote to primary (co-primaries allowed). Background muscles never surface in picker or row metadata (D6.4). |
| 28 | Schema migration to v3 — nuke and reseed (CE1 — D8) | v3 bump drops `exercises` + `logExercises` + `logSets` and repopulates from re-curated seed (D8.1 sub-option B2). Silent migration, no banner (D8.3) — pre-launch only; post-launch pattern switches to in-place + banner (see `memory/project_post_launch_migration_pattern.md`). All new/renamed fields bundle into a single v3 hop (D8.4). `exercises.category` removed; broad group derived via `getExerciseGroup()`. Tier 3 forward-compat fields (`equipment`, `gripWidth`, `gripOrientation`, `stanceWidth`, `bias`, `jointLoad`) added nullable so future Group 2 dimensions (F39) land without a schema bump. |
| 29 | Naming conventions for muscle taxonomy (CE1 — D9) | `Muscle` IDs camelCase (`frontDelts`, `upperBack`, `rotatorCuff`). Display labels Title Case (`Front Delts`, `Upper Back`, `Rotator Cuff`) sourced from single `MUSCLE_LABELS: Record<Muscle, string>` map. `Muscle` and `MuscleGroup` are TS string unions for type safety. All related concepts (groups, roles, buckets, tiers) also camelCase. |

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
| U9 | gym-goer | track my body measurements and daily recovery signals alongside workout performance | I can see whether I'm genuinely recomping, not just relying on scale weight | Deferred — Statistics tab post-MVP |

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
| S1 | Planning | Energy/hunger 1–10 selector UX — closed; both fields removed from spec (session 32 research). Replaced by per-workout feel rating (3-level, captured at finish flow). | Closed | Statistics | Resolved |
| S2 | Planning | Goals card field location — currently on Statistics tab; re-evaluate after Statistics is built whether any belong on Profile | Post-Statistics build | Statistics, Profile | Pending |
| S3 | Planning | Wearable API integration (HRV, steps auto-sync) — post-MVP; manual entry only for now | Post-MVP | Statistics | Future |
| S4 | Planning | Weekly adherence removed — lacks honest denominator without active program tracking. Replaced by Program Intelligence feature set (F20–F25): current split detection, favorite exercises, efficacy signals. All derivable from existing schema; deferred post-MVP. | Resolved | Statistics | Resolved |
| F1 | Future | Auto-suggest exercise names from library in text input fields | Post-MVP | Logs, Programs | Future |
| F2 | Future | Set completion indicator — visual feedback (checkmark or color change) on set row after auto-save | Post-MVP | Logs | Future |
| F3 | Future | Smart defaults — pre-fill weight/reps inputs with previousWeight/previousReps when new set added | Post-MVP | Logs | Future |
| F4 | Future | Workout duration — display finishedAt - startedAt on finished log cards and read-only view | Post-MVP | Logs | Future |
| F5 | Future | Basic rest timer — auto-starts on set log, sound/vibration at zero, non-customizable | Post-MVP | Logs | Future |
| F6 | Future | "Create a program from this workout" — from a finished log, create a new program using that workout's exercises as the template; targets set from logged sets | Post-MVP | Logs, Programs | Future |
| F8 | Future | Bodyweight + added weight display — add `isBodyweight` bool to exercises table; when true and targetWeight > 0, display as "top set: BW +X lbs" instead of "top set: X lbs". Requires schema migration. | Post-MVP schema change | Logs, Programs, DB | Future |
| F9 | Future | Rearrange exercises — drag-to-reorder exercise list on active workout and workout template. Requires `sortOrder` int on `logExercises` and `workoutExercises`. | Post-MVP schema change | Logs, Programs, DB | Future |
| F10 | Future | Redesign WorkoutTemplatePage bottom action area — revisit after OD6 (CSS button token standards) is resolved. | Post-MVP polish | Programs | Future |
| F12 | Future | Log history date context + calendar view — two parts: (1) weekday headers get date suffix within last 7 days ("Monday (5th)"); (2) beyond 7 days, replace grouped list with a calendar view showing workout vs rest days; tapping a workout day drills into that day's log. Open questions: month vs week-strip layout, multiple workouts in one day, rest day marking, entry point on LogsPage. | Post-MVP | Logs | Future |
| F13 | Future | Daily protein tracker — progress bar showing protein intake vs daily target (from `proteinTarget` on users table). Flow: Stats or Logs tab → Protein Log → tap + → enter grams → tap Log → bar updates with grams remaining or positive reinforcement if full. Reset time controlled by user setting (see F14). Open questions: (1) entry point — Stats tab vs Logs tab; (2) lock screen widget (iOS Live Activity / Android widget) showing live bar under clock — requires native shell (React Native or Capacitor); not achievable in PWA alone. Schema: requires `dailyCheckins.proteinGrams` and `users.proteinTarget` — both specced in Statistics phase (session 26); not yet built. | Post-MVP | Stats/Logs, DB | Future |
| F14 | Future | Protein tracker reset time setting — user-configurable in Profile tab. Options: midnight (default) vs 2am (for midnight snackers). Stored on `users` table (new field: `proteinResetHour: number`, default 0). Displayed in Profile tab under a "Nutrition" settings section. | Post-MVP | Profile, DB | Future |
| F15 | Future | Lock screen protein bar widget — native shell required (React Native or Capacitor). iOS: Live Activity under clock; Android: home/lock screen widget. Shows live protein bar synced to F13 data. Not achievable in PWA alone — flag when deciding mobile strategy. | Post-MVP (native only) | Native, Stats | Future |
| F16 | Future | Bio-metric equation engine — calculate health/fitness metrics from user inputs (weight, height, body measurements), stored history, and integrated data (steps). Accuracy vs accessibility tradeoff is a core design constraint: DEXA is gold standard but inaccessible; navy tape method + circumference inputs are accessible and reasonably accurate. Brainstorm needed before building. See F17–F19 for specific metrics. | Post-MVP (brainstorm first) | Stats, Profile, DB | Future |
| F17 | Future | Body fat predictor — estimate BF% from accessible inputs. Candidate equations: US Navy method (neck + waist [+ hip for women] + height), BMI-based Jackson-Pollock approximation, or skinfold-entry simulation. Must decide: (1) which equation(s) to use; (2) which measurements to collect (store on `bodyMetrics` table — fields may need to expand); (3) whether to show a range rather than a point estimate to communicate uncertainty. No integration required — pure calculation from user input. | Post-MVP | Stats, DB | Future |
| F18 | Future | Sleep analysis — beyond raw hours logged, derive quality signals: consistency score (variance in bedtime/wake time across 7 days), debt tracker (cumulative shortfall vs `sleepTarget`), trend line. Inputs from `dailyCheckins.sleepHours`. Open question: whether to prompt for sleep/wake times separately (richer data) vs just total hours (current schema). | Post-MVP | Stats, DB | Future |
| F19 | Future | Step quality — go beyond raw step count to measure activity distribution: active minutes, step cadence buckets (strolling vs brisk vs running pace), streak tracking. Requires steps data source decision (S3: wearable API vs manual entry). Manual entry can only give daily totals — richer cadence data needs a wearable or phone sensor integration. | Post-MVP | Stats, Native/API | Future |
| F20 | Future | Favorite exercises per muscle group — for each broad group (via `getExerciseGroup()`), rank by frequency in `logExercises`; surface top exercise per group. "Your go-to chest exercise: Bench Press (18 sessions)." No schema changes. Service: `StatisticsService.getFavoriteExercises(userId)`. | Post-MVP | Stats | Future |
| F21 | Future | Program usage frequency — count sessions logged per program (via `workoutId → workout.programId`); rank by session count and avg sessions/week. Surface most-used program and most-logged workout template. No schema changes. Service: `StatisticsService.getProgramUsage(userId)`. | Post-MVP | Stats | Future |
| F22 | Future | Current split detection — retroactively derive contiguous program usage periods ("current split") from log history. Algorithm: group logs by week; a split begins when ≥60% of a week's workouts belong to one program; ends when that drops below 60% for 2+ consecutive weeks. Returns `{ programId, startDate, endDate, sessionCount }[]`. No schema changes. Service: `StatisticsService.getCurrentSplits(userId)`. Replaces adherence rate (S4). | Post-MVP | Stats | Future |
| F23 | Future | Program efficacy — per current split (F22), compute: PR density (PRs ÷ sessions), volume growth rate (last 4 weeks vs first 4 weeks), consistency rate (sessions/week), recomposition correlation (requires bodyMetrics Section 2). Only shown when split ≥8 sessions. Display as correlation, not causation. No schema changes. Service: `StatisticsService.getProgramEfficacy(userId, programId)`. | Post-MVP | Stats | Future |
| F24 | Future | Neglected muscle group callout — cross-reference broad group (via `getExerciseGroup()`) against most recent log date per group; alert when a group has no logged exercise in last N days (threshold TBD). "You haven't logged a leg exercise in 18 days." No schema changes. Service: `StatisticsService.getNeglectedGroups(userId, thresholdDays)` (renamed from `getNeglectedCategories` per Decision #24). | Post-MVP | Stats | Future |
| F25 | Future | De facto program inference — reconstruct user's actual typical week from log frequency (most common exercise per day-of-week across last 30 sessions). Surface as "Based on your logs, your typical week looks like…" Useful for users who only quick-start and have never built a formal program. No schema changes. Most complex query in Section 7 — build last. | Post-MVP | Stats | Future |
| F26 | Future | Workout Stats Card — "Most Skipped Workout": per-program breakdown of session completion counts; workout with fewest logs surfaces as most skipped. Time filter: 30 / 90 / 365 / all time. No schema changes. Service: `StatisticsService.getWorkoutCompletionCounts(userId, programId)`. Only meaningful when user has from-program sessions. | Post-MVP | Stats | Future |
| F27 | Future | Workout Stats Card — "Volume by Muscle Group": sum of `weight × reps` per broad group (via `getExerciseGroup()`) across finished logs. Time filter: 30 / 90 / 365 / all time. Bodyweight sets (weight = 0) excluded from tonnage. **Upgraded by Decision #24:** with `primaryMuscles` + `secondaryMuscles` + `SECONDARY_VOLUME_MULTIPLIER`, F27 can now attribute volume at specific-muscle granularity (not just broad group) — primary contributes 1.0× volume, each secondary contributes 0.5×. Service: `StatisticsService.getVolumeByMuscleGroup(userId, range)`. Display: bar chart or number cards per group. | Post-MVP | Stats | Future |
| F28 | Future | Workout Stats Card — "Muscle Group Balance": push/pull/legs ratio from F27 volume data — chest + shoulders = push; back = pull; legs = legs; arms split evenly; core standalone. Reuses `getVolumeByMuscleGroup()` — no extra service method. Secondary metric: set count per group per week. **Upgraded by Decision #24:** arms ambiguity (biceps vs triceps) resolved — `biceps`/`brachialis` contribute to pull; `triceps` contributes to push (no 50/50 split). Display approach TBD (raw % split vs. push/pull/legs ratio vs. imbalance flag). | Post-MVP | Stats | Future |
| F30 | Future | Introductory onboarding tutorial — post-MVP, after all features complete. Two purposes: (1) collect essential user data at first run: age, weight, height, gym experience level (beginner / intermediate / advanced — maps directly to training age used by Statistics features), unit preference, and any other fields needed by built features at that point; (2) guided walkthrough teaching users how to use the app and each feature correctly. Schema: `users.age: number | null`, `users.trainingAge: 'beginner' \| 'intermediate' \| 'advanced' \| null` (or similar). Gym experience field solves the training age gap identified in coach analysis (F29 and Statistics features need this context). Tutorial flow design TBD — decide when feature set is finalized. | Post-MVP (all features done) | Auth, Profile, Stats, All | Future |
| F29 | Future | Muscle Fatigue Avatar — visual body silhouette (SVG model) showing per-muscle fatigue/recovery state via color discoloration. Warm/red = recently trained (needs recovery); cool/green = recovered (ready to train); grey = untrained. **Now driven by specific-muscle model (Decision #24):** color derived from time elapsed since last training per `Muscle` (via `primaryMuscles` + `secondaryMuscles`) against `RECOVERY_WINDOWS` (Decision #25 — 60h large / 36h small / 36h background-small). Secondaries contribute fractional fatigue via `SECONDARY_VOLUME_MULTIPLIER`. No schema changes — derives from `logExercises → exercises.primaryMuscles/secondaryMuscles → workoutLogs.finishedAt`. **Placement TBD**: Statistics tab or Profile tab — decide when SVG model is complete. **CE1 prerequisite RESOLVED** — arms split + compound multi-muscle tagging locked via Decision #24 (was pending in CE1). Awaits F37 (training-age modifier) for per-user recovery adjustment. | Post-MVP | Stats, Profile | Future |
| F31 | Future | Injury-Warning system (F-new) — cross-reference `exercises.jointLoad` tags (curation pending F33) × cumulative load × recovery state; warn user when a joint is accumulating stress. Depends on F34 (RPE-derived stats) and F33 (jointLoad curation UI). `jointLoad: string[]` field ships in v3 as forward-compat — no schema bump needed when F31 lands. | Post-MVP (deferred cycle) | Stats, DB | Future |
| F32 | Future | Feature toggle menu (D-new) — granular per-feature opt-ins for advanced tracking dimensions (RPE, bias, fatigue ratio, grip, stance, tempo, bilateral). Default minimal experience; power users opt in to dimensions they want. Absorbs `users.rpeEnabled` (currently surfaced standalone in Profile — Decision #26). See `memory/project_feature_toggle_menu.md`. | Post-MVP (next cycle) | Profile, App-wide | Future |
| F33 | Future | Joint load tagging UI — `exercises.jointLoad` ships forward-compat (default `[]`) in v3, but no UI to populate during seeding or custom-exercise creation, and no display surface. Pairs with F31 (Injury-Warning system). Curation approach TBD (seed-only vs user-editable). | Post-MVP | Exercises, Stats | Future |
| F34 | Future | RPE-derived stats — full list in `memory/project_rpe_deferred_features.md`: e1RM tracking (Brzycki/Epley), RPE-adjusted volume, RIR inference, fatigue curves over session, session-avg RPE trends, auto-regulation suggestions, PR-likelihood indicator, etc. None ship this cycle; only raw `logSets.rpe` capture + toggle (Decision #26). | Post-MVP (next cycle) | Stats | Future |
| F35 | Future | Exercise library expansion — grow seed library from 29 to 30–50 exercises with full new-schema tagging (primaryMuscles, role-tagged secondaries, Tier 3 fields where applicable). Pairs with F36 (cues/instructions content). EMG citations required per seed per Decision #24 sourcing standard. | Post-MVP (separate cycle) | Exercises | Future |
| F36 | Future | Exercise cues / instructions content — per-exercise setup/form guidance shown in picker or detail view. Content-heavy work; pairs with F35. Schema impact TBD (likely `exercises.cues: string \| null` additive) when scoped. | Post-MVP (later cycle) | Exercises | Future |
| F37 | Future | Training-age modifier on recovery windows (Galpin) — adjust `RECOVERY_WINDOWS` (Decision #25) based on trainee experience. `users.trainingAge: string \| null` ships forward-compat in v3 (Decision #28); consumer logic deferred to next cycle. Needed before F29 (Muscle Fatigue Avatar) shows per-user-adjusted recovery. Values TBD (likely `beginner \| intermediate \| advanced` aligned with F30 onboarding). | Post-MVP (next cycle) | Stats, Profile | Future |
| F38 | Future | Cardio / conditioning tracking — doesn't fit current muscle-target schema; needs separate log shape. Slot under future exercise type/equipment dimension (F39 — D15 next cycle). See `memory/project_cardio_tracking.md`. | Post-MVP (dedicated cycle) | Logs, DB | Future |
| F39 | Future | Group 2 dimensions (D10–D17) — full UX + feature work for bias, fatigue ratio, grip width, grip orientation, stance width, equipment, tempo, bilateral. Tier 3 schema fields already live in v3 as nullable strings (`exercises.equipment`, `gripWidth`, `gripOrientation`, `stanceWidth`, `bias`) — no future schema bump needed. UX, enums, consumer logic, and per-dimension-specific decisions (e.g. D15.2–D15.5 load input UX, D16 tempo definition-level vs program-level vs per-set, D17 logSets.side for bilateral) deferred to next cycle(s). | Post-MVP (next cycle) | Exercises, Logs, Stats | Future |
| CP1 | Cleanup | Delete "Coach Review Panel" section from statistics.md after F27/F28/F29 build is complete. Research aid only — not permanent spec. | Post F27/F28/F29 | Stats | Pending |

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
| B1 | Bug | Dangling workoutId on program delete | Medium | Logs | Resolved — null-check workoutId; falls back to quick-start flow |
| B2 | Bug | Spinner arrows on set input fields (weight/reps) do not save the new value | High | Logs | Resolved — saveSet() helper + onChange inputType check (session 23) |
| B3 | Bug | Active Issues table B1 row missing Severity and Area columns — normalize all Bug rows to match header | Low | Artifacts | Resolved — normalized (session 30) |
| N1 | Planning | WorkoutFAB hidden logic | Built — FAB compares route :id against activeWorkoutId; F11 (2026-04-14): changed from hidden → disabled/inert on active workout page |
| N2 | Planning | Finish flow state machine | Confirmed session 7 — no simplification |
| N3 | Planning | Context dependency chain | Resolved session 7 — UserSettingsContext reads from AuthContext |
| N4 | Planning | Height display format | Resolved session 7 — raw number + label; ft+in post-MVP |
| F7 | Future | Target weight display label | Built session 18 — "| top set: x lbs" |
| G1 | Gap | Delete workout log UI | Resolved during MVP audit |
| G8 | Gap | Previous weight × reps display | Resolved during MVP audit |
| CE1 | Planning | Custom exercise deep dive | Resolved sessions 39–41 — muscle taxonomy + picker/filter UX + migration strategy all locked. Implementation scope = Tier 1 (Decisions #24–#29 + RPE per Decision #26) + Tier 3 forward-compat schema fields. Tier 2 full UX for Group 2 dimensions deferred to F39. Arms ambiguity → `biceps`/`brachialis`/`triceps` as distinct muscles (not "arms" bucket). Compound multi-muscle tagging → `primaryMuscles: Muscle[]` + role-tagged `secondaryMuscles`. Edit-after-creation → same two-step picker flow; deferred to next session's tab-spec patch. Mobile picker UX → Decision #27 (multi-select groups Step 1, sectioned chips Step 2). Session 42 patches tab specs (logs / profile / statistics); Session 43 re-curates 29 seeds with EMG citations. |

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
| 2026-04-22 | **Session 41 — CE1 spec patch 1 of 3 (master-schematics only).** DB schema v3 delta locked: `exercises` gets `primaryMuscles: Muscle[]`, `secondaryMuscles: { muscle, role }[]` (role-tagged per Decision #24 B-lite), plus Tier 3 forward-compat fields (`equipment`, `gripWidth`, `gripOrientation`, `stanceWidth`, `bias`, `jointLoad`); `users` gets `rpeEnabled` + `trainingAge`; `logSets` gets `rpe`. Dropped `exercises.category` — broad group now derived via `getExerciseGroup()` helper (first primary wins tiebreaker). New "Muscle Taxonomy Model" sub-section: 26 muscles (24 user-surfaced + 2 background), 6 groups, `MUSCLE_TO_GROUP` map, `MUSCLE_LABELS`, `SECONDARY_VOLUME_MULTIPLIER = 0.5`, `RECOVERY_WINDOWS` (60h/36h/36h-bg). Service Layer: `ExerciseService.search` signature updated for D7 (group filter + muscle-tag name match); `UserService.updateProfile` + `LogSetService.add/update` accept new fields. ExerciseSearchModal Spec fully rewritten for Decision #27 (D6 two-step picker with two-tap role cycle + long-press promote, D7 6-chip filter + muscle-tag search, D6.4 background muscles never surfaced). Six Decisions #24–#29 appended. Issue Tracker: CE1 moved to Resolved; F31–F39 added (Injury-Warning, feature toggle menu, jointLoad UI, RPE-derived stats, library expansion, cues/instructions, training-age modifier, cardio tracking, Group 2 dimensions); F20/F24/F27/F28/F29 language patched to reference derived group instead of `exercises.category`. Sessions 42 (tabs) + 43 (seed re-curation) follow. |
| 2026-04-21 | Artifact cleanup (session 30): F13 false schema claim corrected ("already defined" → "specced in Statistics phase; not yet built"); UIdesign.md page title 20px/600 → 24px/700; FAB states split into disabled/inert (active workout page) vs hidden (auth pages); Decision #15 updated to match; Phase 4 status "not started" → "in progress"; B1 row normalized (Severity + Area added); B3 closed |
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
