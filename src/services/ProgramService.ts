/**
 * ProgramService — manages program records for the current user.
 * Programs are top-level containers that own a set of workouts.
 * Delete cascades in order: workoutExercises → workouts → program (children before parent).
 * All methods query via the db instance; never import db in components directly.
 */

import { db } from '../db/db';
import type { Program } from '../types';

/**
 * Returns all programs for the given user, ordered by createdAt ascending.
 * Called by: ProgramsPage on mount.
 * Returns: Program[]
 */
export async function getAll(userId: number): Promise<Program[]> {
  const programs = await db.programs.where('userId').equals(userId).toArray();
  return programs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

/**
 * Returns a single program by id, or undefined if not found.
 * Called by: ProgramDetailPage on mount.
 * Returns: Program | undefined
 */
export async function getById(id: number): Promise<Program | undefined> {
  return db.programs.get(id);
}

/**
 * Creates a new program for the given user and returns it with id populated.
 * Called by: ProgramsPage inline create form.
 * Returns: Program
 */
export async function create(userId: number, name: string): Promise<Program> {
  const id = await db.programs.add({ userId, name, createdAt: new Date() } as Program);
  const program = await db.programs.get(id);
  if (!program) throw new Error('Failed to create program');
  return program;
}

/**
 * Updates a program's mutable fields (currently only name).
 * Called by: ProgramDetailPage inline rename on blur.
 * Returns: void
 */
export async function update(id: number, data: Partial<Pick<Program, 'name'>>): Promise<void> {
  await db.programs.update(id, data);
}

/**
 * Deletes a program and all its child records.
 * Cascade order: workoutExercises first (for each workout), then workouts, then program.
 * Called by: ProgramDetailPage delete confirm modal.
 * Returns: void
 */
export async function deleteProgram(id: number): Promise<void> {
  const workouts = await db.workouts.where('programId').equals(id).toArray();
  for (const workout of workouts) {
    await db.workoutExercises.where('workoutId').equals(workout.id!).delete();
  }
  await db.workouts.where('programId').equals(id).delete();
  await db.programs.delete(id);
}
