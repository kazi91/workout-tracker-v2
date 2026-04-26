import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import ExerciseSearchModal from './ExerciseSearchModal';
import type { Exercise } from '../types';

// ── Mocks ──────────────────────────────────────────────────────────────────
vi.mock('../services/ExerciseService');
vi.mock('../context/ErrorContext', () => ({
  useError: () => ({ error: null, showError: vi.fn(), clearError: vi.fn() }),
  toUserMessage: (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong.'),
}));

import * as ExerciseService from '../services/ExerciseService';

// ── Fixtures ───────────────────────────────────────────────────────────────
function makeExercise(overrides: Partial<Exercise> & Pick<Exercise, 'id' | 'name' | 'primaryMuscles'>): Exercise {
  return {
    isCustom: false,
    parentExerciseId: null,
    secondaryMuscles: [],
    equipment: null,
    gripWidth: null,
    gripOrientation: null,
    stanceWidth: null,
    bias: null,
    jointLoad: [],
    ...overrides,
  };
}

const benchPress = makeExercise({ id: 1, name: 'Bench Press', primaryMuscles: ['chest'] });
const inclineBench = makeExercise({
  id: 2,
  name: 'Incline Bench Press',
  primaryMuscles: ['chest'],
  parentExerciseId: 1,
});
const squat = makeExercise({ id: 3, name: 'Squat', primaryMuscles: ['quads'] });
const customParent = makeExercise({
  id: 4,
  name: 'My Custom Lift',
  primaryMuscles: ['lats'],
  isCustom: true,
});
const customVariant = makeExercise({
  id: 5,
  name: 'My Custom Variant',
  primaryMuscles: ['lats'],
  isCustom: true,
  parentExerciseId: 4,
});

const fullLibrary = [benchPress, inclineBench, squat, customParent, customVariant];

// ── Setup ──────────────────────────────────────────────────────────────────
let onSelect: Mock<(exercise: Exercise) => void>;
let onClose: Mock<() => void>;

beforeEach(() => {
  vi.clearAllMocks();
  onSelect = vi.fn();
  onClose = vi.fn();
  vi.mocked(ExerciseService.getAll).mockResolvedValue(fullLibrary);
});

function setup() {
  return render(<ExerciseSearchModal onSelect={onSelect} onClose={onClose} />);
}

// ── Browse mode ────────────────────────────────────────────────────────────
describe('browse mode', () => {
  it('renders only parent-level exercises when query is empty', async () => {
    setup();
    await screen.findByText('Bench Press');
    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.getByText('My Custom Lift')).toBeInTheDocument();
    expect(screen.queryByText('Incline Bench Press')).not.toBeInTheDocument();
    expect(screen.queryByText('My Custom Variant')).not.toBeInTheDocument();
  });

  it('chevron toggle expands and collapses variants inline', async () => {
    setup();
    await screen.findByText('Bench Press');
    // Two parents have variants (Bench Press, My Custom Lift); alphabetical first = Bench Press.
    const expandBtns = screen.getAllByLabelText('Expand variants');
    fireEvent.click(expandBtns[0]);
    expect(screen.getByText('Incline Bench Press')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Collapse variants'));
    expect(screen.queryByText('Incline Bench Press')).not.toBeInTheDocument();
  });

  it('search mode renders parents and variants flat — no chevrons', async () => {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.change(screen.getByPlaceholderText('Search exercises...'), {
      target: { value: 'bench' },
    });
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Incline Bench Press')).toBeInTheDocument();
    expect(screen.queryByLabelText(/Expand variants/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Collapse variants/)).not.toBeInTheDocument();
    // Squat not bench-related → filtered out
    expect(screen.queryByText('Squat')).not.toBeInTheDocument();
  });

  it('search matches muscle tags in addition to name', async () => {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.change(screen.getByPlaceholderText('Search exercises...'), {
      target: { value: 'quad' },
    });
    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.queryByText('Bench Press')).not.toBeInTheDocument();
  });

  it('group chip filter narrows results', async () => {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: 'Legs' }));
    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.queryByText('Bench Press')).not.toBeInTheDocument();
    expect(screen.queryByText('My Custom Lift')).not.toBeInTheDocument();
  });

  it('row click fires onSelect with the exercise', async () => {
    setup();
    fireEvent.click(await screen.findByText('Squat'));
    expect(onSelect).toHaveBeenCalledWith(squat);
  });

  it('backdrop click closes the modal', async () => {
    const { container } = setup();
    await screen.findByText('Bench Press');
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('drawer click does not close the modal', async () => {
    setup();
    fireEvent.click(await screen.findByText('Bench Press'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows empty state when no results match', async () => {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.change(screen.getByPlaceholderText('Search exercises...'), {
      target: { value: 'xyzzy-no-match' },
    });
    expect(screen.getByText('No exercises found.')).toBeInTheDocument();
  });

  it('only custom exercises render the trash button', async () => {
    setup();
    await screen.findByText('Bench Press');
    expect(screen.getByLabelText('Delete My Custom Lift')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete Bench Press')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Delete Squat')).not.toBeInTheDocument();
  });

  it('footer button switches to the create flow', async () => {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: /create custom exercise/i }));
    expect(screen.getByText('New exercise — Step 1 of 2')).toBeInTheDocument();
  });
});

