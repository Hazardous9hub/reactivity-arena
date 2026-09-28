/**
 * Alchemix 3D - Main Application Bootloader
 * Orchestrates Lenis smooth scrolling, GSAP, Three.js scenes, and puzzle game engines.
 */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "./components/Header.js";
import { QRModal } from "./components/QRModal.js";
import { sounds } from "./components/SoundController.js";
import { boardTraps } from "./data/boardTraps.js";
import { chemicalReactions } from "./data/chemicalReactions.js";

// Three.js Exhibits
import { SceneManager } from "./three/SceneManager.js";
import { AtomLattice } from "./three/AtomLattice.js";
import { RefiningCell } from "./three/RefiningCell.js";
import { ThermitSim } from "./three/ThermitSim.js";

// Games
import { PinpointGame } from "./games/PinpointGame.js";
import { CrossclimbGame } from "./games/CrossclimbGame.js";
import { CrosswordGame } from "./games/CrosswordGame.js";
import { GuessWordGame } from "./games/GuessWordGame.js";
import { ReactionLabGame } from "./games/ReactionLabGame.js";

class App {
  constructor() {
    this.lenis = null;
    this.sceneManager = null;
    this.qrModal = null;
    this.activeGameTab = "pinpoint";
    this.activeGameInstance = null;

    this.init();
  }

  init() {
    // 1. Lenis Smooth Scroll
    this.initSmoothScroll();

    // 2. Modals & Header
    this.qrModal = new QRModal();
    new Header("header-mount", this.qrModal);

    // 3. Three.js 3D Showcase
    this.initThreeShowcase();

    // 4. Game Hub Tabs
    this.initGameHub();

    // 5. Board Exam Traps & Reactions Explorer
    this.renderBoardTraps();
    this.renderReactionsBank();

    // 6. GSAP Scroll Animations
    this.initScrollAnimations();
  }

  initSmoothScroll() {
    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5
      });

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn("Lenis initialization skipped", e);
    }
  }

  initThreeShowcase() {
    this.sceneManager = new SceneManager("threed-canvas-box");
    if (!this.sceneManager) return;

    // Default exhibit: Ionic Atom Lattice
    const lattice = new AtomLattice();
    this.sceneManager.setExhibit(lattice);

    // Exhibit switcher tabs
    const tabs = document.querySelectorAll(".threed-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        sounds.playClick();
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const exhibitType = tab.getAttribute("data-exhibit");
        if (exhibitType === "lattice") {
          this.sceneManager.setExhibit(new AtomLattice());
        } else if (exhibitType === "refining") {
          this.sceneManager.setExhibit(new RefiningCell());
        } else if (exhibitType === "thermit") {
          this.sceneManager.setExhibit(new ThermitSim());
        }
      });
    });
  }

  initGameHub() {
    const tabs = document.querySelectorAll(".game-tab-btn");
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        tabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const game = btn.getAttribute("data-game");
        this.switchGame(game);
      });
    });

    // Start with default game: Pinpoint
    this.switchGame("pinpoint");
  }

  switchGame(gameKey) {
    this.activeGameTab = gameKey;
    const containerId = "game-active-arena";

    if (gameKey === "pinpoint") {
      this.activeGameInstance = new PinpointGame(containerId);
    } else if (gameKey === "crossclimb") {
      this.activeGameInstance = new CrossclimbGame(containerId);
    } else if (gameKey === "crossword") {
      this.activeGameInstance = new CrosswordGame(containerId);
    } else if (gameKey === "guessword") {
      this.activeGameInstance = new GuessWordGame(containerId);
    } else if (gameKey === "reactionsorter") {
      this.activeGameInstance = new ReactionLabGame(containerId);
    }
  }

  renderBoardTraps() {
    const grid = document.getElementById("board-traps-grid");
    if (!grid) return;

    grid.innerHTML = boardTraps.map((trap) => `
      <div class="trap-card">
        <div class="trap-years">${trap.years.join(" &bull; ")}</div>
        <h4 class="trap-q">${trap.question}</h4>
        <p class="trap-explanation">${trap.explanation}</p>
        <div class="trap-secret-box">
          <strong>🎯 Examiner's Secret:</strong> ${trap.boardSecret.replace(/\n/g, '<br>')}
        </div>
      </div>
    `).join('');
  }

  renderReactionsBank() {
    const container = document.getElementById("reactions-bank-list");
    if (!container) return;

    container.innerHTML = chemicalReactions.map((rx) => `
      <div class="reaction-card">
        <div class="reaction-top">
          <span class="rx-cat-badge">${rx.category}</span>
          <span class="rx-cond">${rx.conditions}</span>
        </div>
        <div class="rx-equation-box">
          <span class="rx-reactants">${rx.reactants}</span>
          <span class="rx-arrow">➔</span>
          <span class="rx-products">${rx.products}</span>
        </div>
        <p class="rx-desc">${rx.description}</p>
        <div class="rx-board-trap">
          ⚠️ <strong>CBSE Tip:</strong> ${rx.boardTrap}
        </div>
      </div>
    `).join('');
  }

  initScrollAnimations() {
    try {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".hero-content > div", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      gsap.from(".trap-card", {
        scrollTrigger: {
          trigger: "#board-traps-section",
          start: "top 80%"
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    } catch (e) {
      console.warn("GSAP ScrollTrigger skipped", e);
    }
  }
}

// Boot application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
