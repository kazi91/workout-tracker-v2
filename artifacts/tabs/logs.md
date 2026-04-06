# Logs Tab — Schematic

> **Purpose:** Detailed spec for the Logs tab. Use this as the source of truth when building or modifying anything under `/logs`. Cross-reference with master schematic (`artifacts/master-schematics.md`) for DB schema, services, and shared components.

---

## User Flow

### First-time / empty state
1. User logs in → lands on `/logs`
2. No logs exist → Workout History shows "No workouts recorded", no In Progress section
3. User taps FAB "Start Workout" → new empty log created → navigates to `/logs/:id` (active mode)

### Quick-start workout
1. `/logs` → tap FAB "Start Workout" → `/logs/:id` (active mode)
2. Add exercises via ExerciseSearchModal
3. Log sets (weight + reps per set)
4. Tap "Finish Workout" → workout finished (`finishedAt` set) → finish prompt flow:
   - Modal: "Save this workout to a program?" → **[Save to Program]** or **[Skip]**
   - **Skip** → navigate to `/logs` (log stays with `workoutId: null`)
   - **Save to Program, zero programs exist** → skip picker → show blank "Program name" + "Workout name" inputs → **[Save]** or **[Cancel]** → Cancel: `/logs` | Save: create program + workout from log → link log → `/logs`
   - **Save to Program, programs exist** → program picker: "＋ New Program" at top + existing program list → **[Cancel]** → Cancel: `/logs`
     - Tap **"＋ New Program"** → show blank "Program name" + "Workout name" inputs → **[Save]** or **[Back]** → Back: return to picker | Save: create program + workout from log → link log → `/logs`
     - Tap **existing program** → show blank "Workout name" input → **[Save]** or **[Back]** → Back: return to picker | Save: add workout to program from log → link log → `/logs`
5. Finished log appears in Workout History

### Start workout from program
1. `/programs/:programId/workouts/:workoutId` → tap "Start Workout" → `/logs/:id` (active mode, pre-filled from program)
2. Log sets, add/remove exercises as needed
3. Tap "Finish Workout" → `WorkoutLogService.finish(id)` → compare exercise sets (see Finish Workout Flow below)

> **Note:** "Link log" in the quick-start flow means `WorkoutLogService.update(logId, { workoutId })` — sets the previously-null `workoutId` on the log to point to the newly created workout template.

### Resume in-progress workout
1. `/logs` → In Progress section visible (≥1 log with `finishedAt === null`)
2. Tap in-progress card → `/logs/:id` (active mode, state restored)
3. Continue logging → finish as above

### View past workout
1. `/logs` → tap any card in Workout History → `/logs/:id` (read-only mode)
2. Read-only: exercises and sets displayed as text
3. Tap "Edit Workout" → edit mode (same URL, local state change)
4. Edit → tap "Save Edits" → back to read-only (same URL)
5. Or tap "Delete Workout" → confirm → deleted → `/logs`

### Back navigation
- "← Back" from `/logs/:id` → previous page (typically `/logs` or `/programs/:id`)

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| /logs | LogsPage | Log list — in-progress + history |
| /logs/:id | WorkoutDetailPage | Active workout, read-only view, edit mode |

---

## LogsPage

### Layout
- Header: "Logs" title only
- **In Progress section** — renders only if ≥1 log has `finishedAt === null`
  - Section label: "In Progress"
  - Cards: workout name + "In Progress" badge
  - Tap → navigates to `/logs/:id`
- **Workout History section** — always renders
  - Section label: "Workout History"
  - Empty state: "No workouts recorded"
  - Logs grouped by date dividers:
    - Today
    - Yesterday
    - Weekday name (within last 7 days)
    - "Month Year" (older)
  - Cards: workout name + date/time
  - Tap → navigates to `/logs/:id`
- **WorkoutFAB** — global component, not owned by LogsPage; see master schematic Decision #14, #15
  - On Logs tab with no active workout: shows "Start Workout" → quick-start → `/logs/:id`
  - On all tabs with active workout: shows "Resume Workout" → `/logs/:id`
  - Hidden on `/logs/:id` in active mode (Finish/Discard buttons already at bottom)
  - LogsPage has extra bottom padding so content never scrolls behind it

### Services Used
- `WorkoutLogService.getAll(userId)` — load all logs
- `WorkoutLogService.create(userId, null)` — quick-start; null workoutId creates empty log with no pre-filled exercises
- `ActiveWorkoutContext` — read on mount to determine FAB state; no direct service call needed

