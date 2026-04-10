/**
 * WorkoutFAB — floating action button for starting or resuming a workout.
 * Visibility rules (Decision #15, N1):
 *   - Hidden on /login and /signup
 *   - Hidden on /logs/:id when that :id matches the active workout (already in active mode)
 *   - "Resume Workout" on all other tabs when a workout is in progress
 *   - "Start Workout" on /logs only when no workout is in progress
 *   - Hidden everywhere else when no active workout
 * Reads: ActiveWorkoutContext (activeWorkoutId), AuthContext (userId for quick-start)
 */

import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActiveWorkout } from '../context/ActiveWorkoutContext';
import * as WorkoutLogService from '../services/WorkoutLogService';
import styles from './WorkoutFAB.module.css';

const HIDDEN_ROUTES = ['/login', '/signup'];

export default function WorkoutFAB() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { activeWorkoutId, setActiveWorkoutId } = useActiveWorkout();

  // Match /logs/:id to detect if we're viewing a specific log
  const logMatch = useMatch('/logs/:id');

  // Hidden on auth pages or if not logged in
  if (HIDDEN_ROUTES.includes(pathname) || !user) return null;

  // Hidden on /logs/:id when viewing the active workout (N1 resolution)
  if (logMatch && Number(logMatch.params.id) === activeWorkoutId) return null;

  // Active workout in progress — show "Resume Workout" everywhere else
  if (activeWorkoutId !== null) {
    return (
      <button
        className={styles.fab}
        aria-label="Resume Workout"
        onClick={() => navigate(`/logs/${activeWorkoutId}`)}
      >
        <span style={{ fontSize: '22px', lineHeight: 1 }}>💪</span>
      </button>
    );
  }

  // No active workout — show "Start Workout" on /logs tab only
  if (pathname === '/logs') {
    async function handleStartWorkout() {
      if (!user?.id) return;
      const log = await WorkoutLogService.create(user.id, null);
      setActiveWorkoutId(log.id!);
      navigate(`/logs/${log.id}`);
    }

    return (
      <button
        className={styles.fab}
        aria-label="Start Workout"
        onClick={handleStartWorkout}
      >
        <span style={{ fontSize: '22px', lineHeight: 1 }}>💪</span>
      </button>
    );
  }

  return null;
}
