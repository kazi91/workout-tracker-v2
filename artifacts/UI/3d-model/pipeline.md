ANATOMY AVATAR — 3D PIPELINE (DRAFT)
======================================
> Last touched: 2026-04-26 (session 54 research, Step 5) — Stage 0 cardboard-cutout expanded into full buildable spec (15 sub-stages, copy-paste code, exact App.tsx diff using actual codebase patterns, smoke test pass criteria, failure playbook, time budget)
> Status: **DRAFT / IGNORED** — exploration document. Not locked. Owner will flesh out before lock-in.
> Track: Parallel R&D — does not block workout-tracker-v2 app build. Q6(b) "design alongside, link later."

Purpose: end-to-end plan for building the holographic 3D anatomy avatar (F29). Captures
locked decisions, tool list, step-by-step build guide, license paper trail, and known
pitfalls. Read top-to-bottom on first pass; jump to a specific stage on later passes.

Cross-reference:
  - `artifacts/UI/UIdesign.md`            (avatar is an explicit aesthetic exception zone)
  - `artifacts/UI/future-ui.md`           (F29 sits in the post-MVP UI roadmap)
  - `artifacts/master-schematics.md`      (Issue Tracker entry for F29; CE1 muscle taxonomy)
  - `artifacts/exercises/exercise-bank.md` (CE1 muscle taxonomy is the data layer this avatar visualizes)

---

TABLE OF CONTENTS
------------------
  1. Locked decisions
  2. North star
  3. Tools, software, websites, hardware (everything you need)
  4. AI tools and where each one beats Claude
  5. Blender MCP — high-interest deep dive
  6. Stage-by-stage build guide (Stage 0–13)
  7. Asset license log
  8. Cautions / known pitfalls
  9. Open questions to resolve before lock
  10. Connection points to the workout-tracker app
  11. References and sources

---

1. LOCKED DECISIONS (from session 54 research)
------------------------------------------------
These are the choices that gate everything else. If any of these change, the whole
plan needs revisiting.

  Aesthetic direction       Real 3D, holographic, between Tron and Prometheus
  Render technology         WebGL via React Three Fiber (R3F) + Drei + postprocessing
  Asset pipeline            Hybrid Path F — MB-Lab body + Z-Anatomy stencil + DataTransfer bake
  Color focus for now       DEFERRED — build shape first, layer aesthetics second
  Body type for v1          Generic muscular male; Zane-grade silhouette is post-v1 polish
  Body variants             v1 = one body. Future = morph targets / shape keys (free with MB-Lab)
  Performance target        Mid-range Android (Pixel 6a-class), 30fps, <2MB asset budget
  Feature scope             "Tentpole" — main attraction beyond tracking, not a small embellishment
  Build relationship        Parallel to workout-tracker-v2 app build; integrate when both ready
  Earlier 2D SVG editor     RETIRED — was exploration only; Phase 1 ellipse scaffold informed shape direction, then skip to 3D

> **Plain English:** the model will be a real, rotatable 3D figure (not a flat picture or a
> bezier drawing) rendered in the browser using a free library. It will look like a
> holographic body lifted from a sci-fi movie, but built from free anatomical sources
> rather than authored from scratch. We're focusing only on the SHAPE of the model first;
> color and the holographic glow effects come after.

---

2. NORTH STAR
--------------
A holographic anatomy avatar inside the Workout Tracker app. Used for:

  1. Visualizing per-muscle fatigue — color shifts as the user logs workouts.
     Recovered = green. Fatigued = orange. Exhausted = red. Maps to the locked
     CE1 muscle taxonomy (`exercises/exercise-bank.md`).
  2. Teaching muscle anatomy — clicking an exercise lights up the muscles trained.
  3. Demonstrating exercise technique (later).

Must be:
  - Anatomically accurate enough to teach.
  - Aesthetic enough to be a featured avatar.
  - Stylized enough to feel branded — never a textbook.

> **Plain English:** the avatar is the app's signature visual feature. It tells the user
> "your body is a system, and here's what's recovered and what's not" — at a glance,
> with no charts.

---

3. TOOLS, SOFTWARE, WEBSITES, HARDWARE
----------------------------------------

  3a. SOFTWARE TO INSTALL
  -------------------------
  Free unless noted otherwise.

  | Tool | Version (as of 2026-04) | What it does | Install link |
  |---|---|---|---|
  | **Blender** | 4.x stable or 3.6 LTS | The 3D modeling app. Core of the pipeline. | blender.org |
  | **MB-Lab** (Blender add-on) | 1.7.8.x | Generates parametric muscular human bodies inside Blender. | github.com/animate1978/MB-Lab |
  | **Z-Anatomy `.blend` file** | latest release | Pre-segmented full anatomical body. Used as a stencil, not as the shipped mesh. | z-anatomy.com (download section) |
  | **Node.js + npm** | LTS (20.x or 22.x) | Required to run gltf-transform CLI. Already installed for workout-tracker-v2. | nodejs.org |
  | **gltf-transform CLI** | latest | Optimizes glTF files for the web — decimation, Draco compression, texture compression. | `npm install -g @gltf-transform/cli` |
  | **VS Code** (or current editor) | — | For shader / R3F code work. Already in use. | — |

  > **Plain English:** Blender is the painting studio where the body gets built and
  > marked up. MB-Lab is a tool inside Blender that generates the body for you — like
  > a character creator in a video game. Z-Anatomy is a free download with every muscle
  > already separated; you don't ship Z-Anatomy itself, you use it as a tracing guide.
  > gltf-transform is a command-line tool that shrinks the final 3D file so it loads fast.

  3b. WEBSITES / ACCOUNTS YOU'LL NEED
  -------------------------------------
  | Site | Why | Free? |
  |---|---|---|
  | github.com/animate1978/MB-Lab | Download MB-Lab releases | Yes |
  | z-anatomy.com | Download Z-Anatomy `.blend` | Yes |
  | mixamo.com | Pre-rigged characters, free animation poses (Adobe-owned) | Yes (Adobe sign-in required) |
  | sketchfab.com | CC0 throwaway models for the cardboard-cutout phase | Yes |
  | midjourney.com OR ChatGPT (DALL-E 3) | Generate reference photos for posing decisions | Paid (Midjourney $10/mo) — OPTIONAL, can skip |
  | hyper3d.ai (Rodin) | Text-to-3D for cardboard-cutout phase | Free tier with limits |
  | gltf-transform.dev | Documentation for the CLI | Yes |
  | threejs-journey.com | Best paid course; free chapters and showcase | Paid course, free reference content |
  | docs.pmnd.rs | React Three Fiber + Drei + postprocessing docs | Yes |
  | shadertoy.com | Free shader gallery for inspiration / reusable code | Yes |

  3c. HARDWARE
  --------------
  | Item | Why | Recommended spec |
  |---|---|---|
  | **Computer** | Run Blender + R3F dev server | 16GB RAM minimum, dedicated GPU strongly preferred (NVIDIA RTX 20-series or newer / Apple Silicon). Z-Anatomy is heavy — 8GB will struggle. |
  | **Test phone (Android)** | Validate mobile perf — the actual target | Pixel 6a, Pixel 7a, mid-range Samsung — anything from 2022+. NOT a flagship; flagships hide perf problems |
  | **Test phone (iOS)** | Cross-platform sanity check | Any iPhone 12+ |

  > **Plain English:** if your computer struggles when Blender is open with Z-Anatomy
  > loaded, the rest of the pipeline becomes painful. RAM is the bottleneck, not CPU
  > speed. Mid-range test phone is non-negotiable — testing only on a flagship phone is
  > how mobile apps ship feeling fine to the developer and laggy to everyone else.

---

4. AI TOOLS AND WHERE EACH ONE BEATS CLAUDE
---------------------------------------------
Honest table. I (Claude) cannot generate images, generate 3D meshes, or paint in Blender.
Other tools do those things better. Use the right tool per step.

  | Step in the pipeline | Best AI for the job | Why not Claude |
  |---|---|---|
  | Generate Zane / pose reference photo | **Midjourney v6+** or **DALL-E 3** (in ChatGPT) | I cannot generate images. Midjourney's anatomy is best-in-class as of early 2026 |
  | Text-to-3D body for cardboard-cutout phase | **Rodin (Hyper3D)** — picked over Meshy | I cannot generate 3D. Rodin currently has the strongest free-tier human-anatomy fidelity. Meshy is more famous but distorts on extremities |
  | Pose / rigged character base | **Mixamo** (Adobe) | Not strictly AI, but better than rolling my own. Free pre-rigged humans with hundreds of motions |
  | Bake muscle vertex groups | **None — Blender DataTransfer modifier** | Deterministic geometry op. AI does not help; using AI here would actively mis-route the work |
  | Decimate / Draco-compress for mobile | **gltf-transform CLI** | Industry standard. One command. Run it as a build step |
  | Shader / R3F integration code | Claude (me) or **Cursor** with Sonnet 4.6 | Where I match. Step 2 (next research pass) territory |
  | Blender automation (vertex group renames, batch decimation) | **Blender MCP server** + Claude | Section 5 below — high-interest deep dive |

  > **Plain English:** I'm best at writing code. I'm worst at making images and 3D models.
  > Use Midjourney for pictures, Rodin for quick 3D bodies, Mixamo for rigged characters,
  > Blender for the real model work, and me for the code that connects everything to
  > your React app.

  Picked between Rodin and Meshy for the cardboard-cutout phase: **Rodin (Hyper3D).**
  Reason: better current human-anatomy quality on free tier, better mesh topology for
  Blender import. Meshy's strength is props and stylized characters; humans are still
  its weak point.

---

