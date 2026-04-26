/**
 * ExerciseSearchModal — bottom drawer overlay for selecting an exercise.
 *
 * Three view modes:
 *  - browse: search input + group chip + result list (parents with chevron-expand for variants
 *            when query is blank; flat list of parents + variants when query is non-blank, per
 *            CE2 #5). Custom rows show a trash affordance. Sticky "+ Create custom exercise"
 *            footer always visible.
 *  - createStep1: name + multi-select group chips + optional parent picker (any parent-level
 *                 exercise, EB5).
 *  - createStep2: muscle chips sectioned by selected groups; tap cycles role
 *                 neutral → primary → synergist → stabilizer → neutral (Decision #27 amended
 *                 Session 51 — replaces original two-tap + long-press scheme).
 *
 * Deletion (custom only):
 *  - 0 variants → simple confirm modal.
 *  - ≥1 variants → choice modal (cascade vs null-orphan), default = null-orphan (safer).
 *
 * Tap outside drawer → onClose() with no selection (any mode). Background muscles
 * (`neck`, `rotatorCuff`) never surface in row metadata or the create flow (D6.4).
 *
 * Used by: WorkoutDetailPage (active/edit mode), WorkoutTemplatePage.
 */

import { useEffect, useMemo, useState } from 'react';
import * as ExerciseService from '../services/ExerciseService';
import { useError, toUserMessage } from '../context/ErrorContext';
import type { Exercise, Muscle, MuscleGroup, SecondaryMuscle } from '../types';
import {
  MUSCLE_GROUPS,
  MUSCLE_GROUP_LABELS,
  MUSCLE_LABELS,
  MUSCLE_TO_GROUP,
  getExerciseGroup,
} from '../db/muscleTaxonomy';
import Modal from './Modal';
import styles from './ExerciseSearchModal.module.css';

type ViewMode = 'browse' | 'createStep1' | 'createStep2';
type RoleState = 'neutral' | 'primary' | 'synergist' | 'stabilizer';

const ROLE_CYCLE: RoleState[] = ['neutral', 'primary', 'synergist', 'stabilizer'];
const BACKGROUND_MUSCLES: ReadonlySet<Muscle> = new Set(['neck', 'rotatorCuff']);

interface ExerciseSearchModalProps {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
}

