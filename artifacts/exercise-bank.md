# Exercise Bank

> **Purpose:** Single source of truth for the exercise library — current seed, priority-ordered expansion list, parent/variant rules, and open decisions. Future home for per-exercise tutorial content.
> **Status:** Research/planning draft. No seed changes until tiers + variant architecture are approved.
> **Last updated:** 2026-04-22 (session 40)

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
- **P5** — Variant entry. Nested under a parent via `parentExerciseId` (pending schema).

**Counts:** Seed=29, P0=8, P1=43, P2=33, P3=11, P4=30, P5=10 → **135 additions, 164 total library.**

---

## Current seed (29)

From [`src/db/seed.ts`](../src/db/seed.ts).

| # | Exercise | Category | Notes |
|---|---|---|---|
| 1 | Bench Press | Chest | Flat barbell, touch-and-go (default) |
| 2 | Incline Bench Press | Chest | Barbell |
| 3 | Dumbbell Fly | Chest | |
| 4 | Push-Up | Chest | |
| 5 | Cable Fly | Chest | |
| 6 | Deadlift | Back | Conventional (default) |
| 7 | Pull-Up | Back | Pronated grip |
| 8 | Barbell Row | Back | |
| 9 | Lat Pulldown | Back | |
| 10 | Seated Cable Row | Back | |
| 11 | Squat | Legs | High-bar back squat (default) |
| 12 | Romanian Deadlift | Legs | |
| 13 | Leg Press | Legs | |
| 14 | Leg Curl | Legs | Lying |
| 15 | Leg Extension | Legs | |
| 16 | Calf Raise | Legs | Standing |
| 17 | Overhead Press | Shoulders | Barbell |
| 18 | Lateral Raise | Shoulders | Dumbbell |
| 19 | Front Raise | Shoulders | |
| 20 | Face Pull | Shoulders | |
| 21 | Barbell Curl | Arms | |
| 22 | Hammer Curl | Arms | |
| 23 | Tricep Pushdown | Arms | |
| 24 | Skull Crusher | Arms | |
| 25 | Dips | Arms | |
| 26 | Plank | Core | |
| 27 | Crunch | Core | |
| 28 | Hanging Leg Raise | Core | |
| 29 | Ab Wheel Rollout | Core | |

---

## P0 — Launch blockers (8)

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Dumbbell Bench Press | Chest | |
| 2 | Incline Dumbbell Bench Press | Chest | |
| 3 | Dumbbell Row | Back | One-arm |
| 4 | Chin-Up | Back | Supinated grip — distinct from Pull-Up |
| 5 | Bulgarian Split Squat | Quads | |
| 6 | Barbell Hip Thrust | Glutes | *Glutes = new category* |
| 7 | Dumbbell Shoulder Press | Shoulders | |
| 8 | Barbell Shrug | Shoulders | |

---

## P1 — Core baseline (43)

Includes Sumo Deadlift and Stiff-Leg Deadlift **graduated from P5** (different muscle maps per Parent/Variant Rule).

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Decline Bench Press | Chest | Barbell |
| 2 | Machine Chest Press | Chest | |
| 3 | Pec Deck | Chest | |
| 4 | Cable Crossover — High | Chest | High-to-low |
| 5 | Close-Grip Bench Press | Chest | Triceps emphasis; also logs as tri work |
| 6 | Chest-Supported Dumbbell Row | Back | |
| 7 | T-Bar Row | Back | |
| 8 | Neutral-Grip Pull-Up | Back | |
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

---

## P2 — Programming depth (33)

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Decline Dumbbell Bench Press | Chest | |
| 2 | Cable Crossover — Mid | Chest | |
| 3 | Cable Crossover — Low | Chest | Low-to-high |
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

---

## P3 — Specialty (11)

| # | Exercise | Muscle / Pattern | Notes |
|---|---|---|---|
| 1 | Meadows Row | Back | Landmine |
| 2 | Pendulum / Belt Squat | Quads | |
| 3 | Sissy Squat | Quads | |
| 4 | B-Stance RDL | Glutes | |
| 5 | Donkey Calf Raise | Calves | |
| 6 | Cable Y-Raise | Shoulders | |
| 7 | JM Press | Triceps | |
| 8 | Wrist Roller | Forearms | |
| 9 | L-Sit Hold | Core | |
| 10 | Overhead Carry | Carries | |
| 11 | Zercher Carry | Carries | |

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

## P5 — Variants (10)

Nested under a parent exercise via `parentExerciseId` (pending schema). Exposure mechanism TBD (see EB2 — chevron expander vs global toggle).

Parent defaults decided session 40:
- **Squat** default = high-bar back squat
- **Deadlift** default = conventional
- **Bench Press** default = flat barbell, touch-and-go

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

---

## Open decisions

| # | Decision | Status |
|---|---|---|
| EB1 | Parent defaults — high-bar (Squat), conventional (Deadlift), flat BB (Bench Press) | **Decided** (session 40) |
| EB2 | Variant exposure — global toggle vs per-category toggle vs chevron expander (no toggle) | **Leaning chevron + no toggle** (session 40) — progressive disclosure by default |
| EB3 | Parent rollup in Stats — per-variant only vs rollup vs both | **Deferred** (session 40) — revisit during Stats build. `parentExerciseId` FK keeps rollup trivial to add later. |
| EB4 | `parentExerciseId` schema addition — timing + planning doc ownership (CE1 sub-decision vs new CE2) | **Open** |
| EB5 | Custom exercises — allow user to set `parentExerciseId` to nest their custom variants under seeded parents | **Open** — nice-to-have, low cost |
| EB6 | P4 toggle categories — naming + default state per category | **Open** — deferred to toggle menu build |
| EB7 | Tutorial content structure — inline here vs per-exercise files under `artifacts/exercises/[slug].md` | **Deferred** (session 40) — start inline; split when the file physically hurts (Karpathy-style) |

