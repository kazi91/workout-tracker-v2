/**
 * db.ts — Dexie database instance for WorkoutTracker.
 * Defines all 8 tables with their indexed fields.
 * Import `db` from this file in service files only — never in components directly.
 *
 * Schema versions:
 * - v1 (initial): exercises had `category` index; no muscle taxonomy fields.
 * - v3 (CE1 + CE2 — Decision #28, locked Session 41): drops `exercises.category`,
 *   adds `parentExerciseId` secondary index for variant chevron expansion (CE2),
 *   adds nullable muscle-taxonomy + RPE + Tier 3 forward-compat fields.
 *   Migration nukes exercises + logExercises + logSets (D8.1 sub-option B2);
 *   App.tsx reseeds on next mount when count === 0. Silent (D8.3) — pre-launch only.
 *   Number jumps 1 → 3 to match planning-doc labels (no v2 was ever shipped in code).
 */
import Dexie, { type EntityTable } from 'dexie';
import type {
  User,
  Exercise,
  Program,
  Workout,
  WorkoutExercise,
  WorkoutLog,
  LogExercise,
  LogSet,
} from '../types';

class WorkoutTrackerDB extends Dexie {
  users!: EntityTable<User, 'id'>;
  exercises!: EntityTable<Exercise, 'id'>;
  programs!: EntityTable<Program, 'id'>;
  workouts!: EntityTable<Workout, 'id'>;
  workoutExercises!: EntityTable<WorkoutExercise, 'id'>;
  workoutLogs!: EntityTable<WorkoutLog, 'id'>;
  logExercises!: EntityTable<LogExercise, 'id'>;
  logSets!: EntityTable<LogSet, 'id'>;

  constructor() {
    super('WorkoutTrackerDB');

    this.version(1).stores({
      users:            '++id, email',
      exercises:        '++id, name, category',
      programs:         '++id, userId',
      workouts:         '++id, programId',
      workoutExercises: '++id, workoutId',
      workoutLogs:      '++id, userId',
      logExercises:     '++id, workoutLogId',
      logSets:          '++id, logExerciseId',
    });

    this.version(3)
      .stores({
        users:            '++id, email',
        exercises:        '++id, name, parentExerciseId',
        programs:         '++id, userId',
        workouts:         '++id, programId',
        workoutExercises: '++id, workoutId',
        workoutLogs:      '++id, userId',
        logExercises:     '++id, workoutLogId',
        logSets:          '++id, logExerciseId',
      })
      .upgrade(async (tx) => {
        // Nuke exercises + dependent log tables (D8.1 sub-option B2).
        // App.tsx reseeds the exercise library on next mount via count-zero check.
        await tx.table('logSets').clear();
        await tx.table('logExercises').clear();
        await tx.table('exercises').clear();
      });
  }
}

export const db = new WorkoutTrackerDB();
