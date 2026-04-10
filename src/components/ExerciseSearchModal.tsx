/**
 * ExerciseSearchModal — bottom drawer overlay for selecting or creating an exercise.
 * Loads all exercises on open, then filters client-side by name query + category chip.
 * Inline custom exercise creation: name input + category picker → ExerciseService.create() → auto-selects.
 * Tap outside the drawer → onClose() with no selection.
 * Tap an exercise row → onSelect(exercise) → modal closes.
 * Used by: WorkoutDetailPage (active/edit mode), WorkoutTemplatePage.
 * Props: onSelect (callback with chosen Exercise), onClose (dismiss with no selection)
 */

import { useEffect, useState } from 'react';
import * as ExerciseService from '../services/ExerciseService';
import type { Exercise } from '../types';
import styles from './ExerciseSearchModal.module.css';

const CATEGORIES: Array<Exercise['category']> = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];

interface ExerciseSearchModalProps {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
}

export default function ExerciseSearchModal({ onSelect, onClose }: ExerciseSearchModalProps) {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Exercise['category'] | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Create form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Exercise['category']>('chest');
  const [nameError, setNameError] = useState('');

  // Load all exercises once on open
  useEffect(() => {
    ExerciseService.getAll().then(setAllExercises).catch(console.error);
  }, []);

  // Client-side filter — fast enough for 29 items, no debounce needed
  const filtered = allExercises.filter((ex) => {
    const matchesQuery = query.trim() === '' || ex.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || ex.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  async function handleCreate() {
    if (!newName.trim()) {
      setNameError("Name can't be blank");
      return;
    }
    const exercise = await ExerciseService.create(newName.trim(), newCategory);
    onSelect(exercise);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.drawer}>
        {/* Search input */}
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search exercises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        {/* Category filter chips */}
        <div className={styles.chips}>
          <button
            className={`${styles.chip} ${activeCategory === null ? styles.chipActive : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className={styles.list}>
          {filtered.length > 0 ? (
            filtered.map((ex) => (
              <button
                key={ex.id}
                className={styles.listItem}
                onClick={() => onSelect(ex)}
              >
                <span className={styles.exerciseName}>{ex.name}</span>
                <span className={styles.exerciseCategory}>{ex.category}</span>
              </button>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No exercises found.</p>
              {!showCreateForm && (
                <button
                  className={styles.listItem}
                  onClick={() => setShowCreateForm(true)}
                >
                  <span className={styles.exerciseName}>+ Create custom exercise</span>
                </button>
              )}
            </div>
          )}

          {/* "Create custom exercise" always accessible below results */}
          {filtered.length > 0 && !showCreateForm && (
            <button
              className={styles.listItem}
              onClick={() => setShowCreateForm(true)}
            >
              <span className={styles.exerciseName}>+ Create custom exercise</span>
            </button>
          )}

          {/* Inline create form */}
          {showCreateForm && (
            <div className={styles.createForm}>
              <span className={styles.createFormTitle}>New exercise</span>
              <div>
                <input
                  className={`${styles.createInput} ${nameError ? styles.createInputError : ''}`}
                  type="text"
                  placeholder="Exercise name"
                  value={newName}
                  onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                />
                {nameError && <span className={styles.fieldError}>{nameError}</span>}
              </div>
              <select
                className={styles.categorySelect}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Exercise['category'])}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <button className={styles.createBtn} onClick={handleCreate}>
                Save Exercise
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
