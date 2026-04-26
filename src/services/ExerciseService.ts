/**
 * ExerciseService — manages the global exercise library.
 * Pre-seeded library (214 entries); users can add custom exercises (isCustom: true).
 * All methods query the `exercises` table via the db instance.
 *
 * CE2 architecture: parent/variant relationships via parentExerciseId (flat hierarchy).
 * Rule 1: a variant's parent must itself be parent-level (parentExerciseId === null).
 * Seeded exercises are read-only — only custom exercises may be deleted.
 */

import { db } from '../db/db';
import type { Exercise, Muscle, MuscleGroup } from '../types';
import { MUSCLE_LABELS, getExerciseGroup } from '../db/muscleTaxonomy';

/** D6.4 — never surfaced via picker or search tag matches. */
const BACKGROUND_MUSCLES: ReadonlySet<Muscle> = new Set(['neck', 'rotatorCuff']);

/**
 * Returns all exercises ordered alphabetically by name.
 * Called by: ExerciseSearchModal browse mode (no query, no chip).
 * Returns: Exercise[]
 */
export async function getAll(): Promise<Exercise[]> {
  return db.exercises.orderBy('name').toArray();
}

/**
 * Filters the library by name substring + muscle tag matches + optional broad group.
 * Match semantics (D7): case-insensitive substring on `name`; OR muscle id / display
 * label (MUSCLE_LABELS) appears in primary/secondary tags. Background muscles
 * (neck, rotatorCuff) never surface via tag match (D6.4) — name match still works.
 * Empty query returns all entries (group-filtered if `group` provided).
 * Group filter derived via getExerciseGroup() — no stored category column.
 * Called by: ExerciseSearchModal as user types or chip changes.
 * Returns: Exercise[] sorted alphabetically by name
 */
export async function search(query: string, group?: MuscleGroup): Promise<Exercise[]> {
  const normalized = query.trim().toLowerCase();
  const all = await db.exercises.orderBy('name').toArray();

  return all.filter((ex) => {
    if (group && getExerciseGroup(ex) !== group) return false;
    if (normalized === '') return true;
    if (ex.name.toLowerCase().includes(normalized)) return true;
    return matchesMuscleTag(normalized, ex);
  });
}

function matchesMuscleTag(normalized: string, ex: Exercise): boolean {
  for (const m of ex.primaryMuscles) {
    if (BACKGROUND_MUSCLES.has(m)) continue;
    if (m.toLowerCase().includes(normalized)) return true;
    if (MUSCLE_LABELS[m].toLowerCase().includes(normalized)) return true;
  }
  for (const sm of ex.secondaryMuscles) {
    if (BACKGROUND_MUSCLES.has(sm.muscle)) continue;
    if (sm.muscle.toLowerCase().includes(normalized)) return true;
    if (MUSCLE_LABELS[sm.muscle].toLowerCase().includes(normalized)) return true;
  }
  return false;
}

/**
 * Creates a new exercise. Validates CE2 hierarchy rules when parentExerciseId is set.
 * Rule 1: parent must be parent-level (parent's own parentExerciseId === null).
 * Rule 3: self-reference is impossible at create-time (id is auto-assigned).
 * Called by: ExerciseSearchModal custom-create flow (Decision #27, EB5).
 * Returns: the newly created Exercise with id populated.
 */
export async function create(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
  if (!exercise.name.trim()) throw new Error("Name can't be blank");
  if (exercise.primaryMuscles.length === 0) {
    throw new Error('At least one primary muscle is required');
  }
  if (exercise.parentExerciseId !== null) {
    const parent = await db.exercises.get(exercise.parentExerciseId);
    if (!parent) throw new Error('Parent exercise not found');
    if (parent.parentExerciseId !== null) {
      throw new Error('Cannot nest under a variant — parent must be top-level');
    }
  }
  const id = (await db.exercises.add(exercise as Exercise)) as number;
  const created = await db.exercises.get(id);
  if (!created) throw new Error('Failed to create exercise');
  return created;
}

/**
 * Deletes a custom exercise. Behavior depends on cascade flag and whether the
 * exercise has variants (children with parentExerciseId === id):
 * - cascade=true: variants + their log history + their program-template rows are also deleted.
 * - cascade=false: variants become standalone (parentExerciseId set to null); their data is kept.
 * Either way, the target exercise's own log history (logExercises → logSets) and
 * program-template rows (workoutExercises) are deleted.
 * Seeded exercises (isCustom === false) cannot be deleted (CE2 — read-only).
 * Called by: ExerciseSearchModal deletion choice modal (CE2 architecture).
 */
export async function deleteExercise(
  id: number,
  opts: { cascade: boolean },
): Promise<void> {
  const exercise = await db.exercises.get(id);
  if (!exercise) throw new Error('Exercise not found');
  if (!exercise.isCustom) throw new Error('Seeded exercises cannot be deleted');

  const children = await db.exercises.where('parentExerciseId').equals(id).toArray();

  if (children.length > 0) {
    if (opts.cascade) {
      for (const child of children) {
        await purgeExerciseRecord(child.id!);
      }
    } else {
      await db.exercises.where('parentExerciseId').equals(id).modify({ parentExerciseId: null });
    }
  }

  await purgeExerciseRecord(id);
}

/**
 * Internal — removes one exercise plus every record that references it.
 * Order: logSets → logExercises → workoutExercises → exercises (children before parent).
 * `exerciseId` is not indexed on logExercises/workoutExercises (only `workoutLogId` and
 * `workoutId` respectively), so this scans + filters in JS — fine at MVP scale; runs
 * only on custom-exercise delete (rare path).
 * Called by: deleteExercise for the target and (when cascade=true) each child.
 */
async function purgeExerciseRecord(exerciseId: number): Promise<void> {
  const logExercises = await db.logExercises.filter((le) => le.exerciseId === exerciseId).toArray();
  for (const le of logExercises) {
    await db.logSets.where('logExerciseId').equals(le.id!).delete();
  }
  const logExerciseIds = logExercises.map((le) => le.id!);
  if (logExerciseIds.length > 0) {
    await db.logExercises.bulkDelete(logExerciseIds);
  }
  const workoutExercises = await db.workoutExercises
    .filter((we) => we.exerciseId === exerciseId)
    .toArray();
  const workoutExerciseIds = workoutExercises.map((we) => we.id!);
  if (workoutExerciseIds.length > 0) {
    await db.workoutExercises.bulkDelete(workoutExerciseIds);
  }
  await db.exercises.delete(exerciseId);
}
