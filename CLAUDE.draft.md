# CLAUDE.md — Workout Tracker v2

> **STATUS: DRAFT — rename to CLAUDE.md to activate**

## What this project is

A mobile-first workout tracking web app. React 18 + TypeScript frontend, Vite 5, React Router v7, CSS Modules. Local-first MVP using Dexie.js (IndexedDB). No backend yet — service layer abstracts all data access for a future Node.js migration.

---

## Read these artifacts before starting any session

Read in this order. Each file is the authoritative source for its domain.

| Priority | File | What it contains |
|----------|------|-----------------|
| 1 | `artifacts/recap.txt` | Current phase, what's done, what's next, open questions |
| 2 | `artifacts/handoff.md` | Full session context, rejected options, decisions in progress |
| 3 | `artifacts/master-schematics.md` | Architecture, DB schema, service layer, routing, state, all 23 locked decisions, issue tracker |
| 4 | `artifacts/UIdesign.txt` | Color system, spacing, typography, button standards, component design rules |
| 5 | `artifacts/tabs/` | Sub-schematics for each tab (logs.md, programs.md, profile.md, statistics.md) — read the relevant tab file before building that tab |

`artifacts/coreprocess.txt` is background context (problem statement, dev philosophy, user stories). Read it if the user asks about product direction or user stories — otherwise skip.

---

## Current phase

**Phase 3 — Build MVP (not started)**

Build order (from recap.txt):
1. Project setup + Dexie schema
2. Auth (SignupPage with unit preference, LoginPage)
3. Core shared components (Modal, BottomNav, FAB, Contexts)
4. Programs tab
5. Logs tab
6. Profile tab
7. Statistics placeholder

One open design question before first component: **OD1** — green hex B (#3BAF6A) vs C (#2D9F58). See `color-preview.html` at project root. Lock this before writing any CSS.

---

## Working agreements

- **All 23 Phase 2 decisions are locked.** Do not reopen without explicit discussion.
- Every phase is back-and-forth — do not advance to the next phase without explicit agreement.
- Update `artifacts/handoff.md` and `artifacts/recap.txt` whenever a decision is made, locked, reversed, or a new gap/issue is identified. Do not batch at end of session — update inline.
- Before building any tab, read the relevant sub-schematic in `artifacts/tabs/`.
- Before building anything, check the Issue Tracker in `master-schematics.md` for must-fix items in that area.
- User stories in `master-schematics.md` must be cross-referenced at every build step.

---

## Key conventions

- All weights stored in **lb**, heights in **inches** — convert at display time only via `UserSettingsContext`
- `unitPreference: 'imperial' | 'metric'` — one toggle controls all Layer 1 units
- CSS Modules for all component styles — no global style classes except the base reset in `index.css`
- Service layer is the only place that touches Dexie — components never import `db.ts` directly
- No Redux — page-level `useState` + `useEffect`; `AuthContext`, `UserSettingsContext`, `ActiveWorkoutContext` cover shared state
- Mobile-only layout — 480px max-width enforced at root
- Auto-save on all editable pages except `WorkoutDetailPage` edit mode (explicit Save button)
- Confirm prompts only on destructive actions (delete program, delete workout, discard active session)
