/**
 * WorkoutDetailPage — renders active, read-only, or edit mode for a workout log.
 * Mode is determined by finishedAt on load: null = active, set = read-only (edit via button).
 * Step 5a: active mode only. Read-only and edit modes added in step 5c.
 * Reads: AuthContext (userId), UserSettingsContext (unit display), ActiveWorkoutContext (setActiveWorkoutId)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useActiveWorkout } from '../../context/ActiveWorkoutContext';
import * as WorkoutLogService from '../../services/WorkoutLogService';
import * as WorkoutExerciseService from '../../services/WorkoutExerciseService';
import * as WorkoutService from '../../services/WorkoutService';
import * as LogExerciseService from '../../services/LogExerciseService';
import * as LogSetService from '../../services/LogSetService';
import * as ExerciseService from '../../services/ExerciseService';
import ExerciseCard from './components/ExerciseCard';
import ExerciseSearchModal from '../../components/ExerciseSearchModal';
import Modal from '../../components/Modal';
import type { WorkoutLog, LogExercise, LogSet, Exercise, WorkoutExercise } from '../../types';
import styles from './WorkoutDetailPage.module.css';

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { weightUnit, displayWeight } = useUserSettings();
  const { setActiveWorkoutId } = useActiveWorkout();
  const navigate = useNavigate();

  const [log, setLog] = useState<WorkoutLog | null>(null);
  const [logExercises, setLogExercises] = useState<LogExercise[]>([]);
  const [sets, setSets] = useState<Record<number, LogSet[]>>({});
  const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});
  // workoutTargets: keyed by exerciseId — non-null only for from-program logs where template exists (B1)
  const [workoutTargets, setWorkoutTargets] = useState<Record<number, WorkoutExercise> | null>(null);
  const [loading, setLoading] = useState(true);

  // Inline workout rename
  const [logName, setLogName] = useState('');
  const [nameError, setNameError] = useState('');

  // Modals
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);

  useEffect(() => {
    if (!user?.id || !id) return;
    loadData(Number(id));
  }, [id, user?.id]);

  async function loadData(logId: number) {
    const [workoutLog, allExercises] = await Promise.all([
      WorkoutLogService.getById(logId),
      ExerciseService.getAll(),
    ]);

    if (!workoutLog) { navigate('/logs', { replace: true }); return; }

    // Build exercise name lookup map
    const exMap: Record<number, Exercise> = {};
    allExercises.forEach((ex) => { exMap[ex.id!] = ex; });

    // Load logExercises + all their sets concurrently
    const les = await LogExerciseService.getByWorkoutLogId(logId);
    const setsArrays = await Promise.all(les.map((le) => LogSetService.getByExerciseId(le.id!)));
    const setsMap: Record<number, LogSet[]> = {};
    les.forEach((le, i) => { setsMap[le.id!] = setsArrays[i]; });

    // If from-program: load workout template targets (B1: guard against deleted template)
    let targets: Record<number, WorkoutExercise> | null = null;
    if (workoutLog.workoutId !== null) {
      const template = await WorkoutService.getById(workoutLog.workoutId);
      if (template) {
        const wes = await WorkoutExerciseService.getByWorkoutId(workoutLog.workoutId);
        targets = {};
        wes.forEach((we) => { targets![we.exerciseId] = we; });
      }
      // If template not found (deleted): B1 edge case — treat as quick-start (targets stays null)
    }

    setLog(workoutLog);
    setLogName(workoutLog.name);
    setLogExercises(les);
    setSets(setsMap);
    setExerciseMap(exMap);
    setWorkoutTargets(targets);
    setLoading(false);
  }

  // ── Workout rename ──
  async function handleNameBlur() {
    const trimmed = logName.trim();
    if (!trimmed) { setNameError("Name can't be blank"); setLogName(log!.name); return; }
    if (trimmed === log?.name) return;
    await WorkoutLogService.update(log!.id!, { name: trimmed });
    setLog((l) => l ? { ...l, name: trimmed } : l);
    setNameError('');
  }

  // ── Add Exercise ──
  async function handleExerciseSelect(exercise: Exercise) {
    if (!log?.id) return;
    const le = await LogExerciseService.add(log.id, exercise.id!);
    setLogExercises((prev) => [...prev, le]);
    setSets((prev) => ({ ...prev, [le.id!]: [] }));
    setExerciseMap((prev) => ({ ...prev, [exercise.id!]: exercise }));
    setShowExerciseSearch(false);
  }

  // ── Remove Exercise ──
  async function handleRemoveExercise(leId: number) {
    await LogExerciseService.remove(leId);
    setLogExercises((prev) => prev.filter((le) => le.id !== leId));
    setSets((prev) => {
      const next = { ...prev };
      delete next[leId];
      return next;
    });
  }

  // ── Add Set ──
  async function handleAddSet(leId: number) {
    const newSet = await LogSetService.add(leId);
    setSets((prev) => ({ ...prev, [leId]: [...(prev[leId] ?? []), newSet] }));
  }

  // ── Update Set ──
  async function handleSetUpdate(setId: number, leId: number, weightLb: number, reps: number) {
    await LogSetService.update(setId, { weight: weightLb, reps });
    setSets((prev) => ({
      ...prev,
      [leId]: (prev[leId] ?? []).map((s) =>
        s.id === setId ? { ...s, weight: weightLb, reps } : s,
      ),
    }));
  }

  // ── Delete Set ──
  async function handleSetDelete(setId: number, leId: number) {
    await LogSetService.deleteSet(setId);
    setSets((prev) => ({
      ...prev,
      [leId]: (prev[leId] ?? []).filter((s) => s.id !== setId),
    }));
  }

  // ── Finish Workout ──
  // TODO (5b): replace with full finish flow — save-to-program picker (quick-start) / sync prompt (from-program)
  async function handleFinish() {
    if (!log?.id) return;
    await WorkoutLogService.finish(log.id);
    setActiveWorkoutId(null);
    navigate('/logs');
  }

  // ── Discard Workout ──
  async function handleConfirmDiscard() {
    if (!log?.id) return;
    await WorkoutLogService.deleteLog(log.id);
    setActiveWorkoutId(null);
    navigate('/logs');
  }

  if (loading) return null;
  if (!log) return null;

  // Step 5a: active mode only — redirect finished logs until 5c builds read-only/edit modes
  if (log.finishedAt !== null) {
    navigate('/logs', { replace: true });
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      {/* Workout name — inline rename */}
      <div className={styles.nameWrapper}>
        <input
          className={`${styles.nameInput} ${nameError ? styles.nameInputError : ''}`}
          type="text"
          value={logName}
          onChange={(e) => { setLogName(e.target.value); setNameError(''); }}
          onBlur={handleNameBlur}
        />
        {nameError && <span className={styles.fieldError}>{nameError}</span>}
      </div>

      {/* Exercise cards */}
      <div className={styles.exerciseList}>
        {logExercises.map((le) => (
          <ExerciseCard
            key={le.id}
            logExercise={le}
            exercise={exerciseMap[le.exerciseId]}
            sets={sets[le.id!] ?? []}
            target={workoutTargets ? workoutTargets[le.exerciseId] ?? null : null}
            weightUnit={weightUnit}
            displayWeight={displayWeight}
            onAddSet={() => handleAddSet(le.id!)}
            onRemoveExercise={() => handleRemoveExercise(le.id!)}
            onSetUpdate={(setId, weightLb, reps) => handleSetUpdate(setId, le.id!, weightLb, reps)}
            onSetDelete={(setId) => handleSetDelete(setId, le.id!)}
          />
        ))}
      </div>

      {/* Add exercise */}
      <button className={styles.addExerciseBtn} onClick={() => setShowExerciseSearch(true)}>
        + Add Exercise
      </button>

      {/* Fixed footer: Finish + Discard */}
      <div className={styles.footer}>
        <button className={styles.finishBtn} onClick={handleFinish}>
          Finish Workout
        </button>
        <button className={styles.discardBtn} onClick={() => setShowDiscardModal(true)}>
          Discard
        </button>
      </div>

      {/* Exercise search modal */}
      {showExerciseSearch && (
        <ExerciseSearchModal
          onSelect={handleExerciseSelect}
          onClose={() => setShowExerciseSearch(false)}
        />
      )}

      {/* Discard confirm modal */}
      {showDiscardModal && (
        <Modal
          title="Discard Workout?"
          body="This workout will be permanently deleted."
          actions={[
            { label: 'Discard', onClick: handleConfirmDiscard, variant: 'destructive' },
            { label: 'Keep Going', onClick: () => setShowDiscardModal(false), variant: 'secondary' },
          ]}
        />
      )}
    </div>
  );
}
