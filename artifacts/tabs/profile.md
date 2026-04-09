# Profile Tab — Schematic

> **Purpose:** Detailed spec for the Profile tab. Use this as the source of truth when building or modifying anything under `/profile`. Cross-reference with master schematic (`artifacts/master-schematics.md`) for DB schema, services, and shared components.

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| /profile | ProfilePage | User info, settings, auth actions |

---

## ProfilePage

### Layout
- Header: "Profile" title
- **User Info section:**
  - Name — editable text input, auto-saves on blur
  - Height — editable number input, auto-saves on blur; unit label shown beside field ("ft/in" or "cm" from UserSettingsContext)
  - Weight — editable number input, auto-saves on blur; unit label shown beside field ("lb" or "kg" from UserSettingsContext)
  - No explicit save button — changes persist automatically
  > **C6 RESOLVED:** Height — single number input, label "in" (imperial) or "cm" (metric) from UserSettingsContext. Same pattern as weight input.
  > **C7 RESOLVED:** Height and weight default to 0/unset on first load — show blank placeholder, not "0". Blank is silently valid (no error); user fills in later. Note: height and weight will be required for future Statistics features (e.g. BMI, body composition tracking) — when those features are built, add a profile-completion prompt or warning if these fields are empty.
  > **M7 RESOLVED:** Negative or non-numeric values show "Enter a valid number" inline, same as workout inputs. Blank is silently valid (Profile-specific rule — these are optional fields).
- **Preferences section:**
  - Unit preference toggle: Imperial (lb, ft/in) | Metric (kg, cm)
  - Changing preference updates `UserSettingsContext` + persists to DB via `UserService.updateProfile()`
  - All stored values remain in lb/inches — only display changes; no data conversion on toggle
- **Account section:**
  - Logout button — calls `AuthService.logout()` → redirects to `/login`

### Services Used
- `UserService.getProfile(userId)` — load user data on mount
- `UserService.updateProfile(userId, data)` — save name/height/weight/unitPreference
- `AuthService.logout()` — log out

### State
- `profile: User | null`
- `loading: boolean`
- Form fields: `name`, `height`, `weight` (controlled inputs — auto-save on blur)
- Units managed via `UserSettingsContext` (not local state)

### Context Used
- `AuthContext` — get current userId, call logout
- `UserSettingsContext` — read/write unit preference

---

## Components

| Component | Location | Description |
|-----------|----------|-------------|
| ProfilePage | pages/ProfilePage/ProfilePage.tsx | All profile content |

---

## Open Issues

> Tracked in the master Issue Tracker (`artifacts/master-schematics.md`) — filter by Area = Profile.

---

## Future Iterations

- Profile photo / avatar upload
- Body weight history chart (log weight over time)
- "Change password" flow (when backend auth is added)
- "Delete account" with confirmation (cascades all user data)
- Notification preferences (when backend + push notifications added)
- Connected devices (Apple Health, Google Fit — post-mobile-app)
- Measurement tracking (waist, chest, arms, etc.) as a separate section
