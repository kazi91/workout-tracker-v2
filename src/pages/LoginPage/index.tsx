/**
 * LoginPage — allows returning users to authenticate with email + password.
 * On success: sets session via AuthContext.login() and navigates to /logs.
 * On failure: shows generic "Incorrect email or password" below the form (L1 — no field-specific errors).
 * Blank fields show "Can't be blank" inline per field (L4).
 * Reads: AuthContext (login function)
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setFormError('');

    // Blank field validation (L4)
    let hasError = false;
    if (!email.trim()) { setEmailError("Can't be blank"); hasError = true; }
    if (!password.trim()) { setPasswordError("Can't be blank"); hasError = true; }
    if (hasError) return;

    const user = await login(email.trim(), password);
    if (!user) {
      // Generic error — no field-specific feedback to prevent email registration leak (L1)
      setFormError('Incorrect email or password');
      return;
    }

    navigate('/logs', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Workout Tracker</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); setFormError(''); }}
            />
            {emailError && <span className={styles.fieldError}>{emailError}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setFormError(''); }}
            />
            {passwordError && <span className={styles.fieldError}>{passwordError}</span>}
          </div>

          {formError && <p className={styles.formError}>{formError}</p>}

          <button type="submit" className={styles.submitBtn}>Log In</button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
