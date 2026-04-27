# Workout Tracker — Recap
> Last touched: 2026-04-26 (session 54) — F29 anatomy avatar pipeline research deep-dive; pipeline.md DRAFT created

## State
- Phase: 5 — CE1/CE2 v3 build CLOSED in practical terms (Step 7 smoke + punch-list complete)
- Tests: 130 passing across 11 files ✅ (no app code changed in S54 — research session only)
- Last commit: 25953a6 (Archive consolidation-plan.md — sweep executed)
- Schema: v3 live (parentExerciseId + Muscle taxonomy + RPE + Tier 3 forward-compat fields)
- Artifact directory: ~12,030 → 6,581 active lines (45% reduction); manifest sections live in this file
- UI docs: split into `artifacts/UI/` (UIdesign + design-tokens + component-standards + future-ui — 273/206/255/282 lines)
- New parallel R&D track (S54): F29 anatomy avatar — `artifacts/UI/3d-model/pipeline.md` DRAFT/IGNORED, owner to flesh out before lock

## Next session (55)
- Mode: TBD — open with research unless user declares build
- Scope candidates (user picks at session start):
  - (a) Phase 6 kickoff — Stats / F32 toggle menu / EMG planning
  - (b) Cleanup pass — CP1/CP2/CP3 + remaining gap-audit items
  - (c) F40 Row C build (picker filter revamp; 4 lock-ins from S53)
  - (d) F41 build (per-exercise `aliases: string[]` v4 — closes #4/#5/#14/#15)
  - (e) F42 build (bodyweight + added-resistance redesign — closes #1)
  - (f) F29 Stage 0 cardboard cutout — buildable spec ready in pipeline.md § Stage 0; one-evening sprint
  - (g) F29 pipeline.md mark-up / open-question resolution pass
- User pausing F29 work to mark up DRAFT before any further deepening

## Required reading
- This file
- `artifacts/handoff.md` § Session 53 (top of file — punch-list closures inline)
- `artifacts/master-schematics.md` § Issue Tracker (F40 Row C lock-ins, F41, F42, CP2/CP3, F8 → Resolved)
- `artifacts/decisions-locked.md` (rejected options + locked patterns)
- Memory entries via `MEMORY.md` index — open the relevant ones for the picked scope

## Do NOT re-read
- `artifacts/archive/*` (closed working drafts — seed-draft, gap-audit)
- `artifacts/exercises/seed-tagging-principles.md` (locked since 45g)
- `src/db/muscleTaxonomy.ts` (untouched since session 47)
- Service files (no contract changes since session 50 — RPE plumbing)
- Decision #27 spec (locked session 51)

## Open decisions awaiting user input
| # | Topic | Notes |
|---|---|---|
| Session 55 scope | Phase 6 kickoff vs cleanup vs F-row build vs F29 Stage 0 vs pipeline mark-up | User picks at session start |
| F29 pipeline open questions | See `artifacts/UI/3d-model/pipeline.md` § 9 — color hex, placement (Stats vs Profile), service formula, vertex group naming, gender variants, MVP-vs-v1.1 reveal | Resolve before locking pipeline.md |

## Recent sessions (last 3)

### Session 54 (2026-04-26) — F29 anatomy avatar pipeline research — CLOSED
- **Mode:** Research session only — no app code changed.
- **Direction reframe:** F29 shifted from 2D SVG (anatomy doc Phases 1–5, retired) to **real 3D via React Three Fiber**. Hybrid Path F asset pipeline locked: MB-Lab body + Z-Anatomy stencil + Blender DataTransfer for muscle vertex group bake (~12–16h vs original 30–50h estimate).
- **Artifact created:** `artifacts/UI/3d-model/pipeline.md` (DRAFT/IGNORED) — 13 stages, full buildable Stage 0 cardboard-cutout spec (executable in one evening), license log, AI-tool table per stage, cautions, open questions. Owner to flesh out before lock.
- **Locked during research:** real 3D over 2D SVG; Cortana/Tron/Prometheus aesthetic exception zone; cheapest-first 6-layer shader recipe (Stage 11); Draco decoder self-host as default (offline-first); gltfjsx as optional convenience; bloom strategy deferred to build-time decision; Stage 0 lives on `experiment/avatar-cardboard-cutout` branch (not scratch repo); MuscleFatigueService formula sketch (ease-out 72h curve, Vitest-coverable like existing services).
- **Memory updates:** `project_fatigue_avatar.md` rewritten + `MEMORY.md` index entry refreshed.
- **Cross-references:** `artifacts/UI/future-ui.md` § 6 added pointing to pipeline.md.
- **Status:** Pipeline doc DRAFT. Phase 6 unaffected. F29 is parallel R&D track (Q6b — design alongside, link later).

### Session 53 follow-up (2026-04-26) — Artifact consolidation sweep — CLOSED
- **Scope:** Execute pre-approved 8-phase consolidation plan + verify clean.
- **Shipped (8 commits):** Phase A archive seed-draft + gap-audit; Phase B extract decisions-locked.md from handoff.md; Phase C reformat recap.md (746 → 81 lines); Phase D reformat handoff.md (964 → 623 lines, drop git-duplicated prose); Phase E strip CLAUDE.md `## CURRENT TASK`, add session rotation + Last touched + Bullets-over-paragraphs rules; Phase F Last touched markers on every active artifact; Phase G memory cleanup (deleted SUPERSEDED `project_ce1_planning_state.md`, slimmed `project_state.md`, indexed orphan `project_music_cheatsheet.md`); Phase H follow-up fixes (4 stale `seed-draft.md` cross-refs in master-schematics/exercise-bank/seed-tagging-principles + dead `CURRENT TASK` pointer in CLAUDE.md). Plus archive of consolidation-plan.md itself.
- **Metrics:** active artifact lines 12,030 → 6,581 (45% reduction); recap.md 752 → 81; handoff.md 997 → 623; CLAUDE.md no longer carries volatile state.
- **Verification:** ✅ build clean (5.31s, 1694 modules); 130/130 tests across 11 files.
- **What changed:** see commits 515512c → 25953a6.

### Session 53 (2026-04-26) — CLOSED
- **Scope:** Punch-list triage + manual smoke pass (Step 7 close-out).
- **13 items processed:** 6 shipped, 7 deferred.
  - Shipped: #6 Hyperextension rename → "Back Hyperextension"; #13 Deficit RDL added as variant; #15 B-Stance → Staggered-Stance RDL rename + F41 alias logged; #7 `autoCapitalize="sentences"` on picker custom-create input only; #12 variant rows hide muscle meta + chevron 22→28px / weight 700; #17 muscle search primary-only; #18 picker rows hide secondaries + EMG-future direction note.
  - Deferred: #1 → F42 (bodyweight + added-resistance redesign); #9 → F40/F32 (olympic-lift visibility); #10 → F40 Row C drill-down (4 lock-ins); #11 → multi-shape tracking-arch dependency on F38; #19 → absorbed into EMG cycle; #8 → memory-only.
- **Findings logged:** CP2 (exercise-bank.md group-label drift) + CP3 (mid-trap clarification). F8 superseded by F42 → Resolved.
- **Mid-smoke gap fix:** picker had a duplicate local copy of `matchesMuscleTag` that wasn't updated by the service-layer #17 fix — patched.
- **Memory adds:** project_bodyweight_added_resistance, project_emg_top_n_display, project_log_datetime_edit, feedback_ask_dont_lean, feedback_question_format.
- **Files changed (5 src/, 4 artifacts):** seed.ts, ExerciseService.ts, ExerciseService.test.ts, ExerciseSearchModal.tsx, ExerciseSearchModal.module.css, exercise-bank.md, master-schematics.md, handoff.md, recap.md.
- **Verification:** PENDING — agent shell can't reach npx; user runs `npm run build && npx vitest run` before commit. Expected: clean + 130/130.

## Older history
→ See `artifacts/handoff.md` (sessions 52 and earlier).

## Project context (stable)
- Problem: existing trackers are cluttered, mobile-hostile.
- Goal: clean, fast, mobile-first MVP focused on workout logging.
- Stack: React 18 + TypeScript + Vite 5 + React Router v7 + CSS Modules + Dexie.js v4 (IndexedDB).
- Schema: v3 live (see `master-schematics.md` § Dexie Schema String).
- Auth: localStorage (MVP only).
- Units: lb + inches canonical; convert at display time via `UserSettingsContext`.
- Layout: mobile-only, 480px max-width.
- Library: 214 entries across 6 priority tiers (Seed=29, P0=9, P1=56, P2=53, P3=11, P4=31, P5=25); 12 documented parents with variant FKs.

## CURRENT TASK mirror
This file is the source of truth for current state. CLAUDE.md no longer carries a CURRENT TASK block — see `decisions-locked.md` and the load manifest above.
