/**
 * db.ts — Dexie database instance for WorkoutTracker.
 * Defines all 8 tables with their indexed fields (schema string locked — D1).
 * Import `db` from this file in service files only — never in components directly.
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
  }
}

export const db = new WorkoutTrackerDB();
