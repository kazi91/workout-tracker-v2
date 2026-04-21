/**
 * WorkoutService — manages workout template records within a program.
 * Each workout belongs to a program and owns a list of workoutExercises (the template).
 * Delete cascades: workoutExercises → workout.
 * createFromLog builds a template from a completed log (used in finish flow, Step 5).
 */

import { db } from '../db/db';
import type { Workout } from '../types';

/**
 * Returns all workouts for a program, ordered by the `order` field ascending.
 * Called by: ProgramDetailPage on mount.
 * Returns: Workout[]
 */
export async function getByProgramId(programId: number): Promise<Workout[]> {
  const workouts = await db.workouts.where('programId').equals(programId).toArray();
  return workouts.sort((a, b) => a.order - b.order);
}

/**
 * Returns a single workout by id, or undefined if not found.
 * Called by: WorkoutTemplatePage on mount.
 * Returns: Workout | undefined
 */
export async function getById(id: number): Promise<Workout | undefined> {
  return db.workouts.get(id);
}

/**
 * Creates a new workout in a program with the next available order index.
 * Guard: throws if name is blank or whitespace-only.
 * Called by: ProgramDetailPage "+ Add Workout" flow before navigating to WorkoutTemplatePage.
 * Returns: the newly created Workout with id populated.
 */
export async function create(userId: number, programId: number, name: string): Promise<Workout> {
  if (!name.trim()) throw new Error("Name can't be blank");
  const existing = await db.workouts.where('programId').equals(programId).toArray();
  const id = await db.workouts.add({
    userId,
    programId,
    name,
    order: existing.length,
    createdAt: new Date(),
  } as Workout);
  const workout = await db.workouts.get(id);
  if (!workout) throw new Error('Failed to create workout');
  return workout;
}

/**
 * Updates a workout's mutable fields (name or order).
 * Called by: WorkoutTemplatePage inline rename on blur.
 * Returns: void
 */
export async function update(
  id: number,
  data: Partial<Pick<Workout, 'name' | 'order'>>,
): Promise<void> {
  await db.workouts.update(id, data);
}

/**
 * Deletes a workout and all its workoutExercises.
 * Cascade order: workoutExercises → workout.
 * Called by: WorkoutTemplatePage delete confirm modal.
 * Returns: void
 */
export async function deleteWorkout(id: number): Promise<void> {
  await db.workoutExercises.where('workoutId').equals(id).delete();
  await db.workouts.delete(id);
}

/**
 * Creates a workout template from a completed log, copying logExercises → workoutExercises.
 * Target derivation: targetSets = number of sets logged; targetReps/targetWeight = values from the first logged set.
 * First set = starting weight, not peak — caller provides the workout name and programId.
 * Called by: finish flow (Step 5) when user saves a quick-start log to a program.
 * Returns: the newly created Workout with id populated.
 */
export async function createFromLog(
  logId: number,
  programId: number,
  workoutName: string,
  userId: number,
): Promise<Workout> {
  const logExercises = await db.logExercises
    .where('workoutLogId')
    .equals(logId)
    .toArray();
  logExercises.sort((a, b) => a.order - b.order);

  const existing = await db.workouts.where('programId').equals(programId).toArray();
  const workoutId = await db.workouts.add({
    userId,
    programId,
    name: workoutName,
    order: existing.length,
    createdAt: new Date(),
  } as Workout);

  for (let i = 0; i < logExercises.length; i++) {
    const le = logExercises[i];
    const sets = await db.logSets.where('logExerciseId').equals(le.id!).toArray();
    sets.sort((a, b) => a.setNumber - b.setNumber);
    const firstSet = sets[0];
    await db.workoutExercises.add({
      workoutId: workoutId as number,
      exerciseId: le.exerciseId,
      targetSets: sets.length || 3,
      targetReps: firstSet?.reps ?? 10,
      targetWeight: firstSet?.weight ?? 0,
      order: i,
    });
  }

  const workout = await db.workouts.get(workoutId);
  if (!workout) throw new Error('Failed to create workout from log');
  return workout;
}
