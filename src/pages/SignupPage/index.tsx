/**
 * SignupPage — new user registration with name, email, password, and unit preference.
 * Unit preference is selected via a two-button toggle (Imperial | Metric), default Imperial (C3).
 * On success: auto-logs in via AuthContext.signup() and navigates to /logs.
 * Blank fields show "Can't be blank" inline (C3). No duplicate email check for local-only MVP.
 * Reads: AuthContext (signup function)
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [unitPreference, setUnitPreference] = useState<'imperial' | 'metric'>('imperial');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Blank field validation (C3)
    let hasError = false;
    if (!name.trim()) { setNameError("Can't be blank"); hasError = true; }
    if (!email.trim()) { setEmailError("Can't be blank"); hasError = true; }
    if (!password.trim()) { setPasswordError("Can't be blank"); hasError = true; }
    if (hasError) return;

    await signup(name.trim(), email.trim(), password, unitPreference);
    navigate('/logs', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              id="name"
              className={`${styles.input} ${nameError ? styles.inputError : ''}`}
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(''); }}
            />
            {nameError && <span className={styles.fieldError}>{nameError}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            />
            {emailError && <span className={styles.fieldError}>{emailError}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            />
            {passwordError && <span className={styles.fieldError}>{passwordError}</span>}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Units</span>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${unitPreference === 'imperial' ? styles.toggleBtnActive : ''}`}
                onClick={() => setUnitPreference('imperial')}
              >
                Imperial
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${unitPreference === 'metric' ? styles.toggleBtnActive : ''}`}
                onClick={() => setUnitPreference('metric')}
              >
                Metric
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Create Account</button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