5. BLENDER MCP — HIGH-INTEREST DEEP DIVE
------------------------------------------
What it is: Blender MCP is a community project that lets Claude (or any MCP-compatible
client) directly control Blender. You install a small add-on inside Blender; Claude
gets a connection and can run Blender's Python API on your behalf. Repository:
github.com/ahujasid/blender-mcp (verify current version — this space moves fast).

What this lets Claude do for you:
  - Query scene state — "what objects are in the scene? what modifiers are on the body?"
  - Execute Blender Python — "rename all vertex groups matching `Pectoralis*` to `pec_*`."
  - Run modifiers — "apply Decimate Collapse to the body, target 25,000 triangles."
  - Batch-export — "export the body as Draco-compressed glTF."
  - Diagnose errors — "the bake produced bad weights on the left lat; here's the data,
    suggest a fix."

What it does NOT replace:
  - **Sculpting decisions.** Picking how muscular the body looks, where edges should be
    soft, where the silhouette feels off — those are artistic calls. Claude can't paint.
  - **Vertex group manual cleanup.** The DataTransfer bake produces ~80% correct results;
    the seam cleanup is artistic muscle-by-muscle work. Claude can't see what looks wrong.

When to install it:
  - **After Stage 4** (Z-Anatomy import + alignment). Up to that point you're using
    MB-Lab's UI directly and not gaining much from automation.
  - **Especially useful at Stages 7, 8, 9** (vertex group renaming, decimation, export) —
    these are deterministic batch operations.

Install steps (high level — verify against current repo):
  1. Clone `github.com/ahujasid/blender-mcp` locally.
  2. Install the Blender add-on from the repo into Blender (Edit → Preferences → Add-ons → Install).
  3. Enable the add-on inside Blender; it starts an MCP server on a local port.
  4. Add the MCP server entry to Claude Code's `~/.claude/settings.json` (or the equivalent for your client).
  5. Restart Claude. The Blender server appears in the available MCP servers list.
  6. Open Blender first, then ask Claude in a chat session, "what's in the current Blender scene?" — confirms connection.

Cautions:
  - **Save before letting Claude run anything destructive.** Blender's undo stack does
    not always cover Python-driven operations cleanly.
  - **Read what Claude is about to run.** Blender Python is full-power; treat it like
    you would any other shell access.
  - **Version drift.** This is a community project; the API surface may change. Pin to
    a known-good version once it works for you.
  - **Not a substitute for Blender literacy.** The most efficient pattern is: you do
    the artistic work in Blender, Claude does the repetitive Python work. Don't try to
    use Claude to learn Blender by proxy — it's slower and more error-prone than just
    learning Blender.

  > **Plain English:** the MCP server is a remote control. It lets Claude do anything
  > you could do by typing Python into Blender's scripting tab. It does not let Claude
  > look at what's on screen and decide if your model looks good — that's still your
  > eyeball job.

  ALTERNATIVE if Blender MCP feels heavy: just use Blender's built-in Python console.
  Claude can write Python scripts for you to copy-paste. Same outcome, manual hop.
  Worth using as a fallback or for one-off scripts before committing to MCP setup.

---

6. STAGE-BY-STAGE BUILD GUIDE
-------------------------------

