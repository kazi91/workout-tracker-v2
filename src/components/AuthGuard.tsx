/**
 * AuthGuard — protects all routes that require authentication.
 * Renders null while AuthContext is resolving (prevents flash of /login on returning users — D7).
 * Redirects to /login if no user session is found after loading completes.
 * Renders children if user is authenticated.
 * Used by: App.tsx wrapping all non-auth routes.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  // Blank screen while session is being restored from localStorage
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
