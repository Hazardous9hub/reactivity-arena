/**
 * Alchemix 3D - Main Application Bootloader
 * Orchestrates Lenis smooth scrolling, GSAP, Three.js scenes, and puzzle game engines.
 */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "./components/Header.js";
import { QRModal } from "./components/QRModal.js";
import { Loader } from "./components/Loader.js";
import { TrapsCarousel } from "./components/TrapsCarousel.js";
import { PrivacyModal } from "./components/PrivacyModal.js";
import { BreakdownModal } from "./components/BreakdownModal.js";
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
    this.loader = null;
    this.privacyModal = null;
    this.breakdownModal = null;
    this.trapsCarousel = null;
    this.activeGameTab = "pinpoint";
    this.activeGameInstance = null;

    this.init();
  }

  init() {
    // 0. Preloader Screen
    this.loader = new Loader();
    this.loader.start();

    // 1. Lenis Smooth Scroll
    this.initSmoothScroll();

    // 2. Modals & Header
    this.privacyModal = new PrivacyModal();
    this.breakdownModal = new BreakdownModal();
    this.qrModal = new QRModal();
    new Header("header-mount", this.qrModal);

    // 3. Three.js 3D Showcase
    this.initThreeShowcase();

    // 4. Game Hub Tabs
    this.initGameHub();

    // 5. Board Exam Traps Carousel & Reactions Bank Explorer
    this.trapsCarousel = new TrapsCarousel("board-traps-carousel-mount");
    this.renderReactionsBank();

    // 6. Privacy & Policy Link Handlers
    this.initPrivacyTriggers();

    // 7. GSAP Scroll Animations
    this.initScrollAnimations();
  }

  initPrivacyTriggers() {
    const openPrivacy = (e) => {
      if (e) e.preventDefault();
      sounds.playClick();
      this.privacyModal.show();
    };

    const bannerLink = document.getElementById("banner-privacy-link");
    if (bannerLink) bannerLink.addEventListener("click", openPrivacy);

    const footerLink = document.getElementById("footer-privacy-link");
    if (footerLink) footerLink.addEventListener("click", openPrivacy);
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

  renderReactionsBank() {
    const container = document.getElementById("reactions-bank-list");
    if (!container) return;

    container.innerHTML = chemicalReactions.map((rx, idx) => `
      <div class="reaction-card" data-rx-index="${idx}">
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
        <button class="btn btn-secondary btn-sm rx-breakdown-trigger" data-rx-index="${idx}" style="margin-top: 14px; font-size: 11.5px; border-color: rgba(0, 242, 254, 0.4); color: var(--neon-cyan); width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🔬</span> View Deep-Dive Breakdown
        </button>
      </div>
    `).join('');

    container.querySelectorAll(".rx-breakdown-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-rx-index"));
        const reaction = chemicalReactions[idx];
        if (reaction && this.breakdownModal) {
          this.breakdownModal.show(reaction);
        }
      });
    });
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

      gsap.from(".traps-carousel-wrapper", {
        scrollTrigger: {
          trigger: "#board-traps-section",
          start: "top 80%"
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
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
