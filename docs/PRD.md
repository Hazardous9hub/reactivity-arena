# Product Requirements Document (PRD)

## 1. Project Overview
- **Product Name**: **Alchemix 3D** (Metals & Non-Metals Interactive Board Exam Arcade)
- **Target Audience**: Class 10 CBSE/State Board students preparing for board examinations, science educators, and students accessing via smartphone QR codes.
- **Problem Statement**: Class 10 Chemistry (Chapter 3: *Metals and Non-Metals*) is heavily tested in Board Exams (reactions, exceptions, metallurgy steps, electron dot structures, corrosion), but students struggle with rote memorization and abstract concepts.
- **Core Value Proposition**: An ultra-engaging, 3D gamified educational web app accessible instantly via QR code scan. Students learn through LinkedIn-style puzzles (Crossclimb, Pinpoint, Wordle/Guess Word, Crosswords) and interactive 3D WebGL simulations (Electrolytic refining, Reactivity series arena, Reaction balancer).

---

## 2. Target Users & User Stories
- **The Student (Mobile / QR Scan User)**: Scans a QR code on a study sheet or projector, lands on a frictionless, ultra-fast 3D interactive web app, plays quick 2-minute puzzles, understands tricky board questions, and self-evaluates with instant feedback.
- **The Educator / Sister (Teacher / Facilitator)**: Generates a high-res printable QR code to distribute to students. Tracks engagement, uses interactive 3D models in classroom presentations, and assigns specific puzzle modes.

---

## 3. Core Feature Set (MVP & Beyond)

### Feature 1: LinkedIn-Style & Interactive Puzzles
1. **Pinpoint (Clue-to-Concept)**:
   - 5 progressive clues revealed one-by-one.
   - Example: Clue 1: "I am a metal" $\to$ Clue 2: "I am amphoteric" $\to$ Clue 3: "My ore is Calamine" $\to$ Clue 4: "I do not react with cold or hot water, only steam" $\to$ Clue 5: "Atomic number 30" $\to$ **Zinc (Zn)**.
2. **Crossclimb (Reactivity Series Ladder)**:
   - A vertical ladder game where each rung represents a metal in the reactivity series or a metallurgical stage.
   - Players solve trivia to climb higher or order elements correctly ($\text{K} \to \text{Na} \to \text{Ca} \to \text{Mg} \to \text{Al} \dots$).
3. **Chemical Crossword (Board Exam Edition)**:
   - Interactive grid populated with NCERT keywords (e.g., ANODISING, CINNABAR, THERMIT, AMALGAM, GALVANISATION, LUSTRE).
4. **Guess Word (Chemle / Periodic Wordle)**:
   - 5-letter and 6-letter chemistry words with color-coded feedback (Green = correct spot, Yellow = wrong spot, Gray = not in word) + Board Exam Fact popup on victory.
5. **Reaction Sorter & Balancer (Wordwall / SciChamp style)**:
   - Drag-and-drop category sorter:
     - Water reactions: *Cold water* ($\text{Na, K, Ca}$) vs *Hot water* ($\text{Mg}$) vs *Steam* ($\text{Al, Fe, Zn}$) vs *No reaction* ($\text{Cu, Ag, Au}$).
     - Ore enrichment: *Roasting* (Sulphide ores $+\text{O}_2$) vs *Calcination* (Carbonate ores $-\text{O}_2$).

### Feature 2: 3D WebGL / Three.js Visual Showcases
- **Interactive 3D Atom & Ionic Transfer Model**: Visualizes electron transfer from $\text{Na}$ to $\text{Cl}$ and $\text{Mg}$ to $2\text{Cl}^-$, showing crystal lattice formation.
- **3D Electrolytic Refining Cell**: Interactive interactive tank showing anode dissolution ($\text{Cu} \to \text{Cu}^{2+} + 2\text{e}^-$), cathode deposition, and settling of anode mud ($\text{Au, Ag}$).
- **Thermit Welding Simulation**: 3D visual demonstration of $\text{Fe}_2\text{O}_3 + 2\text{Al} \to 2\text{Fe(l)} + \text{Al}_2\text{O}_3 + \text{Heat}$ joining railway tracks.

### Feature 3: Smooth Scrolling & Visual Design
- **Lenis Smooth Scroll** integration for buttery 60fps scrolling.
- **GSAP (GreenSock) & ScrollTrigger** animations: Cinematic camera movements, typography transitions, element reveals, and glowing reaction indicators.
- **Animated Dynamic Logo**: "Alchemix 3D" with glowing metallic neon sheen.

### Feature 4: Board Exam Prep & Rapid Scorecard
- **Past 7-Year High-Yield Traps**: Dedicated section addressing top board traps (The $\text{HNO}_3$ oxidation exception with $\text{Mg/Mn}$, calcium floating reason, amphoteric oxide dual equations).
- **NCERT Activities Explorer**: Interactive simulations of Activity 3.5 (heat conduction), Activity 3.12 (displacement), Activity 3.14 (rusting conditions with 3 test tubes).
- **Gamified Scorecard & Board Readiness Badge**: Cumulative points earned across games with a shareable result card.

### Feature 5: Frictionless QR Code Access & Offline PWA Readiness
- Integrated QR code modal enabling the teacher to download/print high-res QR codes directing straight to the live web app or local network URL.
- Responsive mobile-first design tailored for touchscreens (smartphones and tablets).

---

## 4. Scope Boundaries
### In Scope (MVP)
- Single-page application architecture with modular tabbed game arenas.
- All 5 game engines fully playable with instant feedback, scoring, and explanations.
- Interactive Three.js 3D models with controls (orbit/zoom/pan/explode).
- Full CBSE Class 10 Chapter 3 syllabus alignment (NCERT + PW 34 questions + Educart).
- Built-in SVG/Canvas QR Code generator for quick classroom sharing.

### Out of Scope (Post-MVP)
- User authentication & cloud database backend (keep MVP zero-friction: local storage for student streaks/scores).
- Multiplayer online matchmaking.
