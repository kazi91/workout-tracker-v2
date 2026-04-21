# HANDOFF — NEW INSTANCE START HERE
Last updated: 2026-04-21 (session 38 — commit cleanup; sessions 31–37 landed as 3 commits on main)

---

## Read These Files First
Check **CLAUDE.md → CURRENT TASK** for session scope and required reading.
Always read `artifacts/recap.md`. Read other files only as scoped by CURRENT TASK.

Full file index (reference — do not read all of these every session):
1. `artifacts/recap.md`             — current state, decisions summary, next steps
2. `artifacts/master-schematics.md` — DB schema, service layer, all locked decisions, issue tracker
3. `artifacts/tabs/logs.md`         — Logs tab spec (user flows complete)
4. `artifacts/tabs/programs.md`     — Programs tab spec (user flow complete)
5. `artifacts/tabs/profile.md`      — Profile tab spec (placeholder — no flow for MVP)
6. `artifacts/tabs/statistics.md`   — Statistics tab spec (revised session 33 — fluff removed, PR celebration + feel rating + Logs indicator added; build deferred to post-D5)
7. `artifacts/UIdesign.md`          — UI standards, color palette, component specs, design brainstorm

---

## Project Info
- GitHub repo: https://github.com/kazi91/workout-tracker-v2 (public)
- CLAUDE.md active at project root (auto-loaded by Claude instances)
- .gitignore created at project root

---

## Build State
**Phase 3 Build is complete.** All 6 steps built, verified, and committed. UI polish pass complete. Demo delivered.
**Phase 4 — Testing & cleanup.** D8 + service layer test audit + D5 (ErrorContext) all complete. 72/72 tests passing. Statistics research done (session 35) — spec updated, key UX decisions locked. Statistics build is next.

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
- P5: Charting library — decide before Statistics build (Recharts recommended)
- S1: Energy/hunger selector UX — chips vs stepper; decide at Statistics build step 7
- S2: Goals card field location — re-evaluate after Statistics is built; profile.md untouched for now
- S3: Wearable API integration — post-MVP; manual entry only. Body fat % uses manual entry + Navy formula "Estimate for me" button (session 35). Neck circumference (`neckIn`) stored in `bodyMetrics` table alongside waist/hip (session 35).
- S4: Weekly adherence edge cases — no active program, multiple programs; decide at Statistics build step 9
- D5: ErrorContext — replace console.error with user-facing error surface
- **D8: Test infrastructure** — DONE (session 29): Vitest + RTL + fake-indexeddb + jsdom installed; 20 tests passing across units.test.ts, WorkoutLogService.test.ts, WorkoutDetailPage.test.tsx; see recap.md TEST COVERAGE
- F1–F6, F8–F10: future features — see Issue Tracker
- OD6: CSS button token standards — brainstorm session pending before enforcing
- **Post-demo cleanup:** DONE (session 25) — demo-seed.js, PRESENTATION_AID.md, PRESENTATION_AID.html deleted; README.md created; repo public
- **Statistics spec:** DONE (session 26) — full body recomposition feature set specced; 2 new tables, 4 new user fields, 3 new services; build deferred until after testing phase

### Resolved (record only — do not reopen)
- F7: Target weight display — resolved session 18 ("| top set: x lbs")
- All planning items P1–P4, P6–P9 — resolved during Phase 2
- All gaps G1–G3, G5–G7 — resolved during Phase 3 build
- All pre-build gaps D1–D4, D6–D7 — resolved before or during build
- B1: Dangling workoutId on program delete — resolved session 11

Do not re-open planning decisions unless the user explicitly raises them.

---

## Phase 4 State

D8 complete. Infrastructure in place: Vitest + RTL + fake-indexeddb + jsdom. DB isolation pattern: `beforeEach(() => db.delete() + db.open())` on the singleton.
U4 + U5 UI guards complete (session 31): finish blocked with 0 exercises; Save Edits blocked on blank name or 0 exercises; useScrollToError hook with IntersectionObserver bounce arrow; 3 RTL tests added.

D5 complete (session 34): all 12 files wired with ErrorContext try/catch. WorkoutDetailPage.test.tsx updated with ErrorContext mock. 72/72 tests passing.

