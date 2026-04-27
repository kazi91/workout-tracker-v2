ANATOMY AVATAR — 3D PIPELINE (DRAFT)
======================================
> Last touched: 2026-04-26 (session 54 research, Step 2) — Stage 10 R3F integration deepened with packages, skeleton, perf levers, mobile gotchas, lazy-loading pattern, AI tools
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

  STAGE 0 — Cardboard cutout (week 1–2)
  ---------------------------------------
  Purpose: prove integration end-to-end with the cheapest possible asset, BEFORE
  committing to the real asset build. If R3F fails on your test phone, you learn it
  here for the cost of an evening — not after 30 hours in Blender.

  What you do:
    - Generate or download a CC0 muscular human from Sketchfab OR Rodin (free tier).
    - Drop it into a new R3F scene as a `<primitive object={gltf.scene} />`.
    - Wire `<OrbitControls>` for rotation. Get it spinning on your test phone.
    - Pick ONE muscle (e.g. left pec). Make it change color on tap.
    - Test: does the scene render at 30fps on your mid-range test phone? Does the
      bundle size feel acceptable when lazy-loaded on a fresh page visit?

  Deliverable: a throwaway dev route that proves R3F works on your phone. The 3D
  model is ugly. That's the point.

  Cautions:
    - **DO NOT polish this stage.** It's a smoke test. You will throw it away.
    - **DO NOT skip this stage.** Authoring the real asset before knowing R3F works on
      your target phone is the most expensive mistake you can make in this whole pipeline.

  > **Plain English:** before you spend 30 hours building the perfect model, spend
  > 4 hours proving the engine even runs on your phone. Use the ugliest 3D body you can
  > find on Sketchfab. If everything works, you've learned the path is clear. If
  > something is broken, you've learned it before wasting the model-building hours.

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
  - `useGLTF` from Drei auto-detects Draco-compressed glTF and configures the
    decoder. The Draco decoder ships from Drei's CDN by default. To self-host
    (recommended for offline / CSP reasons), copy decoder files to `public/draco/`
    and call `useGLTF.setDecoderPath('/draco/')` once at app boot.
  - **`gltfjsx` is the AI-assisted shortcut.** Run `npx gltfjsx anatomy.glb -t` —
    outputs a typed React component with named refs to every mesh in your model.
    Saves ~2 hours of manual scene traversal when wiring tap-to-drill.
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

  STAGE 11 — Tron / Prometheus shader stack (Step 3 territory — to be deepened)
  -------------------------------------------------------------------------------
  Layer the holographic look — translucent body + neon edges + scanline + per-muscle emissive.

  Recipe C from research session:
    - Translucency: Drei `<MeshTransmissionMaterial>` or custom Fresnel shader
    - Neon edges: Drei `<Edges>`
    - Scanline sweep: custom GLSL fragment shader, animated via `useFrame`
    - Per-muscle emissive: separate material per muscle group, animated based on fatigue state
    - Bloom postprocessing: `@react-three/postprocessing` `<Bloom>` with conservative intensity

  Detailed shader code and aesthetic-tuning research will be added in the deepening pass.

  STAGE 12 — Functional features wiring (Step 4 territory — to be deepened)
  ----------------------------------------------------------------------------
  Connect the visual avatar to the app's data:
    - 360° rotate: `<OrbitControls enableDamping />`
    - Tap-to-drill: per-muscle `onClick` handlers from R3F raycasting
    - Fatigue color decay: `useFrame` reads from `MuscleFatigueService`, lerps emissive
    - Pulse on recently-trained muscles: `Math.sin(clock)` modulation
    - Multi-pose: animation clips authored in Blender, exported in same `.glb`, blended with Drei's `useAnimations`
    - Body variants: morph targets from MB-Lab shape keys, manipulated via `morphTargetInfluences`

  Detailed code patterns will be added in the deepening pass.

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
