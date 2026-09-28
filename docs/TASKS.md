# Task Breakdown & Implementation Roadmap: Alchemix 3D

## Phase 1: Foundation & Project Scaffolding
- [x] Create project documentation (`docs/PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, `TEST_PLAN.md`, `MEMORY.md`).
- [x] Initialize frontend application structure with Vite, package.json, and asset pipelines.
- [x] Configure `index.html` with mobile viewport meta tags, high-DPI scaling, and chemistry typography.
- [x] Set up Web Audio API sound synthesizer module (`SoundController.js`).

## Phase 2: Class 10 Knowledge Engine & Question Banks
- [x] Build `chemicalReactions.js`: Complete balanced equations for O2, H2O, HCl/H2SO4, HNO3 exceptions, calcination, roasting, thermit, and electrolytic refining.
- [x] Build `pinpointQuestions.js`: 5-step clue deduction challenges based on NCERT elements/compounds.
- [x] Build `reactivityLadder.js`: Crossclimb trivia sets for reactivity series and metallurgy order.
- [x] Build `crosswordClues.js`: Interactive crossword puzzle data with board keywords.
- [x] Build `guessWords.js`: 5 & 6-letter chemistry words with board exam fact cards on victory.
- [x] Build `reactionLabData.js`: Sorting & matching pairs (Wordwall / SciChamp style).

## Phase 3: 3D WebGL Scenes (Three.js)
- [x] Implement `SceneManager.js`: Dynamic WebGL canvas, lighting, camera controls, and responsive resize handler.
- [x] Create 3D Ionic Crystal & Electron Transfer simulation (`AtomLattice.js` for $\text{NaCl}$ / $\text{MgCl}_2$).
- [x] Create 3D Electrolytic Copper Refining Cell (`RefiningCell.js` with anode dissolution, cathode deposition, and anode mud).
- [x] Create 3D Thermite Reaction Welding visualizer (`ThermitSim.js` with glowing sparks and molten iron flow).

## Phase 4: Interactive Game Engines
- [x] Build **Pinpoint Game**: 5-clue incremental reveal, guess validation, score multiplier, and board takeaway.
- [x] Build **Crossclimb Game**: Reactivity series ladder with climbing animations and metal rank verification.
- [x] Build **Class 10 Crossword Game**: Interactive grid, keyboard/touch cell navigation, clue highlight, and auto-checker.
- [x] Build **Guess Word (Chemle)**: Wordle-style 6-guess grid, letter flip animations, virtual keyboard, and board explanation popup.
- [x] Build **Reaction Sorter / Balancer (Wordwall & SciChamp style)**: Drag-and-drop category sorter (Cold water vs Hot water vs Steam; Roasting vs Calcination).

## Phase 5: Smooth Scrolling, GSAP & Animated Logo
- [x] Integrate **Lenis Smooth Scroll** for 60fps inertial scrolling on desktop and mobile.
- [x] Implement **GSAP ScrollTrigger** animations: section fade-ins, camera zoom milestones, and neon glow effects.
- [x] Create futuristic animated SVG/Canvas logo: **Alchemix 3D** with revolving electron orbits.

## Phase 6: QR Code Generator & Classroom Sharing
- [x] Build high-contrast QR Code Generator modal with live network URL and custom URL updates.
- [x] Add "Download QR Image" and "Print Classroom Poster (A4)" features for the teacher/sister.

## Phase 7: Board Exam "High-Yield Trap" Explorer & Reactions Bank
- [x] Create interactive quick-reference cards for top CBSE Board Exam traps (The $\text{HNO}_3$ trap, Amphoteric oxide dual equations, why $\text{Ca/Mg}$ float, etc.).
- [x] Render complete balanced chemical reactions formulary with conditions and CBSE exam alerts.

## Phase 8: Testing, QA & Final Delivery
- [x] Verify production build (`npm run build` builds in 1.13s with 0 errors).
- [x] Launch Vite live server with network access (`http://localhost:5173/` and `http://192.168.10.2:5173/`).
