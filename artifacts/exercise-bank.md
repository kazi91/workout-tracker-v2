# Exercise Bank

> **Purpose:** Single source of truth for the exercise library — current seed, priority-ordered expansion list, parent/variant rules, and open decisions. Future home for per-exercise tutorial content.
> **Status:** Research/planning draft. No seed changes until tiers + variant architecture are approved.
> **Last updated:** 2026-04-23 (session 44 2nd follow-up)

---

## Scope

**In scope:**
- Current seeded exercises (29)
- Priority-ordered expansion bank (P0–P5)
- Parent/variant relationships
- Open decisions blocking seed expansion
- Tutorial content per exercise *(starts inline; may split to `artifacts/exercises/[slug].md` if the file outgrows itself)*

**Out of scope:**
- Primary/secondary muscle maps → CE1 (D1/D2/D3 locked, D4/D5 pending)
- Feature-toggle wiring → `memory/project_feature_toggle_menu.md`
- Picker UX architecture → `memory/project_picker_ux_post_build.md`

---

## Parent / Variant Rule

A **variant** shares the same primary/secondary muscle map as its parent. It differs only in execution style, range, or implement geometry.

A **different muscle map = separate exercise**, not a variant.

Derived from CE1 D1/D3 (locked).

**Applied:**
- ✅ Paused Squat — variant of Squat (identical muscle map)
- ✅ Box Squat — variant of Squat
- ✅ Snatch-Grip Deadlift — variant of Deadlift (grip-width only)
- ❌ Front Squat — **separate exercise** (quad/upper-back emphasis shifts meaningfully)
- ❌ Sumo Deadlift — **separate exercise** (adductor/hip emphasis shifts)
- ❌ Stiff-Leg Deadlift — **separate exercise** (hamstring-dominant shift)

---

## Priority tiers — legend

