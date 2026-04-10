/**
 * ExerciseService — manages the global exercise library.
 * Pre-seeded with 29 exercises; users can add custom exercises (isCustom: true).
 * All methods query the `exercises` table via the db instance.
 */

import { db } from '../db/db';
import type { Exercise } from '../types';

/**
 * Returns all exercises ordered by category then name.
 * Called by: ExerciseSearchModal on open.
 * Returns: Exercise[]
 */
export async function getAll(): Promise<Exercise[]> {
  return db.exercises.orderBy('name').toArray();
}

/**
 * Returns exercises filtered by name (case-insensitive substring) and optional category.
 * Filtering is done client-side — 29 items max, no debounce needed.
 * Called by: ExerciseSearchModal on search input change or category chip selection.
 * Returns: Exercise[]
 */
export async function search(query: string, category: string | null): Promise<Exercise[]> {
  let collection = db.exercises.orderBy('name');

  const results = await collection.toArray();

  return results.filter((ex) => {
    const matchesQuery = query.trim() === '' || ex.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || ex.category === category;
    return matchesQuery && matchesCategory;
  });
}

/**
 * Creates a new custom exercise and saves it to the exercises table.
 * Called by: ExerciseSearchModal inline custom exercise creation form.
 * Returns: the newly created Exercise with id populated.
 */
export async function create(
  name: string,
  category: Exercise['category'],
): Promise<Exercise> {
  const id = await db.exercises.add({ name, category, isCustom: true } as Exercise);
  const exercise = await db.exercises.get(id);
  if (!exercise) throw new Error('Failed to create exercise');
  return exercise;
}
