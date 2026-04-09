# HANDOFF — NEW INSTANCE START HERE
Last updated: 2026-04-09 (session 7 — all pre-build decisions resolved, ready to build)

---

## Read These Files First (in order)
1. `artifacts/recap.txt`            — current state, decisions summary, next steps
2. `artifacts/master-schematics.md` — DB schema, service layer, all locked decisions, issue tracker
3. `artifacts/tabs/logs.md`         — Logs tab spec (user flows complete)
4. `artifacts/tabs/programs.md`     — Programs tab spec (user flow complete)
5. `artifacts/tabs/profile.md`      — Profile tab spec (placeholder — no flow for MVP)
6. `artifacts/tabs/statistics.md`   — Statistics tab spec (placeholder — no flow for MVP)
7. `artifacts/UIdesign.txt`         — UI standards, color palette, component specs, design brainstorm
8. `artifacts/coreprocess.txt`      — Development process

---

## Project Info
- GitHub repo: https://github.com/kazi91/workout-tracker-v2 (private)
- CLAUDE.draft.md at project root — rename to CLAUDE.md to activate auto-loading for new instances
- .gitignore created at project root

---

## Build State
No code has been written. Blueprint + UI design standards complete. Pre-build audit complete.

- All decisions locked (#1–23)
- All must-fix issues specced (G2, G3, G7, R2)
- G5 resolved — back navigation destinations locked (ProgramDetailPage → /programs, WorkoutTemplatePage → /programs/:id)
- UIdesign.txt fully expanded — color system, alignment standards, button design standards, light mode palette
- All design questions locked (OD1–OD5). OD1: dark mode #3BAF6A / light mode #2D9F58.
- Pre-build audit complete — all critical gaps resolved:
  - C1: Quick-start log name = "Quick Workout [n+1]"; from-program = workout template name
  - C2: Target hidden on quick-start exercise cards; shown only when workoutId set
  - C3: SignupPage MVP spec locked — name/email/password + unit toggle; auto-login → /logs
  - C4: LoginPage spec stub created at artifacts/tabs/login.md — L1–L4 open questions must be resolved before build step 2
  - C5: ExerciseSearchModal spec locked — instant filter, category chips, custom exercise creation inline
  - C6: Height = single number input, "in" or "cm" label
  - C7: Height/weight blank on Profile = silently valid; note Statistics will require these fields
  - C8: Seed trigger = App.tsx on mount, db.exercises.count() === 0 → seed()
  - C9: No auto-add set after adding exercise — user taps "+ Add Set" manually
- Refer to NEXT STEPS in recap.txt for build order

Session 7 additions (2026-04-09):
  - All pre-build decisions locked: D4 (BrowserRouter), D7 (sequential context init), N3 (UserSettingsContext reads from AuthContext.user), N4 (raw inches + label, ft+in post-MVP)
  - D5 (ErrorContext) deferred for demo — console.error sufficient
  - D8 (unit tests) deferred for demo — Vitest + RTL added post-demo
  - N2 finish flow: full spec confirmed — 4-step state machine, no simplification for demo
  - Model Selection Guide added to CLAUDE.md — Sonnet for most work, Opus for complex reasoning, ask before switching
  - All pre-build gaps resolved. Ready to build.

Session 6 additions (2026-04-09):
  - Full cross-artifact gap audit — 4 new planning gaps (N1–N4) added to Issue Tracker in master-schematics.md
  - D2 specced: previousWeight/previousReps lookup algorithm defined for LogSetService.add()
  - D3 resolved: ExerciseSearchModal uses onSelect callback prop
  - D4, D5, D7, D8: recommendations in recap.txt; need user confirmation before relevant build steps
  - L1–L4 resolved in login.md; M1–M4 resolved in logs.md
  - B1 updated: finish flow also fails with deleted template — treat as quick-start; handle at build step 5
  - programs.md ProgramDetailPage corrected to use getCountsByProgramId (R1 spec fix applied)
  - login.md Services Used corrected: AuthService.login() not UserService.findByEmail()
  - CLAUDE.md session start updated: mandatory (recap + tab file) vs reference-only (master-schematics, UIdesign)

Session 5 additions:
  - CLAUDE.md updated: new instance now surveys src/ before acting if code exists
  - artifacts/tabs/login.md created — stub with L1–L4 open questions; resolve before build step 2
  - Developer gap review complete — D1–D8 added to recap.txt pre-build gaps
  - D1 resolved: Dexie schema string locked (no compound indexes) — see master-schematics.md DB section
  - D6 resolved: cascade delete order locked for all 3 paths — see service layer in master-schematics.md
  - R1 resolved: getCountsByProgramId added to WorkoutExerciseService — replaces N+1 pattern
  - B1 added to Issue Tracker: dangling workoutId on program delete — display layer must null-check
  - D2, D3, D4, D5, D7, D8 remain open — tagged with build step in recap.txt

Do not re-open planning decisions unless the user explicitly raises them.

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

## UI Standards Summary (UIdesign.txt — session 4)
These are locked. Do not redesign around them.

- Nature theme: color evokes natural world — felt, not illustrated (no leaf icons etc.)
- Colors: Green=action, Gold=achievement, Red=danger, White=content — strict, no mixing
- Surface tints: #1A1A17 / #242420 / #2E2E29 (warm undertone locked)
- Text tiers: #FFFFFF primary / #C0C0C0 label (card descriptors) / #8A8A8A secondary / #4A4A4A disabled
- Nav: 14px labels, 2px accent line above active tab
- Alignment: page titles + focal-point content centered; multi-element lists/rows left-aligned
- Buttons: 44px min height, flat, no gradients, title case, 15px/600 — see section 8 in UIdesign.txt
- Light mode: palette locked for post-MVP, values in UIdesign.txt section 4c

## Rejected Options — Do Not Re-Propose
These were explicitly discussed and rejected. Do not raise them again unless the user does first.

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
Update `handoff.md` and `recap.txt` whenever a decision is made, locked, or reversed — without waiting to be asked.
