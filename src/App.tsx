import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { db } from './db/db';
import { seedExercises } from './db/seed';
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
    db.exercises.count().then((count) => {
      if (count === 0) {
        seedExercises().catch(console.error);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/logs/:id" element={<WorkoutDetailPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/new" element={<ProgramDetailPage />} />
        <Route path="/programs/:id" element={<ProgramDetailPage />} />
        <Route path="/programs/:programId/workouts/new" element={<WorkoutTemplatePage />} />
        <Route path="/programs/:programId/workouts/:workoutId" element={<WorkoutTemplatePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
