# CLAUDE.md — Workout Tracker v2

Mobile-first workout tracking web app. React 18 + TypeScript, Vite 5, React Router v7, CSS Modules, Dexie.js (IndexedDB). No backend for MVP — service layer abstracts all data access for a future Node.js migration.

GitHub: https://github.com/kazi91/workout-tracker-v2 (public)

---

## Tech Stack

- **Languages:** TypeScript, HTML, CSS
- **Framework:** React 18, Vite 5, React Router v7, CSS Modules, Dexie.js (IndexedDB)
- **Artifacts & documentation:** Markdown (.md) — use .md format for all reference files so links are clickable. Never create reference files as .txt.

---

## CURRENT TASK
Phase: 5 — Statistics page + new features planning
Last session ended: Session 44 CLOSED (2026-04-23) — all 5 planned items complete + bonus `artifacts/seed-tagging-principles.md` drafted. (1) ✅ `memory/project_ce2_schema_architecture.md` created + populated with 5 architecture decisions (index=yes, delete=choice modal, flat hierarchy, any parent-level exercise qualifies, search=direct). (2) ✅ `memory/project_ce1_final_scope.md` rewritten — full 213-entry library in scope; D-new-4 + D-new-5 added; curation estimate 15–20h. (3) ✅ `exercise-bank.md` Build sequencing rewritten — 3-phase plan: Curation (Sessions 45a–f, ~13h) → Coordination → Build (Session 47+). (4) ✅ EB5 integrated into `master-schematics.md` § ExerciseSearchModal Spec — optional "Nest under a parent exercise" dropdown in Step 1; `ExerciseService.create()` signature updated with `parentExerciseId`. (5) ✅ 3 guides authored under template v2 (squat.md, bench-press.md, overhead-press.md) — all 4 classic barbell compounds covered; 8 guides total. **Bonus:** `artifacts/seed-tagging-principles.md` (~270 lines) drafted — 6 rules, 10 movement templates, 5 group-specific conventions, Tier 3 cadence, EMG policy, sanity checks. Governs Session 45a–f curation work. No code, no src/ edits.
Next action: Session 45a — Seed re-curation Phase 1. Read `seed-tagging-principles.md` top to bottom, then lock muscle maps (primary + secondaries-with-role) for the 11 parent exercises: Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover. Seed the "EMG-supported co-primary claims" reference list inside `seed-tagging-principles.md` as decisions are made. Output: new file `artifacts/seed-draft.md` (create at session start). Est ~1.5h. Parents first maximizes leverage — variants inherit per Parent/Variant Rule. Sessions 45b–f then run ~11h over Seed+P0 → P1 upper → P1 lower+core → P5+P2+P3 → P4+validation per `exercise-bank.md` § Build sequencing § Phase 1. THEN Session 46 = spec patch 3/3 if needed. THEN Session 47+ = CE1/CE2 coordinated v3 build.
Session scope: Research + planning artifact — tag 11 parent exercises per principles doc; output to `artifacts/seed-draft.md`. No code, no src/ edits.
Required reading this session: recap.md, `artifacts/seed-tagging-principles.md` (mandatory full read — governs the session), `artifacts/exercise-bank.md` (parent rows only: Squat / Deadlift / Bench Press / Dips / Pull-Up / Lat Pulldown / RDL / Skull Crusher / Barbell Curl / Plank / Cable Crossover), `memory/project_ce1_final_scope.md` (D1–D9 taxonomy reference), `master-schematics.md` § Muscle Taxonomy Model (schema + MUSCLE_LABELS + getExerciseGroup) — do NOT read the whole master-schematics file.

## Session Start — Opening Message Protocol

Every session opens with an explicit mode declaration from the user. If the first message does not specify mode, ask before doing anything: "Research session or build session?"

### Research sessions
User signals: "research," "thinking about," "how should," "what are the options," "no code yet," or explicit "research session."

Behavior:
- Investigate, explain tradeoffs, surface options, cite sources when relevant.
- Do not edit files in `src/`. Scratch code to illustrate a concept is fine if short, isolated, and labeled "example only."
- Do not transition to implementation in the same response. End with: "Want me to build this, or are you still deciding?"
- Research mode ends only when the user explicitly says "build it," "implement this," "let's do [option]," or equivalent.

### Build sessions
User signals: "build," "implement," "execute [step ID]," or explicit "build session."

Before writing any code:
1. Read CLAUDE.md CURRENT TASK and `artifacts/recap.md`.
2. Restate where we are and what you're about to do, separated into:
   - **Direct requirements** — what the user said
   - **Inferences** — what you're assuming to fill gaps
   - **Unclear** — what needs answering before you start
3. If inferences or unclear items exist, stop and ask. Do not pick a plausible interpretation and run with it.
4. Wait for explicit confirmation before any file edits.