### State
- `logs: WorkoutLog[]` — all logs for the user
- `loading: boolean`
- `activeWorkout` — read from `ActiveWorkoutContext`; not local state; used to drive FAB label and In Progress section visibility

---

## WorkoutDetailPage

Three modes in one page: **Active**, **Read-only**, **Edit**.

### Mode Determination (on load)

Mode is derived from the log record alone — no URL params, no sessionStorage:

| `finishedAt` value | Mode entered |
|--------------------|-------------|
| `null` | Active |
| date/time value | Read-only |

Edit mode is never entered on load. It is always a local state transition triggered by the user tapping "Edit Workout" from Read-only.

### Mode Transitions

```
Active    → tap "Finish Workout"  → finish flow → navigate to /logs
Active    → tap "Discard Workout" → Modal confirm → navigate to /logs
Read-only → tap "Edit Workout"    → Edit (local state change, no reload)
Edit      → tap "Save Edits"      → Read-only (changes saved)
Edit      → tap "← Back"         → Modal: "Discard changes?" → [Discard] → Read-only (changes lost) | [Keep Editing] → stays in Edit
```

### Mode: Active (finishedAt === null)

#### Layout
- "← Back" button — top-left, navigates to previous page
- Workout name — centered, tappable → inline rename
- Exercise cards (one per logExercise):
  - Exercise name + "Remove" button
  - Set rows (one per logSet):
    - Previous data (read-only): "90 × 8 lb" (or kg if metric) or "—" if null
    - Weight input — numeric, 0–9999, 1 decimal place allowed (e.g. 137.5); unit label shown beside field ("lb" or "kg" from UserSettingsContext); user enters in their preferred unit — converted to lb on save if metric; invalid or blank shows "Enter a valid number" inline, field stays editable
    - Reps input — whole numbers only, 1–999; invalid or blank shows "Enter a valid number" inline, field stays editable
    - Delete set button
  - "+ Add Set" button below set rows
- "+ Add Exercise" button — opens `ExerciseSearchModal`
- "Finish Workout" button — fixed at bottom, triggers finish flow
- "Discard Workout" button — fixed at bottom alongside Finish; Modal confirm → Yes: deletes log + cascades logExercises + logSets → `/logs` | No: stays on page

#### Finish Workout Flow (Quick-start — `workoutId: null`)

1. `WorkoutLogService.finish(id)` — sets `finishedAt`
2. Modal: **"Save this workout to a program?"** → [Save to Program] [Skip]

**Path A — Skip:**
→ navigate to `/logs`. Log remains with `workoutId: null`.

**Path B — Save to Program, zero programs:**
→ skip picker; show two blank inputs: "Program name" and "Workout name"
→ [Save] → `ProgramService.create(name)` → `WorkoutService.createFromLog(logId, programId, workoutName)` → `WorkoutLogService.update(logId, { workoutId })` → navigate to `/logs`
→ [Cancel] → navigate to `/logs` (log already finished, just not saved to a program)

**Path C — Save to Program, programs exist:**
→ show program picker: "＋ New Program" at top, then existing programs list; [Cancel] → `/logs`

  - **"＋ New Program" selected:**
    → show two blank inputs: "Program name" and "Workout name"
    → [Save] → `ProgramService.create(name)` → `WorkoutService.createFromLog(logId, programId, workoutName)` → `WorkoutLogService.update(logId, { workoutId })` → navigate to `/logs`
    → [Back] → return to picker

  - **Existing program selected:**
    → show one blank input: "Workout name"
    → [Save] → `WorkoutService.createFromLog(logId, programId, workoutName)` → `WorkoutLogService.update(logId, { workoutId })` → navigate to `/logs`
    → [Back] → return to picker

#### Finish Workout Flow (From program — `workoutId` set)

1. `WorkoutLogService.finish(id)` — sets `finishedAt`
2. Compare `logExercises.exerciseId[]` vs `workoutExercises.exerciseId[]` for the linked workout
   - Order is ignored — set comparison only (gym equipment availability means order changes are circumstantial, not intentional)

**Path A — Exercises unchanged (sets are identical):**
→ navigate to `/logs` silently. No prompt.

**Path B — Exercises modified (any addition or removal detected):**
→ Modal:
  - **Title:** "Update [Workout Name]?"
  - **Body:** "You added or removed exercises. Update the template to match this session?"
  - **[Update Template]** → `WorkoutExerciseService.syncFromLog(workoutId, logId)` → navigate to `/logs`
  - **[Keep Original]** → navigate to `/logs`

