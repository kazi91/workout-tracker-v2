# Login Tab — Schematic

> **Status:** Stub — spec deferred from pre-build audit (C4). Resolve before build step 2 (Auth).
> **Cross-reference:** `artifacts/master-schematics.md` auth section, `artifacts/tabs/programs.md` for comparable form decisions.

---

## Purpose

LoginPage allows a returning user to authenticate with email + password and resume their session.

---

## Decisions (resolved — session 6)

**L1 — Wrong credentials:** Single generic error — "Incorrect email or password." Field-specific errors leak whether an email is registered; generic is simpler and better practice.

**L2 — Forgot password:** Omit for MVP. Plain-text passwords in IndexedDB make a reset flow meaningless (no email, no SMS). User starts over if forgotten.

**L3 — Redirect after login:** Always `/logs` — consistent with signup auto-login behavior.

**L4 — Empty field validation:** Same as SignupPage — blank fields show "Can't be blank" inline; field stays editable.

---

## Layout

- Full-screen dark layout, centered card — matches SignupPage auth layout (UIdesign.md section auth layout)
- Email input
- Password input
- "Log In" button — Primary (green)
- Link to SignupPage — "Don't have an account? Sign up"
- Error display: single generic message "Incorrect email or password" shown below the form (not per-field — prevents email registration leak)

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| /login | LoginPage | Email + password login form |

---

## Services Used

- `AuthService.login(email, password)` — verifies credentials; internally queries by email; sets localStorage session on success
- `AuthContext` — set session after successful login (`localStorage` key: `workout_tracker_user_id`)

---

## Future Iterations

- Biometric login (Face ID / Touch ID via Web Authentication API)
- "Remember me" toggle (currently always remembered via localStorage)
- Password reset flow
