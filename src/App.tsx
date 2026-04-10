/**
 * App.tsx — root component. Sets up BrowserRouter with all application routes.
 * On mount: checks if exercises table is empty and runs seedExercises() if so (fires once on first install).
 * AuthProvider wraps all routes — provides user session context app-wide.
 * AuthGuard wraps all protected routes — redirects unauthenticated users to /login.
 * Fallback route (*) redirects to /login.
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { db } from './db/db';
import { seedExercises } from './db/seed';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LogsPage from './pages/LogsPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import WorkoutTemplatePage from './pages/WorkoutTemplatePage';
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';

export default function App() {
  useEffect(() => {
    // Seed the exercise library on first install — runs once when the table is empty
    db.exercises.count().then((count) => {
      if (count === 0) {
        seedExercises().catch(console.error);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Unauthenticated routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes — redirect to /login if no session */}
          <Route path="/logs" element={<AuthGuard><LogsPage /></AuthGuard>} />
          <Route path="/logs/:id" element={<AuthGuard><WorkoutDetailPage /></AuthGuard>} />
          <Route path="/programs" element={<AuthGuard><ProgramsPage /></AuthGuard>} />
          <Route path="/programs/new" element={<AuthGuard><ProgramDetailPage /></AuthGuard>} />
          <Route path="/programs/:id" element={<AuthGuard><ProgramDetailPage /></AuthGuard>} />
          <Route path="/programs/:programId/workouts/new" element={<AuthGuard><WorkoutTemplatePage /></AuthGuard>} />
          <Route path="/programs/:programId/workouts/:workoutId" element={<AuthGuard><WorkoutTemplatePage /></AuthGuard>} />
          <Route path="/statistics" element={<AuthGuard><StatisticsPage /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
