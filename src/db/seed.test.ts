import { describe, it, expect, beforeEach } from 'vitest';
import { db } from './db';
import { seedExercises, SEED_ENTRIES, _resetSeedFlagForTest } from './seed';

beforeEach(async () => {
  await db.delete();
  await db.open();
  _resetSeedFlagForTest();
});

describe('seedExercises', () => {
  it('inserts every catalog entry exactly once', async () => {
    await seedExercises();
    const count = await db.exercises.count();
    expect(count).toBe(SEED_ENTRIES.length);
  });

  it('resolves every variant parentExerciseId to an existing parent', async () => {
    await seedExercises();
    const all = await db.exercises.toArray();
    const idToExercise = new Map(all.map((ex) => [ex.id!, ex]));
    const variants = all.filter((ex) => ex.parentExerciseId !== null);

    for (const variant of variants) {
      const parent = idToExercise.get(variant.parentExerciseId!);
      expect(parent, `variant "${variant.name}" parent FK resolves`).toBeDefined();
    }
  });

  it('enforces flat hierarchy — no variant points to another variant (CE2 Rule 1)', async () => {
    await seedExercises();
    const all = await db.exercises.toArray();
    const idToExercise = new Map(all.map((ex) => [ex.id!, ex]));
    const variants = all.filter((ex) => ex.parentExerciseId !== null);

    for (const variant of variants) {
      const parent = idToExercise.get(variant.parentExerciseId!)!;
      expect(parent.parentExerciseId, `parent of "${variant.name}" must itself be a parent`).toBeNull();
    }
  });

  it('is idempotent — re-running on a populated db inserts no duplicates', async () => {
    await seedExercises();
    const firstCount = await db.exercises.count();

    // Simulate a page reload: flag resets, but the count check should still skip.
    _resetSeedFlagForTest();
    await seedExercises();

    const secondCount = await db.exercises.count();
    expect(secondCount).toBe(firstCount);
  });
});
