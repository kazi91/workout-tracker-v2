/**
 * ErrorContext — global error surface for user-facing error messages.
 * Provides showError(message) to any component in the tree.
 * ErrorBanner reads error state and calls clearError on dismiss.
 * Consumed by: all pages and contexts that make async service calls.
 */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ErrorContextValue {
  error: string | null;
  showError: (message: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextValue | null>(null);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{
      error,
      showError: (message: string) => setError(message),
      clearError: () => setError(null),
    }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError(): ErrorContextValue {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error('useError must be used inside ErrorProvider');
  return ctx;
}

/**
 * Extracts a user-readable message from an unknown thrown value.
 * Passes Error.message through; falls back to a generic string for non-Error throws.
 */
export function toUserMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Something went wrong. Try refreshing.';
}