---

## Build sequencing (proposed, not locked)

1. Resolve EB4 (schema + planning doc ownership).
2. Seed expansion pass 1 — P0 + P1 as separate exercises (51 entries, 80 total library).
3. Implement `parentExerciseId` + picker chevron expander.
4. Seed expansion pass 2 — P5 variants (10 entries).
5. Seed expansion pass 3 — P2 (33 entries) once CE1 D4/D5 lock.
6. Seed expansion pass 4 — P3 + P4 as toggle system allows.

---

## Tutorial content (inline until it hurts)

> Author per-exercise content below as it's written. When the file outgrows itself, split into `artifacts/exercises/[slug].md` — one file per exercise, same headings. Don't reserve the directory until the first file exists.

---

### Incline Dumbbell Press — Beginner's Guide

*Catalog entry: P0 #2 — Incline Dumbbell Bench Press*

A step-by-step flow you can follow the first time you try this lift.

**Step 1 — Set Up the Bench**
- Angle: 30–45°
- Steeper than 45° turns it into a shoulder press
- This range biases the upper chest without front delts taking over

**Step 2 — Lock In Your Base (Bottom-Up)**

Build a stable platform before you even pick up the dumbbells.
- Feet — planted flat, drive them into the floor
- Glutes — light squeeze (prevents over-arching)
- Core — brace like you're about to get punched
- Head — neutral on the bench, don't crane forward

Think: *stable base, not relaxed legs.*

**Step 3 — Set Your Upper Body (The Non-Negotiable Part)**

This is where most beginners go wrong.
- Shoulder blades: pull down and back — "put them in your back pockets"
- Chest: proud, up toward the ceiling
- Hold this position the entire set. Don't relax at the bottom of any rep.

Why it matters: *protects your shoulders and gives the chest leverage to actually do the work.*

**Step 4 — Grip and Elbow Position**
- Grip: neutral or slightly pronated (palms forward-ish), crush the handles
- Elbows: 30–60° from your torso
  - Too flared → shoulder stress
  - Too tucked → becomes a triceps press
- Wrists stacked over elbows at all times

**Step 5 — The Descent (Lowering the Weight)**

This is where muscle growth happens. Don't rush it.
- Tempo: 2–3 seconds down, controlled
- Depth: until you feel a stretch in the chest — dumbbells around upper/outer chest
- Forearms: vertical at the bottom
- Cue: *"stretch your chest, not your shoulders"*
- Breathe in on the way down

**Step 6 — The Press (Lifting the Weight)**
- Initiate with the chest, not the shoulders
- Cue: *"bring your biceps toward your chest"* (not "push the weight up")
- Path: slight arc inward — wide at the bottom, closer at the top (don't clang them)
- Top: stop just short of lockout to keep tension on the chest
- Breathe out as you press

**Step 7 — Mind-Muscle Cues (If You Don't Feel Your Chest)**

Pick one and focus on it for a full set:
- *"Squeeze your chest to move the weight"*
- *"Imagine hugging a barrel"*
- *"Pull the dumbbells together using your chest"*

**Pre-Set Checklist**

Run through this before every set:
- [ ] Bench at 30–45°
- [ ] Feet planted
- [ ] Shoulder blades pinned down and back
- [ ] Chest up
- [ ] Controlled descent planned
- [ ] Pressing with chest, not shoulders

**Common Mistakes — Fix These First**

| Mistake | Cause | Fix |
|---|---|---|
| Feels like a shoulder press | Bench too steep or elbows flared | Lower angle, tuck elbows slightly |
| Losing shoulder blade position | Relaxing at the bottom | Pin shoulders to bench the whole set |
| Bouncing at the bottom | Too much weight | Lighter weight, slower descent |
| Dumbbells drift forward | Wrist position | Keep wrists stacked over elbows |
| No chest activation | Going too heavy too fast | Lighter weight, slow eccentric, squeeze at top |

**Beginner Programming**
- Reps: 6–12
- Sets: 3–5
- Placement: early in the workout if upper chest is your priority
- Pair with: incline flyes, cable presses

**Once You're Comfortable (Advanced Cues)**

Save these for after the basics feel automatic:
- *"Bend the dumbbells inward"* — creates constant chest tension
- *"Lead with elbows, not hands"* — keeps tension off shoulders
- Tempo: 3 sec down / 1 sec pause / controlled press
- Partial reps at the bottom after your main sets (hypertrophy bonus)

> **Plain English:** Master steps 1–7 first. The advanced cues are small tweaks that only help once the basic movement is solid — using them too early just adds confusion.

---

## Revision log

- **2026-04-22 (session 40)** —
  - Initial draft. Priority tiers P0–P5 established.
  - Sumo DL + Stiff-Leg DL graduated from P5 → P1.
  - Parent defaults decided: high-bar Squat, conventional Deadlift, flat BB Bench.
  - Flattened all tier sections to one-row-per-exercise tables. Corrected counts: 135 additions, 164 total (prior draft miscounted).
  - EB3 deferred. EB2 leaning chevron. EB7 added (tutorial content structure).
