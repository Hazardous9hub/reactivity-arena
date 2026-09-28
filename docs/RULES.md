# Development & Syllabus Integrity Rules: Alchemix 3D

## 1. Syllabus & Pedagogical Rules (CBSE Class 10 Science)
1. **Zero Scientific Inaccuracies**: All formulas, reactions, states ($s, l, g, aq$), conditions ($\Delta, \text{dilute}, \text{concentrated}$), and explanations must conform strictly to NCERT Chapter 3.
2. **Mandatory Inclusion of High-Yield Board Traps**:
   - $\text{HNO}_3$ oxidising nature exception ($\text{Mg}$ & $\text{Mn}$ with very dilute $\text{HNO}_3$).
   - Reason why $\text{Ca}$ and $\text{Mg}$ float in water (hydrogen bubbles adhering to surface).
   - Amphoteric oxides ($\text{Al}_2\text{O}_3$ and $\text{ZnO}$) reacting with both $\text{HCl}$ and $\text{NaOH}$ to yield sodium aluminate ($\text{NaAlO}_2$) and sodium zincate ($\text{Na}_2\text{ZnO}_2$).
   - Roasting (sulphide ores in excess air) vs. Calcination (carbonate ores in limited air).
   - Rusting conditions: presence of **both** air ($\text{O}_2$) and water ($\text{H}_2\text{O}$).
   - Thermite reaction application: molten iron welding railway joints.
   - Sacrificial protection in galvanisation (zinc protects even if coating is scratched).

## 2. Engineering & Performance Rules
1. **60 FPS Mobile Target**: 3D WebGL scenes must use optimized low-poly geometries and efficient render loops with device pixel ratio capped at 2 (`Math.min(window.devicePixelRatio, 2)`).
2. **Instant QR Code Scanning Response**: Zero loading screens exceeding 1.5 seconds. Assets must load progressively.
3. **No External Server Dependency for Game Logic**: All scoring, question checks, and crossword grids must compute client-side for zero latency and offline capability.
4. **Touch & Keyboard Parity**: Every puzzle must be 100% playable via touch taps (on smartphones) AND desktop keyboard/mouse.
5. **Sound Control**: Audio must be muted by default or easily toggled with a single, persistent sound button. Use Web Audio API synthesis to avoid external audio asset 404s.

## 3. Code Quality & Modularity
- Clean ES modules with clear separation between state, game logic, 3D rendering, and DOM manipulation.
- Self-documenting function and variable names (`checkDisplacementPair`, `renderCrosswordCell`).
- Single source of truth for all chemical constants and question banks in `src/data/`.
