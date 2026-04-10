/**
 * ProfilePage — displays and edits the user's profile info and preferences.
 * Fields: name, height, weight (auto-save on blur). Unit preference toggle (saves immediately).
 * Height/weight default to 0 in DB — shown as blank placeholders (C7: blank is silently valid).
 * Logout clears localStorage session and navigates to /login.
 * Reads: AuthContext (user, logout, updateUser), UserSettingsContext (weightUnit, heightUnit)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import * as UserService from '../../services/UserService';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const { weightUnit, heightUnit, displayWeight, displayHeight } = useUserSettings();
  const navigate = useNavigate();

  // Convert stored lb/inches to display unit for initial input values.
  // Show empty string for 0 (DB default) so the inputs look blank, not "0" (C7).
  const storedWeightDisplay = user?.weight
    ? String(Math.round(displayWeight(user.weight) * 10) / 10)
    : '';
  const storedHeightDisplay = user?.height
    ? String(Math.round(displayHeight(user.height) * 10) / 10)
    : '';

  const [nameVal, setNameVal] = useState(user?.name ?? '');
  const [heightVal, setHeightVal] = useState(storedHeightDisplay);
  const [weightVal, setWeightVal] = useState(storedWeightDisplay);

  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  // ── Auto-save on blur handlers ──

  async function handleNameBlur() {
    const trimmed = nameVal.trim();
    if (!trimmed || !user?.id) return;
    if (trimmed === user.name) return;
    await UserService.updateProfile(user.id, { name: trimmed });
    updateUser({ name: trimmed });
  }

  async function handleHeightBlur() {
    if (!user?.id) return;
    // Blank is silently valid — clear error and leave stored value unchanged (C7)
    if (heightVal.trim() === '') {
      setHeightError('');
      return;
    }
    const num = parseFloat(heightVal);
    if (isNaN(num) || num < 0) {
      setHeightError('Enter a valid number');
      return;
    }
    setHeightError('');
    // Convert display unit back to stored inches
    const inches = heightUnit === 'cm' ? num / 2.54 : num;
    await UserService.updateProfile(user.id, { height: inches });
    updateUser({ height: inches });
  }

  async function handleWeightBlur() {
    if (!user?.id) return;
    // Blank is silently valid (C7)
    if (weightVal.trim() === '') {
      setWeightError('');
      return;
    }
    const num = parseFloat(weightVal);
    if (isNaN(num) || num < 0) {
      setWeightError('Enter a valid number');
      return;
    }
    setWeightError('');
    // Convert display unit back to stored lb
    const lb = weightUnit === 'kg' ? num * 2.20462 : num;
    await UserService.updateProfile(user.id, { weight: lb });
    updateUser({ weight: lb });
  }

  // ── Unit preference toggle — saves immediately ──
  async function handleUnitToggle(pref: 'imperial' | 'metric') {
    if (!user?.id || pref === user.unitPreference) return;
    await UserService.updateProfile(user.id, { unitPreference: pref });
    updateUser({ unitPreference: pref });
    // Reset height/weight display strings to match the new unit
    // (stored value unchanged — only the display conversion changes)
    const updatedUser = { ...user, unitPreference: pref };
    const isMetric = pref === 'metric';
    const newDisplayWeight = (lb: number) => (isMetric ? Math.round(lb * 0.453592 * 10) / 10 : lb);
    const newDisplayHeight = (inches: number) => (isMetric ? Math.round(inches * 2.54 * 10) / 10 : inches);
    setWeightVal(updatedUser.weight ? String(newDisplayWeight(updatedUser.weight)) : '');
    setHeightVal(updatedUser.height ? String(newDisplayHeight(updatedUser.height)) : '');
  }

  // ── Logout ──
  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  if (!user) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profile</h1>

      {/* ── User Info ── */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>User Info</p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            className={styles.input}
            type="text"
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={handleNameBlur}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="profile-height">Height</label>
          <div className={styles.inputRow}>
            <input
              id="profile-height"
              className={`${styles.input} ${heightError ? styles.inputError : ''}`}
              type="number"
              inputMode="decimal"
              min="0"
              value={heightVal}
              placeholder="—"
              onChange={(e) => { setHeightVal(e.target.value); setHeightError(''); }}
              onBlur={handleHeightBlur}
            />
            <span className={styles.unitLabel}>{heightUnit}</span>
          </div>
          {heightError && <span className={styles.fieldError}>{heightError}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="profile-weight">Weight</label>
          <div className={styles.inputRow}>
            <input
              id="profile-weight"
              className={`${styles.input} ${weightError ? styles.inputError : ''}`}
              type="number"
              inputMode="decimal"
              min="0"
              value={weightVal}
              placeholder="—"
              onChange={(e) => { setWeightVal(e.target.value); setWeightError(''); }}
              onBlur={handleWeightBlur}
            />
            <span className={styles.unitLabel}>{weightUnit}</span>
          </div>
          {weightError && <span className={styles.fieldError}>{weightError}</span>}
        </div>
      </section>

      {/* ── Preferences ── */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>Preferences</p>

        <div className={styles.field}>
          <span className={styles.label}>Unit System</span>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${user.unitPreference === 'imperial' ? styles.toggleBtnActive : ''}`}
              onClick={() => handleUnitToggle('imperial')}
            >
              Imperial
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${user.unitPreference === 'metric' ? styles.toggleBtnActive : ''}`}
              onClick={() => handleUnitToggle('metric')}
            >
              Metric
            </button>
          </div>
        </div>
      </section>

      {/* ── Account ── */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>Account</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log Out
        </button>
      </section>
    </div>
  );
}
