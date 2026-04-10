/**
 * Modal — shared confirmation/action modal used for all destructive and multi-step flows.
 * Renders a backdrop + centered card with title, optional body text, and action buttons.
 * Destructive modals: no tap-outside-to-close (easy to mis-tap on mobile).
 * Non-destructive modals: tap-outside closes (pass onBackdropClick).
 * Used by: delete program, delete workout, discard active session, finish flow steps.
 */

import styles from './Modal.module.css';

interface ModalAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'destructive' | 'secondary';
}

interface ModalProps {
  title: string;
  body?: string;
  actions: ModalAction[];
  /** If provided, tapping the backdrop calls this. Omit for destructive modals. */
  onBackdropClick?: () => void;
}

export default function Modal({ title, body, actions, onBackdropClick }: ModalProps) {
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // Only fire if the click was directly on the backdrop, not the modal card
    if (e.target === e.currentTarget && onBackdropClick) {
      onBackdropClick();
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <h2 className={styles.title}>{title}</h2>
        {body && <p className={styles.body}>{body}</p>}
        <div className={styles.actions}>
          {actions.map((action) => (
            <button
              key={action.label}
              className={
                action.variant === 'primary'
                  ? styles.btnPrimary
                  : action.variant === 'destructive'
                    ? styles.btnDestructive
                    : styles.btnSecondary
              }
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
