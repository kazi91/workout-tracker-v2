WORKOUT TRACKER V2 — RECAP
===========================
Last updated: 2026-04-23 (session 44 CLOSED — all 5 items complete; bonus deliverable: seed-tagging-principles.md drafted for Session 45a–f curation work)

CURRENT TASK (mirrors CLAUDE.md — if they diverge, recap.md wins)
-------------------------------------------------------------------
Phase: 5 — Statistics page + new features planning
Last session ended: Session 44 — CLOSED 2026-04-23. All 5 planned items complete. (1) ✅ `memory/project_ce2_schema_architecture.md` created — 5 CE2 architecture decisions locked (index=yes, delete=choice modal, flat hierarchy, any parent-level exercise qualifies, search=direct). (2) ✅ `memory/project_ce1_final_scope.md` rewritten for full 213-entry library; D-new-4 + D-new-5 added; curation estimate 15–20h. (3) ✅ Build sequencing in `artifacts/exercise-bank.md` rewritten — replaced stale "pass 1/2/3" with 3-phase plan (Curation 45a–f ~13h → Coordination → Build Session 47+). (4) ✅ EB5 integrated into `master-schematics.md` § ExerciseSearchModal Spec — optional "Nest under a parent exercise" dropdown added to Step 1 of custom-create flow; `ExerciseService.create()` signature updated with `parentExerciseId`. (5) ✅ 3 guides authored under template v2 (squat.md, bench-press.md, overhead-press.md) — all 4 classic barbell compounds covered; 8 guides total in `artifacts/exercises/`. **Bonus:** `artifacts/seed-tagging-principles.md` drafted — ~270-line working reference governing Session 45a–f curation (6 rules, 10 movement templates, 5 group-specific conventions, Tier 3 cadence, EMG policy, sanity checks, exception log format). No code, no src/ edits.
Next action: Session 45a — Seed re-curation Phase 1 of Phase 1. Scope: read `seed-tagging-principles.md` top to bottom, then lock muscle maps (primary + secondaries-with-role) for the 11 parent exercises (Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover). Seed the "EMG-supported co-primary claims" reference list inside `seed-tagging-principles.md` as decisions are made. Output destination: new file `artifacts/seed-draft.md` (create at session start). Est ~1.5h. Parents first maximizes leverage — variants inherit per the Parent/Variant Rule. THEN Sessions 45b–f run ~11h across Seed+P0 → P1 upper → P1 lower+core → P5+P2+P3 → P4+validation per `exercise-bank.md` § Build sequencing § Phase 1. THEN Session 46 = spec patch 3/3 if needed (ingest locked curation decisions into master-schematics.md + tab artifacts). THEN Session 47+ = CE1/CE2 coordinated v3 build.
Session scope: Research + planning artifact — tag 11 parent exercises per principles doc. Create `artifacts/seed-draft.md` as output. No code, no src/ edits.
Required reading next session: recap.md, `artifacts/seed-tagging-principles.md` (mandatory full read — governs the session), `artifacts/exercise-bank.md` (parent rows only: Squat / Deadlift / Bench Press / Dips / Pull-Up / Lat Pulldown / RDL / Skull Crusher / Barbell Curl / Plank / Cable Crossover), `memory/project_ce1_final_scope.md` (D1–D9 muscle taxonomy reference), `master-schematics.md` § Muscle Taxonomy Model (schema + MUSCLE_LABELS + getExerciseGroup) — do NOT read the whole master-schematics file.

