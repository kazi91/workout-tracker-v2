import { db } from './db';
import type { Exercise } from '../types';

const SEED_EXERCISES: Omit<Exercise, 'id'>[] = [
  // Chest
  { name: 'Bench Press', category: 'chest', isCustom: false },
  { name: 'Incline Bench Press', category: 'chest', isCustom: false },
  { name: 'Dumbbell Fly', category: 'chest', isCustom: false },
  { name: 'Push-Up', category: 'chest', isCustom: false },
  { name: 'Cable Fly', category: 'chest', isCustom: false },
  // Back
  { name: 'Deadlift', category: 'back', isCustom: false },
  { name: 'Pull-Up', category: 'back', isCustom: false },
  { name: 'Barbell Row', category: 'back', isCustom: false },
  { name: 'Lat Pulldown', category: 'back', isCustom: false },
  { name: 'Seated Cable Row', category: 'back', isCustom: false },
  // Legs
  { name: 'Squat', category: 'legs', isCustom: false },
  { name: 'Romanian Deadlift', category: 'legs', isCustom: false },
  { name: 'Leg Press', category: 'legs', isCustom: false },
  { name: 'Leg Curl', category: 'legs', isCustom: false },
  { name: 'Leg Extension', category: 'legs', isCustom: false },
  { name: 'Calf Raise', category: 'legs', isCustom: false },
  // Shoulders
  { name: 'Overhead Press', category: 'shoulders', isCustom: false },
  { name: 'Lateral Raise', category: 'shoulders', isCustom: false },
  { name: 'Front Raise', category: 'shoulders', isCustom: false },
  { name: 'Face Pull', category: 'shoulders', isCustom: false },
  // Arms
  { name: 'Barbell Curl', category: 'arms', isCustom: false },
  { name: 'Hammer Curl', category: 'arms', isCustom: false },
  { name: 'Tricep Pushdown', category: 'arms', isCustom: false },
  { name: 'Skull Crusher', category: 'arms', isCustom: false },
  { name: 'Dips', category: 'arms', isCustom: false },
  // Core
  { name: 'Plank', category: 'core', isCustom: false },
  { name: 'Crunch', category: 'core', isCustom: false },
  { name: 'Hanging Leg Raise', category: 'core', isCustom: false },
  { name: 'Ab Wheel Rollout', category: 'core', isCustom: false },
];

export async function seedExercises(): Promise<void> {
  await db.exercises.bulkAdd(SEED_EXERCISES as Exercise[]);
}
