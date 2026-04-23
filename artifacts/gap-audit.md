# Gap Audit — Workout Tracker v2

**Date opened:** 2026-04-23
**Date completed:** 2026-04-23
**Status:** COMPLETE — 51 gaps logged across 6 phases; Pre-45a batch (2/51) FIXED; remaining 49 awaiting fix sessions
**Triggered by:** Comprehensive audit requested ahead of Session 45a seed re-curation
**Disposition:** Delete this file once all findings closed (merge any durable items into master-schematics.md Issue Tracker first)

---

## Context

Spec churn has been heavy across sessions 41–44:
- Session 41 — CE1 spec patch 1/3 (master-schematics.md): muscle taxonomy, RPE, picker rewrite, Decisions #24–#29
- Session 42 — CE1 spec patch 2/3 (tab artifacts): RPE surface on SetRow, Profile toggle, statistics.md category scrub, programs.md cross-ref
- Session 43 — exercise-bank.md reconciliation + exercise guide template v2 + inline→files split (5 guides migrated)
- Session 44 — CE2 architecture locked, full 213-entry library in CE1 scope, EB5 integrated into master-schematics, 3 more guides authored, `seed-tagging-principles.md` drafted

Drift surface is large. Before Session 45a begins 11-parent seed re-curation — and before Session 47+ coordinated CE1/CE2 build — audit all artifacts + memory for gaps.

---

## Scope

- **22 artifact files** in `artifacts/` (~5,900 lines)
- **CLAUDE.md** (232 lines)
- **18 memory files** in `.claude/projects/d--software-eng-workout-tracker-v2/memory/`

Total: ~41 files.

---

## Gap classes in scope

1. **Cross-artifact contradiction** — two files disagree on the same fact
2. **Stale terminology** — old vocab lingering post-rename (e.g., `category`, "stint", 17-muscle taxonomy)
3. **Broken cross-refs** — wrong F-code, D-code, file path, or `.txt` reference
4. **Placeholder debt** — TBD/placeholder labels that should be real, or vice versa
5. **Decision close-out drift** — decisions locked in a session but still listed "open"
6. **Memory ↔ artifact drift** — memory claims stale against current artifacts

---

## Severity taxonomy

- 🔴 **Blocker** — misleads Session 45a curation or Session 47+ build
- 🟠 **Must-fix pre-build** — wrong but doesn't block curation; fix before next session touching that artifact
- 🟡 **Nice-to-have** — minor drift, clarity only
- ⚪ **Cosmetic** — typos, formatting

---

## Methodology — Option C (hybrid, layered by authority)

Foundation (source of truth) → derived specs → ancillary. Catches cross-artifact contradictions while respecting doc hierarchy. Each phase reads the authoritative file first, then checks downstream files against it.

---

## Phases

| # | Phase | Scope | Files | Est | Status |
|---|---|---|---|---|---|
| 0 | Scope confirm | Lock methodology, severity, output | — | 5 min | Done |
| 1 | Foundation audit | Ground-truth state | CLAUDE.md, recap.md, handoff.md, master-schematics.md | ~40 min | Done (16 gaps) |
| 2 | Tab spec audit | Cross-check vs master-schematics | logs / programs / statistics / profile / login / workouts | ~40 min | Done (8 gaps) |
| 3 | Exercise library audit | Internal + against schematics | exercise-bank + seed-tagging-principles + exercises/ (spot) + _template | ~30 min | Done (11 gaps) |
| 4 | UIdesign + process | OD series close-out + cross-refs | UIdesign.md + coreprocess.md | ~20 min | Done (4 gaps) |
| 5 | Memory audit | Drift vs current state | 18 memory files + MEMORY.md | ~20 min | Done (10 gaps + 2 addendum) |
| 6 | Synthesis | Rank, cluster, propose fix order | — | ~15 min | Done |

**Total est. ~3 hours.** Suggest running Phases 1–3 in one session, 4–6 in another.

---

## Findings log

Format: `GA-<nn> | <severity> | <area> | <finding> | <proposed fix>`

Populated inline during each phase. Each item gets a unique GA-nn id so it can be cross-referenced in commits and session notes.