**syncFromLog logic:**
- Exercises in log but not in template → added to template (targetSets = logSet count, targetReps/targetWeight = first set values, 0 if none — per P7)
- Exercises in template but not in log → removed from template
- Order of new exercises in template follows log order
- Existing template exercises (present in both) are untouched — their targets are not overwritten

#### Implementation note
> All modals in this flow replace `window.confirm` / `window.prompt` — use the shared `Modal` component (R2).

### Mode: Read-only (finishedAt !== null, not editing)

#### Layout
- "← Back" button — top-left
- Workout name — centered, not tappable
- Exercises and sets displayed as read-only text — weights shown in user's preferred unit (converted from stored lb at display time via UserSettingsContext)
- "Edit Workout" button — switches to Edit mode
- "Delete Workout" button — Modal confirm → Yes deletes + navigates to `/logs`, No dismisses

### Mode: Edit (re-editing a finished workout)

#### Layout
- Same as Active mode layout
- Workout name tappable to rename
- All inputs editable
- "Save Edits" button — explicit commit point; saves without changing original `finishedAt`, returns to read-only view
- "← Back" without tapping "Save Edits" — Modal: "Discard changes?" → [Discard]: changes lost, returns to read-only | [Keep Editing]: stays in Edit
- Save-as-program prompt does NOT appear on re-edits

### Services Used
- `WorkoutLogService.getById(id)` — load log
- `WorkoutLogService.finish(id)` — finish active workout
- `WorkoutLogService.update(id, data)` — rename, save edits
- `WorkoutLogService.delete(id)` — delete log (cascades)
- `LogExerciseService.getByWorkoutId(id)` — load exercises
- `LogExerciseService.add(workoutLogId, exerciseId)` — add exercise
- `LogExerciseService.remove(id)` — remove exercise
- `LogSetService.getByExerciseId(id)` — load sets
- `LogSetService.add(logExerciseId)` — add set
- `LogSetService.update(id, data)` — update weight/reps
- `LogSetService.delete(id)` — delete set
- `ProgramService.create(name)` — quick-start finish flow, "New Program" path
- `WorkoutService.createFromLog(logId, programId, workoutName)` — creates workout + workoutExercises from log; targets derived: targetSets = logSet count per exercise, targetReps = first set reps (0 if none), targetWeight = first set weight (0 if none)
- `WorkoutLogService.update(logId, { workoutId })` — links log to newly created workout after save-to-program
- `WorkoutExerciseService.syncFromLog(workoutId, logId)` — from-program finish flow; adds exercises in log but not in template, removes exercises in template but not in log; existing template exercises untouched

### State
- `log: WorkoutLog | null`
- `logExercises: LogExercise[]`
- `sets: Record<logExerciseId, LogSet[]>` — sets keyed by exercise
- `mode: 'active' | 'readonly' | 'edit'` — derived from `log.finishedAt` on load; Edit entered via local transition only
- `unsavedChanges: boolean` — set to true on any edit mode change; used to trigger "Discard changes?" Modal on back tap
- `loading: boolean`

---

## Components

| Component | Location | Description |
|-----------|----------|-------------|
| LogsPage | pages/LogsPage/LogsPage.tsx | Log list |
| WorkoutDetailPage | pages/WorkoutDetailPage/WorkoutDetailPage.tsx | Detail/active/edit |
| ExerciseCard | pages/WorkoutDetailPage/components/ExerciseCard.tsx | Per-exercise card within active/edit workout |
| SetRow | pages/WorkoutDetailPage/components/SetRow.tsx | Per-set row within ExerciseCard |
| ExerciseSearchModal | components/ExerciseSearchModal.tsx | Shared — exercise search/add overlay |
| WorkoutFAB | components/WorkoutFAB.tsx | Shared global FAB — see master schematic |

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Logs.

---

## Future Iterations

- Notes per exercise — `logExercises.notes` field already exists in the schema; build a text input on ExerciseCard to surface it (e.g. "left shoulder tight", "felt strong")
- "Change exercise" — opens ExerciseSearchModal, replaces exerciseId on existing logExercise
- Swipe to delete sets / exercises
- Set completion indicator — visual feedback (checkmark or color change) on set row after auto-save fires
- Smart defaults — pre-fill weight and reps inputs with previousWeight/previousReps when a new set is added; user edits if different
- Workout duration — display finishedAt - startedAt on finished log cards and read-only view (no new DB field needed)
- Rest timer — basic countdown auto-starts when a set is logged; sound/vibration at zero; non-customizable for MVP iteration
- Superset grouping (two exercises linked together)
- Dark mode optimized for gym lighting
- Calendar view for workout history navigation
