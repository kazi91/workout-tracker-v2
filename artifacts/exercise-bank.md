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

**Counts:** Seed=29, P0=8, P1=44, P2=33, P3=11, P4=30, P5=10 → **136 additions, 165 total library.**

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

## P1 — Core baseline (44)

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
| 44 | Smith Machine Squat | Quads | Rehab / injury-training friendly — fixed bar path, no spotter needed. Separate exercise, not a Squat variant. |

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
| EB2 | Variant exposure — global toggle vs per-category toggle vs chevron expander (no toggle) | **Decided** (session 40) — chevron expander on parent rows + search always indexes variants. No toggle. Progressive disclosure for casuals, 1-tap reach for power users. |
| EB3 | Parent rollup in Stats — per-variant only vs rollup vs both | **Deferred** (session 40) — revisit during Stats build. `parentExerciseId` FK keeps rollup trivial to add later. |
| EB4 | `parentExerciseId` schema addition — timing + planning doc ownership (CE1 sub-decision vs new CE2) | **Architecture decided** (session 40) — add nullable `parentExerciseId: number \| null` to exercises table. Each variant remains its own row with own ID, tutorial file, GIF, and progression history. **Ownership doc still open** (CE1 sub-decision vs new CE2). |
| EB5 | Custom exercises — allow user to set `parentExerciseId` to nest their custom variants under seeded parents | **Open** — nice-to-have, low cost |
| EB6 | P4 toggle categories — naming + default state per category | **Open** — deferred to toggle menu build |
| EB7 | Tutorial content structure — inline here vs per-exercise files under `artifacts/exercises/[slug].md` | **Deferred** (session 40) — start inline; split when the file physically hurts (Karpathy-style) |

---

## Build sequencing (proposed, not locked)

1. Resolve EB4 (schema + planning doc ownership).
2. Seed expansion pass 1 — P0 + P1 as separate exercises (52 entries, 81 total library).
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

### Deadlift (Conventional) — Beginner's Guide

*Catalog entry: Seed #6 — Deadlift (conventional default)*

The king of full-body lifts. Get the setup right and the lift becomes simple. Get it wrong and your lower back pays.

**Step 1 — Bar Position**
- Bar over mid-foot — roughly over your shoelaces
- This is non-negotiable. If the bar is too far forward, you'll pull around your knees instead of straight up.
- Walk up so your shins are about 1 inch from the bar. Don't move the bar — move yourself.

**Step 2 — Stance**
- Feet: hip-width apart (narrower than a squat)
- Toes: straight forward or turned out 5–15°
- Weight: balanced across the whole foot, slight bias toward the heels

