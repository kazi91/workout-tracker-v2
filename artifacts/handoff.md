# HANDOFF — NEW INSTANCE START HERE
Last updated: 2026-04-23 (session 44 CLOSED — all 5 items + bonus seed-tagging-principles.md. Session 45a is next: lock 11 parent muscle maps. No code written.)

## Session 44 summary (2026-04-23)

**Scope:** Execute on the four decisions locked end-of-session-43 (EB4-ownership=CE2, EB5=allow, CE1 scope=all tiers, EB7 already-done). Research + planning artifacts only; no code.

**Accomplished:**
- **Item 1 — CE2 planning doc created:** `memory/project_ce2_schema_architecture.md` fully populated with concrete content (Karpathy-check passed, no empty shell). All 5 CE2 architecture decisions locked:
  - #1 Secondary index on `parentExerciseId` = **yes** (chevron expansion is a hot path)
  - #2 Deletion behavior = **choice modal** (user picks cascade or null-orphan at delete time)
  - #3 Hierarchy = **flat / forbid grandchildren** (mobile picker UX is the binding constraint)
  - #4 Custom parent restriction = **any parent-level exercise** (seed or custom both qualify)
  - #5 Search for variants = **direct results** (flat; no parent-grouping)
- **Item 2 — CE1 scope memo rewritten:** `memory/project_ce1_final_scope.md` supersedes the prior "library expansion deferred" stance. New scope ships full 213-entry library in CE1. Added D-new-4 (library expansion) + D-new-5 (pointer to CE2) to Tier 1. Updated curation effort estimate from ~2hrs to 15–20hrs. Reordered Next Steps around sessions 44/45/46. Added sibling-doc reference to CE2.
- **MEMORY.md index refreshed:** added CE2 entry; refreshed CE1 description (was "Tier 1 + Tier 3 forward-compat"; now "full 213-entry library + parentExerciseId coordination via CE2").
- **recap.md + CLAUDE.md CURRENT TASK blocks synced:** timestamp bumped; status flipped to "session 44 in progress"; next-action narrowed to items 3 and 4 only; required-reading list updated for pickup (adds CE2, adds programs.md/profile.md, drops stale "CE1 memo to be rewritten").

**Items remaining for session 44 continuation or session 45:**
- **Item 3** — Rewrite Build sequencing section in `artifacts/exercise-bank.md`. Old pass 1/2/3/etc. plan is stale now that CE1 scope = full library. Needs a fresh sequence aligned with the locked full-library scope.
- **Item 4** — Integrate EB5 (custom-exercise `parentExerciseId` picker) into custom-exercise form spec. Read `artifacts/tabs/programs.md` and `artifacts/tabs/profile.md` first to decide which owns the custom-exercise form, then spec the optional parent-picker dropdown there.
- **Item 5 (optional)** — ✅ DONE 2026-04-23 (see follow-up entry below).

Both remaining items are mechanical (no fresh architecture decisions required).

**Artifact changes:**
- `memory/project_ce2_schema_architecture.md`: created (new file)
- `memory/project_ce1_final_scope.md`: substantial rewrite
- `memory/MEMORY.md`: CE2 entry added; CE1 description refreshed
- `artifacts/recap.md`: CURRENT TASK block updated for session 44 status
- `CLAUDE.md`: CURRENT TASK block synced with recap
- `artifacts/handoff.md`: this entry

**No code written.** No `src/` edits. Research + planning only.

---

## Session 44 2nd follow-up (2026-04-23) — Principles doc + items 3 & 4 closed

**Scope:** Finish session 44 open items (rewrite `exercise-bank.md` Build sequencing; integrate EB5 into custom-exercise form spec) + draft seed-tagging reference doc. Research + artifact mode; no code, no `src/` edits.

