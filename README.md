# Workout Tracker v2

A mobile-first workout tracking app for logging exercises, managing programs, and reviewing session history — built as a portfolio project.

[![Demo Video](https://img.shields.io/badge/Watch-Demo-red?logo=youtube)](https://youtube.com/watch?v=zAkdTvRIYhk)

---

## Demo

[Watch on YouTube](https://youtube.com/watch?v=zAkdTvRIYhk)

---

## Tech Stack

| Layer | Tools |
|---|---|
| UI | React 18, TypeScript, CSS Modules |
| Routing | React Router v7 |
| Data | Dexie.js (IndexedDB — no backend) |
| Build | Vite 5 |
| Testing | Vitest 4, React Testing Library, fake-indexeddb |

---

## Features

- Create and manage workout programs with custom exercises
- Inline custom exercise creation from the exercise search modal
- Log active workouts set-by-set with auto-save
- Review session history in read-only or edit mode
- Imperial / metric unit toggle
- User-facing error surface — global top banner on any data-layer failure
- Fully offline — all data stored locally in the browser

---

## Architecture Highlights

- **Service layer abstraction** — components never touch Dexie directly; all data access goes through service modules, so the frontend migrates cleanly to an HTTP backend without component rewrites.
- **Context-only shared state** — three providers (Auth, UserSettings, ActiveWorkout); no Redux. Page-level `useState` + `useEffect` everywhere else.
- **Dexie schema v2** — 8 tables with explicit cascade-delete order in the service layer (programs → workouts → workoutExercises; workoutLogs → logExercises → logSets).

---

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Testing

72 tests across 8 files — service-layer audit (auth, programs, workouts, exercises, sets, workout logs) plus React Testing Library coverage of the U4/U5 validation guards on the workout detail page. `fake-indexeddb` gives each test a fresh database via `db.delete() + db.open()` in `beforeEach`, so tests hit real Dexie queries in true isolation rather than mocking the data layer.

```bash
npx vitest run      # run once
npx vitest          # watch mode
```

---

## Notes

**Authentication is MVP/local-only.** There is no backend — user accounts and passwords are stored in the browser's IndexedDB via Dexie.js. This is not production-grade auth; it's a portfolio demo. A real auth layer (hashed passwords, server-side sessions) would replace this before any production use.

---

## Status

In progress — Phase 5 (Statistics + new features) active. Seed re-curation underway (sessions 45a–e closed): 183 of 213 exercises tagged with primary/secondary muscle maps + parent/variant architecture; P4 (30 entries) + cross-curation validation remaining before CE1/CE2 coordinated build and Statistics tab.

---

© 2026 Muktadir Kazi. All rights reserved.
