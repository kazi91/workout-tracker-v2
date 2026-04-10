export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  height: number; // stored in inches
  weight: number; // stored in lb
  unitPreference: 'imperial' | 'metric';
  createdAt: Date;
}

export interface Exercise {
  id?: number;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  isCustom: boolean;
}

export interface Program {
  id?: number;
  userId: number;
  name: string;
  createdAt: Date;
}

export interface Workout {
  id?: number;
  userId: number;
  programId: number;
  name: string;
  order: number;
  createdAt: Date;
}

export interface WorkoutExercise {
  id?: number;
  workoutId: number;
  exerciseId: number;
  targetSets: number;
  targetReps: number;
  targetWeight: number; // stored in lb
  order: number;
}

export interface WorkoutLog {
  id?: number;
  userId: number;
  workoutId: number | null; // null = quick-start
  name: string;
  startedAt: Date;
  finishedAt: Date | null; // null = in progress
}

export interface LogExercise {
  id?: number;
  workoutLogId: number;
  exerciseId: number;
  notes: string | null;
  order: number;
}

export interface LogSet {
  id?: number;
  logExerciseId: number;
  setNumber: number;
  weight: number; // stored in lb
  reps: number;
  previousWeight: number | null; // stored in lb
  previousReps: number | null;
}
