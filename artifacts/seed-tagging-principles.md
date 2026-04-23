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

- `neck` and `rotatorCuff` are **background-only**. Never primaries. Never surfaced in user-facing picker.
- Seed only as secondary with role = `stabilizer`. Appropriate uses:
  - `rotatorCuff` → overhead press family, heavy bench with stability demand
  - `neck` → heavy shrugs, loaded carries (Farmer's / Overhead), weighted dips with head-bracing
- **Default = don't tag** background muscles. Only include when a concrete rationale exists.

## Rule 6 — Exclusion defaults (what NOT to tag)

Muscles frequently over-tagged. Apply the exclusion test.

| Muscle | Tag when | Don't tag when |
|---|---|---|
| `abs` | Direct flexion / anti-extension; heavy overhead load; carries | Standing compound "because core engages" |
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
| `bias` | Populate for named-bias variants only | `paused` / `tempo` / `partial` / `lengthened` / `peak-contraction` |
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

- **EMG-supported co-primary claims reference list** — build during 45a as parent maps are locked. Append to this doc as a new section. Each entry gets a short citation or note ("Schoenfeld 2014 EMG" / "Contreras aggregate 2019" / "anatomy inference — no strong EMG").
- **Override tracker** — separate section listing every entry that broke a template; used for end-of-curation consistency pass.

---

## Revision log

- **2026-04-23 (session 44)** — Initial draft. Covers Rules 1–6, movement templates, group conventions, Tier 3 cadence, EMG policy, sanity checks, exception format. EMG co-primary reference list deferred to session 45a population.
