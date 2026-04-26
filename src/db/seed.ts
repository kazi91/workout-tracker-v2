/**
 * seed.ts — populates the exercises table on first install.
 * Triggered once by App.tsx when db.exercises.count() === 0.
 * Module-level flag guards against React Strict Mode double-invocation.
 *
 * STEP 1 STUB: 214-entry seed compilation (Step 2) replaces this no-op.
 * Until then, the picker will be empty after a fresh install or a v3 migration nuke.
 */
import { db } from './db';

let seedStarted = false;

export async function seedExercises(): Promise<void> {
  if (seedStarted) return;
  seedStarted = true;
  const count = await db.exercises.count();
  if (count > 0) return;
  // Step 2 fills in the 214-entry library here (2-pass: parents → variants).
}
