import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { add, update } from './WorkoutExerciseService';
import type { User, Program, Workout, Exercise } from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function seedWorkout(): Promise<{ workoutId: number; exerciseId: number }> {
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
    category: 'legs',
    isCustom: false,
  } as Exercise)) as number;

  const programId = (await db.programs.add({
    userId,
    name: 'Program',
    createdAt: new Date(),
  } as Program)) as number;

  const workoutId = (await db.workouts.add({
    userId,
    programId,
    name: 'Day 1',
    order: 0,
    createdAt: new Date(),
  } as Workout)) as number;

  return { workoutId, exerciseId };
}

// ── update — happy path ────────────────────────────────────────────────────

describe('update — happy path', () => {
  it('updates targetSets on a workoutExercise', async () => {
    const { workoutId, exerciseId } = await seedWorkout();
    const we = await add(workoutId, exerciseId);
    await update(we.id!, { targetSets: 5 });
    const updated = await db.workoutExercises.get(we.id!);
    expect(updated!.targetSets).toBe(5);
  });
});

// ── update — guards ────────────────────────────────────────────────────────

describe('update — guards', () => {
  let weId: number;

  beforeEach(async () => {
    const { workoutId, exerciseId } = await seedWorkout();
    const we = await add(workoutId, exerciseId);
    weId = we.id!;
  });

  it('throws if targetSets is 0', async () => {
    await expect(update(weId, { targetSets: 0 })).rejects.toThrow('Sets must be at least 1');
  });

  it('throws if targetSets is NaN', async () => {
    await expect(update(weId, { targetSets: NaN })).rejects.toThrow('Sets must be at least 1');
  });

  it('throws if targetSets is a decimal', async () => {
    await expect(update(weId, { targetSets: 1.5 })).rejects.toThrow('Sets must be at least 1');
  });

  it('throws if targetReps is 0', async () => {
    await expect(update(weId, { targetReps: 0 })).rejects.toThrow('Reps must be at least 1');
  });

  it('throws if targetWeight is NaN', async () => {
    await expect(update(weId, { targetWeight: NaN })).rejects.toThrow('Enter a valid weight');
  });

  it('throws if targetWeight is negative', async () => {
    await expect(update(weId, { targetWeight: -1 })).rejects.toThrow('Weight must be 0 or greater');
  });
});