**Accomplished:**
- **Strategy brainstorm for Session 45 (seed re-curation):** 6-session plan across 213 entries, ~13h total. Hybrid batching = parents first (leverage inheritance) then by muscle group within priority band. Tiered EMG research budget. Intermediate output in `seed-draft.md` (markdown), compiled to `seed.ts` at build time.
- **New artifact: `artifacts/seed-tagging-principles.md`** (~270 lines):
  - 6 rules: primary selection, secondary selection, role assignment, parent/variant inheritance, background muscles, exclusion defaults
  - 10 movement-pattern templates (horizontal/vertical push + pull, squat, hinge, lunge, carry, curl, extension, isolation)
  - 5 group-specific convention blocks (chest / back / shoulders / arms / legs / core)
  - Tier 3 tagging cadence (equipment always; grip/stance/bias opportunistic; jointLoad skip)
  - EMG reference policy tiered by priority
  - End-of-session sanity checklist + exception log format for `seed-draft.md`
- **Item 3 CLOSED — `artifacts/exercise-bank.md` Build sequencing rewritten.** Stale "pass 1/2/3/etc." replaced with 3-phase plan:
  - Phase 1 Curation (Sessions 45a–f, ~13h, no code) — session-by-session table with scope + estimate
  - Phase 2 Coordination — CE1 + CE2 share single Dexie v3 bump
  - Phase 3 Build (Session 47+) — 10-item schema + UI checklist
- **Item 4 CLOSED — EB5 integrated into `master-schematics.md` § ExerciseSearchModal Spec.** Step 1 of custom-create flow gains optional "Nest under a parent exercise" dropdown. Dropdown contents = all exercises with `parentExerciseId === null`, sorted alphabetically. Selection sets `parentExerciseId` on save; unselected → null. No muscle-map pre-fill from parent this cycle (post-MVP polish). `ExerciseService.create()` signature updated to include `parentExerciseId`.
- **Location finding:** The session 44 plan speculated the custom-exercise form lived in `profile.md` or `programs.md`. Actually it's specced in `master-schematics.md` § ExerciseSearchModal Spec (Session 41 rewrite moved the picker spec there). No tab-artifact edits needed.
- **State docs synced:** `recap.md` + `CLAUDE.md` CURRENT TASK + `handoff.md` all rolled forward to Session 45a scope.

**Decisions locked this session:**
- None fresh. All CE1 + CE2 + EB decisions already locked. This session executed on open items from the session 44 plan.

**Artifact changes:**
- `artifacts/seed-tagging-principles.md`: created (new file, ~270 lines)
- `artifacts/exercise-bank.md`: Build sequencing section rewritten
- `artifacts/master-schematics.md`: ExerciseSearchModal Spec § Custom exercise creation Step 1 + Save line updated for EB5
- `artifacts/recap.md`: top timestamp + CURRENT TASK block + state summary + KEY FILES + SESSION HISTORY entry
- `CLAUDE.md`: CURRENT TASK block rolled forward to Session 45a
- `artifacts/handoff.md`: top timestamp + this entry

**No code written.** No `src/` edits.

**Next session target:** Session 45a — lock 11 parent muscle maps per `seed-tagging-principles.md`. Output goes into new `artifacts/seed-draft.md`. Est ~1.5h.

---

## Session 44 follow-up (2026-04-23) — Guide style refresh

**Scope:** Review-driven cleanup of all 8 exercise guides + template v2. User asked: "find ways we can improve them. i want to add value not clutter." Applied Tier 1 universal cuts + Tier 2 surgical edits + step compression on the two over-segmented guides. Research/artifact-authoring only, no code.

**Tier 1 (universal — all 8 guides + `_template.md`):**
- Cut inline `Severity definitions` boilerplate (5-line block × 8 — values self-evident in column context)
- Cut `Plain English on deload` paragraph from Programming sections (3-line block × 8)
- Cut `**Cues — pick ONE per set:**` labels above each B/I/A cue trio
- Replaced `## Pre-Rep Checklist` (4–6 redundant bullets) with `## Mid-set check` (single diagnostic line)
- Added `## Quick cues` block at top of every guide (3 bullets, strict cap) — for in-app glance use
- Stripped `*Catalog entry: ... — prose ...*` to bare `*Catalog: [ref] · Template: v2*`