// ── Create flow — Step 1 ───────────────────────────────────────────────────
describe('create flow — Step 1', () => {
  async function openStep1() {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: /create custom exercise/i }));
  }

  it('Next is disabled until both name and a group are set', async () => {
    await openStep1();
    const next = screen.getByRole('button', { name: 'Next' });
    expect(next).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Lift' } });
    expect(next).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Chest' }));
    expect(next).not.toBeDisabled();
  });

  it('parent picker only lists parent-level exercises', async () => {
    await openStep1();
    const select = screen.getByLabelText(/Nest under a parent exercise/) as HTMLSelectElement;
    const optionTexts = Array.from(select.querySelectorAll('option')).map((o) => o.textContent);
    expect(optionTexts).toContain('Bench Press');
    expect(optionTexts).toContain('Squat');
    expect(optionTexts).toContain('My Custom Lift');
    expect(optionTexts).not.toContain('Incline Bench Press');
    expect(optionTexts).not.toContain('My Custom Variant');
  });

  it('Next advances to Step 2 when valid', async () => {
    await openStep1();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Lift' } });
    fireEvent.click(screen.getByRole('button', { name: 'Chest' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('New exercise — Step 2 of 2')).toBeInTheDocument();
  });

  it('Back from Step 1 returns to browse', async () => {
    await openStep1();
    fireEvent.click(screen.getByText('‹ Back'));
    expect(screen.getByPlaceholderText('Search exercises...')).toBeInTheDocument();
  });
});

