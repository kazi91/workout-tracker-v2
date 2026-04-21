import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { signup, login, logout, getCurrentUser, getCurrentUserId } from './AuthService';

const SESSION_KEY = 'workout_tracker_user_id';

beforeEach(async () => {
  await db.delete();
  await db.open();
  localStorage.clear();
});

// ── signup ─────────────────────────────────────────────────────────────────

describe('signup', () => {
  it('creates a user and returns it with id populated', async () => {
    const user = await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    expect(user.id).toBeTypeOf('number');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.unitPreference).toBe('imperial');
  });

  it('sets the session key in localStorage', async () => {
    const user = await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    expect(localStorage.getItem(SESSION_KEY)).toBe(String(user.id));
  });

  it('trims whitespace from name and email before saving', async () => {
    const user = await signup('  Alice  ', '  alice@example.com  ', 'password123', 'imperial');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
  });

  it('throws if name is blank', async () => {
    await expect(signup('', 'alice@example.com', 'password123', 'imperial'))
      .rejects.toThrow("Name can't be blank");
  });

  it('throws if name is whitespace-only', async () => {
    await expect(signup('   ', 'alice@example.com', 'password123', 'imperial'))
      .rejects.toThrow("Name can't be blank");
  });

  it('throws if email has no @', async () => {
    await expect(signup('Alice', 'notanemail', 'password123', 'imperial'))
      .rejects.toThrow('Enter a valid email address');
  });

  it('throws if password is fewer than 6 characters', async () => {
    await expect(signup('Alice', 'alice@example.com', '12345', 'imperial'))
      .rejects.toThrow('Password must be at least 6 characters');
  });
});

// ── login ──────────────────────────────────────────────────────────────────

describe('login', () => {
  beforeEach(async () => {
    await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    localStorage.clear(); // reset session set by signup
  });

  it('returns the user on correct credentials', async () => {
    const user = await login('alice@example.com', 'password123');
    expect(user).not.toBeNull();
    expect(user!.name).toBe('Alice');
  });

  it('sets the session key in localStorage on successful login', async () => {
    const user = await login('alice@example.com', 'password123');
    expect(localStorage.getItem(SESSION_KEY)).toBe(String(user!.id));
  });

  it('returns null for an unknown email', async () => {
    expect(await login('unknown@example.com', 'password123')).toBeNull();
  });

  it('returns null for a wrong password', async () => {
    expect(await login('alice@example.com', 'wrongpassword')).toBeNull();
  });
});

// ── logout ─────────────────────────────────────────────────────────────────

describe('logout', () => {
  it('removes the session key from localStorage', async () => {
    await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    logout();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  });
});

// ── getCurrentUser ─────────────────────────────────────────────────────────

describe('getCurrentUser', () => {
  it('returns the user when a session exists', async () => {
    const created = await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    const current = await getCurrentUser();
    expect(current).not.toBeNull();
    expect(current!.id).toBe(created.id);
  });

  it('returns null when no session exists', async () => {
    expect(await getCurrentUser()).toBeNull();
  });
});

// ── getCurrentUserId ───────────────────────────────────────────────────────

describe('getCurrentUserId', () => {
  it('returns the userId when a session exists', async () => {
    const user = await signup('Alice', 'alice@example.com', 'password123', 'imperial');
    expect(getCurrentUserId()).toBe(user.id);
  });

  it('returns null when no session exists', async () => {
    expect(getCurrentUserId()).toBeNull();
  });
});
