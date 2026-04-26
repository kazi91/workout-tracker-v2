# Handoff — Session History
> Last touched: 2026-04-26 (consolidation sweep) — append-only; read on demand only.
> Newest at top. What changed → see git log. Why we chose this → here.

---

## Session 53 (2026-04-26) — punch-list triage + smoke close-out

**Scope:** Step 7 close-out. 14 punch-list items + 2 findings from S52 smoke-setup processed.

**Decisions / direction:**
- **#1 (bodyweight) → F42.** All three patches (label / total-display / two-fields) rejected as insufficient. Why: pull-ups/dips/push-ups + select plyometrics need a dedicated load-model redesign with `addedWeight` + `userBodyweight` snapshot. v4 schema candidate; bundles with F40+F41.
- **#10 (drill-down chips) → F40 Row C.** Path B (drill-down chips) chosen over Path A (taxonomy split). Why: keeps muscle taxonomy clean; F40 already owns chip-stack UX. 4 lock-ins annotated to F40: state cleanup on group change, any-primary filter semantics (RDL surfaces under Hamstrings even though glutes is first primary), conditional Row C visibility (≥2 sub-muscles), 3-row UX cost flag for 480px.
- **#12 (variant muscle meta) → always hide.** Path A. Why: user direction is broader declutter pass — future picker UX should lean toward less meta noise. Considered "only when variant has divergent map" — rejected (rare edge case, adds branching for negligible gain).
- **#17 (search semantics) → primary-only.** Coaches' panel (6/6) favored primary-only over secondary-inclusive. Why: synergist discovery belongs in tutorial pages, not in the picker. Slang/alias search (e.g. "RDL", "BP") belongs to F41 — different search dimension.
- **#18 (picker row meta) → primary-only now; EMG-driven top-N later.** Path A shipped. Why: industry standard (Hevy/Strong both do this). F19 (role-tagged capsules) absorbed into the future EMG cycle — capsule UI should display top-N highest-activated muscles regardless of primary/secondary classification once EMG values are calibrated.
- **#15 alias preserved via F41.** Renamed B-Stance RDL → Staggered-Stance RDL; aliases `["b-stance", "b stance"]` queued on F41 row to preserve searchability.
- **#13 (Deficit RDL) → variant of RDL with `bias: 'lengthened'`.** Why: rejected `'deficit'` value (would have required principles patch + sweep); existing enumerated set covers the case.
- **#7 (autoCapitalize) → picker custom-create input only.** Why: user spec is first-letter-only, rest left to user. Broader sweep deferred to a later UI/formatting standards pass.
- **#8 (edit log datetime) → memory-only.** No F-row. Why: the schema fields exist (`workoutLogs.startedAt/finishedAt`); pairs with future import/manual-entry flows.
- **#9 (olympic-lift visibility) → defer to F40 Row B + F32.** No standalone work — already covered by `'olympic lift'` in F40 equipment-chip filter and per-dimension toggles in F32.
- **#11 (cardio rendering) → defer to multi-shape tracking arch.** Not standalone — second consumer of toggle/multi-shape architecture being built first via F32 + F39 + F38.
- **#19 (role-tagged capsules) → absorbed into EMG cycle.** No standalone F-row.

