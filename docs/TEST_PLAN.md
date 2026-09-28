# Quality Assurance & Test Plan: Alchemix 3D

## 1. Game Engines Testing Matrix

### 1.1 Pinpoint (Clue-to-Concept)
- [ ] Revealing Clue 1 to Clue 5 decreases point reward progressively (500 pts down to 100 pts).
- [ ] Case-insensitive answer comparison (e.g. "zinc", "Zinc", "ZN", "zn" all recognized).
- [ ] Incorrect guess prompts helpful scientific hint without revealing the final answer.
- [ ] Final win reveals complete Board Exam explanation card.

### 1.2 Crossclimb (Reactivity Series Ladder)
- [ ] Dragging or tapping to swap elements in ladder correctly checks reactivity relative order.
- [ ] Confetti and victory chime trigger on complete correct order ($\text{K} > \text{Na} > \text{Ca} > \text{Mg} > \text{Al} > \text{Zn} > \text{Fe} > \text{Pb} > [\text{H}] > \text{Cu} > \text{Hg} > \text{Ag} > \text{Au}$).
- [ ] Mistake triggers shake animation and highlights misplaced element.

### 1.3 Chemical Crossword
- [ ] Arrow keys and mobile tap correctly focus active cell.
- [ ] Auto-advance cursor to next cell upon entering a character.
- [ ] Backspace clears cell and moves focus backward.
- [ ] Clue highlight activates both in clue list and across/down on the grid.
- [ ] Full puzzle completion validates all words and displays celebratory modal.

### 1.4 Guess Word (Chemle)
- [ ] Keyboard input (hardware and on-screen touch keyboard) correctly places letters.
- [ ] Duplicate letter coloring conforms to standard Wordle rules (e.g. green first, yellow if extra, gray if none left).
- [ ] Victory displays Board Exam application note for that chemical concept.

### 1.5 Reaction Sorter (Wordwall / SciChamp style)
- [ ] Drag-and-drop works seamlessly with mouse and mobile touch pointers.
- [ ] Dropping cards into incorrect containers animates rejection and returns card.
- [ ] All 10 sorting cards (e.g. Calamine $\to$ Calcination, Zinc Blende $\to$ Roasting, Magnesium $\to$ Hot Water) properly validated.

---

## 2. 3D WebGL & Animation Verification
- [ ] 3D canvas scales cleanly across viewport resize without distortion or stretching.
- [ ] WebGL context restores gracefully if lost.
- [ ] Lenis smooth scroll operates at 60fps on 120Hz and 60Hz displays.
- [ ] OrbitControls allow smooth 360-degree rotation and zoom on 3D models.
- [ ] GSAP ScrollTrigger transitions fire without layout shifts or jumpiness.

---

## 3. Responsive & Mobile QR Scan Testing
- [ ] Viewport 375px (iPhone SE): All game buttons, crossword inputs, and text remain fully legible with no horizontal overflow.
- [ ] Viewport 768px (iPad / Tablet): Two-column layout activates cleanly for 3D model alongside interactive game cards.
- [ ] Viewport 1440px (Desktop): Ultra-smooth widescreen presentation with sticky 3D showcase.
- [ ] QR Code modal displays scannable SVG/Canvas QR code directing to current origin URL.
- [ ] "Print QR Poster" opens browser print dialog formatted with chapter title, instructions, and clean margins.