### Phase 1 — Foundation

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-01 | 🔴 | master-schematics.md DB Schema | `parentExerciseId` missing from `exercises` table, from v3 delta additive-fields list, and from Dexie schema string index list — despite Session 44 handoff saying EB5 was integrated and `project_ce2_schema_architecture.md` Decision #1 locking a secondary index on it. Build session will silently miss the field. | Add `parentExerciseId: number \| null` to exercises table. Add to v3 delta additive list. Add `parentExerciseId` as secondary index in Dexie schema string. |
| GA-02 | 🔴 | master-schematics.md Service Layer | `ExerciseService.create()` row (line 363) lists primaryMuscles/secondaryMuscles + Tier 3 forward-compat fields but omits `parentExerciseId` — handoff explicitly says signature was updated for EB5. | Add `parentExerciseId` to the create() description. Confirm ExerciseSearchModal Spec usage (line 440) matches. |
| GA-03 | 🟠 | master-schematics.md Changelog | Last entry is Session 41 (2026-04-22). Sessions 42 (tab artifacts + Decision #26 patch), 43 (exercise-bank 29→213, EB decisions, guide template v2, 5 guides migrated), 44 (CE2 architecture, CE1 scope rewrite, EB5 integration, 3 new guides, seed-tagging-principles doc) all missing. | Add 3 consolidated changelog entries (one per session). |
| GA-04 | 🟠 | master-schematics.md Exercise Library | Line 393 says "29 pre-seeded exercises — re-curated for CE1". CE1 scope is now 213 per `project_ce1_final_scope.md` (rewritten Session 44). | Update to reflect 213-entry library curated across 6 priority tiers. |
| GA-05 | 🟠 | master-schematics.md stale audit flags | Line 455 `⚠ AUDIT C8: Seed trigger mechanism unspecced` — C8 resolved, seed mechanism described on same line. Line 511 `> **AUDIT M8:** AuthContext loading state unspecced` — auth built Step 2 (Phase 3). | Remove both audit flags or convert to short resolved notes. |
| GA-06 | 🟡 | master-schematics.md Service Layer | Duplicate `WorkoutLogService` row at line 373 (just adds updateRating) separate from primary row at line 367. | Fold updateRating into the primary WorkoutLogService row. |
| GA-07 | 🟡 | master-schematics.md Dexie notes | Lines 311–314 justify no compound indexes / no multi-entry on `primaryMuscles` citing "29-row library" / "<1ms at 29 rows". Library is now 213 (past the re-evaluate threshold of "~200"). | Re-evaluate index call; at minimum update the scale reference to 213 and restate the performance claim or revise. |
| GA-08 | 🟡 | recap.md + handoff.md file descriptions | Both describe `profile.md` as "placeholder — no flow for MVP". Session 42 patched profile.md with RPE toggle + Services Used + Context Used rows — no longer purely placeholder. recap.md lines 67, 173; handoff.md line 211. | Update descriptions: "Profile tab spec — RPE toggle (session 42); body metrics/goals sections still placeholder." |
| GA-09 | 🟡 | master-schematics.md Project Status | Line 23 Phase 5 row says "CE1 spec patches active (sessions 41–43)" — session 44 also did spec work (CE2 architecture, EB5 integration, seed-tagging-principles). | Update to sessions 41–44. |
| GA-10 | 🟡 | master-schematics.md Project Status | Line 20 Blueprint row: "all decisions locked (#1–23)". Decisions #24–29 now exist (CE1 patches). | Note Phase 2 locked #1–23, with #24–29 added during Phase 5 CE1 spec patches. |
| GA-11 | 🟡 | handoff.md file index | Line 211 describes `statistics.md` only by "revised session 33" — session 42 also patched it (Section 7 CE1 upgrade + 4 category residuals scrubbed). | Update description to include session 42 CE1 patch. |
| GA-12 | 🟡 | handoff.md file index (line 206–212) | Missing: `exercise-bank.md` (562 lines, major artifact), `seed-tagging-principles.md` (session 44), `coreprocess.md`, `exercises/` folder (8 authored guides + template). Listed files are 7 — stale vs current 22-file artifact surface. | Add missing entries. |
| GA-13 | 🟡 | master-schematics.md Dexie schema header | Line 284 header says "v3 lock Session 41" but the code block beneath shows the v2 schema string. v3 is only described as prose delta below. Header label is misleading. | Either add a v3 code block alongside, or adjust header to say "v2 schema (v3 delta described below)". |
| GA-14 | ⚪ | handoff.md Active Items | Lines 252–259 include items already DONE (D8, Post-demo cleanup, Statistics spec) under "Active items (do not close without discussion)". Structure drift. | Move DONE items out of Active Items, or keep a short resolved-items section. |
| GA-15 | ⚪ | recap.md section label | Line 73 "REMAINING BEFORE BUILD — Planning complete. Pre-build audit complete." is stale; we're deep into Phase 5. | Rename/rescope section or archive it below a "Historical" header. |
| GA-16 | ⚪ | recap.md D8 pre-build row | Line 84 says "DEFERRED for demo: no tests; Vitest + RTL added post-demo" — contradicts itself inside one row. | Reword to RESOLVED (session 29) with one-line rationale. |

**Phase 1 summary:** 2 blockers (both parentExerciseId schema coverage), 3 must-fix, 8 nice-to-have, 3 cosmetic. Both blockers cluster in master-schematics.md § DB Schema + Service Layer — single patch session would close them.

### Phase 2 — Tab specs

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-17 | 🟠 | logs.md:227 | Uses stale service method name `LogExerciseService.getByWorkoutId(id)`. Master-schematics uses `getByWorkoutLogId` (renamed session 30 per recap A1). | Rename to `LogExerciseService.getByWorkoutLogId(id)`. |
| GA-18 | 🟠 | statistics.md:376 | Section 7e service list uses `getNeglectedCategories(userId, thresholdDays)` — renamed to `getNeglectedGroups` per Decision #24 / master-schematics F24 (line 632). | Rename to `getNeglectedGroups`. |
| GA-19 | 🟠 | statistics.md:146 | Section 4a Overview Dashboard table still lists "Weekly adherence rate" as a metric row — S4 resolved this as removed. Build Order step 10 acknowledges removal but table wasn't cleaned up. | Remove adherence row from the Overview Dashboard table. |
| GA-20 | 🟠 | statistics.md:269 + master-schematics.md:372 | `StatisticsService.getAdherenceRate(userId, weeks)` still listed in both service tables — S4 removed the feature. Orphaned method. | Remove `getAdherenceRate` from both. (Cross-file — fix in both spots.) |
| GA-21 | 🟡 | statistics.md:5 | "Last updated: 2026-04-21" — session 42 patched it (2026-04-22 — Section 7 CE1 upgrade callout + 4 category residuals scrubbed). Stamp stale. | Bump to 2026-04-22 (session 42); summarize the patch in header. |
| GA-22 | 🟡 | statistics.md:398 | Build Order step 2 prescribes schema migration (`bodyMetrics`, `dailyCheckins`, `users.goalWeight`, `workoutLogs.rating`) — but master-schematics v3 delta (line 308) bundles all of these into CE1 migration. By the time Statistics build begins, schema is already migrated. | Update step 2: "These bundle into CE1's v3 bump — no separate migration at Statistics build time." |
| GA-23 | 🟡 | login.md:3 | Status banner says "Stub — spec deferred from pre-build audit (C4). Resolve before build step 2 (Auth)." — auth was built in Phase 3 Step 2 (session 8). Decisions inside (line 14) are resolved. | Update banner to "Resolved — decisions locked session 6; auth built Phase 3 (session 8)." |
| GA-24 | ⚪ | statistics.md:5 | Header "Last updated" sentence frames spec only by session 33 ("post-research session: removed fluff..."). Session 42 also touched it. History-agnostic phrasing. | Tack on a second-sentence session-42 note. |

**Phase 2 summary:** 4 must-fix, 3 nice-to-have, 1 cosmetic. Cluster: stale service names (GA-17, GA-18, GA-20) and orphaned `adherence` refs (GA-19, GA-20) — tight cleanup, should all fall in one pass.

**Cross-artifact callouts (Phase 2 surfaced these but they touch multiple files):**
- GA-20 is also a master-schematics gap — logged here, will be deduplicated in Phase 6 synthesis.

### Phase 3 — Exercise library

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-25 | 🟡 | exercise-bank.md:5 | "Last updated: 2026-04-22 (session 40)" — file's own revision log shows sessions 40, 43, 44, plus 2 session-44 follow-ups all touched it. | Bump stamp to 2026-04-23 (session 44 2nd follow-up). |
| GA-26 | 🟡 | exercise-bank.md:19 | "Out of scope: Primary/secondary muscle maps → CE1 (D1/D2/D3 locked, **D4/D5 pending**)" — D4 (B-lite) + D5 (recovery windows) both locked session 40. | Update to "D1–D5 locked; muscle maps owned by `seed-draft.md` + `seed-tagging-principles.md`." |
| GA-27 | 🟡 | exercise-bank.md:62 | Seed table uses "Category" column; P0–P5 tables use "Muscle / Pattern". Internal inconsistency; "Category" is also the name of the dropped schema field (CE1 / Decision #28) — risks reader confusion. | Rename Seed column "Category" → "Muscle / Pattern" to match the rest. |
| GA-28 | 🟡 | exercise-bank.md:105, 206, 212 | `*Glutes = new category*`, `*Forearms = new category*`, `*Carries = new category*` — legacy "category" framing post-CE1. | Reword: "new broad group coverage" or "new movement pattern" as appropriate. |
| GA-29 | 🟡 | exercise-bank.md:316 | "Nested under a parent exercise via `parentExerciseId` (pending schema)." — Schema is locked (CE2 architecture doc + integrated into master-schematics ExerciseSearchModal Spec session 44). | Remove "(pending schema)"; add "locked — CE2, bundled into CE1's v3 bump". |
| GA-30 | 🟡 | exercise-bank.md:380 | Says "Two phases: curation ... then build" but then lists **three** phases (Phase 1 Curation / Phase 2 Coordination / Phase 3 Build). | Update to "Three phases" and match table. |
| GA-31 ✅ | 🟠 | seed-tagging-principles.md:9 | Cross-link `[memory/project_ce1_final_scope.md](../../../.claude/projects/d--software-eng-workout-tracker-v2/memory/project_ce1_final_scope.md)` is broken — relative path crosses drives (`D:` repo vs `C:` memory dir) and depth is wrong. Memory lives outside the repo by design. | **FIXED 2026-04-23** — stripped markdown link syntax; left plain reference with note pointing to CLAUDE.md § "auto memory" for the actual path. |
| GA-32 ✅ | 🟠 | seed-tagging-principles.md Rule 1 vs Vertical pull template | Rule 1 line 46 lists Pull-Up as `lats, upperBack` **co-primary example**. Vertical pull template line 132 says Pull-Up is **single-primary `lats`** with `upperBack` as synergist secondary. Directly relevant to Session 45a (parents go first — Pull-Up is one of the 11 parents). Ambiguous guidance means the lock will depend on order of reading. | **FIXED 2026-04-23** — template default kept as `lats` (applies to Lat Pulldown et al.), but Pull-Up explicitly called out as a Rule-1 override: co-primary `lats + upperBack`, with instruction to demote `upperBack` out of secondaries when promoted. Chin-Up / Narrow-Grip Pull-Up override restructured as a sibling bullet for parity. |
| GA-33 | 🟡 | seed-tagging-principles.md:139 | Squat pattern template lists 6 secondaries (`glutes, adductors, hamstrings, lowerBack, abs, obliques`) — Rule 2 (line 58) says ">5 = over-tagging signal". Template violates its own rule. | Either trim squat secondaries (e.g. drop `obliques` or move to "tag when asymmetric loading"), or adjust Rule 2 threshold with a note that knee-dominant compounds can legitimately hit 6. |
| GA-34 | 🟡 | exercises/_template.md:4 | Status says "per coaches panel review, session ~41" — template was actually built Session 43 follow-up (per handoff Session 43 entry). | Update to "session 43 follow-up". |
| GA-35 | 🟡 | exercise-bank.md:438–477 | Tutorial content stub sections (Incline DB / Deadlift / Paused / Smith / Pull-Ups) still use legacy "Catalog entry: [prose]" format. Actual guides now use "Catalog: [ref] · Template: v2" (session 44 2nd follow-up Tier 1 strip). Stubs are inconsistent. | Either strip stubs to match (one-liner) or remove them per the note at line 435 — acceptable to defer to native guide-link support. |

**Phase 3 summary:** 2 must-fix (GA-31 broken link; GA-32 Pull-Up taxonomy clarity — direct Session 45a blocker risk), 9 nice-to-have. GA-32 is the most important for the immediate next session — resolving it before 45a prevents a coin-flip decision on the first parent locked.

### Phase 4 — UIdesign + process

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-36 | 🟡 | UIdesign.md:3 | "Last updated: 2026-04-05" — doc has been edited across sessions 11, 25, 30 at minimum (green accent OD1 lock, Portfolio Legibility add, page title 24px fix, FAB states split). Timestamp stale by ~18 days. | Bump to 2026-04-21 (session 30 — most recent touch). |
| GA-37 | 🟡 | coreprocess.md:13–19 | Document hierarchy list omits `exercise-bank.md`, `seed-tagging-principles.md`, `exercises/_template.md` (+ 8 per-exercise guides). These are now material artifacts. | Add the exercise library cluster to the hierarchy; collapse under a single "exercise library" entry if needed. |
| GA-38 | 🟠 | coreprocess.md:21 vs recap.md:5 | **Conflicting authority model.** coreprocess.md says "If two docs conflict, the higher-numbered doc yields to the lower-numbered one" (hierarchy has CLAUDE.md #2, recap.md #3 — so CLAUDE.md wins). recap.md line 5 says "if they diverge, recap.md wins" (for CURRENT TASK). Next Claude instance will hit this ambiguity on any divergence. | Add an explicit exception line in coreprocess.md: "CURRENT TASK block — recap.md authoritative over CLAUDE.md (session state is edited inline in recap and mirrored to CLAUDE.md)." |
| GA-39 | 🟡 | coreprocess.md:103 | "Operational session rules (reading order, token management, build discipline, **model selection**) live in CLAUDE.md" — model selection section was removed from CLAUDE.md in session 28 per handoff. | Remove "model selection" from the list; replace with existing rule ("ask before recommending Opus") or just drop. |

**Phase 4 summary:** 1 must-fix (GA-38 authority conflict), 3 nice-to-have. UIdesign.md is in good structural shape — content tracks decisions cleanly, only the date header is stale. coreprocess.md has small but real drift.

**Addendum (surfaced during Phase 5 memory audit — project_artifact_fixes.md named these as pending but session 30 only fixed some of them):**

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-40 | 🟡 | UIdesign.md:492 | FAB size says "56px circle" — actual implementation is 52px (session 17 per handoff `WorkoutFAB.module.css: inline 52px circle`). | Update to "52px circle". |
| GA-41 | 🟡 | UIdesign.md:495 | FAB Position says "bottom-right, 16px from edge, above nav bar" — actual is "inline center slot within BottomNav" (session 17 refactor: `BottomNav refactored LEFT_TABS + fabSlot + RIGHT_TABS`). Only the States line was updated in session 30. | Update Position to "inline center slot within BottomNav" and drop "Shadow" (FAB no longer floats) or re-verify shadow still applies. |

### Phase 5 — Memory

| ID | Sev | Area | Finding | Proposed fix |
|---|---|---|---|---|
| GA-42 | 🔴 | project_state.md | Severely stale. Claims "Phase 4 — Testing & post-demo cleanup (in progress as of session 29, 2026-04-21)" with "17 tests passing" and "Next action: Service layer test audit." **Actual state:** Phase 4 CLOSED session 34; 72 tests passing across 8 files; Phase 5 active with CE1 spec patches complete (sessions 41–44); Session 45a (seed re-curation) is next. Any future Claude instance reading this as project context will work from a ~15-session-old snapshot. | Rewrite body to current state: Phase 5 active; 72 tests; Session 45a seed re-curation pending; CE1+CE2 coordinated build after curation. |
| GA-43 | 🔴 | MEMORY.md (index) | Entry for project_state.md says "blueprint complete, no code written, next step is build; open design questions OD1–OD5 in UIdesign.txt" — wildly stale (contradicts the file it indexes AND still references `UIdesign.txt` which was renamed to `.md` session 28). | Rewrite index line to one-liner matching the updated project_state.md body. |
| GA-44 | 🟠 | project_ce2_schema_architecture.md:67 | Example v3 Dexie schema string shows `exercises: '++id, name, category, isCustom, parentExerciseId, [CE1 ...]'` — **retains `category`**, which CE1 Decision #28 drops in v3. Cross-memory contradiction with CE1 final scope + master-schematics v3 delta. | Update example to drop `category`: `exercises: '++id, name, isCustom, parentExerciseId, [CE1 muscle taxonomy fields]'`. |
| GA-45 | 🟠 | project_ce2_schema_architecture.md:204, 362 | Says custom-exercise form "currently spec'd in `artifacts/tabs/programs.md` or `profile.md`, TBD" — but session 44 located + integrated the form into `master-schematics.md` § ExerciseSearchModal Spec (confirmed in handoff session 44 2nd follow-up). | Update both mentions: form lives in master-schematics.md § ExerciseSearchModal Spec. |
| GA-46 | 🟠 | project_artifact_fixes.md | Stale TODO list from 2026-04-16. Session 30 partially actioned it: ✓ Fix 1 page title (done); ✓ Fix 1 FAB states (done); ✗ Fix 1 FAB size/position (still stale — see GA-40, GA-41); ✗ Fix 2 color-preview.html (unclear); ✗ Fix 3 CLAUDE.md Post-Demo Cleanup list (section was deleted session 28 — moot). File doesn't reflect any of this. | Either update the file to show what's done/moot and what's still open, or close it entirely (folding remaining gaps into master-schematics Issue Tracker). |
| GA-47 | 🟡 | project_ce1_final_scope.md:195–207 | "Next steps" block says "Session 44 — CE2 planning doc creation + integration (in progress)" and "Session 45 — Seed re-curation." Session 44 is CLOSED; Session 45a is queued. | Update next-steps to reflect Session 44 closed + Session 45a (Phase 1 curation, ~1.5h) queued. |
| GA-48 | 🟡 | project_ce1_final_scope.md:223 | References "5 migrated guides". Current total is 8 (5 original + squat + bench-press + overhead-press session 44 follow-up). | Bump count to 8 and list all guide slugs. |
| GA-49 | 🟡 | project_music_cheatsheet.md | Orphan file: not indexed in MEMORY.md; cross-project content (music cheatsheet at `d:\cheatsheets\music\music.html` — unrelated to workout tracker). System-reminder flag noted memory is 3 days old. | Either (a) move to the correct project's memory dir, (b) index in MEMORY.md if relevant, or (c) delete. Recommend (a). |
| GA-50 | 🟡 | project_cheatsheet_research.md Section 7 | Lists "All 23 locked decisions" — current count is 29 (Decisions #24–#29 added during CE1 Phase 5 spec patches). | Bump to 29 and add the CE1 decisions if cheatsheet still wants to cover them. |
| GA-51 | 🟡 | project_cheatsheet_research.md Section 14 | "Testing Strategy — Vitest + RTL planned (D8 deferred)" — D8 was completed session 29 (test infrastructure live). | Update to reflect D8 done + current coverage (72 tests, 8 files). |

**Phase 5 summary:** 2 blockers (GA-42 + GA-43 both about project_state.md drift — will hose any future instance's context), 3 must-fix, 5 nice-to-have. Memory system has accumulated real staleness since session 30.

**Supersession hygiene note:** `project_ce1_planning_state.md` is correctly tagged SUPERSEDED in MEMORY.md. File content dormant but accurate as a snapshot. Leave as-is unless consolidating.

### Phase 6 — Synthesis

**Totals: 51 gaps** (IDs GA-01 through GA-51).

**By severity:**
- 🔴 **Blocker: 4** — GA-01, GA-02, GA-42, GA-43
- 🟠 **Must-fix: 13** — GA-03, GA-04, GA-05, GA-17, GA-18, GA-19, GA-20, GA-31, GA-32, GA-38, GA-44, GA-45, GA-46
- 🟡 **Nice-to-have: 29**
- ⚪ **Cosmetic: 5**

**By phase:**
- Phase 1 Foundation: 16
- Phase 2 Tabs: 8
- Phase 3 Exercise library: 11
- Phase 4 UIdesign/process: 4 + 2 addendum
- Phase 5 Memory: 10

---

#### Clusters

**Cluster A — `parentExerciseId` schema coverage (Session 47+ build safety):** GA-01, GA-02, GA-44. Session 44 claimed EB5 was integrated but master-schematics DB Schema, v3 delta, Dexie schema string, and ExerciseService.create() all still miss the field. CE2 memory doc has a contradictory example.

**Cluster B — `project_state.md` drift (cross-conversation safety):** GA-42, GA-43. Memory claims Phase 4 in progress with 17 tests; reality is Phase 5 active with 72 tests and Session 45a queued. Any future Claude instance opening project_state.md gets a 15-session-old snapshot.

**Cluster C — S4 adherence residuals:** GA-19, GA-20. Feature was removed session 36; orphan service method + orphan table row survived in both statistics.md and master-schematics.md.

**Cluster D — Stale service method names:** GA-17 (`getByWorkoutId`→`getByWorkoutLogId`), GA-18 (`getNeglectedCategories`→`getNeglectedGroups`). Renames happened but didn't propagate to tab specs.

**Cluster E — Session 45a blockers:** GA-31 (broken memory link in principles doc), GA-32 (Pull-Up taxonomy contradiction Rule 1 vs template). Both hit the next session directly.

**Cluster F — Master-schematics changelog + status drift:** GA-03 (3-session changelog gap), GA-09 (41–43 vs 41–44), GA-10 (decisions #1–23 vs #1–29), GA-04 (29 vs 213 seed count).

**Cluster G — Stale audit markers:** GA-05 (C8 + M8 flags in master-schematics, both resolved long ago).

**Cluster H — Authority / hierarchy docs:** GA-38 (coreprocess.md vs recap.md authority conflict), GA-37 (coreprocess hierarchy missing exercise library), GA-39 (model selection reference).

**Cluster I — Exercise-bank.md terminology drift:** GA-25–GA-30 (timestamp, D4/D5 "pending", "Category" vs "Muscle/Pattern", "(pending schema)", "two phases"). Session 40/43/44 left legacy framing in place.

**Cluster J — CE2 memory drift:** GA-44, GA-45 (v3 example retains category; custom-form location TBD even though locked).

**Cluster K — Orphan + stale memory files:** GA-46 (project_artifact_fixes.md stale TODO), GA-48 (music cheatsheet orphan), GA-50, GA-51 (cheatsheet research stale).

**Cluster L — UIdesign.md FAB spec stale:** GA-40 (56px→52px), GA-41 (position), GA-36 (date header).

---

#### Recommended fix sequencing

**Pre-Session-45a batch (~30 min) — minimum viable to unblock curation:**
1. GA-32 — resolve Pull-Up co-primary vs single-primary ambiguity in `seed-tagging-principles.md`
2. GA-31 — strip broken `../../../.claude/...` link syntax in `seed-tagging-principles.md`

**Pre-Session-47+ build batch (~1.5–2 hr) — correctness for the coordinated CE1/CE2 build:**
3. GA-01 — add `parentExerciseId` to master-schematics DB schema + v3 delta + Dexie schema string
4. GA-02 — update `ExerciseService.create()` row to include `parentExerciseId`
5. GA-44 — drop `category` from CE2 v3 schema example
6. GA-45 — update CE2 memory's custom-form location pointer to `master-schematics.md` § ExerciseSearchModal Spec
7. GA-17 — `getByWorkoutId` → `getByWorkoutLogId` in logs.md
8. GA-18 — `getNeglectedCategories` → `getNeglectedGroups` in statistics.md
9. GA-19 — remove adherence row from Overview Dashboard table
10. GA-20 — remove `getAdherenceRate` from both service tables

**Cross-conversation safety batch (~30 min):**
11. GA-42 — rewrite `project_state.md` body to current state
12. GA-43 — rewrite MEMORY.md index line for project_state
13. GA-46 — either close `project_artifact_fixes.md` or update what's done vs still-open

**Documentation hygiene batch (~2 hr) — can be split or deferred:**
- Master-schematics updates: GA-03, GA-04, GA-05, GA-06, GA-07, GA-09, GA-10, GA-12, GA-13
- Tab spec updates: GA-08, GA-11, GA-21, GA-22, GA-23
- Exercise library: GA-25, GA-26, GA-27, GA-28, GA-29, GA-30, GA-33, GA-34, GA-35
- UIdesign/process: GA-36, GA-37, GA-38, GA-39, GA-40, GA-41
- Memory: GA-47, GA-48, GA-50, GA-51

**Cosmetic batch (anytime, ~30 min):**
- GA-14, GA-15, GA-16, GA-24, GA-49

---

#### Recommended action

Run the **Pre-Session-45a batch** as the very next session (before 45a begins). That's 30 minutes of surgical edits and the results compound — Session 45a starts on trustworthy principles.

Then fold the **Pre-build** and **Cross-conversation** batches into one 2–2.5 hr fix session ahead of Session 47+ build.

Hygiene can roll out across the 45a–f curation sessions whenever an artifact is being touched anyway — don't schedule a dedicated session unless energy is high.

**Total estimated fix effort: ~5 hr** across 3–4 small sessions.

---

## Session log

End-of-phase notes go here. Keep terse.

- **2026-04-23** — Audit scaffolded. Plan approved: Option C hybrid methodology, 6 phases, severity taxonomy 🔴🟠🟡⚪, scope includes CLAUDE.md + memory. Awaiting go-signal to execute Phase 1.
- **2026-04-23** — Phase 1 complete (foundation): 16 gaps. Two 🔴 blockers cluster around `parentExerciseId` missing from master-schematics (schema table, v3 delta, Dexie schema string, Service Layer row) despite session 44 integration claim.
- **2026-04-23** — Phase 2 complete (tab specs): 8 gaps. Stale service method names (getByWorkoutId, getNeglectedCategories) + orphaned adherence residuals in statistics.md (row + service method) post-S4 resolution.
- **2026-04-23** — Phase 3 complete (exercise library): 11 gaps. 🟠 Pull-Up taxonomy contradiction in seed-tagging-principles (Rule 1 vs Vertical pull template) directly blocks Session 45a clarity. Broken memory cross-link in same doc.
- **2026-04-23** — Phase 4 complete (UIdesign/process): 4 gaps + 2 addendum surfaced later by memory audit (UIdesign.md FAB size/position both stale per session 17). Authority model conflict between coreprocess and recap.
- **2026-04-23** — Phase 5 complete (memory): 10 gaps. Two 🔴 blockers on project_state.md + MEMORY.md index — severely stale (Phase 4 claims vs Phase 5 reality). CE2 memory doc has example contradicting CE1 Decision #28 (v3 drops category).
- **2026-04-23** — Phase 6 complete (synthesis): 51 gaps total clustered into 12 themes; 4-tier fix sequencing proposed. Recommended: Pre-45a batch (30 min, 2 gaps) → Pre-build batch (2 hr, 11 gaps) → Hygiene (rolling). Audit closed; ready for fix sessions.
- **2026-04-23** — **Pre-45a batch executed:** GA-31 (broken memory cross-link) + GA-32 (Pull-Up taxonomy contradiction) both fixed in `seed-tagging-principles.md`. Resolution direction on GA-32: Vertical pull template default held at `lats` single-primary (applies to Lat Pulldown et al.); Pull-Up + Chin-Up promoted to explicit Rule-1 override bullets with demote-secondary instructions. Session 45a is now unblocked on the Pull-Up parent map.
