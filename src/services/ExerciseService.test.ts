import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { getAll, search, create, deleteExercise } from './ExerciseService';
import type {
  Exercise,
  User,
  WorkoutLog,
  LogExercise,
  LogSet,
  Workout,
  WorkoutExercise,
  Program,
} from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

function exerciseLike(overrides: Partial<Exercise> = {}): Omit<Exercise, 'id'> {
  return {
    name: 'Test Exercise',
    isCustom: false,
    parentExerciseId: null,
    primaryMuscles: ['chest'],
    secondaryMuscles: [],
    equipment: null,
    gripWidth: null,
    gripOrientation: null,
    stanceWidth: null,
    bias: null,
    jointLoad: [],
    ...overrides,
  };
}

async function addExercise(overrides: Partial<Exercise> = {}): Promise<number> {
  const id = (await db.exercises.add(exerciseLike(overrides) as Exercise)) as number;
  return id;
}

// ── search ─────────────────────────────────────────────────────────────────

describe('search', () => {
  beforeEach(async () => {
    await addExercise({ name: 'Bench Press', primaryMuscles: ['chest'] });
    await addExercise({
      name: 'Squat',
      primaryMuscles: ['quads'],
      secondaryMuscles: [{ muscle: 'glutes', role: 'synergist' }],
    });
    await addExercise({
      name: 'Tricep Pushdown',
      primaryMuscles: ['triceps'],
    });
    await addExercise({
      name: 'Cable External Rotation',
      primaryMuscles: ['rotatorCuff'],
    });
  });

  it('returns all entries on empty query', async () => {
    const results = await search('');
    expect(results).toHaveLength(4);
  });

  it('matches name substring case-insensitively', async () => {
    const results = await search('bench');
    expect(results.map((e) => e.name)).toEqual(['Bench Press']);
  });

  it('matches by muscle id', async () => {
    const results = await search('quads');
    expect(results.map((e) => e.name)).toEqual(['Squat']);
  });

  it('matches by muscle display label (with space)', async () => {
    await addExercise({
      name: 'Lateral Raise',
      primaryMuscles: ['sideDelts'],
    });
    const results = await search('side delts');
    expect(results.map((e) => e.name)).toEqual(['Lateral Raise']);
  });

  it('matches secondary muscles', async () => {
    const results = await search('glutes');
    expect(results.map((e) => e.name)).toEqual(['Squat']);
  });

  it('does not surface entries via background-muscle tag match (D6.4)', async () => {
    const results = await search('rotator cuff');
    expect(results).toHaveLength(0);
  });

  it('still finds background-muscle exercises by name', async () => {
    const results = await search('external rotation');
    expect(results.map((e) => e.name)).toEqual(['Cable External Rotation']);
  });

  it('filters by broad group when provided', async () => {
    const results = await search('', 'legs');
    expect(results.map((e) => e.name)).toEqual(['Squat']);
  });

  it('combines query + group filter', async () => {
    await addExercise({ name: 'Hammer Curl', primaryMuscles: ['biceps', 'brachialis'] });
    const armsBiceps = await search('biceps', 'arms');
    expect(armsBiceps.map((e) => e.name)).toEqual(['Hammer Curl']);
  });

  it('returns alphabetical order', async () => {
    const results = await search('');
    const names = results.map((e) => e.name);
    expect(names).toEqual([...names].sort());
  });
});

// ── getAll ─────────────────────────────────────────────────────────────────

describe('getAll', () => {
  it('returns alphabetical order', async () => {
    await addExercise({ name: 'Squat' });
    await addExercise({ name: 'Bench Press' });
    await addExercise({ name: 'Deadlift' });
    const results = await getAll();
    expect(results.map((e) => e.name)).toEqual(['Bench Press', 'Deadlift', 'Squat']);
  });
});

// ── create ─────────────────────────────────────────────────────────────────

describe('create', () => {
  it('inserts a parent-level exercise', async () => {
    const ex = await create(exerciseLike({ name: 'My Curl', isCustom: true }));
    expect(ex.id).toBeTypeOf('number');
    expect(ex.parentExerciseId).toBeNull();
  });

  it('inserts a variant pointing to a valid parent', async () => {
    const parentId = await addExercise({ name: 'Bench Press' });
    const variant = await create(
      exerciseLike({ name: 'Custom Paused Bench', isCustom: true, parentExerciseId: parentId }),
    );
    expect(variant.parentExerciseId).toBe(parentId);
  });

  it('rejects blank name', async () => {
    await expect(create(exerciseLike({ name: '   ' }))).rejects.toThrow("Name can't be blank");
  });

  it('rejects empty primaryMuscles', async () => {
    await expect(create(exerciseLike({ primaryMuscles: [] }))).rejects.toThrow(
      'At least one primary muscle is required',
    );
  });

  it('rejects nesting under a missing parent', async () => {
    await expect(
      create(exerciseLike({ name: 'Orphan', parentExerciseId: 9999 })),
    ).rejects.toThrow('Parent exercise not found');
  });

  it('rejects nesting under a variant (Rule 1 — flat hierarchy)', async () => {
    const parentId = await addExercise({ name: 'Pull-Up' });
    const variantId = await addExercise({
      name: 'Chin-Up',
      parentExerciseId: parentId,
    });
    await expect(
      create(exerciseLike({ name: 'My Variant', parentExerciseId: variantId })),
    ).rejects.toThrow('Cannot nest under a variant');
  });
});

