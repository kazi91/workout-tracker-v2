# Statistics Tab — Schematic

> **Purpose:** Detailed spec for the Statistics tab. Use this as the source of truth when building or modifying anything under `/statistics`. Cross-reference with master schematic (`artifacts/master-schematics.md`) for DB schema, services, and shared components.

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

> Scope locked in session 26 (2026-04-18). Tier 1 (existing data) + Tier 2 (new schema). Tier 3 (blood panels, VO₂ max, device sync) explicitly out of scope for general public. Manual entry only for MVP; wearable API integration planned post-MVP.

---

## Section 1 — Goals Card

A persistent card at the top of the Statistics page. Shows the user's targets and auto-calculates derived metrics from body measurements.

### Fields (all inline-editable on the Statistics page)

| Field | Type | Storage | Notes |
|-------|------|---------|-------|
| Goal weight | number | `users.goalWeight` (lb, canonical) | Display in user's unit preference |
| Protein target | number | `users.proteinTarget` (g/day) | Unitless |
| Daily step target | number | `users.stepTarget` | Unitless |
| Sleep target | number | `users.sleepTarget` (hours) | Decimal allowed (e.g. 7.5) |

### Derived display (auto-calculated — no user input)

| Derived metric | Source | Formula |
|----------------|--------|---------|
| Waist-to-hip ratio | Most recent `bodyMetrics` entry with both `waistIn` and `hipIn` set | `waistIn / hipIn` — displayed to 2 decimal places |
| Weight to goal | Most recent `bodyMetrics.weight` vs `users.goalWeight` | `current - goal` — shown as "+ X lb" or "− X lb" from goal |

### UX
- All goal fields: inline edit on tap, auto-save on blur (same pattern as Profile)
- Blank = silently valid — user fills in over time
- Waist-to-hip ratio: read-only calculated display, not an input
- Unit labels shown beside goal weight ("lb" or "kg" from UserSettingsContext)

---

## Section 2 — Body Metrics

Time-series tracking of body composition measurements. One row per entry per date. User can log multiple entries over time and see trends.

### Data model: `bodyMetrics` table

| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | Entry date (one per day recommended; multiple allowed) |
| weight | number | Nullable — stored in lb |
| bodyFatPct | number | Nullable — percentage (e.g. 18.5) |
| waistIn | number | Nullable — stored in inches |
| hipIn | number | Nullable — stored in inches |
| armIn | number | Nullable — stored in inches |
| thighIn | number | Nullable — stored in inches |

> All measurements stored in inches/lb — convert to cm/kg at display time via UserSettingsContext. Only `weight` is expected to be logged frequently (daily). Other fields are monthly entries.

### Entry UX

- "Log Today" button at top of Body Metrics section
- Opens an inline form (not a modal) with all fields — all optional except date (defaults to today)
- Save → appends a new `bodyMetrics` row
- Past entries listed below in reverse chronological order (date, weight, any measurements logged)
- Tap a past entry → edit inline (same form, pre-filled)

### Derived displays

| Display | Formula | Notes |
|---------|---------|-------|
| 7-day rolling weight average | Average of all `bodyMetrics.weight` entries in last 7 days | Shown prominently; smooths daily fluctuation noise |
| Waist-to-hip ratio | `waistIn / hipIn` from most recent entry with both values | Also shown in Goals card |
| Body fat trend | Line chart — `bodyFatPct` over time | Only shown when ≥ 2 entries exist |
| Weight trend | Line chart — weight (7-day average) over time | |
| Limb circumference trend | Line chart — arm and thigh over time | Only shown when ≥ 2 entries exist |

---

## Section 3 — Daily Check-in

One entry per day capturing recovery and behavioral signals. Entirely optional — all fields nullable.

### Data model: `dailyCheckins` table

| Field | Type | Notes |
|-------|------|-------|
| id | auto | Primary key |
| userId | number | FK → users |
| date | Date | Entry date — one per day; duplicate date replaces existing |
| sleepHours | number | Nullable — decimal allowed (e.g. 7.5) |
| energyRating | number | Nullable — integer 1–10 |
| hungerRating | number | Nullable — integer 1–10 |
| hrv | number | Nullable — ms; manual entry from wearable reading |
| steps | number | Nullable — integer; manual entry or future device sync |

