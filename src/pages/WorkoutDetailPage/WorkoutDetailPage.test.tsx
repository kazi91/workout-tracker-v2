import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import WorkoutDetailPage from './index';
import type { WorkoutLog } from '../../types';

// ── Context mocks ──────────────────────────────────────────────────────────
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 1, name: 'Test', email: 'test@example.com', unitPreference: 'imperial' } }),
}));
vi.mock('../../context/UserSettingsContext', () => ({
  useUserSettings: () => ({ weightUnit: 'lb', displayWeight: (w: number) => w }),
}));
vi.mock('../../context/ActiveWorkoutContext', () => ({
  useActiveWorkout: () => ({ setActiveWorkoutId: vi.fn() }),
}));
vi.mock('../../context/ErrorContext', () => ({
  useError: () => ({ error: null, showError: vi.fn(), clearError: vi.fn() }),
  toUserMessage: (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong. Try refreshing.'),
}));

// ── Service mocks ──────────────────────────────────────────────────────────
vi.mock('../../services/WorkoutLogService');
vi.mock('../../services/LogExerciseService');
vi.mock('../../services/LogSetService');
vi.mock('../../services/WorkoutService');
vi.mock('../../services/WorkoutExerciseService');
vi.mock('../../services/ProgramService');
vi.mock('../../services/ExerciseService');

import * as WorkoutLogService from '../../services/WorkoutLogService';
import * as LogExerciseService from '../../services/LogExerciseService';
import * as ExerciseService from '../../services/ExerciseService';

// ── Fixtures ───────────────────────────────────────────────────────────────
const activeLog: WorkoutLog = {
  id: 1,
  userId: 1,
  workoutId: null,
  name: 'Quick Workout 1',
  startedAt: new Date(),
  finishedAt: null,
};

const finishedLog: WorkoutLog = {
  ...activeLog,
  finishedAt: new Date(),
};

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/logs/1']}>
      <Routes>
        <Route path="/logs/:id" element={<WorkoutDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  // IntersectionObserver is not in jsdom — stub with a class so `new IntersectionObserver()` works
  vi.stubGlobal('IntersectionObserver', class {
    observe = vi.fn();
    disconnect = vi.fn();
  });
  vi.mocked(LogExerciseService.getByWorkoutLogId).mockResolvedValue([]);
  vi.mocked(ExerciseService.getAll).mockResolvedValue([]);
});

// ── U4: Finish blocked with 0 exercises (active mode) ─────────────────────
describe('U4 — Finish blocked with 0 exercises', () => {
  beforeEach(() => {
    vi.mocked(WorkoutLogService.getById).mockResolvedValue(activeLog);
  });

  it('does not call WorkoutLogService.finish when exercise list is empty', async () => {
    renderPage();
    fireEvent.click(await screen.findByText('Finish Workout'));
    expect(vi.mocked(WorkoutLogService.finish)).not.toHaveBeenCalled();
  });
});

// ── U5a: Save Edits blocked with blank name (edit mode) ───────────────────
describe('U5a — Save Edits blocked with blank name', () => {
  beforeEach(() => {
    vi.mocked(WorkoutLogService.getById).mockResolvedValue(finishedLog);
  });

  it('shows name error and does not reload when name is blank', async () => {
    renderPage();
    fireEvent.click(await screen.findByText('Edit Workout'));
    fireEvent.change(screen.getByDisplayValue(finishedLog.name), { target: { value: '' } });
    fireEvent.click(screen.getByText('Save Edits'));
    expect(screen.getByText("Name can't be blank")).toBeInTheDocument();
    // loadData not re-called — getById was called once (initial load only)
    expect(vi.mocked(WorkoutLogService.getById)).toHaveBeenCalledTimes(1);
  });
});

// ── U5b: Save Edits blocked with 0 exercises (edit mode) ──────────────────
describe('U5b — Save Edits blocked with 0 exercises', () => {
  beforeEach(() => {
    vi.mocked(WorkoutLogService.getById).mockResolvedValue(finishedLog);
  });

  it('does not reload when exercise list is empty in edit mode', async () => {
    renderPage();
    fireEvent.click(await screen.findByText('Edit Workout'));
    fireEvent.click(screen.getByText('Save Edits'));
    // loadData not re-called — getById was called once (initial load only)
    expect(vi.mocked(WorkoutLogService.getById)).toHaveBeenCalledTimes(1);
  });
});