// ── deleteExercise ─────────────────────────────────────────────────────────

async function seedExerciseWithLogHistory(overrides: Partial<Exercise> = {}): Promise<{
  exerciseId: number;
  logExerciseId: number;
  logSetId: number;
  workoutExerciseId: number;
}> {
  const exerciseId = await addExercise({ isCustom: true, ...overrides });

  const userId = (await db.users.add({
    email: 't@e.com',
    password: 'x',
    name: 'T',
    height: 0,
    weight: 0,
    unitPreference: 'imperial',
    createdAt: new Date(),
  } as User)) as number;

  const programId = (await db.programs.add({
    userId,
    name: 'P',
    createdAt: new Date(),
  } as Program)) as number;

  const workoutId = (await db.workouts.add({
    userId,
    programId,
    name: 'W',
    order: 0,
    createdAt: new Date(),
  } as Workout)) as number;

  const workoutExerciseId = (await db.workoutExercises.add({
    workoutId,
    exerciseId,
    targetSets: 3,
    targetReps: 5,
    targetWeight: 100,
    order: 0,
  } as WorkoutExercise)) as number;

  const logId = (await db.workoutLogs.add({
    userId,
    workoutId: null,
    name: 'L',
    startedAt: new Date(),
    finishedAt: null,
  } as WorkoutLog)) as number;

  const logExerciseId = (await db.logExercises.add({
    workoutLogId: logId,
    exerciseId,
    notes: null,
    order: 0,
  } as LogExercise)) as number;

  const logSetId = (await db.logSets.add({
    logExerciseId,
    setNumber: 1,
    weight: 100,
    reps: 5,
    previousWeight: null,
    previousReps: null,
    rpe: null,
  } as LogSet)) as number;

  return { exerciseId, logExerciseId, logSetId, workoutExerciseId };
}

describe('deleteExercise', () => {
  it('rejects deletion of a seeded exercise', async () => {
    const id = await addExercise({ isCustom: false });
    await expect(deleteExercise(id, { cascade: false })).rejects.toThrow(
      'Seeded exercises cannot be deleted',
    );
  });

  it('deletes a custom exercise with no children and purges its log + template history', async () => {
    const { exerciseId, logExerciseId, logSetId, workoutExerciseId } =
      await seedExerciseWithLogHistory();

    await deleteExercise(exerciseId, { cascade: false });

    expect(await db.exercises.get(exerciseId)).toBeUndefined();
    expect(await db.logExercises.get(logExerciseId)).toBeUndefined();
    expect(await db.logSets.get(logSetId)).toBeUndefined();
    expect(await db.workoutExercises.get(workoutExerciseId)).toBeUndefined();
  });

  it('cascade=false orphans variants — children stay, parentExerciseId set to null', async () => {
    const parentId = await addExercise({ name: 'Custom Parent', isCustom: true });
    const childId = await addExercise({
      name: 'Custom Child',
      isCustom: true,
      parentExerciseId: parentId,
    });

    await deleteExercise(parentId, { cascade: false });

    expect(await db.exercises.get(parentId)).toBeUndefined();
    const child = await db.exercises.get(childId);
    expect(child).toBeDefined();
    expect(child!.parentExerciseId).toBeNull();
  });

  it('cascade=true deletes parent + children + their log history', async () => {
    const parentId = await addExercise({ name: 'Custom Parent', isCustom: true });
    const childId = await addExercise({
      name: 'Custom Child',
      isCustom: true,
      parentExerciseId: parentId,
    });

    // Give the child a logExercise + logSet.
    const userId = (await db.users.add({
      email: 'a@b.com',
      password: 'x',
      name: 'A',
      height: 0,
      weight: 0,
      unitPreference: 'imperial',
      createdAt: new Date(),
    } as User)) as number;
    const logId = (await db.workoutLogs.add({
      userId,
      workoutId: null,
      name: 'L',
      startedAt: new Date(),
      finishedAt: null,
    } as WorkoutLog)) as number;
    const childLEId = (await db.logExercises.add({
      workoutLogId: logId,
      exerciseId: childId,
      notes: null,
      order: 0,
    } as LogExercise)) as number;
    const childLSId = (await db.logSets.add({
      logExerciseId: childLEId,
      setNumber: 1,
      weight: 50,
      reps: 8,
      previousWeight: null,
      previousReps: null,
      rpe: null,
    } as LogSet)) as number;

    await deleteExercise(parentId, { cascade: true });

    expect(await db.exercises.get(parentId)).toBeUndefined();
    expect(await db.exercises.get(childId)).toBeUndefined();
    expect(await db.logExercises.get(childLEId)).toBeUndefined();
    expect(await db.logSets.get(childLSId)).toBeUndefined();
  });

  it('throws if exercise does not exist', async () => {
    await expect(deleteExercise(9999, { cascade: false })).rejects.toThrow('Exercise not found');
  });
});