### Entry UX

- "Log Today" button at top of Daily Check-in section
- Inline form — all fields optional
- If an entry already exists for today, form pre-fills with current values (update, not append)
- Sleep hours: number input with "hrs" label
- Energy and hunger: 1–10 selector (tap chips or stepper — TBD at build)
- HRV: number input, labeled "HRV (ms)" — shown with note: "from wearable app"
- Steps: number input — shown with note: "from phone or wearable"

### Derived displays

| Display | Source | Notes |
|---------|--------|-------|
| 7-day average sleep | `dailyCheckins.sleepHours` last 7 days | vs `users.sleepTarget` |
| 7-day average energy | `dailyCheckins.energyRating` last 7 days | Trend direction indicator |
| 7-day average hunger | `dailyCheckins.hungerRating` last 7 days | High average (≥ 7) = warning: "deficit may be too aggressive" |
| 7-day average steps | `dailyCheckins.steps` last 7 days | vs `users.stepTarget` |
| HRV trend | Line chart — `hrv` over time | Only shown when ≥ 5 entries exist |
| Sleep trend | Line chart — `sleepHours` over time | |

---

## Section 4 — Workout Performance

All derived from existing `logSets` / `logExercises` / `workoutLogs` — no new schema needed.

### 4a — Overview Dashboard

| Metric | Source | Notes |
|--------|--------|-------|
| Workouts this week | `workoutLogs` count, last 7 days | |
| Workouts this month | `workoutLogs` count, current calendar month | |
| Total workouts | `workoutLogs` count all-time | |
| Current streak | Consecutive weeks with ≥ 1 workout | Week-based, not day-based (more realistic) |
| Last workout | Date + name of most recent `workoutLog` | |
| Weekly adherence rate | Workouts completed / workouts planned (from programs) | Shown as % — only meaningful if user has a program |

### 4b — Per-Exercise Progress

