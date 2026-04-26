/**
 * SetRow — renders a single set within an ExerciseCard.
 * Displays: set number, Best (previousWeight × previousReps), weight input, reps input,
 * optional RPE input (rpeEnabled), delete button.
 * Auto-saves on blur: weight/reps save together; RPE saves independently (Decision #26 —
 * RPE never blocks weight/reps save; null is a valid value).
 * RPE column appears only when rpeEnabled is true; readOnly mode renders static text.
 */

import { useState } from 'react';
import { X } from 'lucide-react';
import { kgToLb } from '../../../utils/units';
import type { LogSet } from '../../../types';
import styles from './SetRow.module.css';

interface SetRowProps {
  set: LogSet;
  setIndex: number; // 1-based display number
  weightUnit: string;
  displayWeight: (lb: number) => number;
  rpeEnabled: boolean;
  readOnly?: boolean;
  onUpdate: (
    setId: number,
    data: { weight?: number; reps?: number; rpe?: number | null },
  ) => void;
  onDelete: (setId: number) => void;
}

export default function SetRow({
  set,
  setIndex,
  weightUnit,
  displayWeight,
  rpeEnabled,
  readOnly = false,
  onUpdate,
  onDelete,
}: SetRowProps) {
  // Show empty string for 0 (new sets) so the input looks blank, not "0"
  const [weightStr, setWeightStr] = useState(
    set.weight === 0 ? '' : String(Math.round(displayWeight(set.weight) * 10) / 10),
  );
  const [repsStr, setRepsStr] = useState(set.reps === 0 ? '' : String(set.reps));
  const [rpeStr, setRpeStr] = useState(set.rpe === null ? '' : String(set.rpe));
  const [weightError, setWeightError] = useState(false);
  const [repsError, setRepsError] = useState(false);
  const [rpeError, setRpeError] = useState(false);

  const bestLabel =
    set.previousWeight !== null && set.previousReps !== null
      ? `${Math.round(displayWeight(set.previousWeight) * 10) / 10} × ${set.previousReps}`
      : '—';

  const rowClass = `${styles.row} ${rpeEnabled ? styles.rowWithRpe : ''}`;

  function saveSet(weight: string, reps: string) {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);
    const weightValid = weight !== '' && !isNaN(weightNum) && weightNum >= 0 && weightNum <= 9999;
    // 0 reps is valid — represents a missed attempt at that weight
    const repsValid = reps !== '' && Number.isInteger(repsNum) && repsNum >= 0 && repsNum <= 999;
    setWeightError(!weightValid);
    setRepsError(!repsValid);
    if (!weightValid || !repsValid) return;
    const weightInLb = weightUnit === 'kg' ? kgToLb(weightNum) : weightNum;
    onUpdate(set.id!, { weight: weightInLb, reps: repsNum });
  }

  function saveRpe(rpe: string) {
    // Blank clears the RPE — saves null without blocking (Decision #26)
    if (rpe.trim() === '') {
      setRpeError(false);
      onUpdate(set.id!, { rpe: null });
      return;
    }
    const n = parseFloat(rpe);
    // 1–10 in 0.5 increments — n*2 must be a whole number
    const valid = !isNaN(n) && n >= 1 && n <= 10 && Number.isInteger(n * 2);
    setRpeError(!valid);
    if (!valid) return;
    onUpdate(set.id!, { rpe: n });
  }

  if (readOnly) {
    return (
      <div className={rowClass}>
        <span className={styles.setNum}>{setIndex}</span>
        <span className={styles.best}>{bestLabel}</span>
        <span className={styles.readonlyVal}>
          {set.weight === 0 ? '—' : `${Math.round(displayWeight(set.weight) * 10) / 10}`}
        </span>
        <span className={styles.readonlyVal}>{set.reps === 0 ? '—' : set.reps}</span>
        {rpeEnabled && (
          <span className={styles.readonlyVal}>{set.rpe === null ? '—' : set.rpe}</span>
        )}
        <span /> {/* spacer for delete column */}
      </div>
    );
  }

  return (
    <div className={rowClass}>
      <span className={styles.setNum}>{setIndex}</span>

      <span className={styles.best}>{bestLabel}</span>

      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${weightError ? styles.inputError : ''}`}
          type="number"
          inputMode="decimal"
          value={weightStr}
          onChange={(e) => {
            setWeightStr(e.target.value);
            setWeightError(false);
            // Spinner clicks fire 'insertReplacementText'; keyboard input does not — save immediately for spinner only
            if ((e.nativeEvent as InputEvent).inputType === 'insertReplacementText') {
              saveSet(e.target.value, repsStr);
            }
          }}
          onBlur={() => saveSet(weightStr, repsStr)}
          placeholder="0"
        />
        {weightError && <span className={styles.fieldError}>Enter a valid number</span>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${repsError ? styles.inputError : ''}`}
          type="number"
          inputMode="numeric"
          value={repsStr}
          onChange={(e) => {
            setRepsStr(e.target.value);
            setRepsError(false);
            // Spinner clicks fire 'insertReplacementText'; keyboard input does not — save immediately for spinner only
            if ((e.nativeEvent as InputEvent).inputType === 'insertReplacementText') {
              saveSet(weightStr, e.target.value);
            }
          }}
          onBlur={() => saveSet(weightStr, repsStr)}
          placeholder="0"
        />
        {repsError && <span className={styles.fieldError}>Enter a valid number</span>}
      </div>

      {rpeEnabled && (
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${rpeError ? styles.inputError : ''}`}
            type="number"
            inputMode="decimal"
            min="1"
            max="10"
            step="0.5"
            value={rpeStr}
            onChange={(e) => {
              setRpeStr(e.target.value);
              setRpeError(false);
              if ((e.nativeEvent as InputEvent).inputType === 'insertReplacementText') {
                saveRpe(e.target.value);
              }
            }}
            onBlur={() => saveRpe(rpeStr)}
            placeholder="—"
          />
          {rpeError && <span className={styles.fieldError}>1–10 by 0.5</span>}
        </div>
      )}

      <button className={styles.deleteBtn} onClick={() => onDelete(set.id!)} aria-label="Delete set">
        <X size={16} />
      </button>
    </div>
  );
}
