/**
 * UserService — handles profile data read and write for the current user.
 * All user data is stored in the `users` table via Dexie.
 * Heights stored in inches, weights in lb — no conversion here (UserSettingsContext handles display).
 */

import { db } from '../db/db';
import type { User } from '../types';

/**
 * Returns the full User record for the given userId, or null if not found.
 * Called by: ProfilePage on mount.
 * Returns: User | null
 */
export async function getProfile(userId: number): Promise<User | null> {
  const user = await db.users.get(userId);
  return user ?? null;
}

/**
 * Updates one or more profile fields for the given user.
 * Partial update — only the provided fields are written; others are untouched.
 * `rpeEnabled` (Decision #26) gates the per-set RPE input on SetRow.
 * `trainingAge` (forward-compat for F30 onboarding / F37 Galpin recovery modifier).
 * Called by: ProfilePage on blur and toggle handlers.
 * Returns: void
 */
export async function updateProfile(
  userId: number,
  data: Partial<
    Pick<User, 'name' | 'height' | 'weight' | 'unitPreference' | 'rpeEnabled' | 'trainingAge'>
  >,
): Promise<void> {
  await db.users.update(userId, data);
}
