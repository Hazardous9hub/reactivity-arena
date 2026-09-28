/**
 * Horizontal Carousel for Board Exam Traps & Solutions
 * Features:
 * - Horizontal snapping track
 * - Center card highlighted with full opacity, scale(1.04), and neon glow
 * - Side cards faded (opacity 0.45) and scaled down
 * - Prev / Next buttons and pagination dots
 * - Touch swipe & click-to-center
 */

import { boardTraps } from "../data/boardTraps.js";
import { sounds } from "./SoundController.js";

export class TrapsCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.trackEl = null;
    this.cards = [];
    this.dots = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.updateActiveCard(0);
  }

  render() {
    this.container.innerHTML = `
      <div class="traps-carousel-wrapper">
        <!-- Prev Navigation Arrow -->
        <button class="carousel-nav-btn prev-btn" id="traps-prev-btn" aria-label="Previous board trap">
          <span>❮</span>
        </button>

        <!-- Horizontal Track -->
        <div class="traps-horizontal-track" id="traps-track">
          ${boardTraps.map((trap, idx) => `
            <div class="trap-card-slide" data-index="${idx}">
              <div class="trap-card-inner">
                <div class="trap-slide-header">
                  <span class="trap-badge-step">SECRET #${idx + 1} OF ${boardTraps.length}</span>
                  <span class="trap-years-tag">${trap.years.join(" &bull; ")}</span>
                </div>
                <h3 class="trap-q">${trap.question}</h3>
                <p class="trap-explanation">${trap.explanation}</p>
                <div class="trap-secret-box">
                  <strong>🎯 Examiner's Secret:</strong> ${trap.boardSecret.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Next Navigation Arrow -->
        <button class="carousel-nav-btn next-btn" id="traps-next-btn" aria-label="Next board trap">
          <span>❯</span>
        </button>
      </div>

      <!-- Pagination Indicators & Counter -->
      <div class="carousel-dots-bar">
        <div class="carousel-counter" id="carousel-counter-text">Trap 1 of ${boardTraps.length}</div>
        <div class="carousel-dots" id="carousel-dots-container">
          ${boardTraps.map((_, idx) => `
            <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to trap ${idx + 1}"></button>
          `).join('')}
        </div>
      </div>
    `;

    this.trackEl = this.container.querySelector("#traps-track");
    this.cards = Array.from(this.container.querySelectorAll(".trap-card-slide"));
    this.dots = Array.from(this.container.querySelectorAll(".carousel-dot"));
  }

  bindEvents() {
    // 1. Next / Prev buttons
    const prevBtn = this.container.querySelector("#traps-prev-btn");
    const nextBtn = this.container.querySelector("#traps-next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        sounds.playClick();
        this.scrollToIndex(Math.max(0, this.currentIndex - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sounds.playClick();
        this.scrollToIndex(Math.min(boardTraps.length - 1, this.currentIndex + 1));
      });
    }

    // 2. Dots navigation
    this.dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        sounds.playClick();
        const idx = parseInt(dot.getAttribute("data-index"));
        this.scrollToIndex(idx);
      });
    });

    // 3. Click on side card to center it
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.getAttribute("data-index"));
        if (idx !== this.currentIndex) {
          sounds.playClick();
          this.scrollToIndex(idx);
        }
      });
    });

    // 4. Scroll detection for smooth dynamic highlight
    if (this.trackEl) {
      let scrollTimeout;
      this.trackEl.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.detectCenterCard();
        }, 60);
      }, { passive: true });
    }
  }

  detectCenterCard() {
    if (!this.trackEl) return;
    const trackRect = this.trackEl.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    this.cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(trackCenter - cardCenter);

      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    this.updateActiveCard(closestIdx);
  }

  scrollToIndex(index) {
    if (!this.trackEl || !this.cards[index]) return;
    this.currentIndex = index;
    const card = this.cards[index];
    const trackWidth = this.trackEl.clientWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.clientWidth;

    const scrollTarget = cardLeft - (trackWidth / 2) + (cardWidth / 2);
    this.trackEl.scrollTo({
      left: scrollTarget,
      behavior: "smooth"
    });

    this.updateActiveCard(index);
  }

  updateActiveCard(index) {
    this.currentIndex = index;

    this.cards.forEach((card, idx) => {
      const isCurrent = idx === index;
      card.classList.toggle("active-slide", isCurrent);
      card.classList.toggle("faded-slide", !isCurrent);
    });

    this.dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });

    const counter = this.container.querySelector("#carousel-counter-text");
    if (counter) {
      counter.textContent = `Trap ${index + 1} of ${boardTraps.length}`;
    }
  }
}
