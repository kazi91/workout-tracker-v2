/**
 * SetRow — renders a single set within an ExerciseCard.
 * Displays: set number, Best (previousWeight × previousReps), weight input, reps input,
 * optional RPE input (rpeEnabled), delete button.
 * Each input flanked by custom −/+ buttons (native browser spinner hidden via CSS).
 * Auto-saves on blur for typed input; saves immediately on stepper button press.
 * Each field saves independently — RPE never blocks weight/reps and a blank reps
 * never blocks weight (Decision #26 generalized — no field's blank state blocks another's save).
 * RPE column appears only when rpeEnabled is true; readOnly mode renders static text.
 */

import { useState } from 'react';
import { X } from 'lucide-react';
import { kgToLb } from '../../../utils/units';
import type { LogSet } from '../../../types';
import styles from './SetRow.module.css';

const WEIGHT_STEP = 5;
const WEIGHT_MAX = 9999;
const REPS_MAX = 999;
const RPE_STEP = 0.5;
const RPE_MIN = 1;
const RPE_MAX = 10;
const RPE_DEFAULT_ON_BLANK_TAP = 7;

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

  function saveWeight(weight: string) {
    if (weight === '') {
      setWeightError(false);
      return;
    }
    const n = parseFloat(weight);
    const valid = !isNaN(n) && n >= 0 && n <= WEIGHT_MAX;
    setWeightError(!valid);
    if (!valid) return;
    const inLb = weightUnit === 'kg' ? kgToLb(n) : n;
    onUpdate(set.id!, { weight: inLb });
  }

  function saveReps(reps: string) {
    if (reps === '') {
      setRepsError(false);
      return;
    }
    // 0 reps is valid — represents a missed attempt at that weight
    const n = parseInt(reps, 10);
    const valid = Number.isInteger(n) && n >= 0 && n <= REPS_MAX;
    setRepsError(!valid);
    if (!valid) return;
    onUpdate(set.id!, { reps: n });
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
    const valid = !isNaN(n) && n >= RPE_MIN && n <= RPE_MAX && Number.isInteger(n * 2);
    setRpeError(!valid);
    if (!valid) return;
    onUpdate(set.id!, { rpe: n });
  }

  function adjustWeight(delta: number) {
    const current = weightStr === '' ? 0 : parseFloat(weightStr);
    if (isNaN(current)) return;
    const raw = Math.max(0, Math.min(WEIGHT_MAX, current + delta));
    const rounded = Math.round(raw * 2) / 2; // snap to 0.5 unit
    const nextStr = String(rounded);
    setWeightStr(nextStr);
    saveWeight(nextStr);
  }

  function adjustReps(delta: number) {
    const current = repsStr === '' ? 0 : parseInt(repsStr, 10);
    if (isNaN(current)) return;
    const next = Math.max(0, Math.min(REPS_MAX, current + delta));
    const nextStr = String(next);
    setRepsStr(nextStr);
    saveReps(nextStr);
  }

  function adjustRpe(delta: number) {
    // First tap on a blank field jumps to mid working range (RPE 7) regardless of direction
    if (rpeStr.trim() === '') {
      const nextStr = String(RPE_DEFAULT_ON_BLANK_TAP);
      setRpeStr(nextStr);
      saveRpe(nextStr);
      return;
    }
    const current = parseFloat(rpeStr);
    if (isNaN(current)) return;
    const raw = Math.max(RPE_MIN, Math.min(RPE_MAX, current + delta));
    const rounded = Math.round(raw * 2) / 2;
    const nextStr = String(rounded);
    setRpeStr(nextStr);
    saveRpe(nextStr);
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
        <div className={`${styles.inputCell} ${weightError ? styles.inputCellError : ''}`}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => adjustWeight(-WEIGHT_STEP)}
            aria-label="Decrease weight"
          >
            −
          </button>
          <input
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={weightStr}
            onChange={(e) => {
              setWeightStr(e.target.value);
              setWeightError(false);
            }}
            onBlur={() => saveWeight(weightStr)}
            placeholder="0"
          />
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => adjustWeight(WEIGHT_STEP)}
            aria-label="Increase weight"
          >
            +
          </button>
        </div>
        {weightError && <span className={styles.fieldError}>Enter a valid number</span>}
      </div>

      <div className={styles.inputWrapper}>
        <div className={`${styles.inputCell} ${repsError ? styles.inputCellError : ''}`}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => adjustReps(-1)}
            aria-label="Decrease reps"
          >
            −
          </button>
          <input
            className={styles.input}
            type="text"
            inputMode="numeric"
            value={repsStr}
            onChange={(e) => {
              setRepsStr(e.target.value);
              setRepsError(false);
            }}
            onBlur={() => saveReps(repsStr)}
            placeholder="0"
          />
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => adjustReps(1)}
            aria-label="Increase reps"
          >
            +
          </button>
        </div>
        {repsError && <span className={styles.fieldError}>Enter a valid number</span>}
      </div>

      {rpeEnabled && (
        <div className={styles.inputWrapper}>
          <div className={`${styles.inputCell} ${rpeError ? styles.inputCellError : ''}`}>
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => adjustRpe(-RPE_STEP)}
              aria-label="Decrease RPE"
            >
              −
            </button>
            <input
              className={styles.input}
              type="text"
              inputMode="decimal"
              value={rpeStr}
              onChange={(e) => {
                setRpeStr(e.target.value);
                setRpeError(false);
              }}
              onBlur={() => saveRpe(rpeStr)}
              placeholder="—"
            />
            <button
              type="button"
              className={styles.stepBtn}
              onClick={() => adjustRpe(RPE_STEP)}
              aria-label="Increase RPE"
            >
              +
            </button>
          </div>
          {rpeError && <span className={styles.fieldError}>1–10 by 0.5</span>}
        </div>
      )}

      <button className={styles.deleteBtn} onClick={() => onDelete(set.id!)} aria-label="Delete set">
        <X size={16} />
      </button>
    </div>
  );
}
