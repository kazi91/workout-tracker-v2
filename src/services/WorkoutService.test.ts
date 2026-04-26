import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { create, getByProgramId, getById, deleteWorkout, createFromLog } from './WorkoutService';
import type { User, Program, Workout, WorkoutExercise, WorkoutLog, LogExercise, LogSet, Exercise } from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function seedUserAndProgram(): Promise<{ userId: number; programId: number }> {
  const userId = (await db.users.add({
    email: 'test@example.com',
    password: 'x',
    name: 'Test',
    height: 0,
    weight: 0,
    unitPreference: 'imperial',
    createdAt: new Date(),
  } as User)) as number;

  const programId = (await db.programs.add({
    userId,
    name: 'Test Program',
    createdAt: new Date(),
  } as Program)) as number;

  return { userId, programId };
}

// ── create ─────────────────────────────────────────────────────────────────

describe('create', () => {
  it('creates a workout and returns it with id and order 0', async () => {
    const { userId, programId } = await seedUserAndProgram();
    const workout = await create(userId, programId, 'Day 1');
    expect(workout.id).toBeTypeOf('number');
    expect(workout.name).toBe('Day 1');
    expect(workout.order).toBe(0);
  });

  it('assigns the next order index for subsequent workouts', async () => {
    const { userId, programId } = await seedUserAndProgram();
    await create(userId, programId, 'Day 1');
    const second = await create(userId, programId, 'Day 2');
    expect(second.order).toBe(1);
  });

  it('throws if name is blank', async () => {
    const { userId, programId } = await seedUserAndProgram();
    await expect(create(userId, programId, '')).rejects.toThrow("Name can't be blank");
  });
});

// ── getByProgramId ─────────────────────────────────────────────────────────

describe('getByProgramId', () => {
  it('returns workouts ordered by order field ascending', async () => {
    const { userId, programId } = await seedUserAndProgram();
    // seed out-of-order to confirm sort is applied
    await db.workouts.add({ userId, programId, name: 'Day 2', order: 1, createdAt: new Date() } as Workout);
    await db.workouts.add({ userId, programId, name: 'Day 1', order: 0, createdAt: new Date() } as Workout);

    const workouts = await getByProgramId(programId);
    expect(workouts[0].name).toBe('Day 1');
    expect(workouts[1].name).toBe('Day 2');
  });
});

// ── getById ────────────────────────────────────────────────────────────────

describe('getById', () => {
  it('returns undefined when not found', async () => {
    expect(await getById(9999)).toBeUndefined();
  });
});

// ── deleteWorkout — cascade ────────────────────────────────────────────────

describe('deleteWorkout — cascade', () => {
  it('deletes the workout and its workoutExercises', async () => {
    const { userId, programId } = await seedUserAndProgram();
    const workout = await create(userId, programId, 'Day 1');

    await db.workoutExercises.add({
      workoutId: workout.id!,
      exerciseId: 1,
      targetSets: 3,
      targetReps: 5,
      targetWeight: 225,
      order: 0,
    } as WorkoutExercise);

    await deleteWorkout(workout.id!);

    expect(await db.workouts.get(workout.id!)).toBeUndefined();
    expect(await db.workoutExercises.where('workoutId').equals(workout.id!).toArray()).toHaveLength(0);
  });
});

// ── createFromLog ──────────────────────────────────────────────────────────

describe('createFromLog', () => {
  it('creates a workout with workoutExercises derived from the log', async () => {
    const { userId, programId } = await seedUserAndProgram();
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
      finishedAt: new Date(),
    } as WorkoutLog)) as number;

    const leId = (await db.logExercises.add({
      workoutLogId: logId,
      exerciseId,
      notes: null,
      order: 0,
    } as LogExercise)) as number;

    await db.logSets.add({ logExerciseId: leId, setNumber: 1, weight: 225, reps: 5, previousWeight: null, previousReps: null } as LogSet);
    await db.logSets.add({ logExerciseId: leId, setNumber: 2, weight: 245, reps: 3, previousWeight: null, previousReps: null } as LogSet);

    const workout = await createFromLog(logId, programId, 'Leg Day', userId);

    expect(workout.name).toBe('Leg Day');
    const wes = await db.workoutExercises.where('workoutId').equals(workout.id!).toArray();
    expect(wes).toHaveLength(1);
    // targets derived from the first set (set 1: 225 lb, 5 reps); targetSets = total sets logged
    expect(wes[0].targetWeight).toBe(225);
    expect(wes[0].targetReps).toBe(5);
    expect(wes[0].targetSets).toBe(2);
  });
});
