/**
 * AuthService — handles all authentication operations.
 * Stores the logged-in userId in localStorage (key: workout_tracker_user_id).
 * Passwords are stored as plain text in Dexie for MVP — tracked for replacement in R3.
 * All methods interact with the `users` table via the db instance.
 */

import { db } from '../db/db';
import type { User } from '../types';

const SESSION_KEY = 'workout_tracker_user_id';

/**
 * Creates a new user account and stores the session in localStorage.
 * Guards: name must not be blank; email must contain @; password must be >= 6 characters.
 * Does not check for duplicate emails (local-only MVP — no email uniqueness enforcement).
 * Called by: SignupPage on form submit.
 * Returns: the newly created User with id populated.
 */
export async function signup(
  name: string,
  email: string,
  password: string,
  unitPreference: 'imperial' | 'metric',
): Promise<User> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  if (!trimmedName) throw new Error("Name can't be blank");
  if (!trimmedEmail || !trimmedEmail.includes('@')) throw new Error('Enter a valid email address');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');

  const id = await db.users.add({
    name: trimmedName,
    email: trimmedEmail,
    password,
    unitPreference,
    height: 0,
    weight: 0,
    createdAt: new Date(),
  } as User);

  const user = await db.users.get(id);
  if (!user) throw new Error('Failed to create user');

  localStorage.setItem(SESSION_KEY, String(id));
  return user;
}

/**
 * Verifies email + password and stores the session in localStorage on success.
 * Looks up user by email, then compares password directly (plain text — MVP).
 * Called by: LoginPage on form submit.
 * Returns: the matching User, or null if credentials are invalid.
 */
export async function login(email: string, password: string): Promise<User | null> {
  const user = await db.users.where('email').equals(email).first();
  if (!user || user.password !== password) return null;

  localStorage.setItem(SESSION_KEY, String(user.id));
  return user;
}

/**
 * Clears the current session from localStorage.
 * Called by: ProfilePage logout button (Step 6).
 */
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Returns the full User object for the current session, or null if not logged in.
 * Reads userId from localStorage, then fetches the user from Dexie.
 * Called by: AuthContext on mount.
 * Returns: User | null
 */
export async function getCurrentUser(): Promise<User | null> {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  const user = await db.users.get(Number(raw));
  return user ?? null;
}

/**
 * Returns the userId stored in localStorage, or null if not logged in.
 * Used for quick userId lookups without a Dexie query.
 * Called by: services that need userId without full user object.
 * Returns: number | null
 */
export function getCurrentUserId(): number | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? Number(raw) : null;
}