Stages numbered for reference, not as strict chronology. Stages 0–9 are asset
construction in Blender. Stages 10–13 are React integration in the workout-tracker-v2
codebase. Total estimated effort: **6–10 weeks of evening / weekend work** to v1.

  STAGE 0 — Cardboard cutout: full buildable spec (deepened session 54)
  ======================================================================
  Purpose: prove R3F + lazy-loading + Draco self-host + mobile perf + bundle
  splitting all work end-to-end inside workout-tracker-v2 BEFORE committing 30+
  hours to the MB-Lab + Z-Anatomy asset pipeline. Throwaway feature branch.
  Executable in one evening.

  > **Plain English:** before you spend 30 hours building the perfect model, spend
  > 4 hours proving the 3D engine even runs on your phone *inside this app*. Use
  > the ugliest 3D body you can find. If everything works, you've learned the path
  > is clear. If something is broken, you've learned it before wasting the
  > model-building hours.

  0.1 — BRANCH CREATION
  -----------------------
  ```bash
  git checkout main
  git pull
  git checkout -b experiment/avatar-cardboard-cutout
  ```
  Work happens entirely on this branch. Deleted when Stage 0 closes regardless
  of outcome — never merge to main.

  0.2 — INSTALL PACKAGES
  ------------------------
  ```bash
  npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
  npm i -D @types/three
  ```
  Note: Stage 0 doesn't yet *use* @react-three/postprocessing — no bloom in the
  cardboard cutout. Install it anyway so the bundle test reflects production weight.

  0.3 — ACQUIRE A CC0 MUSCULAR BODY
  -----------------------------------
  Goal: free, .glb format, looks like a human body. Quality does NOT matter.

  **Path A — Sketchfab** (recommended):
    1. sketchfab.com — sign in (free)
    2. Search filter: License = "CC0 Public Domain"
    3. Search "anatomical male body" or "muscular man base mesh"
    4. Pick one with poly count under 50k (shown in model details)
    5. Download as glTF; extract the `.glb` from the zip

  **Path B — Rodin (Hyper3D)** text-to-3D, faster but needs sign-up:
    1. hyper3d.ai — sign up for free tier
    2. Prompt: "muscular male anatomical reference body, T-pose, full body, low poly"
    3. Generate → refine → download as `.glb`

  0.4 — PLACE THE ASSET
  -----------------------
  Put the downloaded file at:
  ```
  public/models/cardboard.glb
  ```
  Vite serves `public/*` at root → runtime path is `/models/cardboard.glb`.

  0.5 — SELF-HOST DRACO DECODER (per S2-Q2 lock)
  ------------------------------------------------
  ```bash
  mkdir -p public/draco
  cp node_modules/three/examples/jsm/libs/draco/* public/draco/
  ```
  After this, `public/draco/` contains the decoder files. Even if your cardboard
  glb isn't Draco-compressed, install this now so production migration is zero-step.

  0.6 — CREATE THE AVATAR PAGE
  ------------------------------
  Create folder: `src/pages/AvatarPage/`

  **`src/pages/AvatarPage/index.tsx`** — copy-paste ready:

  ```tsx
  /**
   * AvatarPage — Stage 0 cardboard cutout (THROWAWAY).
   * Smoke test for R3F + lazy-loading + Draco self-host + mobile perf inside
   * workout-tracker-v2. Lives on experiment/avatar-cardboard-cutout branch only.
   * Replaced by the real anatomy avatar at Stage 10.
   *
   * Pass criteria: see artifacts/UI/3d-model/pipeline.md § Stage 0.11.
   *
   * DELETE THIS FILE before merging the branch. (Branch should never merge.)
   */

  import { Suspense, useState } from 'react';
  import { Canvas, type ThreeEvent } from '@react-three/fiber';
  import { OrbitControls, useGLTF, AdaptiveDpr, Stats } from '@react-three/drei';
  import * as THREE from 'three';
  import styles from './AvatarPage.module.css';

  useGLTF.setDecoderPath('/draco/');
  useGLTF.preload('/models/cardboard.glb');

  function CardboardBody({ onTap }: { onTap: (name: string) => void }) {
    const { scene } = useGLTF('/models/cardboard.glb');

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (e.object instanceof THREE.Mesh) {
        const mat = e.object.material as THREE.MeshStandardMaterial;
        mat.color.set('#E05555'); // proves per-mesh recoloring works
        onTap(e.object.name || '(unnamed)');
      }
    };

    return <primitive object={scene} onClick={handleClick} />;
  }

  export default function AvatarPage() {
    const [lastTapped, setLastTapped] = useState<string>('');

    return (
      <div className={styles.page}>
        <div className={styles.canvasWrap}>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance' }}
            camera={{ position: [0, 1, 3], fov: 50 }}
          >
            <color attach="background" args={['#1A1A17']} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <Suspense fallback={null}>
              <CardboardBody onTap={setLastTapped} />
            </Suspense>
            <OrbitControls
              enableDamping
              enableZoom={false}
              enablePan={false}
            />
            <AdaptiveDpr pixelated />
            {import.meta.env.DEV && <Stats />}
          </Canvas>
        </div>
        <div className={styles.info}>
          <p>Cardboard cutout — Stage 0 smoke test</p>
          {lastTapped && <p>Tapped: {lastTapped}</p>}
        </div>
      </div>
    );
  }
  ```

  **`src/pages/AvatarPage/AvatarPage.module.css`** — copy-paste ready:

  ```css
  .page {
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - var(--nav-height));
    background: var(--color-bg);
  }

  .canvasWrap {
    flex: 1;
    width: 100%;
    position: relative;
    min-height: 60dvh;
  }

  .info {
    padding: 16px;
    color: var(--color-text-label);
    font-size: 13px;
    background: var(--color-surface-1);
    border-top: 1px solid var(--color-border);
  }
  ```

  0.7 — WIRE THE ROUTE IN App.tsx
  ---------------------------------
  Edit `src/App.tsx` — three changes:

  ```diff
  - import { useEffect } from 'react';
  + import { useEffect, lazy, Suspense } from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    // ... existing imports unchanged ...
    import StatisticsPage from './pages/StatisticsPage';
  + const AvatarPage = lazy(() => import('./pages/AvatarPage'));
  ```

  ```diff
                <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
  +             <Route
  +               path="/avatar"
  +               element={
  +                 <AuthGuard>
  +                   <Suspense fallback={null}>
  +                     <AvatarPage />
  +                   </Suspense>
  +                 </AuthGuard>
  +               }
  +             />

                <Route path="*" element={<Navigate to="/login" replace />} />
  ```

  Do NOT add a 5th tab to `BottomNav` — locked design contract is 4 tabs only.
  Reach `/avatar` by typing the URL during dev.

  0.8 — RUN THE DEV SERVER
  --------------------------
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173/avatar` (after sign-in, since route is behind AuthGuard).
  Expected: a 3D body, rotates with mouse drag, tapping a part turns it red,
  bottom info panel shows the mesh name.

  0.9 — TEST ON PHONE
  ---------------------
  Vite prints a Network address on dev start:
  ```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ```
  If you don't see Network, run with `--host`:
  ```bash
  npm run dev -- --host
  ```

  On phone (must be on same Wi-Fi):
    1. Open the Network address in mobile browser
    2. Sign in with the same account, navigate to `/avatar`
    3. Touch the model and drag — should rotate
    4. Tap a body part — should turn red
    5. Two-finger pinch — should NOT zoom (we disabled zoom)

  **Battery / FPS check (Android Chrome):**
    1. Dev machine: Chrome → `chrome://inspect` → Devices
    2. Connect phone via USB; "Allow USB debugging" on phone
    3. Inspect the avatar page → Performance tab → record 5s
    4. Confirm avg FPS ≥ 30
    5. Memory tab: confirm <100MB heap during interaction

  iOS Safari: Web Inspector via Mac Safari (different setup; defer if no Mac).

  0.10 — VERIFY BUNDLE SPLITTING
  -------------------------------
  ```bash
  npm run build
  ```
  In `dist/assets/`, expect TWO main JS chunks:
    - One containing your existing app code (Logs, Programs, Stats, Profile)
    - A SEPARATE chunk containing three, R3F, Drei, postprocessing (~280–320KB gzipped)

  Run `npm run preview`, open `http://localhost:4173`, DevTools → Network tab:
    - Visit `/logs` first: should NOT load three.js chunks
    - Visit `/avatar`: NOW the three.js chunks load

  If three.js loads on /logs, lazy-loading failed → see 0.12.

  Optional but useful: install rollup-plugin-visualizer (already in Stage 10
  recommended dev deps) and add to `vite.config.ts`. Re-run build to see a
  visual map of every chunk.

  0.11 — SMOKE TEST PASS CRITERIA (LOCK ALL OR FIX)
  ---------------------------------------------------
  | # | Criterion | Pass? |
  |---|---|---|
  | 1 | Page renders without console errors on dev machine | [ ] |
  | 2 | Page renders without console errors on test phone | [ ] |
  | 3 | Mouse drag rotates the model (desktop) | [ ] |
  | 4 | Touch drag rotates the model (phone) | [ ] |
  | 5 | Tap a mesh turns it red, name appears in info panel | [ ] |
  | 6 | Frame rate ≥ 30fps on test phone (Chrome DevTools Performance) | [ ] |
  | 7 | Logs / Programs / Statistics / Profile pages still work (regression) | [ ] |
  | 8 | Bundle inspector confirms three.js is in its own chunk | [ ] |
  | 9 | Three.js chunks only load on /avatar route, not on /logs | [ ] |
  | 10 | BottomNav and WorkoutFAB unaffected on /avatar | [ ] |

  If ANY criterion fails: see 0.12. **Do not advance to Stage 1.**

  0.12 — WHAT TO DO IF IT FAILS
  -------------------------------

  | Symptom | Likely cause | Fix |
  |---|---|---|
  | `Cannot find module '@react-three/fiber'` | npm cache issue | `rm -rf node_modules package-lock.json && npm i` |
  | Black canvas, no model | glb not at expected path | Verify `/public/models/cardboard.glb`; leading slash in code |
  | `THREE.Loader: failed to fetch /draco/...` | Decoder files missing | Re-run `cp node_modules/three/examples/jsm/libs/draco/* public/draco/` |
  | WebGL context lost on phone | GPU couldn't allocate | Reduce `dpr` to `[1, 1]`; pick smaller glb |
  | Touch rotates but won't stop after release | Damping not engaged | Verify `enableDamping` prop on OrbitControls |
  | Bundle size on /logs increased | Eager `from 'three'` import somewhere else | Search codebase: `grep -r "from 'three'" src/` — should only appear in AvatarPage |
  | Three.js doesn't split into separate chunk | Module crosses lazy boundary | Verify no module imports both AvatarPage AND a main-app module |
  | FPS <30 even on simple model | Mid-range Android GPU struggling | Reduce `dpr` to `[1, 1]`; remove `<Stats>` overlay; close other apps |
  | `<Stats>` from Drei doesn't render | Drei version mismatch | Fall back to `import Stats from 'three/examples/jsm/libs/stats.module'` |
  | iOS Safari blank canvas | WebGL2 quirk | Try `gl={{ webgl2: false }}` to force WebGL1 |
  | iOS taps hit wrong mesh | DPR + canvas size mismatch | Force `key={windowSize}` remount on `orientationchange` |

  0.13 — CLEANUP
  ----------------
  Whether smoke test passed or failed:
  ```bash
  git checkout main
  git branch -D experiment/avatar-cardboard-cutout
  ```

  **If smoke test PASSED:**
    - Update Stage 0 in this doc: "Verified [date], target phone [model], avg FPS [N]"
    - Stage 1 (MB-Lab body authoring) is now safe to start
    - The cardboard glb stays in your local Downloads; `public/models/cardboard.glb`
      is gone with the branch deletion

  **If smoke test FAILED:**
    - Document the failure mode in this doc § 9 (Open questions)
    - Re-evaluate before Stage 1: is a fallback path needed? (vanilla Three.js,
      Spline, Lottie 2D animation, static SVG with CSS effects)
    - The whole MB-Lab + Z-Anatomy investment should NOT begin until the
      integration risk is retired

  0.14 — AI TOOLS FOR STAGE 0
  -----------------------------
  | Task | Best tool | Why |
  |---|---|---|
  | Generate Rodin prompt for muscular body | Claude or GPT-4o | Either fluent at prompt engineering for image/3D models |
  | Debug WebGL errors during smoke test | Claude or GPT-4o (paste error) | Both fluent in WebGL debugging |
  | If Sketchfab CC0 search returns nothing useful | **Rodin (Hyper3D)** free tier | Faster than searching all of CC-BY |
  | Generate Stats.js fallback code if Drei `<Stats>` breaks | Claude | One-line fix; trivial |

  0.15 — TIME BUDGET FOR STAGE 0
  --------------------------------
  Realistic evening sprint:
    - 0.1–0.2 (branch + install): ~15 min
    - 0.3 (find glb): ~30 min (Sketchfab search) or ~10 min (Rodin)
    - 0.4–0.5 (place asset + Draco): ~10 min
    - 0.6 (write component): ~10 min (copy-paste from this doc)
    - 0.7 (route wiring): ~5 min
    - 0.8 (dev server smoke): ~10 min
    - 0.9 (phone testing): ~30 min
    - 0.10 (bundle verify): ~15 min
    - 0.11 (run pass criteria): ~15 min
    - 0.13 (cleanup): ~5 min
    - **Total: ~2.5 hours if everything works**
    - **Add ~2 hours of buffer** for first-time WebGL debugging if criterion fails

  Cap the session: if Stage 0 isn't passing after 5 hours, stop and write up the
  failure mode. The integration risk being un-retirable is itself a finding —
  pivot to a 2D fallback path before sinking 30 hours into the asset pipeline.

  STAGE 1 — Generate the MB-Lab body (~1–2 hours)
  -------------------------------------------------
  What you do:
    1. Open Blender. Enable the MB-Lab add-on (Edit → Preferences → Add-ons → search "MB-Lab").
    2. Press N to open the side panel. MB-Lab tab appears.
    3. Choose "Caucasian Male" or whichever base. Click "Init Character."
    4. Adjust sliders: muscle definition high, body fat low, age ~25–30. Tune until
       the body silhouette feels right. Reference your `zane-ideal.jpg` file as a
       proportion guide — but don't try to nail Zane perfectly. v1 is "generic muscular."
    5. Click "Finalize Character" — this commits the shape. Past this point sliders
       are gone; the mesh is now a static asset.

  Deliverable: a single mesh, ~25k triangles, named `humanoid` or similar. Save the
  `.blend` file.

  Cautions:
    - **Don't finalize too early.** Finalize is destructive — sliders disappear. If you
      think you might want a different body type later, save a "pre-finalize" `.blend`
      backup first.
    - **Don't apply the MB-Lab armature yet.** Skeletal animation is a future-stage
      concern; you're not posing animations now.
    - **Body fat 0 is a trap** — looks like a flayed corpse. Aim for 5–10% body fat
      slider value for the "lean and defined" Zane vibe.

  > **Plain English:** MB-Lab is a character creator. Use it like a video game one —
  > slide muscle high, fat low, until it looks roughly like a fitness model. Save your
  > work before you "finalize" because finalize is permanent.

  STAGE 2 — Generate Zane / pose reference image (optional, ~30 min)
  -------------------------------------------------------------------
  Purpose: a visual reference photo for the pose you'll move the body into.

  What you do:
    - Use Midjourney v6+, DALL-E 3 (via ChatGPT), or skip if you already have
      `zane-ideal.jpg`.
    - Sample prompt: "anatomical reference photo, male bodybuilder Frank Zane, classical
      proportions, front view, A-stance, neutral studio lighting, no oil, dry condition,
      8K, photorealistic"
    - Save the image to `artifacts/UI/3d-model/refs/` as `zane-pose-ref.jpg`.

  Deliverable: 1 reference image you'll use to eyeball pose accuracy in Blender.

  Cautions:
    - This step is OPTIONAL. The existing `anatomy/refs/zane-ideal.jpg` is enough.
    - AI-generated images are reference, not ground truth — they sometimes invent
      anatomy. Cross-check against real reference photos.

  STAGE 3 — Pose the body (Mixamo or hand-pose) (~1–2 hours)
  ------------------------------------------------------------
  Purpose: get the body into the locked pose (front-facing, slight knee turnout, arms
  ~30° from torso, faceless head).

  Two approaches:
    Approach A (recommended) — Mixamo retarget:
      1. Export the MB-Lab body as `.fbx`.
      2. Upload to mixamo.com, click "Auto-Rig" — Mixamo places skeletal markers
         automatically.
      3. Pick a "T-Pose" or "A-Pose" animation. Download the rigged FBX.
      4. Re-import into Blender. Your body now has bones and is in the chosen pose.

    Approach B — hand-pose in Blender:
      1. Use MB-Lab's existing armature.
      2. Pose mode. Rotate bones to match the locked pose. Slow but precise.

  Deliverable: posed body, saved as a new `.blend` snapshot.

  Cautions:
    - **Mixamo's auto-rig sometimes mis-places shoulder joints.** Verify the shoulder
      rotation looks right before committing.
    - **The locked pose has knees turned out.** Standard A-pose has knees forward; you'll
      need to adjust thigh rotation by hand even after Mixamo retarget.

  STAGE 4 — Import Z-Anatomy as stencil; align it (~1 hour)
  -----------------------------------------------------------
  What you do:
    1. Open the Z-Anatomy `.blend` you downloaded.
    2. Append the muscle group meshes you care about into your working `.blend` file
       (File → Append → pick the .blend → select muscles).
    3. Z-Anatomy bodies are anatomically scaled (~1.7m tall). MB-Lab bodies often
       different. Scale Z-Anatomy meshes to match your MB-Lab body.
    4. Position the Z-Anatomy muscles to overlap with their MB-Lab counterparts.
       Move pec mesh until it sits inside the MB-Lab pec area, etc.

  Deliverable: a `.blend` file with two overlapping bodies — your MB-Lab one, and the
  Z-Anatomy stencil floating roughly in the same space.

  Cautions:
    - **Z-Anatomy is HUGE.** Importing all 4,000 meshes will lock your computer.
      Append ONLY the muscles you need (per CE1 taxonomy). Roughly 30–40 muscles.
    - **Hide Z-Anatomy meshes after alignment** — they're a stencil, not a final asset.
      Move them to a separate Collection ("Stencils") with visibility toggled off in the
      final scene.

  > **Plain English:** Z-Anatomy is a folder of pre-cut paper shapes for every muscle.
  > You're going to lay it on top of your MB-Lab body so Blender can copy where each
  > shape goes. After Blender copies, you put the paper shapes away.

  STAGE 5 — DataTransfer bake of muscle vertex groups (~30 min)
  --------------------------------------------------------------
  THE KEY STEP. This is the time-saver that took my estimate from 30+ hours to ~12.

  What you do:
    1. Select your MB-Lab body. Add a `DataTransfer` modifier.
    2. Source object: the Z-Anatomy stencil (set per muscle group, or use a script).
    3. Mode: Vertex Group(s) → Nearest Face Interpolated.
    4. Generate Data Layers: this creates one vertex group per Z-Anatomy muscle.
    5. Apply the modifier. Your MB-Lab body now has named vertex groups inherited
       from Z-Anatomy.

  Deliverable: MB-Lab body with ~30 named vertex groups, ~80% correct.

  Cautions:
    - **DataTransfer copies by proximity.** If two Z-Anatomy muscles overlap (they do,
      naturally — pec and serratus, for example), the bake assignment depends on which
      mesh is closer to each MB-Lab vertex. Boundary errors are guaranteed.
    - **Bake errors concentrate at muscle SEAMS.** The middle of the pec will be 100%
      correct. The edge where pec meets delt will need cleanup.
    - **Save BEFORE applying the modifier.** Once applied, you can't roll back without
      re-staging.

  STAGE 6 — Manual seam cleanup (~4–6 hours)
  --------------------------------------------
  The bottleneck. AI cannot help here in any meaningful way.

  What you do:
    1. Enter Weight Paint mode on your body.
    2. Switch through each muscle vertex group. Bake errors are visible as red/blue
       splotches near boundaries.
    3. Use the brush to fix obvious mis-assignments. Subtract from one group, add to
       the correct one.
    4. Repeat for each muscle group. ~30 muscles × ~10 min average = ~5 hours.

  Deliverable: clean, accurate vertex groups per muscle.

  Cautions:
    - **Mirror your work.** Most muscles are paired (left/right). Use Blender's
      Symmetry feature so you only paint one side and it mirrors.
    - **Don't chase perfection.** v1 only needs the muscle to look "mostly correct"
      when it lights up. A few stray vertices on a boundary are invisible at app
      resolution.
    - **Take breaks.** Weight paint is tedious. Mistakes compound when tired.

  STAGE 7 — Rename vertex groups to match CE1 taxonomy (~1 hour)
  ---------------------------------------------------------------
  CRITICAL FOR INTEGRATION. The avatar component reads vertex group names to know
  which mesh region maps to which muscle in your data layer.

  What you do:
    1. Open the CE1 muscle taxonomy in `src/db/muscleTaxonomy.ts` and `artifacts/exercises/exercise-bank.md`.
    2. For each vertex group from Z-Anatomy (latin: `Pectoralis_major_left`), rename
       to your codebase convention (camelCase: `pectoralisMajorLeft` or `pec_l`).
    3. Use Blender Python or Blender MCP server to batch this — manual rename is
       error-prone for 30 groups.

  Deliverable: vertex groups named identically to your code's muscle IDs.

  Cautions:
    - **Naming MUST match exactly.** A typo here means the avatar can't find the muscle
      to color. Decide a naming convention and stick to it.
    - **Document the mapping.** A 2-column table in `pipeline.md` or as a `.json`
      lookup in code: `latinName → codeId`. Single source of truth.

  STAGE 8 — Decimate to mobile poly count (~30 min)
  ---------------------------------------------------
  What you do:
    Option A (CLI — recommended, scriptable):
      `gltf-transform optimize input.glb output.glb --simplify 0.6 --texture-compress webp`
      Reduces by ~40%, converts textures to WebP.

    Option B (Blender):
      Add Decimate modifier (Collapse mode), ratio 0.4–0.6 depending on starting density.
      Apply.

  Deliverable: same body, ~25k–30k triangles, mobile-friendly.

  Cautions:
    - **Decimate AFTER vertex groups are correct.** Decimating earlier corrupts vertex
      group boundaries.
    - **Eyeball the result.** Aggressive decimation flattens muscle definition. You
      want the muscles still readable as bumps under the holographic skin.

  STAGE 9 — Draco-compressed glTF export (~15 min)
  --------------------------------------------------
  What you do:
    `gltf-transform draco input.glb output.glb`
    Or use Blender's glTF export with Draco enabled in the export options.

  Deliverable: a `.glb` file roughly 600KB–1.2MB. Ready for the React app.

  Cautions:
    - **Draco needs a decoder library at runtime.** R3F's `useGLTF` handles this, but
      verify the decoder is loaded (Drei does it by default). If you switch to vanilla
      Three.js, you must load `DRACOLoader` manually.
    - **Verify in glTF viewer first.** Use sandbox.babylonjs.com or
      gltf-viewer.donmccurdy.com to confirm the file opens correctly before integrating.

  STAGE 10 — R3F integration scaffold (deepened session 54)
  -----------------------------------------------------------
  Set up the React Three Fiber environment in workout-tracker-v2. End-to-end
  rotating avatar in ~25 lines of React, lazy-loaded so the rest of the app
  pays nothing for the 3D engine until the user visits the avatar.

  10.1 — PACKAGES TO INSTALL
  ----------------------------
  Run from the workout-tracker-v2 root:

  ```bash
  npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
  npm i -D @types/three leva rollup-plugin-visualizer
  ```

  | Package | Role | Gzipped (est.) |
  |---|---|---|
  | three | The 3D engine itself | ~155KB |
  | @react-three/fiber | React renderer for Three.js | ~50KB |
  | @react-three/drei | Helpers (`<OrbitControls>`, `<useGLTF>`, `<AdaptiveDpr>`, etc.) | ~30KB (only what you import) |
  | @react-three/postprocessing | `<EffectComposer>`, `<Bloom>`, `<ChromaticAberration>` | ~60KB |
  | leva (dev only) | Debug GUI for tuning shaders during development | excluded from prod build |

  Total runtime cost: ~295KB gzipped. Lazy-loaded behind the avatar route — not in the main app's first paint.

  > **Plain English:** four small libraries get added. They only download to the
  > user's phone when they open the avatar tab — not on app launch. App boot stays
  > exactly as fast as it is today for users who never visit the avatar.

  10.2 — SKELETON COMPONENT
  ---------------------------
  The minimum viable avatar — rotation, model loading, basic lighting — fits in
  one file:

  ```tsx
  // src/pages/AvatarPage.tsx
  import { Suspense } from 'react'
  import { Canvas } from '@react-three/fiber'
  import { OrbitControls, useGLTF, AdaptiveDpr } from '@react-three/drei'

  function Avatar() {
    const { scene } = useGLTF('/models/anatomy.glb')
    return <primitive object={scene} />
  }

  export default function AvatarPage() {
    return (
      <Canvas
        dpr={[1, 1.5]}                              // pixel ratio cap (perf)
        gl={{ powerPreference: 'high-performance' }}
        camera={{ position: [0, 1, 3], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
        <OrbitControls enableDamping />
        <AdaptiveDpr pixelated />                   {/* drops dpr when GPU struggles */}
      </Canvas>
    )
  }

  useGLTF.preload('/models/anatomy.glb')             // start fetching before mount
  ```

  This is the deliverable of Stage 0 (cardboard cutout). Real avatar replaces the
  primitive scene with a more structured component — see Stage 11 for that.

  10.3 — LOADING PATTERNS (DRACO, SUSPENSE, GLTFJSX)
  ----------------------------------------------------
  - **Draco decoder: SELF-HOST (locked default — S2-Q2 session 54).**
    `useGLTF` from Drei auto-detects Draco compression. By default Drei fetches
    the decoder from a CDN — for this app's offline-first context (Dexie, no
    backend, gym signal unreliable) that default is wrong. Self-host instead:
      1. Copy decoder files (`draco_decoder.js`, `draco_decoder.wasm`,
         `draco_wasm_wrapper.js`) from `node_modules/three/examples/jsm/libs/draco/`
         into `public/draco/`.
      2. At app boot (or once at the avatar route's first mount), call
         `useGLTF.setDecoderPath('/draco/')`.
      3. Verify in DevTools Network tab that the decoder loads from your origin,
         not a CDN.
    Cost: ~150KB added to the avatar route's lazy-loaded bundle (or to the PWA
    install if the service worker caches it). Trade-off: app works fully offline.

  - **`gltfjsx` (OPTIONAL, decide at integration time — S2-Q1 session 54).**
    Plain English: when the model exports as a `.glb` file, you can load it in
    React with one line — `useGLTF('/models/anatomy.glb')` — and it works. The
    catch is that you get a generic scene object and have to write code to find
    each muscle by name when you want to color or tap it. `gltfjsx` is a tool
    that runs once on the `.glb` and writes out a React component for you, where
    every muscle is already a named JSX element you can grab and tweak directly.
    It saves typing but adds a build step.
    Decide when reaching Stage 10:
      - **Use it** if the model has 20+ named meshes and you want type-safe
        access — `npx gltfjsx anatomy.glb -t` outputs a typed `<AnatomyModel/>`
        component.
      - **Skip it** if a single body mesh with `scene.traverse()` lookups feels
        cleaner; one less tool in the workflow.
    Not required for v1 either way.

  - **Suspense fallback should be the existing `EmptyState` component** —
    matches `component-standards.md` "no spinner; render empty state directly" rule.

  10.4 — PERFORMANCE LEVERS, RANKED BY IMPACT
  ---------------------------------------------
  Apply in order. Stop when frame rate hits target on your test phone.

  1. **`dpr={[1, 1.5]}` on Canvas** — caps pixel ratio. On a 3× retina iPhone,
     forces rendering at 1.5× instead of 3× — **75% fewer pixels.** Biggest mobile
     win, single line of code.
  2. **Lazy-load the route** — covered in 10.6 below. Keeps the engine bundle off
     the main app's first paint.
  3. **`<AdaptiveDpr pixelated />` from Drei** — auto-drops dpr further when frame
     rate falls below target. Free quality scaling.
  4. **Conditional postprocessing** — only mount `<EffectComposer>` if
     `<PerformanceMonitor>` reports stable 60fps. Bloom alone costs ~10ms/frame on
     mid-range Android.
  5. **`frameloop="demand"`** — only render on prop changes. Doesn't apply when
     avatar pulses continuously (Stage 12), but worth knowing for static scenes.

  Other perf tools (lower priority):
    - `<Detailed>` LOD component — switch to lower-poly version when far from camera
    - `<Bvh>` — bounding volume hierarchy for fast raycasting (improves tap-to-drill responsiveness on dense meshes)
    - Set `frustumCulled: true` on every mesh (default true; verify after gltfjsx)

  10.5 — MOBILE GOTCHAS
  -----------------------
  These will bite you. Plan for them.

  iOS Safari:
    - **`powerPreference: 'high-performance'` is sometimes ignored.** Don't rely on it
      as the only perf strategy. Test on a real iPhone.
    - **Tab kills wipe `useGLTF` cache.** iOS aggressively background-evicts; on
      return to the avatar route, glb may re-fetch even if it didn't on Android.
      Acceptable at 1MB; would be painful at 5MB.
    - **Touch behavior subtly different from Android.** OrbitControls' damping feels
      different. Tune `dampingFactor` (default 0.05) per platform if needed.

  Android:
    - **Wide GPU variance.** Pixel 6a (Tensor G1) is "median 2024 phone." Test there;
      flagships hide problems mid-range users will hit.

  Both:
    - **Battery drain at 60fps continuous.** ~5–10% per minute. Pause the `useFrame`
      loop when avatar isn't visible — use `IntersectionObserver` or React Router's
      `useLocation` to detect off-route.
    - **Screen rotation.** Canvas doesn't always auto-resize. Force remount on
      `window.orientationchange` or use Drei's `<ScreenSizer>`.
    - **`prefers-reduced-motion` accessibility.** Disable pulse and scanline
      animations when the user has reduced motion enabled. Read via
      `window.matchMedia('(prefers-reduced-motion: reduce)')`.

  > **Plain English:** mobile 3D is fine if you follow three rules — don't render
  > at retina resolution, pause animation when off-screen, and test on a real
  > iPhone (not just your dev machine). Skipping any of these turns the feature
  > into a complaint magnet.

  10.6 — LAZY-LOADING WITH REACT ROUTER v7 (THIS APP'S STACK)
  -------------------------------------------------------------
  Non-negotiable for keeping the main app bundle clean.

  ```tsx
  // src/router/routes.tsx (or wherever routes are defined)
  import { lazy, Suspense } from 'react'
  import { EmptyState } from '@/components/EmptyState'

  const AvatarPage = lazy(() => import('@/pages/AvatarPage'))

  export const avatarRoute = {
    path: '/avatar',
    element: (
      <Suspense fallback={<EmptyState message="Loading avatar..." />}>
        <AvatarPage />
      </Suspense>
    ),
  }
  ```

  Verify after build with `npm run build` — you should see a separate chunk
  containing `three`, `@react-three/fiber`, `drei`, etc., not bundled into
  the main `index-[hash].js`. Use `rollup-plugin-visualizer` to confirm:

  ```ts
  // vite.config.ts
  import { visualizer } from 'rollup-plugin-visualizer'
  // ...plugins: [react(), visualizer({ open: true })]
  ```

  Run `npm run build` → opens an HTML chart of every chunk. Avatar chunk should
  be its own ~300KB blob, separate from main app code.

  10.7 — MEMORY MANAGEMENT
  --------------------------
  - **`useGLTF` caches geometry/textures globally.** Navigate away and back =
    instant remount. This is the right default for a feature visited often.
  - **No manual `dispose()` needed in most cases.** Drei manages it.
  - **Exception: very large scenes or memory-pressured devices.** Manually call
    `scene.traverse(obj => { obj.geometry?.dispose(); obj.material?.dispose() })`
    on component unmount. Most apps don't bother — caching is the right default.
  - **Watch for memory leaks in `useFrame`.** Don't allocate inside the loop —
    declare `Vector3`, `Color`, etc. outside and reuse. Allocation in a 60fps
    loop = aggressive GC = jank.

  10.8 — TESTING APPROACH
  -------------------------
  Honest assessment: 3D code is hard to unit-test. The right strategy is
  asymmetric:
    - **Test the data layer aggressively.** `MuscleFatigueService` (see Stage 12)
      gets full Vitest coverage like every other service in the app.
    - **Treat 3D as visual-only.** Manual smoke test on test phone after every
      significant change. No automated visual regression for v1.
    - **`@react-three/test-renderer` exists** (renders to a virtual scene
      graph) but it's rarely used in real projects. Skip for v1.
    - **The codebase already has 130 Vitest tests** across 11 files. Don't
      contaminate that suite with flaky 3D tests; keep visual-only outside CI.

  10.9 — AI TOOLS FOR THIS STAGE
  --------------------------------

  | Task | Best tool | Why |
  |---|---|---|
  | Generate typed React component from .glb | **`gltfjsx` CLI** (Don McCurdy / pmndrs) | `npx gltfjsx anatomy.glb -t` outputs typed component with refs to every mesh. Saves ~2h of manual traversal |
  | Multi-file integration refactors | **Cursor with Sonnet 4.6** | Better at coherent edits across 4–5 files than single-file editing patterns |
  | Shader compile error debugging | **Claude or GPT-4o** | Both fluent in GLSL. GPT-4o has a slight edge on obscure WebGL errors |
  | 2D UI scaffolding (avatar route's surrounding chrome) | **v0.dev** (Vercel) | If you need a side panel for "tap muscle to drill in," v0 is fast for the React UI. Not for the 3D itself |
  | R3F community help | **pmndrs Discord** (discord.gg/poimandres) | Most active R3F community. Linked from docs.pmnd.rs |

  10.10 — CAUTIONS FOR STAGE 10
  -------------------------------
  - **Verify lazy-load actually works.** After integration, run `npm run build` and
    check the visualizer. If three.js is in the main chunk, your lazy import didn't
    take. Most common cause: an eager import somewhere else in the codebase
    (e.g. an `import { Vector3 } from 'three'` in a non-lazy file).
  - **Don't import all of Drei.** `import { OrbitControls } from '@react-three/drei'`
    tree-shakes correctly; `import * as Drei from '@react-three/drei'` does not.
  - **Don't let leva ship to production.** Wrap leva controls in a
    `import.meta.env.DEV` check, or strip via Vite plugin.
  - **glb path matters.** Place under `public/models/anatomy.glb`. Vite serves
    `public/` at the root; reference as `/models/anatomy.glb` (leading slash).
  - **Double-check the glb actually loads** in a glTF viewer
    (`gltf-viewer.donmccurdy.com`) before integrating. Saves debugging time.

  STAGE 11 — Tron / Prometheus shader stack (deepened session 54 — cheapest-first)
  ---------------------------------------------------------------------------------
  Six additive layers. Each one is independently shippable. You can ship the
  avatar at Layer 2 and call it done; or stack to Layer 4 for the "alive" feel;
  or all the way to Layer 6 for the full polish run. Layer 5 is the only
  non-optional one beyond the basics — it's what makes the fatigue feature actually
  work, not pure decoration.

  > **Plain English:** five visual treatments stacked in order from cheapest to
  > most expensive. Build them one at a time. The avatar already looks like a
  > hologram by Layer 2. Layers 3 and 4 are taste; Layer 5 is what makes the
  > fatigue feature actually work; Layer 6 is showroom polish.

  11.0 — THE LAYER MAP
  ----------------------

  | Layer | What it adds | Mobile cost | When to add | Required? |
  |---|---|---|---|---|
  | 1 | Glowing colored body + neon edge outline + black background | Cheap | First sit at Stage 11 | Yes |
  | 2 | Bloom postprocessing (the actual "glow") | ~10ms/frame | Immediately after Layer 1 | Yes — without bloom, edges look flat |
  | 3 | Translucent body — see-through skin | Moderate | Once 1+2 stable | No — looks great, not required |
  | 4 | Scanline sweep animation | Cheap (custom shader) | After translucency settles | No — but adds the "alive" feel you described |
  | 5 | Per-muscle emissive (fatigue → green/orange/red) | Cheap | Required for fatigue feature | YES — functional |
  | 6 | Particle fibers traveling origin → insertion | Heavy | Stage 13 polish | No — defer |

  11.1 — LAYER 1: BASE HOLOGRAM (NO CUSTOM GLSL)
  ------------------------------------------------
  Zero custom shaders. Built entirely from Drei + Three.js stock parts. ~15 lines.

  ```tsx
  <color attach="background" args={['#000']} />
  <ambientLight intensity={0.2} />

  <mesh>
    <primitive object={anatomyGeometry} />
    <meshStandardMaterial
      color="#000"
      emissive="#3BAF6A"        // app green — leaf-green accent
      emissiveIntensity={0.6}
      transparent
      opacity={0.4}
    />
    <Edges color="#3BAF6A" threshold={15} />   {/* Drei helper for neon outline */}
  </mesh>
  ```

  This already reads as a holographic figure. Caveat: without bloom (Layer 2)
  the emissive color is flat — looks more like "green plastic" than "glowing."
  Always add Layer 2 immediately; Layer 1 alone is intermediate, not shippable.

  11.2 — LAYER 2: BLOOM (THE GLOW)
  ----------------------------------
  Three lines. Single biggest visual upgrade per dollar of mobile cost in the
  whole pipeline.

  ```tsx
  import { EffectComposer, Bloom } from '@react-three/postprocessing'

  <EffectComposer>
    <Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur />
  </EffectComposer>
  ```

  Test on a real phone IMMEDIATELY after enabling. Bloom is the layer most likely
  to tank mobile frame rate. If frame rate drops below 30fps:
    - Reduce `intensity` (0.8 → 0.5)
    - Increase `luminanceThreshold` (0.2 → 0.4) — fewer pixels qualify for bloom
    - Drop `mipmapBlur` if still struggling
    - As last resort: gate `<EffectComposer>` behind `<PerformanceMonitor>` so
      it disables on low-end devices

  11.3 — LAYER 3: TRANSLUCENCY UPGRADE
  --------------------------------------
  Once Layer 1+2 feel good, this is the upgrade that pushes the look from
  "holographic" toward "Cortana / Dr. Manhattan glass figure." Two implementations,
  cheapest first:

  ```tsx
  // Option A — already in Layer 1: simple opacity (cheap)
  <meshStandardMaterial transparent opacity={0.4} ... />

  // Option B — richer: real refraction via MeshTransmissionMaterial (Drei)
  import { MeshTransmissionMaterial } from '@react-three/drei'
  <MeshTransmissionMaterial
    transmission={1}        // fully transmissive
    thickness={0.3}
    ior={1.4}               // index of refraction (1.4 ≈ water/glass)
    chromaticAberration={0.1}
  />
  ```

  Option B does real refraction (light bending as it passes through the body).
  Significantly more expensive — test on phone before committing. Option A may
  be enough; keep B as the upgrade option.

  11.4 — LAYER 4: SCANLINE SWEEP ("ALIVE" OUTLINES)
  ---------------------------------------------------
  Where custom GLSL enters — but only ~30 lines, not a major undertaking.

  Pattern:
  ```glsl
  // Fragment shader excerpt
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // ... base color logic ...
    float scanline = step(mod(vUv.y * 40.0 + uTime * 0.5, 1.0), 0.5);
    gl_FragColor.rgb += vec3(0.0, 0.4, 0.0) * scanline;
  }
  ```

  Wire to time via `useFrame` in R3F:
  ```tsx
  const matRef = useRef()
  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt
  })
  ```

  No-GLSL alternative: Drei's `<MeshDistortMaterial>` animates surface wobble that
  reads as "alive" without writing shader code. Less Tron, more flowing —
  closer to Cortana hair than Tron grid. Worth A/B testing.

  11.5 — LAYER 5: PER-MUSCLE EMISSIVE (THE FATIGUE FEATURE)
  -----------------------------------------------------------
  This is data-driven, not pure aesthetic. Each muscle is its own mesh — that
  separation comes from Stage 7's vertex group naming convention. The avatar
  component traverses the loaded scene and assigns each muscle a unique material
  whose emissive color is bound to fatigue state.

  ```tsx
  import { useFrame } from '@react-three/fiber'
  import * as THREE from 'three'

  const GREEN = new THREE.Color('#3BAF6A')   // recovered
  const ORANGE = new THREE.Color('#E08550')  // fatigued
  const RED = new THREE.Color('#E05555')     // exhausted

  function FatigueAvatar({ scene }) {
    const fatigueByMuscle = useFatigueData()  // from MuscleFatigueService

    useFrame(() => {
      Object.entries(fatigueByMuscle).forEach(([muscleId, fatigue]) => {
        const mesh = scene.getObjectByName(muscleId)
        if (!mesh) return
        // fatigue: 0 = recovered, 1 = exhausted
        const t = fatigue
        mesh.material.emissive.lerpColors(
          t < 0.5 ? GREEN : ORANGE,
          t < 0.5 ? ORANGE : RED,
          t < 0.5 ? t * 2 : (t - 0.5) * 2
        )
      })
    })

    return <primitive object={scene} />
  }
  ```

  This is the bridge between the asset pipeline and the app. Stage 7's naming
  convention (vertex groups named to match CE1 muscle taxonomy) pays off here —
  `scene.getObjectByName('pectoralisMajorLeft')` only works if the export carried
  that name through.

  > **Plain English:** the body is broken into ~30 separately-named muscle pieces.
  > Every animation frame, the avatar checks the user's fatigue data and gradient-
  > shifts each piece between green (rested) and red (exhausted) based on its
  > recovery score. The mapping from muscle name to fatigue score is the bridge
  > between the 3D model and the rest of the app.

  11.6 — LAYER 6: PARTICLE FIBERS (DEFERRED TO STAGE 13)
  --------------------------------------------------------
  Particles traveling along muscle fibers — origin to insertion — gives the
  "biology in motion" feeling described in the original anatomy notes. Built
  with Drei's `<Trail>` or custom `<Points>` along curve geometry.

  Deferred. This is Stage 13 polish, not v1. Cost is high enough that it should
  only land after every other layer is locked.

  11.7 — AI TOOLS FOR SHADER WORK
  ---------------------------------

  | Task | Best tool | Why |
  |---|---|---|
  | Generate scanline / fresnel / glitch GLSL from a screenshot reference | **GPT-4o** (paste image) | Multimodal image-to-GLSL is its strength; Claude matches but slower without image input |
  | Iterate on Fresnel / rim / glow GLSL | Claude or GPT-4o | Both fluent in GLSL. Iterate by pasting compile errors |
  | Borrow proven shaders | **Shadertoy** (shadertoy.com) | Search "hologram", "scanline", "fresnel"; most are MIT-equivalent |
  | Watch a holographic shader built end-to-end | **Bruno Simon's Three.js Journey, Ch. 28** | Paid course (~$95 lifetime), holographic shader lesson is exactly this aesthetic |
  | Free deep-dive blog reference | **Maxime Heckel's blog** (blog.maximeheckel.com) | Excellent free R3F + shader tutorials |
  | Visual shader debugging in browser | **Three.js's `THREE.MeshNormalMaterial`** | Quick way to visualize geometry before tuning shader colors |

  11.8 — CAUTIONS FOR STAGE 11
  ------------------------------
  - **Don't tune shaders before the real asset lands.** Layer 1+2 on the cardboard
    cutout (Stage 0) gives you a directional check on the look. Real shader
    tuning happens AFTER the MB-Lab body export (Stage 9 done).
  - **Test bloom on a real phone immediately.** Bloom is the most likely layer
    to tank mobile frame rate. Verify the moment you turn it on; don't wait until
    4 layers deep to discover it doesn't run.
  - **Honor `prefers-reduced-motion`.** Disable scanline (Layer 4) and pulse
    (Stage 12) when the user has reduced motion enabled. Read via
    `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - **Don't custom-shader Layer 1.** It's tempting to start with custom GLSL.
    Drei + Three.js stock parts get you 80% of the look at 5% of the effort.
    Custom GLSL only pays off at Layer 4 and above.
  - **Each layer is a commit.** Ship Layer 1 in one commit, Layer 2 in another,
    etc. Avoids a "I added 4 layers and now it's broken" debug session.

  STAGE 12 — Functional features wiring (deepened session 54 — all 6 features)
  ------------------------------------------------------------------------------
  Connect the visual avatar to the app's data and interaction surface. Six
  features, ranked by v1 priority: tap-to-drill, 360° rotate, fatigue color
  decay, pulse, multi-pose (deferred to v2), body variants (deferred to v2).

  12.1 — TAP-TO-DRILL (RAYCASTING + SIDE PANEL)
  -----------------------------------------------
  R3F raycasting is automatic — every mesh with an `onClick` handler becomes
  hit-testable. Stage 7's vertex group naming pays off here: meshes are named
  `pectoralisMajorLeft` etc., and the click handler reads `e.object.name` to
  identify which muscle.

  ```tsx
  <mesh
    name="pectoralisMajorLeft"
    onClick={(e) => {
      e.stopPropagation()  // prevent canvas-wide bubble
      setSelectedMuscle(e.object.name)
    }}
  >
  ```

  Acceleration for dense meshes: wrap the scene in Drei's `<Bvh>` to build a
  bounding volume hierarchy. ~10× faster raycasts on a 30k-tri body. Worth it.

  Side panel — what to show on tap:
    - Muscle name (English + Latin reference)
    - Last trained ("3 days ago")
    - Recovery percentage (0–100%)
    - Sets / volume this week
    - Quick link: "View exercises that train this"
    - Quick link: "View workout history for this muscle"

  Panel placement: **slide-up bottom sheet**. The 480px width constraint rules
  out side-drawer; modal overlay is too heavy for glance-info. Bottom sheet is
  also already in the app's pattern vocabulary (modals, "Save to program?",
  etc.) — this is just a non-destructive variant.

  > **Plain English:** tap a muscle → a sheet slides up from the bottom showing
  > recent training + quick links to drill in. Tap outside or swipe down to dismiss.

  12.2 — 360° ROTATION BEHAVIOR
  -------------------------------
  Drei's `<OrbitControls>` handles touch/mouse rotation. Decisions to lock at
  build time:

  ```tsx
  <OrbitControls
    enableDamping
    dampingFactor={0.05}                            // 0.05 = smooth, 0.2 = snappy
    enableZoom={false}                              // or true with min/maxDistance limits
    enablePan={false}                               // avatar always centered
    // FULL SPHERE (recommended for anatomy):
    minPolarAngle={Math.PI / 6}                     // can look down at top of shoulders
    maxPolarAngle={Math.PI - Math.PI / 6}           // can look up from below
    // Y-AXIS ONLY (alternative — simpler):
    // minPolarAngle={Math.PI / 2}
    // maxPolarAngle={Math.PI / 2}
    autoRotate={false}                              // optional idle-mode auto-rotate
  />
  ```

  Open decisions for build time:
    - **Full sphere vs Y-axis-only.** Anatomy benefits from full sphere (lats
      from below, quads from above). Lock at build time.
    - **Zoom on/off.** Off is safer; on with tight `minDistance/maxDistance`
      gives a "lean in" feel. Lock at build time.
    - **Idle auto-rotate.** 30s-after-last-interaction trigger that slowly spins
      the avatar — adds "demo hologram" vibe. Optional polish.

  Touch handling is built-in: single-finger drag = rotate, two-finger pinch =
  zoom (if enabled).

  12.3 — ANIMATED FATIGUE COLOR DECAY
  -------------------------------------
  Already covered visually in Stage 11.5 (Layer 5). The DATA-LAYER work belongs
  here.

  Recovery curve choice (lock at build time):
    a) **Linear** — `0h → 72h` smooth red-to-green. Predictable but biologically
       wrong (recovery isn't linear).
    b) **Ease-out** — fast early recovery, slow tail. Matches research:
       muscle protein synthesis peaks ~24h, baseline at ~48h; DOMS peaks
       ~24–48h, resolves ~72h.
    c) **Threshold buckets** — discrete: today=red, yesterday=orange,
       2–3d ago=yellow-green, 4d+=green. Less smooth, more readable on mobile.

  Recommended: ease-out (b). Computed in `MuscleFatigueService`, NOT in the
  avatar component. Separation of concerns:
    - **Physiology / formula** lives in the service.
    - **Rendering** lives in the avatar.

  ```ts
  // src/services/MuscleFatigueService.ts (TO BUILD)
  const FULL_RECOVERY_HOURS = 72  // calibrated default
                                  // see memory: "Stat weights calibration"

  function fatigueScore(
    hoursSinceTrained: number,
    volumeFactor: number
  ): number {
    const t = Math.min(hoursSinceTrained / FULL_RECOVERY_HOURS, 1)
    const eased = 1 - Math.pow(1 - t, 2)  // ease-out quadratic
    return Math.max(0, 1 - eased * volumeFactor)
    // returns: 0 = recovered, 1 = exhausted
  }

  export async function getFatigueByMuscle(
    userId: number
  ): Promise<Record<MuscleId, number>> {
    // 1. Read recent workoutLogs + logSets for userId
    // 2. Group sets by muscle (via CE1 taxonomy)
    // 3. For each muscle, compute hoursSinceTrained + volumeFactor
    // 4. Return { muscleId: fatigueScore } map
  }
  ```

  Avatar consumes:
  ```tsx
  const fatigue = useFatigueData()  // hooks into MuscleFatigueService
  useFrame(() => { /* lerp emissive per muscle from fatigue map */ })
  ```

  Build sequence:
    1. Build `MuscleFatigueService` with Vitest coverage like every other service.
    2. Build `useFatigueData()` hook that subscribes (re-fetch on workout finish).
    3. Avatar consumes the hook. Service swap-in/out is zero avatar code change.

  > **Plain English:** the muscle's color depends on a recovery score the service
  > computes from your logs — not a magic number in the avatar. The service decides
  > "this muscle is 60% recovered"; the avatar just shows what 60% looks like.

  12.4 — PULSE ON RECENTLY-TRAINED MUSCLES
  ------------------------------------------
  Sine-wave modulation of emissive intensity. Triggers when `hoursSinceTrained < 24`.

  ```tsx
  useFrame(({ clock }) => {
    Object.values(meshes).forEach(mesh => {
      if (!mesh.userData.trainedRecently) return
      const t = clock.elapsedTime
      mesh.material.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.3
    })
  })
  ```

  Parameters to tune at build time:
    - **Frequency** — `t * 2` = ~1 cycle per 3s (slow, heartbeat-ish). Fast = strobe = bad.
    - **Amplitude** — `0.3` = mild variation. Range 0.3–0.9.
    - **Trigger window** — pulse only when `hoursSinceTrained < 24`; flat after.

  Performance: ~30 muscles × 60fps = 1800 ops/sec. Negligible. Cost-saving rule:
  pre-allocate `Vector3`, `Color` outside `useFrame` — never inside — to avoid
  GC churn.

  12.5 — MULTIPLE POSES (DEFERRED TO STAGE 13)
  ----------------------------------------------
  Authored as animation clips in Blender, exported in one `.glb`, blended at
  runtime via Drei's `useAnimations`.

  ```tsx
  import { useAnimations } from '@react-three/drei'

  function Avatar() {
    const { scene, animations } = useGLTF('/models/anatomy.glb')
    const { actions } = useAnimations(animations, scene)

    useEffect(() => { actions['A_pose']?.play() }, [actions])

    return <primitive object={scene} />
  }
  ```

  Pose roster (proposed):
    - A-pose (default) — classical anatomical, all muscles visible
    - T-pose — shoulder muscles fully exposed
    - Squat bottom — shows quad/glute engagement
    - Bench press bottom — shows chest/tricep engagement
    - Deadlift setup — full posterior chain

  v1 ships with A-pose only. Multiple poses = Stage 13 polish. Reason: each pose
  needs creative direction (which lifts? what camera angle pairs?) — content
  question, not pipeline question.

  Cost: ~50KB keyframe data per pose. GPU-accelerated blending; near-zero perf cost.
  Requires the body to be rigged (Mixamo retarget at Stage 3 already provides this).

  12.6 — BODY VARIANTS (DEFERRED TO POST-v1)
  --------------------------------------------
  MB-Lab's shape keys export as glTF morph targets. They survive into the runtime.

  ```tsx
  function Avatar({ bodyMass, gender }) {
    const { scene } = useGLTF('/models/anatomy.glb')
    const mesh = scene.getObjectByName('Body')

    useEffect(() => {
      if (!mesh?.morphTargetInfluences) return
      const massIdx = mesh.morphTargetDictionary['mass']
      const genderIdx = mesh.morphTargetDictionary['gender']
      mesh.morphTargetInfluences[massIdx] = bodyMass         // 0–1
      mesh.morphTargetInfluences[genderIdx] = gender         // 0–1
    }, [bodyMass, gender, mesh])

    return <primitive object={scene} />
  }
  ```

  Surfacing options (lock when shipping):
    a) Profile → Display Preferences slider (like light mode would be)
    b) One-time signup question ("Match avatar to your build?")
    c) Hidden setting — power users find it, default = generic

  v1 = generic muscular male only. Variants = future, after MVP. Reason: each
  variant needs creative-direction calls (what does "female bodybuilder" look
  like in this aesthetic?) plus separate Blender authoring time.

  Storage cost: ~10–20% file size increase per shape key.

  12.7 — AI TOOLS FOR STAGE 12
  ------------------------------

  | Task | Best tool | Why |
  |---|---|---|
  | Side panel 2D React UI scaffolding | **v0.dev** | 2D React UI is its strength; generates clean Tailwind + ShadCN you adapt to CSS Modules |
  | Recovery formula research / physiology refs | Claude or GPT-4o | Both fluent in exercise science literature |
  | Pose creation from photo references | **Mixamo + Blender** (no AI) | Hand-pose against photo reference; AI overkill here |
  | Motion design tuning (pulse, damping) | None — manual iteration | Visual feel, no AI shortcut |
  | Animation curve generation (ease-out, etc.) | **easings.net** (reference site) | Free, all standard curves with copy-paste code |

  12.8 — CAUTIONS FOR STAGE 12
  ------------------------------
  - **Stage 7 naming convention is the linchpin.** If vertex groups in Blender
    don't match the muscle IDs the service uses, every feature in this stage
    silently breaks. Single source of truth for muscle IDs lives in
    `src/db/muscleTaxonomy.ts`.
  - **Pre-allocate inside `useFrame`.** Declaring `new Color()` or `new Vector3()`
    inside the loop = aggressive garbage collection = jank on mobile.
  - **`stopPropagation()` on click handlers.** Without it, clicks bubble to parent
    meshes and you can fire two events from one tap.
  - **Bottom sheet / panel scroll-trap.** When the side panel is open and the
    user scrolls inside it, prevent the touch from bubbling to OrbitControls
    (which would rotate the avatar behind the panel).
  - **Bloom strategy is a Stage 12 build-time decision** (S3-Q2, deferred):
    decide between manual tuning, `<PerformanceMonitor>` auto-disable, or
    fixed conservative intensity once the real model is rendering on the
    test phone. Cannot be tuned against a placeholder.

  STAGE 13 — Polish phase (open-ended)
  --------------------------------------
  Particle fiber travel along muscles, holographic glitch effects, multi-pose
  authoring, light-mode palette adaptation, accessibility (`prefers-reduced-motion`).

  Defer all of this until the v1 ships and the user-facing feature is real.

---

7. ASSET LICENSE LOG
----------------------
Per-asset paper trail. Update with every new asset acquired.

  | Asset / source | Source URL | License | Attribution required? | Commercial use? | Date acquired | Notes |
  |---|---|---|---|---|---|---|
  | Z-Anatomy `.blend` | z-anatomy.com | CC0 | No | Yes | TBD | Used as stencil only — final mesh is MB-Lab-derived; Z-Anatomy is not embedded in shipped asset |
  | MB-Lab plugin | github.com/animate1978/MB-Lab | GPL-3.0 (software) | No (for assets) | Yes | TBD | GPL covers the plugin; generated meshes are user property. Verified in MB-Lab licensing FAQ |
  | Mixamo character / animation | mixamo.com | Adobe license | No | Yes | TBD | Adobe explicitly permits commercial use of Mixamo content |
  | Sketchfab CC0 model (cardboard-cutout phase) | sketchfab.com | CC0 | No | Yes | TBD | Throwaway only — not in shipped v1 |
  | Rodin (Hyper3D) generated mesh | hyper3d.ai | Tool TOS — verify per generation | No | Yes (verify free-tier terms) | TBD | Throwaway only — not in shipped v1 |
  | Reference image (Midjourney) | midjourney.com | Midjourney TOS | No | Depends on plan | TBD | Reference material only — not embedded in shipped app |
  | Three.js | threejs.org | MIT | No | Yes | npm install | Standard runtime dependency |
  | React Three Fiber | docs.pmnd.rs | MIT | No | Yes | npm install | Standard runtime dependency |
  | Drei | github.com/pmndrs/drei | MIT | No | Yes | npm install | Standard runtime dependency |

  > **Plain English:** every piece you bring in needs a record of where it came from
  > and what license terms apply. CC0 = use however you want, no credit needed.
  > MIT = use however you want, include a license file. Adobe Mixamo = use however
  > you want for commercial work. The riskier ones are CC-BY (need credit) and
  > anything labeled "non-commercial" — avoid those.

---

8. CAUTIONS / KNOWN PITFALLS
------------------------------

  Asset pipeline:
    - **Decimate AFTER vertex groups, not before.** Otherwise the muscle boundaries
      get scrambled.
    - **Save before every destructive op** (Apply modifier, Finalize MB-Lab, Apply
      decimate). Blender undo isn't always reliable for these.
    - **Check the file in a glTF viewer** before integrating — saves debugging time.
    - **Watch the triangle count.** Mobile budgets are real. >50k tris = battery drain
      and frame drops on mid-range Android.

  Integration:
    - **Lazy-load the avatar route.** R3F's bundle penalizes the rest of the app's
      first paint if loaded eagerly.
    - **Cap `gl-pixelRatio`.** `Math.min(devicePixelRatio, 1.5)` — biggest mobile
      perf lever, prevents 3× rendering cost on retina.
    - **Honor `prefers-reduced-motion`.** Some users will disable the pulse animation;
      respect that media query.
    - **Test on a mid-range phone, not your dev machine.** Desktop GPU hides everything.

  Aesthetic:
    - **Bloom is the most expensive postprocessing pass.** Tune intensity conservatively;
      consider disabling on low-end devices.
    - **Edges component can over-saturate.** The neon line look is striking at first,
      visually noisy after 30 seconds. Tune line width and emissive intensity.

  Project / scope:
    - **Don't polish the cardboard cutout.** It is a smoke test, you will throw it away.
    - **Don't author Stage 1–9 without finishing Stage 0 first.** Validate R3F on your
      target phone before investing the asset hours.
    - **Don't expand scope mid-build.** Extra body types, extra poses, extra animations
      are Stage 13 polish — not v1 blockers.

---

9. OPEN QUESTIONS TO RESOLVE BEFORE LOCK
------------------------------------------
Lock these before treating this document as canonical.

  - **Color palette specifics.** Locked direction: green/orange/red on dark space.
    Specific hex values, gradient curve from cool to warm — TBD.
  - **Avatar placement in app.** Stats tab vs Profile tab. Anatomy doc says TBD.
  - **MuscleFatigueService spec.** Returns `Record<MuscleId, FatigueScore>`. Score
    formula (hours since last trained × volume modifier × ?) — TBD. See Stat Weights
    Calibration in memory.
  - **Vertex group naming convention.** `pectoralisMajorLeft` vs `pec_l` vs
    `pec.major.l`. Pick one in Stage 7 and document.
  - **Pose authoring strategy for Stage 12 multi-pose.** Mixamo per-pose vs
    hand-author? — defer until Stage 12.
  - **Female body / gender variants timing.** v1 = male only. v2 — when?
  - **Whether to expose the avatar in MVP launch or hold for a v1.1 reveal.** Marketing
    decision, not technical. Memory says "main attraction beyond tracking tool" — argues
    for launch inclusion.

---

10. CONNECTION POINTS TO THE WORKOUT-TRACKER APP
--------------------------------------------------

  CE1 muscle taxonomy is the data layer.
    - Defined in `src/db/muscleTaxonomy.ts` (untouched since session 47, per recap).
    - The Stage 7 vertex group names MUST match the muscle IDs in this file.
    - Single source of truth — if a muscle is renamed in the taxonomy, the avatar
      vertex group must be renamed in lockstep.

  MuscleFatigueService (TO BUILD).
    - Lives in `src/services/MuscleFatigueService.ts`.
    - Reads `workoutLogs` + `logSets` + the muscle taxonomy.
    - Exposes `getFatigueByMuscle(userId): Promise<Record<MuscleId, FatigueScore>>`.
    - Avatar `useFrame` loop reads this and lerps emissive color per muscle.
    - Spec deferred to a build session — out of scope for this research doc.

  Lazy loading.
    - Avatar route MUST be code-split: `const AvatarPage = lazy(() => import('./AvatarPage'))`.
    - Wrap in `<Suspense>` with a static fallback (no spinner per app conventions).
    - First-paint cost on Logs/Programs/Stats stays unaffected by R3F's ~300KB
      bundle until the user navigates to the avatar.

  Phase positioning.
    - Asset stages 0–9 happen in parallel to workout-tracker-v2 Phase 6 work.
    - Integration stages 10–13 happen in workout-tracker-v2 itself, scheduled after
      Phase 6 cleanup / F40 / F41 / F42 land.
    - Avatar v1 ships when both tracks meet — earliest realistic estimate: Phase 7+.

---

11. REFERENCES AND SOURCES
----------------------------

  Primary tools:
    - Blender                      blender.org
    - MB-Lab                       github.com/animate1978/MB-Lab
    - Z-Anatomy                    z-anatomy.com (Cyrille Martin, CC0)
    - Mixamo                       mixamo.com (Adobe)
    - gltf-transform               gltf-transform.dev (Don McCurdy)
    - Three.js                     threejs.org (Mr. doob, MIT)
    - React Three Fiber            docs.pmnd.rs/react-three-fiber (Poimandres, MIT)
    - Drei                         github.com/pmndrs/drei (Poimandres, MIT)
    - @react-three/postprocessing  github.com/pmndrs/react-postprocessing (Poimandres, MIT)

  Learning / inspiration:
    - Three.js Journey             threejs-journey.com (Bruno Simon, paid course + free showcase)
    - Discover Three.js (book)     discoverthreejs.com (Lewy Blue, free online)
    - WebGL Fundamentals           webglfundamentals.org
    - Shadertoy                    shadertoy.com (free shader gallery)
    - Don McCurdy's blog           donmccurdy.com (glTF web optimization)

  Aesthetic references:
    - Tron Legacy UI work — Daniel Simon (Cosmic Motors); GMUNK (Bradley Munkowitz, gmunk.com)
    - Prometheus medbay UI — Territory Studio (territorystudio.com)
    - Iron Man HUD — Cantina Creative (cantinacreative.com)

  AI tools mentioned:
    - Midjourney                   midjourney.com (image generation)
    - DALL-E 3                     in ChatGPT (image generation)
    - Rodin (Hyper3D)              hyper3d.ai (text/image to 3D)
    - Meshy                        meshy.ai (text/image to 3D — alternative)
    - Luma Genie / Genie 2         lumalabs.ai (text/image to 3D — alternative)
    - Tripo3D                      tripo3d.ai (text/image to 3D — alternative)
    - Blender MCP                  github.com/ahujasid/blender-mcp (Claude → Blender automation)

  > **Plain English:** every link above is a starting point. The 3D and AI tooling
  > space moves fast — verify versions and current status when you actually start
  > Stage 1. URLs current as of 2026-04-26.

---

END OF DRAFT — flesh out Sections 9 and 11.5 (deferred deepening pass on Stages 10–12)
before locking. Mark this file as `Status: LOCKED` in the header banner once finalized.
