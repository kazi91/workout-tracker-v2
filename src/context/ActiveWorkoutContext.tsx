/**
 * ActiveWorkoutContext — tracks whether a workout is currently in progress.
 * Initializes on mount (regardless of login flow) by querying Dexie for a log with finishedAt === null.
 * This handles users who return via a persisted localStorage session without going through login (Decision #14).
 * Exposes: activeWorkoutId (number | null), setActiveWorkoutId
 * Consumed by: WorkoutFAB (visibility + label), WorkoutDetailPage (after finish/discard)
 */

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useError, toUserMessage } from './ErrorContext';
import { getActive } from '../services/WorkoutLogService';

interface ActiveWorkoutContextValue {
  activeWorkoutId: number | null;
  setActiveWorkoutId: (id: number | null) => void;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextValue | null>(null);

/**
 * ActiveWorkoutProvider — must be mounted inside AuthProvider.
 * Queries for an active workout whenever the logged-in user changes.
 */
export function ActiveWorkoutProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { showError } = useError();
  const [activeWorkoutId, setActiveWorkoutId] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.id) {
      // No user logged in — clear active workout state
      setActiveWorkoutId(null);
      return;
    }

    // Check Dexie for any in-progress log on mount or user change
    getActive(user.id)
      .then((log) => setActiveWorkoutId(log?.id ?? null))
      .catch((e) => showError(toUserMessage(e)));
  }, [user?.id]);

  return (
    <ActiveWorkoutContext.Provider value={{ activeWorkoutId, setActiveWorkoutId }}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}

/**
 * useActiveWorkout — hook to access active workout state.
 * Throws if used outside of ActiveWorkoutProvider.
 */
export function useActiveWorkout(): ActiveWorkoutContextValue {
  const ctx = useContext(ActiveWorkoutContext);
  if (!ctx) throw new Error('useActiveWorkout must be used within ActiveWorkoutProvider');
  return ctx;
}
