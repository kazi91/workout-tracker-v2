# Seed Tagging Principles

Working reference for Sessions 45a–f (seed re-curation). Purpose: prevent drift across 213 entries by encoding rules that cascade from ~30 decisions down to all entries.

Status: draft, session 44 (2026-04-23). Living doc — update as exceptions surface during curation.

**Related:**
- [artifacts/exercise-bank.md](exercise-bank.md) — library catalog + Parent/Variant Rule
- `memory/project_ce1_final_scope.md` — D1–D9 taxonomy locks (memory lives outside the repo — see CLAUDE.md "auto memory" section for path)
- `master-schematics.md § Muscle Taxonomy Model` — schema + helpers (MUSCLE_LABELS, SECONDARY_VOLUME_MULTIPLIER, getExerciseGroup)

---

## How to use

1. Before each Session 45 sub-session: re-read this doc top to bottom (~5 min).
2. For each exercise, apply the decision order: **Primary → Secondaries → Roles → parentExerciseId → Tier 3 fields**.
3. When a rule conflicts with an exercise's reality, tag the exception inline in `seed-draft.md` with a one-line rationale (see Exception log format at bottom). Flag for end-of-session audit.
4. At end of each sub-session, run the Sanity checks below.

---

## Fields being tagged

| Field | Source | This cycle? |
|---|---|---|
| `primaryMuscles: Muscle[]` | D3 | yes — mandatory |
| `secondaryMuscles: {muscle, role}[]` | D3 + D4 | yes — mandatory |
| `parentExerciseId: number \| null` | CE2 | yes — for variants only |
| `equipment: string \| null` | Tier 3 forward-compat | yes — always populate |
| `gripWidth`, `gripOrientation` | Tier 3 | opportunistic |
| `stanceWidth` | Tier 3 | opportunistic |
| `bias` | Tier 3 | yes for named-bias variants (Paused, Tempo, Partial, etc.) |
| `jointLoad: string[]` | Tier 3 | skip — stays `[]` this cycle |

Schema note: all Tier 3 fields are `string | null` (or `string[]`) — no enum constraint locked. Values in tables below are conventions, not types. Typos will be silent; rely on manual consistency + the value conventions in the Tier 3 section.

---

## Rule 1 — Primary muscle selection

Primary = muscle(s) that generate force, limit the lift, and whose failure = rep fails.

- Typical count: **1** primary.
- **Co-primary (2 primaries)** allowed when EMG supports AND anatomy agrees. Canonical examples:
  - Deadlift: `glutes`, `hamstrings`
  - Bulgarian Split Squat: `quads`, `glutes`
  - Pull-Up: `lats`, `upperBack`
  - Chin-Up: `lats`, `biceps` (EMG-supported shift vs pronated)
- **3+ primaries: reject.** Pick the two strongest. If you can't, re-read the exercise.
- **Tiebreak rule (first primary wins):** order primaries by proportional contribution; the first element drives `getExerciseGroup()` output. Locked per Decision #24.
- Background muscles (`neck`, `rotatorCuff`) are **never** primaries.

## Rule 2 — Secondary muscle selection

Secondary = worked meaningfully, but movement continues if this muscle fails (with reduced output).

- Typical count: **2–5** secondaries. More than 5 = over-tagging signal.
- **Exclusion test:** *Would this muscle's absence actually reduce output on this specific lift?* If the muscle is only working because it's a standing/braced movement, don't tag.
- **Order matters** — UI displays in declared order. Put highest-contribution secondary first.
- No hard cap in schema. A 7+ list means you've lost discipline.

### Execution standard — normal competent execution (session 45a addendum)

Tag secondaries per **normal competent execution** — muscles legitimately engaged when a typical user performs the lift with good-but-imperfect form.

- **DO tag:** stabilizers that hold position under correct execution (e.g., front delts isometrically holding elbow on a tricep pushdown; upper traps on lateral raises above 90°; abs anti-extending on axial-loaded standing curls).
- **DON'T tag:** muscles that only activate via form breakdown or cheating (e.g., front delts recruited via shoulder-cheating on a pushdown; low back on momentum-based curls).
- **Judgment rule:** *Is this muscle engaged because the exercise is being done right, or because it's being done wrong?* Right = tag. Wrong = skip.
- Strict-biomechanics baseline still governs; this addendum layers in realistic stabilizer recognition without rewarding compensation patterns.

## Rule 3 — Role assignment (synergist vs stabilizer)

Per D4 B-lite: every secondary gets `role: 'synergist' | 'stabilizer'`. Both at 0.5× multiplier this cycle; role exists for future calibration.

- **Synergist** = actively shortens/lengthens during the rep to contribute force along the movement plane. E.g., triceps in bench press (elbow extension), rear delts in row (horizontal shoulder abduction).
- **Stabilizer** = works isometrically (or near-iso) to hold joint/body position against load. E.g., rotator cuff in bench press, obliques in overhead press, forearms in deadlift (grip).