Remaining test priority order:
1. ~~WorkoutLogService (create, finish, delete cascade)~~ — DONE (session 29)
2. ~~U4 + U5 WorkoutDetailPage guards~~ — DONE (session 31)
3. ~~Service layer audit~~ — DONE (session 32)
4. Finish flow state machine paths (all 4 quick-start paths + from-program sync)
5. Auth flow (signup → login → logout)
6. ActiveWorkoutContext initialization

Exit criteria: see recap.md — PHASE 4 EXIT CRITERIA section.

---

## Recent Sessions (most recent first)

**Session 38 — 2026-04-21:** Housekeeping — commit cleanup. Sessions 31–37 landed on main in 3 logical commits: `69ab01c` (U4/U5 guards + D5 ErrorContext), `3f48f05` (service test audit + U4/U5 RTL tests — 72/72 green), `e0e8917` (Statistics spec revision: F20–F30, CE1, S1/S4 resolved). Pre-commit verification: build clean + 72/72 tests passing. Working tree clean; 3 commits ahead of origin/main (not pushed). No code changes. Next: Session 39 — CE1 deep dive (research mode) per cycle plan (A→B→C: commit → CE1 research → finish-flow/ActiveWorkoutContext tests → Phase 4 close → Statistics build).

**Session 36 — 2026-04-21:** S4 research and resolution — no code written. Weekly adherence metric dropped: lacks honest denominator without active program tracking. Replaced by Program Intelligence feature set (F20–F25): favorite exercises per muscle group, program usage frequency, current split detection (retroactive from log history — ≥60% of week's workouts from one program), program efficacy (PR density + volume growth per split), neglected category callout, de facto program inference. All derivable from existing schema; no new tables. "Stint" renamed to "current split". All features logged as Future in Issue Tracker; Section 7 added to statistics.md. OD6 (button tokens) deferred — research not started.

**Session 37 — 2026-04-21:** Statistics research continued — no code written. F26–F28 logged (Workout Stats Card: most skipped, volume by muscle group, balance). Time filters locked: 30/90/365/all (7-day dropped). Volume tracking without RPE: tonnage + weekly set count per muscle group. Custom exercise UX gaps identified — CE1 logged in Issue Tracker. F28 display approach TBD. Next: CE1 deep dive research session.

**Session 35 — 2026-04-21:** Statistics research session — no code written. P5/S4/OD6 deferred to their respective build steps. Locked: body fat % = manual entry + Navy formula "Estimate for me" button; neck circumference (`neckIn`) in `bodyMetrics` table; body metrics form pre-fills from most recent entry. statistics.md updated.

**Session 34 — 2026-04-21:** D5 complete. Finished wiring ErrorContext try/catch into the 3 remaining page files. Fixed WorkoutDetailPage.test.tsx to mock ErrorContext (useError must be used inside ErrorProvider — test render wrappers don't include it). Build clean; 72/72 passing. Next: Statistics build — resolve P5/S4/OD6 first; read artifacts/tabs/statistics.md.

- `src/pages/ProgramDetailPage/index.tsx` — loadData, handleNameBlur, submitAddWorkout, handleConfirmDelete wrapped
- `src/pages/WorkoutTemplatePage/index.tsx` — import + useError added; loadData, handleNameBlur, handleExerciseSelect, handleRemoveExercise, handleSaveTargets, handleStartWorkout, handleConfirmDelete wrapped
- `src/pages/WorkoutDetailPage/index.tsx` — import + useError added; loadData, handleNameBlur, handleExerciseSelect, handleRemoveExercise, handleAddSet, handleSetUpdate, handleSetDelete, handleSaveEdits, handleDeleteWorkout, handleConfirmDiscard, handleFinish, handleSaveNewProgram, handleSaveToExistingProgram, handleUpdateTemplate wrapped
- `src/pages/WorkoutDetailPage/WorkoutDetailPage.test.tsx` — added `vi.mock('../../context/ErrorContext', ...)` stub

**Session 33 — 2026-04-21:** Two parts. (1) Statistics spec research + revision: removed HRV, hunger rating, arm/thigh circumference, orphaned goal targets (protein/step/sleep); added post-workout feel rating (`workoutLogs.rating` nullable 1–3), PR celebration at set-save (`StatisticsService.checkForPR()`, non-blocking) + finish summary, Logs tab consistency indicator. Schema trimmed across users/bodyMetrics/dailyCheckins; S1 closed; device sync deferred (Capacitor). (2) D5 partial build: ErrorContext + ErrorBanner infrastructure created; App.tsx + 9 files wired; ProgramDetailPage import/useError added but handlers not wrapped.

Files DONE (no further edits needed):
- `src/context/ErrorContext.tsx` — NEW: ErrorProvider, useError(), toUserMessage()
- `src/components/ErrorBanner/index.tsx` + `ErrorBanner.module.css` — NEW: fixed top banner, red, X dismiss, z-index 300
- `src/App.tsx` — ErrorProvider wraps everything; ErrorBanner renders inside it; seed .catch(console.error) intentionally left (App can't call useError — it's the provider's parent)
- `src/context/ActiveWorkoutContext.tsx` — .catch(console.error) → .catch((e) => showError(toUserMessage(e)))
- `src/components/ExerciseSearchModal.tsx` — getAll .catch replaced; handleCreate wrapped
- `src/pages/LoginPage/index.tsx` — handleSubmit wrapped
- `src/pages/SignupPage/index.tsx` — handleSubmit wrapped
- `src/pages/ProfilePage/index.tsx` — all 4 handlers wrapped
- `src/pages/ProgramsPage/index.tsx` — loadData + submitCreate wrapped

Files PARTIALLY done (import + useError added, handlers NOT yet wrapped):
- `src/pages/ProgramDetailPage/index.tsx` — import and `const { showError } = useError()` added; still need try/catch on: loadData, handleNameBlur, submitAddWorkout, handleConfirmDelete

File NOT started:
- `src/pages/WorkoutTemplatePage/index.tsx` — needs import + useError + try/catch on: loadData, handleNameBlur, handleExerciseSelect, handleRemoveExercise, handleSaveTargets, handleStartWorkout, handleConfirmDelete
- `src/pages/WorkoutDetailPage/index.tsx` — needs import + useError + try/catch on: loadData, handleNameBlur, handleExerciseSelect, handleRemoveExercise, handleAddSet, handleSetUpdate, handleSetDelete, handleSaveEdits, handleDeleteWorkout, handleConfirmDiscard, handleFinish, handleSaveNewProgram, handleSaveToExistingProgram, handleUpdateTemplate

Pattern for every handler (uniform — no variation):
```tsx
async function handleFoo() {
  try {
    await SomeService.method(args);
    setState(...);
  } catch (e) {
    showError(toUserMessage(e));
  }
}
```

After all edits: run `npm run build` to verify clean compile, then `npx vitest run` to confirm 72 tests still pass. Then update artifacts.

**Session 32 — 2026-04-21:** Service layer test audit. 5 new test files created: AuthService.test.ts (16), ProgramService.test.ts (8), WorkoutService.test.ts (7), LogSetService.test.ts (11), WorkoutExerciseService.test.ts (7). 3 guard tests added to WorkoutLogService.test.ts (create guard, finish × 2). All service guards now covered. 72/72 passing. Test pattern: nested `beforeEach` inside guard describe blocks seeds a shared record (weId/setId) to avoid repeating seeding in every guard test. localStorage.clear() required in AuthService beforeEach to prevent session bleed between tests. D5 (ErrorContext) is next.

**Session 31 — 2026-04-21:** U4 + U5 guards built in WorkoutDetailPage. New hook: `src/hooks/useScrollToError.ts` — IntersectionObserver-based, returns `arrowDir: 'up' | 'down' | null`; arrow points toward error element, clears when element scrolls into view. U4: Finish blocked with 0 exercises → exerciseError state → red outline on Add Exercise button + bounce arrow in footer. U5: Save Edits blocked for (a) blank name → nameError inline error, (b) 0 exercises → same arrow pattern. exerciseError clears when exercise is added via handleExerciseSelect. RTL test pattern: IntersectionObserver stubbed as a class in beforeEach (arrow functions can't be constructors in jsdom); vi.clearAllMocks() required to reset call counts between tests. 3 new tests in WorkoutDetailPage.test.tsx. Build clean; 20/20 passing.

**Session 30 — 2026-04-21:** Artifact/doc cleanup only — no code written. S1: F13 false schema claim corrected ("already defined" → "specced in Statistics phase (session 26); not yet built"). A1: UIdesign.md page title 20px/600 → 24px/700 (matches actual implementation). A2: UIdesign.md FAB states split — disabled/inert (WorkoutDetailPage active mode) vs hidden (/login, /signup); Decision #15 in master-schematics.md updated to match. A3: Phase 4 status "not started" → "in progress". A4: repo visibility "(private)" → "(public)". A5: project_state.md memory rewritten to reflect Phase 4 current state. M1: B1 row normalized (Severity + Area columns added); B3 closed as Resolved.

**Session 30 — 2026-04-21:** Research: full artifact audit (22 gaps identified). Build: service layer guards added to 7 services — LogSetService.update (NaN/negative/decimal reps), WorkoutExerciseService.update (targetSets/targetReps >= 1, targetWeight >= 0), WorkoutLogService.create (throw if active exists), WorkoutLogService.finish (throw if not found or already finished), AuthService.signup (name/email/password), ProgramService.create (name blank), WorkoutService.create (name blank). All guards throw user-facing Error messages. WorkoutLogService.test.ts: TypeScript fixes + counter test updated for new active workout guard. master-schematics.md service table corrected (getByWorkoutId → getByWorkoutLogId). Decisions: duplicate exercises allowed; U4 block finish with 0 exercises (UI-level, not yet built); U5 block Save Edits on validation failure (not yet built). Build clean; 17/17 passing.

**Session 29 — 2026-04-21:** D8 complete — Vitest test infrastructure installed and verified. Packages: vitest 4.1.5, @vitest/coverage-v8, @testing-library/react 16, @testing-library/jest-dom, @testing-library/user-event, fake-indexeddb, jsdom. Config: vitest.config.ts (jsdom, globals, setupFiles). Setup: src/test/setup.ts (fake-indexeddb/auto + jest-dom). Tests: units.test.ts (8 tests, all converters), WorkoutLogService.test.ts (9 tests: create quick-start, create from-program, finish, deleteLog cascade). DB isolation via db.delete() + db.open() in beforeEach. 17/17 pass.

**Session 28 — 2026-04-20:** CLAUDE.md overhaul + artifact housekeeping. No code written.
- Added Session Start — Opening Message Protocol (research vs. build mode distinction, pre-build confirmation checklist, stop condition)
- Removed Model Selection Guide section; preserved "always ask before recommending Opus" as a Working Style bullet
- Removed "Always ask before making edits" bullet (replaced by new protocol)
- Strengthened "Surface confusion" to unconditional version (mandatory inference/assumption separation before building)
- Deleted Post-Demo Cleanup section (files already gone)
- Renamed recap.txt → recap.md, UIdesign.txt → UIdesign.md, coreprocess.txt → coreprocess.md via git mv; updated active references across 9 files (CLAUDE.md, recap.md, UIdesign.md, coreprocess.md, handoff.md, master-schematics.md, tabs/login.md, tabs/logs.md, WorkoutFAB.tsx); session history/changelog entries preserved as-is
- Deleted build step reading table from CLAUDE.md (steps 1–6 complete; git history is the archive)

**Session 27 — 2026-04-19:** Future feature planning. Logged F13 (daily protein tracker), F14 (protein reset time setting — Profile tab, `proteinResetHour` field on users), F15 (lock screen widget — native only), F16 (bio-metric equation engine — brainstorm needed), F17 (body fat predictor — US Navy method candidate), F18 (sleep analysis — quality signals from dailyCheckins), F19 (step quality — cadence data needs native integration). Phase 4 task list compiled: D8 → D5 → Statistics build. Next session starts D8.

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

## UI Standards Summary (UIdesign.md — session 4)
These are locked. Do not redesign around them.

- Nature theme: color evokes natural world — felt, not illustrated (no leaf icons etc.)
- Colors: Green=action, Gold=achievement, Red=danger, White=content — strict, no mixing
- Surface tints: #1A1A17 / #242420 / #2E2E29 (warm undertone locked)
- Text tiers: #FFFFFF primary / #C0C0C0 label (card descriptors) / #8A8A8A secondary / #4A4A4A disabled
- Nav: 14px labels, 2px accent line above active tab
- Alignment: page titles + focal-point content centered; multi-element lists/rows left-aligned
- Buttons: 44px min height, flat, no gradients, title case, 15px/600 — see section 8 in UIdesign.md
- Light mode: palette locked for post-MVP, values in UIdesign.md section 4c

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
Update `handoff.md` and `recap.md` whenever a decision is made, locked, or reversed — without waiting to be asked.
