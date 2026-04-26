# Artifact Consolidation Sweep — Execution Plan

> **For execution in a fresh Claude Code session.**
> Approved in research session 2026-04-26. This is a Build session — skip the "Research or Build?" prompt.
> All 8 phases pre-validated against actual files. Do not re-research, re-propose, or re-debate.

---

## How to start the new chat

Paste this exactly as the first message:

> Execute `artifacts/consolidation-plan.md` per its instructions. This is a Build session, approved in research session 2026-04-26. Read the plan file, then start at Phase A. Pause for my approval after Phase C (biggest visual change) and after Phase E (CLAUDE.md edit) before continuing. All other phases proceed in sequence with one commit per phase.

---

## Required reading before starting

1. This file (full read)
2. `artifacts/recap.md` § header (current state)
3. Memory: `project_artifact_consolidation_plan.md` (pointer-only — confirms plan exists across sessions)
4. `CLAUDE.md` § Coding Standards (commit + JSDoc rules apply)

**Do NOT read:**
- handoff.md body (you'll be reformatting it; read its current shape only when Phase D begins)
- master-schematics.md (untouched by this sweep)
- Any tab specs (untouched)
- seed-draft.md / gap-audit.md (being archived in Phase A — don't waste tokens reading what's about to move)

---

## Pre-validated findings (do not re-verify)

- ✅ `seed-draft.md` (3,713 lines) referenced from `src/db/seed.ts:6` only — single comment update needed in Phase A
- ✅ `gap-audit.md` self-marks "delete this file once findings closed" — safe to archive (not delete; preserve history)
- ✅ "Rejected Options" exists in 2 files: `handoff.md:967` (general — extract in Phase B) and `UIdesign.md` (color-specific — leave alone)
- ✅ recap.md + handoff.md referenced from 6 files (CLAUDE.md, master-schematics, exercise-bank, seed-tagging-principles, src/db/seed.ts, each other) — **keep filenames; reshape contents only**
- ✅ Memory dir has 25+ files; MEMORY.md index has ~22 entries → drift confirmed
- ✅ `project_state.md` is itself stale (says "Session 52 IN PROGRESS"; actually CLOSED) — rewrite in Phase G
- ✅ `project_ce1_planning_state.md` is explicitly SUPERSEDED — delete in Phase G

---

## Working agreements during execution

- **One commit per phase.** Use `git commit -m "..."` with the message specified per phase.
- **Pause points:** after Phase C and after Phase E. Wait for explicit user "continue" before next phase.
- **No co-author tag in commits** unless user has standing instruction to include it.
- **Bullets > paragraphs** in everything you write (this is what the sweep is enforcing — practice it).
- **Preserve all decisions verbatim.** Only compress connective narrative tissue. If unsure whether a sentence is rationale vs filler, keep it.
- **If something looks broken mid-phase**, stop and report. Do not "fix and continue" silently.
- **Run `npm run build` after Phase A and Phase H minimum.** Other phases optional unless you touched src/.

---

## Phase A — Archive cold files

**Goal:** Move closed working drafts out of active read path. ~4,000 lines shed instantly.

**Steps:**
1. `mkdir artifacts/archive/`
2. `git mv artifacts/seed-draft.md artifacts/archive/seed-draft.md`
3. `git mv artifacts/gap-audit.md artifacts/archive/gap-audit.md`
4. Edit `src/db/seed.ts:6` — change `artifacts/seed-draft.md` to `artifacts/archive/seed-draft.md`
5. Create `artifacts/archive/README.md`:
   ```markdown
   # Archive — Closed Working Drafts

   Files here are historical reference. Do NOT include in session-start reading.
   Read on demand only (e.g., investigating curation history or gap-audit decisions).

   - `seed-draft.md` — sessions 45a–g curation work; output now in `src/db/seed.ts`
   - `gap-audit.md` — sessions 41–46 audit; 13/51 closed, rest deferred-rolling
   ```
6. Run `npm run build` — must pass.

**Success criteria:**
- `artifacts/` listing has 27 files (down from 29)
- `ls artifacts/archive/` shows both archived files + README
- `grep "archive/seed-draft" src/db/seed.ts` returns the updated path
- `npm run build` passes

**Commit:**
```
Archive completed working drafts (seed-draft, gap-audit) — drop ~4K lines from active read path
```

---

## Phase B — Extract decisions-locked.md

**Goal:** Pull "Rejected Options" + "What Is Fully Locked" out of handoff.md into a single-purpose reference file. Pointer-only from CLAUDE.md.

**Steps:**
1. Create `artifacts/decisions-locked.md`:
   ```markdown
   # Decisions Locked — Do Not Re-Open
   > Last touched: 2026-04-26 (consolidation sweep) — extracted from handoff.md

   ## Rejected options — do not re-propose
   [verbatim copy from handoff.md:967–993]

   ## What is fully locked
   [verbatim copy from handoff.md:941–950]

   ## Locked architectural decisions
   See `master-schematics.md` § Key Design Decisions (#1–#32).
   ```
2. Delete those two sections from `handoff.md`. Replace with one line at each anchor:
   `> Moved to artifacts/decisions-locked.md`
3. Edit `CLAUDE.md` § "Never Do This" — replace inline list with:
   ```markdown
   ## Never Do This
   See `artifacts/decisions-locked.md` for the full rejected-options list. Do not re-propose any item there unless the user raises it first.
   ```

**Success criteria:**
- New file ~80 lines, scannable
- handoff.md ~50 lines shorter
- CLAUDE.md "Never Do This" is a 1-line pointer
- All three files internally consistent (no orphan references)

**Commit:**
```
Extract rejected options + locked patterns to decisions-locked.md (single-purpose reference file)
```

---

## Phase C — Reformat recap.md ← PAUSE FOR APPROVAL AFTER

**Goal:** Invert from "header paragraph as state" to "structural sections as state." Cap at ~150 lines.

**New structure (use this skeleton):**

```markdown
# Workout Tracker — Recap
> Last touched: 2026-04-26 (session 52) — Decisions #30/#31/#32, SetRow rebuild

## State
- Phase: 5 — CE1/CE2 v3 build (in progress)
- Step: 7 of 7 (partial)
- Tests: 130 passing across 11 files
- Last commit: d77d17f (Decision #32 — bias → modifications rename)

## Next session (53)
- Mode: Build (with decision points up front)
- Scope: punch-list triage + manual smoke pass
- Estimated: single session

## Required reading
- This file
- handoff.md § Session 53 (full punch-list state)
- master-schematics.md § Issue Tracker (F40 + F41 newly added)

## Do NOT re-read
- artifacts/archive/* (closed working drafts)
- seed-tagging-principles.md (locked since 45g)
- muscleTaxonomy.ts (untouched since session 47)
- Service files (no contract changes since session 49)
- Decision #27 spec (locked session 51)

## Open decisions awaiting user input
| # | Topic | Options | Notes |
|---|---|---|---|
| 1 | Pull-up bodyweight model | A/B/C | deferred → F42 |
| 12 | Hide variant muscle meta | always vs only-when-inherited | needs decision |
| 17 | Search → primary-only? | yes/no | quick yes/no |
| [...] | [populate from current punch list] | | |

## Recent sessions (last 3)

### Session 52 (2026-04-26) — CLOSED partial
- Vitest coverage: 26 cases (130/130 across 11 files)
- Decisions locked: #30, #31, #32 (rationale → handoff.md)
- SetRow rebuild: custom stepper, grid retuned, save logic split
- F40 + F41 added to Issue Tracker
- Deferred to S53: smoke + ~14 punch-list items

### Session 51 (2026-04-26) — CLOSED
- Step 6 of 7: ExerciseSearchModal full rewrite
- Decision #27 amended: 4-state tap cycle replaces D6.2/D6.3

### Session 50 (2026-04-26) — CLOSED
- Steps 4 + 5 of 7: RPE plumbing wired end-to-end
- Public contract change: SetRow.onUpdate now takes partial

## Older history
→ See handoff.md (sessions 49 and earlier)

## Project context (stable)
- Problem: existing trackers are cluttered, mobile-hostile
- Goal: clean, fast, mobile-first MVP
- Stack: React 18 + TS + Vite 5 + React Router v7 + CSS Modules + Dexie.js v4
- Schema: v3 (see master-schematics.md § Dexie Schema String)
- Auth: localStorage (MVP only)
- Units: lb + inches canonical; convert at display via UserSettingsContext
```

**Steps:**
1. Draft the new structure based on current state in old recap.md header
2. Move sessions older than 50 from old recap.md → handoff.md (verbatim, preserve in correct chronological position)
3. Bullet-ify everything
4. Verify manifest sections (Required reading / Do NOT re-read) are grep-able as `## ` headings
5. **Cross-check:** every fact in the new recap.md is sourced from somewhere (old recap, handoff, or master-schematics) — nothing invented

**Success criteria:**
- recap.md ≤ 150 lines (from 752)
- Header is metadata; body is structural state
- Open the file: phase + next action + load manifest visible in <10 seconds
- All historical session content preserved in handoff.md (nothing lost)
- `grep "## Required reading" artifacts/recap.md` returns a hit
- `grep "## Do NOT re-read" artifacts/recap.md` returns a hit

**Commit:**
```
Reformat recap.md — invert to structural state + load manifest, cap at 150 lines
```

**STOP HERE. Show user the new recap.md. Wait for explicit "continue" before Phase D.**

---

## Phase D — Reformat handoff.md

**Goal:** Append-only history. Drop git-duplicated changelog prose. Keep rationale + rejected paths.

**Steps:**
1. Add header block at top of handoff.md:
   ```markdown
   # Handoff — Session History
   > Append-only. Read on demand only. Newest at top.
   > What changed → see git log. Why we chose this → here.
   ```
2. For each session entry: keep "decisions + why + rejected paths"; cut "what changed in which file" (git log captures it)
3. Replace cut content with commit hash pointers. Format:
   ```markdown
   ## Session 52 (2026-04-26)
   **Decisions locked:**
   - #30 upperTraps → shoulders. Why: bodybuilding shoulder-day convention; lower-traps stays in back. Considered keeping all traps in back — rejected because shoulder chip routing breaks.
   - #31 Farmer/Suitcase Carry primary order swap. Why: heavy-carry trap stimulus dominates; forearms is limit but not adaptation. Considered: leaving order as-is — rejected because Shoulders chip is internally consistent post-#30.
   - #32 bias → modifications. Considered: `variant` (collides with parentExerciseId), `modifier` (singular). Picked: modifications (plural, multi-select, no collision). Future: word "bias" reserved for muscle-loading-emphasis field (F39).

   **What changed:** see commits 3ff891e, d989d05, d77d17f.
   ```
4. Bullet-ify
5. Insert sessions migrated from recap.md (Phase C) at correct chronological position

**Success criteria:**
- handoff.md ~40% smaller (target: under 600 lines from 997)
- Each session entry ≤10 lines unless rationale is unusually deep
- "What changed in file X" prose gone; "why we chose / what we rejected" preserved
- Commit hashes used as changelog pointers
- Top of file has "read on demand only" marker

**Commit:**
```
Reformat handoff.md — drop git-duplicated changelog prose, keep rationale + rejected paths
```

---

## Phase E — Reformat CLAUDE.md ← PAUSE FOR APPROVAL AFTER

**Goal:** Strip volatile state. Stable system-prompt-style doc that doesn't change for weeks.

**Steps:**
1. **Delete** entire `## CURRENT TASK` section (lines 17–22 in current file).
2. **Replace** with this 5-line block:
   ```markdown
   ## Where to find current state
   - `artifacts/recap.md` — current phase, next session, open decisions, load manifest
   - `artifacts/handoff.md` — session-by-session history (read on demand only)
   - `artifacts/decisions-locked.md` — rejected options, locked patterns
   ```
3. **Add** to `## Build Rules → Session discipline`:
   ```markdown
   - **Session rotation:** When closing a session, move the oldest session entry from recap.md → handoff.md. recap.md body holds the last 3 sessions max.
   - **Last touched line:** Every artifact has `> Last touched: YYYY-MM-DD (session N) — short note` directly under its H1. Update when you edit the file.
   ```
4. **Add** to `## Coding Standards`:
   ```markdown
   - **Bullets > paragraphs in artifacts.** Reserve prose for genuine narrative; default to bullets/tables for facts and decisions.
   ```

**Success criteria:**
- CLAUDE.md has no `## CURRENT TASK` section
- "Where to find current state" pointer present
- Session rotation rule encoded
- Last touched rule encoded
- Bullets-over-paragraphs rule encoded
- Total length unchanged or slightly shorter (~232 → ~225 lines)

**Commit:**
```
Reformat CLAUDE.md — strip volatile CURRENT TASK, add session rotation + last-touched rules
```

**STOP HERE. Show user the new CLAUDE.md. Wait for explicit "continue" before Phase F.**

---

## Phase F — Add "Last touched" lines

**Goal:** One-line orientation marker on every active artifact.

**Steps:**
1. Get accurate last-touch date per artifact:
   ```bash
   for f in artifacts/*.md artifacts/tabs/*.md artifacts/exercises/*.md artifacts/plugin-research/*.md; do
     echo "$f: $(git log -1 --format='%ad' --date=short -- $f)"
   done
   ```
2. For each active artifact (skip `artifacts/archive/`), insert directly under H1:
   ```markdown
   > Last touched: YYYY-MM-DD (session N) — short hint
   ```
3. For "session N" — extract from the most recent commit message touching that file (commit messages are session-tagged, e.g., "Session 52 cont.: Decision #32...")
4. For "short hint" — 3–5 words describing the most recent meaningful change

**Success criteria:**
- Every active artifact has a Last touched line
- Dates match git log
- 30-second skim of `artifacts/` folder tells you which files are warm vs cold
- Files in `archive/` are NOT touched (they're frozen)

**Commit:**
```
Add Last touched marker to all active artifacts
```

---

## Phase G — Memory cleanup

**Goal:** Index matches reality. Stale memories deleted. Description lines accurate.

**Steps:**
1. **Delete** `C:\Users\glock\.claude\projects\d--software-eng-workout-tracker-v2\memory\project_ce1_planning_state.md` (explicitly SUPERSEDED). Remove its index line from MEMORY.md.
2. **Rewrite** `project_state.md`:
   - Description line: change "Session 52 IN PROGRESS" → "Session 52 CLOSED; Session 53 = punch-list triage"
   - Body: replace 30+ lines of session detail with: (a) phase, (b) test count, (c) methodology rules adopted (six-coach panel, accuracy lens, kinetic ceiling), (d) pointer "for current session state see artifacts/recap.md"
3. **Audit MEMORY.md vs disk:**
   ```bash
   ls C:/Users/glock/.claude/projects/d--software-eng-workout-tracker-v2/memory/
   ```
   Compare to entries in MEMORY.md. For each orphan (file on disk, not in index): add an index line OR delete the file (ask user if unsure). For each ghost (index line, file missing): remove the index line.
4. **Description-vs-body audit:** open each retained memory file. Verify the `description:` frontmatter line matches what the body actually says. Update where drifted.

**Success criteria:**
- `ls memory/` count matches MEMORY.md index entry count (excluding MEMORY.md itself)
- No "IN PROGRESS" markers on closed sessions
- Each description line accurately reflects current body
- 2–3 memory files lighter overall (deletions + project_state.md slim-down)

**Commit:** N/A — memory files are outside the repo. No commit. Just verify with `ls`.

---

## Phase H — Cold-eyes verification

**Goal:** Confirm the sweep delivered the promised gain. No new commits unless something needs fixing.

**Steps:**
1. Open `artifacts/recap.md` fresh — time yourself. Can you find phase, next session, and load manifest in under 10 seconds?
2. Run line-count check:
   ```bash
   wc -l artifacts/*.md
   ```
   Confirm total dropped from ~12,030 to ~5,500-ish.
3. Grep for both manifest sections:
   ```bash
   grep -n "## Required reading" artifacts/recap.md
   grep -n "## Do NOT re-read" artifacts/recap.md
   ```
   Both must return hits.
4. Open `CLAUDE.md` — confirm zero volatile state present (no "Session 52 closed", no "Decision #32", etc.).
5. Run `npm run build` and `npx vitest run` — both must pass clean.
6. Spot-check 3 cross-references:
   - CLAUDE.md → recap.md (pointer in "Where to find current state" resolves)
   - recap.md → handoff.md (pointer in "Older history" resolves)
   - master-schematics.md → handoff.md (any existing references still resolve)
7. Spot-check `src/db/seed.ts:6` points at `artifacts/archive/seed-draft.md` (Phase A side-effect verified).

**Success criteria — all must be true:**
- Active artifact line count ~5,500
- Build + tests pass
- All cross-references resolve
- recap.md scannable in 10 seconds
- CLAUDE.md is fully stable (no volatile state)

**If any criterion fails:** stop. Report the failure. Fix in a targeted follow-up commit before declaring done.

**Final commit (only if Phase H surfaced fixes):**
```
Consolidation sweep — Phase H follow-up fixes
```

**Final action:** report back to user with the metrics table:

| Metric | Before | After |
|---|---|---|
| Active artifact lines | ~12,030 | ~[actual] |
| recap.md lines | 752 | ~[actual] |
| handoff.md lines | 997 | ~[actual] |
| Files needing daily reading | 4 | 2 |
| Tests passing | 130 | [confirm] |

---

## Risk + recovery

- **Per-phase rollback:** each phase = one commit. `git revert <commit>` to undo any phase. A through C are independent of each other; D depends on C; E depends on C; F is independent; G is outside repo (no git). Worst case: revert E + D + C in sequence to fully undo.
- **Cross-reference breakage:** verified upfront. Only `src/db/seed.ts:6` needs updating. All other refs are between artifacts (we control them).
- **Lost nuance during compression:** mitigation = preserve all decisions verbatim; compress only narrative connective tissue. If unsure, keep.
- **Build/test breakage:** Phase A and Phase H run `npm run build` + `npx vitest run`. Other phases don't touch src/ so should be safe. If Phase A breaks build, the seed.ts:6 update was wrong — re-check the path.

---

## Out of scope for this sweep

- Renaming recap.md or handoff.md (would propagate to 6 files; not worth)
- Splitting master-schematics.md (defer until any single section dominates reads)
- Migrating F-codes to GitHub Issues (long-term recommendation; not now)
- ADR files for new decisions (long-term recommendation; not now)
- Slash commands for session rituals (separate workstream)
- Changes to UIdesign.md's color-rejected-options list (domain-local, leave alone)

If the user mentions any of the above mid-execution, redirect: "Out of scope for this sweep — log it for a follow-up cycle."

---

## End-of-sweep handoff

After Phase H success, post this to the user:

> Consolidation sweep complete. Active artifact lines down from 12,030 to ~[actual]. recap.md is now [N] lines; handoff.md is [N]. CLAUDE.md is stable (no volatile state). Forcing functions encoded: session rotation + Last touched. Memory pruned: [N] files removed/rewritten. Build + tests clean.
>
> Next session you can start with: read `artifacts/recap.md` only — it has everything you need including the load manifest. Handoff and decisions-locked are now read-on-demand.
