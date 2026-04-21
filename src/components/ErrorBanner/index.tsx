/**
 * ErrorBanner — fixed top banner for user-facing error messages.
 * Reads error from ErrorContext; clears on X press.
 * Renders nothing when no error is active.
 */

import { X } from 'lucide-react';
import { useError } from '../../context/ErrorContext';
import styles from './ErrorBanner.module.css';

export default function ErrorBanner() {
  const { error, clearError } = useError();
  if (!error) return null;

  return (
    <div className={styles.banner} role="alert">
      <span className={styles.message}>{error}</span>
      <button className={styles.dismissBtn} onClick={clearError} aria-label="Dismiss error">
        <X size={18} />
      </button>
    </div>
  );
}