Session 44 state summary:
- exercise-bank.md: 213 total / 184 additions. Tier breakdown: Seed=29, P0=9, P1=56, P2=53, P3=11, P4=30, P5=25. Intentional numbering gaps at P1 #4, P2 #2/3, P3 #2 (entries moved/deduped in Batch C — not errors). Build sequencing section rewritten session 44 — 3-phase plan (Curation 45a–f → Coordination → Build 47+).
- Open decisions: **all session-43/44 decisions closed.** EB3 (Stats rollup) deferred to Stats build; EB6 (P4 toggle categories) deferred to toggle menu build. All other EB decisions locked.
- **EB4 ownership = CE2** — planning doc fully populated session 44 with schema + migration + UX + validation + deletion specs.
- **EB5 = allow** custom exercise `parentExerciseId` nesting under any parent-level exercise. Session 44: integrated into `master-schematics.md` § ExerciseSearchModal Spec (Step 1 optional parent-picker dropdown).
- **CE1 scope = all tiers** (full 213-exercise library); scope memo rewritten session 44.
- **EB7 executed** session 43: all 5 inline tutorial guides migrated to `artifacts/exercises/[slug].md`, upgraded to template v2. Template v2 locked at `artifacts/exercises/_template.md`. +3 more guides session 44 (squat / bench / OHP) = 8 total.
- **CE2 decisions locked session 44:** (1) secondary index on parentExerciseId; (2) deletion = choice modal (cascade vs null-orphan, user picks); (3) flat hierarchy / forbid grandchildren; (4) any parent-level exercise qualifies as parent (seed or custom); (5) search returns direct variant results (flat, no grouping).
- Parent/Variant Rule: variant = same muscle map as parent; different muscle map = separate exercise. Applied consistently across catalog.
- 11 parents documented with defaults: Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover.
- Chin-Up (P0 #4) and Neutral-Grip Pull-Up (P1 #8) flagged as structural variants of Pull-Up — tiers preserved for priority, `parentExerciseId` FK relationship recorded for when schema lands.
- **New artifact session 44:** `artifacts/seed-tagging-principles.md` — governs Session 45a–f curation work. 6 rules, 10 movement-pattern templates, 5 group-specific conventions, Tier 3 cadence, EMG reference policy, sanity checks. EMG co-primary reference list placeholder to populate during 45a.

---

PROJECT CONTEXT
----------------
Problem: Existing workout tracking apps are cluttered, confusing, and unintuitive on mobile.
Goal: Clean, minimal, mobile-first MVP focused on fast workout logging.

Developer: Solo, agile. No deadlines. Scope kept small — build mobile first, web second.

Stack:
  - React 18 + TypeScript + Vite 5 + React Router v7
  - CSS Modules
  - Dexie.js v4 (IndexedDB) — no backend for MVP; service layer abstraction makes migration clean

---

CURRENT STATE
--------------
Phase: Phase 5 — Statistics page + new features planning. Phase 4 closed 2026-04-22 (72 tests across 8 files; ErrorContext wired; service guards complete). Current focus: CE1 spec patches (sessions 41–43) then Statistics tab build, with ongoing iteration for new feature sets.
Step 1 committed: Vite + React 18 + TypeScript scaffold, Dexie v4 schema (8 tables), 29 seed exercises, BrowserRouter routing stubs for all pages, index.css with dark theme CSS variables, Prettier config. Build passes clean.
UIdesign.md expanded with: color system, alignment standards, button design standards, light mode palette.
Green accent locked: dark mode #3BAF6A / light mode #2D9F58.

Schema: V2 locked
  - users:            id, email, password, name, height (inches), weight (lb), unitPreference ('imperial'|'metric'), createdAt
  - exercises:        id, name, category, isCustom
  - programs:         id, userId, name, createdAt
  - workouts:         id, userId, programId, name, order, createdAt
  - workoutExercises: id, workoutId, exerciseId, targetSets, targetReps, targetWeight, order
  - workoutLogs:      id, userId, workoutId (nullable), name, startedAt, finishedAt (nullable)
  - logExercises:     id, workoutLogId, exerciseId, notes (nullable), order
  - logSets:          id, logExerciseId, setNumber, weight, reps, previousWeight, previousReps

Auth: localStorage (key: workout_tracker_user_id) — persists across tab closes until explicit logout.

Units: all weights stored in lb, heights in inches — canonical. Conversion to kg/cm at display time only via UserSettingsContext. unitPreference: 'imperial' (default) or 'metric' — one toggle controls all Layer 1 units. Layer 2 units (time, distance, calories) are universal or require new tables — unaffected.

User flows:
  - Logs:       Complete — quick-start and from-program finish flows fully locked
  - Programs:   Complete
  - Profile:    Deferred — placeholder spec only, no flow needed for MVP
  - Statistics: Deferred — placeholder spec only, no flow needed for MVP

---

REMAINING BEFORE BUILD
-----------------------
Planning complete. Pre-build audit complete. New gaps identified in developer review — resolve before or during relevant build step.

Pre-build gaps (all resolved):
  D1  Dexie indexes — RESOLVED: schema string locked in master-schematics.md DB section; no compound indexes
  D2  previousWeight/previousReps lookup — SPECCED (pending build, step 5): lookup algorithm defined
  D3  ExerciseSearchModal dispatch — RESOLVED: callback prop onSelect
  D4  React Router v7 mode — LOCKED (session 7): BrowserRouter (legacy) — no loaders/actions
  D5  Error handling surface — DEFERRED for demo: console.error sufficient; ErrorContext wired post-demo
  D6  Cascade delete map — RESOLVED: cascade order locked in service layer
  D7  AuthContext + ActiveWorkoutContext init order — LOCKED (session 7): sequential — AuthContext resolves first; UserSettingsContext + ActiveWorkoutContext mount only after AuthContext.user loaded; blank dark screen while loading
  D8  Unit testing framework — DEFERRED for demo: no tests; Vitest + RTL added post-demo

Session 6 gap audit (2026-04-09) — details in master-schematics.md Issue Tracker:
  N1  WorkoutFAB hidden logic — on /logs/:id, hidden state requires comparing route param :id vs ActiveWorkoutContext.activeWorkoutId; spec before build step 3
  N2  Finish flow state machine — LOCKED (session 7): full spec — 4-step state machine, program picker, template sync. No simplification.
  N3  Context dependency chain — LOCKED (session 7): UserSettingsContext reads unitPreference from AuthContext.user, not independent Dexie query; resets on logout/login
  N4  Height display — LOCKED (session 7): raw number + "in" or "cm" label; ft+in conversion is post-MVP polish
  B1  Extended — finish flow also breaks with deleted template; see logs.md B1 edge case note; handle at build step 5
  L1-L4  Login open questions — RESOLVED in login.md
  M1-M4  LogsPage/WorkoutDetailPage audit markers — RESOLVED in logs.md

Pre-build audit resolved:
  C1  Quick-start log name = "Quick Workout [n+1]"; from-program = workout template name
  C2  Target hidden on quick-start exercise cards; shown only when workoutId set
  C3  SignupPage: name/email/password + unit toggle; blank → "Can't be blank"; auto-login → /logs
  C4  LoginPage: deferred to login.md — resolve before build step 2
  C5  ExerciseSearchModal: instant filter, category chips, inline custom exercise creation
  C6  Height = single number input, "in" or "cm" label from UserSettingsContext
  C7  Height/weight blank on Profile = silently valid; Statistics will require these fields later
  C8  Seed trigger: App.tsx on mount, db.exercises.count() === 0 → seed()
  C9  No auto-add set after adding exercise — user taps "+ Add Set" manually
  G5  Back navigation destinations locked: ProgramDetailPage → /programs; WorkoutTemplatePage → /programs/:id

The following are resolved in the spec and will be implemented at build time:
  G2  — Edit Targets Modal: specced in programs.md (WorkoutTemplatePage)
  G3  — .gitignore: created at project setup, no planning needed
  R2  — Modal component: all confirm/discard/delete actions specced as Modal throughout logs.md and programs.md
  G7  — Discard Workout: fully specced in logs.md (active workout layout)

---

BUILD ORDER (Phase 3 — complete)
----------------------------------
All steps built, verified, and committed:
1. Project setup ✓  2. Auth ✓  3. Core shared ✓  4. Programs tab ✓
5a. Logs: list + active ✓  5b. Finish flows ✓  5c. Read-only + edit ✓  6. Profile + Statistics ✓

NEXT STEPS — Phase 5
----------------------
Phase 4 close-out (kept for history):
1. ~~Post-demo cleanup~~ — DONE (session 25)
2. ~~Statistics planning~~ — DONE (session 26); build deferred until after testing
3. ~~Future feature planning~~ — DONE (session 27); F13–F19 logged in Issue Tracker
4. ~~Test infrastructure~~ — DONE (session 29): Vitest + RTL + fake-indexeddb + jsdom; 17 tests passing
5. ~~U4 + U5 UI guards~~ — DONE (session 31): finish + save-edits blocked with 0 exercises or blank name; IntersectionObserver scroll arrow; 3 RTL tests
6. ~~Unit test audit~~ — DONE (session 32): 72 tests passing across 8 files; all service guards covered
7. ~~Statistics spec revision~~ — DONE (session 33): removed HRV, hunger, arm/thigh, orphaned goal targets; added post-workout feel rating, PR celebration (set-save + finish), Logs consistency indicator; schema trimmed; S1 closed
8. ~~ErrorContext (D5)~~ — DONE (session 34): all 12 files wired; ErrorBanner live; 72/72 tests passing

Phase 5 active work:
9. CE1 spec patches — IN PROGRESS:
    9a. ~~master-schematics.md~~ — DONE (session 41): 7 sections + Changelog patched for Tier 1 + Tier 3
    9b. ~~Tab artifacts (logs.md / profile.md / statistics.md / programs.md)~~ — DONE (session 42): RPE surface on SetRow, RPE toggle in Profile (UserSettingsContext + F30 tutorial link), statistics.md Section 7 + category scrubs, programs.md modal cross-ref
    9c. Exercise bank update + scope alignment — NEXT (session 43): resolve EB4 (parentExerciseId in CE1 vs CE2), reconcile bank with `project_ce1_final_scope.md`, lock P-tiers shipping in CE1
    9d. Seed re-curation — DEFERRED to session 44 (was originally 43; moved because bank changes will alter the final CE1 seed set)
10. CE1 build — after 9d: Dexie v3 migration (nuke + reseed), schema field wiring, ExerciseSearchModal rewrite (Decision #27), RPE per-set input, Profile RPE toggle
11. Statistics build — after CE1 build. Resolve P5 charting library + OD6 button tokens before starting. S1 closed; S4 resolved; S2 deferred.
12. Iteration — new feature sets (F20–F39) planned and built per the repeat phases 1–4 loop

TEST COVERAGE (session 32)
---------------------------
- units.test.ts:                    8 tests — lbToKg, kgToLb, inToCm, cmToIn (all paths)
- WorkoutLogService.test.ts:       12 tests — create quick-start (3), create from-program (2), create guard (1), finish (2), finish guards (2), deleteLog cascade (2)
- WorkoutDetailPage.test.tsx:       3 tests — U4 finish blocked (1), U5a blank name blocked (1), U5b 0-exercise edit blocked (1)
- AuthService.test.ts:             16 tests — signup happy + guards (7), login (4), logout (1), getCurrentUser (2), getCurrentUserId (2)
- ProgramService.test.ts:           8 tests — create happy + guards (3), getAll ordering (1), getById (2), update (1), deleteProgram cascade (1)
- WorkoutService.test.ts:           7 tests — create happy + guards (3), getByProgramId ordering (1), getById (1), deleteWorkout cascade (1), createFromLog (1)
- LogSetService.test.ts:           11 tests — add (2), getByExerciseId (1), update happy (2), update guards (5), deleteSet (1)
- WorkoutExerciseService.test.ts:   7 tests — update happy (1), update guards (6)
- Total: 72 tests, 8 files, all passing

PHASE 4 EXIT CRITERIA
-----------------------
- Vitest + RTL installed and configured ✓ (session 29)
- Critical flows covered: auth, quick-start, from-program, finish flow (all 4 state machine paths), delete cascades
- Issue Tracker: zero open Must Fix items
- npm run build passes clean
- recap.md updated with test coverage summary

---

KEY FILES
----------
artifacts/master-schematics.md   — primary source of truth (DB, services, decisions, issue tracker)
artifacts/exercise-bank.md       — exercise library catalog (213 entries, 6 priority tiers, parent/variant rules, open decisions)
artifacts/seed-tagging-principles.md — curation rules for Session 45a–f (6 rules, movement templates, group conventions, EMG policy)
artifacts/exercises/             — per-exercise guides (template v2 at _template.md + 8 authored: bench-press, deadlift, pull-up, squat, overhead-press [Seed]; incline-dumbbell-press [P0]; smith-machine-squat [P1]; paused-squat [P5])
artifacts/tabs/logs.md           — Logs tab spec (user flows complete)
artifacts/tabs/programs.md       — Programs tab spec (user flow complete)
artifacts/tabs/profile.md        — Profile tab spec (placeholder — no flow for MVP)
artifacts/tabs/statistics.md     — Statistics tab spec (placeholder — no flow for MVP)
artifacts/tabs/workouts.md       — Resolved (P6): WorkoutDetailPage stays in logs.md
artifacts/UIdesign.md            — UI standards, color palette, component specs, design brainstorm
artifacts/coreprocess.md         — Development process
artifacts/recap.md               — This file

---

KEY DECISIONS LOCKED
---------------------
Full decision log with rationale lives in master-schematics.md (Decisions #1–23).
Summary of the most important ones:

  #1  Service layer abstraction — Dexie today, API calls tomorrow; no component changes needed
  #2  Local auth, localStorage — plain text for MVP; persists until explicit logout
  #3  Mobile-only layout — 480px max-width, bottom nav, 4 tabs
  #10 Auto-save on blur everywhere — except WorkoutDetailPage edit mode (explicit Save Edits)
  #12 Confirm only on destructive actions — delete and discard only
  #13 Free navigation during active workout — workout persists in Dexie until finished or discarded
  #14 ActiveWorkoutContext — initializes on app mount (not just login); drives FAB state app-wide
  #15 WorkoutFAB — "Start Workout" on Logs tab only; "Resume Workout" all tabs when active; disabled/inert (visible, no action) on /logs/:id active mode
  #17 Quick-start finish flow — "Save to program?" Modal; picker with existing programs + New Program; blank workout name; skip = unassigned log
  #18 WorkoutLogService.create — atomically copies workoutExercises → logExercises when workoutId provided
  #19 From-program finish flow — silent finish if exercises unchanged; Modal sync prompt if modified; order changes ignored
  #20 Start Workout on empty template — blocked with inline message; FAB is the correct path for unplanned sessions
  #21 WorkoutDetailPage mode-switching — finishedAt drives mode on load; Edit is local transition; back-tap in Edit confirms before discarding
  #22 Unit storage — all weights in lb, heights in inches; unitPreference 'imperial'|'metric'; convert at display time only; Layer 2 units unaffected; per-entry override deferred post-MVP
  #23 Unit visibility — unit label on all weight inputs; preference selected at signup; profile toggle note; powerlifting per-entry override is known future need
  P7  Target derivation (createFromLog) — first set values; target = starting weight, not peak

UI DESIGN DECISIONS LOCKED (UIdesign.md session 4)
  Nature theme       — subtle underlying theme; felt through color, not illustrated
  Semantic colors    — Green=action, Gold=achievement, Red=danger, White=content
  Surface palette    — warm tint locked: #1A1A17 / #242420 / #2E2E29
  Text tiers         — primary #FFFFFF / label #C0C0C0 / secondary #8A8A8A / disabled #4A4A4A
  Gold               — #D4A853, strictly achievement/completion moments only
  Red                — #E05555, strictly delete/warning/alert/destructive only
  Icon set           — Lucide (MIT, tree-shakeable)
  Border-radius      — 8px inputs / 12px cards / 16px modals
  Nav bar            — 14px tab labels, 2px accent line above active tab (not filled circle)
  Page transitions   — slide for drill-down, instant for tab switches
  Alignment          — page titles + single-focal content centered; multi-element content left-aligned
  Button hierarchy   — Primary (green) / Destructive (red) / Secondary (ghost) / Ghost-inline
  Button size        — 44px standard, 36px inline/ghost only
  Button typography  — 15px weight 600, title case, flat (no gradients or shadows)
  Button grouping    — primary LEFT, destructive/secondary RIGHT; stack 3+ vertically
  Error surface      — global top banner on DB failure, danger color, dismissable
  Auth layout        — full-screen dark, centered card, unit pref as two-button toggle
  Light mode palette — values locked for future build (post-MVP); see UIdesign.md section 4c
  OD1 — Green accent: LOCKED — dark mode #3BAF6A / light mode #2D9F58
  OD2 — Lucide icons: LOCKED
  OD3 — Border-radius 8/12/16px: LOCKED
  OD4 — Workout summary screen: post-MVP
  OD5 — Elapsed timer: post-MVP

---

SESSION HISTORY
----------------
Most recent at top. Full history in handoff.md.

  Session 44 2nd follow-up — 2026-04-23 (PRINCIPLES DOC + ARTIFACT TIDY — items 3, 4 closed)
    - Research + artifact mode — no code, no src/ edits.
    - Strategy brainstorm: 6-session curation plan for 213 entries (~13h total). Batched by "parents first, then by muscle group within priority band." Tiered EMG research budget (heavy on parents/Seed/P0, light on P5/P4). Markdown intermediate output (`seed-draft.md`) compiled to `seed.ts` at build time.
    - **New artifact: `artifacts/seed-tagging-principles.md`** (~270 lines). Working reference for Sessions 45a–f:
        - Rule 1 Primary selection (1 typical; co-primary when EMG supports; 3+ rejected; tiebreak = first-wins)
        - Rule 2 Secondary selection (2–5 typical; exclusion test; order matters)
        - Rule 3 Role assignment (synergist vs stabilizer with grey-zone default = stabilizer)
        - Rule 4 Parent/Variant inheritance (variant rows inherit parent map; divergence = flag inline)
        - Rule 5 Background muscles (`neck`, `rotatorCuff` seed-only, stabilizer-only)
        - Rule 6 Exclusion defaults (table: when to tag vs skip for `abs`/`obliques`/`forearms`/`lowerBack`/`hipFlexors`/`serratus`/`rotatorCuff`)
        - 10 movement-pattern templates (horizontal/vertical push + pull, squat, hinge, lunge, carry, curl, extension, isolation)
        - 5 group-specific convention blocks (chest / back / shoulders / arms / legs / core)
        - Tier 3 tagging cadence table (equipment always; grip/stance/bias opportunistic; jointLoad skip)
        - EMG reference policy (tiered by priority; Schoenfeld / Contreras / Boeckh-Behrens trusted; influencer claims rejected)
        - End-of-session sanity checklist (≥1 primary, no background primaries, ≤2 primaries, ≤5 secondaries, etc.)
        - Exception log format for `seed-draft.md`
    - **Item 3 CLOSED** — `artifacts/exercise-bank.md` Build sequencing section rewritten. Replaced stale "pass 1/2/3/etc." draft with 3-phase plan: Phase 1 Curation (Sessions 45a–f ~13h, table with per-session scope + estimate) → Phase 2 Coordination (CE1+CE2 share single v3 migration) → Phase 3 Build (Session 47+, 10-item checklist).
    - **Item 4 CLOSED** — EB5 integrated into `master-schematics.md` § ExerciseSearchModal Spec. Step 1 of custom-create flow gains optional "Nest under a parent exercise" dropdown (filters to parent-level entries; no muscle-map pre-fill this cycle). `ExerciseService.create()` signature updated to include `parentExerciseId`. Found that the custom-exercise form lives in master-schematics.md (not profile.md or programs.md as the session 44 plan speculated) — Session 41 rewrite already moved it there.
    - recap.md + CLAUDE.md CURRENT TASK blocks rolled forward to Session 45a. handoff.md gained 2nd follow-up entry.

  Session 44 follow-up — 2026-04-23 (GUIDE STYLE REFRESH — all 8 guides + template)
    - Review-driven cleanup. User asked for improvements that add value without adding clutter.
    - Tier 1 cuts (universal): Severity definitions block, Plain English on deload paragraph, "Cues — pick ONE per set" labels, Pre-Rep Checklist (replaced with single Mid-set check line), Catalog-entry prose (stripped to bare reference).
    - Tier 1 add (universal): Quick cues block at top of every guide (3 bullets, strict cap) — high-leverage mid-set cues for in-app glance use.
    - Tier 2 surgical: hook sharpens on squat/bench/OHP/deadlift (dropped "Builds X, Y, Z" filler); deadlift Step 5 gained Right when/Wrong when (was missing on highest-failure step); Log: bullets added where per-session config affects meaning (deadlift grip, pull-up bodyweight, paused-squat pause length, smith-squat foot position); incline-DB-press dropped arbitrary "Pair with" line.
    - Step compression: paused-squat.md and smith-machine-squat.md collapsed from 8 steps → 6 (folded Walk Out + Stance + Brace into a single position-setup step). Other 6 guides already at right granularity.
    - Template (`_template.md`) updated to match — all Tier 1 edits + Right when/Wrong when rule strengthened to mandatory on non-self-validating steps + italic/bold convention codified.
    - Net impact: ~115 lines lighter across the 8-guide corpus; one new value-add per guide (Quick cues).
    - Skipped: What You Should Feel ↔ Common Mistakes dedupe — apparent dupes serve different framings (felt vs visible); left as-is.
    - exercise-bank.md revision log + handoff.md updated.

  Session 44 follow-up — 2026-04-23 (BIG-3 + OHP GUIDES AUTHORED)
    - Research/artifact-authoring mode — no code, no src/ edits.
    - 3 new guides written under template v2 (item 5 from session 44 plan):
        - artifacts/exercises/squat.md — Seed #11 (high-bar back squat default; Recovery Notes included as Big-3)
        - artifacts/exercises/bench-press.md — Seed #1 (flat barbell touch-and-go default; Recovery Notes included)
        - artifacts/exercises/overhead-press.md — Seed #17 (standing barbell strict press default; Recovery Notes + Progression Path included)
    - Coverage milestone: all 4 classic compound barbell lifts now have v2 guides (squat / bench / deadlift / OHP).
    - exercise-bank.md updates: Tutorial Content index expanded to 8 entries (re-ordered by tier rank); revision log entry added.
    - recap.md + handoff.md synced. Items 3 (Build sequencing rewrite) and 4 (EB5 custom-exercise form integration) still pending for next session.

  Session 43 follow-up — 2026-04-22 (EXERCISE GUIDE TEMPLATE v2 + INLINE→FILES SPLIT)
    - Research mode follow-up to session 43 — executed externally to user's parallel decision close-out (see Session 43 state summary above for those planning decisions). No code written, no src/ edits.
    - Built v2 exercise guide template via coaches-panel tier review (6 mock coaches: powerlifting, bodybuilding, beginner-PT, DPT, S&C, content). Tiered each proposed addition S/A/B/C, committed only S + A.
    - S-tier additions locked: tiered cue blocks (B/I/A) on movement steps, "What You Should Feel" proprioceptive map, severity column on Common Mistakes (Form-only / Strength-leak / Injury-risk), Red Flags section, progression path with stage targets, progression criteria + deload trigger in Programming.
    - A-tier additions locked: "if it feels off" troubleshoot line after checklist, selective confirmation cues on non-obvious setup steps (right-when / wrong-when), sharpened mistake descriptions (visual + feel), split Advanced into Form refinements vs Intensity techniques, Recovery Notes for Big-3, deload Plain English gloss.
    - B-tier and C-tier (metadata strip, variations table, rename to "the insight," timeline) explicitly skipped to keep guides lean.
    - Template locked at `artifacts/exercises/_template.md`. Length target 200–500 lines per guide.
    - All 5 inline tutorials migrated from exercise-bank.md to `artifacts/exercises/[slug].md`: pull-up.md (Seed #7 — first full v2 reference), incline-dumbbell-press.md (P0 #2), deadlift.md (Seed #6 — Big-3, includes Recovery Notes), paused-squat.md (P5 #6 — squat-family Recovery Notes), smith-machine-squat.md (P1 #44).
    - All 5 upgraded to v2 standards. Severity definitions block added to all four migrated guides (compliance pass after template review caught the gap).
    - exercise-bank.md updates: 5 inline sections (~450 lines) replaced with link stubs; Tutorial Content header rewritten with index of guides + pointer to exercises/ folder; EB7 row in Open Decisions table changed from "Deferred" to "Decided / executed (session 43)"; revision log entry added documenting template v2 + migration.
    - Cue-tiering principle locked: beginner = internal + analogy, intermediate = outcome, advanced = external + terse. One cue per set, never stacked.
    - Severity scale locked: 3-tier (Form-only / Strength-leak / Injury-risk). Defaults to Form-only until proven otherwise. Reserve Injury-risk for things that genuinely hurt people.
    - "Inline first, split when it hurts" pattern retired. New guides go directly to `artifacts/exercises/`.

  Session 42 — 2026-04-22 (SPEC PATCH 2/3 COMPLETE — tab artifacts)
    - Research/spec-patch mode — no code written. Aligned logs.md, profile.md, statistics.md, programs.md with CE1 locks from session 41.
    - logs.md: Active-mode SetRow gains optional RPE input (1–10, half-points, nullable, no pre-fill, never blocks save); column header adds RPE conditionally on `UserSettingsContext.rpeEnabled`. LogSetService.add(logExerciseId, rpe?) and update(id, data including rpe) signatures reflected in Services Used. "+ Add Exercise" cross-refs master-schematics § ExerciseSearchModal Spec (Decision #27 — D6 two-step create + D7 6-group chip + muscle-tag search).
    - profile.md: "Enable RPE per set" toggle added under Preferences, default OFF; persists to `users.rpeEnabled` via `UserService.updateProfile()`; surfaced via `UserSettingsContext.rpeEnabled`. Inline notes: F30 tutorial introduces it on first run; migrates to F32 feature toggle menu next cycle. Services Used row updated to include rpeEnabled (+ trainingAge forward-compat, F37). Context Used row updated to note UserSettingsContext now exposes rpeEnabled alongside unitPreference, both hydrated from AuthContext.user on login, reset on logout.
    - statistics.md: Section 7 gains CE1 upgrade callout — `exercises.category` dropped, `getExerciseGroup()` derives broad group, specific-muscle granularity unlocks F27/F28/F29 without further schema work. Four `category` residuals scrubbed (7a favorite/frequency rows, 7d neglected callout, 7e `getFavoriteExercises` description) → "broad group via `getExerciseGroup()`".
    - programs.md: single-line cross-ref added to "+ Add Exercise" pointing at master-schematics § ExerciseSearchModal Spec (Decision #27). No other picker callouts existed.
    - master-schematics.md Decision #26 patched: RPE toggle locked to `UserSettingsContext.rpeEnabled` (not raw `AuthContext.user`), hydrated from AuthContext.user on login, reset on logout. F30 first-run tutorial introduces the feature.
    - memory/project_tutorial_hints_queue.md: new "RPE toggle — first-run introduction" hint added (inserted before existing muscle-picker hints). Covers what RPE measures, half-point scale, optional nature, and opt-in during tutorial.
    - Decisions locked this session (extending #26): (1) RPE toggle lives in UserSettingsContext (not AuthContext) — matches `unitPreference` pattern, clean separation of user-preference settings from identity state; (2) RPE introduced via F30 first-run tutorial (not just a silent toggle).
    - SEQUENCING CHANGE (end-of-session): seed re-curation deferred from Session 43 → Session 44. Reason: `artifacts/exercise-bank.md` has active expansion planning (open EB4 parentExerciseId + 136-entry P0–P5 list + build sequence) that will change what the final CE1 seed set looks like. Curating only the 29 current seeds now would need redoing post-expansion. Session 43 re-scoped to exercise-bank update + CE1 scope alignment. `memory/project_ce1_final_scope.md` banner added flagging scope as provisional until Session 43 closes.

  Session 41 — 2026-04-22 (SPEC PATCH 1/3 COMPLETE — master-schematics.md)
    - Research/spec-patch mode — no code written. Executed Path A spec patch against master-schematics.md per `memory/project_ce1_final_scope.md`.
    - Planning resolutions locked before writing: (1) `exercises.category` DROPPED — broad group derived via `getExerciseGroup()` helper with "first primary wins" tiebreaker (Option C of 3 options presented); (2) `secondaryMuscles` shape = `{ muscle: Muscle; role }[]` (structured, not parallel arrays); (3) `primaryMuscles: Muscle[]` to support co-primaries per D3; (4) six separate decision rows #24–#29 (not one combined row); (5) deferred items assigned F31–F39; (6) no Dexie multi-entry index on primaryMuscles (JS filter <1ms at 29 rows).
    - DB Schema patched: exercises table gets primaryMuscles, role-tagged secondaryMuscles, + 6 Tier 3 forward-compat fields (equipment, gripWidth, gripOrientation, stanceWidth, bias, jointLoad); users gets rpeEnabled (default false) + trainingAge (null); logSets gets rpe (nullable, 1–10 half-step). Dexie schema string updated (dropped `category` index on exercises).
    - v3 migration note rewritten: nuke-and-reseed of exercises + logExercises + logSets; silent migration; single version hop.
    - NEW sub-section "Muscle Taxonomy Model" added: 26 muscles (24 user-surfaced + 2 background), 6 broad groups, MUSCLE_TO_GROUP map, MUSCLE_LABELS, SECONDARY_VOLUME_MULTIPLIER = 0.5, RECOVERY_WINDOWS (9 large 60h / 15 small 36h / 2 bg-small 36h), getExerciseGroup helper.
    - Service Layer: ExerciseService.search signature now takes (query + group?: MuscleGroup) and matches muscle tags; UserService.updateProfile accepts rpeEnabled + trainingAge; LogSetService.add/update accept optional rpe.
    - Exercise Library section: "6 categories" language replaced with specific-muscle model + derived broad group.
    - ExerciseSearchModal Spec: FULLY REWRITTEN for Decision #27. Filter mode = 6 broad-group chips single-select + muscle-tag name search + role-colored row metadata. Custom-create mode = two-step flow (Step 1 name + multi-select groups → Step 2 sectioned muscle chips with two-tap role cycle + long-press to promote). Background muscles never surface.
    - Key Design Decisions: six new rows #24 (muscle taxonomy + volume model) / #25 (recovery windows) / #26 (RPE opt-in) / #27 (picker + filter UX) / #28 (v3 migration) / #29 (naming conventions).
    - Issue Tracker: CE1 moved to Resolved with full resolution note pointing to Decisions #24–#29 + Tier 3 schema fields. Added F31 Injury-Warning, F32 feature toggle menu, F33 jointLoad UI, F34 RPE-derived stats, F35 library expansion, F36 cues/instructions, F37 training-age modifier, F38 cardio tracking, F39 Group 2 dimensions. Patched F20 / F24 / F27 / F28 / F29 language to reference getExerciseGroup() instead of exercises.category; F27/F28/F29 notes flagged as "upgraded by Decision #24" where specific-muscle granularity unlocks new capability.
    - Changelog: single consolidated Session 41 entry.
    - Ready for Session 42: patch tab artifacts (logs.md RPE entry surface on SetRow, profile.md RPE toggle, statistics.md F27/F28/F29 cross-refs).

  Session 40 — 2026-04-22 (CE1 PLANNING CLOSED — ready for spec patch)
    - Research session — no code written. Resumed CE1 planning from session 39's pickup point; carried it to full completion + closed planning phase.
    - D4 LOCKED at B-lite (role tag synergist/stabilizer on secondaries; both 0.5× in MVP math; future calibration without re-curation).
    - D5 LOCKED (recovery windows): 9 large (60h), 15 small (36h), 2 background-small (36h). Adductors moved from large to small per user. Galpin training-age modifier deferred entirely (was pre-build checkpoint; now next-cycle work).
    - D-new-3 LOCKED (RPE per set): logSets.rpe (1-10 with half-points, nullable, optional), users.rpeEnabled toggle (default false), per-set entry UI gated on toggle. ALL RPE-derived stats deferred to next cycle (full list saved in project_rpe_deferred_features.md). Picker UX path = Option X (single toggle now, absorbed into feature toggle menu next cycle).
    - D6 LOCKED across 4 sub-forks: D6.1 multi-select Step 1 + sectioned Step 2 (Options 2 + 4 parked for post-build review); D6.2 two-tap chip cycle (synergist → stabilizer → remove); D6.3 long-press to promote co-primary (tutorial hint queued for F30); D6.4 seed-only background muscles (B + C parked for post-build review). User pushed back with alternative 3-field dropdown proposal at D6.2; reviewed honestly, defended Option A; user agreed.
    - D7 LOCKED across 4 sub-forks: 6 broad chips, single-select, primary + all secondaries with role distinguished by UI color (specific element TBD pre-build), name + muscle tag search.
    - D8 LOCKED across 5 sub-forks: D8.1 nuke and reseed (sub-option B2 — drop exercises + logExercises + logSets); D8.2 N/A (no auto-map needed); D8.3 silent migration; D8.4 single Dexie v3 bump bundles all changes; D8.5 add S2 (jointLoad) and S3 (trainingAge) as forward-compat fields with null defaults. Post-launch migration pattern saved as memory.
    - D9 LOCKED across 5 sub-forks: camelCase IDs, Title Case labels, single MUSCLE_LABELS map, TS string union, all related concepts (groups, roles, buckets, tiers) also camelCase.
    - D15.1 LOCKED at Option C (equipment as forward-compat nullable field). D15.2-D15.5 deferred to next cycle.
    - PATH A LOCKED: simplified scope. Tier 1 (D1-D9 + D-new-3) + Tier 3 (5 forward-compat schema fields: equipment, gripWidth, gripOrientation, stanceWidth, bias as string|null). Tier 2 (D10-D17 full UX work + library expansion + cues/instructions) all deferred to next cycle.
    - User pushed back twice during the session: (1) wanted stabilizers tracked after originally agreeing to skip — D4 reopened and locked at B-lite; (2) flagged scope was too big for one build cycle — Path A simplified scope chosen.
    - Library expansion question raised: defer to next cycle (Option 2). Will pair with cues/instructions when those are added.
    - Memory files created/updated this session: project_rpe_deferred_features.md (NEW), project_picker_ux_post_build.md (NEW), project_tutorial_hints_queue.md (NEW), project_post_launch_migration_pattern.md (NEW), project_ce1_final_scope.md (NEW — supersedes project_ce1_planning_state.md), project_stat_weights_calibration.md (UPDATED — Galpin moved to deferred). MEMORY.md index updated with all new entries and SUPERSEDED tag on planning state.
    - Spec patch session split agreed: Session 41 = master-schematics.md only; Session 42 = tab artifacts (logs/profile/statistics); Session 43 = seed re-curation with EMG citations.
    - Session ended with planning closed, no spec edits started yet. All artifact updates begin in session 41.

  Session 39 — 2026-04-22 (PAUSED MID-PLANNING)
    - Research session — no code written. CE1 deep dive expanded far beyond original 4 sub-questions into full muscle taxonomy + exercise dimensions + injury-warning system planning.
    - Coach review panel set up at session start (revised from informal Poliquin/Israetel/Cressey/Thibaudeau): Poliquin [locked], Galpin PhD, Rambod, Tuchscherer. Saved to statistics.md § Coach Review Panel as temporary research aid; CP1 logged to delete after F27/F28/F29 build.
    - Brainstorm phase: closed (per user direction). Active dimensions narrowed to 8 (bias, fatigue ratio, grip width, grip orientation, stance width, equipment, tempo, bilateral) after parking body position, loading vector, RoM, skill, stability.
    - Coach panel critique of brainstorm — surfaced gaps: RPE absent (Tuchscherer/Galpin), rest absent (Rambod/Poliquin), RoM cut prematurely (Rambod/Galpin), recovery windows treated as universal (Galpin/Tuchscherer).
    - Planning phase: D1, D2, D3 LOCKED. D4 REOPENED (stabilizers — user reversed earlier "skip" decision). D5 PAUSED mid-discussion.
    - D1 LOCKED: 24 user-surfaced + 2 background-only = 26 muscles. Expanded from 17. Additions: lower traps (split from "traps"), brachialis, hip flexors, serratus, adductors, abductors, tibialis, neck (background), rotator cuff (background). Renamed: "traps" → "upper traps". Rambod's call for further splits explicitly rejected (bias dimension handles those).
    - D2 LOCKED: 6 broad groups, derived from specific muscle (storage = specific only, broad via static map). Mapping: chest (chest, serratus); back (lats, upper back, lower back, upper traps, lower traps); shoulders (front delts, side delts, rear delts, rotator cuff bg); arms (biceps, brachialis, triceps, forearms); legs (quads, hamstrings, glutes, calves, adductors, abductors, tibialis); core (abs, obliques, hip flexors); neck (background) attached to shoulders.
    - D3 LOCKED: Primary 1.0× / secondary 0.5×. Co-primaries allowed when EMG/research supports. No data cap on secondaries. UI displays ALL secondaries in declared order. Implementation: named constant `SECONDARY_VOLUME_MULTIPLIER = 0.5`.
    - D4 REOPENED: stabilizers tracked. 14 stabilizer muscles confirmed (core, forearms, lower back + 11 more). Architecture options A/B/C/B-lite presented. User leaning B or C; research pass strongly supports B-lite (role tag on secondaries; both 0.5× in MVP math; future calibration possible without re-curation).
    - Modern training metrics research: hard sets per muscle/week (Schoenfeld), RPE/RIR (RP/Tuchscherer), e1RM tracking (Brzycki/Epley), MEV/MAV/MRV bands (Israetel framework), EWMA over ACWR (Wang 2020 critique on math), per-joint load tracking for tendonitis prevention.
    - Schema improvements proposed (S1–S10): top 3 — S1 logSets.rpe (=D-new-3), S2 exercises.jointLoad, S3 users.trainingAge.
    - New decisions surfaced: D-new (feature toggle menu — deferred to next dev cycle), D-new-2 (joint load tags), D-new-3 (RPE per set — accepted), D-new-4 (rest tracking — toggle menu), D-new-5 (lengthened bias/RoM — toggle menu), F-new (Injury-Warning system, likely F31).
    - Memory files created: project_feature_toggle_menu.md, project_cardio_tracking.md, project_stat_weights_calibration.md, project_ce1_planning_state.md (full session snapshot for clean pickup).
    - Pickup point for session 40: D4 architecture (B-lite recommended) → D5 recovery windows → D-new-3 RPE spec → D6–D9 → D10–D17 per planning matrix.

  Session 38 — 2026-04-21
    - Housekeeping — commit cleanup; no code changes
    - Sessions 31–37 landed in 3 logical commits on main:
        69ab01c  Sessions 31 + 34: U4/U5 UI guards + ErrorContext (D5)
        3f48f05  Sessions 31-32: service layer test audit + U4/U5 RTL tests
        e0e8917  Sessions 33, 35-37: Statistics spec revision + research
    - Pre-commit verification: npm run build clean; 72/72 tests passing across 8 files
    - Working tree clean; 3 commits ahead of origin/main (not pushed)
    - Process correction: re-aligned with CLAUDE.md "complete it, verify, commit, end" rule
    - Next: Session 39 — CE1 deep dive (research mode)

  Session 36 — 2026-04-21
    - S4 research and resolution — no code written
    - Weekly adherence metric dropped: no honest denominator without active program tracking
    - Replaced by Program Intelligence feature set (Section 7 in statistics.md): current split detection, favorite exercises per category, program efficacy (PR density + volume growth), neglected category callout, de facto program inference
    - "Stint" renamed to "current split" throughout
    - All features logged as Future: F20 (favorite exercises), F21 (program usage), F22 (current split detection), F23 (program efficacy), F24 (neglected categories), F25 (de facto program inference)
    - All derivable from existing schema — no new tables required
    - OD6 (button tokens) not started — deferred to next research session

  Session 37 — 2026-04-21
    - Statistics research continued — no code written
    - F26–F28 logged: Workout Stats Card (most skipped workout, volume by muscle group, muscle group balance)
    - Time filters locked: 30 / 90 / 365 / all time (7-day dropped)
    - Volume tracking without RPE: use tonnage (weight × reps) + set count per muscle group per week
    - Custom exercise UX gaps identified: arms ambiguity (biceps vs triceps), compound multi-muscle tagging, edit-after-creation, category picker UX — deep dive next session
    - F28 display approach TBD: raw % split vs. push/pull/legs ratio vs. imbalance flag

  Session 35 — 2026-04-21
    - Statistics research session — no code written
    - P5 (charting library), S4 (adherence edge cases), OD6 (button tokens) deferred — decide inline at their respective build steps
    - Body fat % entry: manual entry + "Estimate for me" Navy formula button — LOCKED
    - Neck circumference (`neckIn`): stored in `bodyMetrics` table alongside waist/hip — LOCKED
    - Body metrics pre-fill: form pre-populates from most recent saved entry; user updates only changed fields — LOCKED
    - statistics.md updated: bodyMetrics table + entry UX revised

  Session 34 — 2026-04-21
    - D5 complete: ProgramDetailPage + WorkoutTemplatePage + WorkoutDetailPage all wired
    - WorkoutDetailPage.test.tsx: added ErrorContext mock (useError returns stub) so tests pass without ErrorProvider wrapper
    - Build clean; 72/72 tests passing

  Session 33 — 2026-04-21
    - Statistics spec research + revision: cross-referenced spec against project values and real gym motivators
    - Removed: HRV (wearable-only), hunger rating (nutrition app feature), arm/thigh circumference (low fill rate), protein/step/sleep targets from Goals card (targets without tracking loops)
    - Added: post-workout feel rating (workoutLogs.rating nullable 1–3, at finish flow); PR celebration at set-save (StatisticsService.checkForPR, non-blocking) + finish summary; Logs tab consistency indicator (getSummary on LogsPage)
    - Schema trimmed: users → goalWeight only; dailyCheckins → sleepHours + steps; bodyMetrics → weight/bodyFatPct/waistIn/hipIn; workoutLogs.rating added
    - S1 closed; device integration (Capacitor) deferred as architectural session
    - D5 partial build: ErrorContext + ErrorBanner created; App.tsx + 7 pages wired; 3 pages remain

  Session 32 — 2026-04-21
    - Service layer test audit complete: 5 new test files + 3 guards added to WorkoutLogService.test.ts
    - AuthService.test.ts: 16 tests (signup happy + 5 guards, login 4 paths, logout, getCurrentUser, getCurrentUserId)
    - ProgramService.test.ts: 8 tests (create + guards, getAll ordering, getById, update, deleteProgram cascade)
    - WorkoutService.test.ts: 7 tests (create + guards, getByProgramId ordering, getById, deleteWorkout cascade, createFromLog)
    - LogSetService.test.ts: 11 tests (add, getByExerciseId, update happy + 5 guards, deleteSet)
    - WorkoutExerciseService.test.ts: 7 tests (update happy + 6 guards)
    - All service guards now covered: LogSetService.update, WorkoutExerciseService.update, WorkoutLogService.create + finish, AuthService.signup, ProgramService.create, WorkoutService.create
    - 72/72 tests passing across 8 files

  Session 30 — 2026-04-21
    - Artifact/doc cleanup only — no code written
    - S1: F13 false schema claim corrected — "already defined" → "specced in Statistics phase (session 26); not yet built"
    - A1: UIdesign.md page title corrected: 20px/600 → 24px/700 (matches actual implementation from session 14 UI polish pass)
    - A2: UIdesign.md FAB states split: disabled/inert (active workout page) + hidden (auth pages); Decision #15 in master-schematics.md updated to match
    - A3: master-schematics.md Phase 4 status: "not started" → "in progress"
    - A4: handoff.md repo visibility: "(private)" → "(public)" (made public session 25)
    - A5: memory/project_state.md rewritten — stale "next is 5c" replaced with Phase 4 current state
    - M1: B1 row normalized (Severity + Area columns added); B3 closed as Resolved

  Session 30 — 2026-04-21
    - Research: full artifact audit — 22 gaps identified (schema, UX, service naming, stale docs)
    - Service layer guards added to 7 services: LogSetService.update (NaN/negative/decimal), WorkoutExerciseService.update (targetSets/targetReps >= 1, targetWeight >= 0), WorkoutLogService.create (throw if active exists), WorkoutLogService.finish (throw if not found or already finished), AuthService.signup (name/email/password), ProgramService.create (name), WorkoutService.create (name)
    - All guards throw user-facing Error messages for future UI surfacing
    - WorkoutLogService.test.ts: TypeScript fixes (Dexie add() cast to number); counter test updated to finish first log before creating second (required by new active workout guard)
    - master-schematics.md: LogExerciseService service table corrected (getByWorkoutId → getByWorkoutLogId)
    - Decisions locked this session: duplicate exercises allowed; U4 block finish with 0 exercises (UI-level, not yet built); U5 block Save Edits on validation failure (not yet built)
    - Build clean; 17/17 tests passing

  Session 29 — 2026-04-21
    - D8 complete: Vitest 4.1.5 + RTL 16 + @testing-library/jest-dom + fake-indexeddb + jsdom installed
    - vitest.config.ts created (jsdom environment, src/test/setup.ts as setupFile, globals: true)
    - src/test/setup.ts: imports fake-indexeddb/auto (global IndexedDB patch) + jest-dom matchers
    - src/utils/units.test.ts: 8 tests covering all 4 conversion functions (lbToKg, kgToLb, inToCm, cmToIn)
    - src/services/WorkoutLogService.test.ts: 9 tests — create quick-start (name auto-gen, counter, no logExercises), create from-program (fields, logExercise copy), finish (finishedAt set, removed from getActive), deleteLog cascade (log deleted, logExercises + logSets deleted)
    - DB isolation: beforeEach calls db.delete() + db.open() on the singleton — gives fresh fake IndexedDB per test
    - jsdom added as explicit devDependency (vitest peer dep, not bundled)
    - 17/17 tests pass (npx vitest run)

  Session 28 — 2026-04-20
    - CLAUDE.md overhaul: added Session Start — Opening Message Protocol; removed Model Selection Guide; removed "Always ask before making edits"; strengthened "Surface confusion" to unconditional; deleted Post-Demo Cleanup section; deleted build step reading table
    - Artifact migration: recap.txt → recap.md, UIdesign.txt → UIdesign.md, coreprocess.txt → coreprocess.md (git mv); active references updated across 9 files
    - No code written — housekeeping only

  Session 26 — 2026-04-18
    - Statistics tab spec expanded: full body recomposition tracking system scoped (Tier 1 + Tier 2; Tier 3 out of scope)
    - New DB tables specced: bodyMetrics (time-series body composition), dailyCheckins (daily recovery/behavioral signals)
    - New users fields: goalWeight, proteinTarget, stepTarget, sleepTarget (all nullable, additive)
    - New services specced: BodyMetricsService, DailyCheckinService, StatisticsService (7 methods)
    - New user story U9 added to master-schematics.md
    - New open issues S1–S4 added to Issue Tracker
    - Goals card field location (S2) deferred: re-evaluate after Statistics is built
    - profile.md unchanged — goal fields location TBD post-Statistics build
    - No code written this session — planning only

  Session 25 — 2026-04-17
    - Demo complete; repo prepped for public GitHub
    - Deleted: demo-seed.js, PRESENTATION_AID.md, PRESENTATION_AID.html
    - Created: README.md (name, demo link, tech stack, local setup, auth disclaimer, copyright, status)
    - UIdesign.txt: "Portfolio Legibility" principle added to section 1 (distinctive names, clear folders, decision comments)
    - handoff.md: "Portfolio Legibility Standard" section added above "What Is Fully Locked"
    - .gitignore: already covered all three deleted files — no changes needed

  Session 24 — 2026-04-16
    - CLAUDE.md: three Karpathy-inspired guardrails added (additive only, no existing rules changed)
    - Working Style: "Surface confusion" (state assumptions, ask don't guess) + "Surgical changes only" (touch only what the task requires, clean up only your own orphans)
    - Session discipline: "Simplicity check" before finishing a file (could this be half the lines?)
    - Pre-completion checklist: bug fix reproducing test requirement added

  Session 23 — 2026-04-15
    - B2 fixed: spinner arrows on weight/reps inputs now save — handleWeightBlur/handleRepsBlur replaced with shared saveSet() helper; onChange fires saveSet on inputType 'insertReplacementText' (spinner only); onBlur fires saveSet for keyboard input
    - Blue bubble fix: min="0" and min="1" removed from weight/reps inputs — validation handled by saveSet, HTML min attr was causing browser popover
    - 0 reps now valid — represents missed attempt at weight; repsValid bound changed from >= 1 to >= 0 with inline comment
    - CLAUDE.md: ## Tech Stack, ## Working Style, ## Document Editing sections added; TypeScript hook operational rule added
    - .claude/settings.json created — postToolUse hook runs tsc --noEmit on Edit/Write; toggle via /hooks
    - F12 logged: log history date context + calendar view (post-MVP)
    - B2 resolved in Issue Tracker

  Session 21 — 2026-04-14
    - F11: FAB no longer hidden on active workout page (/logs/:id) — now renders disabled/inert (opacity 0.35, pointer-events none, no onClick)
    - Keeps nav center slot filled; future hook for intra-workout tool hub (UIdesign.txt brainstorm)
    - Changed: WorkoutFAB.tsx (return null → disabled button), WorkoutFAB.module.css (.fabDisabled class), master-schematics.md (Decision #15 + N1 updated)

  Session 20 — 2026-04-14
    - Bug fix: ExerciseSearchModal category filter chips hidden behind exercise list on smaller viewports
    - Fix: added flex-shrink: 0 to .chips in ExerciseSearchModal.module.css — prevents chips row from collapsing when results list grows

  Session 18 — 2026-04-10
    - Target weight display: "@ x lbs" → "| top set: x lbs" in ExerciseCard and WorkoutTemplatePage (F7 resolved)
    - WorkoutTemplatePage: doneBtn + deleteBtn set to flex: 1 — equal width button pair fix
    - Issue Tracker: F7 resolved, F8 logged (bodyweight + added weight, schema change), F9 logged (rearrange exercises), F10 logged (redesign WorkoutTemplatePage action area)
    - UIdesign.txt: OD6 added (CSS button token standards — brainstorm pending)
    - demo-seed.js created at project root (not committed — in .gitignore); browser console script to seed IndexedDB for demo recording

  Session 17 — 2026-04-10
    - FAB moved from position:fixed floating element into BottomNav center flex slot — eliminates overlap on all pages
    - BottomNav refactored: LEFT_TABS + RIGHT_TABS split around .fabSlot div; WorkoutFAB imported and rendered inside BottomNav
    - WorkoutFAB always renders button (no null after auth checks) — keeps nav center slot filled; non-/logs tap navigates to /logs
    - WorkoutFAB.module.css: removed fixed positioning; inline 52px circle
    - App.tsx: WorkoutFAB removed from JSX (now owned by BottomNav)
    - ProfilePage + StatisticsPage: top padding 16px → 32px (title alignment)
    - CLAUDE.md: Post-Demo Cleanup section added (demo-seed.js + PRESENTATION_AID.md must be deleted before next commit)
    - .gitignore: demo-seed.js added
    - Committed: abdc304

  Session 16 — 2026-04-10
    - Pre-demo code review: full static analysis of all services, contexts, pages, and shared components
    - All critical flows verified clean: auth, quick-start, from-program start, finish flows (all 4 state machine paths + skip + from-program sync), read-only/edit modes, B1 edge case, Programs CRUD with cascades, Edit Targets Modal, Profile auto-save and unit toggle, seed deduplication, FAB hidden logic
    - No blockers found. App confirmed demo-ready.
    - False positive documented: ExerciseSearchModal modal closure after custom exercise creation — works correctly via parent's onSelect handler; see Issue Tracker note in master-schematics.md

  Session 15 — 2026-04-10
    - UI polish: ProfilePage unit labels moved into label text ("Height (in)" / "Weight (lb)"); all 4 tab page titles standardized to 24px/700; autocapitalize="words" added to all name/program/workout inputs across app

  Session 14 — 2026-04-10
    - UI polish pass: trash icons replace text buttons throughout; WorkoutTemplatePage button layout redesigned; FAB centered; page titles centered; empty states updated
    - Bug fixes: from-program exercises copy on start; Save Edits reloads from Dexie; seed deduplication for Strict Mode

  Session 13 — 2026-04-09
    - Step 6 complete: UserService, ProfilePage (auto-save, unit toggle, logout), StatisticsPage placeholder

  Sessions 1–12 — 2026-04-02 to 2026-04-09 (compressed — full detail in handoff.md)
    - Sessions 1–3: project scoped, tech stack selected, DB schema v2 designed, 23 decisions locked, user flows complete
    - Sessions 4–6: CLAUDE.md created, GitHub repo set up, UIdesign.txt expanded, pre-build gap audit (D1–D8), Issue Tracker established
    - Sessions 7–8: pre-build decisions locked (D4/D7/N3/N4), Steps 1–3 built (scaffold, auth, shared components)
    - Sessions 9–12: Steps 4–5c built (Programs tab, Logs list, active workout, finish flows, read-only/edit modes)

---

REJECTED OPTIONS — DO NOT RE-PROPOSE
--------------------------------------
  - Silent revert on invalid input → replaced with inline error, field stays editable
  - Lock user to workout page until finished → replaced with free navigation + ActiveWorkoutContext
  - Standalone workout templates → every workout belongs to a program; quick-start is the exception
  - "Start Workout" FAB on all tabs → Logs tab only; Resume Workout globally when active
  - Explicit Save button on Profile → auto-save on blur
  - workoutSets table + isWarmup for MVP → deferred; lands with recommendation engine in v2
  - Per-set targets on WorkoutTemplatePage for MVP → deferred to v2
  - Heaviest set for target derivation → first set chosen; target = starting weight, not peak
