# Statistics Tab — Schematic

> **Purpose:** Detailed spec for the Statistics tab. Use this as the source of truth when building or modifying anything under `/statistics`. Cross-reference with master schematic (`artifacts/master-schematics.md`) for DB schema, services, and shared components.
>
> **Last updated:** 2026-04-21 — spec revised post-research session: removed fluff (HRV, hunger rating, arm/thigh circumference, orphaned goal targets); added PR celebration (set-save + finish), post-workout feel rating, Logs tab consistency indicator. Device integration (steps/sleep auto-sync) deferred — evaluate Capacitor as a separate architectural session.

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| /statistics | StatisticsPage | Statistics and progress views |

---

## Current State (MVP)

Placeholder only — tab exists in nav, displays "Coming soon". No data or charts.

---

## Planned Feature Set

> Scope locked in session 26, revised session 32. Tier 1 (existing data) + Tier 2 (new schema). Manual entry only for MVP; device sync (Capacitor + HealthKit/Health Connect) deferred to a dedicated architectural session.

---

## Section 1 — Goals Card

A persistent card at the top of the Statistics page. Shows the user's weight target and derived body composition metrics.

> **Scope note:** Protein, step, and sleep targets were removed — a target field without a tracking loop is decoration. These belong with their respective tracking features (F13 protein, S3 steps, sleep trend) when those are built.

### Fields (inline-editable on the Statistics page)

> **Design note:** Goals Card fields are not locked. Add, remove, or replace any field as research and user needs evolve. The list below reflects current decisions only.

| Field | Type | Storage | Notes |
|-------|------|---------|-------|
| Goal weight | number | `users.goalWeight` (lb, canonical) | Display in user's unit preference |

### Derived display (auto-calculated — no user input)

| Derived metric | Source | Formula |
|----------------|--------|---------|
| Waist-to-hip ratio | Most recent `bodyMetrics` entry with both `waistIn` and `hipIn` set | `waistIn / hipIn` — displayed to 2 decimal places |
| Weight to goal | Most recent `bodyMetrics.weight` vs `users.goalWeight` | `current - goal` — shown as "+ X lb" or "− X lb" from goal |

### UX
- Goal weight: inline edit on tap, auto-save on blur
- Blank = silently valid
- Waist-to-hip ratio: read-only calculated display
- Unit label shown beside goal weight

---

## Section 2 — Body Metrics

Time-series tracking of body composition. One row per entry per date.

### Data model: `bodyMetrics` table

| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | Entry date |
| weight | number | Nullable — stored in lb |
| bodyFatPct | number | Nullable — percentage (e.g. 18.5) |
| waistIn | number | Nullable — stored in inches |
| hipIn | number | Nullable — stored in inches |
| neckIn | number | Nullable — stored in inches; used by Navy formula for body fat % estimate |

> Weight is expected daily. waistIn/hipIn/neckIn are monthly. bodyFatPct is optional — users can enter manually or use "Estimate for me" (Navy formula). Arm/thigh circumference removed — low fill rate, no derived insight beyond the existing recomposition signal.

### Entry UX

- "Log Today" button at top of Body Metrics section
- Opens an inline form — all fields optional except date (defaults to today)
- **Pre-fill from most recent entry:** all measurement fields (weight, bodyFatPct, waistIn, hipIn, neckIn) pre-populate from the most recent saved entry; user only updates what changed; first-ever entry shows blank fields
- If today's entry already exists, form opens in edit mode pre-filled from today's values (no duplicate row created)
- **Body fat %:** manual entry field + "Estimate for me" button
  - "Estimate for me" runs the Navy formula using waist, hip (women), height (from `users`), and neck circumference
  - Result pre-fills the body fat % field — user can accept or override
  - Button disabled if neck or waist data is missing
- Past entries listed in reverse chronological order
- Tap a past entry → edit inline

### Derived displays