- Select an exercise (search/dropdown)
- Line chart: best set weight per session over time (x = date, y = weight in user's unit)
- Toggle: best set weight vs. total session volume (sets × reps × weight)
- Filter: last 30 days / 90 days / 6 months / all time
- Data source: `logSets` → `logExercises` → `workoutLogs` filtered by exerciseId + userId + date range

### 4c — Workout Volume Over Time

- Bar chart: total volume per week (default) or per month (toggle)
- Volume = sum of (weight × reps) across all sets in all logs for that period
- Data source: all `logSets` for user's logs, grouped by week/month

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

---

## Section 5 — Recomposition Indicator

A composite signal card that confirms body recomposition is occurring — the core insight from the research.

**Condition:** Recomposition is confirmed when:
- Compound lift strength is trending up (best set weight on any tracked lift improving over last 30 days)
- AND waist circumference is trending down (most recent `waistIn` < previous entry)

**Display states:**

| State | Display |
|-------|---------|
| Both conditions met | Green callout: "Recomposition confirmed — strength up, waist down." |
| Strength up only | Neutral: "Strength improving. Add waist measurements to confirm recomposition." |
| Waist down only | Neutral: "Waist trending down. Keep logging lifts to confirm muscle retention." |
| Neither / insufficient data | Empty: "Log workouts and body measurements to unlock this signal." |

> This card is intentionally simple — it is a motivational confirmation tool, not a clinical assessment. It disappears when data is insufficient so it never shows a false negative.

---

## Section 6 — Workout Frequency Heatmap

- GitHub-style calendar heatmap
- Each day cell shaded based on workout count (0 = empty, 1+ = green shaded)
- Tap a day → shows workout names logged that day
- Default: last 12 months, scrollable

---

## Data Requirements Summary

### New tables needed

| Table | Purpose |
|-------|---------|
| `bodyMetrics` | Time-series body composition measurements |
| `dailyCheckins` | Daily recovery and behavioral signals |

### New fields on `users` table

| Field | Type | Notes |
|-------|------|-------|
| goalWeight | number | Nullable — stored in lb |
| proteinTarget | number | Nullable — g/day |
| stepTarget | number | Nullable — steps/day |
| sleepTarget | number | Nullable — hours/night |

### New service methods

| Service | Method | Description |
|---------|--------|-------------|
| `UserService` | `updateGoals(userId, goals)` | Update goal fields on users table |
| `BodyMetricsService` | `getAll(userId)` | All entries for user, ordered by date desc |
| `BodyMetricsService` | `getRecent(userId, days)` | Entries within last N days |
| `BodyMetricsService` | `log(userId, entry)` | Append new entry |
| `BodyMetricsService` | `update(id, entry)` | Edit existing entry |
| `BodyMetricsService` | `delete(id)` | Delete entry |
| `DailyCheckinService` | `getAll(userId)` | All entries ordered by date desc |
| `DailyCheckinService` | `getRecent(userId, days)` | Entries within last N days |
| `DailyCheckinService` | `logToday(userId, entry)` | Upsert — replaces today's entry if exists |
| `DailyCheckinService` | `delete(id)` | Delete entry |
| `StatisticsService` | `getSummary(userId)` | Aggregate counts (workouts this week/month/total, streak) |
| `StatisticsService` | `getExerciseHistory(userId, exerciseId, range)` | Weight/volume over time for one exercise |
| `StatisticsService` | `getVolumeByPeriod(userId, period)` | Weekly or monthly volume totals |
| `StatisticsService` | `getPRs(userId)` | Best sets per exercise — 1RM, max weight, max reps, max volume |
| `StatisticsService` | `getRollingWeightAverage(userId, days)` | N-day rolling average from bodyMetrics |
| `StatisticsService` | `getRecompositionSignal(userId)` | Evaluates strength trend + waist trend; returns signal state |
| `StatisticsService` | `getAdherenceRate(userId, weeks)` | Workouts completed / planned for last N weeks |

---

## Charting Library

| Library | Pros | Cons |
|---------|------|------|
| Recharts | React-native, good docs, composable | Larger bundle |
| Chart.js + react-chartjs-2 | Mature, well-known | Less React-idiomatic |
| Victory | React-focused | Smaller community |
| Lightweight Charts (TradingView) | Very fast, small bundle | Overkill for fitness data |

> **Recommendation: Recharts** — React-idiomatic, covers line/bar/heatmap, no custom canvas required. Confirm before build.

---

## Unit Considerations

- All body measurements stored in canonical units: weight in lb, lengths in inches
- Convert to kg/cm at display time via UserSettingsContext
- Statistics calculations (volume, 1RM, rolling averages, waist-to-hip ratio) operate on stored lb/inch values
- Waist-to-hip ratio is dimensionless — no unit conversion needed
- If per-entry unit override is added in v2, statistics queries must account for mixed-unit history

---

## Schema Migration Note

Adding `goalWeight`, `proteinTarget`, `stepTarget`, `sleepTarget` to `users` requires a Dexie schema version bump. New fields are nullable — existing user records are unaffected. New tables `bodyMetrics` and `dailyCheckins` are additive. Plan this as a single schema migration at the start of the Statistics build step.

---

## Build Order (when Statistics phase begins)

1. Confirm charting library (Recharts recommended)
2. Schema migration — bump Dexie version, add new tables, add goal fields to users
3. Build `BodyMetricsService` + `DailyCheckinService`
4. Build `StatisticsService` query methods
5. Build Goals card (no charts — just inputs and derived numbers)
6. Build Body Metrics section (entry form + 7-day average + trends)
7. Build Daily Check-in section (entry form + 7-day averages)
8. Build Recomposition Indicator card
9. Build Overview Dashboard (workout counts, streak, adherence)
10. Build Per-Exercise Progress chart
11. Build Volume Over Time chart
12. Build PRs list
13. Build Frequency Heatmap (most complex — build last)

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Statistics.

| # | Type | Item |
|---|------|------|
| P5 | Planning | Charting library not selected — confirm Recharts before Statistics build begins |
| S1 | Planning | Energy/hunger 1–10 selector UX — tap chips vs stepper; decide at build step 7 |
| S2 | Planning | Goal fields location — currently specced on Statistics tab (Goals card); re-evaluate UX flow after Statistics is fully built to determine if any fields belong on Profile tab |
| S3 | Planning | Wearable API integration (HRV, steps auto-sync) — post-MVP; manual entry only for now |
| S4 | Planning | Weekly adherence calculation — requires defining "planned workouts" from program structure; clarify edge cases (no active program, multiple programs) at build step 9 |