Grey-zone guidance:
- When a muscle does both (forearms in barbell row = grip + some elbow-flex assist) → pick the **dominant role** for that specific lift.
- When in doubt, default to **stabilizer** (conservative — less noise for future synergist-specific stats).

## Rule 4 — Parent/Variant inheritance

Per exercise-bank.md's Parent/Variant Rule: *variant shares parent's muscle map; different map = separate exercise (not a variant).*

- Variant row in seed-draft.md: set `parentExerciseId`, write `// inherit from parent` for muscles/roles. Don't restate the full map.
- Minor stimulus changes that **don't** change map → inherit:
  - Paused Squat = same map as Squat (timing variant)
  - Front Squat = same map (emphasis shift, not map shift)
  - Hack Squat = same map
  - Tempo Bench = same map
- Map-changing divergence → **not a variant**, tag independently:
  - Close-Grip Bench Press: triceps co-primary → standalone entry, not a Bench variant
  - JM Press: triceps primary, chest de-emphasized → standalone
- When variant diverges slightly but is still a variant, flag inline: `// divergence: [specific reason]`.

## Rule 5 — Background muscles

- `neck` and `rotatorCuff` are **background-only**. Never primaries *(except per Dedicated-cuff-isolation exception below)*. Never surfaced in user-facing picker as a filter target.
- Seed only as secondary with role = `stabilizer`. Appropriate uses:
  - `rotatorCuff` → overhead press family; heavy bench with stability demand; **supine weighted tricep work** (e.g., skull crushers — eccentric shoulder-flexed hold); **bodyweight shoulder-loaded holds** (plank); **open-chain cable fly / crossover work** (multi-plane tension on held arm position); face pull (promoted to **synergist**, not stabilizer — active external rotation is the signature movement)
  - `neck` → heavy shrugs, loaded carries (Farmer's / Overhead), weighted dips with head-bracing
- **Default = don't tag** background muscles. Only include when a concrete rationale exists.
- **Role exception (stab → syn):** `rotatorCuff` is normally stabilizer. Promote to `synergist` only on exercises where the cuff contracts concentrically through ROM. Current library cases: Face Pull (Seed #20 — session 45b) + Overhead Carry (P3 #10 — session 45e).
- **Primary exception — Dedicated cuff isolation (session 45e patch):** `rotatorCuff` may be tagged as **primary** ONLY on exercises where the cuff is the sole prime mover and no other muscle meaningfully drives the rep. Current library cases: Cable External Rotation (P2 #19) + Dumbbell External Rotation (P2 #20). Group derivation for these entries: `shoulders` (picker grouping default — cuff remains excluded from muscle-target filter chips, but exercises group under Shoulders for catalog browsing).

## Rule 6 — Exclusion defaults (what NOT to tag)

Muscles frequently over-tagged. Apply the exclusion test.

| Muscle | Tag when | Don't tag when |
|---|---|---|
| `abs` | Direct flexion / anti-extension; heavy overhead load; carries; **axial-loaded standing isolation with anti-extension demand** (e.g., standing barbell curl) | Standing compound "because core engages" (without axial anti-extension demand) |
| `obliques` | Direct rotation / anti-rotation; unilateral loaded carry | Standing compounds without asymmetric load |
| `forearms` | Grip is the strength limiter (deadlift, pull-up, heavy carry); direct work | Standing bench press "because you hold the bar" |
| `lowerBack` | Axial load ≥ bodyweight; hip hinge; loaded standing compound | Seated machines; short-lever isolation |
| `hipFlexors` | Leg raise family; direct concentric hip flexion | Walking, squatting, deadlifting (eccentric stretch only) |
| `serratus` | Overhead; reaching past horizontal; true scap-up work | Flat pressing; rows (scap retraction, not upward rotation) |
| `rotatorCuff` | Heavy overhead; heavy pressing with free-path stability demand | Most isolation; fixed-path cable/machine work |

**Heuristic:** if ≥3 of these end up on a single exercise, audit — probably over-tagging.

---

## Default templates per movement pattern

Apply the template as starting point. Override with exercise-specific rationale (logged inline).

### Horizontal push (Bench Press, DB Press, Machine Chest Press, Push-Up, Dip)
- Primary: `chest`
- Secondary: `triceps` (syn), `frontDelts` (syn), `rotatorCuff` (stab)
- Notes: incline/decline shifts weighting, not map. Narrow-grip may add triceps co-primary → standalone entry.

### Vertical push (OHP, Seated DB Press, Machine Shoulder Press, HSPU)
- Primary: `frontDelts`
- Secondary: `sideDelts` (syn), `triceps` (syn), `upperTraps` (syn — upward rotation), `serratus` (syn — scap upward rotation), `rotatorCuff` (stab), `abs` (stab — anti-extension)

### Horizontal pull (Barbell Row, DB Row, Seated Cable Row, T-Bar, Chest-Supported Row)
- Primary: `lats`, `upperBack` (co-primary)
- Secondary: `rearDelts` (syn), `biceps` (syn), `brachialis` (syn), `forearms` (stab — grip), `lowerBack` (stab)

### Vertical pull (Pull-Up, Chin-Up, Lat Pulldown)
- Primary: `lats` (template default — applies to Lat Pulldown and similar cable/machine pulls)
- Secondary: `upperBack` (syn), `biceps` (syn), `brachialis` (syn), `rearDelts` (syn), `forearms` (stab)
- **Pull-Up override (per Rule 1):** Pull-Up is co-primary `lats + upperBack` — bodyweight vertical pull has enough upper-back engagement to earn co-primary status per EMG. When Pull-Up is tagged co-primary, demote `upperBack` out of the secondary list.
- **Chin-Up / Narrow-Grip Pull-Up override:** shift `biceps` to co-primary with `lats` (EMG-supported). Override per exercise.

### Squat pattern (knee-dominant)
- Primary: `quads`
- Secondary: `glutes` (syn), `adductors` (syn), `hamstrings` (syn — small), `lowerBack` (stab), `abs` (stab), `obliques` (stab)
- Notes: Bulgarian Split Squat = `quads` + `glutes` co-primary (unilateral loading shift). Front-squat variants stay single-primary.

### Hinge pattern (hip-dominant: Deadlift, RDL, Good Morning)
- Primary: `glutes`, `hamstrings` (co-primary)
- Secondary: `lowerBack` (stab — or syn on Good Morning), `upperBack` (stab — bar stays close), `forearms` (stab — grip), `adductors` (syn — small)

### Lunge / split stance
- Primary: `quads`, `glutes` (co-primary)
- Secondary: `hamstrings` (syn), `adductors` (syn), `abs` + `obliques` (stab — anti-rotation), `calves` (stab — balance)

### Loaded carry
- Primary: varies by implement placement (Farmer = `forearms` + `upperTraps`; Overhead = `frontDelts` + `rotatorCuff`)
- Secondary: full trunk — `abs`, `obliques`, `lowerBack` (all stab)
- Notes: main place `neck` might legitimately appear (heavy load bracing).

### Olympic lift / ballistic triple extension (session 45g)

Pattern signature: explosive hip-knee-ankle extension (second pull / drive) + grip-and-finish phase (catch in front rack, overhead, or pressed-out lockout). Three sub-patterns within one template family. **Library kinetic-chain ceiling lives here** — Snatch family at 12 sec, Clean & Jerk at 13 sec; both supersede Overhead Carry (P3 #10, 10 sec) as the heaviest-tagged exercises in the library.

**Sub-pattern A — Pulling lifts (Clean / Snatch family + dedicated pulls)**

Base = Hinge template (second pull = ballistic hinge per Garhammer / Häkkinen EMG). Add catch-phase syn for the receive position.

- Primary: `glutes`, `hamstrings` (co-primary — Hinge default)
- Base secondaries (all variants): `quads` (syn — scoop transition + finish), `upperTraps` (syn — explosive shrug = signature OL elevation), `calves` (syn — triple extension finish), `lats` (syn — bar-close cue + bar-drift bail-out), `lowerBack` (stab), `forearms` (stab — grip), `upperBack` (stab — bar stays close)
- Pulls only (no catch): base map = 7 sec
- Clean variants (front rack catch): + `frontDelts` (syn — rack catch) + `abs` (stab — front rack axial) = 9 sec
- Snatch variants (overhead catch): + `frontDelts` (syn — punch-through + lockout) + `triceps` (syn — overhead lockout) + `sideDelts` (syn — high pull abduction + turnover) + `serratus` (syn — overhead scap upward rotation) + `abs` (stab — overhead axial) + `rotatorCuff` (stab — Rule 5 overhead) = 12 sec; promote `upperBack` stab → syn (Poliquin snatch-grip — wider grip = active scap retraction)
- Clean & Jerk: union of Clean variants map + jerk additions (`triceps` syn lockout + `sideDelts` syn vertical-push + `serratus` syn overhead scap + `rotatorCuff` stab Rule 5) = 13 sec [LIBRARY KINETIC-CHAIN CEILING]

**Sub-pattern B — Jerks + Push Press (overhead drive)**

NOT hinge. This is Vertical push template + leg drive. Rep is defined by overhead lockout, not pull power.

- Primary: `frontDelts` single (per OHP precedent — co-primary `[frontDelts, quads]` rejected; leg drive is brief assist, lockout is the rep)
- Secondary: full Vertical push template (`sideDelts` syn, `triceps` syn, `upperTraps` syn, `serratus` syn, `rotatorCuff` stab, `abs` stab) + leg drive (`quads` syn, `glutes` syn, `hamstrings` syn — drive hip extension recruited alongside glutes, `calves` syn — triple extension drive finish) + `upperBack` (stab — bar-stack through dip; bails out forward bar drift, the #1 jerk error) = 11 sec
- Push Press variant: same map; reorder `triceps` first (continuous press through full ROM)
- Split Jerk variant: same map (split-leg catch is balanced bilateral; no oblique add)

**Sub-pattern C — KB ballistic variants**

Base = KB Swing map (NOT barbell-clean derivative — per Tsatsouline framework, KB ballistics are hinge-with-catch).

- Primary: `glutes`, `hamstrings` (co-primary — KB Swing Hinge base)
- Base secondaries: `forearms` (stab — grip on KB handle ballistic), `lowerBack` (stab — hinge axial), `abs` (stab — anti-extension at top lockout), `obliques` (stab — single-arm anti-rotation per Suitcase Carry / Meadows Row / KB SL-DL precedent)
- KB Clean (rack catch): + `frontDelts` (syn — rack receive) + `upperTraps` (syn — finish shrug, real-world execution) + `calves` (syn — triple extension parallel) = 7 sec
- KB Snatch (overhead catch): + `frontDelts` (syn — overhead drive + lockout) + `triceps` (syn — overhead lockout) + `upperTraps` (syn — punch-through finish) + `sideDelts` (syn — early turnover lateral abduction) + `serratus` (syn — overhead scap) + `rotatorCuff` (stab — Rule 5 overhead heavy ballistic single-arm) = 10 sec
- Note: `upperBack` intentionally absent on both KB variants (single-arm offset KB doesn't drive scap-pack against a bar the way barbell does)

### Curl (elbow flexion)
- Primary: `biceps`
- Secondary: `brachialis` (syn), `forearms` (syn — brachioradialis)
- Notes: hammer / neutral / reverse grip → `brachialis` co-primary.

### Extension (elbow extension — tricep work)
- Primary: `triceps`
- Secondary: minimal. `rearDelts` (stab) on overhead variants; `forearms` (stab) on cable pushdowns.
- Notes: resist over-secondary tagging here.

### Isolation — single-joint
- Primary: target muscle
- Secondary: **0 or 1**. Do not tag "everything involved."
- **Exception:** cable fly / crossover work may tag `rotatorCuff` (stab) in addition to the synergist limit — fly work has legitimate multi-plane cuff demand beyond typical isolation. Other isolation exercises stay strict.

---

## Group-specific conventions

### Chest
- `serratus` only on OH / press-past-horizontal variants (Incline Bench at ≥45°; Decline → no serratus).
- Lower vs upper chest = same `chest` primary tag. Don't fracture the group.

### Back
- `lats` + `upperBack` co-primary on horizontal pulls; `lats` single primary on vertical pulls.
- `lowerBack` is almost always stabilizer. Synergist only on Good Morning, 45° Back Extension (spinal extension under load is the movement).
- `upperTraps` vs `lowerTraps` — upper = scap elevation, lower = depression + scap upward rotation. Tag separately.

### Shoulders
- `frontDelts` = all pressing; `sideDelts` = lateral-plane (raises, upright row); `rearDelts` = horizontal abduction / external rotation (rows, reverse flyes, face pulls).
- Default every press to at least `frontDelts + sideDelts + triceps`.

### Arms
- `brachialis` tags on: hammer grip, reverse grip, neutral grip curls.
- `forearms` on curls → synergist (brachioradialis = elbow flexor in mid-prone grip).
- `forearms` on pulls / deadlifts → stabilizer (grip function).

### Legs
- `quads` on all knee-dominant; `hamstrings` + `glutes` on all hip-dominant.
- `adductors` tags on: wide stance, deep squat, lunge variants.
- `abductors` tags on: side-plane work (lateral lunge, hip abduction machine, Copenhagen plank).
- `tibialis` tags on: direct raises only (Tibialis Raise). Not on squats, not on calf raises.

### Core
- `abs` direct work = primary.
- `obliques` direct work = primary.
- `hipFlexors` tags when hip flexion is the driver (Hanging Leg Raise, Captain's Chair, Lying Leg Raise). Not on squats/deadlifts.
- `abs` as secondary only on overhead / carry / anti-extension. Not a default-include on every exercise.

---

## Tier 3 field tagging cadence

| Field | Guidance | Conventional values |
|---|---|---|
| `equipment` | Always populate (pick dominant implement) | `barbell` / `dumbbell` / `machine` / `cable` / `bodyweight` / `smith` / `kettlebell` / `band` / `other` |
| `gripWidth` | Only when implied by exercise name | `narrow` / `medium` / `wide` |
| `gripOrientation` | Populate for curls / rows / pulls | `pronated` / `supinated` / `neutral` / `alternating` |
| `stanceWidth` | Only when implied by exercise name | `narrow` / `shoulder` / `wide` / `sumo` |
| `bias` | Populate for named-bias variants only | `paused` / `tempo` / `partial` / `lengthened` / `peak-contraction` / `explosive` |
| `jointLoad` | Skip. Empty array `[]` on every entry. | — |

---

## EMG reference policy

Research depth scales with priority tier (matches the tiered budget from the strategy brainstorm):

| Tier | Research depth | Citation policy |
|---|---|---|
| 11 parents + Seed + P0 | Heavy — EMG-anchored | Cite source in notes for any non-obvious call |
| P1 | Medium — apply principles | Cite only when overriding a template default |
| P2 + P3 | Medium — anatomy-first | Cite only when overriding |
| P5 variants | Light — inherit from parent | No research |
| P4 | Light — anatomy-default | No research |

**Primary references to trust** (order of preference): Schoenfeld (EMG + hypertrophy studies), Contreras (glute-specific), Boeckh-Behrens (EMG aggregates), peer-reviewed systematic reviews.

**Six-coach consult panel (formalized session 45f, expanded session 45g):** Schoenfeld (EMG / hypertrophy) / Haff (NSCA Olympic-lift authority) / Tsatsouline (hardstyle KB) / Dan John (five-movement framework) / Nuckols (practical strength) / **Poliquin** (strength/structural — added 45g). Apply panel-of-six per entry on novel-pattern lifts (Olympic, KB-ballistic, plyometric, sprint mechanics). Poliquin lens specifically governs: snatch-grip upperBack syn promotion + cuff stab on overhead heavy free-path.

**Secondary references (use with skepticism):** RP, T-Nation, credible YouTube anatomy (JeffNippard, AthleanX with filter).

**Never cite:** aesthetic hot-takes, influencer "I felt it here" claims, single-session n=1 reports.

---

## Sanity checks (end-of-session)

Run before closing any Session 45 sub-session:

- [ ] Every entry has ≥1 primary
- [ ] No primary lists a background muscle (`neck`, `rotatorCuff`)
- [ ] No entry has >2 primaries
- [ ] No entry has >5 secondaries (flag for review; not auto-reject)
- [ ] No muscle appears in both primary and secondary on same entry
- [ ] Every variant has `parentExerciseId` set AND the referenced parent exists in the draft (or is already seeded from an earlier pass)
- [ ] `equipment` populated on every entry this session touched
- [ ] Re-read first + last 3 entries — does tagging style match?

---

## Exception log format

When breaking a principle, log inline in `artifacts/seed-draft.md`:

```
- Close-Grip Bench Press
  primary: [chest, triceps]           // DIVERGENCE: triceps co-primary per EMG (Barnett 1995); standalone, not a Bench variant
  secondary:
    - {frontDelts, synergist}
    - {rotatorCuff, stabilizer}
  equipment: barbell
  gripWidth: narrow
  parentExerciseId: null
```

Surface exceptions to user at end of each session for accept/reject before the session closes.

---

## Open items to populate during Session 45a

- ~~**EMG-supported co-primary claims reference list**~~ — seeded session 45a below (parents only; extend during 45b–f).
- **Override tracker** — separate section listing every entry that broke a template; used for end-of-curation consistency pass.

---

## EMG-supported co-primary claims reference

Living list. Append each entry that gets co-primary treatment during Sessions 45a–f. Format: `Exercise — [muscle, muscle] — rationale / citation`.

### Parents (session 45a)

- **Deadlift (conventional)** — `[glutes, hamstrings]` — Hinge template default; both are major concentric movers through the lift (Escamilla EMG; Schoenfeld aggregate). Glutes peak at lockout, hamstrings dominate mid-range.
- **Dips (bodyweight, neutral torso)** — `[chest, triceps]` — closed-chain bodyweight press; Dickie 2017 + McKean aggregates show chest activation at least matching triceps on neutral-torso default. Group derivation changes from seed Arms → Chest.
- **Pull-Up (pronated, shoulder-width)** — `[lats, upperBack]` — bodyweight vertical pull drives enough upper-back engagement to qualify per Youdas 2010, Lusk 2010 EMG comparatives. Lat Pulldown does NOT get this override (cable-loaded, no bodyweight amplification).
- **RDL (barbell)** — `[glutes, hamstrings]` — Hinge template default; McAllister 2014 confirms both primary. Hamstrings may slightly lead RDL-specific activation, but order kept `[glutes, hamstrings]` per template; both in legs group → no derivation impact.

### Non-parents + missed parent (session 45b)

- **Overhead Press (Seed #17 — missed parent)** — *single-primary* `frontDelts` — co-primary claim rejected. SideDelts + triceps are strong synergists per full Vertical push template, but rep fails when front delts fail (not side delts, not triceps). Listed here as the canonical "rejected co-primary for the vertical press pattern."
- **Chin-Up (P0 #4)** — `[lats, biceps]` — Rule 1 override; supinated grip amplifies biceps to co-primary status vs pronated Pull-Up. Map diverges from Pull-Up parent despite structural variant linkage (parentExerciseId → Pull-Up Seed #7 per CE2 architecture).
- **Bulgarian Split Squat (P0 #5)** — `[quads, glutes]` — unilateral loading shift per Lunge / split-stance template; taxonomy's designated co-primary exemplar for the squat pattern.
- **Hammer Curl (Seed #22)** — `[biceps, brachialis]` — template-default co-primary per Curl template's neutral-grip branch ("hammer / neutral / reverse grip → brachialis co-primary"). Low citation burden — inherent to neutral-grip biomechanics (brachialis dominates at mid-pronation).
- **Hanging Leg Raise (Seed #28)** — `[abs, hipFlexors]` — anatomy alone would be hipFlexors single-primary (direct concentric hip flexion is the driver), but strict-form HLR with posterior pelvic tilt drives meaningful abs work concurrently. Co-primary reflects user training-intent alignment.

### Non-parents (session 45c)

- **Close-Grip Bench Press (P1 #5)** — `[chest, triceps]` — triceps co-primary per Barnett 1995 EMG. Standalone, not a Bench variant (map diverges → Parent/Variant Rule excludes variant relationship). Group derivation stays `chest` per tiebreak (first primary wins) — distinguishes from JM Press (P3 #7, triceps single-primary, group = arms).

### Non-parents (session 45e)

- **Narrow-Grip Pull-Up (P5 #18)** — `[lats, biceps]` — Pull-Up Rule 1 override applied (matches Chin-Up treatment despite pronated grip — narrow grip amplifies biceps recruitment to co-primary). Map diverges from Pull-Up parent (biceps replaces upperBack at co-primary slot); structural variant linkage preserved (parentExerciseId → Pull-Up Seed #7) per CE2 architecture. Closes the EMG-override queue.
- **Reverse Curl (P2 #23)** — `[biceps, brachialis]` — template-default co-primary per Curl template's pronated-grip branch ("hammer / neutral / reverse grip → brachialis co-primary"). Same template-default treatment as Hammer Curl (Seed #22, session 45b). Low citation burden — inherent to pronated-grip biomechanics (brachialis dominates at full pronation).
- **Decline Sit-Up (P2 #31)** — `[abs, hipFlexors]` — codifies the Crunch-vs-Sit-Up map distinction documented in 45b's Crunch entry note: "Sit-Up = different map — hip flexors become co-primary once trunk rises past ~45°." Canonical sit-up-family exemplar.
- **Zercher Carry (P3 #11)** — `[upperBack, biceps]` — unique co-primary; only library entry pairing these as primaries. Reflects Zercher signature: bear-hug isometric demand where biceps holds bar in elbow crook + upper back maintains scap-packed posture against forward gravity load throughout gait.

### Rejected co-primary claims (additional from 45e)

- **Reverse-Grip Lat Pulldown (P5 #16)** — single-primary `lats`. Curl-template-style co-primary `[lats, biceps]` rejected for cable-loaded variant (no bodyweight amplification — same logic as Pull-Up vs Lat Pulldown parent split: Pull-Up gets co-primary override, Lat Pulldown does not).
- **Glute-Ham Raise (P2 #12)** — single-primary `hamstrings`. Co-primary `[hamstrings, glutes]` considered but rejected per Hip Thrust precedent (glutes is meaningful contributor but rep fails when hamstrings give out, not glutes).
- **Dumbbell Pullover (P2 #5)** — single-primary `chest` per conventional categorization. Co-primary `[chest, lats]` considered + rejected as default; back-bias is form variation, not the canonical default. Flagged for end-of-curation audit if user prefers back-primary or co-primary treatment.

### Non-parents (session 45f)

- **Turkish Get-Up (P4 #22)** — `[abs, obliques]` — multi-planar full-body stability lift where trunk control across supine-to-standing phases is rep-limiter; abs drives anti-extension through overhead phases, obliques drives lateral flexion through side-bridge/roll phases. **First library entry pairing `abs` + `obliques` as co-primary.** Rep-fails when trunk control collapses in either plane; shoulder lockout is load-bearing but not the rep-limiter (user-locked, 2026-04-24). Group derivation: `core` (abs-first tiebreak).
- **Sprint (P4 #30)** — `[hamstrings, glutes]` — max-velocity locomotion; ham-dominant hip extension + knee-flex recovery + glute-driven hip extension through gait cycle. Not covered by any existing movement-pattern template (sprint mechanics are distinct from Hinge / Lunge / squat-pattern plyos). **Only library entry tagged with ham-first primary order.** Rationale: hamstring strain is most common sprinting injury — reflects rep-limiter reality per Schoenfeld/Nuckols/Haff panel consensus (2026-04-24).

### Non-parents (session 45g)

- **Power Clean / Hang Clean (P4 #1, #2)** — `[glutes, hamstrings]` per OL Pulling sub-pattern (Hinge base + front-rack catch additions). Same map per Rule 4 (hang start = timing variant). 9 sec each. Canonical Olympic-clean exemplar.
- **Clean & Jerk (P4 #3)** — `[glutes, hamstrings]` per OL Pulling + Jerk union. **13 secondaries — LIBRARY KINETIC-CHAIN CEILING** (supersedes Overhead Carry at 10; Snatch at 12). Only library entry combining two complete OL phases. Six-coach panel consensus per `seed-draft.md` § 45g.
- **Power Snatch / Hang Snatch (P4 #4, #5)** — `[glutes, hamstrings]` per OL Pulling sub-pattern + overhead-catch additions. **12 secondaries — snatch-family library ceiling.** UpperBack syn (not stab) per Poliquin snatch-grip rationale (wider grip = active scap retraction).
- **Push Jerk / Split Jerk / Push Press (P4 #6, #7, #10)** — `frontDelts` single-primary per OL Jerk sub-pattern (Vertical push template + full leg drive: quads + glutes + hams + calves syn). **Co-primary `[frontDelts, quads]` rejected** per OHP precedent (leg drive is brief assist, lockout is the rep — same logic as 45b OHP rejection). 11 secondaries each. Canonical Olympic-jerk exemplar.
- **Clean Pull / Snatch Pull (P4 #8, #9)** — `[glutes, hamstrings]` per OL Pulling sub-pattern (no catch). Cleanest exemplar of base OL Pulling map. 7 sec each. Snatch Pull promotes `upperBack` stab → syn (Poliquin snatch-grip).
- **KB Clean / KB Snatch (P4 #20, #21)** — `[glutes, hamstrings]` per OL KB-ballistic sub-pattern (KB Swing Hinge base + catch additions, NOT barbell-clean derivative — Tsatsouline framework). KB Clean 7 sec; KB Snatch 10 sec.

### Queued for 46+ onward

*Queue empty as of session 45g — all parked entries resolved. Library re-curation complete: 213 → 214 entries (P4 30 → 31 added in 45f; queue clear in 45g).*

### Rejected co-primary claims (for reference)

- **Bench Press (flat barbell)** — chest only. Triceps is significant synergist but rep fails when chest fails, not when triceps fails. Narrow-grip and JM Press are standalone entries, not variants.
- **Squat (high-bar)** — quads only. Glutes substantial but secondary; co-primary would misrepresent the exercise's knee-dominant bias. Front Squat and Low-Bar shift emphasis, not map.
- **OHP / Overhead Press** — `frontDelts` only. SideDelts + triceps strong synergists but not co-primary. Lock during 45b.
- **Lat Pulldown** — `lats` only. UpperBack engaged but to a lesser degree than in bodyweight Pull-Up. Template default stands.
- **Push Jerk / Split Jerk / Push Press (45g)** — `frontDelts` single only. Co-primary `[frontDelts, quads]` considered + rejected — leg drive is a brief assist that launches the bar; rep is defined by overhead lockout, which front delts drive. Same logic as OHP rejection. Group derivation = `shoulders`.

---

## Revision log

- **2026-04-23 (session 44)** — Initial draft. Covers Rules 1–6, movement templates, group conventions, Tier 3 cadence, EMG policy, sanity checks, exception format. EMG co-primary reference list deferred to session 45a population.
- **2026-04-23 (session 45a)** — EMG co-primary reference list seeded: 4 parents locked (Deadlift, Dips, Pull-Up, RDL); 4 future entries queued for 45b–e (Chin-Up, Bulgarian Split Squat, Close-Grip Bench, Narrow-Grip Pull-Up); 4 rejected co-primary claims recorded. Open-items section struck through for EMG list.
- **2026-04-23 (session 45b opening — Poliquin-audit pass)** — (1) Rule 2 gains "Execution standard — normal competent execution" addendum: tag stabilizers under good-but-imperfect form; exclude muscles engaged only via form breakdown. (2) Rule 5 `rotatorCuff` use cases expanded: + supine weighted tricep work (skull crusher), + bodyweight shoulder-loaded holds (plank), + open-chain cable fly / crossover. Role exception added: cuff can be **synergist** on face pull (concentric external rotation is the signature movement). (3) Rule 6 `abs` tag-when column gains "axial-loaded standing isolation with anti-extension demand" (covers standing barbell curl). (4) Isolation template gains cable fly / crossover exception — cuff tag allowed as stabilizer. Retroactive 45a parent changes: Squat +calves, Bench +lats, Dips +upperBack, RDL +abs, Skull Crusher +rotatorCuff, Barbell Curl +abs, Plank +rotatorCuff, Cable Crossover +rotatorCuff (8 total, all stabilizers). Hanging Leg Raise queued for co-primary `[abs, hipFlexors]` treatment in 45b.
- **2026-04-23 (session 45b pt. 1 + pt. 2 CLOSED)** — EMG co-primary reference list updated. "Queued for 45b onward" section split: locked entries (Chin-Up, Bulgarian Split Squat, Hanging Leg Raise) moved to new "Non-parents + missed parent (session 45b)" section. Added: Overhead Press (as canonical rejected co-primary for vertical press pattern); Hammer Curl (template-default co-primary per Curl neutral-grip branch). Remaining queued entries (Close-Grip Bench, Narrow-Grip Pull-Up) kept under "Queued for 45c onward."
- **2026-04-23 (session 45c CLOSED)** — EMG co-primary reference list updated. Close-Grip Bench Press moved from "Queued for 45c onward" → new "Non-parents (session 45c)" section (`[chest, triceps]` per Barnett 1995). "Queued" section renamed to "Queued for 45d onward" and now contains only Narrow-Grip Pull-Up (45e). No rule/template patches this session — 45c applied principles as-written.
- **2026-04-23 (session 45d CLOSED)** — No rule/template patches; no EMG co-primary additions. 45d applied principles as-written. Rule 6 `lowerBack (syn)` exception explicitly exercised on 45° Hyperextension (P1 #51) — only cases in library where lowerBack is promoted to synergist are Good Morning (P2 #13, not yet tagged) and 45° Back Extension. Narrow-Grip Pull-Up remains the sole queued EMG override for 45e.
- **2026-04-23 (session 45e — CLOSED)** — EMG co-primary reference list updated. **New "Non-parents (session 45e)" section** with 4 entries: Narrow-Grip Pull-Up (closes the EMG-override queue per Pull-Up Rule 1 override), Reverse Curl (template-default per pronated-grip Curl branch), Decline Sit-Up (sit-up-family canonical co-primary), Zercher Carry (unique upperBack+biceps signature). **3 new rejected-co-primary entries** added: Reverse-Grip Lat Pulldown (no bodyweight amplification → not Pull-Up override case), Glute-Ham Raise (Hip Thrust-style single-primary), Dumbbell Pullover (chest-default per conventional categorization). Rule 6 `lowerBack (syn)` explicit-exception list filled to capacity: 3 library entries (Good Morning P2 #13, 45° Hyperextension P1 #51, Reverse Hyperextension Machine P2 #42). Rule 5 `rotatorCuff` synergist exception extended: 2 library cases (Face Pull from 45b + Overhead Carry P3 #10). **1 Rule 5 patch APPLIED at close-out:** `rotatorCuff` may now be tagged as **primary** on dedicated cuff-isolation exercises where cuff is the sole prime mover (Cable ER P2 #19 + DB ER P2 #20 — only library cases). Group derivation for these entries = `shoulders` (cuff stays excluded from muscle-target filter chips in picker; exercises group under Shoulders for catalog browsing). User-rejected alternative for Overhead Carry (kept cuff-as-syn, declined cuff-as-primary co-primary). Queued list cleared — no EMG overrides remain for 45f.
- **2026-04-24 (session 45f — CLOSED)** — EMG co-primary reference list updated. **New "Non-parents (session 45f)" section** with 2 entries: Turkish Get-Up `[abs, obliques]` (first library pairing of abs+obliques — multi-planar stability lift per user preference over draft's frontDelts-single); Sprint `[hamstrings, glutes]` (max-velocity locomotion — novel outside any existing template per panel consensus). **"Queued for 46+ onward" section added** with 12 parked entries (Olympic 10 + KB Clean + KB Snatch) pending Olympic-lift template research. **Tier 3 `bias` conventions expanded:** added `explosive` value (introduced by Clap Push-Up P4 #15 as plyo variant of Push-Up). **Parent catalog grows 11 → 12:** Push-Up promoted from seed non-parent to 12th library parent via Clap Push-Up variant linkage (CE2 decision "any parent-level exercise qualifies as parent" — Push-Up default = bodyweight, shoulder-width hands, neutral torso). **Panel-of-coaches consult methodology** introduced by user — 5-coach panel (Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols) applied per entry before proposal. Zero rule/template patches (principles doc applied as-written except for `bias` convention addition). Cross-curation validation pass executed alongside: 14 existing 45a–e overrides re-verified valid; parent/variant FK consistency confirmed across 108-entry corpus; group-derivation spot checks clean.
- **2026-04-24 (session 45g — CLOSED)** — **Major template + panel patch.** (1) **New movement-pattern template codified:** "Olympic lift / ballistic triple extension" with 3 sub-patterns (Pulling = Hinge base + catch additions; Jerk = Vertical push + leg drive; KB-ballistic = KB Swing base + catch additions). Inserted after Loaded carry block. (2) **Six-coach consult panel formalized + expanded:** Poliquin added alongside Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols; panel block added under EMG reference policy. Poliquin lens governs snatch-grip upperBack syn promotion + cuff stab on overhead heavy free-path. (3) **EMG co-primary reference list:** "Non-parents (session 45g)" section added with 6 entry-groups covering all 12 parked OL/KB-ballistic entries (Power/Hang Clean, Clean & Jerk, Power/Hang Snatch, Push/Split Jerk + Push Press, Clean/Snatch Pull, KB Clean/KB Snatch). Push/Split Jerk + Push Press also added to "Rejected co-primary claims" section (`[frontDelts, quads]` rejected per OHP precedent). **"Queued for 46+ onward" section cleared** — no parked entries remain in seed re-curation. (4) **NEW LIBRARY KINETIC-CHAIN CEILING:** Clean & Jerk at 13 secondaries (supersedes Overhead Carry at 10); Power/Hang Snatch at 12 (snatch-family ceiling). (5) **Tagging accuracy lens** formally codified per `feedback_tagging_accuracy.md` (saved 2026-04-24 outside repo per CLAUDE.md auto-memory): correct-execution + common-mistake recruitment scope. NOT extreme edge cases. Drove broad lats-on-OL-pulls + upperBack-stab-on-jerks + calves-on-KB-Clean + sideDelts-on-KB-Snatch additions. **Library re-curation complete:** 213 → 214 entries; all 120 sessions 45a–g entries tagged across 7 sub-sessions.
