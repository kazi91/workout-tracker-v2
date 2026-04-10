/**
 * WorkoutLogService — manages workout log records.
 * A workoutLog is created when a user starts a workout (quick-start or from-program).
 * finishedAt === null means the workout is in progress (the "active" state).
 * Delete cascades: logSets → logExercises → workoutLog (children before parent).
 */

import { db } from '../db/db';
import type { WorkoutLog } from '../types';

/**
 * Returns the in-progress workout log for the given user, or null if none.
 * Queries all workoutLogs for the user, then filters for finishedAt === null.
 * Called by: ActiveWorkoutContext on mount to restore FAB state.
 * Returns: WorkoutLog | null
 */
export async function getActive(userId: number): Promise<WorkoutLog | null> {
  const logs = await db.workoutLogs.where('userId').equals(userId).toArray();
  return logs.find((log) => log.finishedAt === null) ?? null;
}

/**
 * Returns all workout logs for the given user, ordered by startedAt descending.
 * Called by: LogsPage to render the workout history list.
 * Returns: WorkoutLog[]
 */
export async function getAll(userId: number): Promise<WorkoutLog[]> {
  const logs = await db.workoutLogs.where('userId').equals(userId).toArray();
  return logs.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
}

/**
 * Creates a new workout log and returns it.
 * Quick-start (workoutId: null): name = "Quick Workout [n+1]" based on existing log count.
 * From-program (workoutId set): name = workout template name (caller must provide).
 * If workoutId is provided, atomically copies workoutExercises → logExercises (Step 5).
 * Called by: WorkoutFAB (quick-start), WorkoutDetailPage start-from-program flow (Step 5).
 * Returns: the newly created WorkoutLog with id populated.
 */
export async function create(
  userId: number,
  workoutId: number | null,
  name?: string,
): Promise<WorkoutLog> {
  let logName = name ?? '';

  if (!workoutId && !name) {
    // Quick-start: auto-generate name based on existing log count
    const existingCount = await db.workoutLogs.where('userId').equals(userId).count();
    logName = `Quick Workout ${existingCount + 1}`;
  }

  const id = await db.workoutLogs.add({
    userId,
    workoutId,
    name: logName,
    startedAt: new Date(),
    finishedAt: null,
  } as WorkoutLog);

  const log = await db.workoutLogs.get(id);
  if (!log) throw new Error('Failed to create workout log');
  return log;
}

/**
 * Returns a single workout log by id, or undefined if not found.
 * Called by: WorkoutDetailPage on mount to load the log and determine mode.
 * Returns: WorkoutLog | undefined
 */
export async function getById(id: number): Promise<WorkoutLog | undefined> {
  return db.workoutLogs.get(id);
}

/**
 * Marks a workout log as finished by setting finishedAt to the current time.
 * Called by: WorkoutDetailPage "Finish Workout" button before running the finish flow.
 * Returns: void
 */
export async function finish(id: number): Promise<void> {
  await db.workoutLogs.update(id, { finishedAt: new Date() });
}

/**
 * Updates mutable fields on a workout log (name or workoutId linkage after save-to-program).
 * Called by: WorkoutDetailPage rename on blur; finish flow to link log to newly created workout.
 * Returns: void
 */
export async function update(
  id: number,
  data: Partial<Pick<WorkoutLog, 'name' | 'workoutId'>>,
): Promise<void> {
  await db.workoutLogs.update(id, data);
}

/**
 * Deletes a workout log and all its child records.
 * Cascade order: logSets (per exercise) → logExercises → workoutLog.
 * Called by: WorkoutDetailPage "Discard Workout" modal confirm, and delete log from read-only.
 * Returns: void
 */
export async function deleteLog(id: number): Promise<void> {
  const logExercises = await db.logExercises.where('workoutLogId').equals(id).toArray();
  for (const le of logExercises) {
    await db.logSets.where('logExerciseId').equals(le.id!).delete();
  }
  await db.logExercises.where('workoutLogId').equals(id).delete();
  await db.workoutLogs.delete(id);
}
