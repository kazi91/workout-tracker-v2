# Seed Draft

Working output for Sessions 45a–f. Every entry tagged per [seed-tagging-principles.md](seed-tagging-principles.md). Will compile to `src/db/seed.ts` at build time.

**Status:** Session 45a CLOSED 2026-04-23. All 11 parent maps locked. Variants + non-parent P0/P1/P2/P3/P4/P5 entries queued for 45b–f.

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

## Session 45c — P1 upper body — queued

---

## Session 45d — P1 lower body + core — queued

---

## Session 45e — P5 variants + P2 + P3 — queued

*P5 variants inherit parent maps from 45a; log divergences only.*

---

## Session 45f — P4 + cross-curation validation — queued

---

## Exception log

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

---

## Revision log

- **2026-04-23 (session 45a)** — Initial draft. 11 parent exercises tagged: Squat, Deadlift, Bench Press, Dips, Pull-Up, Lat Pulldown, RDL, Skull Crusher, Barbell Curl, Plank, Cable Crossover. 5 exceptions logged. 5 decision flags surfaced for user review.
- **2026-04-23 (session 45a CLOSED)** — All 6 flagged decisions resolved with user. Squat primary reviewed via 6-expert panel; single-primary `quads` confirmed (Path A). Session 45b queued: remaining Seed (17) + P0 (9) = 26 non-parent entries.
- **2026-04-23 (session 45b opening — Poliquin-audit pass on 45a parents)** — Retroactive audit using Poliquin lens + new "normal competent execution" policy. 8 stabilizers added across 8 parents (all additive; zero primary changes, zero group derivation changes): Squat +`calves`, Bench Press +`lats`, Dips +`upperBack`, RDL +`abs`, Skull Crusher +`rotatorCuff`, Barbell Curl +`abs`, Plank +`rotatorCuff`, Cable Crossover +`rotatorCuff`. Principles doc patched concurrently: Rule 2 execution-standard addendum, Rule 5 `rotatorCuff` use-case expansion + synergist exception for face pull, Rule 6 `abs` axial-loaded standing isolation allowance, Isolation template cable-fly exception. Pre-existing 45a sanity-check status preserved except Squat flagged at 6 secondaries (accepted — Poliquin-driven chain-thinking over ≤5 soft threshold).
- **2026-04-23 (session 45b main-draft deferred)** — 26-entry main draft not written this session. Seven pre-locks persisted into Session 45b scaffold above (Chin-Up, Bulgarian Split Squat, Face Pull, Hanging Leg Raise, Incline BB Bench, Lateral Raise, Tricep Pushdown) — reasoning finalized this session; apply verbatim on resume. Three methodology adjustments drove session scope change: (1) Incline bench EMG correction — front delts precede triceps on incline variants; (2) Lateral raise trap recruitment — `upperTraps (syn)` added at/above 90° elevation; (3) Normal competent execution policy — tag stabilizers that engage under good-but-imperfect form, not perfect-technique-only. Remaining 19 entries queued for next session. Zero code, zero `src/` edits.
- **2026-04-23 (session 45b pt. 1 + pt. 2 — CLOSED)** — Main draft completed across two work sessions. **27 full-format entries** written under new `### Full entry blocks — Session 45b` subsection: 18 Seed non-parent (including OHP as late-caught parent — scope correction from 17→18, patched an omission from 45a + 45b scope lists) + 9 P0. Seven pre-locks (Chin-Up, BSS, Face Pull, HLR, Incline BB Bench, Lateral Raise, Tricep Pushdown) expanded to full format; pre-lock section preserved as decision record. Two labeling errors fixed in pre-lock section (Face Pull #18→#20; Lateral Raise #15→#18). 7 new exceptions logged (OHP 6-sec, DB SP 6-sec, Push-Up serratus as syn, DB Fly fly-exception, Chin-Up map divergence w/ parent linkage, Hip Thrust single-primary glutes, Ab Wheel equipment=other). 3 decisions made: OHP inclusion as missed parent; DB Fly fly-exception extension; Push-Up serratus-as-synergist policy. All 8 sanity checks pass (2 flagged — OHP + DB SP at 6 secondaries, accepted per Vertical push template). Session 45b CLOSED. Zero code, zero `src/` edits, zero principles-doc patches (all patches done during 45b opening).