**Tier 2 (surgical):**
- Hook sharpens (drop "Builds X, Y, Z" filler): squat.md, bench-press.md, overhead-press.md, deadlift.md
- deadlift.md: added Right when/Wrong when to Step 5 (the pull); added `Log:` grip used
- pull-up.md: added `Log:` bodyweight at session
- incline-dumbbell-press.md: dropped arbitrary "Pair with" line
- paused-squat.md: 8 steps → 6 (folded Walk Out + Stance + Brace into one "Get Into Position" step); `Log:` pause length
- smith-machine-squat.md: 8 steps → 6 (folded Bar Position + Unrack + Brace into one "Set Up and Unrack" step); `Log:` foot position

**Template (`_template.md`):**
- All universal edits applied
- Right when/Wrong when rule strengthened: mandatory on every step a beginner can't visually self-validate (was optional)
- Tone rules: added italic = cue / bold = key term
- Optional `**Log:**` bullet added to Programming example

**Net impact:** ~115 lines lighter across 8 guides; one new mid-set value-add per guide.

**Skipped from review proposals:** What You Should Feel ↔ Common Mistakes dedupe — apparent duplicates serve different framings (felt sensation vs visible pattern); pulling them thinned the felt-diagnostic block too much.

**Artifact changes:**
- `artifacts/exercises/_template.md`: 9 edits
- `artifacts/exercises/{squat, bench-press, overhead-press, deadlift, pull-up, incline-dumbbell-press, paused-squat, smith-machine-squat}.md`: universal Tier 1 edits + per-file surgical
- `artifacts/exercise-bank.md`: revision log entry added
- `artifacts/recap.md`: SESSION HISTORY entry added
- `artifacts/handoff.md`: this entry

**No code written.** No `src/` edits.

---

## Session 44 follow-up (2026-04-23) — Big-3 + OHP guides

**Scope:** Item 5 from session 44 plan — author next batch of exercise guides under template v2. Research / artifact-authoring only; no code, no `src/` edits.

**Accomplished:**
- 3 new guides written under template v2:
  - `artifacts/exercises/squat.md` — Seed #11 (high-bar back squat default; Big-3 → Recovery Notes included)
  - `artifacts/exercises/bench-press.md` — Seed #1 (flat barbell touch-and-go default; Recovery Notes included)
  - `artifacts/exercises/overhead-press.md` — Seed #17 (standing barbell strict press default; Recovery Notes + "Can't Press Bodyweight Yet?" Progression Path included)
- All 3 follow the v2 contract: tiered B/I/A cues on movement steps, "What You Should Feel" proprioceptive map, severity column on Common Mistakes, Red Flags, progression criteria + deload trigger in Programming, split Advanced (Form / Intensity), Plain English closer.
- Naming pattern: title includes the parent default in parentheses (e.g., "Squat (High-Bar Back Squat)") to match EB1 lock; non-default variants will get separate guides via `parentExerciseId` once CE2 lands.
- `artifacts/exercise-bank.md`: Tutorial Content index expanded to 8 entries, re-ordered by tier rank; revision log entry added under "session 44 follow-up — Big-3 + OHP guides".
- `artifacts/recap.md`: KEY FILES line updated, item 5 marked done, new SESSION HISTORY entry added.

**Coverage milestone:** all 4 classic compound barbell lifts (squat / bench / deadlift / OHP) now have v2 guides.

