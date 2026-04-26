/**
 * LogSetService — manages individual sets within a log exercise.
 * Each logSet records weight + reps, plus previousWeight/previousReps for the "Best" column.
 * getPreviousData does a cross-session lookup to find the user's last performance on this exercise
 * at the same set number (with fallback to the last set if setNumber didn't exist that session).
 */

import { db } from '../db/db';
import type { LogSet } from '../types';

/**
 * Returns all sets for a logExercise, ordered by setNumber ascending.
 * Called by: WorkoutDetailPage on mount to build the sets map.
 * Returns: LogSet[]
 */
export async function getByExerciseId(logExerciseId: number): Promise<LogSet[]> {
  const sets = await db.logSets.where('logExerciseId').equals(logExerciseId).toArray();
  return sets.sort((a, b) => a.setNumber - b.setNumber);
}

/**
 * Finds the previous session's weight and reps for a given exercise and set number.
 * Algorithm:
 *   1. Resolve exerciseId + workoutLogId from the logExercise.
 *   2. Find all previous finished workoutLogs for the same user, sorted newest-first.
 *   3. For each, look for a logExercise with the same exerciseId.
 *   4. Return the set matching setNumber (fallback to last set if setNumber absent).
 * Returns null if no previous session exists for this exercise.
 * Called by: add() to populate previousWeight/previousReps on new sets.
 * Returns: { weight: number; reps: number } | null
 */
export async function getPreviousData(
  logExerciseId: number,
  setNumber: number,
): Promise<{ weight: number; reps: number } | null> {
  const currentLE = await db.logExercises.get(logExerciseId);
  if (!currentLE) return null;

  const currentLog = await db.workoutLogs.get(currentLE.workoutLogId);
  if (!currentLog) return null;

  // All finished logs for this user before the current session, newest-first
  const allLogs = await db.workoutLogs.where('userId').equals(currentLog.userId).toArray();
  const previousLogs = allLogs
    .filter((l) => l.finishedAt !== null && l.startedAt < currentLog.startedAt)
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());

  for (const prevLog of previousLogs) {
    const prevLEs = await db.logExercises.where('workoutLogId').equals(prevLog.id!).toArray();
    const match = prevLEs.find((le) => le.exerciseId === currentLE.exerciseId);
    if (!match) continue;

    const sets = await db.logSets.where('logExerciseId').equals(match.id!).toArray();
    sets.sort((a, b) => a.setNumber - b.setNumber);
    if (sets.length === 0) continue;

    // Fall back to the last set if no matching setNumber exists —
    // handles cases where the user did fewer sets last session
    const target = sets.find((s) => s.setNumber === setNumber) ?? sets[sets.length - 1];
    return { weight: target.weight, reps: target.reps };
  }

  return null;
}

/**
 * Adds a new set to a logExercise with empty weight/reps (0) and looks up previous data.
 * setNumber is assigned as the next integer (existing count + 1, 1-based).
 * previousWeight/previousReps populated from getPreviousData for the "Best" column.
 * Optional `rpe` writes through unchanged — usually omitted (Decision #26: no pre-fill;
 * value entered later via SetRow gated by users.rpeEnabled).
 * Called by: WorkoutDetailPage "+ Add Set" button on an exercise card.
 * Returns: the newly created LogSet with id populated.
 */
export async function add(logExerciseId: number, rpe: number | null = null): Promise<LogSet> {
  const existing = await db.logSets.where('logExerciseId').equals(logExerciseId).toArray();
  const setNumber = existing.length + 1;

  const prev = await getPreviousData(logExerciseId, setNumber);

  const id = await db.logSets.add({
    logExerciseId,
    setNumber,
    weight: 0,
    reps: 0,
    previousWeight: prev?.weight ?? null,
    previousReps: prev?.reps ?? null,
    rpe,
  } as LogSet);

  const set = await db.logSets.get(id);
  if (!set) throw new Error('Failed to add set');
  return set;
}

/**
 * Updates weight, reps, and/or RPE on a set. Auto-saves on input blur.
 * Weight is always stored in lb — caller must convert from kg before calling if user is metric.
 * Guards: weight must be >= 0; reps must be >= 0 and a whole number;
 * rpe must be 1–10 in 0.5 increments OR null (Decision #26 — null never blocks save).
 * Called by: SetRow onBlur handler after input validation passes.
 * Returns: void
 */
export async function update(
  id: number,
  data: Partial<Pick<LogSet, 'weight' | 'reps' | 'rpe'>>,
): Promise<void> {
  if (data.weight !== undefined) {
    if (!Number.isFinite(data.weight)) throw new Error('Enter a valid weight');
    if (data.weight < 0) throw new Error('Weight must be 0 or greater');
  }
  if (data.reps !== undefined) {
    if (!Number.isFinite(data.reps)) throw new Error('Enter a valid rep count');
    if (data.reps < 0) throw new Error('Reps must be 0 or greater');
    if (!Number.isInteger(data.reps)) throw new Error('Reps must be a whole number');
  }
  if (data.rpe !== undefined && data.rpe !== null) {
    if (!Number.isFinite(data.rpe)) throw new Error('Enter a valid RPE');
    if (data.rpe < 1 || data.rpe > 10) throw new Error('RPE must be between 1 and 10');
    // 0.5-step check: rpe * 2 must be a whole number
    if (!Number.isInteger(data.rpe * 2)) throw new Error('RPE must be in half-point increments');
  }
  await db.logSets.update(id, data);
}

/**
 * Deletes a single set from a logExercise.
 * Called by: SetRow delete button.
 * Returns: void
 */
export async function deleteSet(id: number): Promise<void> {
  await db.logSets.delete(id);
}