Once the plan is confirmed, execute without further check-ins. If the plan needs to change mid-execution (new files to edit, assumption turned out false, approach isn't working), stop and raise it before continuing.

### Ambiguous openings
If the first message could be either mode, default to research and ask at the end: "Want me to build this, or are you still deciding?" Never silently transition research → build in a single response.

### Stop condition
Do not start the next build step in the same session. When the current step is done and artifacts are updated, end the session.

---

## Session Start — Read Before Doing Anything

**Mandatory every session:**
- `artifacts/recap.md` — current phase, build step, open decisions, next action. Single source of session state.
- `artifacts/tabs/[tab].md` — read before building anything in that tab.

**Read if recap.md leaves something unclear** (decision rationale, mid-step context, ambiguous state):
- `artifacts/handoff.md` — full session history, rejected options, reasoning behind recent choices.

**Reference only — open when the current task requires it:**
- `artifacts/master-schematics.md` — schema, service signatures, locked decisions, Issue Tracker. Read specific sections as needed, not the whole file.
- `artifacts/UIdesign.md` — color, spacing, typography, component rules. Read when building or styling a new component.
- `artifacts/exercise-bank.md` — exercise catalog + priority tiers + Parent/Variant Rule + per-exercise tutorial content. Read when touching the exercise library, seed, picker, CE1 muscle maps, variant architecture, or the future exercise tutorial tab.

`artifacts/coreprocess.md` — skip unless user asks about process.

**If code already exists in `src/`:** read the codebase before doing anything. Survey what's been built, match it against the build order in `recap.md`, and tell the user where you think we are before starting work.

---

## How We Work

This is a back-and-forth build. Before making any decision that affects architecture, data model, user flow, or component design:
- Propose the change with options
- Explain pros and cons of each
- Get explicit agreement before building

Trivial implementation details (variable names, minor styling) can proceed without discussion. Significant decisions cannot. Do not advance to the next build phase without explicit user agreement.

---

## Working Style

- **Review before acting.** When asked to review or assess something, show findings first. Do not start making changes or generating content until explicitly asked.
- **TypeScript hook:** When the user asks to check for bugs, review logic, or debug code — ask "Want to enable the TypeScript hook?" before starting. When that task is done, immediately tell the user: "Disable the hook now via `/hooks`." Do not move on to the next task without giving this reminder.
- **Always ask before recommending Opus** — token budget is limited.
- **Surface confusion proactively.** Ambiguity is often invisible — a request can feel obviously clear while actually supporting multiple valid interpretations. Before building, explicitly separate what the user said from what you're inferring. If anything is being inferred, ask. A wrong build is more expensive than a 30-second clarifying question.
- **State "done" before starting.** For any non-trivial task, declare success criteria before writing code: "Done when X passes / Y behavior is confirmed." For multi-step tasks, use: `1. [step] → verify: [check]`. Weak criteria ("make it work") produce mid-build clarification loops.
- **Surgical changes only.** Touch only what the task requires. Don't "improve" adjacent code, comments, or formatting. Don't refactor things that aren't broken. If your changes orphan an import or variable, clean that up — but don't remove pre-existing dead code unless asked. Every changed line should trace directly to the request.
- **Plain English follow-up.** After any explanation involving technical terms, jargon, or industry concepts, immediately follow with a labeled plain-English version:
  > **Plain English:** [same idea, no jargon, as if explaining to someone new to the industry]
  Keep both versions. The original stays for precision; the plain-English version helps map jargon to meaning.

---

## Document Editing

- Use concise bullet-point cues — not lengthy paragraphs or vague advice.
- Keep language direct and simple unless told otherwise.

---

## Working Agreements

- All 23 Phase 2 decisions are locked — do not reopen without explicit discussion
- Update `artifacts/handoff.md` and `artifacts/recap.md` whenever a decision is made, locked, reversed, or a new gap is found — inline during the session, not batched at the end
- Before building any tab, read the relevant sub-schematic in `artifacts/tabs/`
- Before building anything, check the Issue Tracker in `artifacts/master-schematics.md` for must-fix items in that area
- Cross-reference user stories in `master-schematics.md` at every build step

---

## Build Rules — Token Management

Each build step = one conversation. Do not combine steps. When the user starts a new session, follow these rules to stay lean:

### Session discipline
- **One major build step per session.** Complete it, verify, commit, end. Small steps (step 7, or a step that finishes early) can piggyback in the same session if context is still light.
- **Read smart, not everything.** Read the primary tab spec fully for the current step. For `master-schematics.md`, read the sections relevant to the step (schema, services, decisions) — not the full changelog/history. If the tab spec references another tab (e.g. Logs references Programs for finish flow), read that specific section of the other spec.
- **Read existing code before building.** From step 2 onward, survey what exists in `src/` before writing new code — check for existing patterns, utilities, and styles to reuse. Don't duplicate what's already there.
- **Never re-read a file you already read in this session** unless the user changed it.
- **Don't read code you just wrote** to verify — the Edit/Write tools confirm success.
- **Verify before done.** Run `npm run dev` (or `npm run build` if dev server is impractical) before calling any step complete. Fix compile errors and TypeScript issues in the same session — don't leave them for the next one.
- **Simplicity check.** Before finishing a file, re-read it with fresh eyes: could this be half the lines without losing clarity? Ask: "Would a senior engineer say this is overcomplicated?" If yes, rewrite it. No speculative abstractions, no error handling for scenarios that can't happen, no "flexibility" that wasn't requested. If 200 lines could be 80, rewrite it.
- **Pre-completion checklist.** Before calling any step complete, verify:
  - [ ] JSDoc on every exported service function
  - [ ] No `db.ts` imports in components (service layer only)
  - [ ] `npm run build` passes clean
  - [ ] `artifacts/recap.md` and `artifacts/handoff.md` updated
  - [ ] CLAUDE.md → CURRENT TASK updated for next session
  - [ ] For bug fixes: reproducing test written before the fix

### Output discipline
- **Build, don't narrate.** Write the code. Skip the "I'm going to create..." preamble and the "Here's what I did..." recap. The user can see the diff.
- **Brief explanations welcome.** The user is learning — after writing code, add a short (2-3 sentence) explanation of *why* it works this way, not *what* it does line-by-line. Deeper explanations on request.
- **Group file writes.** When creating multiple related files (e.g. a component + its CSS module + its service), write them all before talking.
- **Short status updates only.** After completing a chunk: "Done — [component] built. Moving to [next piece]." One line.

### If context gets long
- If you've been working for a while and feel context pressure, tell the user: "Good stopping point — commit and continue in a new session." Don't wait until you freeze.
- Prefer finishing the current file/component cleanly over starting a new one.

---

## Architecture Conventions

- **No hardcoded credentials or secrets** — no test passwords, API keys, or tokens in source code; auth is plain-text in Dexie for MVP (R3 acknowledged) but never in `.ts`/`.tsx` files
- **Service layer only touches Dexie** — components never import `db.ts` directly; always go through a service
- **CSS Modules** — all component styles scoped via CSS Modules; no global class names except base reset in `index.css`
- **No Redux** — page-level `useState` + `useEffect`; shared state via `AuthContext`, `UserSettingsContext`, `ActiveWorkoutContext` only
- **Mobile-only layout** — 480px max-width enforced at root
- **Units** — all weights stored in lb, heights in inches; convert at display time only via `UserSettingsContext`; `unitPreference: 'imperial' | 'metric'` controls all Layer 1 units
- **Auto-save on blur** — all editable pages except `WorkoutDetailPage` edit mode (explicit Save Edits button)
- **Modals for destructive actions** — delete program, delete workout, discard active session; all other navigation is always safe
- **Seed trigger** — `App.tsx` on mount: `db.exercises.count() === 0` → `seed()`; fires once on first install only
- **Error handling** — all async service calls in components use try/catch; log via `console.error` for MVP. `ErrorContext` is the post-demo replacement (D5 — Issue Tracker)

---

## Never Do This

The full list of rejected options lives in `artifacts/handoff.md` — **Rejected Options** section. Read it every session. Do not re-propose any item listed there unless the user raises it first.

---

## Coding Standards

Comments are written **as part of building** each step — not added retroactively at the end of a session.

### Service functions — JSDoc above every exported function
```ts
/**
 * Returns the active workout log for the current user, or null if none.
 * Queries workoutLogs where finishedAt === null and userId matches.
 * Called by: ActiveWorkoutContext on mount and after finish/discard.
 * Returns: WorkoutLog | null
 */
export async function getActive(userId: number): Promise<WorkoutLog | null> {
```

### Context files — header block describing purpose, state, and consumers
```ts
/**
 * AuthContext — manages the current user session.
 * Reads userId from localStorage (key: workout_tracker_user_id) on mount.
 * Exposes: user, loading, login(), signup(), logout()
 * Consumed by: AuthGuard, UserSettingsContext, ActiveWorkoutContext
 */
```

### Component files — short header describing what it renders and what it reads
```ts
/**
 * WorkoutDetailPage — renders active, read-only, or edit mode for a workout log.
 * Mode is determined by finishedAt: null = active, set = read-only (edit via button).
 * Reads: ActiveWorkoutContext (finish state), UserSettingsContext (unit display)
 */
```

### Complex logic — inline comments on non-obvious code
```ts
// Fall back to the last set if no matching setNumber exists —
// handles cases where the user did fewer sets last session
```

### Skip commenting:
- Stub/placeholder pages (until built out)
- CSS Modules (section dividers only: `/* ── Layout ── */`)
- Lines where TypeScript types already make intent obvious

---

## Build Commands

> Fill in at build step 1 (Vite project scaffold). Placeholder until then.

```bash
npm run dev       # dev server
npm run build     # production build
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
```

VS Code extensions: ESLint, Prettier, GitLens, Live Server, Markdown, Mermaid. Configure ESLint + Prettier at build step 1.
