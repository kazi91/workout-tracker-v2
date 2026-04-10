/**
 * WorkoutExerciseService — manages exercises within a workout template.
 * Each workoutExercise links a workout to an exercise with targetSets/targetReps/targetWeight.
 * getCountsByProgramId avoids N+1 queries by batching counts for all workouts in a program (R1).
 * syncFromLog reconciles a template against a log after a from-program workout (finish flow, Step 5).
 */

import { db } from '../db/db';
import type { WorkoutExercise } from '../types';

/**
 * Returns all workoutExercises for a workout, ordered by the `order` field ascending.
 * Called by: WorkoutTemplatePage on mount.
 * Returns: WorkoutExercise[]
 */
export async function getByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
  const items = await db.workoutExercises.where('workoutId').equals(workoutId).toArray();
  return items.sort((a, b) => a.order - b.order);
}

/**
 * Adds an exercise to a workout template with default targets: 3 sets / 10 reps / 0 lb (bodyweight).
 * Appends to the end by assigning the next available order index.
 * Called by: WorkoutTemplatePage ExerciseSearchModal onSelect callback.
 * Returns: the newly created WorkoutExercise with id populated.
 */
export async function add(workoutId: number, exerciseId: number): Promise<WorkoutExercise> {
  const existing = await db.workoutExercises.where('workoutId').equals(workoutId).toArray();
  const id = await db.workoutExercises.add({
    workoutId,
    exerciseId,
    targetSets: 3,
    targetReps: 10,
    targetWeight: 0,
    order: existing.length,
  } as WorkoutExercise);
  const we = await db.workoutExercises.get(id);
  if (!we) throw new Error('Failed to add exercise to workout');
  return we;
}

/**
 * Updates a workoutExercise's target values or order position.
 * Called by: WorkoutTemplatePage Edit Targets Modal on save.
 * Returns: void
 */
export async function update(
  id: number,
  data: Partial<Pick<WorkoutExercise, 'targetSets' | 'targetReps' | 'targetWeight' | 'order'>>,
): Promise<void> {
  await db.workoutExercises.update(id, data);
}

/**
 * Removes an exercise from a workout template by id.
 * Called by: WorkoutTemplatePage exercise card remove button.
 * Returns: void
 */
export async function remove(id: number): Promise<void> {
  await db.workoutExercises.delete(id);
}

/**
 * Returns exercise counts per workout for all workouts in a program, in a single batch.
 * Resolves R1: avoids N+1 per-workout queries on ProgramDetailPage.
 * Called by: ProgramDetailPage on mount to show exercise count on each workout card.
 * Returns: Record<workoutId, number>
 */
export async function getCountsByProgramId(programId: number): Promise<Record<number, number>> {
  const workouts = await db.workouts.where('programId').equals(programId).toArray();
  const counts: Record<number, number> = {};

  await Promise.all(
    workouts.map(async (w) => {
      counts[w.id!] = await db.workoutExercises.where('workoutId').equals(w.id!).count();
    }),
  );

  return counts;
}

/**
 * Syncs a workout template against a completed log (from-program finish flow, Step 5).
 * Adds exercises in the log but absent from the template; removes exercises in template not in log.
 * Existing exercises present in both are left untouched.
 * New exercises are appended in log order with targets derived from the first logged set.
 * Called by: finish flow (Step 5) when exercises were modified during the workout.
 * Returns: void
 */
export async function syncFromLog(workoutId: number, logId: number): Promise<void> {
  const [templateExercises, logExercises] = await Promise.all([
    db.workoutExercises.where('workoutId').equals(workoutId).toArray(),
    db.logExercises.where('workoutLogId').equals(logId).toArray(),
  ]);

  const templateExerciseIds = new Set(templateExercises.map((we) => we.exerciseId));
  const logExerciseIds = new Set(logExercises.map((le) => le.exerciseId));

  // Remove exercises in template that are absent from the log
  for (const we of templateExercises) {
    if (!logExerciseIds.has(we.exerciseId)) {
      await db.workoutExercises.delete(we.id!);
    }
  }

  // Append exercises in the log that are absent from the template (in log order)
  const remaining = await db.workoutExercises.where('workoutId').equals(workoutId).toArray();
  let nextOrder = remaining.length;

  const sorted = [...logExercises].sort((a, b) => a.order - b.order);
  for (const le of sorted) {
    if (!templateExerciseIds.has(le.exerciseId)) {
      const sets = await db.logSets.where('logExerciseId').equals(le.id!).toArray();
      sets.sort((a, b) => a.setNumber - b.setNumber);
      const firstSet = sets[0];
      await db.workoutExercises.add({
        workoutId,
        exerciseId: le.exerciseId,
        targetSets: sets.length || 3,
        targetReps: firstSet?.reps ?? 10,
        targetWeight: firstSet?.weight ?? 0,
        order: nextOrder++,
      } as WorkoutExercise);
    }
  }
}