export default function ExerciseSearchModal({ onSelect, onClose }: ExerciseSearchModalProps) {
  const { showError } = useError();

  // Shared state
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [mode, setMode] = useState<ViewMode>('browse');

  // Browse state
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<MuscleGroup | null>(null);
  const [expandedParentIds, setExpandedParentIds] = useState<Set<number>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Exercise | null>(null);
  const [deleteCascade, setDeleteCascade] = useState(false);

  // Step 1 state (preserved when navigating to Step 2 and back)
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<Set<MuscleGroup>>(new Set());
  const [parentId, setParentId] = useState<number | null>(null);

  // Step 2 state
  const [roles, setRoles] = useState<Map<Muscle, RoleState>>(new Map());
  const [primaryError, setPrimaryError] = useState('');

  // ── Load library ──
  useEffect(() => {
    ExerciseService.getAll()
      .then(setAllExercises)
      .catch((e) => showError(toUserMessage(e)));
  }, []);

  async function refresh() {
    try {
      const fresh = await ExerciseService.getAll();
      setAllExercises(fresh);
    } catch (e) {
      showError(toUserMessage(e));
    }
  }

  // ── Variant index: parentId → variant[] (computed once per allExercises change) ──
  const variantsByParentId = useMemo(() => {
    const map = new Map<number, Exercise[]>();
    for (const ex of allExercises) {
      if (ex.parentExerciseId !== null) {
        const list = map.get(ex.parentExerciseId) ?? [];
        list.push(ex);
        map.set(ex.parentExerciseId, list);
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [allExercises]);

  // ── Browse: filtered results ──
  const browseResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allExercises
      .filter((ex) => {
        if (activeGroup && getExerciseGroup(ex) !== activeGroup) return false;
        if (normalized === '') {
          // Browse mode (no query): show parents only; variants reached via chevron.
          return ex.parentExerciseId === null;
        }
        // Search mode: flat — match name OR muscle tag (per Decision #27 / D7).
        if (ex.name.toLowerCase().includes(normalized)) return true;
        return matchesMuscleTag(normalized, ex);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allExercises, query, activeGroup]);

  // ── Browse: actions ──
  function toggleChevron(parentExerciseId: number) {
    const next = new Set(expandedParentIds);
    if (next.has(parentExerciseId)) {
      next.delete(parentExerciseId);
    } else {
      next.add(parentExerciseId);
    }
    setExpandedParentIds(next);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // ── Delete flow ──
  function openDelete(exercise: Exercise) {
    setDeleteTarget(exercise);
    setDeleteCascade(false); // safer default = null-orphan
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return;
    try {
      await ExerciseService.deleteExercise(deleteTarget.id, { cascade: deleteCascade });
      setDeleteTarget(null);
      // Collapse if the deleted exercise was an expanded parent.
      if (expandedParentIds.has(deleteTarget.id)) {
        const next = new Set(expandedParentIds);
        next.delete(deleteTarget.id);
        setExpandedParentIds(next);
      }
      await refresh();
    } catch (e) {
      showError(toUserMessage(e));
    }
  }

  // ── Step 1: actions ──
  function openCreate() {
    setName('');
    setNameError('');
    setSelectedGroups(new Set());
    setParentId(null);
    setRoles(new Map());
    setPrimaryError('');
    setMode('createStep1');
  }

  function toggleGroup(group: MuscleGroup) {
    const next = new Set(selectedGroups);
    if (next.has(group)) {
      next.delete(group);
    } else {
      next.add(group);
    }
    setSelectedGroups(next);
  }

  function step1Next() {
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Name can't be blank");
      return;
    }
    if (selectedGroups.size === 0) return;
    setNameError('');
    // Drop role tags for muscles whose group is no longer selected (in case the user
    // returned to Step 1 and unticked a group after tagging muscles in Step 2).
    const filteredRoles = new Map<Muscle, RoleState>();
    for (const [muscle, role] of roles) {
      if (selectedGroups.has(MUSCLE_TO_GROUP[muscle])) {
        filteredRoles.set(muscle, role);
      }
    }
    setRoles(filteredRoles);
    setPrimaryError('');
    setMode('createStep2');
  }

  // Parent picker contents — parent-level exercises only (CE2 Rule 1, EB5).
  const parentOptions = useMemo(
    () =>
      allExercises
        .filter((ex) => ex.parentExerciseId === null)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [allExercises],
  );

  // ── Step 2: actions ──
  function cycleRole(muscle: Muscle) {
    const current = roles.get(muscle) ?? 'neutral';
    const nextIdx = (ROLE_CYCLE.indexOf(current) + 1) % ROLE_CYCLE.length;
    const next = new Map(roles);
    if (ROLE_CYCLE[nextIdx] === 'neutral') {
      next.delete(muscle);
    } else {
      next.set(muscle, ROLE_CYCLE[nextIdx]);
    }
    setRoles(next);
    if (primaryError) setPrimaryError('');
  }

  async function saveCustom() {
    const primaryMuscles: Muscle[] = [];
    const secondaryMuscles: SecondaryMuscle[] = [];
    for (const [muscle, role] of roles) {
      if (role === 'primary') primaryMuscles.push(muscle);
      else if (role === 'synergist') secondaryMuscles.push({ muscle, role: 'synergist' });
      else if (role === 'stabilizer') secondaryMuscles.push({ muscle, role: 'stabilizer' });
    }
    if (primaryMuscles.length === 0) {
      setPrimaryError('At least one main mover required');
      return;
    }
    try {
      const created = await ExerciseService.create({
        name: name.trim(),
        isCustom: true,
        parentExerciseId: parentId,
        primaryMuscles,
        secondaryMuscles,
        equipment: null,
        gripWidth: null,
        gripOrientation: null,
        stanceWidth: null,
        modifications: [],
        jointLoad: [],
      });
      onSelect(created);
    } catch (e) {
      showError(toUserMessage(e));
    }
  }

  // ── Render ──
  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.drawer}>
        {mode === 'browse' && renderBrowse()}
        {mode === 'createStep1' && renderStep1()}
        {mode === 'createStep2' && renderStep2()}
      </div>
      {deleteTarget && renderDeleteModal()}
    </div>
  );

  function renderBrowse() {
    return (
      <>
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
          {browseResults.length > 0 ? (
            browseResults.map((ex) => renderRow(ex))
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No exercises found.</p>
            </div>
          )}
        </div>

        <button className={styles.createFooterBtn} onClick={openCreate}>
          ＋ Create custom exercise
        </button>
      </>
    );
  }

  function renderRow(ex: Exercise) {
    const isParentBrowseRow = query.trim() === '' && ex.parentExerciseId === null;
    const variants = ex.id !== undefined ? (variantsByParentId.get(ex.id) ?? []) : [];
    const hasVariants = isParentBrowseRow && variants.length > 0;
    const isExpanded = ex.id !== undefined && expandedParentIds.has(ex.id);

    return (
      <div key={ex.id} className={styles.rowGroup}>
        <div className={styles.row}>
          <button className={styles.rowMain} onClick={() => onSelect(ex)}>
            <span className={styles.exerciseName}>{ex.name}</span>
            {renderMuscleMeta(ex)}
          </button>
          <div className={styles.rowActions}>
            {ex.isCustom && (
              <button
                className={styles.trashBtn}
                aria-label={`Delete ${ex.name}`}
                onClick={() => openDelete(ex)}
              >
                🗑
              </button>
            )}
            {hasVariants && (
              <button
                className={`${styles.chevronBtn} ${isExpanded ? styles.chevronExpanded : ''}`}
                aria-label={isExpanded ? 'Collapse variants' : 'Expand variants'}
                onClick={() => ex.id !== undefined && toggleChevron(ex.id)}
              >
                ›
              </button>
            )}
          </div>
        </div>
        {isExpanded &&
          variants.map((v) => (
            <div key={v.id} className={`${styles.row} ${styles.variantRow}`}>
              <button className={styles.rowMain} onClick={() => onSelect(v)}>
                <span className={styles.variantPrefix}>↳</span>
                <span className={styles.exerciseName}>{v.name}</span>
                {renderMuscleMeta(v)}
              </button>
              <div className={styles.rowActions}>
                {v.isCustom && (
                  <button
                    className={styles.trashBtn}
                    aria-label={`Delete ${v.name}`}
                    onClick={() => openDelete(v)}
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  }

  function renderMuscleMeta(ex: Exercise) {
    const primaries = ex.primaryMuscles.filter((m) => !BACKGROUND_MUSCLES.has(m));
    const secondaries = ex.secondaryMuscles.filter((s) => !BACKGROUND_MUSCLES.has(s.muscle));
    return (
      <span className={styles.muscleMeta}>
        {primaries.map((m, i) => (
          <span key={`p-${m}`} className={styles.musclePrimary}>
            {MUSCLE_LABELS[m]}
            {(i < primaries.length - 1 || secondaries.length > 0) && ', '}
          </span>
        ))}
        {secondaries.map((s, i) => (
          <span key={`s-${s.muscle}`} className={styles.muscleSecondary}>
            {MUSCLE_LABELS[s.muscle]}
            {i < secondaries.length - 1 && ', '}
          </span>
        ))}
      </span>
    );
  }

  function renderStep1() {
    const canAdvance = name.trim() !== '' && selectedGroups.size > 0;
    return (
      <>
        <div className={styles.formHeader}>
          <button className={styles.formBackBtn} onClick={() => setMode('browse')}>
            ‹ Back
          </button>
          <h2 className={styles.formTitle}>New exercise — Step 1 of 2</h2>
        </div>

        <label className={styles.fieldLabel} htmlFor="custom-name">
          Name
        </label>
        <input
          id="custom-name"
          className={`${styles.formInput} ${nameError ? styles.formInputError : ''}`}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError('');
          }}
          autoCapitalize="sentences"
          autoFocus
        />
        {nameError && <p className={styles.fieldError}>{nameError}</p>}

        <p className={styles.fieldLabel}>Muscle groups</p>
        <div className={styles.chips}>
          {MUSCLE_GROUPS.map((group) => (
            <button
              key={group}
              className={`${styles.chip} ${selectedGroups.has(group) ? styles.chipActive : ''}`}
              onClick={() => toggleGroup(group)}
            >
              {MUSCLE_GROUP_LABELS[group]}
            </button>
          ))}
        </div>

        <label className={styles.fieldLabel} htmlFor="custom-parent">
          Nest under a parent exercise (optional)
        </label>
        <select
          id="custom-parent"
          className={styles.formSelect}
          value={parentId ?? ''}
          onChange={(e) => setParentId(e.target.value === '' ? null : Number(e.target.value))}
        >
          <option value="">None — top-level exercise</option>
          {parentOptions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          className={styles.formPrimaryBtn}
          disabled={!canAdvance}
          onClick={step1Next}
        >
          Next
        </button>
      </>
    );
  }

  function renderStep2() {
    const orderedGroups = MUSCLE_GROUPS.filter((g) => selectedGroups.has(g));
    return (
      <>
        <div className={styles.formHeader}>
          <button className={styles.formBackBtn} onClick={() => setMode('createStep1')}>
            ‹ Back
          </button>
          <h2 className={styles.formTitle}>New exercise — Step 2 of 2</h2>
        </div>

        <p className={styles.fieldHint}>
          Tap a muscle to cycle: <span className={styles.hintPrimary}>main mover</span> →{' '}
          <span className={styles.hintSynergist}>helper</span> →{' '}
          <span className={styles.hintStabilizer}>stabilizer</span> → none
        </p>

        <div className={styles.muscleSections}>
          {orderedGroups.map((group) => {
            const musclesInGroup = (Object.keys(MUSCLE_TO_GROUP) as Muscle[])
              .filter((m) => MUSCLE_TO_GROUP[m] === group && !BACKGROUND_MUSCLES.has(m));
            return (
              <div key={group} className={styles.muscleSection}>
                <p className={styles.sectionHeader}>{MUSCLE_GROUP_LABELS[group]}</p>
                <div className={styles.muscleChipRow}>
                  {musclesInGroup.map((m) => {
                    const role = roles.get(m) ?? 'neutral';
                    return (
                      <button
                        key={m}
                        className={`${styles.muscleChip} ${roleClass(role)}`}
                        onClick={() => cycleRole(m)}
                      >
                        {MUSCLE_LABELS[m]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {primaryError && <p className={styles.fieldError}>{primaryError}</p>}

        <button className={styles.formPrimaryBtn} onClick={saveCustom}>
          Save
        </button>
      </>
    );
  }

  function renderDeleteModal() {
    if (!deleteTarget?.id) return null;
    const variants = variantsByParentId.get(deleteTarget.id) ?? [];

    if (variants.length === 0) {
      return (
        <Modal
          title={`Delete "${deleteTarget.name}"?`}
          actions={[
            { label: 'Cancel', variant: 'secondary', onClick: () => setDeleteTarget(null) },
            { label: 'Delete', variant: 'destructive', onClick: confirmDelete },
          ]}
        />
      );
    }

    // Choice modal — Modal.tsx body is text-only, so render bespoke for the radio choice.
    return (
      <div className={styles.deleteBackdrop}>
        <div className={styles.deleteCard} role="dialog" aria-modal="true">
          <h2 className={styles.deleteTitle}>Delete "{deleteTarget.name}"?</h2>
          <p className={styles.deleteBody}>
            This exercise has {variants.length} variant{variants.length === 1 ? '' : 's'} nested
            under it.
          </p>
          <label className={styles.deleteOption}>
            <input
              type="radio"
              name="delete-mode"
              checked={!deleteCascade}
              onChange={() => setDeleteCascade(false)}
            />
            <span>
              <strong>Delete this exercise only</strong>
              <br />
              <span className={styles.deleteOptionHint}>Variants become standalone.</span>
            </span>
          </label>
          <label className={styles.deleteOption}>
            <input
              type="radio"
              name="delete-mode"
              checked={deleteCascade}
              onChange={() => setDeleteCascade(true)}
            />
            <span>
              <strong>Delete this exercise and all variants</strong>
              <br />
              <span className={styles.deleteOptionHint}>
                Removes the whole group. Log history for variants will also be deleted.
              </span>
            </span>
          </label>
          <div className={styles.deleteActions}>
            <button
              className={styles.deleteBtnSecondary}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </button>
            <button className={styles.deleteBtnDestructive} onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function roleClass(role: RoleState): string {
  switch (role) {
    case 'primary':
      return styles.muscleChipPrimary;
    case 'synergist':
      return styles.muscleChipSynergist;
    case 'stabilizer':
      return styles.muscleChipStabilizer;
    default:
      return styles.muscleChipNeutral;
  }
}

function matchesMuscleTag(normalized: string, ex: Exercise): boolean {
  for (const m of ex.primaryMuscles) {
    if (BACKGROUND_MUSCLES.has(m)) continue;
    if (m.toLowerCase().includes(normalized)) return true;
    if (MUSCLE_LABELS[m].toLowerCase().includes(normalized)) return true;
  }
  for (const sm of ex.secondaryMuscles) {
    if (BACKGROUND_MUSCLES.has(sm.muscle)) continue;
    if (sm.muscle.toLowerCase().includes(normalized)) return true;
    if (MUSCLE_LABELS[sm.muscle].toLowerCase().includes(normalized)) return true;
  }
  return false;
}