- **P0** — Launch-blocker. Absence is obviously wrong to any trained user.
- **P1** — Core baseline. Present in every competitive app.
- **P2** — Programming depth. Hypertrophy specialization, structural balance, full coverage.
- **P3** — Specialty / niche. High utility for advanced users.
- **P4** — Gated behind feature toggle (Olympic, plyo, KB, conditioning).
- **P5** — Variant entry. Nested under a parent via `parentExerciseId` (CE2 schema locked; bundled into CE1's v3 migration).

**Counts:** Seed=29, P0=9, P1=56, P2=53, P3=11, P4=30, P5=25 → **184 additions, 213 total library.**

*Note: P1 and P2 tables show numbering gaps where entries were moved/deduped in Batch C. Gaps are intentional — renumbering 100+ rows would cost more than it's worth.*

---

## Current seed (29)

From [`src/db/seed.ts`](../src/db/seed.ts).

| # | Exercise | Category | Notes |
|---|---|---|---|
| 1 | Bench Press | Chest | Flat barbell, touch-and-go (default) |
| 2 | Incline Barbell Bench Press | Chest | Flat bench inclined 30–45° |
| 3 | Dumbbell Fly | Chest | |
| 4 | Push-Up | Chest | |
| 5 | Cable Crossover | Chest | Default = mid-height. Parent of Cable Crossover — High (P5 #24) and Cable Crossover — Low (P5 #25). P2 Mid deduped session 40 (was redundant with this default). |
| 6 | Deadlift | Back | Conventional (default) |
| 7 | Pull-Up | Back | Pronated grip |
| 8 | Bent-Over Barbell Row | Back | Continuous-tension (distinct from Pendlay dead-stop and Yates more-upright) |
| 9 | Lat Pulldown | Back | |
| 10 | Seated Cable Row | Back | |
| 11 | Squat | Legs | High-bar back squat (default) |
| 12 | Romanian Deadlift | Legs | |
| 13 | Leg Press | Legs | |
| 14 | Lying Leg Curl | Legs | Machine. Shortened-bias (paired with P1 Seated Leg Curl = lengthened-bias) |
| 15 | Leg Extension | Legs | |
| 16 | Standing Calf Raise (Bodyweight) | Legs | Floor or step. Machine version is P1 #23. |
| 17 | Overhead Press | Shoulders | Barbell |
| 18 | Lateral Raise | Shoulders | Dumbbell |
| 19 | Front Raise | Shoulders | |
| 20 | Face Pull | Shoulders | |
| 21 | Barbell Curl | Arms | |
| 22 | Hammer Curl | Arms | |
| 23 | Tricep Pushdown | Arms | |
| 24 | Skull Crusher | Arms | |
| 25 | Dips | Arms | Compound: triceps + chest + front delts. Parent of Tricep Dips, Chest Dips, Weighted Dip variants. Default = bodyweight, neutral torso. |
| 26 | Plank | Core | |
| 27 | Crunch | Core | |
| 28 | Hanging Leg Raise | Core | |
| 29 | Ab Wheel Rollout | Core | |

---

## P0 — Launch blockers (9)

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Dumbbell Bench Press | Chest | |
| 2 | Incline Dumbbell Bench Press | Chest | |
| 3 | Dumbbell Row | Back | One-arm |
| 4 | Chin-Up | Back | Supinated grip. Structurally a variant of Pull-Up (seed #7) via `parentExerciseId` — tier remains P0 for launch-essential priority. |
| 5 | Bulgarian Split Squat | Quads | |
| 6 | Barbell Hip Thrust | Glutes | *Glutes = new category* |
| 7 | Dumbbell Shoulder Press | Shoulders | |
| 8 | Barbell Shrug | Shoulders | |
| 9 | Dumbbell Curl | Biceps | Standing, basic DB curl. Genuine P0 gap found in audit. |

---

## P1 — Core baseline (56)
*(Numbering gap at #4 from Batch C move to P5 — intentional.)*

Includes Sumo Deadlift and Stiff-Leg Deadlift **graduated from P5** (different muscle maps per Parent/Variant Rule).

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Decline Bench Press | Chest | Barbell |
| 2 | Machine Chest Press | Chest | |
| 3 | Pec Deck | Chest | |
| 5 | Close-Grip Bench Press | Chest | Triceps emphasis; also logs as tri work |
| 6 | Chest-Supported Dumbbell Row | Back | |
| 7 | T-Bar Row | Back | |
| 8 | Neutral-Grip Pull-Up | Back | Structurally a variant of Pull-Up (seed #7) via `parentExerciseId` — tier remains P1 for priority. |
| 9 | Machine Row | Back | |
| 10 | Trap Bar Deadlift | Back | |
| 11 | Sumo Deadlift | Back | Graduated from P5 |
| 12 | Stiff-Leg Deadlift | Back | Graduated from P5 |
| 13 | Front Squat | Quads | |
| 14 | Goblet Squat | Quads | |
| 15 | Hack Squat | Quads | Machine |
| 16 | Walking Lunge | Quads | |
| 17 | Reverse Lunge | Quads | |
| 18 | Step-Up | Quads | |
| 19 | Seated Leg Curl | Hamstrings | Lengthened-bias — distinct from lying |
| 20 | Glute Bridge | Glutes | |
| 21 | Hip Abduction Machine | Glutes | |
| 22 | Hip Adduction Machine | Glutes | |
| 23 | Standing Calf Raise | Calves | Machine |
| 24 | Seated Calf Raise | Calves | Soleus emphasis |
| 25 | Arnold Press | Shoulders | |
| 26 | Machine Shoulder Press | Shoulders | |
| 27 | Cable Lateral Raise | Shoulders | |
| 28 | Rear Delt Pec Deck | Shoulders | Reverse fly |
| 29 | Bent-Over Dumbbell Reverse Fly | Shoulders | |
| 30 | Dumbbell Shrug | Shoulders | |
| 31 | Landmine Press | Shoulders | |
| 32 | EZ-Bar Curl | Biceps | |
| 33 | Preacher Curl | Biceps | |
| 34 | Incline Dumbbell Curl | Biceps | Lengthened-bias |
| 35 | Cable Curl | Biceps | Bar + rope attachments |
| 36 | Overhead Cable Extension | Triceps | Rope |
| 37 | Overhead Dumbbell Extension | Triceps | |
| 38 | Cable Crunch | Core | |
| 39 | Pallof Press | Core | Anti-rotation |
| 40 | Dead Bug | Core | |
| 41 | Bird Dog | Core | |
| 42 | Side Plank | Core | |
| 43 | Hanging Knee Raise | Core | Distinct from Hanging Leg Raise |
| 44 | Smith Machine Squat | Quads | Rehab / injury-training friendly — fixed bar path, no spotter needed. Separate exercise, not a Squat variant. |
| 45 | Machine Assisted Dip | Arms | Assistance machine (kneeling pad reduces bodyweight load). Beginner-friendly. Separate exercise, not a Dips variant (machine removes stabilizer + reduces load). |
| 46 | Iso-Lateral Chest Press | Chest | Plate-loaded (Hammer Strength equivalent). Unilateral option. |
| 47 | Iso-Lateral High Row | Back | Plate-loaded. Pull-down-angle row. |
| 48 | Iso-Lateral Low Row | Back | Plate-loaded. Seated row-angle. |
| 49 | Machine Assisted Pull-Up | Back | Assistance machine (kneeling pad). Direct counterpart to Machine Assisted Dip. |
| 50 | Iso-Lateral Shoulder Press | Shoulders | Plate-loaded. Unilateral option. |
| 51 | 45° Hyperextension | Hamstrings | Back extension bench. Hams + glutes + erectors. |
| 52 | Machine Hip Thrust | Glutes | Dedicated hip thrust machine (no barbell/plate setup needed). |
| 53 | Machine Preacher Curl | Biceps | Plate-loaded or selectorized. |
| 54 | Machine Tricep Extension | Triceps | Seated, selectorized. |
| 55 | Captain's Chair Knee Raise | Core | Back-supported hanging knee raise. Beginner-friendly. |
| 56 | Upright Row | Shoulders | BB/DB/cable. Side delts + traps. Common but technique-sensitive — watch shoulder impingement risk. |
| 57 | Split Squat | Quads | Rear foot flat on floor (distinct from Bulgarian Split Squat where rear foot is elevated). Unilateral. |

---

## P2 — Programming depth (53)
*(Numbering gaps at #2 and #3 from Batch C dedupe/move — intentional.)*

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Decline Dumbbell Bench Press | Chest | |
| 4 | Incline Dumbbell Fly | Chest | |
| 5 | Dumbbell Pullover | Chest | Also back-bias cue |
| 6 | Chest-Supported T-Bar Row | Back | |
| 7 | Pendlay Row | Back | Dead-stop |
| 8 | Inverted Row | Back | |
| 9 | Straight-Arm Pulldown | Back | Cable, lats isolation |
| 10 | Single-Arm Lat Pulldown | Back | |
| 11 | Nordic Curl | Hamstrings | |
| 12 | Glute-Ham Raise | Hamstrings | |
| 13 | Good Morning | Hamstrings | |
| 14 | Single-Leg RDL | Hamstrings | |
| 15 | Dumbbell Hip Thrust | Glutes | |
| 16 | Cable Kickback | Glutes | |
| 17 | Leg Press Calf Raise | Calves | |
| 18 | Machine Lateral Raise | Shoulders | |
| 19 | Cable External Rotation | Shoulders | Rotator cuff |
| 20 | Dumbbell External Rotation | Shoulders | Side-lying |
| 21 | Spider Curl | Biceps | |
| 22 | Concentration Curl | Biceps | |
| 23 | Reverse Curl | Biceps | Brachioradialis |
| 24 | Tricep Kickback | Triceps | |
| 25 | Bench Dips | Triceps | |
| 26 | Wrist Curl | Forearms | *Forearms = new category* |
| 27 | Reverse Wrist Curl | Forearms | |
| 28 | Pallof Chop / Lift | Core | |
| 29 | Hollow Hold | Core | |
| 30 | Russian Twist | Core | |
| 31 | Decline Sit-Up | Core | |
| 32 | Farmer Carry | Carries | *Carries = new category* |
| 33 | Suitcase Carry | Carries | Unilateral |
| 34 | Yates Row | Back | More upright torso than Bent-Over Barbell Row; continuous tension (unlike Pendlay dead-stop). Back-thickness bias. |
| 35 | Smith Machine Bench Press | Chest | Fixed-path bench. High-volume / failure-safe work. |
| 36 | Smith Machine Incline Bench Press | Chest | Fixed-path incline. |
| 37 | Smith Machine Row | Back | Fixed-path bent-over row. Rehab-friendly. |
| 38 | Smith Machine Overhead Press | Shoulders | Fixed-path OHP. Rehab-friendly. |
| 39 | Machine Shrug | Shoulders | Dedicated selectorized shrug machine. |
| 40 | Plate-Loaded Hack Squat | Quads | Distinct from selectorized Hack Squat (#15) — usually different angle/feel. |
| 41 | Vertical Leg Press | Quads | Distinct from 45° Leg Press — more quad-bias, different ROM feel. |
| 42 | Reverse Hyperextension Machine | Hamstrings | Dedicated machine — low-back-friendly posterior work. |
| 43 | Smith Machine Hip Thrust | Glutes | Fixed-path hip thrust workaround. |
| 44 | Machine Glute Kickback | Glutes | Dedicated standing glute machine. |
| 45 | Smith Machine Calf Raise | Calves | Fixed-path calf work — used when no dedicated machine. |
| 46 | Machine Bicep Curl | Biceps | Selectorized seated/standing curl machine. |
| 47 | Seated Tricep Dip Machine | Triceps | Plate-loaded dedicated tricep dip machine (distinct from Machine Assisted Dip — different purpose/loading). |
| 48 | Ab Crunch Machine | Core | Selectorized crunch machine. |
| 49 | Forward Lunge | Quads | Step-forward lunge, step back after each rep. Distinct from Walking Lunge (P1 #16) and Reverse Lunge (P1 #17). |
| 50 | Single-Leg Hip Thrust | Glutes | Bodyweight or barbell. Unilateral hip thrust. Separate exercise from Barbell Hip Thrust (different stabilizer demand). |
| 51 | Single-Leg Smith Machine Hip Thrust | Glutes | Fixed-path unilateral hip thrust. |
| 52 | Single-Leg Machine Hip Thrust | Glutes | Unilateral variant on dedicated hip thrust machine. |
| 53 | Single-Leg Dumbbell Calf Raise | Calves | Unilateral, DB held in working-side hand, off a step for full ROM. |
| 54 | Pendulum Squat | Quads | Dedicated machine (Nautilus Pendulum, Hammer Strength V-Squat equivalents). Pure quad builder with fixed arc. Split from P3 #2 session 40. |
| 55 | Belt Squat | Quads | Weight belt between legs on platform (dedicated belt-squat machine or dip belt + cable). Spine unloaded — training-around-injury friendly. Split from P3 #2 session 40. |

---

## P3 — Specialty (11)
*(Numbering gap at #2 from Batch C Pendulum/Belt split to P2 — intentional.)*

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Meadows Row | Back | Landmine |
| 3 | Sissy Squat | Quads | |
| 4 | B-Stance RDL | Glutes | |
| 5 | Donkey Calf Raise | Calves | |
| 6 | Cable Y-Raise | Shoulders | |
| 7 | JM Press | Triceps | |
| 8 | Wrist Roller | Forearms | |
| 9 | L-Sit Hold | Core | |
| 10 | Overhead Carry | Carries | |
| 11 | Zercher Carry | Carries | |
| 12 | Tibialis Raise | Calves | Anterior shin (tibialis anterior). Standing or seated. Underrated for shin-splint prevention and athleticism. |

---

## P4 — Toggle-gated (30)

Default off. Each gated by its respective feature toggle per `memory/project_feature_toggle_menu.md`.

### Power / Olympic (10)

| # | Exercise | Notes |
|---|---|---|
| 1 | Power Clean | |
| 2 | Hang Clean | |
| 3 | Clean & Jerk | |
| 4 | Power Snatch | |
| 5 | Hang Snatch | |
| 6 | Push Jerk | |
| 7 | Split Jerk | |
| 8 | Clean Pull | |
| 9 | Snatch Pull | |
| 10 | Push Press | |

### Plyometric (7)

| # | Exercise | Notes |
|---|---|---|
| 1 | Box Jump | |
| 2 | Broad Jump | |
| 3 | Depth Jump | |
| 4 | Pogo Hop | |
| 5 | Clap Push-Up | |
| 6 | Medicine Ball Slam | |
| 7 | Medicine Ball Chest Throw | |

### Kettlebell (6)

| # | Exercise | Notes |
|---|---|---|
| 1 | KB Swing | |
| 2 | KB Goblet Squat | |
| 3 | KB Clean | |
| 4 | KB Snatch | |
| 5 | Turkish Get-Up | |
| 6 | KB Single-Leg Deadlift | |

### Conditioning (7)

| # | Exercise | Notes |
|---|---|---|
| 1 | Sled Push | |
| 2 | Sled Pull | |
| 3 | Assault Bike | |
| 4 | Rower | |
| 5 | Ski Erg | |
| 6 | Burpee | |
| 7 | Sprint | |

---

## P5 — Variants (25)

Nested under a parent exercise via `parentExerciseId` (CE2 schema locked; bundled into CE1's v3 migration). Exposure = chevron expander + search indexing (EB2 locked).

Parent defaults:
- **Squat** default = high-bar back squat
- **Deadlift** default = conventional
- **Bench Press** default = flat barbell, touch-and-go
- **Dips** default = bodyweight, neutral torso
- **Pull-Up** default = pronated, shoulder-width grip
- **Lat Pulldown** default = wide-grip pronated
- **Romanian Deadlift** default = barbell, continuous tension
- **Skull Crusher** default = EZ-bar, flat bench
- **Barbell Curl** default = standing, standard straight-bar form
- **Plank** default = front plank on forearms, bodyweight
- **Cable Crossover** default = mid-height, standard pec-fly path

| # | Parent | Variant | Notes |
|---|---|---|---|
| 1 | Bench Press | Paused Bench Press | 1–3s pause at chest |
| 2 | Bench Press | Spoto Press | Pause ~1" above chest |
| 3 | Squat | Low-Bar Back Squat | |
| 4 | Squat | Safety Bar Squat | Requires SSB |
| 5 | Squat | Box Squat | |
| 6 | Squat | Paused Squat | 1–3s pause at bottom |
| 7 | Deadlift | Rack Pull | Partial ROM, pins |
| 8 | Deadlift | Block Pull | Partial ROM, blocks |
| 9 | Deadlift | Deficit Deadlift | Extended ROM |
| 10 | Deadlift | Snatch-Grip Deadlift | Wide grip |
| 11 | Dips | Tricep Dips | Vertical torso, elbows tucked. Triceps emphasis. |
| 12 | Dips | Chest Dips | Forward lean, elbows slightly flared. Chest emphasis. |
| 13 | Dips | Weighted Dip | Belt + plates or DB between ankles. Flag: may be redundant with load tracking on parent Dips entry (Pull-Up precedent uses single entry + weight field). |
| 14 | Lat Pulldown | Close-Grip Lat Pulldown | Narrow overhand grip. |
| 15 | Lat Pulldown | V-Bar Lat Pulldown | Neutral-grip V-bar attachment. |
| 16 | Lat Pulldown | Reverse-Grip Lat Pulldown | Supinated grip — bicep-bias. |
| 17 | Romanian Deadlift | Paused RDL | 1–3s pause at mid-shin. Hamstring-stretch emphasis. |
| 18 | Pull-Up | Narrow-Grip Pull-Up | Hands ~shoulder-width or closer; pronated. |
| 19 | Skull Crusher | Dumbbell Skull Crusher | Can be done with both DBs or one in each hand. |
| 20 | Skull Crusher | Incline Skull Crusher | Bench at slight incline — changes stretch and triceps emphasis. |
| 21 | Barbell Curl | Strict Curl | Back against wall or pad; zero body English. Form variant for strength honesty. |
| 22 | Plank | Knee Plank | Beginner regression — knees on floor instead of toes. |
| 23 | Plank | Weighted Plank | Plate on upper back. Progression variant. |
| 24 | Cable Crossover | Cable Crossover — High | High-to-low path. Mid/lower chest bias. Moved from P1 #4 session 40. |
| 25 | Cable Crossover | Cable Crossover — Low | Low-to-high path. Upper chest bias. Moved from P2 #3 session 40. |

---

## Open decisions

| # | Decision | Status |
|---|---|---|
| EB1 | Parent defaults — high-bar (Squat), conventional (Deadlift), flat BB (Bench Press) | **Decided** (session 40) |
| EB2 | Variant exposure — global toggle vs per-category toggle vs chevron expander (no toggle) | **Decided** (session 40) — chevron expander on parent rows + search always indexes variants. No toggle. Progressive disclosure for casuals, 1-tap reach for power users. |
| EB3 | Parent rollup in Stats — per-variant only vs rollup vs both | **Deferred** (session 40) — revisit during Stats build. `parentExerciseId` FK keeps rollup trivial to add later. |
| EB4 | `parentExerciseId` schema addition — timing + planning doc ownership | **Fully decided and executed** (session 43 architecture → session 44 doc). Architecture: nullable `parentExerciseId: number \| null` on exercises table; each variant keeps own row/ID/tutorial/GIF/progression. Ownership: CE2 — doc exists at `memory/project_ce2_schema_architecture.md` with full schema spec, migration plan (bundled with CE1 v3 bump, 2-pass seed order), variant-UX wiring (chevron + flat search), custom-exercise parent picker (EB5), validation rules (flat one-level hierarchy), and deletion behavior (choice modal for parent-with-variants). Karpathy-check passed: real content from day 1. |
| EB5 | Custom exercises — allow user to set `parentExerciseId` to nest their custom variants under seeded parents | **Decided — allow** (session 43). When creating a custom exercise, user picks an optional parent from existing seeded entries. Custom variants surface in the parent's chevron expander alongside seeded variants. Schema cost: none (field exists from EB4). UX cost: one optional parent-picker dropdown in the custom-exercise form. |
| EB6 | P4 toggle categories — naming + default state per category | **Open** — deferred to toggle menu build |
| EB7 | Tutorial content structure — inline here vs per-exercise files under `artifacts/exercises/[slug].md` | **Decided / executed** (session 43) — split to `artifacts/exercises/[slug].md`, one file per exercise. Template locked at `artifacts/exercises/_template.md` (v2). All 5 inline guides migrated + upgraded to v2. New guides go directly to the exercises/ folder. |

---

## Build sequencing

**CE1 scope lock:** full 213-entry library ships in CE1 (Seed + P0 + P1 + P2 + P3 + P4 + P5). P4 stays toggle-gated at UX (visibility), not at seed presence. See `memory/project_ce1_final_scope.md` for the authoritative scope. `parentExerciseId` schema + variant-UX wiring owned by `memory/project_ce2_schema_architecture.md` (CE2); migration bundled into CE1's Dexie v3 bump.

Three phases: **curation** (data tagging, no code) → **coordination** (CE1+CE2 spec merge) → **build** (schema + UI). Curation must complete before build starts.

### Phase 1 — Curation (Sessions 45a–f, ~13h total, no code)

Applies the rules in [`seed-tagging-principles.md`](seed-tagging-principles.md) across all 213 entries. Output: `artifacts/seed-draft.md` with per-entry tagging (primary, secondaries+role, parentExerciseId, equipment, opportunistic Tier 3 fields). Compiles to `src/db/seed.ts` during the build phase — curation does not touch `src/`.

| Session | Scope | Est | Deliverable |
|---|---|---|---|
| 45a | Principles review + **11 parent muscle maps** (Squat, Deadlift, Bench, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover) + start EMG co-primary reference list | ~1.5h | parents locked; reference list seeded |
| 45b | Standalone Seed + P0 pass (~30 entries) | ~2h | highest-traffic entries tagged with deepest research |
| 45c | P1 upper body (chest / back / shoulders / arms) | ~2.5h | ~30 entries |
| 45d | P1 lower body + core | ~2h | ~26 entries |
| 45e | P5 variants (25, fast — mostly inherit from parents) + P2 + P3 | ~3h | ~89 entries |
| 45f | P4 (30) + end-to-end sanity pass + validation script sketch | ~2h | library-complete draft; overrides audited |

Rationale for ordering:
- **Parents first (45a):** parent muscle maps cascade to ~45 inheriting entries (P5 variants + minor P1 relatives). High leverage from 11 careful decisions.
- **By priority tier, grouped by region:** compounds muscle-knowledge within a session (chest knowledge stays hot across a run of chest exercises); avoids cross-group jumps.
- **P5 late:** deliberately placed after P1 so parents are all locked by the time variants inherit.
- **P4 last:** lowest research depth; UX-gated so accuracy is less critical.

End-of-session per CLAUDE.md: run the sanity checks in `seed-tagging-principles.md`; surface exceptions to user for accept/reject before closing.

### Phase 2 — Coordination (CE1 + CE2 merge)

Single Dexie v3 bump bundles both CE1 and CE2 schema changes (per CE2 plan). No separate migration. Spec patch session 3/3 (if needed) lands the locked decisions into `master-schematics.md` + tab artifacts before the build session starts.

### Phase 3 — Build (Session 47+, code)

1. Dexie v3 schema — add muscle taxonomy fields (`primaryMuscles`, `secondaryMuscles`), `parentExerciseId`, RPE fields (`users.rpeEnabled`, `logSets.rpe`), Tier 3 forward-compat fields; drop `exercises.category`.
2. Migration — nuke + reseed per D8.1 (drops `exercises + logExercises + logSets`).
3. Seed script — 2-pass insertion per CE2 migration plan (parents first, variants second with parent-id lookup).
4. `ExerciseSearchModal` rewrite — new filter UX (Decision #27), custom-create two-step flow + optional parent picker (EB5), chevron expander for variants (CE2 EB2).
5. Custom-exercise `ExerciseService.create()` signature accepts `parentExerciseId`.
6. Exercise deletion — choice modal for parent-with-variants (CE2).
7. Profile tab — RPE toggle (`users.rpeEnabled`).
8. `WorkoutDetailPage` active + edit modes — RPE input on SetRow (gated).
9. Run CE2 migration test checklist.
10. P4 dev-flag gating in picker (feature toggle menu itself is next cycle).

---

## Tutorial content — migrated to `artifacts/exercises/`

> All per-exercise guides now live in `artifacts/exercises/[slug].md`, one file per exercise. Template v2 at [`exercises/_template.md`](exercises/_template.md). New guides go directly there — don't author inline.
>
> **Index of existing guides:**
> - [Bench Press (Flat Barbell, Touch-and-Go)](exercises/bench-press.md) (Seed #1)
> - [Deadlift (Conventional)](exercises/deadlift.md) (Seed #6)
> - [Pull-Ups (Bodyweight or Weighted)](exercises/pull-up.md) (Seed #7)
> - [Squat (High-Bar Back Squat)](exercises/squat.md) (Seed #11)
> - [Overhead Press (Standing Barbell)](exercises/overhead-press.md) (Seed #17)
> - [Incline Dumbbell Press](exercises/incline-dumbbell-press.md) (P0 #2)
> - [Smith Machine Squat](exercises/smith-machine-squat.md) (P1 #44)
> - [Paused High-Bar Squat](exercises/paused-squat.md) (P5 #6)
>
> The short link stubs below exist for catalog cross-reference. They will be removed once the catalog gains native guide-link support.

---

### Incline Dumbbell Press — Beginner's Guide

*Catalog entry: P0 #2 — Incline Dumbbell Bench Press*

→ Moved to [exercises/incline-dumbbell-press.md](exercises/incline-dumbbell-press.md). Upgraded to guide template v2 (tiered cues, "what you should feel," severity column, red flags). Session 43 split per EB7.

---

### Deadlift (Conventional) — Beginner's Guide

*Catalog entry: Seed #6 — Deadlift (conventional default)*

→ Moved to [exercises/deadlift.md](exercises/deadlift.md). Upgraded to guide template v2 (tiered cues, "what you should feel," severity column, red flags, recovery notes). Session 43 split per EB7.

---

### Paused High-Bar Squat — Beginner's Guide

*Catalog entry: P5 #6 — Paused Squat (variant of Squat; default Squat = high-bar, so Paused Squat = Paused High-Bar Squat)*

→ Moved to [exercises/paused-squat.md](exercises/paused-squat.md). Upgraded to guide template v2 (tiered cues, "what you should feel," severity column, red flags, recovery notes). Session 43 split per EB7.

---

### Smith Machine Squat — Beginner's Guide

*Catalog entry: P1 #44 — Smith Machine Squat. Separate exercise, not a Squat variant (fixed bar path removes stabilizer involvement). P1 placement reasoning: commonly recommended for injured athletes rebuilding leg strength, since no spotter is needed and the bar can't fall.*

→ Moved to [exercises/smith-machine-squat.md](exercises/smith-machine-squat.md). Upgraded to guide template v2 (tiered cues, "what you should feel," severity column, red flags). Session 43 split per EB7.

---

### Pull-Ups (Bodyweight or Weighted) — Beginner's Guide

*Catalog entry: Seed #7 — Pull-Up (pronated default; weighted covered via same entry + load tracking)*

→ Moved to [exercises/pull-up.md](exercises/pull-up.md). Upgraded to guide template v2 (tiered cues, "what you should feel," severity column, red flags). Session 43 split per EB7.

---

## Revision log

- **2026-04-22 (session 40)** —
  - Initial draft. Priority tiers P0–P5 established.
  - Sumo DL + Stiff-Leg DL graduated from P5 → P1.
  - Parent defaults decided: high-bar Squat, conventional Deadlift, flat BB Bench.
  - Flattened all tier sections to one-row-per-exercise tables. Corrected counts: 135 additions, 164 total (prior draft miscounted).
  - EB3 deferred. EB2 leaning chevron. EB7 added (tutorial content structure).
  - Tutorial content authored: Incline Dumbbell Press, Deadlift (Conventional), Paused High-Bar Squat, Smith Machine Squat, Pull-Ups. (5 entries total.)
  - Smith Machine Squat added to P1 (#44) as a separate exercise. Rationale: commonly recommended for injured athletes rebuilding leg strength — fixed bar path is safer without a spotter. Total additions now 136, library 165.
  - **EB2 locked** — chevron expander + search. No toggle.
  - **EB4 architecture locked** — `parentExerciseId` FK (Option B). Each variant gets own row / ID / tutorial file / GIF / progression history. Ownership doc (CE1 sub vs new CE2) remains open.
  - **Seed sanity pass (partial):** renamed 5 entries (Incline Bench → Incline Barbell Bench Press, Cable Fly → Cable Crossover, Barbell Row → Bent-Over Barbell Row, Leg Curl → Lying Leg Curl, Calf Raise → Standing Calf Raise (Bodyweight)), updated Dips notes.
  - Added: P1 #45 Machine Assisted Dip, P2 #34 Yates Row, P5 #11–13 Dips variants (Tricep Dips, Chest Dips, Weighted Dip). Counts: 141 additions, 170 total.
  - **Batch A (machines) added** — 24 entries: 10 to P1 (#46–55) and 14 to P2 (#35–48). Covers iso-lateral plate-loaded machines, Smith Machine variants, dedicated hip thrust/glute/curl/tricep machines, hyperextension benches, Captain's Chair. Counts: 165 additions, 194 total library.
  - **Batch B (parent-family variants) added** — 11 entries: P0 #9 Dumbbell Curl; P5 #14–23 (Lat Pulldown: Close-Grip/V-Bar/Reverse-Grip; RDL: Paused RDL; Pull-Up: Narrow-Grip; Skull Crusher: DB/Incline; Barbell Curl: Strict Curl; Plank: Knee/Weighted). Structural notes added to Chin-Up (P0 #4) and Neutral-Grip Pull-Up (P1 #8) pointing to Pull-Up as parent — tiers preserved. Push-Up family deferred per user decision. Counts: 176 additions, 205 total library.
  - **Batch D (standalone gaps) added** — 8 entries: P1 #56 Upright Row, P1 #57 Split Squat; P2 #49 Forward Lunge, P2 #50 Single-Leg Hip Thrust, P2 #51 Single-Leg Smith Hip Thrust, P2 #52 Single-Leg Machine Hip Thrust, P2 #53 Single-Leg DB Calf Raise; P3 #12 Tibialis Raise. Counts: 184 additions, 213 total library. Batch C (Pendulum/Belt split + Cable Crossover restructure) pending user decision.
  - **Batch C executed (Option 1C + 2B):**
    - Pendulum/Belt Squat (P3 #2) split into two P2 entries: P2 #54 Pendulum Squat, P2 #55 Belt Squat. P3 #2 vacated (numbering gap intentional).
    - Cable Crossover restructured as parent + variants per Option 2B: seed #5 Cable Crossover is now the parent (mid-height default). P1 #4 Cable Crossover — High moved to P5 #24 as variant. P2 #3 Cable Crossover — Low moved to P5 #25 as variant. P2 #2 Cable Crossover — Mid deduped (was redundant with seed default).
    - Tier counts: P1 56 (-1), P2 53 (-2 +2 = net 0), P3 11 (-1), P5 25 (+2). Total library unchanged at 213 (+2 Pendulum/Belt split, -1 Cable Mid dedupe, -1 Pendulum/Belt lumped removal = 0 net). Additions unchanged at 184. Intentional numbering gaps left in P1, P2, P3 where entries were moved/deduped.

- **2026-04-22 (session 43 — exercise guide split + template v2)** —
  - **EB7 executed** — all 5 inline tutorial guides migrated to `artifacts/exercises/[slug].md`. Inline sections in this file replaced with one-line link stubs. Reduces exercise-bank.md by ~450 lines.
  - **Guide template v2 locked** at `artifacts/exercises/_template.md`. Built via coaches-panel tier review. S-tier additions: tiered cue blocks (B/I/A), "What You Should Feel" proprioceptive map, severity column in mistakes, red flags section, progression path with stage targets, progression criteria in programming. A-tier: "if it feels off" troubleshooting line, selective confirmation cues, sharpened mistake descriptions, split advanced cues (form vs. intensity), recovery notes for Big-3, deload trigger with plain-English gloss. Skipped B-tier and C-tier (metadata strip, variations table, rename, timeline) to keep guides lean.
  - **5 guides upgraded to v2:**
    - [pull-up.md](exercises/pull-up.md) — first full v2 rewrite (reference implementation)
    - [incline-dumbbell-press.md](exercises/incline-dumbbell-press.md) — migrated + upgraded
    - [deadlift.md](exercises/deadlift.md) — migrated + upgraded (includes Recovery Notes as Big-3 lift)
    - [paused-squat.md](exercises/paused-squat.md) — migrated + upgraded (includes Recovery Notes as squat-family)
    - [smith-machine-squat.md](exercises/smith-machine-squat.md) — migrated + upgraded
  - Template/standards work ran across sessions 42–43. No seed, schema, or catalog changes this session.

- **2026-04-22 (session 43 — decision close-out)** —
  - **EB4-ownership locked: CE2 spin-up.** Rationale: CE1 already past scope threshold (Session 39 note); `parentExerciseId` is an exercise-relationship concern, distinct from CE1's muscle-taxonomy focus. Karpathy-aligned only if CE2 is populated with real content from day 1. Session 44 creates `memory/project_ce2_schema_architecture.md` with schema spec + migration plan + variant-UX wiring.
  - **EB5 locked: allow.** Custom exercises can set optional `parentExerciseId` to any seeded parent. Custom variants surface in the parent's chevron expander alongside seeded variants. Zero schema cost (field exists via EB4), one optional parent-picker dropdown in custom-exercise form.
  - **CE1 scope expanded: all tiers.** Session 43 decision: full 213-exercise library ships in CE1 (Seed + P0 + P1 + P2 + P3 + P4 + P5). P4 stays UX-gated via feature toggle (visibility), not seed-gated. `memory/project_ce1_final_scope.md` to be rewritten session 44 to supersede the prior "library expansion deferred" stance. Build plans (pass 1/2/3/etc.) to be rewritten session 44 now that scope is full-library; stale draft retained in Build sequencing section for reference.
  - **Open decisions remaining:** EB3 (Stats rollup — deferred), EB6 (P4 toggle categories — deferred to toggle menu build). All other EB decisions closed.

- **2026-04-22 (session 44 — CE1/CE2 execution)** —
  - **`memory/project_ce1_final_scope.md` rewritten.** Supersedes "library expansion deferred" stance. New scope = full 213-entry library. Added D-new-4 (library expansion) and D-new-5 (parentExerciseId + variant architecture, owned by CE2). Curation effort estimate updated from ~2 hrs (29 entries) to ~15–20 hrs (213 entries) with tier-based prioritization. "What ships / doesn't ship" lists updated. Related-files block gained CE2 reference + session 43 close-out references (bank + guides).
  - **`memory/project_ce2_schema_architecture.md` created** with real content (Karpathy caveat satisfied). Locks 5 session-44 architecture decisions: (1) secondary index on `parentExerciseId` = yes; (2) deletion = choice modal (cascade or null-orphan); (3) hierarchy = flat (forbid grandchildren); (4) custom parent restriction = any parent-level exercise qualifies (seed or custom); (5) search = direct variant results (no parent grouping). Covers schema spec, v2→v3 migration plan (2-pass seed order, bundled with CE1 v3 bump), validation rules, picker chevron UX, search behavior, custom-exercise parent picker (EB5), deletion flow with choice modal, CE1-build contribution checklist, testing plan.
  - **MEMORY.md index updated** with CE2 pointer and refreshed CE1 description.
  - **Still pending for session 44:** (3) rewrite Build sequencing section here in exercise-bank.md now that CE1 scope is locked full-library; (4) integrate EB5 into custom-exercise form spec (flag profile.md or programs.md update). Optional: more guide drafting using template v2.

- **2026-04-23 (session 44 follow-up — Big-3 + OHP guides)** —
  - **3 new guides authored under template v2** (item 5 from session 44 plan):
    - [squat.md](exercises/squat.md) — Seed #11 (high-bar back squat default; includes Recovery Notes as Big-3 lift)
    - [bench-press.md](exercises/bench-press.md) — Seed #1 (flat barbell touch-and-go default; includes Recovery Notes)
    - [overhead-press.md](exercises/overhead-press.md) — Seed #17 (standing barbell strict press default; includes Recovery Notes + Progression Path)
  - **Tutorial Content index** in this file updated to list all 8 authored guides (re-ordered by tier rank: 5 Seed, 1 P0, 1 P1, 1 P5).
  - **Coverage status:** all 4 classic compound barbell lifts (squat / bench / deadlift / OHP) now have v2 guides. Next-priority gaps remain at Seed and P0 — Bulgarian Split Squat (P0 #5), Barbell Hip Thrust (P0 #6), Dumbbell Row (P0 #3), Chin-Up (P0 #4 — natural pair with pull-up.md), plus remaining Seed entries.
  - **No catalog, schema, or seed changes** — guide-authoring only.

- **2026-04-23 (session 44 follow-up — guide style refresh, all 8 guides + template)** —
  - **Tier 1 universal cuts/adds applied to all 8 guides + `_template.md`:**
    - Cut inline "Severity definitions" boilerplate (~5 lines × 8 guides — values are self-evident in column context)
    - Cut "Plain English on deload" paragraph from Programming sections (~3 lines × 8 — Programming line already in plain English)
    - Cut `**Cues — pick ONE per set:**` labels above cue trios (B/I/A glyphs telegraph the structure)
    - Replaced `## Pre-Rep Checklist` (4–6 redundant bullets) with single `## Mid-set check` callout — preserves the actually-valuable trailing diagnostic line
    - Added `## Quick cues` block (3 bullets, strict cap) at top of every guide — highest-leverage mid-set cues for re-read use
    - Stripped `*Catalog entry: ... — prose ...*` to bare `*Catalog: [tier ref] · Template: v2*` — naming relationships moved to exercise-bank.md (this file)
  - **Tier 2 surgical edits:**
    - `squat.md`: hook stripped of "King of leg lifts. Builds X, Y, Z" filler
    - `bench-press.md`: hook stripped of "Builds chest, shoulders, triceps" filler
    - `overhead-press.md`: hook stripped of "Builds shoulders, triceps, core" filler
    - `deadlift.md`: hook stripped of "King of full-body lifts" filler; added Right when/Wrong when to Step 5 (the pull) — was missing on the highest-failure step; added `Log:` grip used to Programming
    - `pull-up.md`: added `Log:` bodyweight at session — added weight is meaningless without it
    - `incline-dumbbell-press.md`: dropped arbitrary "Pair with: incline flyes, cable crossovers" line from Programming
    - `paused-squat.md`: compressed 8 steps → 6 (folded Walk Out + Stance + Brace into one "Get Into Position" step); added `Log:` pause length used
    - `smith-machine-squat.md`: compressed 8 steps → 6 (folded Bar Position + Unrack + Brace into one "Set Up and Unrack" step); added `Log:` foot position used
  - **Template (`_template.md`) edits:**
    - Catalog/template line shape updated to match
    - Quick cues section added after hook
    - Cue-trio label dropped from Step 5 + Step 6 examples
    - Pre-Rep Checklist section replaced with Mid-set check
    - Severity definitions block dropped from Common Mistakes example
    - Plain English on deload dropped from Programming example
    - `**Log:**` template bullet added (optional, only when there's per-session config that affects meaning of weight/reps)
    - Right when/Wrong when rule strengthened: mandatory on every step a beginner can't visually self-validate (was optional)
    - Tone rules: added italic = cue / bold = key term convention
  - **Net impact:** ~115 lines lighter across 8 guides; ~24 lines added back as Quick cues; one new mid-set value-add per guide.
  - **Skipped:** What You Should Feel ↔ Common Mistakes dedupe (apparent duplicates serve different framings — felt vs visible — pulling them thins the felt-diagnostic block too much; left as-is).
  - **No catalog, schema, or seed changes.**
