/**
 * LogsPage — displays the user's workout history and any in-progress workout.
 * In Progress section: visible only when ≥1 log has finishedAt === null.
 * Workout History: all finished logs grouped by date (Today / Yesterday / weekday / Month Year).
 * WorkoutFAB handles "Start Workout" — this page only lists logs.
 * Reads: AuthContext (userId), WorkoutLogService (all logs)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as WorkoutLogService from '../../services/WorkoutLogService';
import type { WorkoutLog } from '../../types';
import styles from './LogsPage.module.css';

// ── Date grouping helpers ──

const MS_PER_DAY = 86400000;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDateGroup(date: Date): string {
  const now = new Date();
  const todayStart = startOfDay(now);
  const yesterdayStart = new Date(todayStart.getTime() - MS_PER_DAY);
  const sevenDaysAgo = new Date(todayStart.getTime() - 7 * MS_PER_DAY);

  if (date >= todayStart) return 'Today';
  if (date >= yesterdayStart) return 'Yesterday';
  if (date >= sevenDaysAgo) return date.toLocaleDateString('en-US', { weekday: 'long' });
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// M1 resolved: time-only for recent groups; full date+time for month-year groups
function isMonthYearGroup(group: string): boolean {
  return /\d{4}$/.test(group);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDateTime(date: Date): string {
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    formatTime(date)
  );
}

export default function LogsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    WorkoutLogService.getAll(user.id).then((all) => {
      setLogs(all);
      setLoading(false);
    });
  }, [user?.id]);

  if (loading) return null;

  const inProgress = logs.filter((l) => l.finishedAt === null);
  const finished = logs.filter((l) => l.finishedAt !== null);

  // Group finished logs by date label (M2 resolved: newest-first within group — already sorted by service)
  const groupMap: Record<string, WorkoutLog[]> = {};
  const groupOrder: string[] = [];

  for (const log of finished) {
    const group = getDateGroup(log.startedAt);
    if (!groupMap[group]) {
      groupMap[group] = [];
      groupOrder.push(group);
    }
    groupMap[group].push(log);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Logs</h1>

      {/* In Progress section — only when there's an active workout */}
      {inProgress.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>In Progress</h2>
          <ul className={styles.list}>
            {inProgress.map((log) => (
              <li key={log.id}>
                <button
                  className={styles.card}
                  onClick={() => navigate(`/logs/${log.id}`)}
                >
                  <span className={styles.cardName}>{log.name}</span>
                  <span className={styles.badge}>In Progress</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Workout History */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Workout History</h2>

        {finished.length === 0 ? (
          <p className={styles.empty}>No workouts recorded</p>
        ) : (
          groupOrder.map((group) => (
            <div key={group}>
              <p className={styles.dateLabel}>{group}</p>
              <ul className={styles.list}>
                {groupMap[group].map((log) => (
                  <li key={log.id}>
                    <button
                      className={styles.card}
                      onClick={() => navigate(`/logs/${log.id}`)}
                    >
                      <span className={styles.cardName}>{log.name}</span>
                      <span className={styles.cardTime}>
                        {isMonthYearGroup(group)
                          ? formatDateTime(log.startedAt)
                          : formatTime(log.startedAt)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
