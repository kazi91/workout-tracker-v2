/**
 * ProgramDetailPage — shows a program's workouts and allows renaming or deleting the program.
 * Handles both /programs/new (create mode) and /programs/:id (edit mode).
 * Program name is an inline rename field (auto-saves on blur; blank → "Name can't be blank").
 * "+ Add Workout" creates a workout and navigates to WorkoutTemplatePage.
 * Delete Program opens a confirm Modal; on confirm, cascades and navigates to /programs.
 * Reads: AuthContext (userId), ProgramService, WorkoutService, WorkoutExerciseService
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import * as ProgramService from '../../services/ProgramService';
import * as WorkoutService from '../../services/WorkoutService';
import * as WorkoutExerciseService from '../../services/WorkoutExerciseService';
import Modal from '../../components/Modal';
import type { Program, Workout } from '../../types';
import styles from './ProgramDetailPage.module.css';

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [program, setProgram] = useState<Program | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutCounts, setWorkoutCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  // Inline rename
  const [programName, setProgramName] = useState('');
  const [nameError, setNameError] = useState('');

  // Inline add workout
  const [addingWorkout, setAddingWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [workoutNameError, setWorkoutNameError] = useState('');
  const workoutInputRef = useRef<HTMLInputElement>(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isNew = !id || id === 'new';

  useEffect(() => {
    if (!user?.id) return;
    if (isNew) {
      // New program: open the add-workout name input after user provides a program name
      // Actually, /programs/new is handled by ProgramsPage inline create → navigate to /programs/:id
      // This route exists for completeness; redirect to /programs if reached without an id
      navigate('/programs', { replace: true });
      return;
    }
    loadData(Number(id));
  }, [id, user?.id]);

  useEffect(() => {
    if (addingWorkout) workoutInputRef.current?.focus();
  }, [addingWorkout]);

  async function loadData(programId: number) {
    const [prog, wks, counts] = await Promise.all([
      ProgramService.getById(programId),
      WorkoutService.getByProgramId(programId),
      WorkoutExerciseService.getCountsByProgramId(programId),
    ]);
    if (!prog) { navigate('/programs', { replace: true }); return; }
    setProgram(prog);
    setProgramName(prog.name);
    setWorkouts(wks);
    setWorkoutCounts(counts);
    setLoading(false);
  }

  // ── Program rename ──
  async function handleNameBlur() {
    const trimmed = programName.trim();
    if (!trimmed) { setNameError("Name can't be blank"); setProgramName(program!.name); return; }
    if (trimmed === program?.name) return;
    await ProgramService.update(program!.id!, { name: trimmed });
    setProgram((p) => p ? { ...p, name: trimmed } : p);
    setNameError('');
  }

  // ── Add Workout ──
  function handleOpenAddWorkout() {
    setNewWorkoutName('');
    setWorkoutNameError('');
    setAddingWorkout(true);
  }

  function handleCancelAddWorkout() {
    setAddingWorkout(false);
    setNewWorkoutName('');
    setWorkoutNameError('');
  }

  async function handleWorkoutNameBlur() {
    const trimmed = newWorkoutName.trim();
    if (!trimmed) { setWorkoutNameError("Name can't be blank"); return; }
    await submitAddWorkout(trimmed);
  }

  async function handleWorkoutNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const trimmed = newWorkoutName.trim();
      if (!trimmed) { setWorkoutNameError("Name can't be blank"); return; }
      await submitAddWorkout(trimmed);
    } else if (e.key === 'Escape') {
      handleCancelAddWorkout();
    }
  }

  async function submitAddWorkout(name: string) {
    if (!user?.id || !program?.id) return;
    const workout = await WorkoutService.create(user.id, program.id, name);
    setAddingWorkout(false);
    navigate(`/programs/${program.id}/workouts/${workout.id}`);
  }

  // ── Delete Program ──
  async function handleConfirmDelete() {
    if (!program?.id) return;
    await ProgramService.deleteProgram(program.id);
    navigate('/programs', { replace: true });
  }

  const exerciseLabel = (count: number) =>
    count === 1 ? '1 exercise' : `${count} exercises`;

  if (loading) return null;
  if (!program) return null;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/programs')}>
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      {/* Program name — inline rename */}
      <div className={styles.nameWrapper}>
        <input
          className={`${styles.nameInput} ${nameError ? styles.nameInputError : ''}`}
          type="text"
          value={programName}
          onChange={(e) => { setProgramName(e.target.value); setNameError(''); }}
          onBlur={handleNameBlur}
        />
        {nameError && <span className={styles.fieldError}>{nameError}</span>}
      </div>

      {/* Workout list */}
      {workouts.length === 0 && !addingWorkout && (
        <p className={styles.emptyHint}>
          Add a workout first, or start a quick workout and save it to this program when you're done.
        </p>
      )}

      <ul className={styles.list}>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <button
              className={styles.card}
              onClick={() => navigate(`/programs/${program.id}/workouts/${workout.id}`)}
            >
              <span className={styles.cardName}>{workout.name}</span>
              <span className={styles.cardMeta}>
                {exerciseLabel(workoutCounts[workout.id!] ?? 0)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Inline add workout form */}
      {addingWorkout && (
        <div className={styles.addWorkoutForm}>
          <input
            ref={workoutInputRef}
            className={`${styles.input} ${workoutNameError ? styles.inputError : ''}`}
            type="text"
            placeholder="Workout name"
            value={newWorkoutName}
            onChange={(e) => { setNewWorkoutName(e.target.value); setWorkoutNameError(''); }}
            onBlur={handleWorkoutNameBlur}
            onKeyDown={handleWorkoutNameKeyDown}
          />
          {workoutNameError && <span className={styles.fieldError}>{workoutNameError}</span>}
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {!addingWorkout && (
          <button className={styles.addWorkoutBtn} onClick={handleOpenAddWorkout}>
            <Plus size={18} />
            Add Workout
          </button>
        )}
        <button className={styles.deleteBtn} onClick={() => setShowDeleteModal(true)}>
          Delete Program
        </button>
      </div>

      {/* Delete confirm modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Program?"
          body={`"${program.name}" and all its workouts will be permanently deleted.`}
          actions={[
            { label: 'Delete', onClick: handleConfirmDelete, variant: 'destructive' },
            { label: 'Cancel', onClick: () => setShowDeleteModal(false), variant: 'secondary' },
          ]}
        />
      )}
    </div>
  );
}
