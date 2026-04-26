/**
 * UserSettingsContext — exposes the user's unit preference, RPE toggle, and conversion helpers.
 * Reads from AuthContext.user — no independent Dexie query (N3).
 * Resets automatically when AuthContext.user changes (logout → login with different account).
 * Exposes: unitPreference, rpeEnabled, displayWeight(), displayHeight(), weightUnit, heightUnit
 * Consumed by: any component that displays a weight, height, or per-set RPE input.
 */

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { lbToKg, inToCm } from '../utils/units';

interface UserSettingsContextValue {
  unitPreference: 'imperial' | 'metric';
  /** Gates the per-set RPE input on SetRow (Decision #26). Defaults to false. */
  rpeEnabled: boolean;
  /** Converts a stored lb value to the display unit. */
  displayWeight: (lb: number) => number;
  /** Converts a stored inches value to the display unit. */
  displayHeight: (inches: number) => number;
  /** Label for weight unit: "lb" or "kg" */
  weightUnit: string;
  /** Label for height unit: "in" or "cm" */
  heightUnit: string;
}

const UserSettingsContext = createContext<UserSettingsContextValue | null>(null);

/**
 * UserSettingsProvider — must be mounted inside AuthProvider.
 * Derives unit preference from the current user — no separate state needed (N3).
 */
export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const value = useMemo<UserSettingsContextValue>(() => {
    const pref = user?.unitPreference ?? 'imperial';
    const isMetric = pref === 'metric';

    return {
      unitPreference: pref,
      rpeEnabled: user?.rpeEnabled ?? false,
      displayWeight: (lb) => (isMetric ? lbToKg(lb) : lb),
      displayHeight: (inches) => (isMetric ? inToCm(inches) : inches),
      weightUnit: isMetric ? 'kg' : 'lb',
      heightUnit: isMetric ? 'cm' : 'in',
    };
  }, [user?.unitPreference, user?.rpeEnabled]);

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

/**
 * useUserSettings — hook to access unit preference and conversion helpers.
 * Throws if used outside of UserSettingsProvider.
 */
export function useUserSettings(): UserSettingsContextValue {
  const ctx = useContext(UserSettingsContext);
  if (!ctx) throw new Error('useUserSettings must be used within UserSettingsProvider');
  return ctx;
}