| Display | Formula | Notes |
|---------|---------|-------|
| 7-day rolling weight average | Average of all `bodyMetrics.weight` entries in last 7 days | Shown prominently — smooths daily fluctuation |
| Waist-to-hip ratio | `waistIn / hipIn` from most recent entry with both values | Also shown in Goals card |
| Body fat trend | Line chart — `bodyFatPct` over time | Only shown when ≥ 2 entries exist |
| Weight trend | Line chart — weight (7-day average) over time | |

---

## Section 3 — Daily Check-in

One entry per day capturing recovery signals. All fields nullable.

> **Scope note:** HRV removed — wearable-only metric; manual entry provides no value. Hunger rating removed — nutrition app feature, not a gym tracker feature. Energy rating moved to per-workout feel rating (Section 4e) where it's captured at the right moment with far higher fill rate.

### Data model: `dailyCheckins` table

| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | One per day — duplicate date replaces existing |
| sleepHours | number | Nullable — decimal allowed (e.g. 7.5) |
| steps | number | Nullable — manual entry from phone/wearable reading |

### Entry UX

- "Log Today" button at top of Daily Check-in section
- Inline form — all fields optional
- If today's entry exists, form pre-fills (update, not append)
- Steps: number input, labeled "Steps" with note "from phone or wearable"; no derived charts until device sync resolved (S3)

### Derived displays

| Display | Source | Notes |
|---------|--------|-------|
| 7-day average sleep | `dailyCheckins.sleepHours` last 7 days | vs `users.sleepTarget` (if set post-MVP) |
| Sleep trend | Line chart — `sleepHours` over time | |

---

## Section 4 — Workout Performance

All derived from existing `logSets` / `logExercises` / `workoutLogs` — no new tables needed.

### 4a — Overview Dashboard

| Metric | Source | Notes |
|--------|--------|-------|
| Workouts this week | `workoutLogs` count, last 7 days | |
| Workouts this month | `workoutLogs` count, current calendar month | |
| Total workouts | `workoutLogs` count all-time | |
| Current streak | Consecutive weeks with ≥ 1 workout | Week-based, not day-based |
| Last workout | Date + name of most recent `workoutLog` | |
| Weekly adherence rate | Workouts completed / workouts planned | Only meaningful if user has a program |

> **Logs tab consistency indicator:** A condensed summary line ("3 workouts this week · 🔥 5-week streak") is also surfaced on LogsPage below the page title — same `getSummary()` call, no extra service work. Keeps motivation visible in the primary flow.

### 4b — Per-Exercise Progress

