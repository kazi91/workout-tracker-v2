import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { add, getByExerciseId, update, deleteSet } from './LogSetService';
import type { User, Exercise, WorkoutLog, LogExercise } from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function seedLogExercise(): Promise<number> {
  const userId = (await db.users.add({
    email: 'test@example.com',
    password: 'x',
    name: 'Test',
    height: 0,
    weight: 0,
    unitPreference: 'imperial',
    createdAt: new Date(),
  } as User)) as number;

  const exerciseId = (await db.exercises.add({
    name: 'Squat',
    isCustom: false,
    parentExerciseId: null,
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    equipment: null,
    gripWidth: null,
    gripOrientation: null,
    stanceWidth: null,
    bias: null,
    jointLoad: [],
  } as Exercise)) as number;

  const logId = (await db.workoutLogs.add({
    userId,
    workoutId: null,
    name: 'Quick Workout 1',
    startedAt: new Date(),
    finishedAt: null,
  } as WorkoutLog)) as number;

  const leId = (await db.logExercises.add({
    workoutLogId: logId,
    exerciseId,
    notes: null,
    order: 0,
  } as LogExercise)) as number;

  return leId;
}

// ── add ────────────────────────────────────────────────────────────────────

describe('add', () => {
  it('creates a set with setNumber 1, weight 0, reps 0', async () => {
    const leId = await seedLogExercise();
    const set = await add(leId);
    expect(set.id).toBeTypeOf('number');
    expect(set.setNumber).toBe(1);
    expect(set.weight).toBe(0);
    expect(set.reps).toBe(0);
  });

  it('increments setNumber for subsequent sets', async () => {
    const leId = await seedLogExercise();
    await add(leId);
    const second = await add(leId);
    expect(second.setNumber).toBe(2);
  });
});

// ── getByExerciseId ────────────────────────────────────────────────────────

describe('getByExerciseId', () => {
  it('returns sets ordered by setNumber ascending', async () => {
    const leId = await seedLogExercise();
    await add(leId);
    await add(leId);
    const sets = await getByExerciseId(leId);
    expect(sets).toHaveLength(2);
    expect(sets[0].setNumber).toBe(1);
    expect(sets[1].setNumber).toBe(2);
  });
});

// ── update — happy path ────────────────────────────────────────────────────

describe('update — happy path', () => {
  it('updates weight on an existing set', async () => {
    const leId = await seedLogExercise();
    const set = await add(leId);
    await update(set.id!, { weight: 225 });
    const updated = await db.logSets.get(set.id!);
    expect(updated!.weight).toBe(225);
  });

  it('updates reps on an existing set', async () => {
    const leId = await seedLogExercise();
    const set = await add(leId);
    await update(set.id!, { reps: 5 });
    const updated = await db.logSets.get(set.id!);
    expect(updated!.reps).toBe(5);
  });
});

// ── update — guards ────────────────────────────────────────────────────────

describe('update — guards', () => {
  let setId: number;

  beforeEach(async () => {
    const leId = await seedLogExercise();
    const set = await add(leId);
    setId = set.id!;
  });

  it('throws if weight is NaN', async () => {
    await expect(update(setId, { weight: NaN })).rejects.toThrow('Enter a valid weight');
  });

  it('throws if weight is negative', async () => {
    await expect(update(setId, { weight: -1 })).rejects.toThrow('Weight must be 0 or greater');
  });

  it('throws if reps is NaN', async () => {
    await expect(update(setId, { reps: NaN })).rejects.toThrow('Enter a valid rep count');
  });

  it('throws if reps is negative', async () => {
    await expect(update(setId, { reps: -1 })).rejects.toThrow('Reps must be 0 or greater');
  });

  it('throws if reps is a decimal', async () => {
    await expect(update(setId, { reps: 1.5 })).rejects.toThrow('Reps must be a whole number');
  });
});

// ── deleteSet ──────────────────────────────────────────────────────────────

describe('deleteSet', () => {
  it('removes the set from the database', async () => {
    const leId = await seedLogExercise();
    const set = await add(leId);
    await deleteSet(set.id!);
    expect(await db.logSets.get(set.id!)).toBeUndefined();
  });
});