**Step 3 — Grip**
- Hinge down (don't squat) and grab the bar just outside your shins
- Grip options:
  - Double overhand — best for learning, limited by grip strength
  - Mixed grip (one over, one under) — stronger hold, save for heavier sets
  - Hook grip — strongest, most uncomfortable at first
- Squeeze the bar like you're trying to bend it

**Step 4 — Set the Body (Bottom-Up Sequence)**

Order matters. Do these in sequence every single rep:
1. Drop hips until shins touch the bar
2. Chest up — proud chest, ribs down (not flared)
3. Lats engaged — *"protect your armpits"* or *"squeeze oranges in your armpits"*
4. Neck neutral — eyes ~6–10 feet in front of you on the floor
5. Take a big breath into your belly and brace hard (think 360° pressure, not just stomach out)

**Step 5 — The Pull (Off the Floor)**
- Cue: *"push the floor away"* — don't think about pulling the bar up
- Bar drags up the shins — should be in contact or within an inch
- Hips and shoulders rise together — if your hips shoot up first, the weight is too heavy or you're not braced
- Keep the bar tight to your body the entire pull

**Step 6 — Lockout (Top of the Lift)**
- Stand tall — hips and knees fully extended
- Squeeze glutes at the top
- Don't: lean back, hyperextend, or shrug the bar up
- Shoulders stay back and down — not rolled forward, not rolled back theatrically

**Step 7 — The Descent**
- Hips back first, then bend knees once the bar passes them
- Control it down — don't drop, don't bounce
- Reset every rep: stand up, breathe, brace, pull. Touch-and-go reps teach bad bracing.

**Pre-Rep Checklist**
- [ ] Bar over mid-foot
- [ ] Shins close to bar
- [ ] Lats tight
- [ ] Big brace
- [ ] Push the floor away

**Common Mistakes — Fix These First**

| Mistake | Cause | Fix |
|---|---|---|
| Lower back rounding | Weak brace or too heavy | Lighter weight, brace harder, lats tight |
| Hips shoot up first | Quads too weak or not engaged off the floor | Push the floor with your legs before the bar moves |
| Bar drifts away from body | Lats not engaged | *"Squeeze oranges in armpits"* cue |
| Hyperextending at the top | Trying to "show" lockout | Stand tall, squeeze glutes, stop |
| Bouncing reps off the floor | Rushing | Full reset every rep as a beginner |

**Beginner Programming**
- Reps: 3–6 for strength, 5–8 for technique building
- Sets: 3–5
- Frequency: 1–2x per week — recovery-heavy lift
- Placement: first or second exercise on a pull/lower day

**Advanced Cues (Later)**
- *"Bend the bar around your shins"*
- *"Spread the floor with your feet"*
- Wedge yourself into the bar — pull the slack out before the lift

> **Plain English:** Deadlift is a push, not a pull. You're pushing the floor down with your legs while holding the bar still. Once that clicks, the lift gets way easier on your back.

---

### Paused High-Bar Squat — Beginner's Guide

*Catalog entry: P5 #6 — Paused Squat (variant of Squat; default Squat = high-bar, so Paused Squat = Paused High-Bar Squat)*

A high-bar squat with a 1–3 second pause at the bottom. Builds raw leg strength and bulletproofs your bottom position.

**Step 1 — Bar Position (High-Bar)**
- Bar sits on top of the traps — across the shelf made by your upper traps when you shrug
- Not on the back of the neck (painful)
- Not low on the rear delts (that's low-bar squat — different lift)

**Step 2 — Set Up Under the Bar**
- Get under the bar with feet directly under hips
- Squeeze shoulder blades together to create the trap shelf
- Grip the bar slightly outside shoulder width — wherever your shoulder mobility allows
- Drive elbows down, not back — keeps the chest up
- Stand up to unrack — don't good-morning it out

**Step 3 — Walk Out**
- Three steps max: back, foot out, foot out, set
- Wasted steps drain energy before the set even starts
- Set feet in your squat stance and don't shuffle

**Step 4 — Stance**
- Feet: shoulder-width or slightly wider
- Toes: turned out 15–30° (find what feels natural)
- Weight: mid-foot, spread across the whole foot

**Step 5 — The Brace**
- Big breath into the belly (not chest)
- Brace 360° — like someone's about to punch your stomach AND lower back
- Hold the brace through the entire rep, including the pause

**Step 6 — The Descent**
- Knees and hips break at the same time (high-bar is a more upright squat than low-bar)
- Knees track over toes — let them come forward, that's correct for high-bar
- Chest stays up — torso stays as upright as your mobility allows
- Depth: hip crease below the top of the knee at minimum
- 2–3 second controlled descent

**Step 7 — The Pause (The Whole Point)**
- Hold the bottom for 1–3 seconds — count it out
- Stay tight — don't relax into the hole
- Stay braced — don't exhale during the pause
- This kills the stretch reflex, so the next part is harder than a normal squat. Expect to use less weight.

**Step 8 — The Drive Up**
- Cue: *"drive your head into the ceiling"* or *"push the floor away"*
- Lead with the chest — if hips shoot up first, you'll fold forward (good morning)
- Knees track over toes the whole way
- Exhale through the hardest part of the rep (the sticking point)

**Pre-Rep Checklist**
- [ ] Bar high on traps
- [ ] Tight upper back
- [ ] Big belly brace
- [ ] Controlled descent
- [ ] Hold the pause without relaxing
- [ ] Drive up with chest leading

**Common Mistakes — Fix These First**

| Mistake | Cause | Fix |
|---|---|---|
| Falling forward at the bottom | Weak upper back or losing brace | Lighter weight, focus on staying braced through pause |
| Hips shoot up out of the hole | Quads weak or chest dropped | Lead with chest, push knees forward |
| Knees cave in | Weak glutes or stance too narrow | Cue *"knees out"*, widen stance slightly |
| Bouncing out of the bottom | Defeating the point of the pause | Slow it down, full count |
| Heels lifting | Ankle mobility or stance too narrow | Try lifters, work ankle mobility |

**Beginner Programming**
- Reps: 3–6 with a 2–3 second pause
- Sets: 3–5
- Load: 70–80% of your normal squat — pause kills your bounce
- Placement: main lift on squat day, or accessory after regular squats
- Frequency: 1x per week is plenty

**Why You'd Bother**
- Forces you to actually be strong out of the hole instead of bouncing
- Exposes weak points (forward lean, weak quads)
- Builds confidence in the bottom position

> **Plain English:** A normal squat lets you use spring tension at the bottom — like a stretched rubber band. Pausing kills the spring, so your muscles have to do all the work from a dead stop. Less weight, way more leg.

---

### Smith Machine Squat — Beginner's Guide

*Catalog entry: P1 #44 — Smith Machine Squat. Separate exercise, not a Squat variant (fixed bar path removes stabilizer involvement). P1 placement reasoning: commonly recommended for injured athletes rebuilding leg strength, since no spotter is needed and the bar can't fall.*

The bar moves on a fixed track. This changes the mechanics — it's not just a "safer barbell squat." Treat it as its own lift.

**Step 1 — Understand What's Different**
- Fixed bar path — bar can only move straight up and down (or on a slight angle, depending on the machine)
- No balance demand — you don't need to stabilize the bar
- Foot position changes everything — you can shift your feet forward or back to bias different muscles

This means: *foot placement is your most important decision.*

**Step 2 — Pick Your Foot Position (Pick One Goal)**

| Goal | Foot Position |
|---|---|
| Quad bias | Feet directly under bar or slightly behind |
| Balanced (most beginners) | Feet ~6 inches in front of bar |
| Glute/hamstring bias | Feet 12+ inches in front of bar (almost a hack squat feel) |

Start with balanced as a beginner. Experiment later.

**Step 3 — Bar Position on Body**
- Across the upper traps (high-bar style)
- Shoulder blades squeezed to create a shelf
- Grip slightly outside shoulder width
- Elbows down, chest up

**Step 4 — Unrack**
- Stand tall, push the bar up slightly, rotate the bar to unhook
- Confirm it's unhooked before squatting (don't ask how I know)
- The hooks will catch you on the way back up if you fail — use that as your safety net

**Step 5 — Set the Brace**
- Big breath into the belly
- Brace 360°
- Hold through the full rep

**Step 6 — The Descent**
- Hips back AND down — but the path is dictated by the bar, so don't fight it
- Depth: hip crease below knee
- 2–3 second controlled descent
- Knees track in line with toes — don't let them cave

If your foot position is forward of the bar, your shins will stay more vertical (less knee stress, more glute/hamstring).

If your feet are under the bar, your knees travel forward more (more quad).

**Step 7 — The Drive Up**
- Push the floor away
- Chest leads, hips follow
- Don't let the fixed bar path trick you into leaning weird — stay stacked under the bar

**Step 8 — Re-Rack**
- Finish the last rep, rotate the bar back into the hooks
- Confirm the catch before letting go

**Pre-Rep Checklist**
- [ ] Foot position matches your goal
- [ ] Bar high on traps
- [ ] Bar unhooked
- [ ] Big brace
- [ ] Controlled descent
- [ ] Drive up without leaning forward

**Common Mistakes — Fix These First**

| Mistake | Cause | Fix |
|---|---|---|
| Forgetting to unhook | Rushing | Always confirm before squatting |
| Lower back pain | Feet too far forward, fighting the bar path | Pull feet back closer to bar |
| Knee pain | Feet too far back, too much forward knee travel | Move feet forward 4–6 inches |
| Feels harder than barbell squat | Fixed path doesn't match your natural groove | Adjust foot position until it feels smooth |
| Heels lifting | Ankle mobility or feet too far back | Move feet forward |

**Beginner Programming**
- Reps: 8–15 (Smith squats shine for hypertrophy work)
- Sets: 3–4
- Placement: accessory after free-weight squats, or main lift if you're training around an injury
- Not a replacement for free squats long-term — but excellent for high-rep leg volume

**When the Smith Squat Is Actually Better**
- High-rep leg pump work
- Training to failure safely (no spotter needed — just rotate the bar)
- Bias-specific work (glute-focused or quad-focused via foot position)
- Rehabbing around minor injuries

> **Plain English:** A regular squat makes your legs and your stabilizer muscles work. The Smith machine takes the stabilizer job away, so your legs get more direct work — but the fixed path can fight your natural movement if your feet are in the wrong spot. Foot position is the dial that fixes everything.

---

### Pull-Ups (Bodyweight or Weighted) — Beginner's Guide

*Catalog entry: Seed #7 — Pull-Up (pronated default; weighted covered via same entry + load tracking)*

The best upper-body pull movement, period. Same setup whether you're using bodyweight or hanging plates from a belt.

**Step 1 — Grip Setup**
- Width: slightly wider than shoulder-width
- Style: pronated (palms facing away) — this is a true pull-up
  - Palms facing you = chin-up (more biceps, easier)
  - Neutral grip (palms facing each other) = easiest on shoulders
- Thumbs: over the bar or wrapped around — personal preference, both work

**Step 2 — The Hang (Starting Position)**
- Full hang — arms extended, but don't go fully passive
- Engage shoulders — pull shoulder blades down and back slightly
- Cue: *"long arms, tight shoulders"*
- Think: don't let your shoulders touch your ears
- This active hang protects your shoulders and starts the lift from a stable position

**Step 3 — Set the Body**
- Squeeze glutes
- Brace core
- Legs: straight down or crossed at the ankles, slight bend at the knees
- Slight hollow body — ribs down, body in a gentle banana-shape forward (not arched back)
- This stops you from kipping (swinging) for momentum

**Step 4 — Adding Weight (If Weighted)**
- Belt: dipping belt with chain, plates loaded onto the chain
- Plate position: in front of you between your legs, not banging your knees
- Start light — add weight in 5 lb jumps until you find a working weight
- Bodyweight + 25 lb is a strong intermediate target. +45 lb is advanced.

**Step 5 — The Pull (Concentric)**
- Cue: *"drive your elbows down to your hips"* — NOT *"pull yourself up"*
- Lead with the chest — chest comes to the bar, not chin to the bar
- Lats do the work, not biceps — biceps assist
- Top position: chin clearly over the bar, chest as close to the bar as you can get
- Don't kip — no leg swing, no body jerk

**Step 6 — The Descent (Eccentric)**
- Lower under control — 2–3 seconds down
- Most growth happens here, especially with weight added
- Don't drop into the hang — protects your shoulders and elbows

**Step 7 — Reset Between Reps**
- Brief active hang at the bottom — don't go fully limp
- Re-engage shoulders before the next pull
- If you're swinging, pause longer to let it settle

**Pre-Rep Checklist**
- [ ] Solid grip
- [ ] Active hang (shoulders engaged)
- [ ] Glutes and core braced
- [ ] Slight hollow body
- [ ] Drive elbows down, not "pull up"
- [ ] Controlled lower

**Common Mistakes — Fix These First**

| Mistake | Cause | Fix |
|---|---|---|
| Kipping (swinging) | Trying to grind out reps you can't do clean | Lower the rep target, do controlled reps only |
| Chin barely clears the bar | Pulling with arms instead of back | *"Chest to bar"* cue, drive elbows down |
| Shoulders feel strained | Going from passive hang to dead hang slam | Active hang at the bottom, controlled descent |
| Elbow pain | Too much volume too fast, or fully passive hang | Reduce volume, keep shoulders packed |
| Stuck halfway up | Weak top portion | Add isometric holds at the top, or band-assisted reps |

**Can't Do a Pull-Up Yet? Build Up With:**

In order of progression:
1. Dead hangs — 3 sets of 20–30 second holds
2. Scapular pulls — hang and just pull shoulder blades down (no arm bend)
3. Negatives — jump to the top, lower yourself slowly (5+ seconds down), 3–5 reps
4. Band-assisted pull-ups — band looped over bar and under your knee
5. Full bodyweight pull-up — start adding reps

Negatives are the fastest way to progress. Do them after your main back work.

**Beginner Programming**

*Bodyweight:*
- Reps: as many as you can with clean form
- Sets: 3–5
- Frequency: 2–3x per week — pull-ups recover fast

*Weighted:*
- Reps: 3–6 for strength, 6–10 for size
- Sets: 3–5
- Progression: add 2.5–5 lb when you hit the top of your rep range across all sets
- Don't add weight until you can do 8+ clean bodyweight reps

**Advanced Cues (Later)**
- *"Pull the bar to your chest, not your chest to the bar"*
- *"Make the bar bend in your hands"*
- Pause at the top for 1 second per rep — brutal for the lats

> **Plain English:** Pull-ups aren't an arm exercise. You're using your back to bring your elbows down — your hands just happen to be holding the bar. When that clicks, you'll feel it the next day in muscles you didn't know you had.

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