**Next-priority gaps** (suggested for next guide-writing session):
- Bulgarian Split Squat (P0 #5)
- Barbell Hip Thrust (P0 #6)
- Dumbbell Row (P0 #3)
- Chin-Up (P0 #4) — natural pair with `pull-up.md`, can lean on it for shared portions
- Remaining Seed entries (Romanian Deadlift, Barbell Curl, etc.)

**Artifact changes:**
- `artifacts/exercises/squat.md`: created (new file, ~190 lines)
- `artifacts/exercises/bench-press.md`: created (new file, ~190 lines)
- `artifacts/exercises/overhead-press.md`: created (new file, ~210 lines)
- `artifacts/exercise-bank.md`: index updated, revision log entry added
- `artifacts/recap.md`: timestamp + KEY FILES + item 5 status + SESSION HISTORY entry
- `artifacts/handoff.md`: this entry

**No code written.** Item 3 (Build sequencing rewrite) and Item 4 (EB5 form integration) still pending.

---



## Session 43 summary (2026-04-22)

**Scope:** Exercise bank refinement. Originally planned as session 43 item 4 ("update exercise-bank.md decisions"); expanded into a comprehensive bank build-out once work began.

**Accomplished:**
- Library: 29 → 213 entries, 6 priority tiers (Seed=29, P0=9, P1=56, P2=53, P3=11, P4=30, P5=25).
- Batch A (machines, 24 entries): iso-lateral plate-loaded (Chest Press, High/Low Row, Shoulder Press), Smith variants (Bench, Incline Bench, Row, OHP, Hip Thrust, Calf Raise), dedicated machines (Hip Thrust, Glute Kickback, Preacher Curl, Bicep Curl, Tricep Extension, Shrug, Tricep Dip, Crunch, Assisted Pull-Up, Vertical Leg Press, Plate-Loaded Hack Squat, Reverse Hyperextension, 45° Hyperextension, Captain's Chair).
- Batch B (parent-family variants, 11 entries): Lat Pulldown grips (Close/V-Bar/Reverse), Paused RDL, Narrow-Grip Pull-Up, Skull Crusher variants (DB/Incline), Strict Curl, Plank variants (Knee/Weighted), plus Dumbbell Curl promoted to P0.
- Batch C: Pendulum/Belt Squat split into 2 P2 entries (Pendulum Squat, Belt Squat); Cable Crossover restructured as parent+variants (High/Low → P5, Mid deduped).
- Batch D (standalone gaps, 8 entries): Upright Row, Split Squat (non-Bulgarian), Forward Lunge, Tibialis Raise, Single-Leg Hip Thrust ×3 implements (bodyweight/Smith/machine), Single-Leg DB Calf Raise.

**Decisions locked:**
- EB1 — parent defaults: high-bar Squat, conventional Deadlift, flat BB Bench Press, bodyweight Dips; later expanded: Pull-Up pronated, Lat Pulldown wide-grip, RDL barbell, Skull Crusher EZ-bar, Barbell Curl standing, Plank forearm, Cable Crossover mid-height.
- EB2 — variant exposure: chevron expander on parent rows + search always indexes variant names. No toggle. Progressive disclosure.
- EB4 architecture — `parentExerciseId: number | null` FK on `exercises` table. Each variant keeps its own row, ID, tutorial file, GIF, progression history. Decided using Option B from 3-way analysis (flat vs parent+FK vs swap-under-parent).

**Decisions still open (session 44):**
- EB3 — Stats rollup (per-variant only vs parent rollup). Deferred — revisit during Stats visual design.
- EB6 — P4 toggle categories (naming + default state). Deferred to toggle menu build.

**Decisions closed end-of-session 43:**
- **EB4-ownership = CE2** spin-up. New planning doc `memory/project_ce2_schema_architecture.md` to be populated session 44 with concrete content (schema spec, migration plan, variant-UX wiring). Karpathy caveat applied: no empty shell.
- **EB5 = allow** custom exercises to set optional `parentExerciseId` on any seeded parent. Zero schema cost (field from EB4), one optional parent-picker dropdown in custom-exercise form.
- **EB7 executed externally** during session 43: all 5 inline guides migrated to `artifacts/exercises/[slug].md`, template v2 locked at `artifacts/exercises/_template.md`.
- **CE1 scope = all tiers.** Full 213-exercise library ships in CE1. `memory/project_ce1_final_scope.md` to be rewritten session 44 (prior "library expansion deferred" stance superseded). P4 stays UX-gated via feature toggle, not seed-gated. Build plans to be rewritten.

**Parent/Variant Rule confirmed:**
Variant = same primary/secondary muscle map as parent; differs only in execution style, range, or implement. Different muscle map = separate exercise. Applied: Paused Squat (variant), Box Squat (variant), Front Squat (separate — quad-dominant shift), Sumo Deadlift (separate — adductor shift), Stiff-Leg Deadlift (separate — hamstring-dominant), Tricep/Chest Dips (variants — emphasis within same muscle set).

**Tutorial content authored:**
5 entries (Incline DB Press, Deadlift Conventional, Paused High-Bar Squat, Smith Machine Squat, Pull-Ups). Initially inline in exercise-bank.md; migrated to `artifacts/exercises/[slug].md` (one file per exercise) and upgraded to template v2 by end of session (see EB7 closure note above). Template v2 format: title + catalog entry + hook → Setup steps (with optional right-when/wrong-when on non-obvious steps) → Movement steps with **tiered cue blocks (Beginner = internal+analogy, Intermediate = outcome, Advanced = external+terse)** → "What You Should Feel" proprioceptive map → Pre-Rep Checklist with "if it feels off" troubleshoot line → Common Mistakes table with **Severity column (Form-only / Strength-leak / Injury-risk)** + severity definitions block → Red Flags → Beginner Programming with progression criteria + deload trigger + plain-English deload gloss → optional "Can't Do It Yet? Progression Path" with stage targets (mandatory for bodyweight lifts with entry barriers) → optional Recovery Notes (mandatory for Big-3) → Advanced split into Form refinements vs Intensity techniques → Plain English closer. Length target 200–500 lines/guide. Template locked at `artifacts/exercises/_template.md`. Tier review (S/A/B/C) used to decide section inclusion; B-tier and C-tier additions (metadata strip, variations table, rename, timeline) skipped to keep guides lean.

**Artifact changes:**
- `artifacts/exercise-bank.md`: created and fully populated (this session).
- `CLAUDE.md`: added exercise-bank.md pointer to "Reference only" block.
- `artifacts/recap.md`: CURRENT TASK updated to session 44 pickup.

**Numbering gaps intentional:** P1 #4, P2 #2/3, P3 #2 vacated by Batch C moves/dedupes. Renumbering 100+ rows would cost more than it's worth; gaps annotated under each tier header.

**No code written.** No `src/` edits. Research session only.

---



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
**Phase 4 — Testing & cleanup: CLOSED 2026-04-22.** D8 + service layer test audit + D5 (ErrorContext) all complete. 72/72 tests passing.
**Phase 5 — Statistics page + new features planning (in progress).** CE1 spec patches active (session 41 = master-schematics.md done; sessions 42/43 = tabs + seed re-curation). Statistics research done (session 35) — spec updated, key UX decisions locked. Statistics build follows CE1 build.

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

## Phase 4 Close-Out (historical — closed 2026-04-22)

D8 complete. Infrastructure in place: Vitest + RTL + fake-indexeddb + jsdom. DB isolation pattern: `beforeEach(() => db.delete() + db.open())` on the singleton.
U4 + U5 UI guards complete (session 31): finish blocked with 0 exercises; Save Edits blocked on blank name or 0 exercises; useScrollToError hook with IntersectionObserver bounce arrow; 3 RTL tests added.

D5 complete (session 34): all 12 files wired with ErrorContext try/catch. WorkoutDetailPage.test.tsx updated with ErrorContext mock. 72/72 tests passing.

Test coverage at Phase 4 close: 72/72 across 8 files (see recap.md TEST COVERAGE block). Test items still outstanding — carried into Phase 5 when touched:
1. ~~WorkoutLogService (create, finish, delete cascade)~~ — DONE (session 29)
2. ~~U4 + U5 WorkoutDetailPage guards~~ — DONE (session 31)
3. ~~Service layer audit~~ — DONE (session 32)
4. Finish flow state machine paths (all 4 quick-start paths + from-program sync) — deferred into Phase 5
5. Auth flow (signup → login → logout) — deferred into Phase 5
6. ActiveWorkoutContext initialization — deferred into Phase 5

---

## Phase 5 State (active)

**CE1 spec patches in flight:**
- Session 41 (DONE 2026-04-22): master-schematics.md patched across 7 sections + Changelog. New schema fields on exercises/users/logSets; `exercises.category` dropped (derived via `getExerciseGroup()`); Muscle Taxonomy Model sub-section added; Decisions #24–#29 locked; Issue Tracker = CE1 resolved + F31–F39 added.
- Session 42 (DONE 2026-04-22): tab artifacts aligned. logs.md = SetRow RPE input gated on `UserSettingsContext.rpeEnabled` + ExerciseSearchModal cross-ref to Decision #27. profile.md = "Enable RPE per set" toggle under Preferences + F30 first-run tutorial intro + F32 migration note. statistics.md = Section 7 CE1 upgrade callout + 4 `category` residuals scrubbed to `getExerciseGroup()`. programs.md = single-line modal cross-ref. master-schematics.md Decision #26 patched (RPE toggle → UserSettingsContext.rpeEnabled, hydrated from AuthContext.user on login, F30 tutorial introduces it). memory/project_tutorial_hints_queue.md = RPE first-run hint added.
- Session 43 (DONE 2026-04-22): exercise-bank.md built out to 213 entries across 6 priority tiers (Batches A/B/C/D). All major EB decisions closed: EB1 (parent defaults) / EB2 (chevron expander + search) / EB4 architecture (`parentExerciseId` nullable FK) / EB4-ownership = CE2 / EB5 = allow / EB7 = per-file guides with template v2. CE1 scope = full 213-library. EB3 + EB6 deferred to their respective build sessions. 5 tutorial guides authored, migrated to `artifacts/exercises/[slug].md`, upgraded to template v2. See Session 43 summary at top of file for full detail.
- Session 44 (NEXT): EXECUTE on session 43 decisions. (1) Create `memory/project_ce2_schema_architecture.md` with concrete content (schema spec for `parentExerciseId`, v2→v3 migration plan, variant-UX wiring: picker chevron + search indexing). (2) Rewrite `memory/project_ce1_final_scope.md` to supersede prior "library expansion deferred" stance — new scope ships all 213 entries (P4 stays UX-gated via feature toggle, not seed-gated). (3) Rewrite Build Sequencing section in exercise-bank.md aligned with full-library CE1 scope (prior pass 1/2/3 plan stale). (4) Integrate EB5 (custom exercise `parentExerciseId` nesting = allow) into custom-exercise form spec — flag for profile.md / programs.md / master-schematics.md update. (5) Optional: more guide drafting if bandwidth.
- Session 45 (DEFERRED): seed re-curation over the final locked CE1 exercise set. Full CE1-schema tagging per EMG citations. Output = spec table (artifact), not code.

**After CE1 spec patches:** CE1 build (Dexie v3 migration + schema wiring + ExerciseSearchModal rewrite + RPE input). Then Statistics build (resolve P5 charting library + OD6 button tokens first). Then iteration on new feature sets (F20–F39).

---

## Recent Sessions (most recent first)

**Session 42 — 2026-04-22 (SPEC PATCH 2/3 COMPLETE — tab artifacts):** Research/spec-patch mode — no code written. Aligned all four tab specs + master-schematics Decision #26 + tutorial-hints memory with the CE1 locks from session 41. **logs.md** — Active-mode SetRow gains optional RPE input (1–10 with half-points, nullable, no pre-fill, never blocks save); column header conditionally adds RPE column when `UserSettingsContext.rpeEnabled === true`; Services Used rows updated to `LogSetService.add(logExerciseId, rpe?)` and `update(id, data)` (data may include `rpe`); "+ Add Exercise" cross-refs master-schematics § ExerciseSearchModal Spec (Decision #27 — D6 two-step create + D7 6-group chip + muscle-tag search). **profile.md** — Preferences gains "Enable RPE per set" toggle (default OFF; persists to `users.rpeEnabled` via `UserService.updateProfile`; surfaced app-wide via `UserSettingsContext.rpeEnabled`); inline notes call out F30 first-run tutorial introduction + F32 feature toggle menu migration; Services Used row updated (rpeEnabled + trainingAge accepted); Context Used row updated (UserSettingsContext now exposes rpeEnabled alongside unitPreference, hydrated from AuthContext.user on login, reset on logout). **statistics.md** — Section 7 Program Intelligence gains CE1 upgrade callout: `exercises.category` dropped, `getExerciseGroup(exercise)` derives broad group, specific-muscle granularity unlocks F27/F28/F29 without further schema work (stat features land in a later cycle). Four `category` residuals scrubbed → "broad group via `getExerciseGroup()`" (7a favorite + frequency rows, 7d neglected insight, 7e `getFavoriteExercises` services row). **programs.md** — one-liner cross-ref added to "+ Add Exercise" pointing at ExerciseSearchModal Spec (Decision #27); no other picker callouts existed. **master-schematics.md Decision #26 patched** — explicitly locks: RPE toggle exposed via `UserSettingsContext.rpeEnabled` (hydrated from `AuthContext.user` on login, reset on logout — same pattern as `unitPreference`); feature introduced via F30 first-run tutorial. **memory/project_tutorial_hints_queue.md** — new "RPE toggle — first-run introduction" hint prepended to the muscle-picker hints (covers what RPE measures, half-point scale, optional nature, opt-in during tutorial, default-off honesty for tutorial-skippers). **Decisions locked extending #26:** (1) RPE toggle lives in UserSettingsContext — matches unit-preference pattern, clean separation of preferences from identity state; (2) RPE introduced via F30 tutorial, not silent toggle. **Ready for Session 43:** seed re-curation table — 29 exercises tagged with `primaryMuscles[]` + role-tagged `secondaryMuscles[]` + Tier 3 forward-compat fields; EMG citations per Decision #24 sourcing standard; output is a spec artifact, not code.

**Session 40 — 2026-04-22 (CE1 PLANNING CLOSED — ready for spec patch):** Research session — no code written. Resumed CE1 planning from session 39's pickup point and carried it to full completion. **Locked D4 (B-lite — role tag synergist/stabilizer on secondaries; both 0.5× MVP math); D5 (recovery windows: 9 large 60h / 15 small 36h / 2 background-small 36h; adductors moved to small; Galpin training-age modifier deferred entirely); D-new-3 (RPE per set: logSets.rpe 1-10 with half-points, users.rpeEnabled toggle, opt-in via Profile, all RPE-derived stats deferred); D6 (4 sub-forks — multi-select Step 1 + sectioned Step 2; two-tap chip cycle; long-press promote; seed-only background); D7 (4 sub-forks — 6 broad chips, single-select, primary + all secondaries with role color, name+muscle search); D8 (5 sub-forks — nuke and reseed B2; N/A auto-map; silent migration; single Dexie v3; S2/S3 forward-compat fields); D9 (5 sub-forks — camelCase IDs, Title Case labels, single map, TS string union); D15.1 (Option C — equipment as forward-compat nullable field).** **Path A LOCKED:** simplified scope (Tier 1 already-locked + Tier 3 forward-compat schema fields). **Tier 2 deferred:** D10-D17 full UX work, library expansion, cues/instructions, all RPE stats, joint load curation, injury warning system, feature toggle menu. User pushed back twice this session: (1) wanted stabilizers tracked after originally skipping → D4 reopened; (2) flagged scope too big for one cycle → Path A chosen. User also proposed alternative 3-field dropdown picker UX at D6.2; reviewed honestly, defended Option A; user agreed. Memory files created/updated: project_rpe_deferred_features.md (NEW), project_picker_ux_post_build.md (NEW), project_tutorial_hints_queue.md (NEW), project_post_launch_migration_pattern.md (NEW), project_ce1_final_scope.md (NEW — supersedes planning_state), project_stat_weights_calibration.md (UPDATED for Galpin defer). **Spec patch session split agreed:** Session 41 = master-schematics.md (7 sections: DB Schema, Dexie schema string + version note, Service Layer, Exercise Library, ExerciseSearchModal Spec, Key Design Decisions, Issue Tracker + Changelog); Session 42 = tab artifacts (logs.md, profile.md, statistics.md); Session 43 = seed re-curation with EMG citations. **Pickup point:** read memory/project_ce1_final_scope.md (mandatory authoritative scope) + MEMORY.md index, then begin master-schematics.md edits per the 7-section plan in CURRENT TASK.

**Session 39 — 2026-04-22 (PAUSED MID-PLANNING):** Research session — no code written. CE1 deep dive expanded far beyond original 4 sub-questions into full muscle taxonomy + exercise dimensions + injury-warning system planning. Coach panel set up at session start (Poliquin / Galpin / Rambod / Tuchscherer — Israetel/Cressey/Thibaudeau dropped); panel saved to statistics.md § Coach Review Panel; CP1 logged. **Brainstorm closed**: active dimensions narrowed to 8 (bias, fatigue ratio, grip width, grip orientation, stance width, equipment, tempo, bilateral) after parking body position, loading vector, RoM, skill, stability. Coach panel critique surfaced critical gaps: RPE absent, rest absent, RoM cut prematurely, recovery windows treated as universal. **Planning phase: D1, D2, D3 LOCKED. D4 REOPENED. D5 PAUSED.** D1 = 24+2 muscle taxonomy (additions: lower traps, brachialis, hip flexors, serratus, adductors, abductors, tibialis, neck/rotator cuff as background). D2 = 6 broad groups derived from specific muscle (storage = specific only). D3 = primary 1.0× / secondary 0.5× with co-primaries when EMG-supported, no display cap, declared order, named constant. D4 reopened (user reversed "skip stabilizers"); 14 stabilizer muscles confirmed; user leaning B or C; research strongly supports B-lite (role tag synergist/stabilizer on secondaries; both 0.5× MVP math). D5 paused mid-bucket-discussion. Modern training metrics research validated: hard sets per muscle/week (Schoenfeld), RPE/RIR per set, e1RM tracking, MEV/MAV/MRV bands (Israetel), EWMA over ACWR for injury risk (Wang 2020 critique). Schema improvements proposed S1–S10 (top 3: S1 logSets.rpe, S2 exercises.jointLoad, S3 users.trainingAge). New decisions surfaced: D-new (feature toggle menu — next dev cycle), D-new-2 (joint load tags), D-new-3 (RPE accepted), D-new-4 (rest tracking — toggle menu), D-new-5 (lengthened bias — toggle menu), F-new (Injury-Warning system, likely F31). Memory files created: project_feature_toggle_menu.md, project_cardio_tracking.md, project_stat_weights_calibration.md, project_ce1_planning_state.md. **Pickup point: D4 (B-lite) → D5 → D-new-3 RPE spec → D6–D9 → D10–D17.**

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