**Findings logged:**
- CP2 — exercise-bank.md group labels drifted out of sync with muscleTaxonomy.ts (post-#30/#31 rename); doc audit pending.
- CP3 — mid-trap function captured implicitly via `upperBack`; no separate `midTraps` taxon — document for curators.

**Resolved:**
- F8 superseded by F42 → moved to Resolved Issues. Why: F8 was just `isBodyweight` boolean patch; F42 covers display AND stats honesty.

**Mid-smoke gap fix:** picker had a duplicate local copy of `matchesMuscleTag` (in `ExerciseSearchModal.tsx`) that the service-layer #17 fix didn't update. Patched in-place; refactor to shared helper deferred (refactor scope).

**Memory adds:** `project_bodyweight_added_resistance.md` (F42), `project_emg_top_n_display.md`, `project_log_datetime_edit.md`, `feedback_ask_dont_lean.md`, `feedback_question_format.md`.

**What changed:** see commit `cd723e0`.

**Verification:** PENDING — agent shell can't reach npx; user runs `npm run build && npx vitest run` before commit.

---

## Session 52 (2026-04-26) — CE1/CE2 v3 BUILD STEP 7 of 7 — CLOSED partial

**Scope:** Vitest coverage for ExerciseSearchModal + 3 mid-session decisions. SetRow rebuild folded in. Smoke + Issue Tracker scrub deferred to S53.

**Decisions locked:**
- **#30 — `upperTraps` group derivation back → shoulders.** Lower traps stays in back (scap retraction + depression with rhomboids/mid traps). Why: bodybuilding shoulder-day convention; scap-elevation kinematics align with delts. Considered keeping all traps in back → rejected because shoulder-chip routing breaks. Tag assignments on individual exercises unchanged — only broad-group derivation moved.
- **#31 — Farmer + Suitcase Carry primary order swap to `[upperTraps, forearms]`.** Routes both to Shoulders chip alongside shrugs. Why: heavy-carry trap stimulus dominates training adaptation; forearms is the limit but not the primary tissue. Hevy/Strong file these under traps/back. Considered leaving order as-is → rejected because Shoulders chip is internally consistent post-#30. Co-primary status preserved on both — only order swapped.
- **#32 — `bias` → `modifications` rename + multi-select reshape.** `string | null` → `string[]` (default `[]`). Value enum extended with `deficit` to 7 (`paused / tempo / partial / lengthened / peak-contraction / explosive / deficit`). Considered: `variant` (collides with `parentExerciseId`), `modifier` (singular). Picked `modifications` — plural, no collision, multi-select natural. Word `bias` reserved for future muscle-loading-emphasis field (F39).

**Curator flag (deferred):** Suitcase Carry obliques arguably co-primary — anti-lateral flexion is its differentiating stimulus vs Farmer Carry. Logged on Decision #31; memory entry `project_suitcase_carry_obliques_flag.md`. Out of scope for #31 itself.

**Build work:**
- Vitest coverage: 26 ExerciseSearchModal cases (130/130 across 11 files). Closes the modal's test gap.
- SetRow rebuild: custom `[− input +]` pill stepper per cell; native browser spinner hidden via CSS. Grid retuned (BEST 44px, LB minmax(72px, 1fr), REPS 56px, RPE 76px, gap 2px, buttons 18×36). Save logic split into `saveWeight`/`saveReps`/`saveRpe` (blank field never fail-validates an adjacent field's save). Closes punch-list #2 + #3.
- F40 (picker filter revamp 3-row UX) locked + v4 bundling note. F41 (per-exercise `aliases: string[]` v4 schema bump) added — closes-by absorbs punch-list #4/#5/#14.

**What changed:** see commits `3ff891e`, `d989d05`, `d77d17f`.

---

## Session 51 (2026-04-26) — CE1/CE2 v3 BUILD STEP 6 of 7 — CLOSED

**Scope:** ExerciseSearchModal full rewrite per Decision #27 + CE2 EB2/EB5.

**Decisions:**
- **#27 amended.** Four-state tap cycle (neutral → primary → synergist → stabilizer → neutral) replaces D6.2 two-tap + D6.3 long-press. Why: long-press was unintuitive on mobile; four-state cycle is one consistent gesture. Considered keeping long-press for promote → rejected (no discoverability + collides with iOS context menu).
- **Save with no primary blocks with inline error** (vs. auto-promote). Why: silent auto-promote masks user intent; inline error invites correction without losing state.

**Build:**
- Three view modes: browse / createStep1 / createStep2. Browse renders flat in search and parents-with-chevron in browse mode (CE2 #5). Sticky `+ Create custom exercise` footer.
- Bespoke radio choice modal for ≥1-variant delete (default = null-orphan, safer than cascade).
- No service edits — `ExerciseService.search/create/deleteExercise` contracts already shipped Session 49.
- No test edits — modal had no existing test file (S52 added).

**What changed:** see commit `918baef`.

---

## Session 50 (2026-04-26) — CE1/CE2 v3 BUILD STEPS 4 + 5 of 7 — CLOSED

**Scope:** Steps 4 + 5 bundled (settings ↔ UI consumer tightly coupled). Step 4 = `rpeEnabled` into `UserSettingsContext` + Profile toggle. Step 5 = SetRow per-set RPE input gated by toggle.

**Public contract change:** `SetRow.onUpdate` and `ExerciseCard.onSetUpdate` switched from `(setId, weightLb, reps)` to `(setId, data: { weight?, reps?, rpe? })`. Why: RPE saves independently of weight/reps so a user can enter or clear RPE at any time, and "null never blocks save" per Decision #26. Cleaner than a parallel `onRpeUpdate` callback.

**RPE-derived stats deferred** to next dev cycle per `project_rpe_deferred_features.md` (volume modifier, fatigue, autoregulation cues, target-RPE programming, history charts). This cycle ships entry + collection + toggle only.

**What changed:** see commit `b91386f`.

---

## Session 49 (2026-04-25) — CE1/CE2 v3 BUILD STEP 3 of 7 — CLOSED

**Scope:** ExerciseService rewrite + LogSetService RPE wiring + UserService profile-update extension. P1 curation gap closed inline (212 → 214 entries).

**Decisions / why:**
- `purgeExerciseRecord` uses `.filter()` because `exerciseId` is not indexed on `logExercises`/`workoutExercises`. Acceptable at MVP scale; runs only on rare custom-delete path.
- P1 catch-up done inline rather than spinning a separate session: Machine Row (P1 #9, parent-level, inherits Iso-Lat Low Row map — `[lats, upperBack]` co-primary) + Neutral-Grip Pull-Up (P1 #8, structural variant of Pull-Up with parent-map inheritance — no Rule 1 override since neutral grip is not in EMG override queue). SEED_ENTRIES.length now matches exercise-bank.md tier counts (P1=56, total=214).

**What changed:** see commit `3af0209`. 22 new ExerciseService tests + 6 LogSetService RPE tests; 104/104 across 10 files.

---

## Session 48 (2026-04-25) — CE1/CE2 v3 BUILD STEP 2 of 7 — CLOSED

**Scope:** Seed library compiled — 212-entry catalog from `seed-draft.md` → typed-Exercise `SEED_ENTRIES` + 2-pass `seedExercises` (parents → variants resolve `parentExerciseId` via name lookup).

**What changed:** see commit `29a836c`.

---

## Session 47 (2026-04-25) — CE1/CE2 v3 BUILD STEP 1 of 7 — CLOSED

**Scope:** Foundation layer. Types + Muscle Taxonomy module + Dexie schema bump. First code-touching session of the CE1/CE2 v3 build cycle.

**Decisions locked at session start:**
- **Dexie in-code version = `3`** (not `2`). Why: code originally had only `version(1)`; never declared `version(2)`. Picked `3` to match planning-doc labels (master-schematics § Dexie Schema String — v3) over code's natural progression. `version(1)` retained alongside `version(3)`; `version(2)` skipped (no v2 was ever shipped to anyone).
- **Pending v2-era schema additions stay deferred** (`bodyMetrics`, `dailyCheckins`, `workoutLogs.rating`, `users.goalWeight`). Why: bundle into the schema bump when their features actually ship, not now — avoids no-op forward-compat columns.
- **Pacing = Option A revised mid-execution to ~5 sessions.** Stopped after Step 1 per build rule "Prefer finishing the current file/component cleanly over starting a new one." Reading `seed-draft.md` size up close (3,676 lines × 214 entries × ~17 lines each) revealed Step 2 alone deserves its own session.

**What changed:** see commit (Session 47 — was the first build session of v3).

---

## Sessions 45c–46 (2026-04-23 to 2026-04-24) — Seed re-curation closing batch

Compact summaries; full per-session detail in commits + `artifacts/archive/seed-draft.md` § per-session blocks.

### Session 46 (2026-04-24) — Pre-build gap-audit batch CLOSED (11 items)
- 7 of 8 Pre-build items already resolved inline during sessions 41–44 spec patching. Audit doc was authored before some of those sessions completed; work happened along the way but audit wasn't updated.
- Already-resolved (audit-log only): GA-02, GA-17, GA-18, GA-19, GA-20, GA-44, GA-45.
- Newly fixed: GA-01 (v3 Dexie schema code block + GA-13 mislabeled header), GA-42 (`project_state.md` rewritten to post-45g state), GA-43 (MEMORY.md index refresh), GA-46 (`project_artifact_fixes.md` restructured: 4 of 6 sub-items already done).
- Gap-audit.md status: 13/51 closed; 38 hygiene+cosmetic remain (deferrable, roll out as artifacts touched).
- **Methodology note:** Audit-before-edit revealed the cleanest way to "execute a batch" is to first verify each item against the audit's claim. The audit was a snapshot; specs evolve. Saved ~2 hr of redundant edits.

### Session 45g (2026-04-24) — P4 OL + KB-ballistic CLOSED (12 entries); SEED RE-CURATION COMPLETE 214/214
- 12 previously-parked entries tagged: 3 Cleans (Power, Hang, C&J — **C&J 13-sec NEW LIBRARY KINETIC-CHAIN CEILING**, supersedes Overhead Carry at 10), 2 Snatches (Power, Hang — **12-sec snatch-family ceiling**), 2 Pulls (Clean Pull, Snatch Pull — Snatch-grip upperBack syn promotion per Poliquin), 3 Jerks/Push Press, 2 KB-ballistic (KB Clean, KB Snatch).
- **New movement-pattern template codified:** "Olympic lift / ballistic triple extension" with 3 sub-patterns (Pulling = Hinge base + catch additions; Jerk = Vertical push + leg drive; KB-ballistic = KB Swing base + catch additions).
- **Six-coach panel formalized + expanded:** Poliquin added alongside Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols. Poliquin lens drove snatch-grip upperBack syn promotion + cuff stab on overhead heavy free-path.
- **Tagging accuracy lens formally codified** per `feedback_tagging_accuracy.md` — correct-execution + common-mistake recruitment scope. NOT extreme edge cases. Drove broad lats-on-OL-pulls + upperBack-stab-on-jerks + calves-on-KB-Clean + sideDelts-on-KB-Snatch additions.
- 4 new EMG overrides added (Olympic Cleans / Snatches / Jerks / KB-ballistic).
- Cross-curation validation: 16 existing 45a–f overrides re-verified valid; group-derivations clean across full 120-entry curation corpus.
- **Library re-curation COMPLETE** as of close-out — all 214 entries tagged across 7 sub-sessions (45a–g).

### Session 45f (2026-04-24) — P4 plyo + KB + conditioning CLOSED (19 entries) + 12 parked
- 7 Plyometric + 4 of 6 Kettlebell + 8 Conditioning tagged. 12 entries parked pending OL template research (resolved 45g).
- **Push-Up promoted to 12th library parent** via Clap Push-Up variant linkage.
- **Sled Pull split** into backward-walk default (P4 #25) + Sled Row (P4 #31 NEW). Library 213 → 214.
- New Tier 3 `bias: 'explosive'` value introduced (Clap Push-Up).
- **Panel-of-coaches consult methodology introduced by user** (5 coaches; expanded to 6 in 45g).
- 2 new EMG overrides: Turkish Get-Up `[abs, obliques]` (first library abs+obliques pairing); Sprint `[hamstrings, glutes]` (max-velocity locomotion novel outside any template).

### Session 45e (2026-04-23) — P5 + P2 + P3 CLOSED (89 entries)
- Largest single sub-session. 25 P5 variants + 53 P2 + 11 P3 tagged.
- 1 EMG override locked: Narrow-Grip Pull-Up `[lats, biceps]` (Pull-Up Rule 1 override).
- **Principles-doc Rule 5 patched:** `rotatorCuff` may be tagged primary on dedicated cuff-isolation exercises (Cable ER P2 #19 + DB ER P2 #20 only library cases). Group derivation → `shoulders`. Cuff stays excluded from picker chips. Considered keeping cuff strictly background-only → rejected because anatomically the cuff IS the only mover on dedicated isolation; Rule 5 was over-broad.
- Considered flipping Overhead Carry to cuff-as-primary co-primary → rejected; kept cuff-as-syn (face-pull-style synergist exception stands).
- 18 exceptions logged in seed-draft.md. Notable: Loaded Carry template flags 4 entries at 6+ secondaries (template-driven, accepted); Cable Y-Raise canonical lowerTraps-primary; Zercher Carry unique `[upperBack, biceps]` co-primary.

### Session 45d (2026-04-23) — P1 lower body + core CLOSED (27 entries)
- 3 Hinge + 8 Quads + 2 Hamstrings + 4 Glutes + 2 Calves + 7 Core + 1 Triceps catch-up tagged.
- No new EMG overrides; principles applied as-written.
- 6 exceptions logged: Front Squat 6-sec (Squat precedent w/ upperBack-for-calves swap); Sumo DL adductor re-add (closes 45a Deadlift loop); 45° Hyperextension `lowerBack (syn)` per Rule 6 explicit exception; Bird Dog glutes-on-core; Side Plank abductors + obliques-primary; Machine Tricep Extension scope catch-up from 45c.

### Session 45c (2026-04-23) — P1 upper body CLOSED (27 entries)
- 6 Chest + 5 Back + 9 Shoulders + 5 Biceps + 2 Triceps tagged.
- 1 EMG override locked: Close-Grip Bench `[chest, triceps]` (Barnett 1995).
- 6 exceptions: Close-Grip Bench co-primary; Arnold Press 6-sec (Vertical push); Machine Assisted Dip inherited co-primary on machine; Iso-Lat High Row naming/template mismatch; Landmine Press hybrid angle; Upright Row hybrid pattern.
- **Machine discipline applied consistently:** Machine Chest Press 2 sec, Machine SP 4 sec, Machine Assisted Pull-Up 5 sec. Pec Deck + Rear Delt Pec Deck held to strict isolation (fly exception NOT extended to pad-supported machines).

---

## Session 45b pt. 2 (2026-04-23) — Main draft completed + close-out

**Scope:** Resume pt. 1 mid-draft at entry #14; finish 14 remaining entries (5 Seed + 9 P0); run end-of-session close-out. Research + artifact mode.

**Decisions made this session:**
1. **Include OHP as late-caught parent** (not deferred to S45c). Why: it's a Seed-table parent with known variants in P0/P1/P5; deferring would push dependent inheritance one full session for no benefit.
2. **Extend fly-exception from cable to DB fly.** Why: DB fly has equivalent or greater rotator cuff vulnerability at the loaded-stretch position (heavier stretch, no cable-assist tension). The exception is about the movement class (fly), not the implement (cable).
3. **Push-Up serratus tagged as synergist** (not stabilizer). Why: distinct from flat bench because push-up allows free scapular movement (full upward rotation cycle = concentric work). Bench pins the scap.

**7 exceptions appended to seed-draft.md:**
- OHP 6-sec (template-standard, accepted, same pattern as Squat 45a).
- DB Shoulder Press 6-sec (OHP precedent).
- Push-Up serratus-syn (vs default stab).
- DB Fly fly-exception (extended from cable-only).
- Chin-Up map divergence from Pull-Up parent despite parentExerciseId linkage.
- Hip Thrust single-primary glutes (rejects Hinge-template co-primary per Contreras EMG).
- Ab Wheel Rollout equipment = `other`.

**EMG list updated:** "Non-parents + missed parent (session 45b)" added with 5 entries (OHP, Chin-Up, Bulgarian Split Squat, Hammer Curl template-default, Hanging Leg Raise). Queued list trimmed to: Close-Grip Bench (45c), Narrow-Grip Pull-Up (45e).

---

## Session 45b pt. 1 (2026-04-23) — Main draft started, 13 of 27 written, paused

**Scope correction:** OHP (Seed #17) was missing from both the 45a parent list AND the 45b scope count in CLAUDE.md (said "17 remaining Seed"; actual = 18). Added OHP as late-caught parent. True 45b scope = 18 Seed + 9 P0 = 27 entries.

**Labeling fixes in pre-lock section:** Face Pull #18 → #20; Lateral Raise #15 → #18.

**Decisions:** identical to pt. 2 (carried forward — OHP inclusion, fly-exception extension, Push-Up serratus-syn). Documented at first occurrence in pt. 1.

---

## Session 45b opening (2026-04-23) — Poliquin audit + methodology refinement + 7 pre-locks

**Scope:** Three user-driven methodology challenges resolved before drafting; full Poliquin-audit retroactive pass over 11 parents; main 26-entry draft deferred (session scope filled).

**Decisions made this session:**
1. **Incline bench ≠ flat bench + extras.** Why: EMG evidence — incline has ~30–45% more upper chest, ~58.5% less triceps. Resolution: on incline variants reorder secondaries so `frontDelts (syn)` precedes `triceps (syn)`.
2. **Lateral raise traps engage at/above 90°.** Why: EMG-confirmed. Resolution: tag = `sideDelts (primary) + upperTraps (syn) + rotatorCuff (stab)`.
3. **Normal competent execution policy.** Why: user challenged "perfect form" assumption for tricep pushdown. Resolution: tag stabilizers engaged under good-but-imperfect form (e.g. anterior shoulder bracing on pushdown); exclude compensation-from-breakdown muscles. Codified as Rule 2 addendum.
4. **Poliquin-audit batch accept** — 8 additive stabilizers across the 11 parents. User: "accept all they are all correct technically. i dont want to lose credibility." All 8 applied retroactively. Squat pushed to 6 secondaries (over ≤5 soft threshold) — accepted as Poliquin-driven exception.

**Principles-doc patches applied:**
- Rule 2 Execution-standard addendum.
- Rule 5 `rotatorCuff` use-case expansion (+ skull crusher supine, + plank bodyweight, + cable fly multi-plane); face-pull synergist exception.
- Rule 6 `abs` exclusion row updated — axial-loaded standing isolation now qualifies for `abs (stab)`.
- Isolation template gained cable-fly exception to "0 or 1 secondary" rule.

**7 pre-locks persisted** to `seed-draft.md` for 45b main: Chin-Up `[lats, biceps]`; Bulgarian Split Squat `[quads, glutes]`; Face Pull 4-muscle w/ `rotatorCuff (syn)`; Hanging Leg Raise `[abs, hipFlexors]`; Incline BB Bench frontDelts-before-triceps; Lateral Raise +upperTraps/+rotatorCuff; Tricep Pushdown +frontDelts.

---

## Session 45a (2026-04-23) — 11 parent muscle maps locked

**Scope:** Lock primary + role-tagged secondaries + opportunistic Tier 3 fields for the 11 parent exercises. New artifact: `seed-draft.md`.

**Decisions made this session:**
1. **Dips co-primary `[chest, triceps]`** — group changes from seed Arms → Chest. Why: bodyweight closed-chain dip EMG supports.
2. **RDL order `[glutes, hamstrings]`** — template default; both in legs group (tiebreak cosmetic).
3. **Deadlift drop adductors** — conventional narrow stance. Sumo will re-add in 45b.
4. **Plank obliques as stabilizer** — anti-extension core work; EMG supports oblique bracing (despite exclusion-rule lean).
5. **Skull Crusher minimal secondaries** — only `forearms (stab)` per Extension template discipline.
6. **Squat single-primary `quads` (Path A)** — challenged mid-review; 6-expert panel researched (Nippard / Contreras / Nuckols / Schoenfeld / Horschig / Escamilla). Panel split 3:2:1 single-primary vs co-primary vs context-dependent. Key evidence: Contreras' own 2015 EMG shows upper glute 29.4% mean (squat) vs 69.5% (hip thrust) → squat is not the glute exercise. Bulgarian Split Squat remains the taxonomy's designated co-primary squat-pattern exemplar; dedicated Hip Thrust + RDL entries cover glute volume tracking.

**EMG co-primary reference list seeded:** 4 parents locked (Deadlift, Dips, Pull-Up, RDL); 4 queued (Chin-Up, Bulgarian Split Squat, Close-Grip Bench, Narrow-Grip Pull-Up); 4 rejected (Bench, Squat, OHP, Lat Pulldown).

---

## Session 44 (2026-04-23) — Execute on session 43 decisions

**Scope:** Execute on the four decisions locked end-of-session-43 (EB4-ownership=CE2, EB5=allow, CE1 scope=all tiers, EB7 already-done). Multiple follow-ups same session. Research + planning artifacts only; no code.

**5 CE2 architecture decisions locked:**
- #1 Secondary index on `parentExerciseId` = **yes** (chevron expansion is a hot path).
- #2 Deletion behavior = **choice modal** (user picks cascade or null-orphan at delete time).
- #3 Hierarchy = **flat / forbid grandchildren** (mobile picker UX is the binding constraint).
- #4 Custom parent restriction = **any parent-level exercise** (seed or custom both qualify).
- #5 Search for variants = **direct results** (flat; no parent-grouping).

**CE1 scope memo rewritten:** `project_ce1_final_scope.md` supersedes prior "library expansion deferred" stance. Full 213-entry library ships in CE1. P4 stays UX-gated via feature toggle, not seed-gated. D-new-4 (library expansion) + D-new-5 (CE2 pointer) added to Tier 1.

### 2nd follow-up — Items 3 + 4 closed
- **New artifact: `seed-tagging-principles.md`** (~270 lines) — 6 rules + 10 movement templates + 5 group conventions + Tier 3 cadence + EMG policy + sanity checklist.
- **Item 3 — exercise-bank.md Build sequencing rewritten.** Old "pass 1/2/3" replaced with 3-phase plan: Phase 1 Curation (45a–f, ~13h) → Phase 2 Coordination (CE1 + CE2 share single v3 bump) → Phase 3 Build (S47+).
- **Item 4 — EB5 integrated into master-schematics.md § ExerciseSearchModal Spec.** Optional "Nest under a parent exercise" dropdown on Step 1 of custom-create flow. Location finding: custom-exercise form lives in master-schematics.md (S41 rewrite moved it there), not profile.md or programs.md as the S44 plan speculated.

### 3rd follow-up — Comprehensive gap audit (51 gaps)
- Full audit across 22 artifacts + CLAUDE.md + 18 memory files (~41 files, ~5,900 lines). Six phases: Foundation → Tab specs → Exercise library → UIdesign/process → Memory → Synthesis. Severity 🔴/🟠/🟡/⚪.
- **51 gaps logged.** 4 🔴 / 13 🟠 / 29 🟡 / 5 ⚪. New artifact: `gap-audit.md` (now archived).
- **High-impact clusters:** parentExerciseId schema coverage drift (GA-01/02/44); project_state.md + MEMORY.md drift (GA-42/43); Pull-Up taxonomy contradiction (GA-32 — Rule 1 says co-primary, Vertical pull template says single-primary); broken cross-drive memory link (GA-31); S4 adherence residuals (GA-19/20); stale service names (GA-17/18); coreprocess.md vs recap.md authority conflict (GA-38).
- **Pre-45a fix batch executed:** GA-31 (broken link stripped) + GA-32 (Pull-Up promoted to explicit Rule-1 override; template default kept at `lats` single-primary for Lat Pulldown). Pull-Up parent map deterministic for S45a.

### Follow-ups — Big-3 + OHP guides + Guide style refresh
- 3 new guides authored under template v2: squat.md, bench-press.md, overhead-press.md. All 4 classic compound barbell lifts now have v2 guides (squat/bench/deadlift/OHP).
- Guide style refresh: Tier 1 universal cuts (Severity definitions block, Plain English on deload, Pre-Rep Checklist) + universal Quick Cues block at top + Tier 2 surgical edits + step compression on paused-squat/smith-machine-squat (8 → 6). Net: ~115 lines lighter across 8-guide corpus.

---

## Session 43 (2026-04-22) — Exercise bank build-out

**Scope:** Originally planned as S43 item 4 ("update exercise-bank.md decisions"); expanded into comprehensive bank build-out once work began. Library 29 → 213 entries across 6 priority tiers (Seed=29, P0=9, P1=56, P2=53, P3=11, P4=30, P5=25).

**Decisions locked:**
- **EB1 — parent defaults:** high-bar Squat, conventional Deadlift, flat BB Bench Press, bodyweight Dips, Pull-Up pronated, Lat Pulldown wide-grip, RDL barbell, Skull Crusher EZ-bar, Barbell Curl standing, Plank forearm, Cable Crossover mid-height.
- **EB2 — variant exposure:** chevron expander on parent rows + search always indexes variant names. No toggle. Why: progressive disclosure beats either always-show or hide-behind-toggle for mobile.
- **EB4 architecture — `parentExerciseId: number | null` FK on `exercises` table.** Each variant keeps its own row, ID, tutorial file, GIF, progression history. Decided using Option B from 3-way analysis (flat vs parent+FK vs swap-under-parent).

**Decisions closed end-of-session:**
- **EB4-ownership = CE2.** New planning doc `memory/project_ce2_schema_architecture.md` to be populated S44.
- **EB5 = allow** custom exercises to set optional `parentExerciseId` on any seeded parent. Zero schema cost (field from EB4); one optional dropdown.
- **EB7 executed externally:** all 5 inline guides migrated to `artifacts/exercises/[slug].md`; template v2 locked at `_template.md`.
- **CE1 scope = all tiers.** Full 213-exercise library ships in CE1. Prior "library expansion deferred" stance superseded.

**Decisions deferred:**
- **EB3 (Stats rollup — per-variant only vs parent rollup)** — revisit during Stats visual design.
- **EB6 (P4 toggle categories naming + default state)** — to toggle menu build.

**Parent/Variant Rule confirmed:** Variant = same primary/secondary muscle map as parent; differs only in execution style, range, or implement. Different muscle map = separate exercise. Applied: Paused Squat (variant), Box Squat (variant), Front Squat (separate — quad-dominant shift), Sumo DL (separate — adductor shift), Stiff-Leg DL (separate — hamstring-dominant), Tricep/Chest Dips (variants — emphasis within same muscle set).

**Tutorial template v2 locked.** Tier review (S/A/B/C) used to decide section inclusion; B-tier and C-tier additions (metadata strip, variations table, rename, timeline) skipped to keep guides lean.

**Numbering gaps intentional:** P1 #4, P2 #2/3, P3 #2 vacated by Batch C moves/dedupes. Renumbering 100+ rows would cost more than it's worth; gaps annotated under each tier header.

---

## Session 42 (2026-04-22) — SPEC PATCH 2/3 — tab artifacts

**Scope:** Align logs.md, profile.md, statistics.md, programs.md with CE1 locks from S41. No code.

**Decisions locked extending #26:**
1. **RPE toggle lives in UserSettingsContext** (not raw AuthContext.user). Why: matches `unitPreference` pattern; clean separation of preferences from identity state.
2. **RPE introduced via F30 first-run tutorial** (not silent toggle).

**Sequencing change end-of-session:** Seed re-curation deferred from S43 → S44. Why: `exercise-bank.md` has active expansion planning that will change the final CE1 seed set; curating 29 current seeds now would need redoing post-expansion.

---

## Session 41 (2026-04-22) — SPEC PATCH 1/3 — master-schematics.md

**Scope:** Path A spec patch against master-schematics.md per `project_ce1_final_scope.md`. No code.

**Planning resolutions locked before writing:**
1. **`exercises.category` DROPPED.** Broad group derived via `getExerciseGroup()` with "first primary wins" tiebreaker. Why: chosen Option C of 3 — keeps a single source of truth (specific muscles); broad group always derivable.
2. **`secondaryMuscles` shape = `{ muscle: Muscle; role }[]`** (structured, not parallel arrays). Why: easier to filter/map, no index-pairing risk.
3. **`primaryMuscles: Muscle[]`** to support co-primaries per D3.
4. **Six separate decision rows #24–#29** (not one combined). Why: each is independently revisitable.
5. **Deferred items assigned F31–F39.**
6. **No Dexie multi-entry index on primaryMuscles.** Why: JS filter <1ms at 29 rows; not worth the index complexity.

**Issue Tracker:** CE1 → Resolved. Added F31 Injury-Warning, F32 feature toggle menu, F33 jointLoad UI, F34 RPE-derived stats, F35 library expansion, F36 cues/instructions, F37 training-age modifier, F38 cardio tracking, F39 Group 2 dimensions.

---

## Session 40 (2026-04-22) — CE1 PLANNING CLOSED

**Scope:** Resumed from S39 pickup; carried planning to full completion.

**Decisions locked (across many sub-forks):**
- **D4 LOCKED at B-lite** — role tag synergist/stabilizer on secondaries; both 0.5× in MVP math; future calibration without re-curation.
- **D5 (recovery windows):** 9 large (60h), 15 small (36h), 2 background-small (36h). Adductors moved from large to small per user. Galpin training-age modifier deferred entirely.
- **D-new-3 (RPE per set):** `logSets.rpe` (1–10 with half-points, nullable, optional), `users.rpeEnabled` toggle (default false), per-set entry UI gated on toggle. ALL RPE-derived stats deferred.
- **D6 across 4 sub-forks:** D6.1 multi-select Step 1 + sectioned Step 2; D6.2 two-tap chip cycle; D6.3 long-press to promote (later replaced S51); D6.4 seed-only background muscles. User pushed back with alternative 3-field dropdown at D6.2 — reviewed honestly, defended Option A; user agreed.
- **D7 across 4 sub-forks:** 6 broad chips, single-select, primary + secondaries with role color, name + muscle-tag search.
- **D8 across 5 sub-forks:** D8.1 nuke and reseed (B2 — drop exercises + logExercises + logSets); D8.3 silent migration; D8.4 single Dexie v3 bump bundles all changes; D8.5 add S2 (jointLoad) + S3 (trainingAge) as forward-compat fields.
- **D9 across 5 sub-forks:** camelCase IDs, Title Case labels, single MUSCLE_LABELS map, TS string union.
- **D15.1 LOCKED at Option C** (equipment as forward-compat nullable field). D15.2–D15.5 deferred.

**Path A LOCKED:** simplified scope. Tier 1 (D1-D9 + D-new-3) + Tier 3 forward-compat schema fields. Tier 2 (D10–D17 full UX work + library expansion + cues/instructions) deferred.

**User pushback noted:** (1) wanted stabilizers tracked after originally agreeing to skip → D4 reopened; (2) flagged scope was too big → Path A simplified scope chosen.

---

## Session 39 (2026-04-22) — PAUSED MID-PLANNING

**Scope:** CE1 deep dive expanded far beyond original 4 sub-questions into full muscle taxonomy + exercise dimensions + injury-warning system planning. Coach review panel set up: Poliquin / Galpin / Rambod / Tuchscherer (Israetel/Cressey/Thibaudeau dropped).

**Decisions locked:**
- **D1:** 24 user-surfaced + 2 background = 26 muscles. Expanded from 17. Additions: lower traps (split from "traps"), brachialis, hip flexors, serratus, adductors, abductors, tibialis, neck (background), rotator cuff (background). Renamed: "traps" → "upper traps". Rambod's call for further splits explicitly **rejected** (bias dimension handles those).
- **D2:** 6 broad groups derived from specific muscle (storage = specific only).
- **D3:** Primary 1.0× / secondary 0.5×. Co-primaries when EMG supports. No data cap. UI displays ALL secondaries in declared order.
- **D4 reopened:** stabilizers tracked. 14 stabilizer muscles confirmed. Architecture options A/B/C/B-lite presented; user leaning B or C.
- **D5 paused mid-discussion.**

**Modern training metrics validated:** hard sets per muscle/week (Schoenfeld), RPE/RIR (RP/Tuchscherer), e1RM tracking (Brzycki/Epley), MEV/MAV/MRV bands (Israetel), EWMA over ACWR (Wang 2020 critique on math), per-joint load tracking.

**New decisions surfaced:** D-new (feature toggle menu — deferred next dev cycle), D-new-2 (joint load tags), D-new-3 (RPE per set — accepted), D-new-4 (rest tracking — toggle menu), D-new-5 (lengthened bias / RoM — toggle menu), F-new (Injury-Warning system, F31).

---

## Session 38 (2026-04-21) — Housekeeping

Sessions 31–37 landed in 3 logical commits on main: `69ab01c` (U4/U5 guards + D5 ErrorContext), `3f48f05` (service test audit + U4/U5 RTL tests), `e0e8917` (Statistics spec revision). Pre-commit verification: build clean + 72/72 tests passing.

---

## Session 37 (2026-04-21) — Statistics research

**Decisions locked:**
- F26–F28 logged: Workout Stats Card (most skipped, volume by muscle group, balance).
- **Time filters:** 30 / 90 / 365 / all time (7-day dropped).
- **Volume tracking without RPE:** tonnage (weight × reps) + set count per muscle group per week.
- F28 display approach TBD (raw % split vs push/pull/legs ratio vs imbalance flag).

---

## Session 36 (2026-04-21) — S4 resolution

**Decision:** **Weekly adherence metric DROPPED.** Why: no honest denominator without active program tracking. Replaced by Program Intelligence feature set: F20 (favorite exercises), F21 (program usage), F22 (current split detection), F23 (program efficacy), F24 (neglected categories), F25 (de facto program inference). All derivable from existing schema; no new tables. "Stint" renamed to "current split."

---

## Session 35 (2026-04-21) — Statistics decisions

- P5 / S4 / OD6 deferred — decide inline at their respective build steps.
- **Body fat %:** manual entry + Navy formula "Estimate for me" button.
- **Neck circumference (`neckIn`):** stored in `bodyMetrics` table alongside waist/hip.
- **Body metrics pre-fill:** form pre-populates from most recent saved entry; user updates only changed fields.

---

## Session 34 (2026-04-21) — D5 complete

ErrorContext wired into ProgramDetailPage + WorkoutTemplatePage + WorkoutDetailPage. WorkoutDetailPage.test.tsx mocked ErrorContext (useError must be inside ErrorProvider — test render wrappers don't include it).

---

## Session 33 (2026-04-21) — Statistics spec revision + D5 partial

**Statistics spec — removed:** HRV (wearable-only), hunger rating (nutrition app feature), arm/thigh circumference (low fill rate), protein/step/sleep targets from Goals card (targets without tracking loops).

**Added:** post-workout feel rating (`workoutLogs.rating` nullable 1–3, at finish flow); PR celebration at set-save (`StatisticsService.checkForPR`, non-blocking) + finish summary; Logs tab consistency indicator.

**Schema trimmed:** users → goalWeight only; dailyCheckins → sleepHours + steps; bodyMetrics → weight/bodyFatPct/waistIn/hipIn; workoutLogs.rating added.

**Decisions:** S1 closed; device integration (Capacitor) deferred as architectural session.

---

## Session 32 (2026-04-21) — Service layer test audit

5 new test files + 3 guard tests added to WorkoutLogService.test.ts. 72/72 passing across 8 files.

**Test patterns:**
- Nested `beforeEach` inside guard describe blocks seeds a shared record (weId/setId) to avoid repeating seeding in every guard test.
- `localStorage.clear()` required in AuthService beforeEach to prevent session bleed between tests.

---

## Session 31 (2026-04-21) — U4 + U5 UI guards

**Built:** new hook `useScrollToError` (IntersectionObserver-based; returns `arrowDir: 'up' | 'down' | null`). U4: Finish blocked with 0 exercises → red outline on Add Exercise + bounce arrow in footer. U5: Save Edits blocked for blank name (inline error) or 0 exercises (same arrow pattern).

**RTL test pattern:** IntersectionObserver stubbed as a class in beforeEach (arrow functions can't be constructors in jsdom); `vi.clearAllMocks()` required to reset call counts between tests.

---

## Session 30 (2026-04-21) — Service guards + artifact cleanup

**Built:** service layer guards added to 7 services (LogSetService.update NaN/negative/decimal, WorkoutExerciseService.update positive bounds, WorkoutLogService.create/finish, AuthService.signup, ProgramService.create, WorkoutService.create). All throw user-facing Error messages.

**Decisions:** duplicate exercises allowed; U4 block finish with 0 exercises (UI-level); U5 block Save Edits on validation failure.

**Artifact cleanup:** S1 F13 schema claim corrected; A1 page title 20px/600 → 24px/700; A2 FAB states split (disabled/inert vs hidden); A3 Phase 4 status update; A4 repo visibility; A5 project_state.md memory rewritten; M1 B1 row normalized; B3 closed.

---

## Session 29 (2026-04-21) — D8 test infrastructure

Vitest 4.1.5 + RTL 16 + @testing-library/jest-dom + fake-indexeddb + jsdom installed. DB isolation via `db.delete() + db.open()` in beforeEach. 17/17 pass (units.test.ts + WorkoutLogService.test.ts).

---

## Session 28 (2026-04-20) — CLAUDE.md overhaul

- Added Session Start — Opening Message Protocol (research vs. build mode distinction).
- Removed Model Selection Guide (preserved "always ask before recommending Opus" as Working Style bullet).
- Removed "Always ask before making edits" (replaced by new protocol).
- Strengthened "Surface confusion" to unconditional.
- Deleted Post-Demo Cleanup section; deleted build step reading table.
- recap.txt → recap.md, UIdesign.txt → UIdesign.md, coreprocess.txt → coreprocess.md (git mv); active references updated across 9 files.

---

## Session 27 (2026-04-19) — Future feature planning

Logged F13 (daily protein tracker), F14 (`proteinResetHour` on users), F15 (lock screen widget — native only), F16 (bio-metric equation engine — brainstorm needed), F17 (body fat predictor — US Navy method candidate), F18 (sleep analysis), F19 (step quality — needs native integration). Phase 4 task list compiled: D8 → D5 → Statistics build.

---

## Session 26 (2026-04-18) — Statistics tab spec expansion

Full body recomposition tracking system scoped (Tier 1 + Tier 2; Tier 3 out of scope). New tables: `bodyMetrics` + `dailyCheckins`. New users fields: goalWeight, proteinTarget, stepTarget, sleepTarget. New services: BodyMetricsService, DailyCheckinService, StatisticsService (7 methods). Open issues S1–S4 added. **S2 (Goals card field location):** deferred — re-evaluate after Statistics is built.

---

## Session 25 (2026-04-17) — Demo + repo public

Demo complete. Deleted demo-seed.js, PRESENTATION_AID.md, PRESENTATION_AID.html. Created README.md. Added "Portfolio Legibility" principle to UIdesign.md and handoff.md (now in this file's tail section).

---

## Session 24 (2026-04-16) — Karpathy guardrails

Three additive guardrails added to CLAUDE.md (no existing rules changed):
- Working Style: "Surface confusion" + "Surgical changes only".
- Session discipline: "Simplicity check" before finishing a file.
- Pre-completion checklist: bug fix reproducing test requirement.

---

## Session 23 (2026-04-15) — B2 fix + tooling

**Bug fix B2:** spinner arrows on weight/reps inputs now save. `handleWeightBlur`/`handleRepsBlur` replaced with shared `saveSet()` helper; `onChange` fires on `inputType: 'insertReplacementText'` (spinner only); `onBlur` fires for keyboard input. **Blue bubble fix:** `min="0"`/`min="1"` removed (validation handled by `saveSet`). **0 reps now valid** (represents missed attempt).

**CLAUDE.md:** Tech Stack / Working Style / Document Editing sections added. TypeScript hook operational rule added; `.claude/settings.json` created (postToolUse runs tsc --noEmit on Edit/Write).

F12 logged: log history date context + calendar view (post-MVP).

---

## Session 21 (2026-04-14) — F11 FAB inert mode

FAB no longer hidden on `/logs/:id` active workout page. `return null` → disabled/inert button render (opacity 0.35, pointer-events none, no onClick). Why: keeps nav center slot filled; future hook for intra-workout tool hub.

---

## Session 20 (2026-04-14) — Bug fix

ExerciseSearchModal category filter chips were hidden behind exercise list on smaller viewports. Added `flex-shrink: 0` to `.chips`.

---

## Session 18 (2026-04-10) — F7 resolved + UI polish

Target weight display "@ x lbs" → "| top set: x lbs" (F7 resolved). WorkoutTemplatePage doneBtn + deleteBtn flex: 1 fix. F8/F9/F10 logged. OD6 (CSS button token standards) added to UIdesign.md.

---

## Session 17 (2026-04-10) — FAB inline rebuild

FAB moved from `position: fixed` floating element into BottomNav center flex slot — eliminates overlap on all pages. WorkoutFAB always renders (no null after auth checks); non-/logs tap navigates to /logs. Committed `abdc304`.

---

## Session 16 (2026-04-10) — Pre-demo code review

All critical flows verified clean: auth, quick-start, from-program start, finish flows (all 4 state machine paths + skip + from-program sync), read-only/edit modes, B1 edge case, Programs CRUD with cascades. **False positive documented:** ExerciseSearchModal modal closure after custom exercise creation works correctly via parent's `onSelect` handler — do not re-flag.

---

## Session 15 (2026-04-10) — UI polish

ProfilePage unit labels in label text ("Height (in)" / "Weight (lb)"); all 4 tab page titles standardized to 24px/700; `autocapitalize="words"` added to all name inputs across app.

---

## Session 14 (2026-04-10) — UI polish pass

Trash icons replace text Remove/Delete buttons throughout; set-delete changed to red X. WorkoutTemplatePage button layout redesigned. FAB centered. Page titles centered. Empty states updated. **Bug fixes:** from-program exercises now copy correctly on workout start; Save Edits reloads from Dexie; seed deduplication for React Strict Mode.

---

## Session 13 (2026-04-09) — Step 6 build

UserService, ProfilePage (auto-save name/height/weight, unit toggle, logout), StatisticsPage placeholder.

---

## Sessions 8–12 (2026-04-09) — Build steps 4–5c

Steps 4 (Programs tab), 5a (Logs list + active workout), 5b (finish flows: quick-start 4-step state machine, from-program sync modal), 5c (read-only + edit modes; Delete Workout flow) built across 4 sessions in a single day.

---

## Sessions 1–7 (2026-04-02 to 2026-04-09) — Planning + foundations

- **Sessions 1–3:** project scoped, tech stack selected, DB schema v2 designed, 23 decisions locked, user flows complete.
- **Sessions 4–6:** CLAUDE.md created, GitHub repo set up, UIdesign.md expanded, pre-build gap audit (D1–D8), Issue Tracker established.
- **Sessions 7–8:** pre-build decisions locked (D4/D7/N3/N4 — see master-schematics.md § Key Design Decisions). Steps 1–3 built (scaffold, auth, shared components).

---

## Project Info
- GitHub repo: https://github.com/kazi91/workout-tracker-v2 (public)
- CLAUDE.md active at project root
- Schema: v3 live (parentExerciseId + Muscle taxonomy + RPE + Tier 3 forward-compat)

---

## Active items (do not close without discussion)
- **R3:** Plain-text password — replace when backend is added.
- **P5:** Charting library — decide before Statistics build (Recharts recommended).
- **S2:** Goals card field location — re-evaluate after Statistics is built.
- **S3:** Wearable API integration — post-MVP; manual entry only.
- **F1–F6, F8 (resolved by F42), F9–F10:** future features — see Issue Tracker.
- **F31–F42:** see Issue Tracker.
- **OD6:** CSS button token standards — brainstorm session pending before enforcing.
- **CP1–CP3:** cleanup items from S39/S52/S53 — exercise-bank.md drift audit, mid-trap clarification, Coach Review Panel deletion.

---

## Resolved (record only — do not reopen)
- F7 (Target weight display) — S18.
- F8 (bodyweight tracking patch) — superseded by F42 (S53).
- All planning items P1–P4, P6–P9 — Phase 2.
- All gaps G1–G3, G5–G7 — Phase 3.
- All pre-build gaps D1–D4, D6–D7 — pre/during build.
- B1 (Dangling workoutId on program delete) — S11.
- D5 (ErrorContext) — S34.
- D8 (test infrastructure) — S29.
- Phase 4 (Testing & cleanup) — closed 2026-04-22.
- CE1 (custom exercise spec) — Decisions #24–#29 + Tier 3 schema fields.
- S1, S4 — closed in stats spec revision (S33/S36).

Do not re-open planning decisions unless the user explicitly raises them.

---

## Portfolio Legibility Standard (locked)
- Distinctive, descriptive file/folder names — no generic names (utils.js, helpers.ts, App.js).
- Folder organization must communicate purpose at a glance.
- Comments explain non-obvious decisions (why, not what).
- Rationale: repo is public; recruiters read source code.

---

## What Is Fully Locked
> Moved to artifacts/decisions-locked.md

## Rejected Options — Do Not Re-Propose
> Moved to artifacts/decisions-locked.md

---

## UI Standards Summary (UIdesign.md — session 4)
These are locked. Do not redesign around them.

- Nature theme: color evokes natural world — felt, not illustrated (no leaf icons etc.).
- Colors: Green=action, Gold=achievement, Red=danger, White=content — strict, no mixing.
- Surface tints: #1A1A17 / #242420 / #2E2E29 (warm undertone locked).
- Text tiers: #FFFFFF primary / #C0C0C0 label / #8A8A8A secondary / #4A4A4A disabled.
- Nav: 14px labels, 2px accent line above active tab.
- Alignment: page titles + focal-point content centered; multi-element lists/rows left-aligned.
- Buttons: 44px min height, flat, no gradients, title case, 15px/600 — see UIdesign.md § 8.
- Light mode: palette locked for post-MVP, values in UIdesign.md § 4c.

---

## Keeping This File Current
Update `handoff.md` and `recap.md` whenever a decision is made, locked, reversed, or a new gap is found — without waiting to be asked.
