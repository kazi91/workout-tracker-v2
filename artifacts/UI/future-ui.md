WORKOUT TRACKER V2 — FUTURE UI
================================
> Last touched: 2026-04-26 (session 54) — added §6 Anatomy Avatar pointer to 3d-model/pipeline.md

Purpose: Track post-MVP UI ambitions in enough detail that MVP architecture doesn't
paint future-you into a corner. Nothing here gets built before MVP ships. The point
of writing it down now is to ensure no MVP decision quietly precludes a future one.

This document is structured as OPEN QUESTIONS, not specs. Each question has the
form: what's the question, why does it matter for MVP architecture, what are the
candidate answers. Lock answers as research clarifies the right path.

Cross-reference: UIdesign.md (principles, especially MULTIMODAL READY),
component-standards.md (current FAB and nav patterns the future features must respect),
master-schematics.md (layout contracts these features will need to extend).

---

TABLE OF CONTENTS
------------------
  1. Guiding Principle — Multimodal Ready
  2. AI Search Assistant
  3. Voice Command Capabilities
  4. Light Mode (palette locked, implementation deferred)
  5. Rankings / Leaderboards (out of scope for now — placeholder only)

---

1. GUIDING PRINCIPLE — MULTIMODAL READY
-----------------------------------------
Tap, voice, and AI command are three doors into the same room. Every primary action
in the app should eventually be reachable through all three. Not because users will
use all three, but because forcing a user to switch modalities mid-task is the
opposite of "get out of their way."

  Implications for MVP architecture:
    - Every action that mutates data (create/update/delete) must be exposed through
      a service-layer function, not embedded in a component handler. Voice and AI
      will call the same functions — direct DOM-bound logic is a future blocker.
    - Confirmation patterns must be consistent. If "Discard Workout" requires a modal
      on tap, voice must trigger the same modal (not silently execute).
    - Data reads must be queryable. If a screen calculates "best bench press" inline,
      that calculation must be a function, not just JSX. AI assistant will need it.

  This principle is restated in UIdesign.md §1 so it stays in the principle list.
  The MVP test: can each action's logic be invoked without rendering its UI? If yes,
  it's multimodal-ready.

---

2. AI SEARCH ASSISTANT
-----------------------
Goal: a user can ask the app questions in natural language and get answers grounded
in their own workout data — without leaving the app or learning the data model.

