# Programs Tab — Schematic

> **Purpose:** Detailed spec for the Programs tab. Use this as the source of truth when building or modifying anything under `/programs`. Cross-reference with master schematic (`artifacts/master-schematics.md`) for DB schema, services, and shared components.

---

## User Flow

### First-time / empty state
1. User navigates to `/programs`
2. No programs exist → list is empty, "+" button visible
3. Tap "+" → inline create form → enter name → blank shows "Name can't be blank"
4. Valid name → program created → `/programs/:id`
5. New program is empty — hint visible (no workouts yet)

### Browse and select a program
1. `/programs` → list of program cards (name + workout count)
2. Tap card → `/programs/:id`

### Create a new program
1. `/programs` → tap "+" → enter name → `/programs/:id`
2. Tap "+ Add Workout" → enter workout name → `/programs/:programId/workouts/:workoutId`
3. Add exercises to the workout via ExerciseSearchModal
4. Set targets per exercise (sets/reps/weight) — tap target line on each exercise card → Edit Targets Modal
5. All changes auto-save — no explicit save button
6. Tap "← Back" → `/programs/:id`
7. Repeat steps 2–6 for each additional workout
8. Tap "← Back" → `/programs`

### Edit an existing program
1. `/programs/:id` → tap program name → rename inline (auto-saves on blur; blank shows "Name can't be blank")
2. Tap a workout card → `/programs/:programId/workouts/:workoutId`
3. Add/remove exercises, edit targets — all auto-save
4. Tap "← Back" → `/programs/:id`

### Start workout from program
1. `/programs/:id` → tap a workout card → `/programs/:programId/workouts/:workoutId`
2. Tap "Start Workout"
3. **Active workout already running** → blocked: "You have a workout in progress. Finish or discard it before starting a new one." → stays on page
4. **No active workout** → `WorkoutLogService.create(userId, workoutId)` → `/logs/:id` (active mode, pre-filled from workout template)
5. Logs tab owns everything from this point — see `logs.md`

### Delete a program
1. `/programs/:id` → tap "Delete Program" → Modal confirm → Yes: deleted + cascades workouts + workoutExercises → `/programs` | No: stays

### Delete a workout
1. `/programs/:programId/workouts/:workoutId` → tap "Delete Workout" → Modal confirm → Yes: deleted + cascades workoutExercises → `/programs/:id` | No: stays

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| /programs | ProgramsPage | Program list |
| /programs/new | ProgramDetailPage | Create new program |
| /programs/:id | ProgramDetailPage | View/edit existing program |
| /programs/:programId/workouts/new | WorkoutTemplatePage | Create new workout within program |
| /programs/:programId/workouts/:workoutId | WorkoutTemplatePage | View/edit workout template |

---

## ProgramsPage

### Layout
- Header: "Programs" title + "+" button (top-right)
- Program list — one card per program
  - Card: program name + workout count
  - Tap → navigates to `/programs/:id`
- "+" button OR inline create form:
  - User provides a name → creates program → navigates to `/programs/:id`
  - Blank name shows inline error "Name can't be blank" — does not create program

### Services Used
- `ProgramService.getAll(userId)` — load all programs
- `ProgramService.create(userId, name)` — create new program
- `WorkoutService.getByProgramId(programId)` — load workout count per program card

### State
- `programs: Program[]`
- `workoutCounts: Record<programId, number>` — workout count per program
- `loading: boolean`
- `creating: boolean` — controls inline create form visibility

---

## ProgramDetailPage

### Layout
- "← Back" button — top-left → `/programs` (G5 resolved — destination locked)
- Program name — centered, tappable → inline rename (auto-saves on blur; blank shows "Name can't be blank")
- Workout list — one card per workout within the program
  - Card: workout name + exercise count
  - Tap → navigates to `/programs/:programId/workouts/:workoutId`
- **Empty program hint** — visible until ≥1 workout added; hidden once workouts exist
  - Text: "Add a workout first, or start a quick workout and save it to this program when you're done."
- "+ Add Workout" button — navigates to `/programs/:programId/workouts/new`
- "Delete Program" button — Modal confirm → Yes: deletes + cascades workouts + workoutExercises → `/programs` | No: stays

### Services Used
- `ProgramService.getById(id)` — load program
- `ProgramService.update(id, data)` — rename program
- `ProgramService.delete(id)` — delete program (cascades workouts + workoutExercises)
- `WorkoutService.getByProgramId(id)` — load workouts
- `WorkoutExerciseService.getCountsByProgramId(id)` — batch query; returns `Record<workoutId, number>` of exercise counts for all workouts in one call (resolves R1)

### State
- `program: Program | null`
- `workouts: Workout[]`
- `workoutCounts: Record<number, number>` — exercise count per workout, loaded via getCountsByProgramId
- `loading: boolean`

---

