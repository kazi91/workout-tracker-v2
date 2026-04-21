// Replace the global IndexedDB with an in-memory fake before any test runs.
// fake-indexeddb/auto patches window.indexedDB globally — Dexie picks it up automatically.
import 'fake-indexeddb/auto';
import '@testing-library/jest-dom';
