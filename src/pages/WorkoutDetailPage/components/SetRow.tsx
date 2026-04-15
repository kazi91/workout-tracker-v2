/**
 * SetRow — renders a single set within an ExerciseCard.
 * Displays: set number, Best (previousWeight × previousReps), weight input, reps input, delete button.
 * Auto-saves on blur: validates inputs, converts kg → lb if metric, calls onUpdate.
 * Best column shows previous session data in the user's preferred unit (converted from stored lb).
 * Invalid or blank inputs show inline "Enter a valid number" — field stays editable.
 * readOnly prop: renders static text spans instead of inputs; used in WorkoutDetailPage read-only mode.
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
  readOnly?: boolean;
  onUpdate: (setId: number, weightLb: number, reps: number) => void;
  onDelete: (setId: number) => void;
}

export default function SetRow({
  set,
  setIndex,
  weightUnit,
  displayWeight,
  readOnly = false,
  onUpdate,
  onDelete,
}: SetRowProps) {
  // Show empty string for 0 (new sets) so the input looks blank, not "0"
  const [weightStr, setWeightStr] = useState(
    set.weight === 0 ? '' : String(Math.round(displayWeight(set.weight) * 10) / 10),
  );
  const [repsStr, setRepsStr] = useState(set.reps === 0 ? '' : String(set.reps));
  const [weightError, setWeightError] = useState(false);
  const [repsError, setRepsError] = useState(false);

  const bestLabel =
    set.previousWeight !== null && set.previousReps !== null
      ? `${Math.round(displayWeight(set.previousWeight) * 10) / 10} × ${set.previousReps}`
      : '—';

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
    onUpdate(set.id!, weightInLb, repsNum);
  }

  if (readOnly) {
    return (
      <div className={styles.row}>
        <span className={styles.setNum}>{setIndex}</span>
        <span className={styles.best}>{bestLabel}</span>
        <span className={styles.readonlyVal}>
          {set.weight === 0 ? '—' : `${Math.round(displayWeight(set.weight) * 10) / 10}`}
        </span>
        <span className={styles.readonlyVal}>{set.reps === 0 ? '—' : set.reps}</span>
        <span /> {/* spacer for delete column */}
      </div>
    );
  }

  return (
    <div className={styles.row}>
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

      <button className={styles.deleteBtn} onClick={() => onDelete(set.id!)} aria-label="Delete set">
        <X size={16} />
      </button>
    </div>
  );
}
