/**
 * types/index.ts — TypeScript interfaces for all 8 database tables.
 * Mirror the Dexie schema. Weights stored in lb, heights in inches —
 * conversion to kg/cm at display time via UserSettingsContext.
 */

// ── Muscle taxonomy (Decisions #24, #25, #29 — locked Session 40/41) ──
// camelCase IDs. Display labels live in db/muscleTaxonomy.ts (MUSCLE_LABELS).

export type Muscle =
  // user-surfaced (24)
  | 'chest'
  | 'lats'
  | 'upperBack'
  | 'lowerBack'
  | 'upperTraps'
  | 'lowerTraps'
  | 'frontDelts'
  | 'sideDelts'
  | 'rearDelts'
  | 'serratus'
  | 'biceps'
  | 'brachialis'
  | 'triceps'
  | 'forearms'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'adductors'
  | 'abductors'
  | 'hipFlexors'
  | 'tibialis'
  | 'abs'
  | 'obliques'
  // background (2) — seed-only, never user-tagged (D6.4)
  | 'neck'
  | 'rotatorCuff';

export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core';

export type SecondaryRole = 'synergist' | 'stabilizer';

export interface SecondaryMuscle {
  muscle: Muscle;
  role: SecondaryRole;
}

// ── Tables ──

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  height: number; // stored in inches
  weight: number; // stored in lb
  unitPreference: 'imperial' | 'metric';
  rpeEnabled: boolean; // default false; gates per-set RPE entry UI (Decision #26)
  trainingAge: string | null; // forward-compat (F30 onboarding / F37 Galpin recovery modifier)
  createdAt: Date;
}

export interface Exercise {
  id?: number;
  name: string;
  isCustom: boolean;
  // Variant FK (CE2). null = parent-level / standalone. Non-null = variant of the referenced parent.
  // Per CE2 Rule 1, the referenced parent's own parentExerciseId must be null (flat hierarchy).
  parentExerciseId: number | null;
  primaryMuscles: Muscle[]; // co-primaries allowed when EMG/research supports
  secondaryMuscles: SecondaryMuscle[]; // role-tagged; both 0.5× in MVP math
  // Tier 3 forward-compat — UX deferred (F39); strings, no enum lock
  equipment: string | null;
  gripWidth: string | null;
  gripOrientation: string | null;
  stanceWidth: string | null;
  bias: string | null;
  jointLoad: string[]; // forward-compat for Injury-Warning system (F31); default []
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
  // 1–10 scale, half-points allowed (7.5, 8.5). Optional even when users.rpeEnabled is true —
  // never blocks set save. No pre-fill (Decision #26).
  rpe: number | null;
}