Examples of target queries:
    "What was my best bench last month?"
    "How many leg days did I do in March?"
    "Show me my squat progress."
    "When did I last train shoulders?"

  AI-Q1 — Where does the assistant live in the UI?
  -------------------------------------------------
  Status: OPEN
  Why it matters for MVP: the FAB is currently the global action surface. Adding an
  AI entry point means deciding whether AI is a sibling of FAB, replaces FAB during
  a workout, or lives in a new persistent slot. Layout contracts in master-schematics.md
  may need to reserve space.

  Candidates:
    a) Persistent input bar — pinned above bottom nav. Always visible.
       Pro: discoverability, one-tap access.
       Con: vertical screen real estate cost; competes with FAB and nav.
    b) FAB-replacement — long-press FAB or secondary FAB tap opens AI.
       Pro: zero new chrome; uses existing global surface.
       Con: hides discoverability behind a gesture.
    c) Dedicated 5th tab — adds "Ask" to bottom nav.
       Pro: maximal discoverability and a clear home for chat history.
       Con: breaks the locked 4-tab contract; 5 tabs gets crowded.
    d) Pull-down-from-top — gesture from any screen.
       Pro: no chrome, fast.
       Con: low discoverability; conflicts with iOS Notification Center on the
            edges of the screen.

  Lean (not locked): (b) for read-only queries during MVP era; revisit once feature
  scope is clear. Keeps the surface count flat.

  AI-Q2 — Read-only or write-capable?
  ------------------------------------
  Status: OPEN
  Why it matters for MVP: write-capable means AI invokes the same service-layer
  functions that UI does. That's a strong reason to enforce the multimodal-ready
  rule from day one — every mutation is a callable function, no exceptions.

  Candidates:
    a) Read-only at launch — answers questions, navigates, never mutates.
       Pro: low risk, no confirmation UX needed, ships faster.
       Con: limited utility; users will ask "log 225 for 5" and be told no.
    b) Write-capable at launch — full command surface.
       Pro: feels magical; full multimodal vision realized.
       Con: confirmation UX is non-trivial; mis-interpretation risk is real.
    c) Phased — read-only first, write-capable in a later iteration.
       Pro: ships value early; lets confirmation patterns be designed against
            real read-only usage data.
       Con: two launches instead of one.

  Lean (not locked): (c). MVP-discipline applied to AI itself.

  AI-Q3 — How are answers surfaced?
  ----------------------------------
  Status: OPEN
  Why it matters for MVP: aligns with TOOL, NOT SOCIAL APP principle. A chat-thread
  UI risks turning the app into a chatbot. A navigator that drops you on the right
  screen keeps the app a tool.

  Candidates:
    a) Inline chat thread — full conversation visible, like ChatGPT.
       Pro: natural; users understand the pattern.
       Con: app starts to feel like a chatbot; conflicts with anti-clutter.
    b) Transient overlay — single answer card; dismisses on action or tap-out.
       Pro: lightweight; doesn't change the app's character.
       Con: no history; users may want to reference an earlier answer.
    c) AI as navigator — answers always include "Take me there" and the screen is
       the answer; AI just figures out where to go.
       Pro: most aligned with tool-not-social-app; uses the app the user already knows.
       Con: limits AI to navigable answers; not all questions have a destination.
    d) Hybrid — (b) for facts, (c) for anything that maps to a screen.
       Pro: best of both; respects the principle.
       Con: routing logic is more complex.

  Lean (not locked): (d).

  AI-Q4 — Conversation memory?
  -----------------------------
  Status: OPEN
  Why it matters for MVP: persistent memory means a new table. Schema-adjacent.
  MVP-discipline says no by default.

  Candidates:
    a) Session-only — wipes when the app closes.
       Pro: zero schema change.
       Con: users repeat themselves.
    b) Persistent thread — saved like workouts.
       Pro: useful for ongoing analysis.
       Con: new table; storage growth; privacy considerations.

  Lean (not locked): (a) for MVP-AI launch; (b) is a later iteration.

  AI-Q5 — Where does the model run?
  ----------------------------------
  Status: OPEN
  Why it matters: affects offline behavior, privacy, latency, cost, and whether
  this is feasible at all on the current stack.

  Candidates:
    a) Cloud API call (OpenAI / Anthropic / etc.) — queries leave the device.
       Pro: smartest models; lowest implementation cost.
       Con: requires network at the gym (often spotty); ongoing API cost; data
            leaves the device; needs auth flow extension.
    b) On-device small model — fully offline.
       Pro: privacy; offline; no per-query cost.
       Con: model quality; battery; bundle size.
    c) Hybrid — common queries handled locally (parsing intent), data lookups stay
       on-device, only ambiguous natural-language parsing hits the cloud.
       Pro: best privacy/quality tradeoff.
       Con: most complex to build.

  Decision deferred — landscape will look different by MVP-completion.

---

3. VOICE COMMAND CAPABILITIES
-------------------------------
Goal: a user can log sets and ask questions hands-free during a workout. Sweaty
hands and chalk are not great for typing.

