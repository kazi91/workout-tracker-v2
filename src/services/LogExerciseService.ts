/**
 * LogExerciseService — manages the exercise entries within a workout log.
 * Each logExercise links a workoutLog to an exercise and owns a list of logSets.
 * Exercises are added during an active workout via ExerciseSearchModal.
 */

import { db } from '../db/db';
import type { LogExercise } from '../types';

/**
 * Returns all logExercises for a workout log, ordered by the `order` field ascending.
 * Called by: WorkoutDetailPage on mount to load the exercise list.
 * Returns: LogExercise[]
 */
export async function getByWorkoutLogId(workoutLogId: number): Promise<LogExercise[]> {
  const items = await db.logExercises.where('workoutLogId').equals(workoutLogId).toArray();
  return items.sort((a, b) => a.order - b.order);
}

/**
 * Adds an exercise to a workout log with the next available order index.
 * Notes field starts as null — can be edited post-MVP.
 * Called by: WorkoutDetailPage ExerciseSearchModal onSelect callback.
 * Returns: the newly created LogExercise with id populated.
 */
export async function add(workoutLogId: number, exerciseId: number): Promise<LogExercise> {
  const existing = await db.logExercises.where('workoutLogId').equals(workoutLogId).toArray();
  const id = await db.logExercises.add({
    workoutLogId,
    exerciseId,
    notes: null,
    order: existing.length,
  } as LogExercise);
  const le = await db.logExercises.get(id);
  if (!le) throw new Error('Failed to add exercise to log');
  return le;
}

/**
 * Removes a logExercise and all its logSets from a workout log.
 * Cascade: logSets → logExercise.
 * Called by: WorkoutDetailPage exercise card remove button.
 * Returns: void
 */
export async function remove(id: number): Promise<void> {
  await db.logSets.where('logExerciseId').equals(id).delete();
  await db.logExercises.delete(id);
}
