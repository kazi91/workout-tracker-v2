import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { create, finish, deleteLog, getActive } from './WorkoutLogService';
import type { User, Exercise, Program, Workout, WorkoutExercise, LogSet } from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function seedUser(): Promise<number> {
  const id = await db.users.add({
    email: 'test@example.com',
    password: 'x',
    name: 'Test',
    height: 70,
    weight: 180,
    unitPreference: 'imperial',
    createdAt: new Date(),
  } as User);
  return id as number;
}

async function seedWorkoutWithExercises(userId: number): Promise<{
  workoutId: number;
  exerciseId: number;
}> {
  const exerciseId = (await db.exercises.add({
    name: 'Squat',
    category: 'legs',
    isCustom: false,
  } as Exercise)) as number;

  const programId = await db.programs.add({
    userId,
    name: 'Strength',
    createdAt: new Date(),
  } as Program);

  const workoutId = (await db.workouts.add({
    userId,
    programId,
    name: 'Leg Day',
    order: 0,
    createdAt: new Date(),
  } as Workout)) as number;

  await db.workoutExercises.add({
    workoutId,
    exerciseId,
    targetSets: 3,
    targetReps: 5,
    targetWeight: 225,
    order: 0,
  } as WorkoutExercise);

  return { workoutId, exerciseId };
}

// ── create — quick-start path ──────────────────────────────────────────────

describe('create — quick-start', () => {
  it('creates a log with auto-generated name and null workoutId', async () => {
    const userId = await seedUser();

    const log = await create(userId, null);

    expect(log.userId).toBe(userId);
    expect(log.workoutId).toBeNull();
    expect(log.name).toBe('Quick Workout 1');
    expect(log.finishedAt).toBeNull();
    expect(log.id).toBeTypeOf('number');
  });

  it('increments the name counter based on existing log count', async () => {
    const userId = await seedUser();

    const first = await create(userId, null);
    await finish(first.id!);
    const second = await create(userId, null);

    expect(second.name).toBe('Quick Workout 2');
  });

  it('does not create any logExercises', async () => {
    const userId = await seedUser();
    const log = await create(userId, null);

    const exercises = await db.logExercises.where('workoutLogId').equals(log.id!).toArray();
    expect(exercises).toHaveLength(0);
  });
});

// ── create — from-program path ─────────────────────────────────────────────

describe('create — from-program', () => {
  it('creates a log with the provided name and workoutId', async () => {
    const userId = await seedUser();
    const { workoutId } = await seedWorkoutWithExercises(userId);

    const log = await create(userId, workoutId, 'Leg Day');

    expect(log.userId).toBe(userId);
    expect(log.workoutId).toBe(workoutId);
    expect(log.name).toBe('Leg Day');
    expect(log.finishedAt).toBeNull();
  });

  it('copies workoutExercises into logExercises in order', async () => {
    const userId = await seedUser();
    const { workoutId, exerciseId } = await seedWorkoutWithExercises(userId);

    const log = await create(userId, workoutId, 'Leg Day');

    const logExercises = await db.logExercises.where('workoutLogId').equals(log.id!).toArray();
    expect(logExercises).toHaveLength(1);
    expect(logExercises[0].exerciseId).toBe(exerciseId);
    expect(logExercises[0].order).toBe(0);
    expect(logExercises[0].notes).toBeNull();
  });
});

// ── finish ─────────────────────────────────────────────────────────────────

describe('finish', () => {
  it('sets finishedAt on the log', async () => {
    const userId = await seedUser();
    const log = await create(userId, null);

    await finish(log.id!);

    const updated = await db.workoutLogs.get(log.id!);
    expect(updated!.finishedAt).toBeInstanceOf(Date);
  });

  it('removes the log from getActive results after finish', async () => {
    const userId = await seedUser();
    const log = await create(userId, null);

    await finish(log.id!);

    expect(await getActive(userId)).toBeNull();
  });
});

// ── create — guard: active workout exists ──────────────────────────────────

describe('create — guard: active workout exists', () => {
  it('throws if the user already has an active workout', async () => {
    const userId = await seedUser();
    await create(userId, null);
    await expect(create(userId, null)).rejects.toThrow('You have a workout in progress');
  });
});

// ── finish — guards ────────────────────────────────────────────────────────

describe('finish — guards', () => {
  it('throws if the log does not exist', async () => {
    await expect(finish(9999)).rejects.toThrow('Workout not found');
  });

  it('throws if the log is already finished', async () => {
    const userId = await seedUser();
    const log = await create(userId, null);
    await finish(log.id!);
    await expect(finish(log.id!)).rejects.toThrow('This workout is already finished');
  });
});

// ── deleteLog — cascade ────────────────────────────────────────────────────

describe('deleteLog', () => {
  it('deletes the workoutLog', async () => {
    const userId = await seedUser();
    const log = await create(userId, null);

    await deleteLog(log.id!);

    expect(await db.workoutLogs.get(log.id!)).toBeUndefined();
  });

  it('cascades: deletes logExercises and their logSets', async () => {
    const userId = await seedUser();
    const { workoutId } = await seedWorkoutWithExercises(userId);
    const log = await create(userId, workoutId, 'Leg Day');

    // Add a logSet to the copied logExercise
    const logExercises = await db.logExercises.where('workoutLogId').equals(log.id!).toArray();
    const leId = logExercises[0].id!;
    await db.logSets.add({
      logExerciseId: leId,
      setNumber: 1,
      weight: 225,
      reps: 5,
      previousWeight: null,
      previousReps: null,
    } as LogSet);

    await deleteLog(log.id!);

    expect(await db.logExercises.where('workoutLogId').equals(log.id!).toArray()).toHaveLength(0);
    expect(await db.logSets.where('logExerciseId').equals(leId).toArray()).toHaveLength(0);
  });
});