Examples of target commands:
    "Log 225 for 5."
    "Next exercise."
    "What's my best bench?"
    "Start rest timer."

  V-Q1 — Activation model: push-to-talk or wake-word?
  ----------------------------------------------------
  Status: OPEN
  Why it matters for MVP: wake-word requires always-on mic listening, which has
  battery, privacy, and false-trigger costs the GYM CONTEXT principle does not
  forgive. Push-to-talk maps to a single tap on a known surface.

  Candidates:
    a) Push-to-talk — hold a button to speak.
       Pro: predictable; battery-friendly; no false triggers.
       Con: requires a free hand.
    b) Wake-word — "Hey [app]" activates listening.
       Pro: hands-free.
       Con: battery; privacy; false triggers in a noisy gym (mirrors, music, others).
    c) Headphone-button activation — double-tap headphones to speak.
       Pro: hands-free without wake-word.
       Con: only works with paired audio devices; iOS/Android API differences.

  Lean (not locked): (a) at launch; (c) as a stretch for paired audio.

  V-Q2 — Voice-to-action vs. voice-to-search?
  --------------------------------------------
  Status: OPEN — likely both, but routed differently.
  Why it matters: a command ("log 225 for 5") and a query ("what was my best bench")
  use the same input but very different downstream paths. Routing logic is shared
  with AI search; same intent-parsing layer.

  Treat as: voice is a microphone for the AI assistant, not a separate system.
  Answer V-Q2 by answering AI-Q2.

  V-Q3 — Confirmation model for voice mutations?
  -----------------------------------------------
  Status: OPEN
  Why it matters: silent execution feels magic but is dangerous (mis-heard reps,
  ambient noise). Visible confirmation fits existing auto-save + global error
  banner pattern.

  Candidates:
    a) Silent execution — voice command runs immediately, no confirmation.
       Pro: feels seamless; matches the auto-save principle.
       Con: mis-heard "five" → "nine" is now logged data.
    b) Inline toast with undo — "Logged 225 × 5 — tap to undo (3s)."
       Pro: fast but recoverable; matches existing global-banner ergonomics.
       Con: toast adds new UI pattern not currently in spec.
    c) Modal confirmation — voice command pre-fills a confirm modal.
       Pro: safe; reuses existing modal pattern.
       Con: defeats the speed benefit of voice.

  Lean (not locked): (b). New pattern, but the most aligned with existing principles.
  If (b) is selected, undo-toasts become a documented component in
  component-standards.md.

  V-Q4 — Voice on the active workout screen specifically?
  --------------------------------------------------------
  Status: OPEN
  Why it matters: this is the highest-value voice surface and the one with the most
  context (current exercise, current set). Commands here can be much shorter
  ("five reps") because the app already knows what exercise.

  Likely answer: yes, dedicated voice button on the active workout screen, separate
  from the global AI entry point. Lock when V-Q1 is locked.

---

4. LIGHT MODE
--------------
  Status: post-MVP — palette LOCKED in design-tokens.md §1d
  Implementation: deferred until MVP ships
  Effort estimate: roughly one day once OD6 (CSS custom properties) is resolved
  Trigger: a [data-theme="light"] attribute swaps the variable values; component
  CSS doesn't change.

  Open question: where does the toggle live?
    Likely: Profile → Display Preferences. Not in main nav.
    Open: should it auto-follow OS preference (prefers-color-scheme) by default,
    with an explicit override?

---

5. RANKINGS / LEADERBOARDS
----------------------------
  Status: known future feature, NOT MVP (UIdesign.md §1, TOOL NOT SOCIAL APP)
  Placeholder only — full design out of scope until MVP ships and the question of
  how (if at all) social features fit the app's character is revisited.
  No MVP architecture should preclude this, but no MVP architecture should plan
  for it either.

---

6. ANATOMY AVATAR (F29)
-------------------------
  Status: post-MVP "tentpole" feature; R&D track in flight as of session 54.
  Pipeline doc: `artifacts/UI/3d-model/pipeline.md` (DRAFT)
  Direction: real 3D via React Three Fiber, holographic Tron/Prometheus aesthetic,
  built parallel to main app and integrated when both ready (Q6b).
  Aesthetic exception zone — explicitly breaks the flat-design rule of the rest of
  the app. Per-muscle fatigue color (green → orange → red) mapped to CE1 taxonomy.
  Earlier 2D bezier-SVG editor build was exploration only; retired in favor of real 3D.

---

OPEN QUESTIONS INDEX (for cross-reference back to UIdesign.md §5)
-----------------------------------------------------------------
  AI-Q1  Assistant entry point in UI
  AI-Q2  Read-only vs. write-capable at launch
  AI-Q3  Answer surfacing pattern
  AI-Q4  Conversation memory persistence
  AI-Q5  Where the model runs
  V-Q1   Voice activation model
  V-Q2   Voice-to-action vs. voice-to-search routing (resolved with AI-Q2)
  V-Q3   Voice confirmation model
  V-Q4   Voice on active workout screen
