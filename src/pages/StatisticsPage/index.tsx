/**
 * StatisticsPage — placeholder; full feature deferred post-MVP (OD4).
 * Displays a "Coming soon" message. No data is loaded.
 */

import styles from './StatisticsPage.module.css';

export default function StatisticsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.placeholder}>
        <p className={styles.placeholderText}>Coming soon</p>
        <p className={styles.placeholderSub}>Stats and progress charts will appear here.</p>
      </div>
    </div>
  );
}
