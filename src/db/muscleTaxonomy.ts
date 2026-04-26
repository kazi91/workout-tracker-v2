/**
 * muscleTaxonomy.ts — single source of truth for muscle labels, group derivation,
 * volume multipliers, and recovery windows. Locked by Decisions #24, #25, #29.
 * No UI consumers for RECOVERY_WINDOWS this cycle (config only — referenced by future F29 avatar).
 */

import type { Muscle, MuscleGroup, Exercise } from '../types';

/** Title Case display strings — single source for all UI text referencing muscles. */
export const MUSCLE_LABELS: Record<Muscle, string> = {
  chest: 'Chest',
  lats: 'Lats',
  upperBack: 'Upper Back',
  lowerBack: 'Lower Back',
  upperTraps: 'Upper Traps',
  lowerTraps: 'Lower Traps',
  frontDelts: 'Front Delts',
  sideDelts: 'Side Delts',
  rearDelts: 'Rear Delts',
  serratus: 'Serratus',
  biceps: 'Biceps',
  brachialis: 'Brachialis',
  triceps: 'Triceps',
  forearms: 'Forearms',
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  adductors: 'Adductors',
  abductors: 'Abductors',
  hipFlexors: 'Hip Flexors',
  tibialis: 'Tibialis',
  abs: 'Abs',
  obliques: 'Obliques',
  neck: 'Neck',
  rotatorCuff: 'Rotator Cuff',
};

/** Specific muscle → broad group. Background neck attaches to shoulders for derivation. */
export const MUSCLE_TO_GROUP: Record<Muscle, MuscleGroup> = {
  chest: 'chest',
  serratus: 'chest',
  lats: 'back',
  upperBack: 'back',
  lowerBack: 'back',
  upperTraps: 'back',
  lowerTraps: 'back',
  frontDelts: 'shoulders',
  sideDelts: 'shoulders',
  rearDelts: 'shoulders',
  rotatorCuff: 'shoulders',
  neck: 'shoulders',
  biceps: 'arms',
  brachialis: 'arms',
  triceps: 'arms',
  forearms: 'arms',
  quads: 'legs',
  hamstrings: 'legs',
  glutes: 'legs',
  calves: 'legs',
  adductors: 'legs',
  abductors: 'legs',
  tibialis: 'legs',
  abs: 'core',
  obliques: 'core',
  hipFlexors: 'core',
};

/** Both synergist and stabilizer treated identically in MVP math (B-lite per Decision #24). */
export const SECONDARY_VOLUME_MULTIPLIER = 0.5;

/** Recovery windows in hours (Decision #25). Galpin training-age modifier deferred to F37. */
export const RECOVERY_WINDOWS: Record<Muscle, number> = {
  // Large bucket (60h, 9 muscles)
  chest: 60,
  lats: 60,
  upperBack: 60,
  lowerBack: 60,
  upperTraps: 60,
  frontDelts: 60,
  quads: 60,
  hamstrings: 60,
  glutes: 60,
  // Small bucket (36h, 15 muscles)
  lowerTraps: 36,
  sideDelts: 36,
  rearDelts: 36,
  serratus: 36,
  biceps: 36,
  brachialis: 36,
  triceps: 36,
  forearms: 36,
  abductors: 36,
  adductors: 36,
  hipFlexors: 36,
  calves: 36,
  tibialis: 36,
  abs: 36,
  obliques: 36,
  // Background-small (36h, 2)
  neck: 36,
  rotatorCuff: 36,
};

/** Broad group anchor — first declared primary wins when co-primaries span groups. */
export function getExerciseGroup(exercise: Pick<Exercise, 'primaryMuscles'>): MuscleGroup {
  return MUSCLE_TO_GROUP[exercise.primaryMuscles[0]];
}

export const MUSCLE_GROUPS: readonly MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
] as const;

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  arms: 'Arms',
  legs: 'Legs',
  core: 'Core',
};