- Select an exercise (search/dropdown)
- Line chart: best set weight per session over time (x = date, y = weight in user's unit)
- Toggle: best set weight vs. total session volume (sets × reps × weight)
- Filter: 30 days / 90 days / 365 days / all time
- Data source: `logSets` → `logExercises` → `workoutLogs` filtered by exerciseId + userId + date range

### 4c — Workout Volume Over Time

- Bar chart: total volume per week (default) or per month (toggle)
- Volume = sum of (weight × reps) across all sets in all logs for that period

### 4d — Personal Records (PRs)

Automatically tracked — no user input.

| Record type | Formula | Notes |
|-------------|---------|-------|
| Estimated 1RM | `weight × (1 + reps / 30)` — Epley formula | Best result per exercise across all sessions |
| Max weight | Heaviest single-set weight ever logged | |
| Max reps | Most reps in a single set at any weight | |
| Max volume | Highest `weight × reps` in a single set | |

- List view: all exercises with logged data, sorted by most recent PR date
- Tap exercise → PR history detail + all-time chart

#### PR Celebration — two surfaces

**At set-save (real-time, non-blocking):**
- Fires immediately when a set is saved in WorkoutDetailPage active mode
- `StatisticsService.checkForPR(userId, exerciseId, weight, reps)` — compares against historical best for that exercise across all prior sessions (excludes current session to avoid set-vs-set false positives)
- Returns which records were broken: `{ newMaxWeight, newMaxReps, new1RM, newMaxVolume }`
- UI: brief non-blocking celebration on the set row (glow, badge, or toast) — auto-dismisses; zero friction, user continues workout

**At workout finish (session summary):**
- Collects all PRs flagged during the session
- Displayed as a callout in the finish flow: "You hit 3 PRs this session — Bench Press (1RM), Squat (max weight), Deadlift (max volume)"
- More prominent — attention is fully available at this point

### 4e — Workout Quality Rating

Captured at workout finish — one tap before the user leaves the finish flow.

| Field | Type | Storage | Notes |
|-------|------|---------|-------|
| rating | integer 1–3 | `workoutLogs.rating` (nullable) | 1 = Struggled, 2 = Solid, 3 = Crushed it |

- Three-button tap: **Struggled / Solid / Crushed it**
- Auto-saves on selection — no confirm needed
- Skippable — nullable, no block on finish
- Derived display on Statistics: workout quality trend over time (line or scatter); correlates with volume and sleep when data exists

---

## Section 5 — Recomposition Indicator

A composite signal card confirming body recomposition is occurring.

**Condition:**
- Compound lift strength trending up (best set weight on any tracked lift improving over last 30 days)
- AND waist circumference trending down (most recent `waistIn` < previous entry)

**Display states:**

| State | Display |
|-------|---------|
| Both conditions met | Green callout: "Recomposition confirmed — strength up, waist down." |
| Strength up only | Neutral: "Strength improving. Add waist measurements to confirm recomposition." |
| Waist down only | Neutral: "Waist trending down. Keep logging lifts to confirm muscle retention." |
| Neither / insufficient data | Empty: "Log workouts and body measurements to unlock this signal." |

> Intentionally simple — motivational confirmation, not clinical assessment. Disappears when data is insufficient so it never shows a false negative.

---

## Section 6 — Workout Frequency Heatmap

- GitHub-style calendar heatmap
- Each day cell shaded based on workout count (0 = empty, 1+ = green shaded)
- Tap a day → shows workout names logged that day
- Default: last 12 months, scrollable

---

## Data Requirements Summary

### Schema changes

| Table | Change |
|-------|--------|
| `bodyMetrics` | New table — weight, bodyFatPct, waistIn, hipIn (arm/thigh removed) |
| `dailyCheckins` | New table — sleepHours, steps (HRV and hungerRating removed) |
| `workoutLogs` | Add `rating: number \| null` (nullable — 1 Struggled / 2 Solid / 3 Crushed it) |
| `users` | Add `goalWeight: number \| null` (proteinTarget, stepTarget, sleepTarget removed) |

> Dexie version bump required. All new fields are nullable — existing records unaffected.

### New service methods

| Service | Method | Description |
|---------|--------|-------------|
| `UserService` | `updateGoalWeight(userId, goalWeight)` | Update goal weight on users table |
| `BodyMetricsService` | `getAll(userId)` | All entries ordered by date desc |
| `BodyMetricsService` | `getRecent(userId, days)` | Entries within last N days |
| `BodyMetricsService` | `log(userId, entry)` | Append new entry |
| `BodyMetricsService` | `update(id, entry)` | Edit existing entry |
| `BodyMetricsService` | `delete(id)` | Delete entry |
| `DailyCheckinService` | `getAll(userId)` | All entries ordered by date desc |
| `DailyCheckinService` | `getRecent(userId, days)` | Entries within last N days |
| `DailyCheckinService` | `logToday(userId, entry)` | Upsert — replaces today's entry if exists |
| `DailyCheckinService` | `delete(id)` | Delete entry |
| `StatisticsService` | `getSummary(userId)` | Aggregate counts (workouts this week/month/total, streak) — also used on LogsPage |
| `StatisticsService` | `getExerciseHistory(userId, exerciseId, range)` | Weight/volume over time for one exercise |
| `StatisticsService` | `getVolumeByPeriod(userId, period)` | Weekly or monthly volume totals |
| `StatisticsService` | `getPRs(userId)` | Best sets per exercise — 1RM, max weight, max reps, max volume |
| `StatisticsService` | `checkForPR(userId, exerciseId, weight, reps)` | Real-time PR check at set-save; excludes current session; returns which records broken |
| `StatisticsService` | `getRollingWeightAverage(userId, days)` | N-day rolling average from bodyMetrics |
| `StatisticsService` | `getRecompositionSignal(userId)` | Evaluates strength trend + waist trend; returns signal state |
| `StatisticsService` | `getAdherenceRate(userId, weeks)` | Workouts completed / planned for last N weeks |
| `WorkoutLogService` | `updateRating(id, rating)` | Save post-workout feel rating; called at finish |

---

## Charting Library

| Library | Pros | Cons |
|---------|------|------|
| Recharts | React-native, good docs, composable | Larger bundle |
| Chart.js + react-chartjs-2 | Mature, well-known | Less React-idiomatic |
| Victory | React-focused | Smaller community |
| Lightweight Charts (TradingView) | Very fast, small bundle | Overkill for fitness data |

> **Recommendation: Recharts** — React-idiomatic, covers line/bar/heatmap, no custom canvas required. Confirm before build (P5).

---

## Section 7 — Program Intelligence (Future / Post-MVP)

> All three layers are derivable from the existing schema — no new tables required. Deferred until after the core Statistics build (Sections 1–6) is complete.

Three progressive insight layers that work regardless of whether the user uses formal programs.

---

### 7a — Frequency ("what you actually do")

Pure observation from log history. No inference.

| Metric | Source | Display |
|--------|--------|---------|
| Favorite program | `workoutLogs → workouts → programs`, count by programId | "Your most-used program: Push/Pull/Legs — 34 sessions" |
| Favorite workout | `workoutLogs`, count by workoutId | "Most-logged workout: Pull Day — 14 times" |
| Favorite exercise per category | `logExercises → exercises`, count by exerciseId grouped by category | "Your go-to exercises: Chest → Bench Press (18 sessions), Back → Deadlift (15 sessions)" |
| Exercise frequency by category | Same source — rank all exercises within each category | Bar showing frequency per exercise; surfaces neglected muscle groups visually |

---

### 7b — Current split detection

A **current split** is a contiguous period where the user was primarily running one program. Derived retroactively from log history — no active program concept or schema change needed.

**Detection algorithm:**
- Group `workoutLogs` by week
- A split begins when ≥60% of a week's workouts belong to the same program
- A split ends when that drops below 60% for 2+ consecutive weeks
- Result: `{ programId, startDate, endDate, sessionCount }`

**Example timeline:**
```
Jan 1 – Feb 28:   Push/Pull/Legs split (18 sessions)
Mar 1 – Mar 14:   Gap / quick-starts
Mar 15 – Apr 20:  Strength Basics split (12 sessions)
```

Quick-start users (no programs) produce no splits — the frequency layer (7a) still applies.

**Service method:** `StatisticsService.getCurrentSplits(userId)`

---

### 7c — Efficacy ("what appears to be working")

Per-split signals showing what changed while the user was running a program. Only shown when a split has ≥8 sessions (too few sessions = no meaningful signal).

| Signal | Formula | Source |
|--------|---------|--------|
| PR density | PRs hit ÷ sessions during split | `logSets` → `checkForPR` logic |
| Volume growth | Total volume (last 4 weeks) ÷ total volume (first 4 weeks) of split | `logSets.weight × reps` |
| Consistency rate | Sessions per week during split | `workoutLogs` count by week |
| Recomposition correlation | Weight trend + waist trend during split period | `bodyMetrics` (requires Section 2 data) |

**Display example:**
> "Push/Pull/Legs — Jan to Feb
> 18 sessions · Avg 4.5/week · 6 PRs hit · Volume up 22%"

**Service method:** `StatisticsService.getProgramEfficacy(userId, programId)`

> Efficacy ≠ causation. A split that coincides with a PR streak may reflect good sleep or diet, not the program itself. Display as correlation only — never claim the program caused the result.

---

### 7d — Insight ("what to pay attention to")

Synthesized callouts derived from layers 7a and 7b.

| Insight | Condition | Display |
|---------|-----------|---------|
| Neglected muscle group | A category has no logged exercise in last N days (threshold TBD) | "You haven't logged a leg exercise in 18 days." |
| De facto program inference | ≥20 sessions with enough pattern to reconstruct a weekly structure | "Based on your last 30 sessions, your typical week looks like: Mon — Bench Press, Incline DB… Wed — Deadlift, Pull-Up… Fri — Squat, Leg Press…" |
| Program efficacy ranking | ≥2 programs with ≥8-session splits each | "Programs by effectiveness (PRs/session): 1. Strength Basics 3.2 · 2. Push/Pull/Legs 1.4 · 3. Quick-start 0.8" |

> De facto program inference is the most complex query (most common exercise per day-of-week across last 30 sessions). Build last.

---

### 7e — New service methods (all derivable from existing schema)

| Service | Method | Description |
|---------|--------|-------------|
| `StatisticsService` | `getFavoriteExercises(userId)` | Top exercise per `category`, ranked by `logExercises` frequency |
| `StatisticsService` | `getProgramUsage(userId)` | Session count + avg sessions/week per program, all time |
| `StatisticsService` | `getCurrentSplits(userId)` | Array of `{ programId, startDate, endDate, sessionCount }` derived from log history |
| `StatisticsService` | `getProgramEfficacy(userId, programId)` | PR count, volume delta, consistency rate per split |
| `StatisticsService` | `getNeglectedCategories(userId, thresholdDays)` | Categories with no logged exercise in last N days |

---

## Unit Considerations

- All body measurements stored in canonical units: weight in lb, lengths in inches
- Convert to kg/cm at display time via UserSettingsContext
- Statistics calculations (volume, 1RM, rolling averages, waist-to-hip ratio) operate on stored lb/inch values
- Waist-to-hip ratio is dimensionless — no unit conversion needed

---

## Device Integration Note

Steps and sleep auto-sync are post-MVP. Manual entry is the current path. Capacitor + `@capacitor-community/health` is the recommended approach when the decision is made to go native — it reads from Apple Health (iOS) and Health Connect (Android) without changing the React codebase. Evaluate as a dedicated architectural session before building.

---

## Build Order (when Statistics phase begins)

1. Confirm charting library (Recharts recommended — resolve P5)
2. Schema migration — bump Dexie version; add `bodyMetrics`, `dailyCheckins`; add `users.goalWeight`; add `workoutLogs.rating`
3. Build `BodyMetricsService` + `DailyCheckinService`
4. Build `StatisticsService` query methods (including `checkForPR`)
5. Add `WorkoutLogService.updateRating()`
6. Build Goals card (goal weight input + derived numbers)
7. Build Body Metrics section (entry form + 7-day average + trends)
8. Build Daily Check-in section (sleep + steps entry + 7-day sleep average)
9. Build Recomposition Indicator card
10. Build Overview Dashboard (workout counts, streak — adherence removed; see S4 resolution)
11. Wire Logs tab consistency indicator (getSummary on LogsPage)
12. Build per-exercise progress chart (4b)
13. Build volume over time chart (4c)
14. Build PRs list (4d) + finish flow PR summary
15. Wire real-time PR check at set-save in WorkoutDetailPage (calls checkForPR)
16. Build post-workout feel rating step in finish flow (4e)
17. Build workout quality trend chart on Statistics page
18. Build Frequency Heatmap (most complex — build last)

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Statistics.

| # | Type | Item |
|---|------|------|
| P5 | Planning | Charting library not selected — confirm Recharts before Statistics build begins |
| S1 | Planning | Daily check-in energy/hunger selector UX — closed; both fields removed |
| S2 | Planning | Goal fields location — proteinTarget/stepTarget/sleepTarget removed from Goals card; re-evaluate when their respective tracking features are built |
| S3 | Planning | Device sync (steps, sleep, HRV auto-sync) — deferred; evaluate Capacitor as separate architectural session |
| S4 | Planning | Weekly adherence removed — replaced by Program Intelligence (Section 7). See F20–F25 in master-schematics.md Issue Tracker. |
