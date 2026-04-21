CORE DEVELOPMENT PROCESS
=========================
Last updated: 2026-04-13

---

## Role of This Document

This is the process framework — it defines HOW we work, not WHAT we're building.
It is the philosophical backbone. Specific decisions, schemas, and specs live elsewhere.

Document hierarchy (authority order):
  1. master-schematics.md  — source of truth for architecture, schema, decisions, issue tracker
  2. CLAUDE.md             — operational entry point for every Claude instance (session rules, reading order, build rules)
  3. recap.md             — current state, next action, session history
  4. handoff.md            — full session context, rejected options, reasoning
  5. UIdesign.md          — visual standards, color system, component specs
  6. coreprocess.md       — this file (process philosophy + phase definitions)
  7. tabs/*.md             — per-tab feature specs

If two docs conflict, the higher-numbered doc yields to the lower-numbered one.

---

## Current Focus

Target: MVP — working demo of a mobile-first workout tracker
Phase: 4 — Testing & post-demo cleanup (see recap.md for exact next action)

---

## Development Philosophy

- Solo developer — every scope decision must be maintainable by one person
- Agile — small testable increments; adjust based on real use
- Mobile-first — phone at the gym is the primary context; web/desktop secondary
- Lean MVP — minimum that proves core value, then iterate
- Backend-ready — service layer abstraction; no frontend rewrites when backend arrives
- Collaborative build — every session is a back-and-forth; significant decisions require explicit agreement before building

---

## Problem

Existing workout tracking apps are cluttered, unintuitive, and hide core features behind paywalls and social feeds. Users abandon them mid-workout or never build a tracking habit.

Goal: fast, clean, mobile-first workout logging. Log a set in seconds. Review history without noise.

Competition: Hevy, Strong, JEFIT, MyFitnessPal, others. Differentiate on simplicity, speed, and no paywall on core features.

(Full problem statement, market context, and user stories live in master-schematics.md.)

---

## Five-Phase Process

Every feature — MVP or post-MVP — follows this cycle. Phases are sequential. Do not advance without explicit agreement. Before moving to the next phase, update the relevant artifacts with what was decided.

### Phase 1 — Research & Analysis

Define the problem, research the market, identify requirements.
- User stories written and agreed before any design or build work
- Competitor research re-run before each major feature iteration
- Scope set explicitly: what's in, what's deferred, what's rejected

### Phase 2 — Blueprint

Architectural plan covering tech stack, DB schema, component design, service contracts, and user flows.
- Every addition accounts for current build, future features, and migration path
- Reference any UML, mockups, or design assets provided
- Lock decisions as Phase Contracts — do not revisit without explicit discussion
- Upgrade recommendations surfaced when approaching tech stack limitations (features, integrations, security, scale)

### Phase 3 — Build

Implement step by step from foundational elements upward.
- Detailed back-and-forth throughout — propose changes with options, pros/cons, and examples
- Frontend first (UI/UX for mobile and web); backend deferred for MVP
- Design to prevent bugs — eliminate pain points in design stage rather than fixing them in production
- Refactor review before each build phase: check Issue Tracker for must-fix items; resolve before proceeding, defer minor items with explicit note

### Phase 4 — Test & Debug

Applied after each build phase, not batched at the end.
- Unit testing: every page, button, service function, DB operation
- Integration testing: after backend is connected
- End-to-end testing: after full user flows are stable
- Bug tracking: single running list in Issue Tracker (master-schematics.md); update as encountered and resolved
- Runtime optimization: after unit audit is clean — render performance, DB efficiency, bundle size

### Phase 5 — Iteration

Repeat phases 1–4 for every new feature after MVP ships.
- Re-run competitor research to validate the feature solves a real gap
- Prioritize from Future items in Issue Tracker
- Refactor old code as needed for new features or efficiency
- Polish, test new ideas, build and release updated versions

---

## Session Rules (for Claude instances)

Operational session rules (reading order, token management, build discipline, model selection) live in CLAUDE.md. That file is the starting point for every new Claude instance — not this one.

This file provides the WHY. CLAUDE.md provides the HOW.
