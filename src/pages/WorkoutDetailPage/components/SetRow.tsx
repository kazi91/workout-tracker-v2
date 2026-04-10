/**
 * SetRow — renders a single set within an ExerciseCard.
 * Displays: set number, Best (previousWeight × previousReps), weight input, reps input, delete button.
 * Auto-saves on blur: validates inputs, converts kg → lb if metric, calls onUpdate.
 * Best column shows previous session data in the user's preferred unit (converted from stored lb).
 * Invalid or blank inputs show inline "Enter a valid number" — field stays editable.
 */

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { kgToLb } from '../../../utils/units';
import type { LogSet } from '../../../types';
import styles from './SetRow.module.css';

interface SetRowProps {
  set: LogSet;
  setIndex: number; // 1-based display number
  weightUnit: string;
  displayWeight: (lb: number) => number;
  onUpdate: (setId: number, weightLb: number, reps: number) => void;
  onDelete: (setId: number) => void;
}

export default function SetRow({
  set,
  setIndex,
  weightUnit,
  displayWeight,
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

  function handleWeightBlur() {
    const num = parseFloat(weightStr);
    if (weightStr === '' || isNaN(num) || num < 0 || num > 9999) {
      setWeightError(true);
      return;
    }
    setWeightError(false);
    const weightInLb = weightUnit === 'kg' ? kgToLb(num) : num;
    const repsNum = parseInt(repsStr, 10);
    const reps = isNaN(repsNum) ? 0 : repsNum;
    onUpdate(set.id!, weightInLb, reps);
  }

  function handleRepsBlur() {
    const num = parseInt(repsStr, 10);
    if (repsStr === '' || !Number.isInteger(num) || num < 1 || num > 999) {
      setRepsError(true);
      return;
    }
    setRepsError(false);
    const weightNum = parseFloat(weightStr);
    const weight = isNaN(weightNum) ? 0 : weightUnit === 'kg' ? kgToLb(weightNum) : weightNum;
    onUpdate(set.id!, weight, num);
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
          onChange={(e) => { setWeightStr(e.target.value); setWeightError(false); }}
          onBlur={handleWeightBlur}
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
          onChange={(e) => { setRepsStr(e.target.value); setRepsError(false); }}
          onBlur={handleRepsBlur}
          placeholder="0"
        />
        {repsError && <span className={styles.fieldError}>Enter a valid number</span>}
      </div>

      <button className={styles.deleteBtn} onClick={() => onDelete(set.id!)} aria-label="Delete set">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
