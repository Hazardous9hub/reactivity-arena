# Design System & UI/UX Specification: Alchemix 3D

## 1. Visual Theme & Aesthetic Direction
- **Theme**: **Cyber-Chemistry / Neon Periodic Lab**
- **Mood**: High-tech, futuristic yet friendly, gamified, polished, and exciting for 15-16 year old students.
- **Glassmorphism**: Translucent panels (`background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1)`) floating over a live Three.js 3D WebGL reactive particle space.

---

## 2. Color Palette & Semantic Mapping

| Token Name | Hex Code | Visual Meaning / Usage |
| :--- | :--- | :--- |
| `--bg-dark` | `#080d1a` | Deep space chemistry laboratory background |
| `--bg-card` | `#0f172a` | Card / container background with translucent alpha |
| `--neon-cyan` | `#00f2fe` | Metals, electrical conductivity, pure copper, positive cations ($\text{Na}^+, \text{Cu}^{2+}$) |
| `--neon-emerald` | `#10b981` | Correct answers, basic copper carbonate, green ferrous sulphate |
| `--molten-amber` | `#f59e0b` | Thermit reaction, smelting, calcination, high heat |
| `--flame-ruby` | `#ef4444` | Violent reactions (potassium/sodium in water), errors, cathode mud |
| `--plasma-violet` | `#8b5cf6` | Ionic bonding, electron transfer, potassium flame, non-metals |
| `--metal-gold` | `#fbbf24` | Gold ornaments, ductility highlight, high scores |
| `--text-primary` | `#f8fafc` | Main headings, chemical formulas |
| `--text-muted` | `#94a3b8` | Clues, explanations, secondary meta tags |

---

## 3. Typography
- **Brand & Major Headers**: `Outfit`, `Space Grotesk`, or `Inter` (Font-weight: 700 / 800) with subtle gradient text clipping.
- **Body & Hints**: `Inter`, `-apple-system`, `system-ui` (Font-weight: 400 / 500) for clean readability on smartphone screens.
- **Chemical Formulas & Equations**: `JetBrains Mono`, `Courier New`, `monospace` (clear subscripts and oxidation signs).

---

## 4. Micro-Interactions & Animation Specs
1. **Lenis Smooth Scroll**:
   - Duration: 1.2s, Easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` for fluid inertial navigation.
2. **GSAP ScrollTrigger**:
   - As sections enter view: staggered card lift (`y: 40 -> 0`, `opacity: 0 -> 1`, `duration: 0.6s`, `ease: "power2.out"`).
   - 3D Camera zooms smoothly toward the relevant interactive model (e.g., zoom into copper refining cell during the metallurgy section).
3. **Puzzles Feedback**:
   - Green pulse + confetti burst on correct word or solved ladder.
   - Gentle horizontal shake (`translateX: [-6px, 6px, -4px, 4px, 0]`) on incorrect placement.
4. **Synthesized Web Audio SFX**:
   - `Pop` (Sine wave 440Hz $\to$ 880Hz, 0.08s) on card selection.
   - `Success Chime` (Major chord C5-E5-G5, 0.3s) on correct answer.
   - `Victory Fanfare` on puzzle clear.

---

## 5. Mobile & Touch Screen Ergonomics
- Minimum touch target size: $48\text{px} \times 48\text{px}$ for all puzzle tiles, buttons, and drag handles.
- Bottom navigation HUD on mobile for single-thumb navigation between games.
- Full responsive scaling from 360px width (compact smartphones) to 4K desktop screens.
