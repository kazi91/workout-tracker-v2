/**
 * ProgramsPage — displays the user's programs as a tappable card list.
 * Inline create form: "+" button shows a name input; blank name shows "Name can't be blank".
 * On create: navigates to /programs/:id for the new program.
 * Reads: AuthContext (userId), ProgramService (list + create), WorkoutService (workout counts per program)
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useError, toUserMessage } from '../../context/ErrorContext';
import * as ProgramService from '../../services/ProgramService';
import * as WorkoutService from '../../services/WorkoutService';
import type { Program } from '../../types';
import styles from './ProgramsPage.module.css';

export default function ProgramsPage() {
  const { user } = useAuth();
  const { showError } = useError();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [workoutCounts, setWorkoutCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user?.id) return;
    loadData();
  }, [user?.id]);

  // Focus the input when the inline create form appears
  useEffect(() => {
    if (creating) inputRef.current?.focus();
  }, [creating]);

  async function loadData() {
    if (!user?.id) return;
    try {
      const progs = await ProgramService.getAll(user.id);
      setPrograms(progs);

      // Load workout count for each program
      const counts: Record<number, number> = {};
      await Promise.all(
        progs.map(async (p) => {
          const workouts = await WorkoutService.getByProgramId(p.id!);
          counts[p.id!] = workouts.length;
        }),
      );
      setWorkoutCounts(counts);
      setLoading(false);
    } catch (e) {
      showError(toUserMessage(e));
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setNewName('');
    setNameError('');
    setCreating(true);
  }

  function handleCancelCreate() {
    setCreating(false);
    setNewName('');
    setNameError('');
  }

  async function handleCreateBlur() {
    const trimmed = newName.trim();
    if (!trimmed) {
      // Keep the form open with an error — do not dismiss
      setNameError("Name can't be blank");
      return;
    }
    await submitCreate(trimmed);
  }

  async function handleCreateKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const trimmed = newName.trim();
      if (!trimmed) {
        setNameError("Name can't be blank");
        return;
      }
      await submitCreate(trimmed);
    } else if (e.key === 'Escape') {
      handleCancelCreate();
    }
  }

  async function submitCreate(name: string) {
    if (!user?.id) return;
    try {
      const program = await ProgramService.create(user.id, name);
      setCreating(false);
      navigate(`/programs/${program.id}`);
    } catch (e) {
      showError(toUserMessage(e));
    }
  }

  const workoutLabel = (count: number) =>
    count === 1 ? '1 workout' : `${count} workouts`;

  if (loading) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Programs</h1>

      {programs.length === 0 && !creating && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No programs yet</p>
          <p className={styles.emptyHint}>Tap "+" to create your first program.</p>
        </div>
      )}

      <ul className={styles.list}>
        {programs.map((program) => (
          <li key={program.id}>
            <button
              className={styles.card}
              onClick={() => navigate(`/programs/${program.id}`)}
            >
              <span className={styles.cardName}>{program.name}</span>
              <span className={styles.cardMeta}>
                {workoutLabel(workoutCounts[program.id!] ?? 0)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!creating && (
        <button className={styles.addBtn} onClick={handleOpenCreate} aria-label="New program">
          <Plus size={22} />
        </button>
      )}

      {creating && (
        <div className={styles.createForm}>
          <input
            ref={inputRef}
            className={`${styles.input} ${nameError ? styles.inputError : ''}`}
            type="text"
            autoCapitalize="words"
            placeholder="Program name"
            value={newName}
            onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
            onBlur={handleCreateBlur}
            onKeyDown={handleCreateKeyDown}
          />
          {nameError && <span className={styles.fieldError}>{nameError}</span>}
        </div>
      )}
    </div>
  );
}
