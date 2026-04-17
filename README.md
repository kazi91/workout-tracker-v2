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

---

## Features

- Create and manage workout programs with custom exercises
- Log active workouts set-by-set with auto-save
- Review session history in read-only or edit mode
- Imperial / metric unit toggle
- Fully offline — all data stored locally in the browser

---

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Notes

**Authentication is MVP/local-only.** There is no backend — user accounts and passwords are stored in the browser's IndexedDB via Dexie.js. This is not production-grade auth; it's a portfolio demo. A real auth layer (hashed passwords, server-side sessions) would replace this before any production use.

---

## Status

In progress — Phase 4 (testing & post-demo cleanup)

---

© 2026 Muktadir Kazi. All rights reserved.
