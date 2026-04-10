/**
 * WorkoutDetailPage — renders active, read-only, or edit mode for a workout log.
 * Mode is determined by finishedAt on load: null = active, set = read-only (edit via button).
 * Edit mode is a local state transition — never entered on load.
 * In edit mode, changes auto-save to Dexie on blur; "Discard changes?" modal prevents accidental exit.
 * Reads: AuthContext (userId), UserSettingsContext (unit display), ActiveWorkoutContext (setActiveWorkoutId)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useActiveWorkout } from '../../context/ActiveWorkoutContext';
import * as WorkoutLogService from '../../services/WorkoutLogService';
import * as WorkoutExerciseService from '../../services/WorkoutExerciseService';
import * as WorkoutService from '../../services/WorkoutService';
import * as ProgramService from '../../services/ProgramService';
import * as LogExerciseService from '../../services/LogExerciseService';
import * as LogSetService from '../../services/LogSetService';
import * as ExerciseService from '../../services/ExerciseService';
import ExerciseCard from './components/ExerciseCard';
import ExerciseSearchModal from '../../components/ExerciseSearchModal';
import Modal from '../../components/Modal';
import type { WorkoutLog, LogExercise, LogSet, Exercise, WorkoutExercise, Program } from '../../types';
import styles from './WorkoutDetailPage.module.css';

// Finish flow step type (N2 — state machine spec locked in session 7)
type FinishFlowStep =
  | null
  | 'save-prompt'
  | 'program-picker'
  | 'new-program-form'
  | 'add-to-program-form';

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { weightUnit, displayWeight } = useUserSettings();
  const { setActiveWorkoutId } = useActiveWorkout();
  const navigate = useNavigate();

  // ── Core log state ──
  const [log, setLog] = useState<WorkoutLog | null>(null);
  const [logExercises, setLogExercises] = useState<LogExercise[]>([]);
  const [sets, setSets] = useState<Record<number, LogSet[]>>({});
  const [exerciseMap, setExerciseMap] = useState<Record<number, Exercise>>({});
  // workoutTargets: keyed by exerciseId — non-null only for from-program logs where template exists (B1)
  const [workoutTargets, setWorkoutTargets] = useState<Record<number, WorkoutExercise> | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Mode (Decision #21) ──
  // Derived from finishedAt on load; edit is a local transition only, never entered on load.
  const [mode, setMode] = useState<'active' | 'readonly' | 'edit'>('active');
  // True when any change occurs in edit mode — triggers "Discard changes?" modal on Back.
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // ── Inline workout rename ──
  const [logName, setLogName] = useState('');
  const [nameError, setNameError] = useState('');

  // ── Modals ──
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditDiscardModal, setShowEditDiscardModal] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);

  // ── Quick-start finish flow state machine ──
  const [finishFlowStep, setFinishFlowStep] = useState<FinishFlowStep>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [newProgramName, setNewProgramName] = useState('');
  const [workoutNameInput, setWorkoutNameInput] = useState('');
  const [programNameError, setProgramNameError] = useState('');
  const [workoutInputError, setWorkoutInputError] = useState('');

  // ── From-program sync modal ──
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncWorkoutName, setSyncWorkoutName] = useState('');
  const [syncWorkoutId, setSyncWorkoutId] = useState<number | null>(null);

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

    const exMap: Record<number, Exercise> = {};
    allExercises.forEach((ex) => { exMap[ex.id!] = ex; });

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
      // Template not found → B1 edge case: treat as quick-start (targets stays null)
    }

    setLog(workoutLog);
    setLogName(workoutLog.name);
    setLogExercises(les);
    setSets(setsMap);
    setExerciseMap(exMap);
    setWorkoutTargets(targets);
    setMode(workoutLog.finishedAt !== null ? 'readonly' : 'active');
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

  // ── Add / Remove Exercise ──
  async function handleExerciseSelect(exercise: Exercise) {
    if (!log?.id) return;
    if (mode === 'edit') setUnsavedChanges(true);
    const le = await LogExerciseService.add(log.id, exercise.id!);
    setLogExercises((prev) => [...prev, le]);
    setSets((prev) => ({ ...prev, [le.id!]: [] }));
    setExerciseMap((prev) => ({ ...prev, [exercise.id!]: exercise }));
    setShowExerciseSearch(false);
  }

  async function handleRemoveExercise(leId: number) {
    if (mode === 'edit') setUnsavedChanges(true);
    await LogExerciseService.remove(leId);
    setLogExercises((prev) => prev.filter((le) => le.id !== leId));
    setSets((prev) => { const next = { ...prev }; delete next[leId]; return next; });
  }

  // ── Add / Update / Delete Set ──
  async function handleAddSet(leId: number) {
    if (mode === 'edit') setUnsavedChanges(true);
    const newSet = await LogSetService.add(leId);
    setSets((prev) => ({ ...prev, [leId]: [...(prev[leId] ?? []), newSet] }));
  }

  async function handleSetUpdate(setId: number, leId: number, weightLb: number, reps: number) {
    if (mode === 'edit') setUnsavedChanges(true);
    await LogSetService.update(setId, { weight: weightLb, reps });
    setSets((prev) => ({
      ...prev,
      [leId]: (prev[leId] ?? []).map((s) => s.id === setId ? { ...s, weight: weightLb, reps } : s),
    }));
  }

  async function handleSetDelete(setId: number, leId: number) {
    if (mode === 'edit') setUnsavedChanges(true);
    await LogSetService.deleteSet(setId);
    setSets((prev) => ({ ...prev, [leId]: (prev[leId] ?? []).filter((s) => s.id !== setId) }));
  }

  // ── Back button — mode-aware ──
  function handleBack() {
    if (mode === 'edit') {
      if (unsavedChanges) {
        setShowEditDiscardModal(true);
      } else {
        setMode('readonly');
      }
    } else {
      navigate(-1);
    }
  }

  // ── Edit mode: Save Edits / Discard changes ──
  async function handleSaveEdits() {
    // Reload from Dexie to ensure all auto-saved changes are reflected in read-only view.
    // loadData also sets mode back to 'readonly' (finishedAt is set on finished logs).
    setUnsavedChanges(false);
    if (log?.id) await loadData(log.id);
  }

  function handleDiscardEditChanges() {
    // Exit edit mode without applying any in-progress (unblurred) changes.
    setShowEditDiscardModal(false);
    setMode('readonly');
    setUnsavedChanges(false);
  }

  // ── Delete Workout (read-only mode) ──
  async function handleDeleteWorkout() {
    if (!log?.id) return;
    await WorkoutLogService.deleteLog(log.id);
    navigate('/logs');
  }

  // ── Discard Workout (active mode) ──
  async function handleConfirmDiscard() {
    if (!log?.id) return;
    await WorkoutLogService.deleteLog(log.id);
    setActiveWorkoutId(null);
    navigate('/logs');
  }

  // ── Finish Workout — entry point ──
  async function handleFinish() {
    if (!log?.id || !user?.id) return;
    await WorkoutLogService.finish(log.id);
    setActiveWorkoutId(null);

    if (log.workoutId === null || workoutTargets === null) {
      // Quick-start (or B1: deleted template) — run save-to-program flow
      const progs = await ProgramService.getAll(user.id);
      setPrograms(progs);
      if (progs.length === 0) {
        // Skip picker — go straight to new-program form
        setFinishFlowStep('new-program-form');
      } else {
        setFinishFlowStep('save-prompt');
      }
    } else {
      // From-program — compare exercise sets (order ignored per Decision #19)
      const logExIds = new Set(logExercises.map((le) => le.exerciseId));
      const templateExIds = new Set(Object.keys(workoutTargets).map(Number));
      const changed =
        logExIds.size !== templateExIds.size ||
        [...logExIds].some((exId) => !templateExIds.has(exId));

      if (changed) {
        const template = await WorkoutService.getById(log.workoutId);
        setSyncWorkoutName(template?.name ?? 'Workout');
        setSyncWorkoutId(log.workoutId);
        setShowSyncModal(true);
      } else {
        // Exercises unchanged — silent finish
        navigate('/logs');
      }
    }
  }

  // ── Quick-start finish flow handlers ──

  function handleSaveToProgram() {
    // User tapped [Save to Program] on save-prompt — open picker (programs already loaded)
    setFinishFlowStep('program-picker');
  }

  function handleSelectExistingProgram(programId: number) {
    setSelectedProgramId(programId);
    setWorkoutNameInput('');
    setWorkoutInputError('');
    setFinishFlowStep('add-to-program-form');
  }

  function handlePickerNewProgram() {
    setNewProgramName('');
    setWorkoutNameInput('');
    setProgramNameError('');
    setWorkoutInputError('');
    setFinishFlowStep('new-program-form');
  }

  async function handleSaveNewProgram() {
    const progName = newProgramName.trim();
    const woName = workoutNameInput.trim();
    let hasError = false;
    if (!progName) { setProgramNameError("Name can't be blank"); hasError = true; }
    if (!woName) { setWorkoutInputError("Name can't be blank"); hasError = true; }
    if (hasError || !log?.id || !user?.id) return;

    const program = await ProgramService.create(user.id, progName);
    const workout = await WorkoutService.createFromLog(log.id, program.id!, woName, user.id);
    await WorkoutLogService.update(log.id, { workoutId: workout.id });
    navigate('/logs');
  }

  async function handleSaveToExistingProgram() {
    const woName = workoutNameInput.trim();
    if (!woName) { setWorkoutInputError("Name can't be blank"); return; }
    if (!log?.id || !selectedProgramId || !user?.id) return;

    const workout = await WorkoutService.createFromLog(log.id, selectedProgramId, woName, user.id);
    await WorkoutLogService.update(log.id, { workoutId: workout.id });
    navigate('/logs');
  }

  // ── From-program sync handlers ──

  async function handleUpdateTemplate() {
    if (syncWorkoutId && log?.id) {
      await WorkoutExerciseService.syncFromLog(syncWorkoutId, log.id);
    }
    navigate('/logs');
  }

  if (loading) return null;
  if (!log) return null;

  // Whether the new-program-form came from the picker (affects [Back] vs [Cancel])
  const cameFromPicker = programs.length > 0;
  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      {/* Workout name — editable in active/edit; static text in read-only */}
      {mode === 'readonly' ? (
        <h2 className={styles.nameText}>{log.name}</h2>
      ) : (
        <div className={styles.nameWrapper}>
          <input
            className={`${styles.nameInput} ${nameError ? styles.nameInputError : ''}`}
            type="text"
            autoCapitalize="words"
            value={logName}
            onChange={(e) => { setLogName(e.target.value); setNameError(''); }}
            onBlur={handleNameBlur}
          />
          {nameError && <span className={styles.fieldError}>{nameError}</span>}
        </div>
      )}

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
            readOnly={mode === 'readonly'}
            onAddSet={() => handleAddSet(le.id!)}
            onRemoveExercise={() => handleRemoveExercise(le.id!)}
            onSetUpdate={(setId, weightLb, reps) => handleSetUpdate(setId, le.id!, weightLb, reps)}
            onSetDelete={(setId) => handleSetDelete(setId, le.id!)}
          />
        ))}
      </div>

      {/* Add Exercise — hidden in read-only */}
      {mode !== 'readonly' && (
        <button className={styles.addExerciseBtn} onClick={() => setShowExerciseSearch(true)}>
          + Add Exercise
        </button>
      )}

      {/* Fixed footer — buttons vary by mode */}
      <div className={styles.footer}>
        {mode === 'active' && (
          <>
            <button className={styles.finishBtn} onClick={handleFinish}>
              Finish Workout
            </button>
            <button className={styles.discardBtn} onClick={() => setShowDiscardModal(true)}>
              Discard
            </button>
          </>
        )}
        {mode === 'readonly' && (
          <>
            <button className={styles.editWorkoutBtn} onClick={() => { setUnsavedChanges(false); setMode('edit'); }}>
              Edit Workout
            </button>
            <button className={styles.deleteWorkoutBtn} onClick={() => setShowDeleteModal(true)} aria-label="Delete workout">
              <Trash2 size={20} />
            </button>
          </>
        )}
        {mode === 'edit' && (
          <button className={styles.saveEditsBtn} onClick={handleSaveEdits}>
            Save Edits
          </button>
        )}
      </div>

      {/* Exercise search modal */}
      {showExerciseSearch && (
        <ExerciseSearchModal
          onSelect={handleExerciseSelect}
          onClose={() => setShowExerciseSearch(false)}
        />
      )}

      {/* Active mode: Discard Workout confirm */}
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

      {/* Read-only mode: Delete Workout confirm */}
      {showDeleteModal && (
        <Modal
          title="Delete Workout?"
          body="This workout will be permanently deleted."
          actions={[
            { label: 'Delete', onClick: handleDeleteWorkout, variant: 'destructive' },
            { label: 'Cancel', onClick: () => setShowDeleteModal(false), variant: 'secondary' },
          ]}
        />
      )}

      {/* Edit mode: Discard changes confirm (triggered by Back with unsaved changes) */}
      {showEditDiscardModal && (
        <Modal
          title="Discard changes?"
          body="Any changes you made will not be saved."
          actions={[
            { label: 'Discard', onClick: handleDiscardEditChanges, variant: 'destructive' },
            { label: 'Keep Editing', onClick: () => setShowEditDiscardModal(false), variant: 'secondary' },
          ]}
        />
      )}

      {/* ── Quick-start finish flow ── */}

      {/* Step 1: save-prompt */}
      {finishFlowStep === 'save-prompt' && (
        <Modal
          title="Save to a program?"
          actions={[
            { label: 'Save to Program', onClick: handleSaveToProgram, variant: 'primary' },
            { label: 'Skip', onClick: () => navigate('/logs'), variant: 'secondary' },
          ]}
        />
      )}

      {/* Step 2: program-picker */}
      {finishFlowStep === 'program-picker' && (
        <div className={styles.flowBackdrop}>
          <div className={styles.flowCard}>
            <h2 className={styles.flowTitle}>Choose a Program</h2>

            <ul className={styles.programList}>
              <li>
                <button className={styles.programRow} onClick={handlePickerNewProgram}>
                  <span className={styles.newProgramLabel}>＋ New Program</span>
                </button>
              </li>
              {programs.map((p) => (
                <li key={p.id}>
                  <button
                    className={styles.programRow}
                    onClick={() => handleSelectExistingProgram(p.id!)}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>

            <button className={styles.flowCancelBtn} onClick={() => navigate('/logs')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Step 3a: new-program-form (from picker or zero-programs path) */}
      {finishFlowStep === 'new-program-form' && (
        <div className={styles.flowBackdrop}>
          <div className={styles.flowCard}>
            <h2 className={styles.flowTitle}>New Program</h2>

            <div className={styles.flowField}>
              <label className={styles.flowLabel}>Program name</label>
              <input
                className={`${styles.flowInput} ${programNameError ? styles.flowInputError : ''}`}
                type="text"
                autoCapitalize="words"
                value={newProgramName}
                onChange={(e) => { setNewProgramName(e.target.value); setProgramNameError(''); }}
                autoFocus
              />
              {programNameError && <span className={styles.fieldError}>{programNameError}</span>}
            </div>

            <div className={styles.flowField}>
              <label className={styles.flowLabel}>Workout name</label>
              <input
                className={`${styles.flowInput} ${workoutInputError ? styles.flowInputError : ''}`}
                type="text"
                autoCapitalize="words"
                value={workoutNameInput}
                onChange={(e) => { setWorkoutNameInput(e.target.value); setWorkoutInputError(''); }}
              />
              {workoutInputError && <span className={styles.fieldError}>{workoutInputError}</span>}
            </div>

            <div className={styles.flowActions}>
              <button className={styles.flowSaveBtn} onClick={handleSaveNewProgram}>
                Save
              </button>
              {cameFromPicker ? (
                <button
                  className={styles.flowSecondaryBtn}
                  onClick={() => setFinishFlowStep('program-picker')}
                >
                  Back
                </button>
              ) : (
                <button className={styles.flowSecondaryBtn} onClick={() => navigate('/logs')}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3b: add-to-program-form (existing program selected) */}
      {finishFlowStep === 'add-to-program-form' && (
        <div className={styles.flowBackdrop}>
          <div className={styles.flowCard}>
            <h2 className={styles.flowTitle}>{selectedProgram?.name ?? 'Program'}</h2>

            <div className={styles.flowField}>
              <label className={styles.flowLabel}>Workout name</label>
              <input
                className={`${styles.flowInput} ${workoutInputError ? styles.flowInputError : ''}`}
                type="text"
                autoCapitalize="words"
                value={workoutNameInput}
                onChange={(e) => { setWorkoutNameInput(e.target.value); setWorkoutInputError(''); }}
                autoFocus
              />
              {workoutInputError && <span className={styles.fieldError}>{workoutInputError}</span>}
            </div>

            <div className={styles.flowActions}>
              <button className={styles.flowSaveBtn} onClick={handleSaveToExistingProgram}>
                Save
              </button>
              <button
                className={styles.flowSecondaryBtn}
                onClick={() => setFinishFlowStep('program-picker')}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── From-program sync modal ── */}
      {showSyncModal && (
        <Modal
          title={`Update ${syncWorkoutName}?`}
          body="You added or removed exercises. Update the template to match this session?"
          actions={[
            { label: 'Update Template', onClick: handleUpdateTemplate, variant: 'primary' },
            { label: 'Keep Original', onClick: () => navigate('/logs'), variant: 'secondary' },
          ]}
        />
      )}
    </div>
  );
}
