/**
 * ExerciseCard — renders one exercise within an active or edit workout.
 * Header row: exercise name + optional target (shown only for from-program logs).
 * Column headers: Best | [unit] | reps (static labels above first set).
 * Set rows: one SetRow per logSet.
 * "+ Add Set" button: full-width green fill below set rows.
 * Remove button: removes this exercise from the log.
 * readOnly prop: hides Remove/Add Set buttons and renders SetRow in read-only text mode.
 */

import SetRow from './SetRow';
import type { LogExercise, LogSet, Exercise, WorkoutExercise } from '../../../types';
import styles from './ExerciseCard.module.css';

interface ExerciseCardProps {
  logExercise: LogExercise;
  exercise: Exercise | undefined;
  sets: LogSet[];
  /** Non-null only for from-program logs where the template exists (B1 handled in parent). */
  target: WorkoutExercise | null;
  weightUnit: string;
  displayWeight: (lb: number) => number;
  /** When true: hides Remove/Add Set controls; SetRows render as static text. */
  readOnly?: boolean;
  onAddSet: () => void;
  onRemoveExercise: () => void;
  onSetUpdate: (setId: number, weightLb: number, reps: number) => void;
  onSetDelete: (setId: number) => void;
}

export default function ExerciseCard({
  exercise,
  sets,
  target,
  weightUnit,
  displayWeight,
  readOnly = false,
  onAddSet,
  onRemoveExercise,
  onSetUpdate,
  onSetDelete,
}: ExerciseCardProps) {
  const targetLabel =
    target !== null
      ? target.targetWeight === 0
        ? `${target.targetSets} × ${target.targetReps} @ bodyweight`
        : `${target.targetSets} × ${target.targetReps} @ ${displayWeight(target.targetWeight)} ${weightUnit}`
      : null;

  return (
    <div className={styles.card}>
      {/* Header row */}
      <div className={styles.header}>
        <span className={styles.exerciseName}>{exercise?.name ?? '—'}</span>
        <div className={styles.headerRight}>
          {targetLabel && (
            <span className={styles.target}>Target: {targetLabel}</span>
          )}
          {!readOnly && (
            <button className={styles.removeBtn} onClick={onRemoveExercise}>
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Column labels — only shown when there's at least one set */}
      {sets.length > 0 && (
        <div className={styles.colHeaders}>
          <span className={styles.colSet}>#</span>
          <span className={styles.colBest}>Best</span>
          <span className={styles.colWeight}>{weightUnit}</span>
          <span className={styles.colReps}>reps</span>
          <span className={styles.colDel} />
        </div>
      )}

      {/* Set rows */}
      {sets.map((set, i) => (
        <SetRow
          key={set.id}
          set={set}
          setIndex={i + 1}
          weightUnit={weightUnit}
          displayWeight={displayWeight}
          readOnly={readOnly}
          onUpdate={(setId, weightLb, reps) => onSetUpdate(setId, weightLb, reps)}
          onDelete={(setId) => onSetDelete(setId)}
        />
      ))}

      {/* Add Set — hidden in read-only mode */}
      {!readOnly && (
        <button className={styles.addSetBtn} onClick={onAddSet}>
          + Add Set
        </button>
      )}
    </div>
  );
}
