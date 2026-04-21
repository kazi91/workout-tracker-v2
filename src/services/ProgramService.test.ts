import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { create, getAll, getById, update, deleteProgram } from './ProgramService';
import type { User, Program, Workout, WorkoutExercise } from '../types';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function seedUser(): Promise<number> {
  return (await db.users.add({
    email: 'test@example.com',
    password: 'x',
    name: 'Test',
    height: 0,
    weight: 0,
    unitPreference: 'imperial',
    createdAt: new Date(),
  } as User)) as number;
}

// ── create ─────────────────────────────────────────────────────────────────

describe('create', () => {
  it('creates a program and returns it with id populated', async () => {
    const userId = await seedUser();
    const program = await create(userId, 'Push Day');
    expect(program.id).toBeTypeOf('number');
    expect(program.name).toBe('Push Day');
    expect(program.userId).toBe(userId);
  });

  it('throws if name is blank', async () => {
    const userId = await seedUser();
    await expect(create(userId, '')).rejects.toThrow("Name can't be blank");
  });

  it('throws if name is whitespace-only', async () => {
    const userId = await seedUser();
    await expect(create(userId, '   ')).rejects.toThrow("Name can't be blank");
  });
});

// ── getAll ─────────────────────────────────────────────────────────────────

describe('getAll', () => {
  it('returns programs ordered by createdAt ascending', async () => {
    const userId = await seedUser();
    // seed directly to control createdAt timestamps
    await db.programs.add({ userId, name: 'First', createdAt: new Date('2024-01-01') } as Program);
    await db.programs.add({ userId, name: 'Second', createdAt: new Date('2024-01-02') } as Program);

    const programs = await getAll(userId);
    expect(programs).toHaveLength(2);
    expect(programs[0].name).toBe('First');
    expect(programs[1].name).toBe('Second');
  });
});

// ── getById ────────────────────────────────────────────────────────────────

describe('getById', () => {
  it('returns the program when found', async () => {
    const userId = await seedUser();
    const program = await create(userId, 'Push Day');
    expect(await getById(program.id!)).toBeDefined();
  });

  it('returns undefined when not found', async () => {
    expect(await getById(9999)).toBeUndefined();
  });
});

// ── update ─────────────────────────────────────────────────────────────────

describe('update', () => {
  it('updates the program name', async () => {
    const userId = await seedUser();
    const program = await create(userId, 'Push Day');
    await update(program.id!, { name: 'Pull Day' });
    const updated = await db.programs.get(program.id!);
    expect(updated!.name).toBe('Pull Day');
  });
});

// ── deleteProgram — cascade ────────────────────────────────────────────────

describe('deleteProgram — cascade', () => {
  it('deletes the program, its workouts, and their workoutExercises', async () => {
    const userId = await seedUser();
    const program = await create(userId, 'Push Day');

    const workoutId = (await db.workouts.add({
      userId,
      programId: program.id!,
      name: 'Day 1',
      order: 0,
      createdAt: new Date(),
    } as Workout)) as number;

    await db.workoutExercises.add({
      workoutId,
      exerciseId: 1,
      targetSets: 3,
      targetReps: 10,
      targetWeight: 135,
      order: 0,
    } as WorkoutExercise);

    await deleteProgram(program.id!);

    expect(await db.programs.get(program.id!)).toBeUndefined();
    expect(await db.workouts.where('programId').equals(program.id!).toArray()).toHaveLength(0);
    expect(await db.workoutExercises.where('workoutId').equals(workoutId).toArray()).toHaveLength(0);
  });
});
