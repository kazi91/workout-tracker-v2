/**
 * ExerciseSearchModal — bottom drawer overlay for selecting an exercise.
 * Loads all exercises on open, then filters client-side by name query + broad-group chip
 * (chip group derived via getExerciseGroup — no stored category).
 * Tap outside the drawer → onClose() with no selection.
 * Tap an exercise row → onSelect(exercise) → modal closes.
 * Used by: WorkoutDetailPage (active/edit mode), WorkoutTemplatePage.
 *
 * STEP 1: simplified for v3 migration. Step 6 brings back the full Decision #27 picker
 * (variant chevron expand/collapse, name+muscle-tag search, two-step custom create with
 * optional parent picker, deletion choice modal).
 */

import { useEffect, useState } from 'react';
import * as ExerciseService from '../services/ExerciseService';
import { useError, toUserMessage } from '../context/ErrorContext';
import type { Exercise, MuscleGroup } from '../types';
import { MUSCLE_GROUPS, MUSCLE_GROUP_LABELS, getExerciseGroup } from '../db/muscleTaxonomy';
import styles from './ExerciseSearchModal.module.css';

interface ExerciseSearchModalProps {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
}

export default function ExerciseSearchModal({ onSelect, onClose }: ExerciseSearchModalProps) {
  const { showError } = useError();
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<MuscleGroup | null>(null);

  useEffect(() => {
    ExerciseService.getAll().then(setAllExercises).catch((e) => showError(toUserMessage(e)));
  }, []);

  const filtered = allExercises.filter((ex) => {
    const matchesQuery = query.trim() === '' || ex.name.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = !activeGroup || getExerciseGroup(ex) === activeGroup;
    return matchesQuery && matchesGroup;
  });

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.drawer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search exercises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className={styles.chips}>
          <button
            className={`${styles.chip} ${activeGroup === null ? styles.chipActive : ''}`}
            onClick={() => setActiveGroup(null)}
          >
            All
          </button>
          {MUSCLE_GROUPS.map((group) => (
            <button
              key={group}
              className={`${styles.chip} ${activeGroup === group ? styles.chipActive : ''}`}
              onClick={() => setActiveGroup(activeGroup === group ? null : group)}
            >
              {MUSCLE_GROUP_LABELS[group]}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {filtered.length > 0 ? (
            filtered.map((ex) => (
              <button
                key={ex.id}
                className={styles.listItem}
                onClick={() => onSelect(ex)}
              >
                <span className={styles.exerciseName}>{ex.name}</span>
                <span className={styles.exerciseCategory}>{getExerciseGroup(ex)}</span>
              </button>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No exercises found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
