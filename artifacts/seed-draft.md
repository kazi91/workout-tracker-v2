# Seed Draft

Working output for Sessions 45a–f. Every entry tagged per [seed-tagging-principles.md](seed-tagging-principles.md). Will compile to `src/db/seed.ts` at build time.

**Status:** Sessions 45a–e CLOSED 2026-04-23. 183 of 213 entries tagged (all Seed + P0 + P1 + P2 + P3 + P5). Only P4 (30 entries) remains for 45f, plus end-to-end cross-curation validation pass.

**Conventions recap (full rules in principles doc):**
- Primary = force generator / rep-fails-if-it-fails. 1 typical; co-primary only when EMG supports.
- Secondary = worked meaningfully; `role: synergist | stabilizer`. Both at 0.5× this cycle.
- Tiebreak: first primary drives `getExerciseGroup()`.
- `jointLoad` skipped this cycle (empty array everywhere; not displayed below).
- `isCustom: false` on all seed entries (omitted below for signal-to-noise).

---

## Session 45a — Parent exercises (11)

Parents first per Parent/Variant Rule leverage: variants inherit these maps verbatim in later sub-sessions.

### Decisions flagged for user review — ALL RESOLVED 2026-04-23

1. ✅ **Dips tiebreak** — APPROVED `[chest, triceps]` co-primary → group derives as **chest** (overrides current seed Arms tag). Bodyweight dips EMG (Dickie 2017 et al.) supports.
2. ✅ **RDL order** — APPROVED `[glutes, hamstrings]` per Hinge template.
3. ✅ **Deadlift adductors** — APPROVED drop for conventional (narrow stance). Sumo variant will re-add when tagged in 45b.
4. ✅ **Plank obliques** — APPROVED tagging as stabilizer.
5. ✅ **Skull Crusher minimal secondaries** — APPROVED (only `forearms (stab)`).
6. ✅ **Squat primary** — REVIEWED via 6-expert panel (Nippard, Contreras, Nuckols, Schoenfeld, Horschig, Escamilla). Panel split 3:2:1 single-primary vs co-primary vs context-dependent. Co-primary case rests on Nuckols/Schoenfeld hypertrophy-volume framing; single-primary case rests on EMG (Contreras' own research — squat ≠ glute exercise). **User selected Path A: single-primary `quads` kept.** Glute-specific volume tracking handled by dedicated Hip Thrust / RDL entries. Bulgarian Split Squat (P0 #5) remains the taxonomy's co-primary exemplar for the squat pattern.

---

### 1. Squat (Seed #11 — high-bar back squat default)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist (small, co-contraction)
  - `lowerBack` — stabilizer
  - `abs` — stabilizer
  - `calves` — stabilizer *(ankle/balance chain — Poliquin-audit add)*
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat (knee-dominant). No override.
- **Group derivation:** quads → `legs`.
- **Notes:** Obliques dropped — symmetric axial load, no asymmetric rotation demand. Hip flexors eccentric-stretched at bottom, not tagged per Rule 6. **6 secondaries — flagged per ≤5 sanity-check soft threshold; accepted because calves tag is Poliquin-audit-driven (ankle chain stabilization under competent execution).**

---

### 2. Deadlift (Seed #6 — conventional default)

- **primary:** `glutes`, `hamstrings` *(co-primary)*
- **secondary:**
  - `quads` — synergist *(significant off the floor; Escamilla EMG)*
  - `lowerBack` — stabilizer
  - `upperBack` — stabilizer *(keeps bar close)*
  - `forearms` — stabilizer *(grip is a known strength limiter)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Hinge. Divergence logged: adductors dropped (see decision flag #3).
- **Group derivation:** glutes → `legs`.
- **Notes:** Conventional stance = shoulder-width or slightly narrower; adductor demand minimal. Grip orientation left null (pronated is canonical but lifter varies; not movement-defining).

---

### 3. Bench Press (Seed #1 — flat barbell, touch-and-go default)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist *(elbow extension)*
  - `frontDelts` — synergist *(shoulder flexion)*
  - `rotatorCuff` — stabilizer *(heavy pressing stability demand)*
  - `lats` — stabilizer *(active "pull-to-bar" for bar path control + bench tightness under competent execution — Poliquin-audit add)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push. No override.
- **Group derivation:** chest → `chest`.
- **Notes:** Serratus not tagged — flat bench doesn't reach past horizontal (per Rule 6 / chest convention). Narrow-grip variant goes standalone with triceps co-primary (not a Bench variant).

---

### 4. Dips (Seed #25 — bodyweight, neutral torso default)

- **primary:** `chest`, `triceps` *(co-primary; EMG-supported per Dickie 2017 et al.)*
- **secondary:**
  - `frontDelts` — synergist
  - `upperBack` — stabilizer *(scap-packed position throughout the dip; rhomboid/mid-trap stabilization — Poliquin-audit add)*
  - `rotatorCuff` — stabilizer *(closed-chain bodyweight press; rotator cuff holds scap position)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — overridden to co-primary per EMG. Seed note ("Compound: triceps + chest + front delts") supports roughly-equal treatment.
- **Group derivation:** chest → `chest` *(flags current seed Arms categorization — see decision #1)*.
- **Notes:** Tricep Dips (vertical torso) and Chest Dips (forward lean) are P5 variants — per Parent/Variant Rule, variants inherit this map; torso angle shifts emphasis, not map. Weighted Dip inherits this map; added load only.

---

### 5. Pull-Up (Seed #7 — pronated, shoulder-width grip default)

- **primary:** `lats`, `upperBack` *(co-primary per Pull-Up override — Youdas 2010, Lusk 2010)*
- **secondary:**
  - `biceps` — synergist
  - `brachialis` — synergist
  - `rearDelts` — synergist *(horizontal abduction component at top)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `bodyweight`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Vertical pull — Pull-Up override from Rule 1. `upperBack` demoted from secondary list per template rule.
- **Group derivation:** lats → `back`.
- **Notes:** Chin-Up (P0 #4) and Narrow-Grip Pull-Up (P5 #18) are variants. Chin-Up override per Rule 1 = `[lats, biceps]` co-primary; that's a map change → **standalone map in 45b**, not pure inheritance. Log as exception when 45b tags Chin-Up.

---

### 6. Lat Pulldown (Seed #9 — wide-grip pronated default)

- **primary:** `lats`
- **secondary:**
  - `upperBack` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `rearDelts` — synergist
  - `forearms` — stabilizer *(grip)*
- **equipment:** `cable`
- **gripWidth:** `wide`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Vertical pull — default (no Pull-Up override; cable-loaded, no bodyweight amplification of upper-back engagement).
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — right at the ceiling but justified (full Vertical pull template). Brachialis included despite pronated grip per template convention; reverse-grip variant will emphasize it further.

---

### 7. Romanian Deadlift (Seed #12 — barbell, continuous tension default)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — McAllister 2014)*
- **secondary:**
  - `upperBack` — stabilizer *(bar stays close)*
  - `lowerBack` — stabilizer
  - `abs` — stabilizer *(anti-flexion under axial load; spinal neutrality — Poliquin-audit add)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Hinge. No override (see decision flag #2 on order).
- **Group derivation:** glutes → `legs`.
- **Notes:** Quads NOT tagged — knees stay soft/unlocked throughout RDL; no significant concentric quad work. Adductors dropped (symmetric narrow stance).

---

### 8. Skull Crusher (Seed #24 — EZ-bar, flat bench default)

- **primary:** `triceps`
- **secondary:**
  - `forearms` — stabilizer *(grip on EZ-bar)*
  - `rotatorCuff` — stabilizer *(shoulder position under eccentric weighted load; Poliquin-audit add — principles doc Rule 5 patched to allow cuff on supine weighted tricep work)*
- **equipment:** `barbell` *(EZ-bar is barbell family)*
- **parentExerciseId:** `null`
- **Template:** Extension (elbow extension). "Resist over-secondary tagging" — 2 secondaries still within discipline.
- **Group derivation:** triceps → `arms`.
- **Notes:** Lats engage isometrically but not meaningful output limiter. Long-head stretch is an emphasis feature, not a map change. RotatorCuff added post-Poliquin-audit — skull crusher loads the shoulder in a flexed position with eccentric demand during the lowering phase, meeting cuff-stabilizer criteria.

---

### 9. Barbell Curl (Seed #21 — standing, straight-bar supinated default)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis as elbow flexor)*
  - `abs` — stabilizer *(anti-extension under axial load on standing isolation — Poliquin-audit add; principles doc Rule 6 patched to allow abs on axial-loaded standing isolation)*
- **equipment:** `barbell`
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl. Supinated grip = biceps single-primary (brachialis co-primary only on hammer/neutral/reverse grips — per template note).
- **Group derivation:** biceps → `arms`.
- **Notes:** Front delts not tagged — shoulder stays neutral on strict curl; cheating would add them (form breakdown, not competent execution). Abs added per Poliquin-audit — curl loaded standing axially requires core anti-extension under competent execution, distinct from "core engages because standing" exclusion.

---

### 10. Plank (Seed #26 — front plank on forearms, bodyweight default)

- **primary:** `abs`
- **secondary:**
  - `obliques` — stabilizer *(anti-lateral-collapse bracing; see decision #4)*
  - `glutes` — stabilizer *(neutral pelvis)*
  - `frontDelts` — stabilizer *(shoulder support under bodyweight)*
  - `rotatorCuff` — stabilizer *(glenohumeral position under bodyweight through the shoulder; cuff holds for hold duration — Poliquin-audit add)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** No direct template — applied core convention (direct anti-extension work = `abs` primary).
- **Group derivation:** abs → `core`.
- **Notes:** Quads engage isometrically to lock knee extension but dropped for discipline — marginal contribution. HipFlexors NOT tagged per Rule 6 (not the driver; they're eccentric-stretched if anything). Weighted Plank (P5 #23) inherits. Side Plank (P1 #42) will be separate map (obliques primary).

---

### 11. Cable Crossover (Seed #5 — mid-height, standard pec-fly path default)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(horizontal adduction + shoulder flexion combined)*
  - `rotatorCuff` — stabilizer *(cable tension across multiple planes with open-chain arm holding position — Poliquin-audit add; breaks Isolation template's "0 or 1 secondary" but justified because fly work has legitimate cuff demand beyond typical isolation)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Isolation (single-joint). Note: exception to "0 or 1 secondary" — fly/crossover work has enough cuff stabilization demand to warrant tagging. Documented in principles doc Isolation template note.
- **Group derivation:** chest → `chest`.
- **Notes:** Biceps iso-brace arm at slight bend — deliberately skipped (isolation discipline still applies; only cuff promoted). Serratus not tagged — mid-height path doesn't reach past horizontal (per chest convention). High variant (P5 #24) and Low variant (P5 #25) inherit this map.

---

## Session 45a — End-of-session sanity check (re-run post-Poliquin-audit)

Run against the 11 parents above:

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle
- [x] No entry has >2 primaries (Dips, Deadlift, Pull-Up, RDL at 2 — all co-primary justified)
- [~] No entry has >5 secondaries — **Squat at 6 flagged**; accepted per Poliquin-audit (calves tag is ankle-chain stabilization under competent execution). Lat Pulldown still at 5.
- [x] No muscle appears in both primary and secondary on same entry
- [x] Parent entries all have `parentExerciseId: null`
- [x] `equipment` populated on every entry
- [x] Tagging style reads consistent across the 11 entries

---

## Session 45b — Seed + P0 (non-parent entries, 17 + 9 = 26) — queued

**Scope:** Remaining Seed (17): Incline BB Bench, DB Fly, Push-Up, Bent-Over BB Row, Seated Cable Row, Leg Press, Lying Leg Curl, Leg Extension, Standing Calf Raise BW, Lateral Raise, Front Raise, Face Pull, Hammer Curl, Tricep Pushdown, Crunch, Hanging Leg Raise, Ab Wheel Rollout. P0 (9): DB Bench Press, Incline DB Bench Press, DB Row, Chin-Up, Bulgarian Split Squat, Barbell Hip Thrust, DB Shoulder Press, Barbell Shrug, DB Curl.

### Pre-locks carried in from session 45b opening (2026-04-23)

Seven maps were resolved during 45b opening — before the main draft was deferred. Apply verbatim when the next session resumes; do **not** re-litigate. Reasoning lives in handoff.md § Session 45b opening; EMG co-primary reference list in principles doc is the canonical source for the three co-primary adds.

1. **Chin-Up (P0 #4)** — primary `[lats, biceps]` *(co-primary; Rule 1 override — supinated grip amplifies biceps to co-primary; differs from Pull-Up parent map → standalone entry, not pure inheritance)*. Secondary: `brachialis (syn)`, `upperBack (syn)`, `forearms (stab)`. EMG co-primary reference list: add.
2. **Bulgarian Split Squat (P0 #5)** — primary `[quads, glutes]` *(co-primary; unilateral shift increases glute demand vs bilateral squat — taxonomy's designated co-primary squat-pattern exemplar, locked session 45a)*. Secondary: `adductors (syn)`, `hamstrings (syn)`, `calves (stab)`, `abs (stab)`. EMG co-primary reference list: add.
3. **Face Pull (Seed #20)** — primary `rearDelts`; secondary: `upperBack (syn)`, `upperTraps (syn)`, `rotatorCuff (syn — synergist exception per principles Rule 5; concentric external rotation is a primary mover of the movement, not incidental stabilization)`. 4-muscle tag is a Poliquin-audit accepted expansion.
4. **Hanging Leg Raise (Seed #28)** — primary `[abs, hipFlexors]` *(co-primary — user preference over anatomy-only hipFlexors single-primary; reflects training intent + real activation pattern on strict form)*. Secondary: `obliques (stab)`, `forearms (stab — grip hang)`. EMG co-primary reference list: add.
5. **Incline BB Bench (Seed #2)** — primary `chest`; secondary: `frontDelts (syn)`, `triceps (syn)`, `rotatorCuff (stab)`, `serratus (stab)`. Order matters: `frontDelts` precedes `triceps` per EMG (incline has ~30–45% more upper chest, ~58.5% less triceps, more front delts vs flat bench).
6. **Lateral Raise (Seed #18)** — primary `sideDelts`; secondary: `upperTraps (syn)`, `rotatorCuff (stab)`. Upper traps engage meaningfully at/above 90° arm elevation per EMG — not "side shoulder only."
7. **Tricep Pushdown (Seed #23)** — primary `triceps`; secondary: `forearms (stab)`, `frontDelts (stab)`. FrontDelts tag reflects normal competent execution (anterior shoulder stabilization against cable pull) — policy adopted session 45b opening per principles Rule 2 execution-standard addendum.

### Full entry blocks — Session 45b

Pre-lock items (Chin-Up, Bulgarian Split Squat, Face Pull, Hanging Leg Raise, Incline BB Bench, Lateral Raise, Tricep Pushdown) are expanded to full format below; the pre-lock section above is the decision record. Full format = compilation-ready for Session 47+ build.

---

#### Missed parent (omitted from 45a scope)

### 1. Overhead Press (Seed #17 — standing barbell, strict press default)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist *(scapular upward rotation, abduction plane component)*
  - `triceps` — synergist *(elbow extension)*
  - `upperTraps` — synergist *(scap upward rotation — active throughout overhead range)*
  - `serratus` — synergist *(scap upward rotation — overhead qualifies per chest/shoulder convention)*
  - `rotatorCuff` — stabilizer *(heavy overhead stability demand)*
  - `abs` — stabilizer *(anti-extension under axial load, standing lift)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Vertical push — full template applied.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** Single-primary confirmed — co-primary rejected (see EMG co-primary reference list, Rejected section: sideDelts + triceps are strong synergists but rep fails when frontDelts fail). **6 secondaries — flagged per ≤5 soft threshold; accepted because all 6 are Vertical push template-standard, same pattern as Squat at 6.** DB Shoulder Press (P0 #7) inherits this template map.

---

#### Seed non-parent entries (17)

### 2. Incline Barbell Bench Press (Seed #2)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(more active than flat bench; incline shoulder-flexion angle increases front delt contribution ~58% per EMG)*
  - `triceps` — synergist *(elbow extension)*
  - `rotatorCuff` — stabilizer *(pressing stability demand)*
  - `serratus` — stabilizer *(pre-lock item 5: serratus included; borderline at 45° but included per pre-lock)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push. `frontDelts` precedes `triceps` per pre-lock EMG note (incline shifts emphasis toward front delt vs flat bench).
- **Group derivation:** chest → `chest`.
- **Notes:** Same primary as Bench Press. Incline shifts emphasis toward upper chest + front delts but doesn't change the primary muscle. Incline DB Bench (P0 #2) inherits this map.

---

### 3. Dumbbell Fly (Seed #3)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(shoulder flexion at peak stretch)*
  - `rotatorCuff` — stabilizer *(open-chain fly-work cuff demand — Isolation template fly exception)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation. Fly exception applied: `rotatorCuff` tagged as stabilizer per Isolation template note ("fly work has legitimate multi-plane cuff demand beyond typical isolation"). DB fly has equivalent or greater cuff demand than cable crossover at the loaded-stretch position.
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries under fly exception (strict isolation = 0-or-1; fly exception = +1 for rotatorCuff). Incline Dumbbell Fly (P2 #4) inherits this map.

---

### 4. Push-Up (Seed #4)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist
  - `serratus` — synergist *(free scapular protraction at top — push-up allows full scap upward rotation; unlike bench where scapula is retracted against pad; qualifies per chest convention "press-past-horizontal")*
  - `abs` — stabilizer *(rigid-body anti-sag throughout)*
  - `rotatorCuff` — stabilizer
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Horizontal push. Serratus tagged as synergist because push-up allows free scapular movement. Lats not tagged — no horizontal pull cue equivalent to barbell bench press tightness.
- **Group derivation:** chest → `chest`.
- **Notes:** 5 secondaries — exactly at ceiling. Justified: serratus (free scap), abs (rigid body), cuff (shoulder stability) all engage under normal competent execution.

---

### 5. Bent-Over Barbell Row (Seed #8)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist *(horizontal abduction)*
  - `biceps` — synergist *(elbow flexion)*
  - `brachialis` — synergist *(elbow flexion, pronated-to-neutral path)*
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(maintains hip hinge position throughout)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — full template applied.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling, justified for horizontal pull. Continuous-tension style (hip hinge held throughout, distinct from Pendlay dead-stop). lowerBack = stabilizer per back convention (position-holder, not prime mover).

---

### 6. Seated Cable Row (Seed #10)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(upright posture against horizontal cable pull)*
- **equipment:** `cable`
- **gripOrientation:** `neutral` *(V-bar / triangle handle default)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — full template. Identical muscle map to Bent-Over Row; seated position reduces lowerBack loading vs. standing hinge, but lumbar still works isometrically against the cable's forward pull under competent execution.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling. lowerBack included despite seated position: forward cable pull creates a resisted moment the lumbar must counter, even without a gravity-loaded hip hinge.

---

### 7. Leg Press (Seed #13)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist *(hip extension)*
  - `adductors` — synergist *(hip extension assist; standard shoulder-width foot placement)*
  - `hamstrings` — synergist *(small — co-contraction at end range)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Squat (knee-dominant) — machine variant. lowerBack not tagged: spine is supported against pad, no axial load to stabilize. abs not tagged: no anti-extension demand without axial load. calves not tagged: feet flat on platform removes ankle stability demand.
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries — intentionally below the squat-pattern ceiling. Machine eliminates the stability demand that earns extra secondaries on the free-weight squat. Wide/high foot placement variants shift toward glutes (future P5 entries).

---

### 8. Lying Leg Curl (Seed #14)

- **primary:** `hamstrings`
- **secondary:**
  - `calves` — synergist *(gastrocnemius crosses the knee joint and assists knee flexion)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation. Gastrocnemius co-contracts as a knee flexor under knee-flexion isolation — the one justified secondary for leg curl work.
- **Group derivation:** hamstrings → `legs`.
- **Notes:** Shortened-bias variant (prone hip = shortened hamstring position). Paired with Seated Leg Curl (P1 #19 = lengthened-bias). 1 secondary — isolation discipline maintained.

---

### 9. Leg Extension (Seed #15)

- **primary:** `quads`
- **secondary:** *(none)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — strict. Quad isolation with no meaningful secondary contribution.
- **Group derivation:** quads → `legs`.
- **Notes:** Strictest isolation in the library. Hip flexors help initiate at the very start but don't qualify — per Rule 6, hipFlexors tag requires "direct concentric hip flexion" as the driver, not as a launch assist.

---

### 10. Standing Calf Raise (Bodyweight) (Seed #16)

- **primary:** `calves`
- **secondary:** *(none)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Gastrocnemius + soleus both covered by the `calves` label in the 26-muscle taxonomy. No secondary: tibialis is an antagonist (not a synergist), and bodyweight calf raise doesn't load the spine.
- **Group derivation:** calves → `legs`.
- **Notes:** Floor or step default. Machine version is P1 #23 (Standing Calf Raise — Machine) — separate entry because machine changes the loading curve and stability demand.

---

### 11. Lateral Raise (Seed #18)

*(Expanded from pre-lock item 6)*

- **primary:** `sideDelts`
- **secondary:**
  - `upperTraps` — synergist *(scapular upward rotation activates meaningfully at/above 90° arm elevation)*
  - `rotatorCuff` — stabilizer *(shoulder joint stabilization under lateral load)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — 2 secondaries under "0 or 1" by exception: upper traps are a legitimate synergist (not merely present), and rotatorCuff stabilizes the glenohumeral joint through the arc.
- **Group derivation:** sideDelts → `shoulders`.
- **Notes:** Upper traps engage meaningfully at/above 90° abduction per EMG (Hasan 2012 et al.). Cable Lateral Raise (P1 #27) and Machine Lateral Raise (P2 #18) inherit this map.

---

### 12. Front Raise (Seed #19)

- **primary:** `frontDelts`
- **secondary:**
  - `upperTraps` — synergist *(scapular upward rotation as arm elevates past 90°)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — 1 secondary. Sagittal-plane shoulder flexion; upper traps engage for scap rotation at top. Serratus considered — present at 90°+ but minor compared to upper traps; isolation discipline keeps it to 1.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** Typically done to ~90°. If raised past horizontal, serratus becomes relevant — that's a form variation, not the default. sideDelts not tagged: sagittal-plane lift, no meaningful abduction component.

---

### 13. Face Pull (Seed #20)

*(Expanded from pre-lock item 3)*

- **primary:** `rearDelts`
- **secondary:**
  - `upperBack` — synergist *(retraction component — rhomboids/mid-traps)*
  - `upperTraps` — synergist *(scapular retraction + depression)*
  - `rotatorCuff` — synergist *(external rotation IS the signature movement — Rule 5 synergist exception; concentric cuff contraction, not incidental stabilization)*
- **equipment:** `cable`
- **gripOrientation:** `pronated` *(overhand rope grip default)*
- **parentExerciseId:** `null`
- **Template:** No direct template match — rearDelt-dominant horizontal pull with concentric ER. Rule 5 exception: rotatorCuff promoted to synergist (only current example in the library where cuff works concentrically through ROM as a primary contributor).
- **Group derivation:** rearDelts → `shoulders`.
- **Notes:** 3 secondaries — disciplined given the multi-joint nature. Biceps not tagged: elbow flexion is minimal and incidental to the pull-to-face path; isolation discipline applies. biceps = form breakdown (momentum), not competent execution.

---

### 14. Hammer Curl (Seed #22)

- **primary:** `biceps`, `brachialis` *(co-primary per Curl template neutral-grip note — "hammer / neutral / reverse grip → brachialis co-primary")*
- **secondary:**
  - `forearms` — synergist *(brachioradialis is a primary elbow flexor in neutral grip)*
  - `abs` — stabilizer *(anti-extension under axial load, standing isolation — per Rule 6 addendum; matches Barbell Curl precedent)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Curl — co-primary applied per neutral-grip template branch. Tiebreak: `biceps` precedes `brachialis` (larger muscle + conventional naming convention; group derivation drives this).
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries. Front delts not tagged — strict hammer curl keeps shoulder neutral; front-delt recruitment = form breakdown, not competent execution. EMG co-primary reference list: add as template-default (low citation burden — inherent to neutral grip biomechanics).

---

### 15. Tricep Pushdown (Seed #23)

*(Expanded from pre-lock item 7)*

- **primary:** `triceps`
- **secondary:**
  - `forearms` — stabilizer *(grip on attachment)*
  - `frontDelts` — stabilizer *(isometric anterior shoulder stabilization against cable pull — Rule 2 execution-standard addendum)*
- **equipment:** `cable`
- **gripOrientation:** `pronated` *(straight-bar default; rope variant uses neutral grip)*
- **parentExerciseId:** `null`
- **Template:** Extension. `frontDelts (stab)` applied per 45b opening competent-execution policy — anterior shoulder holds elbow position throughout the pushdown arc; this is engagement under correct form, not compensation.
- **Group derivation:** triceps → `arms`.
- **Notes:** 2 secondaries — above Extension template's "minimal" default but justified by execution-standard policy (principles doc Rule 2 addendum). Consistent with Skull Crusher's post-audit treatment (cuff added there, frontDelts here — different stabilization demand, same policy).

---

### 16. Crunch (Seed #27)

- **primary:** `abs`
- **secondary:** *(none)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core convention — direct truncal flexion = `abs` single-primary, no secondary justified. HipFlexors not tagged: Rule 6 requires "direct concentric hip flexion as the driver"; standard crunch keeps hips stationary (truncal flexion only). Obliques not tagged: sagittal-plane movement with no rotational or asymmetric-load component.
- **Group derivation:** abs → `core`.
- **Notes:** 0 secondaries — strictest core-direct isolation. Paired with Cable Crunch (P1 #38) as a weighted variant (same map). Distinguished from Sit-Up (different map — hip flexors become co-primary once the trunk rises past ~45°).

---

### 17. Hanging Leg Raise (Seed #28)

*(Expanded from pre-lock item 4)*

- **primary:** `abs`, `hipFlexors` *(co-primary — user preference over anatomy-only hipFlexors single-primary; reflects training intent + real activation pattern on strict form)*
- **secondary:**
  - `obliques` — stabilizer *(anti-rotation during the swing-free hang)*
  - `forearms` — stabilizer *(grip for the hang)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — co-primary override per pre-lock. Rule 6 alone would set hipFlexors as single-primary (direct concentric hip flexion is the driver), but strict-form HLR with posterior pelvic tilt drives meaningful abs work concurrently. Co-primary reflects training-intent alignment.
- **Group derivation:** abs → `core` (tiebreak: first primary wins).
- **Notes:** 2 secondaries — disciplined list. Hanging Knee Raise (P1 #43) is a distinct easier variant (same map, reduced hip-flexor demand). EMG co-primary reference list: add on close-out.

---

### 18. Ab Wheel Rollout (Seed #29)

- **primary:** `abs`
- **secondary:**
  - `lats` — synergist *(concentric pull-back from stretched overhead position — long-head-of-lats shoulder extension is active)*
  - `obliques` — stabilizer *(anti-rotation bracing throughout)*
  - `triceps` — stabilizer *(elbow locked in extension throughout ROM)*
  - `serratus` — stabilizer *(overhead scap stabilization at full extension)*
- **equipment:** `other` *(ab wheel is a specific implement — not bodyweight-only since the wheel's roll mechanics define the exercise; not in standard categories)*
- **parentExerciseId:** `null`
- **Template:** Core — dynamic anti-extension. Unique movement; no standard template fits cleanly.
- **Group derivation:** abs → `core`.
- **Notes:** 4 secondaries. `lats (syn)` for the concentric pull-back phase (long-head shoulder extension moves the wheel back); remaining three are positional holds (elbow locked, scap protracted, trunk anti-rotated). HipFlexors not tagged: rollout is spine-focused anti-extension, not direct hip flexion.

---

---

#### P0 entries (9)

### 19. Dumbbell Bench Press (P0 #1)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist *(elbow extension)*
  - `frontDelts` — synergist *(shoulder flexion)*
  - `rotatorCuff` — stabilizer *(pressing stability demand — higher than barbell because separate dumbbells require independent stabilization)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — flat bench variant with dumbbells. Same primary as Bench Press.
- **Group derivation:** chest → `chest`.
- **Notes:** 3 secondaries. Lats not tagged — no "pull-to-bar" cue applies with separate dumbbells (the lat tag on Bench Press was specifically tied to barbell bench tightness + bar-path control). gripOrientation left null — pronated and neutral grips are both conventional.

---

### 20. Incline Dumbbell Bench Press (P0 #2)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(incline angle shifts emphasis toward front delts; `frontDelts` precedes `triceps` per Incline BB Bench EMG policy)*
  - `triceps` — synergist
  - `rotatorCuff` — stabilizer
  - `serratus` — stabilizer *(matches Incline BB Bench pre-lock inclusion; incline shoulder-flexion angle approaches threshold for scap upward rotation)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — incline variant. Inherits Incline BB Bench ordering policy + serratus inclusion.
- **Group derivation:** chest → `chest`.
- **Notes:** 4 secondaries — matches Incline BB Bench. Same caveats on serratus threshold (30° default sits below but 45° qualifies; pre-lock includes it).

---

### 21. Dumbbell Row (P0 #3 — one-arm)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist *(neutral grip amplifies brachialis contribution)*
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(hip hinge with support hand; reduced demand vs bent-over BB row, but present)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — full template applied. Supported position (free hand on bench) reduces lowerBack demand vs standing bent-over row but doesn't eliminate it.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling. Chest-Supported DB Row (P1 #6) differs only in support (chest-pad vs free hand) — same muscle map, inherited.

---

### 22. Chin-Up (P0 #4)

*(Expanded from pre-lock item 1 — Rule 1 override; map diverges from Pull-Up parent)*

- **primary:** `lats`, `biceps` *(co-primary — Rule 1 override; supinated grip amplifies biceps contribution per EMG vs pronated Pull-Up)*
- **secondary:**
  - `brachialis` — synergist *(supinated elbow flexion; brachialis still contributes despite biceps co-primary)*
  - `upperBack` — synergist *(demoted from Pull-Up's co-primary position; supinated grip shifts emphasis away from upper-back retraction toward biceps flexion)*
  - `rearDelts` — synergist *(horizontal abduction at top — present but minor in chin-up vs pull-up)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `bodyweight`
- **gripWidth:** `medium` *(shoulder-width default)*
- **gripOrientation:** `supinated`
- **parentExerciseId:** `→ Pull-Up (Seed #7)` *(structural variant per CE2 architecture; actual FK ID assigned at build time. Map DIVERGES from parent — see exception log)*
- **Template:** Vertical pull — Rule 1 override applied (different override from Pull-Up's `[lats, upperBack]`; Chin-Up's supinated grip shifts co-primary to `[lats, biceps]`).
- **Group derivation:** lats → `back`.
- **Notes:** 4 secondaries. **Exception logged:** Chin-Up is structurally a Pull-Up variant (linked via `parentExerciseId`) but has a DIFFERENT muscle map — biceps replaces upperBack in the co-primary pair. This is the taxonomy's designated case for "variant relationship in CE2 architecture despite map divergence." Narrow-Grip Pull-Up (P5 #18) queued for same override in Session 45e. EMG co-primary reference list: add on close-out.

---

### 23. Bulgarian Split Squat (P0 #5)

*(Expanded from pre-lock item 2 — unilateral shift per principles doc)*

- **primary:** `quads`, `glutes` *(co-primary — unilateral loading amplifies glute demand vs bilateral squat; taxonomy's designated co-primary exemplar for the squat pattern)*
- **secondary:**
  - `adductors` — synergist *(hip stability + extension assist on the working leg)*
  - `hamstrings` — synergist *(hip extension)*
  - `calves` — stabilizer *(single-leg balance demand)*
  - `abs` — stabilizer *(anti-rotation on unilateral load)*
- **equipment:** `dumbbell` *(default — dumbbells at sides; barbell-on-back variant also common)*
- **parentExerciseId:** `null`
- **Template:** Lunge / split stance — full template applied. Co-primary per template note for unilateral squat-pattern shift.
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries. Obliques not tagged — abs (stab) covers the anti-rotation demand; adding obliques would double-count core bracing. Split Squat (P1 #57, rear foot flat on floor) shares the same map but is a distinct exercise (reduced stability demand vs elevated rear foot). EMG co-primary reference list: add on close-out.

---

### 24. Barbell Hip Thrust (P0 #6)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist *(hip extension assist through the ROM)*
  - `adductors` — synergist *(hip extension assist, shoulder-width foot placement)*
  - `lowerBack` — stabilizer *(lumbar stabilization against bar pressure across hips)*
  - `abs` — stabilizer *(anti-extension at lockout — prevents lumbar hyperextension / rib flare under heavy load)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent (glute-specific hip extension) — not pure Hinge (no vertical descent of the bar path). Single-primary `glutes` per Contreras EMG: hip thrust is the canonical glute-dominant lift where glutes substantially out-activate hamstrings; NOT co-primary despite both being hip extensors.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries. Quads not tagged — knees stay fixed at ~90° throughout; quad work is isometric and at short muscle length, contribution is negligible. Glute Bridge (P1 #20) + DB Hip Thrust (P2 #15) + Machine Hip Thrust (P1 #52) share the same map.

---

### 25. Dumbbell Shoulder Press (P0 #7)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist
  - `triceps` — synergist
  - `upperTraps` — synergist *(scap upward rotation)*
  - `serratus` — synergist *(scap upward rotation)*
  - `rotatorCuff` — stabilizer *(overhead stability demand — higher than barbell since each dumbbell needs independent stabilization)*
  - `abs` — stabilizer *(anti-extension; demand scales down for seated variants but present on both seated + standing)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Vertical push — inherits OHP template.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 6 secondaries — matches OHP, same flag per ≤5 soft threshold (full Vertical push template). Arnold Press (P1 #25) is a grip-rotation variant of this same map.

---

### 26. Barbell Shrug (P0 #8)

- **primary:** `upperTraps`
- **secondary:**
  - `forearms` — stabilizer *(grip is a well-known strength limiter on heavy shrugs — Rule 6)*
  - `lowerBack` — stabilizer *(axial load on standing lift — Rule 6)*
  - `neck` — stabilizer *(per Rule 5 use case: "heavy shrugs")*
- **equipment:** `barbell`
- **gripOrientation:** `pronated` *(standard overhand)*
- **parentExerciseId:** `null`
- **Template:** No direct template — shrug / trap pattern. Tag aligns with Rule 5 `neck` use case + Rule 6 `lowerBack` use case.
- **Group derivation:** upperTraps → `back` *(per MUSCLE_TO_GROUP: all trapezius segments in back group)*.
- **Notes:** 3 secondaries. `lowerTraps` not tagged — shrug motion is scap elevation (upper-trap territory); lower traps depress the scap (opposite direction). Dumbbell Shrug (P1 #30) shares the same map.

---

### 27. Dumbbell Curl (P0 #9)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
  - `abs` — stabilizer *(anti-extension under standing axial load — matches Barbell Curl precedent)*
- **equipment:** `dumbbell`
- **gripOrientation:** `supinated` *(default; alternating-DB + neutral variants are P5-tier)*
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary (not hammer). Identical template treatment to Barbell Curl.
- **Group derivation:** biceps → `arms`.
- **Notes:** 3 secondaries. Same map as Barbell Curl — these are implement variants with identical muscle activation. Incline DB Curl (P1 #34) shifts to lengthened-bias but keeps the same muscle map.

---

## Session 45b — End-of-session sanity check

Run against the full 27 entries above (18 Seed non-parent + 9 P0 + 1 missed-parent OHP):

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle (`neck` or `rotatorCuff`)
- [x] No entry has >2 primaries — 5 entries at 2 primaries, all co-primary justified: Hammer Curl (Curl template neutral-grip), Hanging Leg Raise (user training-intent override), Chin-Up (Rule 1 override), Bulgarian Split Squat (unilateral shift), and pre-locked Chin-Up/BSS
- [~] No entry has >5 secondaries — **OHP at 6 flagged** (full Vertical push template, same pattern as Squat in 45a); **DB Shoulder Press at 6 flagged** (inherits OHP template). Both accepted as template-standard Vertical push. Push-Up, Bent-Over Row, Seated Cable Row, DB Row at 5 (at ceiling, within discipline).
- [x] No muscle appears in both primary and secondary on same entry
- [x] `parentExerciseId` populated per rule: all null except Chin-Up (→ Pull-Up Seed #7 per CE2 structural variant, despite map divergence — logged as exception)
- [x] `equipment` populated on every entry (27/27)
- [x] Tagging style reads consistent across the 27 entries — horizontal push/pull templates consistent; Curl template co-primary applied consistently (Hammer + neutral-grip DB curl variants); isolation discipline maintained (Leg Extension, Calf Raise BW, Crunch all at 0 secondaries)

**Session 45b status: CLOSED.** 27 entries drafted across pt. 1 + pt. 2. Ready for Session 45c.

---

## Session 45c — P1 upper body (27 entries)

**Scope:** P1 rows #1–#7, #25–#37, #45–#50, #53, #56 per `artifacts/exercise-bank.md`. Covers Chest (6), Back (5), Shoulders (9), Arms — Biceps (5), Arms — Triceps (2). Research depth = Medium per principles doc EMG policy (cite only when overriding template default). One EMG override this session: Close-Grip Bench Press `[chest, triceps]` per Barnett 1995 — locked from queued list.

### Full entry blocks — Session 45c

#### Chest (6)

### 1. Decline Bench Press (P1 #1)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist *(reduced vs flat bench; decline angle shifts away from shoulder flexion)*
  - `rotatorCuff` — stabilizer *(pressing stability demand)*
  - `lats` — stabilizer *(bar-path control + bench tightness — matches flat Bench Press)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push. No override. No serratus (decline → scap pinned, no past-horizontal reach per chest convention).
- **Group derivation:** chest → `chest`.
- **Notes:** 4 secondaries — matches Bench Press precedent. Decline angle emphasizes lower/outer pec but doesn't change primary. Decline DB Bench (P2 #1) will inherit.

---

### 2. Machine Chest Press (P1 #2)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — machine variant. Fixed path removes `rotatorCuff (stab)`; back-supported seat removes `lats (stab)` (no bench-tightness cue).
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries — machine discipline (matches Leg Press precedent: reduced secondaries vs free-weight parent). Smith Machine Bench Press (P2 #35) will inherit.

---

### 3. Pec Deck (P1 #3)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(shoulder flexion component during horizontal adduction)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — single-joint fly. Fly exception NOT applied: pad-supported + guided motion removes the multi-plane cuff demand that earns `rotatorCuff (stab)` on cable crossover + DB fly. Pec Deck stays strict isolation.
- **Group derivation:** chest → `chest`.
- **Notes:** 1 secondary — strictest isolation among chest exercises this session. Machine pad constrains shoulder position; cuff demand minimal.

---

### 4. Close-Grip Bench Press (P1 #5) — EMG co-primary override

- **primary:** `chest`, `triceps` *(co-primary — narrow grip shifts triceps to primary-mover status per Barnett 1995 EMG; standalone entry, not a Bench Press variant per Parent/Variant Rule — map diverges from Bench)*
- **secondary:**
  - `frontDelts` — synergist
  - `rotatorCuff` — stabilizer
  - `lats` — stabilizer *(same bench-tightness cue as Bench Press)*
- **equipment:** `barbell`
- **gripWidth:** `narrow`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — overridden to co-primary per EMG. Locks principles doc's queued entry for this session.
- **Group derivation:** chest → `chest` (tiebreak: chest first; group stays chest, not arms — distinguishes from JM Press which has triceps single-primary).
- **Notes:** 3 secondaries. JM Press (P3 #7) is structurally similar (triceps-dominant narrow press) but will take triceps single-primary with chest de-emphasized when tagged in 45e. EMG co-primary reference list: move from Queued → Non-parents (session 45c).

---

### 5. Machine Assisted Dip (P1 #45)

- **primary:** `chest`, `triceps` *(co-primary — inherits Dips movement pattern at reduced load; machine doesn't change muscle coordination, only load)*
- **secondary:**
  - `frontDelts` — synergist
- **equipment:** `machine`
- **parentExerciseId:** `null` *(per exercise-bank: separate exercise, not a Dips variant — machine removes stabilizer + reduces load)*
- **Template:** Horizontal push — Dips co-primary preserved; machine discipline drops `upperBack (stab)` + `rotatorCuff (stab)` from Dips parent map.
- **Group derivation:** chest → `chest` (first primary — matches Dips parent group derivation).
- **Notes:** 1 secondary — machine-beginner discipline. Kneeling-pad assistance reduces bodyweight load but preserves chest+triceps co-primary coordination. Logged as exception (machine variant inheriting co-primary despite 2-stabilizer loss from parent map).

---

### 6. Iso-Lateral Chest Press (P1 #46)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — machine variant. Same reasoning as Machine Chest Press (#2): fixed path + back-supported seat removes cuff + lats stabilizers.
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries. Plate-loaded with independent-arm option (unilateral use). Default = bilateral; no obliques (stab) tag unless used unilaterally (per-session form variation, not map change).

---

#### Back (5)

### 7. Chest-Supported Dumbbell Row (P1 #6)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist *(neutral grip amplifies brachialis contribution)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Horizontal pull. Chest pad eliminates hip-hinge demand → drop `lowerBack (stab)` from template default.
- **Group derivation:** lats → `back`.
- **Notes:** 4 secondaries. Same muscles as DB Row (P0 #3) minus `lowerBack` (chest-support removes hinge). Chest-Supported T-Bar Row (P2 #6) will inherit this map.

---

### 8. T-Bar Row (P1 #7)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist *(close-handle neutral grip is T-bar default)*
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(bent-over hip hinge held throughout)*
- **equipment:** `barbell` *(landmine or T-bar station)*
- **gripOrientation:** `neutral` *(close-handle V-grip default)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — full template applied (same as Bent-Over BB Row).
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling. Same map as Bent-Over BB Row; differs in implement path (landmine arc vs free barbell) and grip default (neutral vs pronated).

---

### 9. Iso-Lateral High Row (P1 #47)

- **primary:** `lats`
- **secondary:**
  - `upperBack` — synergist *(demoted from co-primary — high-angle pull behaves like Lat Pulldown, not row)*
  - `biceps` — synergist
  - `brachialis` — synergist
  - `rearDelts` — synergist
  - `forearms` — stabilizer *(grip)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Vertical pull — naming is "row" but pull-down-angle path functions as vertical pull (closer to Lat Pulldown than horizontal row). No Pull-Up co-primary override (cable/machine, no bodyweight amplification).
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling. Naming/template mismatch logged as exception: exercise-bank lists as "row" but the high pull angle justifies Vertical pull treatment. Distinct from Iso-Lateral Low Row (#10), which is horizontal-row angle and gets co-primary.

---

### 10. Iso-Lateral Low Row (P1 #48)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — chest-supported seated row angle. Drop `lowerBack (stab)` per chest-support precedent (see Chest-Supported DB Row #7).
- **Group derivation:** lats → `back`.
- **Notes:** 4 secondaries. Same map as Chest-Supported DB Row — plate-loaded machine equivalent. Machine Row (P1 #9) will inherit this map in 45d.

---

### 11. Machine Assisted Pull-Up (P1 #49)

- **primary:** `lats`
- **secondary:**
  - `upperBack` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `rearDelts` — synergist
  - `forearms` — stabilizer *(grip)*
- **equipment:** `machine`
- **parentExerciseId:** `null` *(per exercise-bank: separate exercise, machine removes stabilizer + reduces load)*
- **Template:** Vertical pull — default (no Pull-Up co-primary override; assistance reduces bodyweight amplification, pattern tracks closer to Lat Pulldown than bodyweight Pull-Up).
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling, matches Lat Pulldown template. Kneeling-pad assistance + machine guidance reduces both load and cuff demand.

---

#### Shoulders (9)

### 12. Arnold Press (P1 #25)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist *(grip-rotation element amplifies sideDelt recruitment vs strict DB press)*
  - `triceps` — synergist
  - `upperTraps` — synergist
  - `serratus` — synergist
  - `rotatorCuff` — stabilizer
  - `abs` — stabilizer *(anti-extension; scales with seated/standing)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Vertical push — inherits DB Shoulder Press map. Grip-rotation element amplifies sideDelt engagement slightly but doesn't change primary or template.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per DB Shoulder Press + OHP precedent (Vertical push template-standard, same pattern as Squat).

---

### 13. Machine Shoulder Press (P1 #26)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist
  - `triceps` — synergist
  - `upperTraps` — synergist
  - `serratus` — synergist
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Vertical push — machine variant. Fixed path removes `rotatorCuff (stab)`; back-supported seat removes `abs (stab)` (no standing axial anti-extension demand).
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 4 secondaries — machine discipline reduces from OHP's 6. Smith Machine OHP (P2 #38) will inherit. Iso-Lateral Shoulder Press (#19) gets the same map.

---

### 14. Cable Lateral Raise (P1 #27)

- **primary:** `sideDelts`
- **secondary:**
  - `upperTraps` — synergist *(scap upward rotation at/above 90°)*
  - `rotatorCuff` — stabilizer
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Isolation — inherits Lateral Raise (Seed #18) map. Cable provides continuous tension through ROM but doesn't change muscle recruitment profile.
- **Group derivation:** sideDelts → `shoulders`.
- **Notes:** 2 secondaries. Machine Lateral Raise (P2 #18) will inherit this same map in 45e.

---

### 15. Rear Delt Pec Deck (P1 #28)

- **primary:** `rearDelts`
- **secondary:**
  - `upperBack` — synergist *(rhomboid + mid-trap retraction at end range)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — reverse fly pattern. Pad-supported, fixed path; no cuff exception (same reasoning as Pec Deck #3: support removes multi-plane cuff demand).
- **Group derivation:** rearDelts → `shoulders`.
- **Notes:** 1 secondary. Strict isolation discipline. Chest pad holds torso position, removing trunk stabilizer demand.

---

### 16. Bent-Over Dumbbell Reverse Fly (P1 #29)

- **primary:** `rearDelts`
- **secondary:**
  - `upperBack` — synergist *(retraction — rhomboids, mid-traps)*
  - `lowerBack` — stabilizer *(hip-hinge hold sustained under DB load)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — reverse fly. Same rearDelt-isolation pattern as Rear Delt Pec Deck (#15) but free-weight + hinge adds `lowerBack (stab)`.
- **Group derivation:** rearDelts → `shoulders`.
- **Notes:** 2 secondaries. `lowerBack` included despite short-lever isolation because sustained bent-over position under dumbbell load meets Rule 6 tag-when criteria (hinge hold under load).

---

### 17. Dumbbell Shrug (P1 #30)

- **primary:** `upperTraps`
- **secondary:**
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(axial load on standing)*
  - `neck` — stabilizer *(per Rule 5 heavy-shrug use case)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Shrug pattern — inherits Barbell Shrug (P0 #8) map verbatim.
- **Group derivation:** upperTraps → `back`.
- **Notes:** 3 secondaries. DBs at sides (neutral grip) vs barbell front-hold — same trap activation, same stabilizer profile.

---

### 18. Landmine Press (P1 #31)

- **primary:** `frontDelts`
- **secondary:**
  - `chest` — synergist *(diagonal press angle retains meaningful horizontal-adduction component)*
  - `triceps` — synergist
  - `serratus` — synergist *(press past horizontal along landmine arc qualifies)*
  - `obliques` — stabilizer *(anti-rotation on unilateral load — default = one-arm landmine press)*
- **equipment:** `barbell` *(barbell-in-landmine setup)*
- **parentExerciseId:** `null`
- **Template:** Hybrid — between Horizontal push and Vertical push (~45° diagonal). `frontDelts` primary per shoulder-group convention (the lift's dominant angle is shoulder flexion). `chest` tagged as synergist for the horizontal-adduction component at the bottom of the arc.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 4 secondaries. Unilateral default → `obliques (stab)` covers anti-rotation; no separate `abs (stab)` (obliques handles the full core demand here). RotatorCuff not tagged — landmine fixes one end of the bar, reducing multi-plane shoulder instability vs free DB press. Logged as exception (hybrid press angle, chest-as-synergist on a shoulder exercise).

---

### 19. Iso-Lateral Shoulder Press (P1 #50)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist
  - `triceps` — synergist
  - `upperTraps` — synergist
  - `serratus` — synergist
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Vertical push — machine variant. Same map as Machine Shoulder Press (#13); plate-loaded with independent-arm option.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 4 secondaries. Differs from Machine Shoulder Press only in loading mechanism (plate-loaded vs selectorized) + unilateral option.

---

### 20. Upright Row (P1 #56)

- **primary:** `sideDelts`
- **secondary:**
  - `upperTraps` — synergist *(scap elevation + upward rotation throughout the pull)*
  - `frontDelts` — synergist *(anterior elevation component)*
  - `biceps` — synergist *(elbow flexion through the pull)*
  - `rotatorCuff` — stabilizer *(technique-sensitive — internal-rotation-at-abduction angle creates impingement risk; cuff stabilizes actively)*
- **equipment:** `barbell` *(BB canonical; DB + cable variants exist but BB is default)*
- **gripWidth:** `shoulder`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** No clean template — hybrid lateral-raise + vertical-pull motion. `sideDelts` primary per the signature lateral-abduction arc (shoulder-width grip default; narrow-grip would shift toward upperTraps primary, tagged as a variant consideration).
- **Group derivation:** sideDelts → `shoulders`.
- **Notes:** 4 secondaries. Logged as exception (hybrid pattern, no clean template fit). `rotatorCuff (stab)` included despite not being an overhead press because internal-rotation-at-abduction under load meets Rule 5 cuff tag-when criteria (active stabilization at impingement-risk angle).

---

#### Arms — Biceps (5)

### 21. EZ-Bar Curl (P1 #32)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis; semi-pronated EZ-bar curve increases brachioradialis contribution slightly vs straight bar)*
  - `abs` — stabilizer *(anti-extension — standing axial isolation; matches Barbell Curl precedent)*
- **equipment:** `barbell` *(EZ-bar family)*
- **gripOrientation:** `supinated` *(slight pronation from EZ-bar curve; still supinated family)*
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Same map as Barbell Curl; EZ-bar is grip ergonomics, not a map shift.
- **Group derivation:** biceps → `arms`.
- **Notes:** 3 secondaries. Matches Barbell Curl secondary profile.

---

### 22. Preacher Curl (P1 #33)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `barbell` *(EZ-bar or straight bar; preacher bench fixes upper arms)*
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Preacher bench supports upper arms and removes standing axial load → drop `abs (stab)` from Barbell Curl template.
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries. Machine Preacher Curl (#25) shares the same map.

---

### 23. Incline Dumbbell Curl (P1 #34)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `dumbbell`
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Lengthened-bias variant (incline bench stretches biceps at starting position). Reclined seated position drops `abs (stab)` — no standing axial anti-extension demand.
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries — matches Preacher Curl profile (bench-supported = no abs). Lengthened-bias is stretch emphasis, not a map change.

---

### 24. Cable Curl (P1 #35)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
  - `abs` — stabilizer *(standing axial isolation; matches Barbell Curl)*
- **equipment:** `cable`
- **gripOrientation:** `supinated` *(straight-bar default; rope / EZ attachments are variant configurations)*
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Standing cable curl; continuous tension through ROM but same muscle activation profile as barbell.
- **Group derivation:** biceps → `arms`.
- **Notes:** 3 secondaries — matches Barbell Curl map.

---

### 25. Machine Preacher Curl (P1 #53)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `machine`
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Selectorized or plate-loaded preacher-style machine; same map as Preacher Curl (#22).
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries. Differs from Preacher Curl only in loading mechanism.

---

#### Arms — Triceps (2)

### 26. Overhead Cable Extension (P1 #36)

- **primary:** `triceps`
- **secondary:**
  - `forearms` — stabilizer *(grip on rope attachment)*
  - `rotatorCuff` — stabilizer *(overhead position + weighted eccentric; same Rule 5 use case as Skull Crusher)*
- **equipment:** `cable`
- **gripOrientation:** `neutral` *(rope attachment default)*
- **parentExerciseId:** `null`
- **Template:** Extension — inherits Skull Crusher approach. Overhead variant earns `rotatorCuff (stab)` per Rule 5 patched use-case (supine/overhead weighted tricep work).
- **Group derivation:** triceps → `arms`.
- **Notes:** 2 secondaries — matches Skull Crusher post-audit treatment.

---

### 27. Overhead Dumbbell Extension (P1 #37)

- **primary:** `triceps`
- **secondary:**
  - `forearms` — stabilizer *(grip)*
  - `rotatorCuff` — stabilizer *(overhead weighted eccentric position)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral` *(DB held vertical with both hands, or single DB overhead)*
- **parentExerciseId:** `null`
- **Template:** Extension — same map as Overhead Cable Extension (#26). DB vs cable = implement difference, not map difference.
- **Group derivation:** triceps → `arms`.
- **Notes:** 2 secondaries.

---

## Session 45c — End-of-session sanity check

Run against the full 27 entries above (6 Chest + 5 Back + 9 Shoulders + 5 Biceps + 2 Triceps):

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle (`neck` / `rotatorCuff`)
- [x] No entry has >2 primaries — 2 entries at co-primary (Close-Grip Bench `[chest, triceps]` per EMG override; Machine Assisted Dip `[chest, triceps]` per Dips-pattern inheritance)
- [~] No entry has >5 secondaries — **Arnold Press at 6 flagged** (accepted per DB SP + OHP Vertical push template precedent). T-Bar Row, Iso-Lat High Row, Machine Assisted Pull-Up at 5 (at ceiling, within discipline).
- [x] No muscle appears in both primary and secondary on same entry
- [x] `parentExerciseId` populated per rule: all 27 null (no structural parent linkages in scope; Chin-Up-style divergences absent)
- [x] `equipment` populated on every entry (27/27)
- [x] Tagging style reads consistent across the 27 entries — Horizontal push/pull templates consistent; Curl template supinated-default applied uniformly; Isolation discipline maintained (Pec Deck + Rear Delt Pec Deck both at strict isolation; Cable Crossover fly exception NOT extended to pad-supported pec deck machines); Machine discipline reduces secondaries consistently (Machine Chest Press 2, Machine SP 4, Machine Assisted Pull-Up 5 vs Lat Pulldown 5 template match).

**Session 45c status: CLOSED** (2026-04-23). 27 entries drafted; user accepted all 6 flagged exceptions. Ready for Session 45d (P1 lower body + core).

---

## Session 45d — P1 lower body + core (27 entries)

**Scope:** P1 rows #10–#24, #38–#43, #44, #51–#52, #54–#55, #57 per `artifacts/exercise-bank.md`. Covers Hinge (3), Quads (8), Hamstrings (2), Glutes (4), Calves (2), Core (7), + 1 Triceps catch-up (Machine Tricep Extension #54 — originally in upper-body range but placed in 45d machine cluster per CURRENT TASK scope). Research depth = Medium per principles doc EMG policy. No new EMG overrides this session (Narrow-Grip Pull-Up remains queued for 45e).

### Full entry blocks — Session 45d

#### Hinge (3)

### 1. Trap Bar Deadlift (P1 #10)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — still hip-extension-dominant despite increased quad recruitment)*
- **secondary:**
  - `quads` — synergist *(trap bar's higher starting hip + more knee flexion increases quad contribution meaningfully vs conventional DL; Lake et al. 2017)*
  - `upperBack` — stabilizer *(bar-close cue less critical than conventional but handles-at-sides still demand scap-packed posture)*
  - `lowerBack` — stabilizer
  - `forearms` — stabilizer *(grip — neutral handle grip is easier than mixed/hook, but still a limiter on heavy loads)*
- **equipment:** `barbell` *(trap bar = specialized barbell family)*
- **gripOrientation:** `neutral` *(trap bar handles default)*
- **parentExerciseId:** `null`
- **Template:** Hinge — co-primary preserved; `quads (syn)` elevated in prominence vs conventional Deadlift.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries. Tri-primary rejected (Rule 1): quads is significant but rep-fail mode is hip extension, not knee extension. Distinct from conventional Deadlift (different grip + starting hip position change map enough to warrant separate entry per exercise-bank listing).

---

### 2. Sumo Deadlift (P1 #11)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template)*
- **secondary:**
  - `adductors` — synergist *(re-added from conventional Deadlift template — wide stance makes adductors a meaningful hip-extension contributor; matches 45a Deadlift exception "template default targets sumo/wide-stance variants")*
  - `quads` — synergist *(lower starting hip position increases knee flexion → more quad work than conventional)*
  - `upperBack` — stabilizer *(bar stays close)*
  - `lowerBack` — stabilizer
  - `forearms` — stabilizer *(grip)*
- **equipment:** `barbell`
- **stanceWidth:** `sumo`
- **gripOrientation:** `pronated` *(mixed grip common at heavy loads but not map-defining)*
- **parentExerciseId:** `null`
- **Template:** Hinge — full template with `adductors` re-added.
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — at ceiling. Graduated from P5 → P1 (exercise-bank Batch A) because adductor-dominant map diverges from conventional Deadlift per Parent/Variant Rule. Closes 45a Deadlift exception loop (adductors dropped from parent because sumo tag would re-add).

---

### 3. Stiff-Leg Deadlift (P1 #12)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template)*
- **secondary:**
  - `upperBack` — stabilizer *(bar stays close)*
  - `lowerBack` — stabilizer
  - `abs` — stabilizer *(anti-flexion under axial load; matches RDL precedent)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Hinge — same map as RDL (P1 #12... seed) with starting position from the floor (vs RDL which tops out before the floor). Execution difference doesn't change map.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries — matches RDL exactly. Hamstrings-dominant feel but template order preserved `[glutes, hamstrings]` per 45a RDL convention. Quads NOT tagged — knees stay relatively straight; negligible concentric quad work (distinguishes from Trap Bar + Sumo where quads earn syn tag). Graduated from P5 → P1 per exercise-bank (different map from conventional DL — hamstring-bias, no quad tag).

---

#### Quads (8)

### 4. Front Squat (P1 #13)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small, co-contraction)*
  - `upperBack` — stabilizer *(front-rack position demands active thoracic extension hold)*
  - `abs` — stabilizer *(upright-torso anti-flexion demand is higher than back squat)*
  - `lowerBack` — stabilizer
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat (knee-dominant) — front-rack variant. Swaps `calves (stab)` from Squat parent for `upperBack (stab)` — front-rack demand is more salient than ankle chain here.
- **Group derivation:** quads → `legs`.
- **Notes:** 6 secondaries — matches Squat parent count. Per exercise-bank: separate exercise from Squat (not a variant) because quad/upper-back emphasis shifts meaningfully. Flagged in exception log per continued 6-sec pattern (Squat precedent, template-driven).

---

### 5. Goblet Squat (P1 #14)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small)*
  - `upperBack` — stabilizer *(isometric hold of DB at chest)*
  - `abs` — stabilizer *(anti-flexion with front load)*
- **equipment:** `dumbbell` *(kettlebell variant also common; default dumbbell)*
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — front-loaded variant. Drops `lowerBack (stab)` + `calves (stab)` vs Squat parent: goblet loads are typically light (DB mass << BB with plates), reducing axial and ankle-chain stabilizer demand below tagging threshold.
- **Group derivation:** quads → `legs`.
- **Notes:** 5 secondaries. Typically a teaching/warm-up tool; light load profile justifies trim from Squat's 6. If loaded heavily, would approach Front Squat's demand profile — but default goblet = light-to-moderate.

---

### 6. Hack Squat (P1 #15)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Squat — machine variant. Matches Leg Press (45b #7) machine discipline: fixed sled path eliminates `lowerBack (stab)` (back supported against pad) + `abs (stab)` (no anti-extension demand without axial-load standing) + `calves (stab)` (foot plate removes ankle balance).
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries — matches Leg Press. Plate-Loaded Hack Squat (P2 #40) will inherit this map.

---

### 7. Walking Lunge (P1 #16)

- **primary:** `quads`, `glutes` *(co-primary per Lunge / split-stance template)*
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `calves` — stabilizer *(balance demand on single-leg phases)*
  - `abs` — stabilizer *(anti-rotation under unilateral load; matches BSS precedent)*
- **equipment:** `dumbbell` *(DBs at sides default; barbell-on-back common)*
- **parentExerciseId:** `null`
- **Template:** Lunge / split-stance — co-primary per template. Drops `obliques (stab)` per BSS precedent (abs covers the anti-rotation demand; adding obliques would double-count).
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries — matches BSS. Walking version adds forward-momentum gait but doesn't change map vs stationary split stance.

---

### 8. Reverse Lunge (P1 #17)

- **primary:** `quads`, `glutes` *(co-primary per Lunge template)*
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `calves` — stabilizer *(balance)*
  - `abs` — stabilizer *(anti-rotation)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Lunge / split-stance — same map as Walking Lunge. Step-backward pattern reduces knee-forward shear vs forward lunge but doesn't change muscle map.
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries. Forward Lunge (P2 #49) will inherit this map when tagged in 45e.

---

### 9. Step-Up (P1 #18)

- **primary:** `quads`, `glutes` *(co-primary per Lunge / split-stance template — unilateral loading pattern)*
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `calves` — stabilizer *(balance on the step)*
  - `abs` — stabilizer *(anti-rotation)*
- **equipment:** `dumbbell` *(DBs at sides; BB-on-back also valid)*
- **parentExerciseId:** `null`
- **Template:** Lunge / split-stance — co-primary per unilateral loading. Same map as Walking/Reverse Lunge.
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries. Single-leg stepping action parallels split-stance mechanics; principles-doc Lunge template covers it cleanly.

---

### 10. Smith Machine Squat (P1 #44)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small)*
  - `lowerBack` — stabilizer *(axial load still present — Smith fixes bar path but not spinal load)*
  - `abs` — stabilizer *(anti-extension under axial load)*
- **equipment:** `smith`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — Smith variant. Fixed vertical bar path removes `calves (stab)` (ankle-chain demand eliminated) but preserves axial load → `lowerBack` + `abs` stabilizer tags stay.
- **Group derivation:** quads → `legs`.
- **Notes:** 5 secondaries — between free Squat's 6 and Leg Press's 3. Per exercise-bank: separate exercise (not a Squat variant) because fixed bar path removes stabilizer demand enough to meaningfully differ. Smith Machine Hip Thrust (P2 #43) + Smith Machine Calf Raise (P2 #45) will inherit Smith-machine discipline pattern from here.

---

### 11. Split Squat (P1 #57)

- **primary:** `quads`, `glutes` *(co-primary per Lunge / split-stance template)*
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `calves` — stabilizer *(balance, though reduced vs BSS elevated-rear-foot variant)*
  - `abs` — stabilizer *(anti-rotation)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Lunge / split-stance — same map as BSS (P0 #5) with rear foot flat on floor. Per exercise-bank: distinct from BSS (different stability demand) but same muscle recruitment.
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries — matches BSS. Stability demand is lower with rear foot flat, but the template doesn't differentiate stability levels within the pattern.

---

#### Hamstrings (2)

### 12. Seated Leg Curl (P1 #19)

- **primary:** `hamstrings`
- **secondary:**
  - `calves` — synergist *(gastrocnemius crosses the knee; assists knee flexion in both lying and seated positions)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — same map as Lying Leg Curl (45b #8). Seated position puts hamstring in lengthened starting position (hip-flexed) — lengthened-bias variant, but same muscle map.
- **Group derivation:** hamstrings → `legs`.
- **Notes:** 1 secondary. Paired with Lying Leg Curl (shortened-bias) — same map, different bias emphasis.

---

### 13. 45° Hyperextension (P1 #51)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — bodyweight hip-extension movement)*
- **secondary:**
  - `lowerBack` — synergist *(promoted to synergist per Rule 6 exception: "synergist only on Good Morning, 45° Back Extension — spinal extension under load is the movement")*
  - `abs` — stabilizer *(anti-extension at top range)*
- **equipment:** `bodyweight` *(default; weighted plate-held variants also common)*
- **parentExerciseId:** `null`
- **Template:** Hinge — reduced-secondary variant. Rule 6 exception applied: `lowerBack` is synergist (not stab) because spinal extension is part of the concentric movement, not merely a position-hold.
- **Group derivation:** glutes → `legs`.
- **Notes:** 2 secondaries. Listed in exception log per Rule 6 `lowerBack (syn)` promotion (only cases in library: Good Morning + this entry). Glute-dominant form is the common default; hamstring emphasis via toes-in stance is a form variation not a map change.

---

#### Glutes (4)

### 14. Glute Bridge (P1 #20)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `lowerBack` — stabilizer
  - `abs` — stabilizer
- **equipment:** `bodyweight` *(default; BB/DB-loaded variants also common but bodyweight is canonical)*
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent (glute-specific hip extension) — inherits Barbell Hip Thrust (P0 #6) map verbatim.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries. Same map as Hip Thrust — floor-based (bridge) vs bench-based (hip thrust) differ in ROM but not muscle recruitment.

---

### 15. Hip Abduction Machine (P1 #21)

- **primary:** `abductors`
- **secondary:** *(none)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — strict. Hip abduction machine isolates glute med/min (covered by `abductors` muscle tag in taxonomy — separate from `glutes` which covers glute max).
- **Group derivation:** abductors → `legs`.
- **Notes:** 0 secondaries — matches Leg Extension + Calf Raise BW strictest-isolation discipline. Glutes not tagged — glute max has minor abduction role via posterior fibers but isn't the driver on this machine.

---

### 16. Hip Adduction Machine (P1 #22)

- **primary:** `adductors`
- **secondary:** *(none)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — strict. Adductor isolation.
- **Group derivation:** adductors → `legs`.
- **Notes:** 0 secondaries — strictest isolation. Direct counterpart to Hip Abduction Machine.

---

### 17. Machine Hip Thrust (P1 #52)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `lowerBack` — stabilizer
  - `abs` — stabilizer
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent — same map as Barbell Hip Thrust (P0 #6). Dedicated machine doesn't reduce secondaries vs free-weight BB version because the hip extension pattern is identical; pad position mimics free-weight bar placement.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries — matches Barbell Hip Thrust. Single-Leg Machine Hip Thrust (P2 #52) will inherit with obliques (stab) for unilateral variant when tagged in 45e.

---

#### Calves (2)

### 18. Standing Calf Raise (Machine) (P1 #23)

- **primary:** `calves`
- **secondary:** *(none)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Machine version of Standing Calf Raise BW (45b #10); same map (bodyweight and machine both isolate calves with no secondary). Machine adds load but doesn't recruit new muscles.
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries. Shoulder pads support axial load but machine base is fixed → no `lowerBack (stab)` tag despite axial loading (Rule 6 axial threshold is for standing compounds, not isolation machines).

---

### 19. Seated Calf Raise (P1 #24)

- **primary:** `calves`
- **secondary:** *(none)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Knee-bent position biases soleus emphasis (gastroc shortened at knee = reduced contribution) but `calves` tag in our 26-muscle taxonomy covers both gastroc + soleus; emphasis shift doesn't change map.
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries. Soleus emphasis is noted in exercise-bank but schema-level map is identical to standing calf raise — taxonomy doesn't split gastroc/soleus.

---

#### Core (7)

### 20. Cable Crunch (P1 #38)

- **primary:** `abs`
- **secondary:** *(none)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Core — same map as Crunch (45b #16). Weighted variant adds load but doesn't recruit new muscles (spinal flexion is still the only driver). Kneeling position + cable tension matches bodyweight crunch mechanics.
- **Group derivation:** abs → `core`.
- **Notes:** 0 secondaries — strictest core-direct isolation, matching Crunch. Lats not tagged — arms hold rope position passively; no active pull.

---

### 21. Pallof Press (P1 #39)

- **primary:** `obliques`
- **secondary:**
  - `abs` — synergist *(anti-extension component works alongside anti-rotation)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Core — anti-rotation. Obliques primary per principles Core convention ("obliques direct work = primary"). Anti-rotation IS the defining feature — rep fails when obliques lose the counter-rotation.
- **Group derivation:** obliques → `core`.
- **Notes:** 1 secondary. Shoulder/triceps engage to hold the press-out position but work continues if they fatigue (cable can be closer to body); they don't define the exercise. Strict isolation discipline maintained.

---

### 22. Dead Bug (P1 #40)

- **primary:** `abs`
- **secondary:**
  - `hipFlexors` — synergist *(leg-raise component — Rule 6 tag-when: "leg raise family; direct concentric hip flexion")*
  - `obliques` — stabilizer *(anti-rotation during contralateral limb movement)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — supine anti-extension with contralateral limb movement. Abs primary (spine-stable anti-extension is the driver).
- **Group derivation:** abs → `core`.
- **Notes:** 2 secondaries. `hipFlexors (syn)` included because dead bug involves concentric hip flexion to hold the start position + control the lowering — qualifies under Rule 6 leg-raise-family exception. Shoulder flexion on the arm component dropped — passive hold, not driver.

---

### 23. Bird Dog (P1 #41)

- **primary:** `abs`
- **secondary:**
  - `obliques` — synergist *(contralateral anti-rotation demand during opposite-limb extension)*
  - `glutes` — synergist *(hip extension on the raised leg)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — quadruped anti-rotation with contralateral limb extension. Abs primary (torso-rigid hold is the driver); obliques earn syn (not stab) because anti-rotation is actively resisted, not merely held.
- **Group derivation:** abs → `core`.
- **Notes:** 2 secondaries. `glutes (syn)` unusual for a core exercise but justified — hip extension on the raised leg is a concentric contribution, not a pass-through stabilizer. Rear delt/upper back engagement on the arm component dropped (passive hold under bodyweight). Logged in exception log per unusual glutes tag on core exercise.

---

### 24. Side Plank (P1 #42)

- **primary:** `obliques`
- **secondary:**
  - `abs` — synergist *(anti-lateral-flexion demand shares load with obliques)*
  - `abductors` — synergist *(lateral hip hold — glute med/min actively hold pelvis neutral)*
  - `frontDelts` — stabilizer *(shoulder support under bodyweight)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — lateral plank hold. Obliques primary per Plank parent note: "Side Plank will be separate map (obliques primary)." Distinct from front Plank (abs primary) — 45° rotation of load axis flips the primary.
- **Group derivation:** obliques → `core`.
- **Notes:** 3 secondaries. `abductors (syn)` tagged per principles Legs convention ("abductors tags on: side-plane work — Copenhagen plank" is the cited use case; side plank is functionally equivalent). rotatorCuff not tagged — unlike front plank's shoulder-under-bodyweight demand, side plank's single-arm support concentrates force through one shoulder but cuff demand is handled by deltoid mass (judgment call).

---

### 25. Hanging Knee Raise (P1 #43)

- **primary:** `abs`, `hipFlexors` *(co-primary — inherits HLR training-intent override per 45b #17)*
- **secondary:**
  - `obliques` — stabilizer *(anti-rotation on free-swing hang)*
  - `forearms` — stabilizer *(grip for the hang)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — same map as HLR with reduced ROM (knee-bent = shorter lever arm, reduced hip-flexor demand but same recruitment pattern).
- **Group derivation:** abs → `core` (tiebreak: first primary wins — matches HLR).
- **Notes:** 2 secondaries — matches HLR exactly. Per exercise-bank: distinct from HLR (easier variant, same pattern). EMG co-primary reference list: HLR already seeded in 45b; knee raise inherits without need to add.

---

### 26. Captain's Chair Knee Raise (P1 #55)

- **primary:** `abs`, `hipFlexors` *(co-primary — inherits HLR map)*
- **secondary:**
  - `obliques` — stabilizer *(anti-rotation)*
- **equipment:** `machine` *(Captain's Chair station with forearm pads + back support)*
- **parentExerciseId:** `null`
- **Template:** Core — back-supported HLR pattern. Same co-primary as HLR; forearm pads support upper arms + back pad supports torso → drop `forearms (stab)` vs HLR (no grip demand; arms rest on pads, not hanging from them).
- **Group derivation:** abs → `core`.
- **Notes:** 1 secondary — leaner than HLR because chair supports what HLR needs to stabilize. Beginner-friendly entry point to leg-raise family.

---

#### Upper-body catch-up — Triceps (1)

### 27. Machine Tricep Extension (P1 #54)

- **primary:** `triceps`
- **secondary:**
  - `forearms` — stabilizer *(grip on attachment)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Extension — seated selectorized machine. Matches Tricep Pushdown (45b #15) approach but machine discipline drops `frontDelts (stab)` — seated back-supported machine with pad-held upper arms removes the anterior-shoulder stabilization demand that earns the pushdown's frontDelts tag.
- **Group derivation:** triceps → `arms`.
- **Notes:** 1 secondary — strictest tricep-machine discipline. **Scope catch-up:** was missed from 45c's upper-body pass; 45d's scope range placed it in the machine cluster alongside #51/#52/#55. Logged in exception log per scope-handoff.

---

## Session 45d — End-of-session sanity check

Run against the full 27 entries above (3 Hinge + 8 Quads + 2 Hamstrings + 4 Glutes + 2 Calves + 7 Core + 1 Triceps):

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle (`neck` / `rotatorCuff`)
- [x] No entry has >2 primaries — 7 entries at co-primary, all justified: Trap Bar DL, Sumo DL, Stiff-Leg DL (Hinge template), Walking/Reverse/Step-Up/Split Squat (Lunge template — unilateral shift), 45° Hyperextension (Hinge), Hanging Knee Raise + Captain's Chair (HLR map inheritance)
- [~] No entry has >5 secondaries — **Front Squat at 6 flagged** (accepted per Squat parent precedent; front-rack upperBack tag swaps in for calves to stay at template max). Sumo DL at 5 (at ceiling, within Hinge template discipline).
- [x] No muscle appears in both primary and secondary on same entry
- [x] `parentExerciseId` populated per rule: all 27 null
- [x] `equipment` populated on every entry (27/27)
- [x] Tagging style reads consistent — Hinge template applied uniformly (co-primary glutes+hamstrings, forearms stab for grip, lowerBack stab); Lunge template co-primary applied uniformly with 4-sec discipline per BSS precedent; Isolation maintained strictly (Leg Ext, Hip Abd, Hip Add, Calf Raise Machine, Seated Calf, Crunch all at 0 secondaries); Machine discipline reduces secondaries (Hack Squat 3, Smith Machine Squat 5, Machine Tricep Ext 1).

**Session 45d status: CLOSED** (2026-04-23). 27 entries drafted; user accepted all 6 flagged exceptions. Ready for Session 45e (P5 variants + P2 + P3).

---

## Session 45e — P5 variants + P2 + P3 (89 entries)

**Scope:** 25 P5 variants (inherit from 45a parents — light pass per Rule 4) + 53 P2 + 11 P3 (medium pass per principles EMG policy). Final EMG override from principles-doc queued list locks here: **Narrow-Grip Pull-Up** (P5 #18) `[lats, biceps]` per Pull-Up Rule 1 override.

**Conventions for this session:**
- P5 variants follow Rule 4: `parentExerciseId` set; muscles noted as `// inherit from parent`. Tier 3 fields (bias, grip, stance) populated per variant identity.
- P2/P3 entries get full muscle blocks; cite template / parent precedent inline.
- Machine discipline applied per Leg Press / Hack Squat / Machine Chest Press precedents.

### Full entry blocks — Session 45e

#### P5 — Bench Press variants (2)

### 1. Paused Bench Press (P5 #1)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **bias:** `paused`
- **parentExerciseId:** Bench Press (Seed #1)
- **Notes:** 1–3s pause at chest. Timing variant — Rule 4 inherit, no map change.

---

### 2. Spoto Press (P5 #2)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **bias:** `paused`
- **parentExerciseId:** Bench Press (Seed #1)
- **Notes:** ~1" floating pause above chest. Eccentric-control emphasis; same recruitment as parent per Rule 4.

---

#### P5 — Squat variants (4)

### 3. Low-Bar Back Squat (P5 #3)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** Squat (Seed #11)
- **Notes:** Bar on rear delts (not high-bar shelf); more horizontal torso. Posterior-chain emphasis shift only — Rule 4 variant per Parent/Variant Rule.

---

### 4. Safety Bar Squat (P5 #4)

- **muscles:** inherit from parent
- **equipment:** `barbell` *(SSB = specialized barbell family)*
- **stanceWidth:** `shoulder`
- **parentExerciseId:** Squat (Seed #11)
- **Notes:** Yoke/handles allow neutral wrist + slightly more upright torso. Implement variant — same map.

---

### 5. Box Squat (P5 #5)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **bias:** `paused`
- **parentExerciseId:** Squat (Seed #11)
- **Notes:** Brief seated pause on box at parallel/below. Pause/timing variant — same map.

---

### 6. Paused Squat (P5 #6)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **bias:** `paused`
- **parentExerciseId:** Squat (Seed #11)
- **Notes:** 1–3s pause at bottom. Timing variant.

---

#### P5 — Deadlift variants (4)

### 7. Rack Pull (P5 #7)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **bias:** `partial` *(pin-set partial ROM from above-knee or mid-shin)*
- **parentExerciseId:** Deadlift (Seed #6)
- **Notes:** Partial-ROM Hinge variant — same map (lockout-emphasis, not a map shift).

---

### 8. Block Pull (P5 #8)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **bias:** `partial`
- **parentExerciseId:** Deadlift (Seed #6)
- **Notes:** Plates resting on blocks (typically mid-shin). Partial-ROM variant — same map.

---

### 9. Deficit Deadlift (P5 #9)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **bias:** `lengthened` *(extended ROM from elevated platform → deeper hip flexion at start)*
- **parentExerciseId:** Deadlift (Seed #6)
- **Notes:** Extended ROM increases bottom-position quad/hamstring stretch — emphasis shift, not map change.

---

### 10. Snatch-Grip Deadlift (P5 #10)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **gripWidth:** `wide`
- **gripOrientation:** `pronated`
- **parentExerciseId:** Deadlift (Seed #6)
- **Notes:** Wide grip — upper-back demand increases (still stabilizer per parent). Grip-width variant per Parent/Variant Rule.

---

#### P5 — Dips variants (3)

### 11. Tricep Dips (P5 #11)

- **muscles:** inherit from parent
- **equipment:** `bodyweight`
- **parentExerciseId:** Dips (Seed #25)
- **Notes:** Vertical torso, elbows tucked. Triceps-emphasis variant — same co-primary map per Dips parent (torso angle is emphasis, not map shift). Group derivation stays `chest` (first-primary tiebreak).

---

### 12. Chest Dips (P5 #12)

- **muscles:** inherit from parent
- **equipment:** `bodyweight`
- **parentExerciseId:** Dips (Seed #25)
- **Notes:** Forward lean, elbows slightly flared. Chest-emphasis variant — same co-primary map.

---

### 13. Weighted Dip (P5 #13)

- **muscles:** inherit from parent
- **equipment:** `bodyweight` *(plate/DB load tracked via weight field; implement family stays bodyweight per Pull-Up precedent)*
- **parentExerciseId:** Dips (Seed #25)
- **Notes:** Belt + plates or DB between ankles. Load progression — same map. Exercise-bank flagged this may be redundant with parent + load tracking; kept as separate entry per current bank state.

---

#### P5 — Lat Pulldown variants (3)

### 14. Close-Grip Lat Pulldown (P5 #14)

- **muscles:** inherit from parent
- **equipment:** `cable`
- **gripWidth:** `narrow`
- **gripOrientation:** `pronated`
- **parentExerciseId:** Lat Pulldown (Seed #9)
- **Notes:** Narrow overhand grip. Grip-width variant; same Vertical pull map.

---

### 15. V-Bar Lat Pulldown (P5 #15)

- **muscles:** inherit from parent
- **equipment:** `cable`
- **gripWidth:** `narrow`
- **gripOrientation:** `neutral`
- **parentExerciseId:** Lat Pulldown (Seed #9)
- **Notes:** Neutral-grip V-bar attachment. Grip-orientation variant; brachialis emphasis still covered by parent's existing brachialis (syn) tag.

---

### 16. Reverse-Grip Lat Pulldown (P5 #16)

- **muscles:** inherit from parent
- **equipment:** `cable`
- **gripWidth:** `medium`
- **gripOrientation:** `supinated`
- **parentExerciseId:** Lat Pulldown (Seed #9)
- **Notes:** Supinated grip. Bicep-emphasis shift — but Curl-template-style co-primary `[lats, biceps]` rejected for the cable-loaded version (no bodyweight amplification; same logic as Pull-Up vs Lat Pulldown EMG-policy split). Same map as Lat Pulldown parent.

---

#### P5 — Romanian Deadlift variant (1)

### 17. Paused RDL (P5 #17)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **bias:** `paused`
- **parentExerciseId:** Romanian Deadlift (Seed #12)
- **Notes:** 1–3s pause at mid-shin (hamstring-stretch emphasis). Timing variant — same map.

---

#### P5 — Pull-Up variant (1) — EMG override

### 18. Narrow-Grip Pull-Up (P5 #18)

- **primary:** `lats`, `biceps` *(co-primary per Pull-Up Rule 1 override — narrow pronated grip amplifies biceps to co-primary status, matching Chin-Up treatment despite pronated grip; closes principles-doc queued EMG override)*
- **secondary:**
  - `upperBack` — synergist *(demoted from co-primary vs Pull-Up parent; biceps takes its place as the second primary)*
  - `brachialis` — synergist
  - `rearDelts` — synergist
  - `forearms` — stabilizer *(grip)*
- **equipment:** `bodyweight`
- **gripWidth:** `narrow`
- **gripOrientation:** `pronated`
- **parentExerciseId:** Pull-Up (Seed #7)
- **Template:** Vertical pull — Narrow-Grip Pull-Up override. Map diverges from Pull-Up parent (biceps replaces upperBack at co-primary slot) — structural variant linkage preserved per CE2 architecture (matches Chin-Up treatment from 45b).
- **Group derivation:** lats → `back` (first primary; matches Pull-Up parent).
- **Notes:** 4 secondaries. Logs as map-divergence-with-parent-FK exception (same pattern as Chin-Up #22 in 45b). EMG co-primary reference list: move from "Queued for 45d onward" → "Non-parents (session 45e)".

---

#### P5 — Skull Crusher variants (2)

### 19. Dumbbell Skull Crusher (P5 #19)

- **muscles:** inherit from parent
- **equipment:** `dumbbell`
- **parentExerciseId:** Skull Crusher (Seed #24)
- **Notes:** Both DBs or one in each hand. Implement variant — same map. Forearms (stab) inheritance covers DB grip; cuff (stab) preserved per Rule 5 supine-weighted-tricep use case.

---

### 20. Incline Skull Crusher (P5 #20)

- **muscles:** inherit from parent
- **equipment:** `barbell` *(EZ-bar default)*
- **bias:** `lengthened` *(incline bench → triceps long-head stretched at top)*
- **parentExerciseId:** Skull Crusher (Seed #24)
- **Notes:** Slight bench incline — stretches long head of triceps. Emphasis shift (lengthened-bias), same map.

---

#### P5 — Barbell Curl variant (1)

### 21. Strict Curl (P5 #21)

- **muscles:** inherit from parent
- **equipment:** `barbell`
- **gripOrientation:** `supinated`
- **parentExerciseId:** Barbell Curl (Seed #21)
- **Notes:** Back against wall/pad; zero body English. Form-discipline variant — same recruitment map (abs stab still applies — pad-supported but axially loaded standing position is preserved; if leaned against pad with no axial load, abs would drop, but canonical strict curl keeps standing posture).

---

#### P5 — Plank variants (2)

### 22. Knee Plank (P5 #22)

- **muscles:** inherit from parent
- **equipment:** `bodyweight`
- **parentExerciseId:** Plank (Seed #26)
- **Notes:** Knees on floor regression. Reduced load only — same recruitment pattern.

---

### 23. Weighted Plank (P5 #23)

- **muscles:** inherit from parent
- **equipment:** `bodyweight` *(plate on upper back tracked via load field, like Weighted Dip)*
- **parentExerciseId:** Plank (Seed #26)
- **Notes:** Plate on upper back. Load progression only — same map.

---

#### P5 — Cable Crossover variants (2)

### 24. Cable Crossover — High (P5 #24)

- **muscles:** inherit from parent
- **equipment:** `cable`
- **parentExerciseId:** Cable Crossover (Seed #5)
- **Notes:** High-to-low path (mid/lower chest bias). Path variant — same map (fly-exception cuff-stab tag preserved per parent).

---

### 25. Cable Crossover — Low (P5 #25)

- **muscles:** inherit from parent
- **equipment:** `cable`
- **parentExerciseId:** Cable Crossover (Seed #5)
- **Notes:** Low-to-high path (upper chest bias). Path variant — same map. Serratus considered (low-to-high reaches past horizontal at top) but not added: cable height changes ROM endpoint, not the fundamental adduction pattern; sticking with parent's no-serratus discipline.

---

#### P2 — Chest (5)

### 26. Decline Dumbbell Bench Press (P2 #1)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist *(reduced vs flat — decline angle shifts away from shoulder flexion)*
  - `rotatorCuff` — stabilizer *(separate dumbbells require independent stabilization)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Horizontal push. Inherits Decline Bench Press (45c #1) angle profile + DB Bench Press (45b #19) implement profile — drop `lats (stab)` (no bar-tightness with separate DBs, per DB Bench precedent).
- **Group derivation:** chest → `chest`.
- **Notes:** 3 secondaries — matches DB Bench profile with decline-angle frontDelts reduction.

---

### 27. Incline Dumbbell Fly (P2 #4)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(more active than flat fly; incline shoulder-flexion angle)*
  - `rotatorCuff` — stabilizer *(fly exception — Isolation template)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — fly exception applied (inherits DB Fly 45b #3 fly-exception precedent). Incline angle increases frontDelt contribution slightly but doesn't change template.
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries — matches DB Fly profile.

---

### 28. Dumbbell Pullover (P2 #5)

- **primary:** `chest`
- **secondary:**
  - `lats` — synergist *(long-head shoulder extension contributes meaningfully through ROM — pullover is a known chest/back hybrid)*
  - `triceps` — synergist *(elbow held in slight flexion isometrically; long head crosses shoulder, contributes to shoulder extension)*
  - `serratus` — synergist *(overhead reach engages scap upward rotation)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** No clean template — chest-focused single-joint with overhead pull component. Default tag = chest primary per conventional categorization (exercise-bank lists as Chest); lats syn covers the back-bias cue noted in exercise-bank.
- **Group derivation:** chest → `chest`.
- **Notes:** 3 secondaries. Co-primary `[chest, lats]` considered + rejected — pullover is chest-dominant on neutral-elbow execution; back-biased cue is a form variation, not the default. If user wants back-bias as canonical, flip to lats-primary at audit.

---

### 29. Smith Machine Bench Press (P2 #35)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist
- **equipment:** `smith`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — Smith variant. Fixed bar path removes `rotatorCuff (stab)` + `lats (stab)` from Bench Press parent (matches Machine Chest Press 45c #2 discipline + Smith Machine Squat 45d #10 fixed-path treatment).
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries — matches Machine Chest Press. Smith fixes path; no bench-tightness-via-bar-control demand.

---

### 30. Smith Machine Incline Bench Press (P2 #36)

- **primary:** `chest`
- **secondary:**
  - `frontDelts` — synergist *(incline emphasis precedes triceps per Incline BB Bench 45b #2 EMG note)*
  - `triceps` — synergist
- **equipment:** `smith`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal push — Smith incline variant. Inherits Incline BB Bench (45b #2) angle profile + Smith machine discipline (drops cuff, serratus stays out per Smith fixed-path).
- **Group derivation:** chest → `chest`.
- **Notes:** 2 secondaries — matches Smith Bench Press discipline with incline frontDelt-precedes-triceps order.

---

#### P2 — Back (7)

### 31. Chest-Supported T-Bar Row (P2 #6)

- **muscles:** inherit from parent
- **equipment:** `barbell` *(T-bar / landmine)*
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null` *(separate exercise — chest pad changes stabilizer profile vs free T-Bar; structural variant flagged for end-of-curation audit if EB-style parent linkage desired)*
- **Template:** Horizontal pull — inherits Chest-Supported DB Row (45c #7) map verbatim (chest pad drops `lowerBack (stab)` from full template).
- **Group derivation:** lats → `back`.
- **Notes:** 4 secondaries — matches Chest-Supp DB Row + Iso-Lat Low Row (45c #10). `parentExerciseId: null` per same logic as those entries (chest-supported variants tagged as standalone, not Bent-Over Row variants).

---

### 32. Pendlay Row (P2 #7)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null` *(per exercise-bank Bent-Over Row note: "continuous-tension distinct from Pendlay dead-stop and Yates more-upright" — three are listed as separate exercises in bank, not parent/variant)*
- **Template:** Horizontal pull — same map as Bent-Over BB Row (45b #5). Dead-stop reset on floor between reps doesn't change recruitment pattern.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — matches Bent-Over BB Row exactly.

---

### 33. Inverted Row (P2 #8)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `abs` — stabilizer *(rigid-body anti-sag throughout horizontal hold — matches Push-Up rationale 45b #4)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `bodyweight`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated` *(rings/TRX neutral common; default barbell pronated)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — bodyweight variant. `lowerBack (stab)` dropped (no hip-hinge — supine horizontal body position); `abs (stab)` added per push-up-style rigid-body anti-sag demand.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — at ceiling, justified for bodyweight horizontal pull with rigid-body demand.

---

### 34. Straight-Arm Pulldown (P2 #9)

- **primary:** `lats`
- **secondary:**
  - `triceps` — stabilizer *(elbows locked through ROM under cable load)*
  - `abs` — stabilizer *(standing axial under cable forward-pull resistance)*
- **equipment:** `cable`
- **gripWidth:** `shoulder`
- **gripOrientation:** `pronated` *(straight-bar default)*
- **parentExerciseId:** `null`
- **Template:** Isolation — single-joint shoulder extension via lats only (elbows locked = no biceps recruitment). Strict isolation — 1 syn + 1 stab maintained.
- **Group derivation:** lats → `back`.
- **Notes:** 2 secondaries. UpperBack not tagged — cable straight-arm path doesn't drive scap retraction the way rows do. Long-head triceps spans shoulder but its primary action here is anti-flexion at elbow under load — stabilizer.

---

### 35. Single-Arm Lat Pulldown (P2 #10)

- **primary:** `lats`
- **secondary:**
  - `upperBack` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `rearDelts` — synergist
  - `forearms` — stabilizer *(grip)*
  - `obliques` — stabilizer *(unilateral cable load → anti-rotation)*
- **equipment:** `cable`
- **gripOrientation:** `neutral` *(D-handle default)*
- **parentExerciseId:** `null` *(per exercise-bank: not flagged as Lat Pulldown variant; treated as standalone unilateral variant)*
- **Template:** Vertical pull — inherits Lat Pulldown (Seed #9) map + adds `obliques (stab)` for unilateral anti-rotation demand.
- **Group derivation:** lats → `back`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per unilateral-loading addition (obliques is the single addition over parent's 5). Logged in exception log.

---

### 36. Yates Row (P2 #34)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist *(more active vs Bent-Over BB Row — supinated grip increases biceps recruitment per typical Yates execution)*
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(more upright torso vs Bent-Over Row but still hinged)*
- **equipment:** `barbell`
- **gripWidth:** `medium`
- **gripOrientation:** `supinated` *(Yates default — distinguishes from pronated Bent-Over BB Row)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — same map as Bent-Over BB Row (45b #5). Upright-torso + supinated grip = back-thickness bias (emphasis), not map shift.
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — matches Bent-Over BB Row.

---

### 37. Smith Machine Row (P2 #37)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
  - `lowerBack` — stabilizer *(hip hinge held under axial load; Smith fixes path but spinal load preserved like Smith Machine Squat 45d #10)*
- **equipment:** `smith`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — Smith variant. Same map as Bent-Over BB Row; Smith fixes path but doesn't reduce stabilizer demand because the limiter is grip + hip-hinge hold, not bar-path drift (matches Smith Machine Squat reasoning — fixed path doesn't drop axial-stabilizer tags).
- **Group derivation:** lats → `back`.
- **Notes:** 5 secondaries — matches Bent-Over BB Row. Rehab-friendly per exercise-bank.

---

#### P2 — Hamstrings (5)

### 38. Nordic Curl (P2 #11)

- **primary:** `hamstrings`
- **secondary:**
  - `calves` — synergist *(gastroc crosses knee; eccentric contribution under heavy bodyweight)*
  - `glutes` — stabilizer *(neutral pelvis hold throughout)*
  - `abs` — stabilizer *(rigid-body anti-extension during the lowering phase — torso falls under control; rigid-body demand high)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** No direct template — eccentric-emphasis knee-flexion. Hamstrings primary; calves syn matches Lying Leg Curl (45b #8) precedent.
- **Group derivation:** hamstrings → `legs`.
- **Notes:** 3 secondaries. Glutes (stab) + abs (stab) added vs Lying Leg Curl because the bodyweight-eccentric loading demands whole-body rigidity (machine version is fully supported, Nordic isn't).

---

### 39. Glute-Ham Raise (P2 #12)

- **primary:** `hamstrings`
- **secondary:**
  - `glutes` — synergist *(hip extension component is a meaningful contributor — GHR pattern combines knee flexion + hip extension)*
  - `calves` — synergist *(gastroc crosses knee; assists knee flexion)*
  - `abs` — stabilizer *(rigid-body trunk hold during the bottom range)*
- **equipment:** `bodyweight` *(GHR bench / glute-ham developer; bodyweight load profile)*
- **parentExerciseId:** `null`
- **Template:** No direct template — combined knee-flexion + hip-extension hamstring exercise. Single-primary `hamstrings` (GHR is hamstring-dominant despite glute contribution; rep fails when hamstrings give out, not glutes). Co-primary considered + rejected per Hip Thrust precedent (single-primary for the muscle that defines failure).
- **Group derivation:** hamstrings → `legs`.
- **Notes:** 3 secondaries. Glutes (syn) elevated vs Nordic Curl because GHR explicitly combines hip-extension into the movement (Nordic is knee-flexion only).

---

### 40. Good Morning (P2 #13)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — McAllister 2014 / Hinge default)*
- **secondary:**
  - `lowerBack` — synergist *(promoted to syn per Rule 6 explicit exception: "synergist only on Good Morning, 45° Back Extension — spinal extension under load is the movement")*
  - `upperBack` — stabilizer *(bar on back stays close to spine — keeps neutral)*
  - `abs` — stabilizer *(anti-flexion under axial load; matches RDL precedent)*
- **equipment:** `barbell`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Hinge — `lowerBack` promoted to synergist per Rule 6 exception (only library cases: this entry + 45° Hyperextension 45d #13).
- **Group derivation:** glutes → `legs`.
- **Notes:** 3 secondaries. Forearms (stab) dropped vs Deadlift — bar on back, no grip demand. Logged in exception log per Rule 6 lowerBack-syn promotion.

---

### 41. Single-Leg RDL (P2 #14)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template)*
- **secondary:**
  - `upperBack` — stabilizer *(weight stays close)*
  - `lowerBack` — stabilizer
  - `abs` — stabilizer *(anti-flexion)*
  - `obliques` — stabilizer *(unilateral load → anti-rotation, distinct from bilateral RDL's no-obliques tag)*
  - `calves` — stabilizer *(single-leg balance)*
- **equipment:** `dumbbell` *(DB in opposite hand or both hands; default DB)*
- **parentExerciseId:** `null`
- **Template:** Hinge — unilateral variant. Inherits RDL (Seed #12) map + adds `obliques (stab)` for unilateral anti-rotation + `calves (stab)` for single-leg balance.
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — at ceiling. Forearms (stab) dropped vs Conventional DL — DB load < BB max load, grip not the limiter.

---

### 42. Reverse Hyperextension Machine (P2 #42)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — bodyweight-loaded reverse hip extension)*
- **secondary:**
  - `lowerBack` — synergist *(promoted to syn per Rule 6 exception — same as 45° Hyperextension; spinal extension under load is the movement)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Hinge — dedicated machine. Inherits 45° Hyperextension (45d #13) treatment with even stricter discipline: machine pad supports full torso → drops `abs (stab)` (no anti-extension demand against machine).
- **Group derivation:** glutes → `legs`.
- **Notes:** 1 secondary. Strictest hinge-machine discipline. Flagged in exception log per Rule 6 lowerBack-syn promotion (third library case after Good Morning + 45° Hyperextension).

---

#### P2 — Glutes (7)

### 43. Dumbbell Hip Thrust (P2 #15)

- **muscles:** inherit from Barbell Hip Thrust (P0 #6 = 45b #24)
- **equipment:** `dumbbell`
- **parentExerciseId:** `null` *(per exercise-bank: separate entry, not BB Hip Thrust variant — implement family different)*
- **Template:** Hinge-adjacent — same map as BB Hip Thrust. DB load profile typically lighter; map preserved.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries — matches BB Hip Thrust exactly (`hamstrings`, `adductors`, `lowerBack`, `abs`).

---

### 44. Cable Kickback (P2 #16)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist *(small — hip extension assist)*
  - `obliques` — stabilizer *(unilateral cable load → anti-rotation)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Isolation — single-joint hip extension. Glutes primary; hamstrings (syn) covers the small hip-extension assist. Strict isolation discipline maintained.
- **Group derivation:** glutes → `legs`.
- **Notes:** 2 secondaries. Lower back not tagged — cable line of pull is horizontal/slight-down; no axial spinal load.

---

### 45. Smith Machine Hip Thrust (P2 #43)

- **muscles:** inherit from Barbell Hip Thrust (P0 #6 = 45b #24)
- **equipment:** `smith`
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent — Smith variant. Inherits BB Hip Thrust map; Smith fixes vertical bar path but pad-against-hips loading pattern is identical to free-weight BB version (matches Machine Hip Thrust 45d #17 reasoning — pad position preserves recruitment).
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries — matches BB Hip Thrust + Machine Hip Thrust.

---

### 46. Machine Glute Kickback (P2 #44)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist *(small)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — dedicated standing glute machine. Same map as Cable Kickback (#44 above) minus `obliques (stab)` — machine handles + chest pad neutralize the unilateral anti-rotation demand.
- **Group derivation:** glutes → `legs`.
- **Notes:** 1 secondary. Machine discipline applied — pad-supported station eliminates trunk stabilizer demand.

---

### 47. Single-Leg Hip Thrust (P2 #50)

- **primary:** `glutes`
- **secondary:**
  - `hamstrings` — synergist
  - `adductors` — synergist
  - `lowerBack` — stabilizer
  - `abs` — stabilizer
  - `obliques` — stabilizer *(unilateral load → anti-rotation, distinct from bilateral hip thrust's no-obliques tag)*
- **equipment:** `bodyweight` *(default; barbell variant also common per exercise-bank)*
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent — unilateral variant. Inherits BB Hip Thrust (45b #24) map + adds `obliques (stab)` per unilateral anti-rotation precedent (matches Single-Leg RDL #41 above).
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — at ceiling. Per exercise-bank: separate exercise from BB Hip Thrust (different stabilizer demand), not a variant — `parentExerciseId: null`.

---

### 48. Single-Leg Smith Machine Hip Thrust (P2 #51)

- **muscles:** inherit from Single-Leg Hip Thrust (P2 #50 above)
- **equipment:** `smith`
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent — Smith unilateral variant. Same 5-sec map as Single-Leg Hip Thrust; Smith fixes path but preserves unilateral anti-rotation demand (obliques stab stays).
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — matches Single-Leg Hip Thrust.

---

### 49. Single-Leg Machine Hip Thrust (P2 #52)

- **muscles:** inherit from Machine Hip Thrust (P1 #52 = 45d #17) + `obliques (stab)` for unilateral
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Hinge-adjacent — dedicated machine + unilateral variant. Inherits Machine Hip Thrust map (4 sec: hamstrings, adductors, lowerBack, abs) + adds `obliques (stab)` per unilateral pattern precedent (45d #17 note explicitly anticipated this).
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — closes 45d #17's forward reference.

---

#### P2 — Calves (3)

### 50. Leg Press Calf Raise (P2 #17)

- **muscles:** inherit from Standing Calf Raise BW (Seed #16 = 45b #10)
- **equipment:** `machine` *(performed on Leg Press station with knees locked, ankles plantarflexing only)*
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Strict 0-secondary discipline (Leg Press station replaces ankle-balance with sled support; same map as bodyweight + machine standing calf raise).
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries — matches Calf Raise BW + Standing Calf Raise Machine + Seated Calf Raise.

---

### 51. Smith Machine Calf Raise (P2 #45)

- **muscles:** inherit from Standing Calf Raise BW (Seed #16 = 45b #10)
- **equipment:** `smith`
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Smith fixes vertical path but doesn't change calf-isolation map (same as bodyweight / machine standing variants).
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries.

---

### 52. Single-Leg Dumbbell Calf Raise (P2 #53)

- **muscles:** inherit from Standing Calf Raise BW (Seed #16 = 45b #10)
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Unilateral DB variant; balance demand minor (calves themselves handle ankle stability — no separate tag justified per Calf Raise BW precedent of 0-sec strict isolation).
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries. Obliques considered + rejected — DB held in working-side hand with off-step single-leg position is not under heavy enough axial/asymmetric load to qualify per Rule 6 exclusion test.

---

#### P2 — Quads (5)

### 53. Plate-Loaded Hack Squat (P2 #40)

- **muscles:** inherit from Hack Squat (P1 #15 = 45d #6)
- **equipment:** `machine`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — machine variant. Plate-loaded vs selectorized doesn't change recruitment. Same 3-sec map as Hack Squat (matches Leg Press machine discipline).
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries. Per exercise-bank: distinct entry from Hack Squat (#15) due to typical angle/feel difference, not a map shift.

---

### 54. Vertical Leg Press (P2 #41)

- **muscles:** inherit from Leg Press (Seed #13 = 45b #7)
- **equipment:** `machine`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — machine variant. Vertical sled angle vs 45° doesn't change muscle recruitment pattern; same map as Leg Press.
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries — matches Leg Press. ROM feel differs but map preserved.

---

### 55. Forward Lunge (P2 #49)

- **muscles:** inherit from Reverse Lunge (P1 #17 = 45d #8)
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Lunge / split-stance — co-primary `[quads, glutes]` per template. Same map as Walking/Reverse Lunge (forward step pattern is the gait variant, not a map shift).
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries — matches Reverse Lunge. Per exercise-bank: distinct from Walking Lunge (no continuous gait) and Reverse Lunge (step direction); same recruitment.

---

### 56. Pendulum Squat (P2 #54)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small)*
- **equipment:** `machine`
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — dedicated machine variant. Same 3-sec map as Hack Squat / Leg Press (machine discipline: fixed arc removes lowerBack/abs/calves tags from free squat).
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries — matches Hack Squat + Leg Press machine cluster. Per exercise-bank: pure quad builder with fixed arc.

---

### 57. Belt Squat (P2 #55)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist
  - `hamstrings` — synergist *(small)*
- **equipment:** `machine` *(dedicated belt-squat machine; dip-belt + cable also common)*
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — spine-unloaded variant. Drops `lowerBack` + `abs` stabilizer tags from squat parent (no axial spinal load — weight hangs from hips below center of mass); drops `calves` (machine platform supports balance).
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries — matches machine cluster. Spine-unloaded design = training-around-injury friendly per exercise-bank.

---

#### P2 — Shoulders (5)

### 58. Machine Lateral Raise (P2 #18)

- **muscles:** inherit from Lateral Raise (Seed #18 = 45b #11)
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Isolation — same map as Cable Lateral Raise (45c #14): `sideDelts` primary + `upperTraps (syn)` + `rotatorCuff (stab)`. Machine doesn't reduce these because the upper-traps engagement is angle-driven (>90° elevation) and cuff demand is shoulder-position-driven, not implement-driven.
- **Group derivation:** sideDelts → `shoulders`.
- **Notes:** 2 secondaries — matches Cable Lateral Raise. Pad-supported torso doesn't drop cuff (cuff tag is glenohumeral position under load, not trunk stability).

---

### 59. Cable External Rotation (P2 #19)

- **primary:** `rotatorCuff` *(per anatomical reality — external rotation IS the cuff's signature movement; dedicated cuff isolation has no other prime mover. Rule 5 Dedicated-cuff-isolation exception applied per session 45e principles-doc patch.)*
- **secondary:** *(none)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Isolation — cuff isolation. Rule 5 Primary exception applied (session 45e patch).
- **Group derivation:** rotatorCuff → `shoulders` *(per Rule 5 Primary exception — cuff remains excluded from muscle-target filter chips in the picker, but exercise groups under Shoulders for catalog browsing).*
- **Notes:** 0 secondaries — strictest isolation. Rule 5 Dedicated-cuff-isolation primary exception — first of two library cases (Cable ER + DB ER).

---

### 60. Dumbbell External Rotation (P2 #20)

- **primary:** `rotatorCuff` *(same rationale as Cable ER — Rule 5 Dedicated-cuff-isolation primary exception per session 45e patch)*
- **secondary:** *(none)*
- **equipment:** `dumbbell`
- **parentExerciseId:** `null`
- **Template:** Isolation — cuff isolation, side-lying variant. Same map as Cable ER.
- **Group derivation:** rotatorCuff → `shoulders` *(per Rule 5 Primary exception; matches Cable ER)*.
- **Notes:** 0 secondaries. Rule 5 Dedicated-cuff-isolation primary exception — second of two library cases.

---

### 61. Smith Machine Overhead Press (P2 #38)

- **primary:** `frontDelts`
- **secondary:**
  - `sideDelts` — synergist
  - `triceps` — synergist
  - `upperTraps` — synergist
  - `serratus` — synergist
  - `abs` — stabilizer *(standing axial anti-extension preserved — Smith fixes path but spinal load remains)*
- **equipment:** `smith`
- **gripWidth:** `medium`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Vertical push — Smith variant. Inherits OHP (45b #1) map; Smith fixes path → drops `rotatorCuff (stab)` (matches Smith Bench / Machine Chest Press cuff-drop precedent). Abs stays (standing axial load preserved per Smith Machine Squat reasoning).
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 5 secondaries — between OHP's 6 and Machine Shoulder Press's 4 (Smith preserves standing posture so abs stays, but fixed path drops cuff).

---

### 62. Machine Shrug (P2 #39)

- **muscles:** inherit from Barbell Shrug (P0 #8 = 45b #26)
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Shrug pattern — dedicated machine. Same 3-sec map as BB Shrug + DB Shrug (45c #17): `forearms (stab)`, `lowerBack (stab)`, `neck (stab)` per Rule 5 heavy-shrug use case. Machine handles preserve all three stabilizer demands (grip + axial + neck-bracing under heavy load).
- **Group derivation:** upperTraps → `back`.
- **Notes:** 3 secondaries — matches BB Shrug + DB Shrug.

---

#### P2 — Biceps (4)

### 63. Spider Curl (P2 #21)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `dumbbell` *(EZ-bar variant also common)*
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Prone bench-supported (chest down on incline) → drops `abs (stab)` per Preacher / Incline DB Curl precedent (bench-supported = no standing axial demand).
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries — matches Preacher Curl / Incline DB Curl bench-supported profile.

---

### 64. Concentration Curl (P2 #22)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `dumbbell`
- **gripOrientation:** `supinated`
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Single-arm seated leaned-over-knee — elbow braced on inner thigh removes shoulder/torso stabilizer demand. Drops `abs (stab)` (seated bent-over, no standing axial).
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries — matches bench-supported curl profile (Preacher / Incline DB).

---

### 65. Reverse Curl (P2 #23)

- **primary:** `biceps`, `brachialis` *(co-primary per Curl template reverse-grip note: "hammer / neutral / reverse grip → brachialis co-primary")*
- **secondary:**
  - `forearms` — synergist *(brachioradialis significant in pronated curl — wrist extensors also engage to hold pronated grip under load)*
  - `abs` — stabilizer *(standing axial isolation; matches BB Curl precedent)*
- **equipment:** `barbell` *(EZ-bar variant also common)*
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Curl — co-primary per pronated-grip template branch. Tiebreak: `biceps` precedes `brachialis` (matches Hammer Curl 45b #14 ordering — larger muscle + conventional naming).
- **Group derivation:** biceps → `arms` (matches Hammer Curl).
- **Notes:** 2 secondaries. EMG co-primary reference list: add as template-default (same low citation burden as Hammer Curl — inherent to pronated/neutral grip biomechanics).

---

### 66. Machine Bicep Curl (P2 #46)

- **primary:** `biceps`
- **secondary:**
  - `brachialis` — synergist
  - `forearms` — synergist *(brachioradialis)*
- **equipment:** `machine`
- **gripOrientation:** `supinated` *(default; some machines offer hammer-grip option)*
- **parentExerciseId:** `null`
- **Template:** Curl — supinated single-primary. Selectorized seated/standing curl machine; pad-supported upper arms remove standing axial → drops `abs (stab)` per Preacher / Machine Preacher Curl precedent.
- **Group derivation:** biceps → `arms`.
- **Notes:** 2 secondaries — matches Machine Preacher Curl (45c #25) profile.

---

#### P2 — Triceps (3)

### 67. Tricep Kickback (P2 #24)

- **primary:** `triceps`
- **secondary:**
  - `rearDelts` — stabilizer *(shoulder-extended position holds upper arm parallel to torso through ROM)*
- **equipment:** `dumbbell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Extension — strict isolation, bent-over single-arm or bilateral. RearDelts (stab) per Extension template note ("rearDelts (stab) on overhead variants" — extends to shoulder-extended kickback position by analogy: upper arm held against torso under load demands rear-shoulder hold).
- **Group derivation:** triceps → `arms`.
- **Notes:** 1 secondary — extension template's "minimal" discipline maintained.

---

### 68. Bench Dips (P2 #25)

- **primary:** `triceps`
- **secondary:**
  - `frontDelts` — synergist *(shoulder extension at bottom range — bench-dip-specific)*
  - `rotatorCuff` — stabilizer *(extreme shoulder extension under bodyweight; Rule 5 cuff use case — bodyweight shoulder-loaded hold)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Extension — bodyweight tricep variant. Vertical-torso bench dip (distinct from Tricep Dips parallel-bar variant which inherits Dips co-primary chest+triceps map). Triceps single-primary because chest doesn't activate meaningfully on bench dip (torso vertical, no horizontal-adduction component).
- **Group derivation:** triceps → `arms`.
- **Notes:** 2 secondaries. Cuff (stab) included per impingement-risk extreme-shoulder-extension position (matches Upright Row #20 in 45c reasoning — Rule 5 tag-when at risk angles).

---

### 69. Seated Tricep Dip Machine (P2 #47)

- **primary:** `triceps`
- **secondary:**
  - `frontDelts` — synergist *(shoulder extension assist under fixed-path machine arc)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Extension — dedicated tricep dip machine (distinct from Machine Assisted Dip 45c #5 which is a Dips-pattern co-primary chest+triceps machine; this is a tricep-isolation machine). Pad-supported torso + back support drops `rotatorCuff (stab)` from Bench Dips map (no extreme shoulder-extension position in machine arc).
- **Group derivation:** triceps → `arms`.
- **Notes:** 1 secondary. Per exercise-bank: distinct purpose/loading from Machine Assisted Dip — this is dedicated tricep work, not assisted bodyweight dip.

---

#### P2 — Forearms (2)

### 70. Wrist Curl (P2 #26)

- **primary:** `forearms` *(wrist flexors — direct work)*
- **secondary:** *(none)*
- **equipment:** `barbell` *(BB / DB / cable all common; default BB)*
- **gripOrientation:** `supinated` *(palms-up flexor side)*
- **parentExerciseId:** `null`
- **Template:** Isolation — strictest forearm direct work. Wrist flexion under load, elbows fixed.
- **Group derivation:** forearms → `arms` *(forearms group derivation TBD if not yet locked; default to arms per conventional categorization)*.
- **Notes:** 0 secondaries — strict isolation. New Forearms category per exercise-bank Batch A.

---

### 71. Reverse Wrist Curl (P2 #27)

- **primary:** `forearms` *(wrist extensors — direct work)*
- **secondary:** *(none)*
- **equipment:** `barbell`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Isolation — wrist extension under load. Counterpart to Wrist Curl.
- **Group derivation:** forearms → `arms`.
- **Notes:** 0 secondaries. Same map as Wrist Curl with grip-orientation flipped (extensor vs flexor side).

---

#### P2 — Core (5)

### 72. Pallof Chop / Lift (P2 #28)

- **primary:** `obliques`
- **secondary:**
  - `abs` — synergist *(anti-extension component combines with anti-rotation)*
  - `frontDelts` — stabilizer *(shoulder-stabilization through diagonal cable pull)*
- **equipment:** `cable`
- **parentExerciseId:** `null`
- **Template:** Core — diagonal anti-rotation. Inherits Pallof Press (45d #21) map + adds `frontDelts (stab)` per diagonal arm-arc demand (chop/lift extends arm overhead; Pallof Press is press-out only).
- **Group derivation:** obliques → `core`.
- **Notes:** 2 secondaries — adds frontDelts vs Pallof Press's 1 secondary, justified by overhead arm extension.

---

### 73. Hollow Hold (P2 #29)

- **primary:** `abs`
- **secondary:**
  - `hipFlexors` — synergist *(legs held above floor — direct concentric hip flexion to start + hold; Rule 6 leg-raise-family tag-when criterion)*
  - `obliques` — stabilizer *(anti-rotation during hold)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Core — supine isometric anti-extension. Abs primary; hipFlexors syn per Rule 6 (leg-raise family — concentric hip flexion holds leg position).
- **Group derivation:** abs → `core`.
- **Notes:** 2 secondaries.

---

### 74. Russian Twist (P2 #30)

- **primary:** `obliques`
- **secondary:**
  - `abs` — synergist *(trunk flexion hold combines with rotation)*
  - `hipFlexors` — stabilizer *(legs held off floor in seated V-position — leg-raise-family tag adapted for hold; per Rule 6)*
- **equipment:** `bodyweight` *(weighted variants common — DB / KB / plate)*
- **parentExerciseId:** `null`
- **Template:** Core — direct rotation. Obliques primary per Core convention ("obliques direct work = primary"). Abs (syn) for the V-sit trunk-flexion hold; hipFlexors (stab) per leg-elevated position.
- **Group derivation:** obliques → `core`.
- **Notes:** 2 secondaries.

---

### 75. Decline Sit-Up (P2 #31)

- **primary:** `abs`, `hipFlexors` *(co-primary per Crunch entry note 45b #16: "Sit-Up = different map — hip flexors become co-primary once trunk rises past ~45°")*
- **secondary:**
  - `obliques` — stabilizer *(anti-rotation during decline sit-up — bench angle adds asymmetric trunk-flexion demand)*
- **equipment:** `bodyweight` *(decline bench)*
- **parentExerciseId:** `null`
- **Template:** Core — full-ROM trunk flexion. Co-primary `[abs, hipFlexors]` per Sit-Up vs Crunch map distinction documented in 45b. Tiebreak: `abs` first (matches HLR/Hanging Knee Raise/Captain's Chair convention).
- **Group derivation:** abs → `core` (first primary).
- **Notes:** 1 secondary. EMG co-primary reference list: add per Sit-Up trunk-rise-past-45° rule (Crunch note in 45b is the canonical source — codify here as locked instance).

---

### 76. Ab Crunch Machine (P2 #48)

- **muscles:** inherit from Crunch (Seed #27 = 45b #16)
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Core — same map as Crunch + Cable Crunch (45d #20). Selectorized weighted version; weight-loading doesn't recruit new muscles (spinal flexion still the only driver).
- **Group derivation:** abs → `core`.
- **Notes:** 0 secondaries — matches Crunch + Cable Crunch strictest core-direct isolation.

---

#### P2 — Carries (2)

### 77. Farmer Carry (P2 #32)

- **primary:** `forearms`, `upperTraps` *(co-primary per Loaded Carry template — "Farmer = forearms + upperTraps")*
- **secondary:**
  - `abs` — stabilizer *(anti-extension under bilateral axial load)*
  - `obliques` — stabilizer *(anti-lateral-flexion at each step gait)*
  - `lowerBack` — stabilizer *(axial standing load)*
  - `quads` — synergist *(walking gait + load support)*
  - `glutes` — synergist *(gait-driven hip extension)*
  - `calves` — synergist *(gait + balance under load)*
- **equipment:** `dumbbell` *(KB / trap bar variants common; default DB)*
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Loaded Carry — full template. New `Carries` category per exercise-bank Batch A.
- **Group derivation:** forearms → `arms` (first primary per tiebreak).
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per Loaded Carry template (full-body integration is the defining feature; carries inherently engage gait + posture). Logged in exception log.

---

### 78. Suitcase Carry (P2 #33)

- **primary:** `forearms`, `upperTraps` *(co-primary — matches Farmer Carry; one-side load is the variation)*
- **secondary:**
  - `obliques` — synergist *(unilateral load → anti-lateral-flexion is the defining feature, promoted to syn vs Farmer's stab)*
  - `abs` — stabilizer *(anti-extension)*
  - `lowerBack` — stabilizer
  - `quads` — synergist *(gait)*
  - `glutes` — synergist *(gait)*
  - `calves` — synergist *(gait)*
- **equipment:** `dumbbell` *(KB common)*
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Loaded Carry — unilateral variant. Inherits Farmer Carry map + promotes `obliques` from stab → syn (one-sided load makes anti-lateral-flexion the signature).
- **Group derivation:** forearms → `arms`.
- **Notes:** 6 secondaries — matches Farmer Carry count; same template-driven exception accepted.

---

#### P3 — Back (1)

### 79. Meadows Row (P3 #1)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip — single-arm, often heavier per side than bilateral row)*
  - `lowerBack` — stabilizer *(bent-over hip hinge held)*
  - `obliques` — stabilizer *(unilateral landmine load → anti-rotation)*
- **equipment:** `barbell` *(barbell-in-landmine setup)*
- **gripOrientation:** `pronated` *(overhand single-arm grip on barbell sleeve)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — landmine single-arm variant. Inherits T-Bar Row (45c #8) map + adds `obliques (stab)` for unilateral anti-rotation.
- **Group derivation:** lats → `back`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per unilateral-loading addition (obliques is the single addition over standard horizontal-pull template at 5).

---

#### P3 — Quads (1)

### 80. Sissy Squat (P3 #3)

- **primary:** `quads`
- **secondary:**
  - `abs` — stabilizer *(extreme knee-flexion + lean-back position demands anti-extension trunk hold under bodyweight)*
- **equipment:** `bodyweight` *(sissy squat bench / sissy squat handle variants common)*
- **parentExerciseId:** `null`
- **Template:** Isolation — quad-extreme variant. Knees-forward extreme position + leaned-back trunk = pure quad-isolation pattern. Drops glutes/adductors/hams from Squat template (Sissy Squat eliminates hip extension — knees travel forward, hips don't extend through ROM).
- **Group derivation:** quads → `legs`.
- **Notes:** 1 secondary. Strictest quad-isolation in the library (alongside Leg Extension); abs (stab) added per extreme leaned-back trunk demand under bodyweight.

---

#### P3 — Glutes (1)

### 81. B-Stance RDL (P3 #4)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — biased toward front-leg working side)*
- **secondary:**
  - `upperBack` — stabilizer
  - `lowerBack` — stabilizer
  - `abs` — stabilizer
  - `obliques` — stabilizer *(B-stance partial-unilateral load → anti-rotation; less than full single-leg RDL but more than bilateral)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `dumbbell` *(BB also common)*
- **parentExerciseId:** `null`
- **Template:** Hinge — partial-unilateral (kickstand) variant. Inherits RDL (Seed #12) map + adds `obliques (stab)` for the B-stance asymmetric loading (between bilateral RDL and full Single-Leg RDL).
- **Group derivation:** glutes → `legs`.
- **Notes:** 5 secondaries — at ceiling. Matches Single-Leg RDL profile minus `calves (stab)` (B-stance maintains rear-foot ground contact for balance — calves aren't a balance limiter).

---

#### P3 — Calves (2)

### 82. Donkey Calf Raise (P3 #5)

- **muscles:** inherit from Standing Calf Raise BW (Seed #16 = 45b #10)
- **equipment:** `bodyweight` *(traditionally with partner on lower back; donkey-calf-raise machine variant also exists)*
- **parentExerciseId:** `null`
- **Template:** Isolation — calf. Hip-hinged position (bent-over) emphasizes gastroc stretch but doesn't change muscle map (calves still single-primary, no secondaries).
- **Group derivation:** calves → `legs`.
- **Notes:** 0 secondaries — matches Calf Raise BW + Standing Calf Raise Machine + Seated Calf Raise + Leg Press Calf Raise + Smith Calf Raise.

---

### 83. Tibialis Raise (P3 #12)

- **primary:** `tibialis`
- **secondary:** *(none)*
- **equipment:** `bodyweight` *(standing variant; seated tib-machine variant also exists)*
- **parentExerciseId:** `null`
- **Template:** Isolation — direct tibialis anterior work. Per Legs convention: "tibialis tags on direct raises only — Not on squats, not on calf raises."
- **Group derivation:** tibialis → `legs`.
- **Notes:** 0 secondaries — strictest isolation. Antagonist to calves; underrated for shin-splint prevention per exercise-bank.

---

#### P3 — Shoulders (1)

### 84. Cable Y-Raise (P3 #6)

- **primary:** `lowerTraps`
- **secondary:**
  - `rearDelts` — synergist *(Y motion is overhead horizontal abduction component)*
  - `upperTraps` — synergist *(scap upward rotation for the overhead Y position)*
  - `serratus` — synergist *(scap upward rotation past horizontal — Y motion reaches well past horizontal)*
- **equipment:** `cable`
- **gripOrientation:** `neutral` *(thumbs-up for Y position)*
- **parentExerciseId:** `null`
- **Template:** No direct template — overhead Y-motion targets lower traps primarily (only common library exercise where lowerTraps is primary). Lower traps depress + upward-rotate the scap; the Y-position concentrates this demand.
- **Group derivation:** lowerTraps → `back` *(per BB Shrug 45b #26 group derivation: all trapezius segments in back group)*.
- **Notes:** 3 secondaries. Only library entry with `lowerTraps` as primary (BB Shrug + DB Shrug + Machine Shrug all upperTraps; Y-Raise inverts to lower-trap focus). Logged for end-of-curation audit as the canonical lower-trap-primary exemplar.

---

#### P3 — Triceps (1)

### 85. JM Press (P3 #7)

- **primary:** `triceps` *(single-primary per principles doc note: "Close-Grip Bench has triceps co-primary [chest, triceps]; JM Press has triceps single-primary, group = arms" — distinguishes by tiebreak group derivation)*
- **secondary:**
  - `chest` — synergist *(de-emphasized vs Bench but still meaningful contributor — JM is a hybrid press/extension)*
  - `frontDelts` — synergist
  - `rotatorCuff` — stabilizer *(supine pressing position with triceps emphasis — same Rule 5 use case as Skull Crusher)*
- **equipment:** `barbell`
- **gripWidth:** `narrow`
- **gripOrientation:** `pronated`
- **parentExerciseId:** `null`
- **Template:** Hybrid Horizontal push / Extension — JM hybrid pattern between Close-Grip Bench and Skull Crusher. Triceps single-primary differentiates from Close-Grip Bench co-primary (per 45c #4 EMG override locked + principles doc clarification).
- **Group derivation:** triceps → `arms` (matches Skull Crusher group derivation; differs from Close-Grip Bench's `chest` group).
- **Notes:** 3 secondaries. JM is the canonical "triceps-primary press" — chest is meaningful but rep fails when triceps fail (vs Close-Grip where chest still drives final lockout).

---

#### P3 — Forearms (1)

### 86. Wrist Roller (P3 #8)

- **primary:** `forearms` *(both flexors and extensors — alternating concentric on each rotation)*
- **secondary:**
  - `frontDelts` — stabilizer *(arms held outstretched horizontally — sustained shoulder-flexion hold under bodyweight)*
- **equipment:** `other` *(wrist roller is a specific implement — rolled rope + plate setup)*
- **parentExerciseId:** `null`
- **Template:** Isolation — forearm direct work. Both flex and extend wrist segments engage as the rope winds. FrontDelts (stab) per outstretched-arm hold demand (distinct from Wrist Curl seated/bench-supported position).
- **Group derivation:** forearms → `arms`.
- **Notes:** 1 secondary.

---

#### P3 — Core (1)

### 87. L-Sit Hold (P3 #9)

- **primary:** `abs`, `hipFlexors` *(co-primary per HLR map inheritance — L-Sit is a hip-flexion + spine-stable hold)*
- **secondary:**
  - `triceps` — synergist *(elbow lockout under bodyweight — sustained press-down through ROM)*
  - `quads` — synergist *(knee extension hold — straight-leg L position)*
  - `obliques` — stabilizer *(anti-rotation)*
- **equipment:** `bodyweight` *(parallettes / dip bars / floor variants)*
- **parentExerciseId:** `null`
- **Template:** Core — combined hip-flexion hold + arm-support press. Inherits HLR co-primary + adds `triceps (syn)` + `quads (syn)` per the additional load-bearing demands (HLR is hanging, no triceps/quads; L-Sit is supported, both engage).
- **Group derivation:** abs → `core` (tiebreak: first primary).
- **Notes:** 4 secondaries.

---

#### P3 — Carries (2)

### 88. Overhead Carry (P3 #10)

- **primary:** `frontDelts` *(single-primary — Loaded Carry template suggests "Overhead = frontDelts + rotatorCuff" co-primary, but Rule 5 forbids cuff-as-primary; resolved by keeping cuff as **synergist** per Rule 5 face-pull-style synergist exception — overhead carry has continuous concentric cuff demand throughout gait)*
- **secondary:**
  - `rotatorCuff` — synergist *(Rule 5 synergist exception applied — second library case after face pull; overhead-loaded gait demands continuous active cuff stabilization through ROM, not just isometric hold)*
  - `upperTraps` — synergist *(scap upward rotation sustained throughout overhead hold)*
  - `serratus` — synergist *(scap upward rotation past horizontal)*
  - `triceps` — synergist *(elbow extension lockout sustained under load + gait)*
  - `abs` — stabilizer *(anti-extension under overhead-loaded gait)*
  - `obliques` — stabilizer *(anti-lateral-flexion gait)*
  - `lowerBack` — stabilizer
  - `quads` — synergist *(gait)*
  - `glutes` — synergist *(gait)*
  - `calves` — synergist *(gait)*
- **equipment:** `kettlebell` *(KB / DB / BB all common; KB default for one-handed common form)*
- **parentExerciseId:** `null`
- **Template:** Loaded Carry — overhead variant. Avoids cuff-as-primary by promoting cuff to synergist instead (Rule 5 face-pull exception extended to overhead carry — the only library entries with cuff-as-syn).
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 10 secondaries — heavily flagged. Overhead carry is exceptionally full-body (overhead hold + gait + bracing); template-driven count accepted per Farmer/Suitcase Carry precedent of high-secondary loaded carries. Logged in exception log + flagged for user to confirm cuff-as-synergist treatment matches intent.

---

### 89. Zercher Carry (P3 #11)

- **primary:** `upperBack`, `biceps` *(co-primary — Zercher hold uses crook-of-elbow grip; biceps work isometrically under heavy load through gait + upper back maintains scap-packed posture against forward load)*
- **secondary:**
  - `forearms` — stabilizer *(grip — wrists flexed under bar-in-elbow-crook pressure)*
  - `abs` — stabilizer *(anti-extension under front-loaded axial demand)*
  - `obliques` — stabilizer *(anti-lateral-flexion gait)*
  - `lowerBack` — stabilizer *(axial standing load + slight forward lean)*
  - `quads` — synergist *(gait)*
  - `glutes` — synergist *(gait)*
  - `calves` — synergist *(gait)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Loaded Carry — front-rack-equivalent variant (Zercher uses elbow crook, not shoulders). Co-primary `[upperBack, biceps]` reflects the bear-hug isometric demand: biceps holds the bar against forward gravity, upper back holds scap-packed posture against the same forward load.
- **Group derivation:** upperBack → `back` (first primary per tiebreak).
- **Notes:** 7 secondaries — flagged per ≤5 soft threshold; accepted per Loaded Carry template precedent (Farmer/Suitcase/Overhead all flagged similarly). Co-primary `[upperBack, biceps]` is the unique Zercher signature — no other library entry pairs these as primaries.

---

## Session 45e — End-of-session sanity check

Run against the full 89 entries above (25 P5 + 53 P2 + 11 P3):

- [x] Every entry has ≥1 primary
- [~] No primary lists a background muscle (`neck` / `rotatorCuff`) — **VIOLATED on Cable ER (#59) + DB ER (#60)** by deliberate Rule 5 override; flagged for user accept/reject + proposed Rule 5 patch
- [x] No entry has >2 primaries — co-primary entries: Narrow-Grip Pull-Up (Pull-Up override), Good Morning + Reverse Hyper + B-Stance RDL (Hinge), Forward Lunge inheritance (Lunge), Decline Sit-Up (sit-up co-primary), L-Sit (HLR inheritance), Reverse Curl (Curl pronated-grip co-primary), Farmer/Suitcase Carry (Loaded Carry template), Zercher Carry (unique upperBack+biceps)
- [~] No entry has >5 secondaries — **flagged**: Single-Arm Lat Pulldown (#35) at 6, Farmer Carry (#77) at 6, Suitcase Carry (#78) at 6, Meadows Row (#79) at 6, Overhead Carry (#88) at 10, Zercher Carry (#89) at 7. Carries explained by Loaded Carry template (full-body gait engagement); unilateral-load entries explained by obliques addition over template default
- [x] No muscle appears in both primary and secondary on same entry
- [x] Every variant has `parentExerciseId` set: 25 P5 entries all populated; P2/P3 entries all `null` per standalone treatment
- [x] `equipment` populated on every entry (89/89)
- [x] Tagging style reads consistent — Rule 4 inheritance pattern uniform across all 25 P5 entries; machine discipline applied consistently (Smith preserves axial → keeps abs/lowerBack; pad-supported drops cuff/lats); fly exception extended consistently to Incline DB Fly (#27); HLR map inherited consistently to L-Sit (#87); cuff conflict surfaced as exception not silently overridden

---

## Session 45f — P4 plyo + KB + conditioning (19 entries)

Scope: 18 P4 entries (Plyometric 7 + Kettlebell 4 of 6 + Conditioning 7) + 1 new Conditioning entry (**Sled Row** — exercise-bank split per user direction 2026-04-24; P4 count 30 → 31; library 213 → 214). Panel-of-coaches consult applied per entry (Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols).

**Parked:** Power/Olympic (10) + KB Clean + KB Snatch = 12 entries deferred pending Olympic-lift template research (Q1 deferred by user 2026-04-24; revisit in future session).

**Library-wide cross-curation validation** executed alongside (results in Cross-Curation Validation Pass block below).

### Full entry blocks — Session 45f

#### Plyometric (7)

### 90. Box Jump (P4 #11)

- **primary:** `quads` *(Squat-pattern primary; dominant extensor in explosive vertical jump per EMG)*
- **secondary:**
  - `glutes` — synergist *(hip extension through propulsion phase)*
  - `hamstrings` — synergist *(hip extension + knee flexion at tuck)*
  - `calves` — synergist *(ankle plantarflexion — triple extension finish)*
- **equipment:** `bodyweight` *(box is target, not implement)*
- **parentExerciseId:** `null`
- **Template:** Plyometric — Squat-pattern vertical jump. Minimal secondary tagging per plyo isolation discipline.
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries. Triple-extension kinetic chain (quads-glutes-hams-calves); abs + lowerBack dropped (bodyweight-only + non-hinge = Rule 6 defaults skip).

---

### 91. Broad Jump (P4 #12)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist *(hip extension — heavier role than Box Jump due to horizontal vector)*
  - `hamstrings` — synergist
  - `calves` — synergist *(plantarflexion finish)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Plyometric — horizontal-jump variant. Same map as Box Jump; hip-extensor emphasis shift is intensity, not map.
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries.

---

### 92. Depth Jump (P4 #13)

- **primary:** `quads`
- **secondary:**
  - `calves` — synergist *(reactive SSC — elevated role vs Box Jump; reordered first to reflect SSC emphasis)*
  - `glutes` — synergist
  - `hamstrings` — synergist *(eccentric landing control)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Plyometric — stretch-shortening-cycle reactive variant.
- **Group derivation:** quads → `legs`.
- **Notes:** 3 secondaries. Calves reordered first to reflect amortization-phase peak.

---

### 93. Pogo Hop (P4 #14)

- **primary:** `calves` *(ankle-dominant reactive plantarflexion IS the exercise)*
- **secondary:**
  - `quads` — stabilizer *(isometric knee-lock; no concentric knee extension through ROM)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Plyometric — ankle-isolation variant. Diverges from squat-pattern plyos; strictest isolation in plyo category.
- **Group derivation:** calves → `legs`.
- **Notes:** 1 secondary. Narrowest muscle map of any plyometric; triple-extension pattern collapses to ankle-only per stiff-leg hopping mechanics.

---

### 94. Clap Push-Up (P4 #15) — variant of Push-Up

- **primary:** `chest` *(inherit from Push-Up Seed #4)*
- **secondary:** *(inherit from parent)*
- **equipment:** `bodyweight`
- **bias:** `explosive` *(plyo intensity variant — new Tier 3 `bias` value; flag for principles-doc convention update)*
- **parentExerciseId:** `<Push-Up Seed #4>`
- **Template:** Horizontal push — plyo variant of Push-Up. Same muscle map; explosive concentric is timing variant (Rule 4 inherit-from-parent).
- **Group derivation:** chest → `chest` (inherited).
- **Notes:** Promotes Push-Up from seed non-parent → parent status (12th library parent). Exercise-bank.md + recap.md updated concurrently.

---

### 95. Medicine Ball Slam (P4 #16)

- **primary:** `lats` *(explosive shoulder extension drives ball downward — rep-limiting concentric)*
- **secondary:**
  - `abs` — synergist *(trunk flexion concentric-drives slam force — role elevated vs stabilizer because flexion is active, not isometric)*
  - `frontDelts` — stabilizer *(overhead start position hold)*
- **equipment:** `other` *(medicine ball)*
- **parentExerciseId:** `null`
- **Template:** Plyometric — sagittal-plane explosive pulldown. Unique map among plyos (only upper-body-pull primary).
- **Group derivation:** lats → `back`.
- **Notes:** 2 secondaries. Rule 6 audit trimmed original draft — obliques dropped (slam is sagittal, not rotational) + lowerBack dropped (medicine-ball load < bodyweight, not a hinge). Abs-as-synergist (not stab) is the distinguishing feature.

---

### 96. Medicine Ball Chest Throw (P4 #17)

- **primary:** `chest`
- **secondary:**
  - `triceps` — synergist
  - `frontDelts` — synergist
  - `abs` — stabilizer *(standing anti-extension for explosive release)*
  - `rotatorCuff` — stabilizer *(free-path throw with stability demand — Rule 5 applies)*
- **equipment:** `other` *(medicine ball)*
- **parentExerciseId:** `null`
- **Template:** Horizontal push — standing plyo variant. Adds abs stab over Bench Press baseline (standing posture).
- **Group derivation:** chest → `chest`.
- **Notes:** 4 secondaries. Map matches Clap Push-Up pattern (both horizontal-push plyo variants); Clap Push-Up inherits Push-Up map directly, Chest Throw tagged independently due to implement + standing difference.

---

#### Kettlebell (4 of 6)

### 97. KB Swing (P4 #18)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template — ballistic hip extension drives KB; "Swing is NOT a squat" per Pavel)*
- **secondary:**
  - `forearms` — stabilizer *(grip under ballistic load — grip is strength-limiter)*
  - `lowerBack` — stabilizer
  - `abs` — stabilizer *(anti-extension at top lockout)*
  - `upperBack` — stabilizer *(scap packing at top; bar/bell stays close)*
- **equipment:** `kettlebell`
- **gripOrientation:** `neutral` *(two-handed grip on handle)*
- **parentExerciseId:** `null`
- **Template:** Hinge — ballistic variant. Inherits Deadlift/RDL template; no new structural elements.
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries. Rule 6 audit: abs + forearms + lowerBack all triggered but each matches Hinge template tag-when — no over-tagging.

---

### 98. KB Goblet Squat (P4 #19)

- **primary:** `quads`
- **secondary:**
  - `glutes` — synergist
  - `adductors` — synergist *(goblet typically deeper ROM than back-squat; adductor tag-when = deep squat)*
  - `lowerBack` — stabilizer
  - `abs` — stabilizer *(anterior load anti-extension)*
  - `upperBack` — stabilizer *(anterior anti-flexion against forward-pull of KB at chest — unique to goblet hold)*
  - `biceps` — stabilizer *(KB grip at chest — isometric hold through ROM)*
- **equipment:** `kettlebell`
- **gripOrientation:** `neutral` *(two-handed goblet around horns)*
- **stanceWidth:** `shoulder`
- **parentExerciseId:** `null`
- **Template:** Squat — anterior-load variant. Drops obliques (symmetrical load), adds upperBack + biceps (anterior-hold signature).
- **Group derivation:** quads → `legs`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per anterior-load template additions (upperBack + biceps are goblet-specific, not over-tagging).

---

### 99. Turkish Get-Up (P4 #22)

- **primary:** `abs`, `obliques` *(co-primary — trunk control across all supine-to-standing phases is rep-limiter; abs drive anti-extension, obliques drive lateral flexion through side-bridge/roll phases)*
- **secondary:**
  - `frontDelts` — synergist *(overhead arm hold — heavy contributor but not rep-limiter per user preference)*
  - `triceps` — synergist *(elbow-lock under overhead load)*
  - `rotatorCuff` — stabilizer *(multi-planar overhead — Rule 5 heavy-demand tag-when)*
  - `upperTraps` — synergist *(overhead scap elevation + upward rotation)*
  - `glutes` — synergist *(stand-up phase hip extension)*
  - `quads` — synergist *(lunge/stand phase knee extension)*
- **equipment:** `kettlebell` *(dumbbell variant common)*
- **parentExerciseId:** `null`
- **Template:** Unique — trunk-primary multi-stage full-body stability lift. No existing template fits cleanly; documented as TGU exemplar for principles-doc reference.
- **Group derivation:** abs → `core` (first primary per tiebreak; changed from draft frontDelts → shoulders per user preference 2026-04-24).
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per multi-planar full-body template precedent (Overhead Carry at 10, TGU matches full-body scope). Rule 6 audit: abs (primary) + obliques (primary) + rotatorCuff (syn) — all legitimate per multi-planar overhead demand.

---

### 100. KB Single-Leg Deadlift (P4 #23)

- **primary:** `glutes`, `hamstrings` *(co-primary per Hinge template)*
- **secondary:**
  - `obliques` — synergist *(anti-rotation under unilateral load — defining unilateral feature, promoted from stab per Meadows Row precedent)*
  - `lowerBack` — stabilizer
  - `forearms` — stabilizer *(grip — single-arm KB)*
  - `calves` — stabilizer *(single-leg balance; promoted from non-tag baseline per unilateral template)*
- **equipment:** `kettlebell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Hinge — unilateral variant. Inherits Deadlift/RDL map + promotes obliques syn (Meadows Row pattern) + adds calves stab (single-leg balance).
- **Group derivation:** glutes → `legs`.
- **Notes:** 4 secondaries.

---

#### Conditioning (7 + 1 new = 8)

### 101. Sled Push (P4 #24)

- **primary:** `quads` *(leg drive is the rep-limiting work; arm push is secondary)*
- **secondary:**
  - `glutes` — synergist *(hip extension through drive)*
  - `calves` — synergist *(triple extension forward)*
  - `chest` — synergist *(arms concentric-drive sled forward)*
  - `triceps` — synergist *(arm extension holds drive position)*
  - `abs` — stabilizer *(anti-extension in forward lean)*
- **equipment:** `other` *(sled)*
- **parentExerciseId:** `null`
- **Template:** Conditioning — leg-dominant horizontal push. Loaded-compound hybrid (lunge + push); chest/triceps tagged as true synergist because arm push is concentric, not merely bracing.
- **Group derivation:** quads → `legs`.
- **Notes:** 5 secondaries — at soft threshold; full-kinetic-chain demand accepted.

---

### 102. Sled Pull (P4 #25) — backward-walk default

- **primary:** `quads`, `glutes` *(co-primary per Lunge-pattern unilateral backward-walk gait)*
- **secondary:**
  - `hamstrings` — synergist *(hip extension during backward drive)*
  - `calves` — synergist *(plantarflexion push-off — reversed gait)*
  - `forearms` — stabilizer *(grip on handles/rope)*
  - `abs` — stabilizer *(trunk bracing under load)*
- **equipment:** `other` *(sled)*
- **parentExerciseId:** `null`
- **Template:** Conditioning — backward-walk unilateral gait. Assumes leg-drive-with-handle-hold default (not row-style; Sled Row is split entry at P4 #31).
- **Group derivation:** quads → `legs`.
- **Notes:** 4 secondaries. Original exercise-bank P4 #25 ambiguous between backward-walk and row variants; split per user direction 2026-04-24.

---

### 103. Assault Bike (P4 #26)

- **primary:** `quads` *(leg drive leads RPM output)*
- **secondary:**
  - `glutes` — synergist
  - `hamstrings` — synergist *(knee flexion recovery phase)*
  - `calves` — synergist *(plantarflex drive)*
  - `chest` — synergist *(arm push on handles)*
  - `lats` — synergist *(arm pull on handles)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Conditioning — cyclic full-body cardio. Broadest muscle map of any conditioning entry; accepted per AirDyne full-body design.
- **Group derivation:** quads → `legs`.
- **Notes:** 5 secondaries — at soft threshold.

---

### 104. Rower (P4 #27)

- **primary:** `quads` *(leg drive dominates stroke output; ~60% of power per sequence "legs → back → arms")*
- **secondary:**
  - `glutes` — synergist *(hip extension in drive)*
  - `hamstrings` — synergist
  - `lats` — synergist *(pulling phase — arms-back sequence)*
  - `upperBack` — synergist *(scap retraction in finish)*
  - `biceps` — synergist *(elbow flexion finish)*
  - `forearms` — stabilizer *(grip)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Conditioning — leg-dominant row hybrid. Only conditioning entry with back co-driven at synergist level throughout the stroke.
- **Group derivation:** quads → `legs`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per full-kinetic-chain stroke sequence (legs → back → arms).

---

### 105. Ski Erg (P4 #28)

- **primary:** `lats` *(shoulder extension is prime mover — vertical-pulldown motion)*
- **secondary:**
  - `abs` — synergist *(trunk flexion concentric-drives pulldown force)*
  - `triceps` — synergist *(elbow-lock under pulling tension — near-straight-arm pulldown)*
  - `lowerTraps` — synergist *(scap depression through pull)*
  - `lowerBack` — stabilizer *(light hinge stance)*
- **equipment:** `machine`
- **parentExerciseId:** `null`
- **Template:** Conditioning — vertical pull + trunk flex hybrid. Unique among conditioning: only entry with upper-body primary + only entry with abs as synergist (not stab).
- **Group derivation:** lats → `back`.
- **Notes:** 4 secondaries.

---

### 106. Burpee (P4 #29)

- **primary:** `quads` *(jump-up phase is the rep-limiting pattern; push-up phase is lower-intensity)*
- **secondary:**
  - `glutes` — synergist *(hip extension in jump)*
  - `calves` — synergist *(triple extension jump)*
  - `chest` — synergist *(push-up phase)*
  - `triceps` — synergist *(push-up phase)*
  - `frontDelts` — synergist *(push-up phase)*
  - `abs` — stabilizer *(bracing through transitions)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Conditioning — hybrid multi-pattern. Combines Plyometric (jump) + Horizontal push (push-up) + trunk bracing.
- **Group derivation:** quads → `legs`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per hybrid-pattern full-body conditioning.

---

### 107. Sprint (P4 #30)

- **primary:** `hamstrings`, `glutes` *(co-primary per max-velocity sprint research — hinge-pattern hip extension + knee-flex recovery; ham-strain is most common sprinting injury)*
- **secondary:**
  - `quads` — synergist *(knee extension at foot strike)*
  - `calves` — synergist *(plantarflex push-off — triple extension finish)*
  - `abs` — stabilizer *(trunk bracing at high cadence)*
  - `obliques` — stabilizer *(unilateral gait anti-rotation)*
- **equipment:** `bodyweight`
- **parentExerciseId:** `null`
- **Template:** Conditioning — max-velocity locomotion. Only conditioning entry tagged ham-primary (reflects EMG research on sprint mechanics).
- **Group derivation:** hamstrings → `legs`.
- **Notes:** 4 secondaries. Novel co-primary pattern — not covered by existing templates; added to EMG reference list.

---

### 108. Sled Row (P4 #31 — NEW)

- **primary:** `lats`, `upperBack` *(co-primary per Horizontal pull template)*
- **secondary:**
  - `rearDelts` — synergist
  - `biceps` — synergist
  - `brachialis` — synergist
  - `forearms` — stabilizer *(grip)*
  - `quads` — stabilizer *(isometric braced stance)*
  - `abs` — stabilizer *(anti-extension under pulling tension)*
- **equipment:** `other` *(sled)*
- **gripOrientation:** `neutral` *(most sleds dual-handle)*
- **parentExerciseId:** `null`
- **Template:** Horizontal pull — conditioning variant. Inherits T-Bar Row map + drops lowerBack-stab (upright stance vs bent-over row) + adds quads stab (isometric stance).
- **Group derivation:** lats → `back`.
- **Notes:** 6 secondaries — flagged per ≤5 soft threshold; accepted per horizontal-pull + isometric-leg-brace dual demand. New library entry (P4 count 30 → 31; library 213 → 214).

---

## Session 45f — End-of-session sanity check

Run against the 19 entries above:

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle (`neck` / `rotatorCuff`) — Rule 5 patch cases from 45e (Cable ER + DB ER) unchanged; no new primary-cuff entries
- [x] No entry has >2 primaries — co-primary entries: KB Swing (Hinge), KB SL-DL (Hinge), Sled Pull (Lunge), Turkish Get-Up (unique `[abs, obliques]`), Sprint (unique `[hamstrings, glutes]`), Sled Row (Horizontal pull)
- [~] No entry has >5 secondaries — **flagged**: KB Goblet Squat (#98) at 6, Turkish Get-Up (#99) at 6, Rower (#104) at 6, Burpee (#106) at 6, Sled Row (#108) at 6 — all user-reviewed and accepted
- [x] No muscle appears in both primary and secondary on same entry
- [x] Every variant has `parentExerciseId` set — Clap Push-Up (#94) → Push-Up Seed #4 (promotes Push-Up to 12th parent)
- [x] `equipment` populated on every entry (19/19)
- [x] Tagging style reads consistent — plyo isolation discipline applied uniformly (Pogo Hop narrowest map; Clap Push-Up inherits Push-Up map; all loaded conditioning entries tag abs stab per standing-load convention); Rule 6 audit trimmed Med Ball Slam over-tagging; unilateral-obliques pattern applied consistently (Sled Pull, KB SL-DL match Meadows Row / Suitcase Carry precedent)

---

## Cross-Curation Validation Pass (session 45f)

Run alongside 45f tagging per scope.

### (A) Override audit — 14 existing overrides valid + 2 new

All 45a–45e EMG overrides (Deadlift, Dips, Pull-Up, RDL, OHP-rejection, Chin-Up, Bulgarian Split Squat, Hammer Curl, Hanging Leg Raise, Close-Grip Bench, Narrow-Grip Pull-Up, Reverse Curl, Decline Sit-Up, Zercher Carry) re-verified against updated principles-doc — **no map changes triggered, all still valid.**

**2 new 45f overrides** added to principles-doc EMG reference list (patched concurrently):
- **Turkish Get-Up** `[abs, obliques]` — multi-planar stability; first library entry pairing abs + obliques as co-primary
- **Sprint** `[hamstrings, glutes]` — max-velocity locomotion; novel "max-velocity sprint mechanics" exemplar outside any existing template

**Template-default co-primaries (no override — documentation only):** KB Swing `[glutes, hamstrings]` (Hinge), KB SL-DL `[glutes, hamstrings]` (Hinge), Sled Pull `[quads, glutes]` (Lunge), Sled Row `[lats, upperBack]` (Horizontal pull).

### (B) Parent/Variant FK consistency

- **Existing 45e FKs:** 25 P5 variants + 2 structural variants (Chin-Up, Neutral-Grip Pull-Up) — all `parentExerciseId` references resolve to valid parents. Clean.
- **New 45f FK:** Clap Push-Up (#94) → Push-Up Seed #4. Push-Up promoted to **12th library parent** (was not in original 11-parent list from 45a). Exercise-bank.md + principles-doc + recap.md updated concurrently.

### (C) Group-derivation spot checks

All 45a–45f co-primary entries tiebreak-resolved consistently:

- `[glutes, hamstrings]` → `legs` (Deadlift, RDL, Good Morning, Reverse Hyper, B-Stance RDL, KB Swing, KB SL-DL) ✓
- `[hamstrings, glutes]` → `legs` (Sprint — ham-first tiebreak) ✓
- `[chest, triceps]` → `chest` (Dips, Close-Grip Bench — vs JM Press triceps-single → arms) ✓
- `[lats, upperBack]` → `back` (Pull-Up, Meadows Row, Sled Row) ✓
- `[lats, biceps]` → `back` (Chin-Up, Narrow-Grip Pull-Up) ✓
- `[quads, glutes]` → `legs` (Bulgarian Split Squat, Sled Pull) ✓
- `[biceps, brachialis]` → `arms` (Hammer Curl, Reverse Curl) ✓
- `[abs, hipFlexors]` → `core` (Hanging Leg Raise, L-Sit, Decline Sit-Up) ✓
- `[abs, obliques]` → `core` (Turkish Get-Up — abs-first tiebreak) ✓
- `[forearms, upperTraps]` → `arms` (Farmer Carry, Suitcase Carry) ✓
- `[upperBack, biceps]` → `back` (Zercher Carry) ✓
- Rule 5 cuff-as-primary: Cable ER + DB ER → `shoulders` per explicit patch ✓

**No group-derivation conflicts detected.**

---

## Session 45g — P4 Olympic + KB ballistic (12 entries)

Scope: 12 P4 entries previously parked at 45f close-out (Power/Olympic 10 + KB Clean + KB Snatch). User-led Olympic-lift template research completed 2026-04-24; six-coach panel expanded to add **Poliquin** alongside Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols. Tagging accuracy lens applied per `feedback_tagging_accuracy.md` (correct-execution + common-mistake recruitment, not extreme edge cases).

**Library ceiling re-set:** Snatch family at 12 sec, Clean & Jerk at 13 sec — supersedes Overhead Carry (P3 #10, 10 sec) as full-kinetic-chain ceiling. Defensible per six-coach consensus: Olympic lifts are categorically the most kinetic-chain-demanding exercises in the library by design.

**Library-wide cross-curation validation** executed alongside (results in Cross-Curation Validation Pass block below). Queue cleared — no parked entries remain.

### Full entry blocks — Session 45g

#### Group A — Clean family (3 of 4; KB Clean below in Group D)

### 109. Power Clean (P4 #1)

- **primary:** `glutes`, `hamstrings` *(co-primary per OL Pulling sub-pattern — Hinge base; second pull = ballistic hinge per Garhammer / Häkkinen EMG)*
- **secondary:**
  - `quads` — synergist *(scoop transition knee extension + brief front-squat catch)*
  - `upperTraps` — synergist *(explosive shrug at top of second pull — signature OL elevation)*
  - `calves` — synergist *(triple extension finish — ankle plantarflexion)*
  - `lats` — synergist *("armpits to the bar" cue keeps bar tight against body through pull — canonical USAW / Cal Strength teaching point + bail-out for bar-drift error, the #1 OL mistake)*
  - `frontDelts` — synergist *(front rack catch — bar elbows forward; rack support)*
  - `lowerBack` — stabilizer *(axial brace through pull)*
  - `forearms` — stabilizer *(grip under heavy + ballistic load)*
  - `upperBack` — stabilizer *(scap-packed posture; bar stays close)*
  - `abs` — stabilizer *(front rack axial anti-extension — KB Swing top-lockout precedent)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern + front-rack catch additions.
- **Group derivation:** glutes → `legs`.
- **Notes:** 9 secondaries — flagged per ≤5 soft threshold; accepted per OL Pulling template-driven exception. Lats added per common-mistake audit (bar drift = #1 OL error; lats are the bail-out + canonical correct-form cue).

---

### 110. Hang Clean (P4 #2)

- **primary:** `glutes`, `hamstrings`
- **secondary:** *(same as Power Clean — hang start = timing variant per Rule 4; second pull + catch unchanged; rep limiter unchanged)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern + front-rack catch additions. Hang start removes first-pull from floor.
- **Group derivation:** glutes → `legs`.
- **Notes:** 9 secondaries — same map as Power Clean.

---

### 111. Clean & Jerk (P4 #3)

- **primary:** `glutes`, `hamstrings` *(co-primary — clean phase IS the heaviest muscular work; clean must succeed before jerk attempt; jerk failure caps the rep but doesn't change muscular dominance)*
- **secondary:**
  - `quads` — synergist *(clean knee extension + jerk leg drive)*
  - `upperTraps` — synergist *(clean shrug + jerk scap upward rotation)*
  - `calves` — synergist *(triple extension on both clean pull + jerk drive)*
  - `lats` — synergist *(bar-close cue on clean pull)*
  - `frontDelts` — synergist *(clean rack catch + jerk overhead drive + lockout)*
  - `triceps` — synergist *(jerk overhead elbow lockout)*
  - `sideDelts` — synergist *(jerk vertical-push lateral arc + clean high pull)*
  - `serratus` — synergist *(jerk overhead scap upward rotation)*
  - `lowerBack` — stabilizer *(clean pull axial)*
  - `forearms` — stabilizer *(grip both phases)*
  - `upperBack` — stabilizer *(clean pull bar control + jerk dip bar-stack)*
  - `abs` — stabilizer *(front rack axial + jerk overhead axial anti-extension)*
  - `rotatorCuff` — stabilizer *(Rule 5 — jerk overhead heavy free-path)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — combined Clean + Jerk (union of both phase maps). **Library kinetic-chain ceiling.**
- **Group derivation:** glutes → `legs`.
- **Notes:** **13 secondaries — NEW LIBRARY CEILING (supersedes Overhead Carry at 10; Snatch at 12).** Defensible: only library entry combining two complete OL phases (clean second-pull + jerk overhead-receive) plus bar-close lat work spanning both. Six-coach panel consensus — every tagged muscle is meaningfully active; trimming any would degrade credibility.

---

#### Group B — Snatch family (2 of 3; KB Snatch below in Group D)

### 112. Power Snatch (P4 #4)

- **primary:** `glutes`, `hamstrings` *(co-primary per OL Pulling sub-pattern — Hinge base; second pull = rep-limiter for power output)*
- **secondary:**
  - `quads` — synergist *(scoop transition + brief overhead-squat receive)*
  - `upperTraps` — synergist *(explosive shrug at top of second pull)*
  - `calves` — synergist *(triple extension finish)*
  - `lats` — synergist *(bar-close cue + bar-drift bail-out)*
  - `frontDelts` — synergist *(punch-through + overhead lockout)*
  - `triceps` — synergist *(overhead elbow lockout)*
  - `sideDelts` — synergist *(high pull lateral abduction + turnover arc)*
  - `serratus` — synergist *(overhead scap upward rotation — Rule 6 tag-when "Overhead; true scap-up work")*
  - `upperBack` — synergist *(Poliquin snatch-grip promotion: wider grip = active scap retraction during pull)*
  - `lowerBack` — stabilizer *(pull axial brace)*
  - `forearms` — stabilizer *(grip under ballistic load)*
  - `abs` — stabilizer *(overhead axial anti-extension)*
  - `rotatorCuff` — stabilizer *(Rule 5 — overhead heavy free-path)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern + overhead-catch additions. **Sets snatch-family library ceiling.**
- **Group derivation:** glutes → `legs`.
- **Notes:** **12 secondaries — NEW LIBRARY CEILING for snatch family.** Defensible: snatch is the most full-kinetic-chain single lift in library. Six-coach panel (Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols / Poliquin) all endorse every tag; UpperBack syn (not stab) per Poliquin snatch-grip rationale.

---

### 113. Hang Snatch (P4 #5)

- **primary:** `glutes`, `hamstrings`
- **secondary:** *(same as Power Snatch — hang start = timing variant per Rule 4; rep limiter unchanged)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern + overhead-catch additions. Hang start removes first-pull from floor.
- **Group derivation:** glutes → `legs`.
- **Notes:** 12 secondaries — same map as Power Snatch.

---

#### Group C — Pulls (2)

### 114. Clean Pull (P4 #8)

- **primary:** `glutes`, `hamstrings` *(co-primary per OL Pulling sub-pattern — Hinge base)*
- **secondary:**
  - `quads` — synergist *(scoop transition knee extension)*
  - `upperTraps` — synergist *(explosive shrug at top of second pull)*
  - `calves` — synergist *(triple extension finish)*
  - `lats` — synergist *(bar-close cue + bar-drift bail-out)*
  - `lowerBack` — stabilizer *(pull axial brace)*
  - `forearms` — stabilizer *(grip)*
  - `upperBack` — stabilizer *(scap-packed posture; bar stays close)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern (no catch). Cleanest exemplar of the base OL Pulling map.
- **Group derivation:** glutes → `legs`.
- **Notes:** 7 secondaries — flagged per ≤5 soft threshold; accepted per OL Pulling template. Catch-phase additions (frontDelts, abs) intentionally absent — pull terminates at top of second pull, no rack receive.

---

### 115. Snatch Pull (P4 #9)

- **primary:** `glutes`, `hamstrings`
- **secondary:** *(same as Clean Pull, but `upperBack` promoted stab → syn per Poliquin snatch-grip: wider grip = active scap retraction during pull)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Pulling sub-pattern (no catch). Snatch-grip width = upperBack syn (Poliquin).
- **Group derivation:** glutes → `legs`.
- **Notes:** 7 secondaries — same as Clean Pull but upperBack role upgraded to syn.

---

#### Group D — Jerks + Push Press (3) + KB-ballistic (2)

### 116. Push Jerk (P4 #6)

- **primary:** `frontDelts` *(per OL Jerk sub-pattern = Vertical push template + leg drive; rep is defined by overhead lockout, not by leg drive — co-primary `[frontDelts, quads]` rejected per OHP precedent: leg drive is brief assist, lockout is the rep)*
- **secondary:**
  - `triceps` — synergist *(overhead elbow lockout — punch under bar at receive)*
  - `sideDelts` — synergist *(Vertical push template default)*
  - `upperTraps` — synergist *(scap upward rotation + lockout support)*
  - `serratus` — synergist *(scap upward rotation for overhead receive)*
  - `quads` — synergist *(leg drive from dip — concentric knee extension)*
  - `glutes` — synergist *(leg drive hip extension)*
  - `hamstrings` — synergist *(drive hip extension — recruited alongside glutes)*
  - `calves` — synergist *(triple extension drive finish)*
  - `upperBack` — stabilizer *(bar-stack through dip — bails out forward bar drift, the #1 jerk error)*
  - `rotatorCuff` — stabilizer *(Rule 5 — overhead heavy free-path)*
  - `abs` — stabilizer *(overhead axial anti-extension)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Jerk sub-pattern (Vertical push + full leg drive).
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 11 secondaries — flagged per ≤5 soft threshold; accepted per Vertical push + leg drive template. UpperBack stab added per common-mistake audit (forward bar drift in dip = #1 jerk error; upper back keeps bar racked).

---

### 117. Split Jerk (P4 #7)

- **primary:** `frontDelts`
- **secondary:** *(same as Push Jerk — split-leg catch is balanced bilateral, not unilateral; no oblique add)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Jerk sub-pattern (Vertical push + full leg drive). Split-leg catch is a foot-position variant, not a map shift.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 11 secondaries — same map as Push Jerk.

---

### 118. Push Press (P4 #10)

- **primary:** `frontDelts`
- **secondary:**
  - `triceps` — synergist *(continuous press through full ROM — heavier load than jerk's brief lockout; reordered first to reflect press-out demand)*
  - `sideDelts` — synergist *(Vertical push template)*
  - `upperTraps` — synergist *(scap upward rotation)*
  - `serratus` — synergist *(scap upward rotation)*
  - `quads` — synergist *(leg drive — initial dip-and-drive launches bar; press takes over mid-ROM)*
  - `glutes` — synergist *(leg drive hip extension)*
  - `hamstrings` — synergist *(drive hip extension)*
  - `calves` — synergist *(triple extension drive finish)*
  - `upperBack` — stabilizer *(bar-stack through dip — bails out forward bar drift)*
  - `rotatorCuff` — stabilizer *(Rule 5 — overhead heavy free-path)*
  - `abs` — stabilizer *(overhead axial anti-extension)*
- **equipment:** `barbell`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — Jerk sub-pattern. Push Press = continuous press (no catch); jerks add catch but reduce mid-ROM tricep work.
- **Group derivation:** frontDelts → `shoulders`.
- **Notes:** 11 secondaries — same map as Push Jerk; triceps reordered first to reflect full-ROM press demand.

---

### 119. KB Clean (P4 #20)

- **primary:** `glutes`, `hamstrings` *(co-primary per OL KB-ballistic sub-pattern — derived from KB Swing Hinge base, NOT from barbell Clean per Tsatsouline framework)*
- **secondary:**
  - `forearms` — stabilizer *(grip on KB handle under ballistic load)*
  - `frontDelts` — synergist *(guides KB up + receives in rack position)*
  - `upperTraps` — synergist *(finish shrug — real-world KB clean execution involves a shrug at top, even if Tsatsouline hardstyle ideal is "pure hip drive")*
  - `calves` — synergist *(triple extension finish — barbell-clean parallel for kinetic-chain consistency)*
  - `lowerBack` — stabilizer *(hinge axial brace)*
  - `abs` — stabilizer *(anti-extension at top lockout — KB Swing precedent)*
  - `obliques` — stabilizer *(single-arm anti-rotation per Suitcase Carry / Meadows Row / KB SL-DL precedent)*
- **equipment:** `kettlebell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — KB-ballistic sub-pattern (KB Swing base + rack catch additions).
- **Group derivation:** glutes → `legs`.
- **Notes:** 7 secondaries — flagged per ≤5 soft threshold; accepted per KB-ballistic template. UpperTraps tagged per real-world execution (Tsatsouline ideal = no shrug, but live execution includes one). Calves added per accuracy lens for triple-extension parallel with barbell clean.

---

### 120. KB Snatch (P4 #21)

- **primary:** `glutes`, `hamstrings` *(co-primary per OL KB-ballistic sub-pattern)*
- **secondary:**
  - `forearms` — stabilizer *(grip)*
  - `frontDelts` — synergist *(overhead drive + lockout)*
  - `triceps` — synergist *(overhead elbow lockout)*
  - `upperTraps` — synergist *(punch-through finish + scap upward rotation)*
  - `sideDelts` — synergist *(early turnover lateral abduction — barbell-snatch parallel)*
  - `serratus` — synergist *(overhead scap upward rotation — Rule 6 tag-when "Overhead")*
  - `lowerBack` — stabilizer *(hinge axial brace)*
  - `abs` — stabilizer *(overhead axial anti-extension)*
  - `obliques` — stabilizer *(single-arm anti-rotation through swing + overhead hold)*
  - `rotatorCuff` — stabilizer *(Rule 5 — overhead heavy free-path; ballistic single-arm amplifies cuff demand)*
- **equipment:** `kettlebell`
- **gripOrientation:** `neutral`
- **parentExerciseId:** `null`
- **Template:** Olympic lift / ballistic triple extension — KB-ballistic sub-pattern (KB Swing base + overhead-catch additions).
- **Group derivation:** glutes → `legs`.
- **Notes:** 10 secondaries — flagged per ≤5 soft threshold; accepted per KB-ballistic + overhead-catch template. SideDelts added per accuracy lens (barbell-snatch parallel). UpperBack intentionally absent (single-arm offset KB doesn't drive scap-pack against a bar the way barbell does).

---

## Session 45g — End-of-session sanity check

Run against the 12 entries above:

- [x] Every entry has ≥1 primary
- [x] No primary lists a background muscle (`neck` / `rotatorCuff`) — Rule 5 patch cases (Cable ER + DB ER) unchanged; no new primary-cuff entries
- [x] No entry has >2 primaries — co-primary `[glutes, hamstrings]` on 9 entries (all clean / snatch / pull variants + KB Clean + KB Snatch); single-primary `frontDelts` on 3 entries (Push Jerk, Split Jerk, Push Press)
- [~] No entry has >5 secondaries — **flagged: ALL 12 entries over threshold**, all template-driven OL exceptions per six-coach panel consensus + accuracy-lens application:
  - Power Clean (#109) at 9, Hang Clean (#110) at 9, **Clean & Jerk (#111) at 13 [LIBRARY CEILING]**
  - **Power Snatch (#112) at 12 [snatch CEILING]**, Hang Snatch (#113) at 12
  - Clean Pull (#114) at 7, Snatch Pull (#115) at 7
  - Push Jerk (#116) at 11, Split Jerk (#117) at 11, Push Press (#118) at 11
  - KB Clean (#119) at 7, KB Snatch (#120) at 10
- [x] No muscle appears in both primary and secondary on same entry
- [x] Every variant has `parentExerciseId` set — N/A this session (all 12 are standalone OL entries; none nested under a parent)
- [x] `equipment` populated on every entry (barbell × 10, kettlebell × 2)
- [x] Tagging style reads consistent — OL Pulling sub-pattern (`[glutes, hamstrings]` + base 5-sec pull map + catch-phase additions) applied uniformly across cleans / snatches / pulls. OL Jerk sub-pattern (frontDelts primary + Vertical push template + 4-muscle leg drive) applied uniformly across Push Jerk / Split Jerk / Push Press. OL KB-ballistic sub-pattern (KB Swing Hinge base + obliques single-arm stab + catch additions) applied uniformly to KB Clean / KB Snatch.

---

## Cross-Curation Validation Pass (session 45g)

Run alongside 45g tagging per scope.

### (A) Override audit — 16 existing overrides valid + 4 new

All 45a–45f EMG overrides (Deadlift, Dips, Pull-Up, RDL, OHP-rejection, Chin-Up, Bulgarian Split Squat, Hammer Curl, Hanging Leg Raise, Close-Grip Bench, Narrow-Grip Pull-Up, Reverse Curl, Decline Sit-Up, Zercher Carry, Turkish Get-Up, Sprint) re-verified against updated principles-doc — **no map changes triggered, all still valid.**

**4 new 45g overrides** added to principles-doc EMG reference list (patched concurrently):
- **Power Clean / Hang Clean / Clean & Jerk** — `[glutes, hamstrings]` Hinge + front-rack catch additions; canonical Olympic-clean exemplar (Clean & Jerk = 13-sec library kinetic-chain ceiling)
- **Power Snatch / Hang Snatch** — `[glutes, hamstrings]` Hinge + overhead-catch additions; canonical Olympic-snatch exemplar (12-sec snatch-family ceiling)
- **Push Jerk / Split Jerk / Push Press** — `frontDelts` single-primary per Vertical push template + full leg drive additions; canonical Olympic-jerk exemplar; co-primary `[frontDelts, quads]` rejected (same logic as OHP rejection in 45b — leg drive is brief assist, lockout is the rep)
- **KB Clean / KB Snatch** — `[glutes, hamstrings]` Hinge + KB-specific additions (single-arm obliques stab; KB Swing base, NOT barbell-clean derivative per Tsatsouline framework)

**Template-default co-primaries (no override — documentation only):** Clean Pull `[glutes, hamstrings]` (Hinge), Snatch Pull `[glutes, hamstrings]` (Hinge w/ Poliquin snatch-grip upperBack syn promotion).

### (B) Parent/Variant FK consistency

- **Existing FKs (45a–f):** 25 P5 variants + 2 structural variants (Chin-Up, Neutral-Grip Pull-Up) + Clap Push-Up → Push-Up — all `parentExerciseId` references resolve. Clean.
- **New 45g FKs:** None. All 12 OL/KB-ballistic entries are standalone (`parentExerciseId: null`).

### (C) Group-derivation spot checks

All 45a–45g co-primary entries tiebreak-resolved consistently:

- `[glutes, hamstrings]` → `legs` (Deadlift, RDL, Good Morning, Reverse Hyper, B-Stance RDL, KB Swing, KB SL-DL, **+ Power Clean, Hang Clean, Clean & Jerk, Power Snatch, Hang Snatch, Clean Pull, Snatch Pull, KB Clean, KB Snatch**) ✓
- `[hamstrings, glutes]` → `legs` (Sprint — ham-first tiebreak) ✓
- `[chest, triceps]` → `chest` (Dips, Close-Grip Bench) ✓
- `[lats, upperBack]` → `back` (Pull-Up, Meadows Row, Sled Row) ✓
- `[lats, biceps]` → `back` (Chin-Up, Narrow-Grip Pull-Up) ✓
- `[quads, glutes]` → `legs` (Bulgarian Split Squat, Sled Pull) ✓
- `[biceps, brachialis]` → `arms` (Hammer Curl, Reverse Curl) ✓
- `[abs, hipFlexors]` → `core` (Hanging Leg Raise, L-Sit, Decline Sit-Up) ✓
- `[abs, obliques]` → `core` (Turkish Get-Up — abs-first tiebreak) ✓
- `[forearms, upperTraps]` → `arms` (Farmer Carry, Suitcase Carry) ✓
- `[upperBack, biceps]` → `back` (Zercher Carry) ✓
- Single-primary `frontDelts` → `shoulders` (OHP, DB SP, Arnold, Machine SP, Iso-Lat SP, Smith OHP, Landmine, **+ Push Jerk, Split Jerk, Push Press**) ✓
- Rule 5 cuff-as-primary: Cable ER + DB ER → `shoulders` per explicit patch ✓

**No group-derivation conflicts detected. Queue cleared — no parked entries remain.**

---

*Inline divergences from template / rule, tagged in entry notes above. Listed here for end-of-curation consistency pass.*

- **Dips** — co-primary `[chest, triceps]` overrides default single-primary Horizontal push template. Rationale: bodyweight closed-chain dip has both chest and triceps as major movers; neutral-torso default is roughly-even. Group derivation changes from Arms (seed) → Chest.
- **Deadlift** — dropped `adductors (syn)` from Hinge template. Rationale: conventional narrow stance doesn't meaningfully load adductors; template default targets sumo/wide-stance variants.
- **Skull Crusher** — only 1 secondary (`forearms`) vs. template's "extension = rearDelts on overhead / forearms on cable." Rationale: supine pressing path doesn't qualify for rearDelts stab; strict template reading allows no other secondaries.
- **Plank** — obliques tagged despite exclusion-rule preference for asymmetric load. Rationale: anti-extension core work with genuine oblique bracing contribution; consistent with side-plank treatment.

### Session 45b exceptions

- **Overhead Press (Seed #17)** — 6 secondaries per full Vertical push template, over ≤5 soft threshold. Accepted as template-standard (same pattern as Squat at 6 in 45a).
- **DB Shoulder Press (P0 #7)** — 6 secondaries inheriting OHP Vertical push template. Accepted per OHP precedent.
- **Push-Up (Seed #4)** — `serratus` tagged as **synergist** (not stabilizer) due to free scap movement at top of rep. Distinct from flat bench (scap pinned = serratus isometric only). Override from the stabilizer default that principles doc would suggest.
- **DB Fly (Seed #3)** — fly exception applied to dumbbell variant. Principles doc originally lists "cable fly / crossover" for the Isolation template's "0 or 1 secondary" exception; extended to DB fly on basis of equivalent (or greater) rotator cuff vulnerability at loaded stretch position. Future variants inheriting: Incline DB Fly (P2 #4).
- **Chin-Up (P0 #4)** — `parentExerciseId` set to Pull-Up despite DIFFERENT muscle map (biceps co-primary replaces upperBack co-primary). This is the taxonomy's designated case for "structural variant linkage in CE2 architecture despite map divergence per Rule 1 override." Documented at Pull-Up parent entry in 45a.
- **Barbell Hip Thrust (P0 #6)** — single-primary `glutes` despite being a hip-extension compound exercise. Co-primary `[glutes, hamstrings]` would match the Hinge template but is rejected per Contreras EMG showing hip thrust is overwhelmingly glute-dominant (hip thrust is the canonical glute-isolation compound; hamstrings assist, not co-drive).
- **Ab Wheel Rollout (Seed #29)** — `equipment: 'other'`. Ab wheel is a specific implement not in standard categories (not bodyweight since the wheel's roll mechanics define the movement; not any standard implement family).

### Session 45c exceptions

- **Close-Grip Bench Press (P1 #5)** — co-primary `[chest, triceps]` overrides default single-primary Horizontal push template. Rationale: narrow grip shifts triceps to primary-mover status per Barnett 1995 EMG. Standalone entry (not a Bench Press variant — map diverges). Locks principles doc's queued entry for this session.
- **Arnold Press (P1 #25)** — 6 secondaries per full Vertical push template. Accepted as template-standard (matches DB Shoulder Press + OHP precedent; same pattern as Squat).
- **Machine Assisted Dip (P1 #45)** — inherits Dips co-primary `[chest, triceps]` on a machine variant despite `parentExerciseId: null` (per exercise-bank: separate exercise, not a Dips variant). Machine discipline drops `upperBack (stab)` + `rotatorCuff (stab)` from Dips parent map; 2 stabilizer losses vs parent, co-primary preserved because machine reduces load, not muscle coordination.
- **Iso-Lateral High Row (P1 #47)** — named "row" in exercise-bank but tagged under Vertical pull template (single-primary `lats`) per pull-down-angle behavior. Map diverges from Horizontal pull row cluster (no co-primary `upperBack`). Naming/template mismatch flagged for end-of-curation audit.
- **Landmine Press (P1 #31)** — hybrid press angle (~45° diagonal, between Horizontal and Vertical push). Tagged `frontDelts` primary per shoulder-group convention; `chest` tagged as synergist (unusual for a shoulder exercise) for the horizontal-adduction component at the bottom of the arc. No clean template fit.
- **Upright Row (P1 #56)** — hybrid lateral-raise + vertical-pull motion; no clean template. `rotatorCuff (stab)` included at a non-overhead angle per impingement-risk rationale (internal-rotation-at-abduction under load meets Rule 5 cuff tag-when criteria).

### Session 45d exceptions

- **Front Squat (P1 #13)** — 6 secondaries per Squat parent precedent. Swaps `calves (stab)` from Squat parent for `upperBack (stab)` — front-rack position demands active thoracic extension hold. Accepted as template-driven (same flag pattern as Squat parent in 45a).
- **Sumo Deadlift (P1 #11)** — re-adds `adductors (syn)` dropped from conventional Deadlift's Hinge template. Closes the 45a Deadlift exception loop ("template default targets sumo/wide-stance variants; re-add when tagged").
- **45° Hyperextension (P1 #51)** — `lowerBack` promoted to **synergist** (not stabilizer) per Rule 6 explicit exception ("synergist only on Good Morning, 45° Back Extension"). Only cases in library where lowerBack is syn.
- **Bird Dog (P1 #41)** — `glutes (syn)` tagged on a core exercise. Unusual for the Core group, but justified because hip extension on the raised leg is a concentric contribution (not a position hold). Obliques promoted to synergist (not stabilizer) on the same rationale — anti-rotation is actively resisted, not merely held.
- **Side Plank (P1 #42)** — `abductors (syn)` tagged per principles Legs convention (side-plane / Copenhagen-plank pattern). Primary is `obliques` per Plank parent note ("Side Plank will be separate map, obliques primary"). Map diverges from front Plank (abs primary) despite shared "plank" name.
- **Machine Tricep Extension (P1 #54)** — scope catch-up from 45c. Was in P1 upper-body range but omitted from 45c's scope definition (`#1–#7, #25–#37, #45–#50, #53, #56` — `#54` fell in the gap). 45d's scope (`#54–#55`) picked it up alongside the machine cluster. Flagged for end-of-curation audit to confirm no other scope gaps.

### Session 45e exceptions

- **Narrow-Grip Pull-Up (P5 #18)** — co-primary `[lats, biceps]` overrides Pull-Up parent map (which is `[lats, upperBack]`); structural variant linkage preserved (parentExerciseId → Pull-Up Seed #7) despite map divergence. Same pattern as Chin-Up (P0 #4) from 45b — both narrow / supinated grip variants of Pull-Up that promote biceps to co-primary per Rule 1 EMG-based Pull-Up override. Closes principles-doc queue: Narrow-Grip Pull-Up moved from "Queued for 45d onward" → "Non-parents (session 45e)".
- **Cable External Rotation (P2 #19)** — `rotatorCuff` tagged as **primary** per Rule 5 Dedicated-cuff-isolation exception (session 45e patch accepted at close-out). Rationale: Cable ER is dedicated cuff-isolation exercise where cuff IS the only prime mover. Group derivation: `shoulders` (cuff excluded from muscle-target picker filter but exercise groups under Shoulders for catalog browsing). Principles doc Rule 5 patched concurrently.
- **Dumbbell External Rotation (P2 #20)** — same Rule 5 Dedicated-cuff-isolation primary exception as Cable ER. Group derivation: `shoulders`.
- **Reverse Curl (P2 #23)** — co-primary `[biceps, brachialis]` per Curl template pronated-grip branch ("hammer / neutral / reverse grip → brachialis co-primary"). Template-default; matches Hammer Curl (Seed #22 = 45b #14) treatment. EMG co-primary reference list: add as second template-default-pronated-grip entry alongside Hammer Curl.
- **Decline Sit-Up (P2 #31)** — co-primary `[abs, hipFlexors]` per Crunch entry note (45b #16) documenting Sit-Up vs Crunch map distinction ("hip flexors become co-primary once trunk rises past ~45°"). Codifies the Crunch note into a locked exception. EMG co-primary reference list: add as canonical sit-up-family template default.
- **Single-Arm Lat Pulldown (P2 #10)** — 6 secondaries (over ≤5 soft threshold). Inherits Lat Pulldown 5-sec template + adds `obliques (stab)` for unilateral anti-rotation. Single-addition-over-template-default justified.
- **Farmer Carry (P2 #32)** — 6 secondaries per Loaded Carry template (full-body integration: gait + bracing + axial). Co-primary `[forearms, upperTraps]` per template-default for Farmer pattern. Template-driven exception accepted.
- **Suitcase Carry (P2 #33)** — 6 secondaries per Loaded Carry template; obliques promoted from stab → syn vs Farmer (unilateral load = anti-lateral-flexion is the signature). Template-driven.
- **Meadows Row (P3 #1)** — 6 secondaries inheriting T-Bar Row + adds `obliques (stab)` for landmine unilateral anti-rotation. Single-addition-over-template-default justified (matches Single-Arm Lat Pulldown rationale).
- **Good Morning (P2 #13) + Reverse Hyperextension Machine (P2 #42)** — `lowerBack` promoted to **synergist** per Rule 6 explicit exception. Together with 45° Hyperextension (45d #13), these are the only three library cases where lowerBack is syn. Closes the principles-doc Rule 6 explicit-exception list ("synergist only on Good Morning, 45° Back Extension").
- **Cable Y-Raise (P3 #6)** — `lowerTraps` as primary; only library entry with lowerTraps as primary (BB Shrug + DB Shrug + Machine Shrug all upperTraps-primary; Y-Raise inverts to lower-trap focus). Canonical lowerTraps-primary exemplar.
- **Overhead Carry (P3 #10)** — 10 secondaries per Loaded Carry template-overhead variant. `rotatorCuff` tagged as **synergist** (not primary) — avoids Rule 5 cuff-as-primary conflict by using face-pull-style synergist exception. Second library entry with cuff-as-syn (after Face Pull from 45b). Single-primary `frontDelts` keeps within Rule 5 letter while honoring template intent. **FLAGGED for user to confirm cuff-as-synergist treatment matches intent vs explicit cuff-as-primary co-primary `[frontDelts, rotatorCuff]`.**
- **Zercher Carry (P3 #11)** — 7 secondaries + unique co-primary `[upperBack, biceps]`. No other library entry pairs these as primaries — Zercher signature reflects bear-hug isometric demand (biceps holds bar in elbow crook + upper back holds scap-packed against forward load). EMG co-primary reference list: add as Zercher-specific exemplar.
- **JM Press (P3 #7)** — `triceps` single-primary distinguishes from Close-Grip Bench Press (45c #4) co-primary `[chest, triceps]`. Both narrow-grip presses; JM tiebreaks to triceps-only (group = arms) vs CGB tiebreaks to chest-first (group = chest). Codifies principles-doc note: "Close-Grip Bench: triceps co-primary → standalone entry. JM Press: triceps primary, chest de-emphasized → standalone." Both standalone, neither a Bench variant.
- **Dumbbell Pullover (P2 #5)** — chest single-primary kept despite back-bias cue noted in exercise-bank. Conventional categorization (chest exercise) wins by default; flagged for end-of-curation audit if user wants back-primary or co-primary `[chest, lats]` treatment.
- **Smith Machine Overhead Press (P2 #38)** — 5 secondaries (between OHP's 6 and Machine SP's 4). Smith fixes path → drops cuff (matches Smith Bench precedent) but keeps abs (standing axial preserved per Smith Squat precedent). Hybrid machine-discipline outcome between fully-supported Machine SP and free-weight OHP.
- **L-Sit Hold (P3 #9)** — `quads (syn)` + `triceps (syn)` added to HLR-style co-primary base. Unusual quads-on-core tag justified by knee-extension hold demand (HLR doesn't need quads — legs hang; L-Sit needs straight-leg active extension). Triceps-on-core justified by sustained press-down arm support.
- **Sissy Squat (P3 #3)** — extreme-knee-flexion + leaned-back position drops Hinge/Lunge template's hip-extension-driven syns (no glutes, hams, adductors) → quads single-primary + abs (stab). Strictest quad-isolation in library alongside Leg Extension.

### Session 45f exceptions

- **Clap Push-Up (P4 #15)** — promotes Push-Up from seed non-parent → **12th library parent**. Originally 45a documented 11 parents (Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover). Clap Push-Up variant linkage triggers Push-Up promotion per CE2 decision "any parent-level exercise qualifies as parent." New Tier 3 `bias: 'explosive'` value introduced — flag for principles-doc conventions update.
- **Medicine Ball Slam (P4 #16)** — Rule 6 audit trimmed original draft (5 sec → 2 sec): obliques dropped (slam is sagittal, not rotational; `obliques` tag-when specifies direct rotation / anti-rotation / unilateral loaded carry); lowerBack dropped (medicine-ball load < bodyweight, not a hinge, no axial demand meeting `lowerBack` tag-when threshold). Abs-as-synergist kept (trunk flexion is concentric drive, not isometric bracing — elevated role vs standard standing-compound abs-stab).
- **Turkish Get-Up (P4 #22)** — co-primary `[abs, obliques]` per user preference (alternative to draft's single-primary `frontDelts`). Trunk control across all supine-to-standing phases is rep-limiter; abs drives anti-extension, obliques drives lateral flexion through side-bridge/roll phases. Group derivation: abs → `core` (changed from shoulders per tiebreak with abs-first order). **Novel co-primary pattern** — first library entry pairing abs + obliques; added to EMG reference list. 6 secondaries accepted per multi-planar template precedent (Overhead Carry at 10).
- **Sprint (P4 #30)** — co-primary `[hamstrings, glutes]` not covered by any existing template. Max-velocity sprint mechanics: ham-dominant hip extension + knee-flex recovery (hamstring strain is most common sprinting injury per Schoenfeld/Nuckols/Haff panel consensus). Only library entry tagged with ham-first primary order. Added to EMG reference list as "max-velocity sprint mechanics" exemplar.
- **Sled Pull (P4 #25) split into backward-walk default + Sled Row (P4 #31 NEW)** — original exercise-bank entry "Sled Pull" ambiguous between leg-dominant backward-walk and back-dominant row-style. Split per user direction 2026-04-24: P4 #25 = backward-walk (leg-primary co-primary `[quads, glutes]`); P4 #31 = Sled Row (back-primary co-primary `[lats, upperBack]`). Exercise-bank.md updated concurrently (P4 count 30 → 31; library total 213 → 214).
- **KB Swing (P4 #18)** — Rule 6 audit triggered 3x (abs + forearms + lowerBack) but each matches Hinge template tag-when exactly: abs = anti-extension at top lockout, forearms = grip under ballistic load (strength-limiter), lowerBack = hinge + axial load. No over-tagging; audit cleared.
- **KB Single-Leg Deadlift (P4 #23)** — Rule 6 audit triggered 3x (obliques + forearms + lowerBack) but each matches unilateral + Hinge tag-when. Obliques promoted stab → syn per Meadows Row / Suitcase Carry unilateral-load precedent; calves stab added per single-leg balance (unilateral-template addition).
- **KB Goblet Squat (P4 #19)** — 6 secondaries; adds `upperBack (stab)` + `biceps (stab)` over Squat baseline for anterior-load signature. Drops obliques (symmetrical load). Adductors tagged per deep-ROM goblet convention.
- **Rower (P4 #27)** — 6 secondaries; full kinetic-chain stroke sequence (legs → back → arms) is the rowing motion. Only conditioning entry with back co-driven at synergist level.
- **Burpee (P4 #29)** — 6 secondaries; hybrid multi-pattern (Plyometric + Horizontal push + bracing). Jump-up phase is rep-limiter; push-up phase is lower-intensity but tagged at synergist level per concentric contribution.
- **Sled Row (P4 #31)** — 6 secondaries; horizontal-pull variant adapted for conditioning. Drops lowerBack-stab (upright stance) + adds quads-stab (isometric stance).
- **Pogo Hop (P4 #14)** — narrowest plyo muscle map (1 secondary). Calves single-primary per stiff-leg hopping mechanics; quads tag-as-stab preserves knee-lock isometric without over-tagging other leg muscles.
- **Olympic (10) + KB Clean + KB Snatch parked** — 12 entries deferred pending Olympic-lift template research. Panel-consensus recommendation: apply Hinge template as baseline + codify new "Olympic lift" template at close-out. User deferred decision to future session (Q1, 2026-04-24). **RESOLVED in session 45g** — see `### Session 45g exceptions` below.

### Session 45g exceptions

- **Power Clean (P4 #1)** — 9 secondaries. OL Pulling sub-pattern (Hinge base) + front-rack catch additions. Lats added per accuracy lens (canonical USAW "armpits to bar" cue + bail-out for bar drift, the #1 OL error). Abs added per KB Swing top-lockout precedent (front-rack axial demand parallels swing top).
- **Hang Clean (P4 #2)** — 9 secondaries; same map as Power Clean per Rule 4 (hang start = timing variant, not map shift).
- **Clean & Jerk (P4 #3)** — **13 secondaries — NEW LIBRARY KINETIC-CHAIN CEILING** (supersedes Overhead Carry at 10; Snatch at 12). Union of clean phase (9-sec map) + jerk-specific additions (triceps lockout, sideDelts vertical-push, serratus overhead scap, rotatorCuff Rule 5). Six-coach panel consensus — every tagged muscle meaningfully active across the combined two-phase lift; trimming any would degrade credibility.
- **Power Snatch (P4 #4)** — **12 secondaries — NEW LIBRARY CEILING for snatch family.** Most full-kinetic-chain single lift in library. UpperBack promoted stab → syn per Poliquin snatch-grip rationale (wider grip = active scap retraction). SideDelts + serratus added per accuracy lens (high pull abduction + Rule 6 overhead scap-up tag-when).
- **Hang Snatch (P4 #5)** — 12 secondaries; same map as Power Snatch per Rule 4.
- **Push Jerk (P4 #6)** — 11 secondaries. OL Jerk sub-pattern = Vertical push template + full leg drive (quads + glutes + hams + calves). UpperBack stab added per common-mistake audit (forward bar drift in dip = #1 jerk error). Co-primary `[frontDelts, quads]` rejected per OHP precedent — leg drive is brief assist, lockout is the rep.
- **Split Jerk (P4 #7)** — 11 secondaries; same map as Push Jerk (split-leg catch is balanced bilateral, not unilateral; no oblique add).
- **Clean Pull (P4 #8)** — 7 secondaries. Cleanest exemplar of OL Pulling base map (no catch). Catch-phase additions intentionally absent.
- **Snatch Pull (P4 #9)** — 7 secondaries; same as Clean Pull but `upperBack` promoted stab → syn per Poliquin snatch-grip rationale.
- **Push Press (P4 #10)** — 11 secondaries; same map as Push Jerk; `triceps` reordered first to reflect continuous-press full-ROM demand (vs jerk's brief lockout).
- **KB Clean (P4 #20)** — 7 secondaries. OL KB-ballistic sub-pattern (KB Swing base + rack catch additions). Derived from KB Swing per Tsatsouline framework, NOT from barbell Clean. UpperTraps tagged per real-world execution (Tsatsouline ideal = no shrug, but live execution includes one). Calves added per accuracy lens (triple-extension parallel with barbell clean).
- **KB Snatch (P4 #21)** — 10 secondaries. OL KB-ballistic sub-pattern (KB Swing base + overhead-catch additions). SideDelts added per accuracy lens (barbell-snatch turnover parallel). UpperBack intentionally absent (single-arm offset KB doesn't drive scap-pack against a bar the way barbell does).
- **Six-coach panel expansion (methodology — not per-entry)** — Poliquin formally added to consult panel alongside Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols. Poliquin lens specifically drove: (1) snatch-grip upperBack syn promotion on Snatch Pull / Power Snatch / Hang Snatch; (2) cuff stab on jerks/snatches per Rule 5 overhead heavy free-path. Principles-doc EMG reference policy patched to list six-coach panel formally.
- **Tagging accuracy lens applied (methodology — not per-entry)** — User-clarified rule (2026-04-24, saved to `feedback_tagging_accuracy.md`): when two tag options both fit, choose the more anatomically accurate / credible-coach-defensible one, even past ≤5 soft threshold. Scope = correct-execution + common-mistake recruitment (e.g., bar drift on deadlift recruits lower back; lats bail out OL pull bar drift). NOT extreme edge cases. Drove broad lats-on-OL-pulls + upperBack-stab-on-jerks + calves-on-KB-Clean + sideDelts-on-KB-Snatch additions.

---

## Revision log

- **2026-04-23 (session 45a)** — Initial draft. 11 parent exercises tagged: Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover. 5 exceptions logged. 5 decision flags surfaced for user review.
- **2026-04-23 (session 45a CLOSED)** — All 6 flagged decisions resolved with user. Squat primary reviewed via 6-expert panel; single-primary `quads` confirmed (Path A). Session 45b queued: remaining Seed (17) + P0 (9) = 26 non-parent entries.
- **2026-04-23 (session 45b opening — Poliquin-audit pass on 45a parents)** — Retroactive audit using Poliquin lens + new "normal competent execution" policy. 8 stabilizers added across 8 parents (all additive; zero primary changes, zero group derivation changes): Squat +`calves`, Bench Press +`lats`, Dips +`upperBack`, RDL +`abs`, Skull Crusher +`rotatorCuff`, Barbell Curl +`abs`, Plank +`rotatorCuff`, Cable Crossover +`rotatorCuff`. Principles doc patched concurrently: Rule 2 execution-standard addendum, Rule 5 `rotatorCuff` use-case expansion + synergist exception for face pull, Rule 6 `abs` axial-loaded standing isolation allowance, Isolation template cable-fly exception. Pre-existing 45a sanity-check status preserved except Squat flagged at 6 secondaries (accepted — Poliquin-driven chain-thinking over ≤5 soft threshold).
- **2026-04-23 (session 45b main-draft deferred)** — 26-entry main draft not written this session. Seven pre-locks persisted into Session 45b scaffold above (Chin-Up, Bulgarian Split Squat, Face Pull, Hanging Leg Raise, Incline BB Bench, Lateral Raise, Tricep Pushdown) — reasoning finalized this session; apply verbatim on resume. Three methodology adjustments drove session scope change: (1) Incline bench EMG correction — front delts precede triceps on incline variants; (2) Lateral raise trap recruitment — `upperTraps (syn)` added at/above 90° elevation; (3) Normal competent execution policy — tag stabilizers that engage under good-but-imperfect form, not perfect-technique-only. Remaining 19 entries queued for next session. Zero code, zero `src/` edits.
- **2026-04-23 (session 45b pt. 1 + pt. 2 — CLOSED)** — Main draft completed across two work sessions. **27 full-format entries** written under new `### Full entry blocks — Session 45b` subsection: 18 Seed non-parent (including OHP as late-caught parent — scope correction from 17→18, patched an omission from 45a + 45b scope lists) + 9 P0. Seven pre-locks (Chin-Up, BSS, Face Pull, HLR, Incline BB Bench, Lateral Raise, Tricep Pushdown) expanded to full format; pre-lock section preserved as decision record. Two labeling errors fixed in pre-lock section (Face Pull #18→#20; Lateral Raise #15→#18). 7 new exceptions logged (OHP 6-sec, DB SP 6-sec, Push-Up serratus as syn, DB Fly fly-exception, Chin-Up map divergence w/ parent linkage, Hip Thrust single-primary glutes, Ab Wheel equipment=other). 3 decisions made: OHP inclusion as missed parent; DB Fly fly-exception extension; Push-Up serratus-as-synergist policy. All 8 sanity checks pass (2 flagged — OHP + DB SP at 6 secondaries, accepted per Vertical push template). Session 45b CLOSED. Zero code, zero `src/` edits, zero principles-doc patches (all patches done during 45b opening).
- **2026-04-23 (session 45c — CLOSED)** — 27 P1 upper-body entries tagged under new `## Session 45c` section: 6 Chest (Decline Bench, Machine Chest Press, Pec Deck, Close-Grip Bench, Machine Assisted Dip, Iso-Lateral Chest Press), 5 Back (Chest-Supp DB Row, T-Bar Row, Iso-Lat High Row, Iso-Lat Low Row, Machine Assisted Pull-Up), 9 Shoulders (Arnold, Machine SP, Cable LR, Rear Delt Pec Deck, Bent-Over DB Reverse Fly, DB Shrug, Landmine Press, Iso-Lat Shoulder Press, Upright Row), 5 Biceps (EZ-Bar, Preacher, Incline DB, Cable, Machine Preacher), 2 Triceps (OH Cable Ext, OH DB Ext). **1 EMG override locked** from principles-doc queue: Close-Grip Bench `[chest, triceps]` per Barnett 1995. **6 exceptions logged** under new `### Session 45c exceptions` subsection: Close-Grip Bench co-primary, Arnold Press 6-sec (Vertical push template), Machine Assisted Dip inherited-co-primary-on-machine, Iso-Lat High Row naming/template mismatch, Landmine Press hybrid angle, Upright Row hybrid pattern. Sanity checks: all pass (Arnold Press flagged at 6 secondaries, accepted per DB SP + OHP precedent). Naming-convention note: Machine discipline (Machine Chest Press 2 sec, Machine SP 4 sec, Machine Assisted Pull-Up 5 sec) applied consistently with Leg Press (45b #7) precedent. Pec Deck + Rear Delt Pec Deck both held to strict isolation discipline (fly-exception NOT extended to pad-supported machines). Zero code, zero `src/` edits.
- **2026-04-23 (session 45d — CLOSED)** — 27 P1 lower-body + core entries tagged under new `## Session 45d` section: 3 Hinge (Trap Bar DL, Sumo DL, Stiff-Leg DL — all graduated-from-P5), 8 Quads (Front Squat, Goblet Squat, Hack Squat, Walking Lunge, Reverse Lunge, Step-Up, Smith Machine Squat, Split Squat), 2 Hamstrings (Seated Leg Curl, 45° Hyperextension), 4 Glutes (Glute Bridge, Hip Abduction Machine, Hip Adduction Machine, Machine Hip Thrust), 2 Calves (Standing Calf Raise Machine, Seated Calf Raise), 7 Core (Cable Crunch, Pallof Press, Dead Bug, Bird Dog, Side Plank, Hanging Knee Raise, Captain's Chair Knee Raise), 1 Triceps catch-up (Machine Tricep Extension — scope handoff from 45c). **No new EMG overrides** this session — Narrow-Grip Pull-Up remains queued for 45e. **6 exceptions logged** under new `### Session 45d exceptions` subsection: Front Squat 6-sec (Squat precedent w/ upperBack-for-calves swap), Sumo DL adductor re-add (closes 45a Deadlift loop), 45° Hyperextension `lowerBack (syn)` (Rule 6 exception), Bird Dog glutes-on-core, Side Plank abductors + obliques-primary (Plank parent note fulfillment), Machine Tricep Extension scope catch-up. Sanity checks: all pass (Front Squat flagged at 6 accepted per Squat precedent; Sumo DL at 5 within ceiling). Machine discipline applied consistently (Hack Squat 3 sec matches Leg Press, Smith Machine Squat 5 sec between free Squat and Leg Press, Hip Abd/Add Machine + Calf Raise Machine all at strict 0-sec isolation). Zero principles-doc rule/template patches. Zero code, zero `src/` edits.
- **2026-04-23 (session 45e — CLOSED)** — 89 entries tagged under new `## Session 45e` section: 25 P5 variants (Bench×2, Squat×4, Deadlift×4, Dips×3, Lat Pulldown×3, RDL×1, Pull-Up×1, Skull Crusher×2, Barbell Curl×1, Plank×2, Cable Crossover×2) + 53 P2 entries (5 Chest, 7 Back, 5 Hamstrings, 7 Glutes, 3 Calves, 5 Quads, 5 Shoulders, 4 Biceps, 3 Triceps, 2 Forearms, 5 Core, 2 Carries) + 11 P3 entries (1 Back, 1 Quads, 1 Glutes, 2 Calves, 1 Shoulders, 1 Triceps, 1 Forearms, 1 Core, 2 Carries). **1 EMG override locked** from queued list: Narrow-Grip Pull-Up `[lats, biceps]` per Pull-Up Rule 1 override (matches Chin-Up treatment) — closes principles-doc queue. **18 exceptions logged** under new `### Session 45e exceptions` subsection — all user-accepted at close-out. Most consequential: (1) **Cable ER + DB ER `rotatorCuff` as primary** per Rule 5 Dedicated-cuff-isolation exception (principles-doc Rule 5 patched concurrently; group derivation → `shoulders`); (2) **Overhead Carry cuff-as-syn** kept (Rule 5 face-pull-style synergist exception extended; second library case after Face Pull); (3) Reverse Curl + Decline Sit-Up + Zercher Carry added to EMG list (template-default codification + Zercher unique signature); (4) Loaded Carry template flags 4 entries at 6+ secondaries (Farmer/Suitcase/Overhead/Zercher) — accepted per template; (5) Good Morning + Reverse Hyper close out Rule 6 lowerBack-syn explicit-exception list (3 total library entries); (6) Cable Y-Raise as canonical lowerTraps-primary exemplar (only library entry); (7) Zercher Carry unique `[upperBack, biceps]` co-primary; (8) JM Press triceps-single-primary differentiated from Close-Grip Bench co-primary by tiebreak group derivation. Machine discipline applied consistently throughout (Smith preserves axial → keeps abs; pad-supported drops cuff/lats; selectorized matches plate-loaded). Sanity checks: 6 pass + 2 flagged-and-accepted — primary background-muscle violation on Cable/DB ER (Rule 5 patch accepted) + 6 entries over ≤5 soft threshold (Single-Arm Lat Pulldown, Farmer Carry, Suitcase Carry, Meadows Row, Overhead Carry, Zercher Carry — all template-driven). **1 principles-doc Rule 5 patch APPLIED** at close-out: Rule 5 now allows `rotatorCuff` as primary on dedicated cuff-isolation exercises (Cable ER + DB ER only library cases); Face Pull + Overhead Carry promoted to named cases under the stab→syn role exception. Zero code, zero `src/` edits, zero memory-file edits.
- **2026-04-24 (session 45f — CLOSED)** — 19 P4 entries tagged under new `## Session 45f` section: 7 Plyometric (Box Jump, Broad Jump, Depth Jump, Pogo Hop, Clap Push-Up, Med Ball Slam, Med Ball Chest Throw) + 4 of 6 Kettlebell (KB Swing, KB Goblet Squat, TGU, KB SL-DL) + 8 Conditioning (Sled Push, Sled Pull, Assault Bike, Rower, Ski Erg, Burpee, Sprint, **Sled Row NEW**). **12 entries parked** pending Olympic-lift template research (Q1 deferred by user): Power/Olympic (10) + KB Clean + KB Snatch. **Panel-of-coaches consult applied** per entry (Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols) — user-introduced methodology 2026-04-24. **2 new EMG overrides** added to principles-doc reference list: Turkish Get-Up `[abs, obliques]` (multi-planar stability — first library pairing of abs+obliques); Sprint `[hamstrings, glutes]` (max-velocity locomotion — novel outside any existing template). **12 exceptions logged** under new `### Session 45f exceptions` subsection — all user-accepted at close-out. Most consequential: (1) **Push-Up promoted to 12th library parent** via Clap Push-Up variant linkage — exercise-bank.md + principles-doc + recap.md updated concurrently; (2) **Sled Pull split** into backward-walk default (P4 #25) + Sled Row (P4 #31 NEW) per user direction — exercise-bank count 30 → 31; library total 213 → 214; (3) **TGU co-primary `[abs, obliques]`** per user preference (alternative to draft's frontDelts-single) — group derivation abs → core; (4) **Med Ball Slam Rule 6 audit trim** dropped obliques + lowerBack from 4-sec draft → 2-sec final (sagittal slam, sub-bodyweight load); (5) New Tier 3 `bias: 'explosive'` value introduced (Clap Push-Up) — principles-doc convention update flagged. Sanity checks: 7 pass + 1 flagged-and-accepted (5 entries over ≤5 soft threshold — Goblet Squat, TGU, Rower, Burpee, Sled Row — all template-driven or user-accepted individually). **Cross-curation validation pass executed alongside**: 14 existing overrides re-verified valid; 2 new overrides added; 1 new FK linkage clean (Clap Push-Up → Push-Up); all group-derivations clean across full 108-entry curation corpus. Zero code, zero `src/` edits, zero memory-file edits.
- **2026-04-24 (session 45g — CLOSED)** — 12 previously-parked P4 entries tagged under new `## Session 45g` section: Power/Olympic (10) + KB Clean + KB Snatch. **Queue cleared — no parked entries remain in seed re-curation; all 213 → 214 library entries now tagged.** Six-coach panel **expanded** to add Poliquin alongside Schoenfeld / Haff / Tsatsouline / Dan John / Nuckols — Poliquin lens specifically drove snatch-grip upperBack syn promotion + cuff stab on jerks/snatches. **New movement-pattern template codified** in principles-doc: "Olympic lift / ballistic triple extension" with 3 sub-patterns (Pulling = Hinge base + catch additions; Jerk = Vertical push + leg drive; KB-ballistic = KB Swing base + catch additions). **4 new EMG overrides** added to principles-doc reference list: Olympic Cleans `[glutes, hamstrings]` Hinge + front-rack catch; Olympic Snatches `[glutes, hamstrings]` Hinge + overhead catch; Olympic Jerks `frontDelts` single + leg drive (canonical Vertical push + leg drive exemplar); KB Clean / KB Snatch `[glutes, hamstrings]` KB Swing-derived (Tsatsouline framework, NOT barbell-clean derivative). **NEW LIBRARY KINETIC-CHAIN CEILING:** Clean & Jerk at 13 secondaries (supersedes Overhead Carry at 10); Power/Hang Snatch at 12 (snatch-family ceiling). Defensible per six-coach panel: OL lifts are categorically the most kinetic-chain-demanding exercises in library by design. **Tagging accuracy lens** formally codified per `feedback_tagging_accuracy.md` (saved 2026-04-24): correct-execution + common-mistake recruitment (e.g., bar drift on OL pull = lats bail-out; bar drift on jerk dip = upper back bail-out). **12 exceptions logged** under new `### Session 45g exceptions` subsection — all template-driven OL exceptions; methodology-level exceptions logged for six-coach panel expansion + accuracy-lens application. Sanity checks: 7 pass + 1 flagged-and-accepted (ALL 12 entries over ≤5 soft threshold per OL template — 7-secondary Pulls (cleanest OL exemplar); 9-13 secondary Cleans/Snatches/Jerks; 7-10 secondary KB-ballistics). **Cross-curation validation pass executed alongside**: 16 existing overrides re-verified valid; 4 new overrides added; 0 new FK linkages (all 12 entries standalone); all group derivations clean across full 120-entry curation corpus. Zero code, zero `src/` edits, zero memory-file edits except `feedback_tagging_accuracy.md` creation + MEMORY.md index update.
