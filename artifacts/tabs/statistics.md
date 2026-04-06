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

> Nothing below is contracted yet. This section captures ideas to discuss and prioritize in a future planning phase. Lock down scope before building any of it.

---

### Overview Dashboard (first screen)

A summary of recent activity and top-level progress metrics:

| Metric | Description |
|--------|-------------|
| Workouts this week | Count of completed logs in the last 7 days |
| Workouts this month | Count of completed logs in the current calendar month |
| Total workouts | All-time completed log count |
| Current streak | Consecutive days/weeks with at least 1 workout |
| Last workout | Date + name of most recent completed log |

---

### Per-Exercise Progress

Track performance on a specific exercise over time:

- Select an exercise (search/dropdown)
- Line chart: best set weight over time (x = date, y = weight)
- Optional: toggle between best set weight vs. total volume (sets × reps × weight)
- Table view alternative: date | sets | best weight | total reps
- Filter by time range: last 30 days / 90 days / 6 months / all time

**Data source:** `logSets` joined to `logExercises` → `workoutLogs` (filter by exerciseId + userId + date range)

---

### Workout Volume Over Time

- Bar chart: total volume per week or per month
- Volume = sum of (weight × reps) across all sets in all logs for that period
- Toggle: weekly / monthly view

**Data source:** All `logSets` for user's logs, grouped by week/month

---

### Personal Records (PRs)

Automatically tracked — no user input required:

| Record type | Description |
|-------------|-------------|
| 1RM (estimated) | Best single-set weight × (1 + reps/30) — Epley formula |
| Max weight | Heaviest weight ever logged for that exercise |
| Max reps | Most reps in a single set at any weight |
| Max volume | Highest (weight × reps) in a single set |

- List view: all exercises with any logged data, sorted by most recent PR
- Tap an exercise → see PR history + all-time chart

---

### Workout Frequency Heatmap

- GitHub-style calendar heatmap
- Each day cell shaded based on workout count (0 = empty, 1+ = colored)
- Hover/tap a day → shows workout names from that day
- Time range: last 12 months (default), scrollable

---

## Data Requirements

All statistics are derived from existing tables — no new schema needed for the planned features above. Services needed:

| Service Method | Description |
|----------------|-------------|
| `WorkoutLogService.getAll(userId)` | Already exists |
| `LogSetService.getByExerciseId(id)` | Already exists — used per exercise |
| New: `StatisticsService.getSummary(userId)` | Aggregate counts (workouts this week/month/total, streak) |
| New: `StatisticsService.getExerciseHistory(userId, exerciseId, range)` | Weight/volume over time for one exercise |
| New: `StatisticsService.getVolumeByPeriod(userId, period)` | Weekly or monthly volume totals |
| New: `StatisticsService.getPRs(userId)` | Best sets per exercise |

> A `StatisticsService` should compute these from `logSets` / `logExercises` / `workoutLogs` — no new DB tables needed for the planned feature set.

---

## Charting Library (TBD)

Options to evaluate before building:

| Library | Pros | Cons |
|---------|------|------|
| Recharts | React-native, good docs, easy to start | Larger bundle |
| Chart.js + react-chartjs-2 | Mature, well-known | Less React-idiomatic |
| Victory | React-focused, composable | Smaller community |
| Lightweight Charts (TradingView) | Very fast, small | Overkill for fitness data |

> Recommend: **Recharts** for MVP statistics — React-idiomatic, sufficient for line/bar/heatmap charts, no custom canvas required.

---

## Unit Considerations for Statistics

All stored weights are in lb — statistics calculations (volume, 1RM, PR comparisons) operate on stored lb values and convert at display time. If per-entry unit override is added in v2, statistics queries must account for mixed-unit entries across a user's history.

---

## Build Order (when statistics phase begins)

1. Lock down which views to build first (suggest: Overview Dashboard → Per-Exercise Progress)
2. Choose charting library
3. Build `StatisticsService` with needed query methods
4. Build Overview Dashboard (no charts needed — just numbers)
5. Build Per-Exercise Progress chart
6. Build Volume Over Time chart
7. Build PRs list
8. Build Heatmap last (most complex)

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Statistics.
