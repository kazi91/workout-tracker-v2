/**
 * WorkoutTemplatePage — view/edit a workout template: exercises, targets, and start workout.
 * Handles both /programs/:programId/workouts/new and /programs/:programId/workouts/:workoutId.
 * Workout name auto-saves on blur. Exercises added via ExerciseSearchModal with default targets.
 * Edit Targets Modal opens on tap of a target line (sets/reps/weight).
 * "Start Workout" is blocked if no exercises or an active workout is already running.
 * Reads: AuthContext (userId), UserSettingsContext (weight unit display), ActiveWorkoutContext (activeWorkoutId)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useActiveWorkout } from '../../context/ActiveWorkoutContext';
import * as WorkoutService from '../../services/WorkoutService';
import * as WorkoutExerciseService from '../../services/WorkoutExerciseService';
import * as ExerciseService from '../../services/ExerciseService';
import * as WorkoutLogService from '../../services/WorkoutLogService';
import ExerciseSearchModal from '../../components/ExerciseSearchModal';
import Modal from '../../components/Modal';
import type { Workout, WorkoutExercise, Exercise } from '../../types';
import { kgToLb } from '../../utils/units';
import styles from './WorkoutTemplatePage.module.css';

export default function WorkoutTemplatePage() {
  const { programId, workoutId } = useParams<{ programId: string; workoutId: string }>();
  const { user } = useAuth();
  const { weightUnit, displayWeight } = useUserSettings();
  const { activeWorkoutId, setActiveWorkoutId } = useActiveWorkout();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  // Lookup map: exerciseId → Exercise (hoisted — R1: avoids calling getAll inside map)
  const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});
  const [loading, setLoading] = useState(true);

  // Inline rename
  const [workoutName, setWorkoutName] = useState('');
  const [nameError, setNameError] = useState('');

  // Edit Targets Modal: id of the workoutExercise being edited, or null = closed
  const [editingTargetId, setEditingTargetId] = useState<number | null>(null);
  const [targetSets, setTargetSets] = useState('');
  const [targetReps, setTargetReps] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetErrors, setTargetErrors] = useState<{ sets?: string; reps?: string; weight?: string }>({});

  // ExerciseSearchModal
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // "Start Workout" inline blocking messages
  const [startError, setStartError] = useState('');

  const isNew = !workoutId || workoutId === 'new';

  useEffect(() => {
    if (!user?.id) return;
    if (isNew) {
      // /workouts/new is reached only via ProgramDetailPage "+ Add Workout" which creates the
      // workout first and then navigates to the real id — this should not normally be reached.
      navigate(`/programs/${programId}`, { replace: true });
      return;
    }
    loadData(Number(workoutId));
  }, [workoutId, user?.id]);

  async function loadData(wId: number) {
    const [wo, wes, allExercises] = await Promise.all([
      WorkoutService.getById(wId),
      WorkoutExerciseService.getByWorkoutId(wId),
      ExerciseService.getAll(),
    ]);
    if (!wo) { navigate(`/programs/${programId}`, { replace: true }); return; }
    setWorkout(wo);
    setWorkoutName(wo.name);
    setWorkoutExercises(wes);
    // Build lookup map for exercise names
    const map: Record<number, Exercise> = {};
    allExercises.forEach((ex) => { map[ex.id!] = ex; });
    setExerciseMap(map);
    setLoading(false);
  }

  // ── Workout rename ──
  async function handleNameBlur() {
    const trimmed = workoutName.trim();
    if (!trimmed) { setNameError("Name can't be blank"); setWorkoutName(workout!.name); return; }
    if (trimmed === workout?.name) return;
    await WorkoutService.update(workout!.id!, { name: trimmed });
    setWorkout((w) => w ? { ...w, name: trimmed } : w);
    setNameError('');
  }

  // ── Add Exercise ──
  async function handleExerciseSelect(exercise: Exercise) {
    if (!workout?.id) return;
    const we = await WorkoutExerciseService.add(workout.id, exercise.id!);
    setWorkoutExercises((prev) => [...prev, we]);
    // Ensure the new exercise is in the lookup map (handles custom exercises)
    setExerciseMap((prev) => ({ ...prev, [exercise.id!]: exercise }));
    setShowExerciseSearch(false);
  }

  // ── Remove Exercise ──
  async function handleRemoveExercise(weId: number) {
    await WorkoutExerciseService.remove(weId);
    setWorkoutExercises((prev) => prev.filter((we) => we.id !== weId));
  }

  // ── Edit Targets Modal ──
  function openEditTargets(we: WorkoutExercise) {
    setEditingTargetId(we.id!);
    setTargetSets(String(we.targetSets));
    setTargetReps(String(we.targetReps));
    // Display weight converted from lb if user is in metric
    setTargetWeight(
      weightUnit === 'kg'
        ? String(Math.round(displayWeight(we.targetWeight) * 10) / 10)
        : String(we.targetWeight),
    );
    setTargetErrors({});
  }

  function closeEditTargets() {
    setEditingTargetId(null);
    setTargetErrors({});
  }

  async function handleSaveTargets() {
    const setsNum = parseInt(targetSets, 10);
    const repsNum = parseInt(targetReps, 10);
    const weightNum = parseFloat(targetWeight);

    const errors: { sets?: string; reps?: string; weight?: string } = {};
    if (!Number.isInteger(setsNum) || setsNum < 1 || setsNum > 99) errors.sets = 'Enter a valid number';
    if (!Number.isInteger(repsNum) || repsNum < 1 || repsNum > 999) errors.reps = 'Enter a valid number';
    if (isNaN(weightNum) || weightNum < 0 || weightNum > 9999) errors.weight = 'Enter a valid number';

    if (Object.keys(errors).length > 0) { setTargetErrors(errors); return; }

    // Convert kg → lb before storing (all weights stored in lb)
    const weightInLb = weightUnit === 'kg' ? kgToLb(weightNum) : weightNum;

    await WorkoutExerciseService.update(editingTargetId!, {
      targetSets: setsNum,
      targetReps: repsNum,
      targetWeight: weightInLb,
    });

    setWorkoutExercises((prev) =>
      prev.map((we) =>
        we.id === editingTargetId
          ? { ...we, targetSets: setsNum, targetReps: repsNum, targetWeight: weightInLb }
          : we,
      ),
    );
    closeEditTargets();
  }

  // ── Start Workout ──
  async function handleStartWorkout() {
    setStartError('');
    if (workoutExercises.length === 0) {
      setStartError('Add at least one exercise to start.');
      return;
    }
    if (activeWorkoutId !== null) {
      setStartError('You have a workout in progress. Finish or discard it before starting a new one.');
      return;
    }
    if (!user?.id || !workout?.id) return;
    const log = await WorkoutLogService.create(user.id, workout.id, workout.name);
    setActiveWorkoutId(log.id!);
    navigate(`/logs/${log.id}`);
  }

  // ── Delete Workout ──
  async function handleConfirmDelete() {
    if (!workout?.id) return;
    await WorkoutService.deleteWorkout(workout.id);
    navigate(`/programs/${programId}`, { replace: true });
  }

  // ── Target line display ──
  function targetLabel(we: WorkoutExercise): string {
    const weight = displayWeight(we.targetWeight);
    const weightStr =
      we.targetWeight === 0 ? 'bodyweight' : `${weight} ${weightUnit}`;
    return `${we.targetSets} sets × ${we.targetReps} reps | top set: ${weightStr}`;
  }

  const editingWE = editingTargetId !== null
    ? workoutExercises.find((we) => we.id === editingTargetId)
    : null;
  const editingExerciseName = editingWE ? (exerciseMap[editingWE.exerciseId]?.name ?? '') : '';

  if (loading) return null;
  if (!workout) return null;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(`/programs/${programId}`)}>
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      {/* Workout name — inline rename */}
      <div className={styles.nameWrapper}>
        <input
          className={`${styles.nameInput} ${nameError ? styles.nameInputError : ''}`}
          type="text"
          autoCapitalize="words"
          value={workoutName}
          onChange={(e) => { setWorkoutName(e.target.value); setNameError(''); }}
          onBlur={handleNameBlur}
        />
        {nameError && <span className={styles.fieldError}>{nameError}</span>}
      </div>

      {/* Exercise list */}
      {workoutExercises.length === 0 && (
        <p className={styles.emptyHint}>Add exercises to get started.</p>
      )}

      <ul className={styles.exerciseList}>
        {workoutExercises.map((we) => (
          <li key={we.id} className={styles.exerciseCard}>
            <div className={styles.exerciseHeader}>
              <span className={styles.exerciseName}>
                {exerciseMap[we.exerciseId]?.name ?? '—'}
              </span>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemoveExercise(we.id!)}
                aria-label="Remove exercise"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {/* Target line — tap to open Edit Targets Modal */}
            <button className={styles.targetLine} onClick={() => openEditTargets(we)}>
              {targetLabel(we)}
            </button>
          </li>
        ))}
      </ul>

      {/* Action buttons */}
      <div className={styles.actionArea}>
        <div className={styles.actionRow}>
          <button className={styles.addBtn} onClick={() => setShowExerciseSearch(true)}>
            + Add
          </button>
        </div>
        <div className={styles.actionAreaDivider} />
        <div className={styles.actionRow}>
          <button className={styles.startBtn} onClick={handleStartWorkout}>
            Start
          </button>
        </div>
        {startError && <p className={styles.startError}>{startError}</p>}
        <div className={styles.actionRow}>
          <button className={styles.doneBtn} onClick={() => navigate('/programs')}>
            Done
          </button>
          <button className={styles.deleteBtn} onClick={() => setShowDeleteModal(true)} aria-label="Delete workout">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Exercise search modal */}
      {showExerciseSearch && (
        <ExerciseSearchModal
          onSelect={handleExerciseSelect}
          onClose={() => setShowExerciseSearch(false)}
        />
      )}

      {/* Edit Targets Modal */}
      {editingTargetId !== null && (
        <div className={styles.modalBackdrop} onClick={closeEditTargets}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Edit Targets — {editingExerciseName}</h2>

            <div className={styles.targetField}>
              <label className={styles.targetLabel}>Sets</label>
              <input
                className={`${styles.targetInput} ${targetErrors.sets ? styles.targetInputError : ''}`}
                type="number"
                inputMode="numeric"
                min="1"
                value={targetSets}
                onChange={(e) => { setTargetSets(e.target.value); setTargetErrors((p) => ({ ...p, sets: undefined })); }}
              />
              {targetErrors.sets && <span className={styles.fieldError}>{targetErrors.sets}</span>}
            </div>

            <div className={styles.targetField}>
              <label className={styles.targetLabel}>Reps</label>
              <input
                className={`${styles.targetInput} ${targetErrors.reps ? styles.targetInputError : ''}`}
                type="number"
                inputMode="numeric"
                min="1"
                value={targetReps}
                onChange={(e) => { setTargetReps(e.target.value); setTargetErrors((p) => ({ ...p, reps: undefined })); }}
              />
              {targetErrors.reps && <span className={styles.fieldError}>{targetErrors.reps}</span>}
            </div>

            <div className={styles.targetField}>
              <label className={styles.targetLabel}>Weight ({weightUnit})</label>
              <input
                className={`${styles.targetInput} ${targetErrors.weight ? styles.targetInputError : ''}`}
                type="number"
                inputMode="decimal"
                min="0"
                value={targetWeight}
                onChange={(e) => { setTargetWeight(e.target.value); setTargetErrors((p) => ({ ...p, weight: undefined })); }}
              />
              {targetErrors.weight && <span className={styles.fieldError}>{targetErrors.weight}</span>}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalSaveBtn} onClick={handleSaveTargets}>Save</button>
              <button className={styles.modalCancelBtn} onClick={closeEditTargets}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Workout?"
          body={`"${workout.name}" and all its exercises will be permanently deleted.`}
          actions={[
            { label: 'Delete', onClick: handleConfirmDelete, variant: 'destructive' },
            { label: 'Cancel', onClick: () => setShowDeleteModal(false), variant: 'secondary' },
          ]}
        />
      )}
    </div>
  );
}
