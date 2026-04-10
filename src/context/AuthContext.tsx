/**
 * AuthContext — manages the current user session app-wide.
 * On mount: reads userId from localStorage and fetches the full User from Dexie.
 * Shows a blank screen (null) while resolving to prevent a flash of unauthenticated content (D7).
 * Exposes: user, loading, login(), signup(), logout()
 * Consumed by: AuthGuard, UserSettingsContext, ActiveWorkoutContext
 */

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as AuthService from '../services/AuthService';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (
    name: string,
    email: string,
    password: string,
    unitPreference: 'imperial' | 'metric',
  ) => Promise<User>;
  logout: () => void;
  /** Merges updates into the current user object in memory (call after UserService.updateProfile). */
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider — wraps the app and initializes the user session on mount.
 * Must be the outermost context provider so UserSettingsContext and ActiveWorkoutContext
 * can depend on AuthContext.user being resolved first (sequential init — D7).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on app mount
    AuthService.getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<User | null> {
    const result = await AuthService.login(email, password);
    if (result) setUser(result);
    return result;
  }

  async function signup(
    name: string,
    email: string,
    password: string,
    unitPreference: 'imperial' | 'metric',
  ): Promise<User> {
    const result = await AuthService.signup(name, email, password, unitPreference);
    setUser(result);
    return result;
  }

  function logout(): void {
    AuthService.logout();
    setUser(null);
  }

  function updateUser(updates: Partial<User>): void {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — hook to access AuthContext from any component.
 * Throws if used outside of AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
