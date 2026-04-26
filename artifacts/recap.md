# Workout Tracker — Recap
> Last touched: 2026-04-26 (session 53) — punch-list triage + smoke close-out

## State
- Phase: 5 — CE1/CE2 v3 build CLOSED in practical terms (Step 7 smoke + punch-list complete)
- Tests: 130 passing across 11 files (verification of S53 patches owed: `npm run build && npx vitest run`)
- Last commit: cd723e0 (Session 53: punch-list triage + smoke close-out)
- Schema: v3 live (parentExerciseId + Muscle taxonomy + RPE + Tier 3 forward-compat fields)

## Next session (54)
- Mode: TBD — open with research unless user declares build
- Scope candidates (user picks at session start):
  - (a) Phase 6 kickoff — Stats / F32 toggle menu / EMG planning
  - (b) Cleanup pass — CP1/CP2/CP3 + remaining gap-audit items
  - (c) F40 Row C build (picker filter revamp; 4 lock-ins from S53)
  - (d) F41 build (per-exercise `aliases: string[]` v4 — closes #4/#5/#14/#15)
  - (e) F42 build (bodyweight + added-resistance redesign — closes #1)
- Outstanding from S53: verify build + tests clean, then commit S53 work

## Required reading
- This file
- `artifacts/handoff.md` § Session 53 (top of file — punch-list closures inline)
- `artifacts/master-schematics.md` § Issue Tracker (F40 Row C lock-ins, F41, F42, CP2/CP3, F8 → Resolved)
- `artifacts/decisions-locked.md` (rejected options + locked patterns)
- Memory entries via `MEMORY.md` index — open the relevant ones for the picked scope

## Do NOT re-read
- `artifacts/archive/*` (closed working drafts — seed-draft, gap-audit)
- `artifacts/seed-tagging-principles.md` (locked since 45g)
- `src/db/muscleTaxonomy.ts` (untouched since session 47)
- Service files (no contract changes since session 50 — RPE plumbing)
- Decision #27 spec (locked session 51)

## Open decisions awaiting user input
| # | Topic | Notes |
|---|---|---|
| Session 54 scope | Phase 6 kickoff vs cleanup vs F-row build | User picks at session start |
| S53 verification | `npm run build && npx vitest run` | Agent shell can't run npx; user runs before commit |

## Recent sessions (last 3)

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

### Session 52 (2026-04-26) — CLOSED partial
- Vitest coverage: 26 ExerciseSearchModal cases (130/130 across 11 files).
- Decisions locked: #30 (`upperTraps` group → shoulders; lowerTraps stays in back), #31 (Farmer + Suitcase Carry primary order swap to `[upperTraps, forearms]`), #32 (`bias` → `modifications` rename + multi-select `string[]` reshape; value enum extended with `deficit` to 7).
- SetRow rebuild: custom `[− input +]` pill stepper per cell (native browser spinner hidden); grid retuned (BEST 44px, LB minmax(72px, 1fr), REPS 56px, RPE 76px); save logic split into `saveWeight`/`saveReps`/`saveRpe`. Closes punch-list #2 + #3.
- F40 (picker filter revamp) UX layout locked to 3-row design + v4 bundling note. F41 (per-exercise `aliases: string[]` v4 schema bump) added — closes-by absorbs punch-list #4/#5/#14.
- **What changed:** see commits 3ff891e, d989d05, d77d17f.

### Session 51 (2026-04-26) — CLOSED
- Build Step 6 of 7: ExerciseSearchModal full rewrite (~360 lines TSX + ~270 lines CSS).
- Decision #27 amended: four-state tap cycle (neutral → primary → synergist → stabilizer → neutral) replaces D6.2 + D6.3; long-press removed; save-with-no-primary blocks with inline error.
- Three view modes: browse / createStep1 / createStep2. Browse renders flat in search and parents-with-chevron in browse mode (CE2 #5). Sticky `+ Create custom exercise` footer. Bespoke radio choice modal for ≥1-variant delete.
- No service edits (contracts shipped Session 49). No test edits (no existing modal test).
- **What changed:** see commit 918baef.

## Older history
→ See `artifacts/handoff.md` (sessions 50 and earlier).

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
