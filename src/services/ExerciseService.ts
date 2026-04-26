/**
 * ExerciseService — manages the global exercise library.
 * Pre-seeded library; users can add custom exercises (isCustom: true).
 * All methods query the `exercises` table via the db instance.
 *
 * STEP 1: trimmed to getAll() during the v3 migration. Step 3 reintroduces
 * search (name + muscle-tag matching), create (new schema fields + parentExerciseId
 * validation), and deleteExercise (cascade choice modal per CE2).
 */

import { db } from '../db/db';
import type { Exercise } from '../types';

/**
 * Returns all exercises ordered alphabetically by name.
 * Called by: ExerciseSearchModal on open.
 * Returns: Exercise[]
 */
export async function getAll(): Promise<Exercise[]> {
  return db.exercises.orderBy('name').toArray();
}