// ── Create flow — Step 2 ───────────────────────────────────────────────────
describe('create flow — Step 2', () => {
  async function openStep2(groupNames: string[] = ['Chest']) {
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: /create custom exercise/i }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Lift' } });
    for (const g of groupNames) {
      fireEvent.click(screen.getByRole('button', { name: g }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  }

  it('cycles muscle role: neutral → primary → synergist → stabilizer → neutral', async () => {
    await openStep2();
    const chip = screen.getByRole('button', { name: 'Chest' });
    expect(chip.className).toMatch(/Neutral/);
    fireEvent.click(chip);
    expect(chip.className).toMatch(/Primary/);
    fireEvent.click(chip);
    expect(chip.className).toMatch(/Synergist/);
    fireEvent.click(chip);
    expect(chip.className).toMatch(/Stabilizer/);
    fireEvent.click(chip);
    expect(chip.className).toMatch(/Neutral/);
  });

  it('save with no primary muscle blocks with inline error', async () => {
    await openStep2();
    // 2 clicks → synergist (no primary anywhere)
    const chip = screen.getByRole('button', { name: 'Chest' });
    fireEvent.click(chip);
    fireEvent.click(chip);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('At least one main mover required')).toBeInTheDocument();
    expect(vi.mocked(ExerciseService.create)).not.toHaveBeenCalled();
  });

  it('save with at least one primary calls create with role-categorized muscles and fires onSelect', async () => {
    vi.mocked(ExerciseService.create).mockResolvedValue({ ...customParent, id: 99 });
    await openStep2(['Chest']);
    fireEvent.click(screen.getByRole('button', { name: 'Chest' })); // primary
    fireEvent.click(screen.getByRole('button', { name: 'Serratus' })); // primary
    fireEvent.click(screen.getByRole('button', { name: 'Serratus' })); // synergist
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(ExerciseService.create).toHaveBeenCalled());
    const arg = vi.mocked(ExerciseService.create).mock.calls[0][0];
    expect(arg.name).toBe('Test Lift');
    expect(arg.isCustom).toBe(true);
    expect(arg.parentExerciseId).toBeNull();
    expect(arg.primaryMuscles).toEqual(['chest']);
    expect(arg.secondaryMuscles).toEqual([{ muscle: 'serratus', role: 'synergist' }]);
    expect(onSelect).toHaveBeenCalled();
  });

  it('save passes parentExerciseId when a parent is picked', async () => {
    vi.mocked(ExerciseService.create).mockResolvedValue({ ...customParent, id: 99 });
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: /create custom exercise/i }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Variant Test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Chest' }));
    fireEvent.change(screen.getByLabelText(/Nest under a parent exercise/), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chest' })); // primary
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(ExerciseService.create).toHaveBeenCalled());
    const arg = vi.mocked(ExerciseService.create).mock.calls[0][0];
    expect(arg.parentExerciseId).toBe(1);
  });

  it('drops role tags for muscles whose group is unticked on returning to Step 1', async () => {
    vi.mocked(ExerciseService.create).mockResolvedValue({ ...customParent, id: 99 });
    setup();
    await screen.findByText('Bench Press');
    fireEvent.click(screen.getByRole('button', { name: /create custom exercise/i }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Lift' } });
    fireEvent.click(screen.getByRole('button', { name: 'Chest' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    // Step 2 — tag Chest=primary, Lats=primary
    fireEvent.click(screen.getByRole('button', { name: 'Chest' }));
    fireEvent.click(screen.getByRole('button', { name: 'Lats' }));

    // Back to Step 1, untick Back group, return to Step 2
    fireEvent.click(screen.getByText('‹ Back'));
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    // Lats no longer rendered; Chest still primary
    expect(screen.queryByRole('button', { name: 'Lats' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Chest' }).className).toMatch(/Primary/);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(ExerciseService.create).toHaveBeenCalled());
    const arg = vi.mocked(ExerciseService.create).mock.calls[0][0];
    expect(arg.primaryMuscles).toEqual(['chest']);
    expect(arg.secondaryMuscles).toEqual([]);
  });

  it('Back from Step 2 returns to Step 1 with name and groups preserved', async () => {
    await openStep2(['Chest']);
    fireEvent.click(screen.getByText('‹ Back'));
    expect(screen.getByLabelText('Name')).toHaveValue('Test Lift');
    expect(screen.getByRole('button', { name: 'Chest' }).className).toMatch(/chipActive/);
  });
});

// ── Delete flow ────────────────────────────────────────────────────────────
describe('delete flow', () => {
  it('zero-variant custom delete renders simple Modal (no radio choice)', async () => {
    vi.mocked(ExerciseService.getAll).mockResolvedValue([benchPress, customParent]);
    setup();
    await screen.findByText('My Custom Lift');
    fireEvent.click(screen.getByLabelText('Delete My Custom Lift'));
    expect(screen.getByText(/Delete "My Custom Lift"/)).toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('variant-bearing custom delete renders choice modal with orphan as default', async () => {
    setup();
    await screen.findByText('My Custom Lift');
    fireEvent.click(screen.getByLabelText('Delete My Custom Lift'));
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toBeChecked(); // orphan = safer default
    expect(radios[1]).not.toBeChecked();
  });

  it('orphan delete calls service with cascade=false', async () => {
    vi.mocked(ExerciseService.deleteExercise).mockResolvedValue(undefined);
    setup();
    await screen.findByText('My Custom Lift');
    fireEvent.click(screen.getByLabelText('Delete My Custom Lift'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(ExerciseService.deleteExercise).toHaveBeenCalledWith(4, { cascade: false }),
    );
  });

  it('cascade delete calls service with cascade=true', async () => {
    vi.mocked(ExerciseService.deleteExercise).mockResolvedValue(undefined);
    setup();
    await screen.findByText('My Custom Lift');
    fireEvent.click(screen.getByLabelText('Delete My Custom Lift'));
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(ExerciseService.deleteExercise).toHaveBeenCalledWith(4, { cascade: true }),
    );
  });

  it('cancel from choice modal does not call delete', async () => {
    setup();
    await screen.findByText('My Custom Lift');
    fireEvent.click(screen.getByLabelText('Delete My Custom Lift'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(ExerciseService.deleteExercise).not.toHaveBeenCalled();
    // Choice modal closed
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });
});