## WorkoutTemplatePage

### Layout
- "← Back" button — top-left → `/programs/:id`
- Workout name — centered, tappable → inline rename (auto-saves on blur; blank shows "Name can't be blank")
- Exercise list (one card per workoutExercise):
  - Exercise name
  - Target line — tappable → opens Edit Targets Modal (see below)
    - `targetWeight === 0` → displays as "3 sets × 10 reps @ bodyweight"
    - `targetWeight > 0` → displays as "3 sets × 10 reps @ 45 lb" (or kg if metric)
  - Remove button
- "+ Add Exercise" button — opens `ExerciseSearchModal`; exercise added silently with defaults (3 / 10 / 0); user taps target line to edit
- **Empty workout hint** — visible until ≥1 exercise added
  - Text: "Add exercises to get started."
- "Start Workout" button — always visible
  - If no exercises on template → block inline: "Add at least one exercise to start." — user stays on page
  - If active workout running → block inline: "You have a workout in progress. Finish or discard it before starting a new one."
  - If exercises exist and no active workout → `WorkoutLogService.create(userId, workoutId)` → `/logs/:id` (active mode, pre-filled)
- "Delete Workout" button — Modal confirm → Yes: deletes + cascades workoutExercises → `/programs/:id` | No: stays

### Edit Targets Modal (G2)

Opened by tapping the target line on any exercise card. Closes without saving on [Cancel] or tap-outside.

#### Layout
- Title: "Edit Targets — [Exercise Name]"
- Three inputs:
  - **Sets** — whole number, 1–99; "Enter a valid number" on invalid
  - **Reps** — whole number, 1–999; "Enter a valid number" on invalid
  - **Weight** — numeric, 0–9999, 1 decimal place allowed; label shows "lb" or "kg" based on `UserSettingsContext`; 0 is valid (bodyweight); "Enter a valid number" on invalid
- Pre-filled with current target values
- [Save] — validates all fields; on valid: `WorkoutExerciseService.update(id, { targetSets, targetReps, targetWeight })` — weight converted to lb before storing if user is in metric; closes modal; target line updates
- [Cancel] — closes modal; no changes saved

#### Unit handling
- Display: read `UserSettingsContext` — show lb or kg label on weight input and on target line
- Storage: always save in lb — if user enters kg, multiply by 2.20462 before storing
- On unit preference change: no migration needed — stored value is always lb; display converts on the fly

### Services Used
- `WorkoutService.getById(id)` — load workout
- `WorkoutService.update(id, data)` — rename workout
- `WorkoutService.delete(id)` — delete workout (cascades workoutExercises)
- `WorkoutExerciseService.getByWorkoutId(id)` — load exercises
- `WorkoutExerciseService.add(workoutId, exerciseId)` — add exercise (defaults to 3/10/0)
- `WorkoutExerciseService.update(id, data)` — update targets (needed for G2)
- `WorkoutExerciseService.remove(id)` — remove exercise
- `ExerciseService.getAll()` — resolve exercise names (hoist outside loop — R1)
- `WorkoutLogService.create(userId, workoutId)` — start workout from template

### State
- `workout: Workout | null`
- `workoutExercises: WorkoutExercise[]`
- `exercises: Record<exerciseId, Exercise>` — lookup map (hoisted)
- `editingTargetId: number | null` — workoutExercise id currently open in Edit Targets Modal; null = modal closed
- `loading: boolean`

---

## Components

| Component | Location | Description |
|-----------|----------|-------------|
| ProgramsPage | pages/ProgramsPage/ProgramsPage.tsx | Program list |
| ProgramDetailPage | pages/ProgramDetailPage/ProgramDetailPage.tsx | Program detail — list of workouts |
| WorkoutTemplatePage | pages/WorkoutTemplatePage/WorkoutTemplatePage.tsx | Workout template — exercises + targets + start workout |
| ExerciseSearchModal | components/ExerciseSearchModal.tsx | Shared — exercise search/add overlay |

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Programs.

---

## Future Iterations

- Per-set targets on WorkoutTemplatePage — requires `workoutSets` table and `isWarmup` field; design alongside recommendation engine in v2
- Per-entry unit override — log specific exercises in a different unit than global preference (e.g. competition powerlifting lifts in kg regardless of imperial setting); requires storing unit per entry; design alongside per-set targets in v2
- Last recorded performance reference on WorkoutTemplatePage — tapping an exercise shows your last logged sets for that exercise as a reference; requires live query of log history
- Drag-to-reorder exercises within a program
- Duplicate a program
- Program tags / categories (e.g., Push, Pull, Legs)
- "Last performed" date on program card
- Program notes field
- Superset support (link two exercises together within a program)
- Program sharing / export
- "Create a program from this workout" — from a finished workout log, allow user to create a new program using that workout's exercises as the template; sets targets from logged sets
