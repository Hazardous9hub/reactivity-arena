/**
 * Reaction Lab & Category Sorter Engine (SciChamp & Wordwall style)
 * Touch-friendly & Drag-and-Drop category sorting for chemical reactions & metallurgy.
 */

import { sortingChallenges } from "../data/reactionLabData.js";
import { sounds } from "../components/SoundController.js";
import { scoreboard } from "../components/Scoreboard.js";
import confetti from "canvas-confetti";

export class ReactionLabGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.challengeIndex = 0;
    this.placements = {}; // itemId -> categoryId
    this.selectedItem = null;
    this.isCompleted = false;

    this.init();
  }

  init() {
    this.render();
  }

  getCurrentChallenge() {
    return sortingChallenges[this.challengeIndex];
  }

  render() {
    if (!this.container) return;
    const ch = this.getCurrentChallenge();

    const unsortedItems = ch.items.filter(it => !this.placements[it.id]);

    this.container.innerHTML = `
      <div class="game-card reactionlab-card">
        <div class="game-header">
          <div class="game-meta">
            <span class="game-badge">🧪 REACTION LAB &bull; CHALLENGE #${this.challengeIndex + 1}/${sortingChallenges.length}</span>
            <span class="category-tag">${ch.title}</span>
          </div>
          <div class="points-pill">+450 PTS ON COMPLETION</div>
        </div>

        <p class="game-instruction">${ch.instruction}</p>

        <!-- Category Buckets / Zones -->
        <div class="sorting-bins-grid" style="grid-template-columns: repeat(${ch.categories.length}, 1fr);">
          ${ch.categories.map(cat => {
            const itemsInCat = ch.items.filter(it => this.placements[it.id] === cat.id);
            return `
              <div class="sorting-bin" data-cat-id="${cat.id}">
                <div class="bin-header">
                  <h4 class="bin-title">${cat.label}</h4>
                  <span class="bin-badge">${cat.badge}</span>
                </div>
                <div class="bin-dropzone" data-cat-id="${cat.id}">
                  ${itemsInCat.map(it => `
                    <div class="placed-card" data-item-id="${it.id}">
                      <span class="card-text">${it.text}</span>
                      <span class="card-check">✓</span>
                    </div>
                  `).join('')}
                  ${itemsInCat.length === 0 ? `<div class="empty-bin-cue">Drop or Tap here</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Unsorted Cards Pool -->
        ${!this.isCompleted ? `
          <div class="unsorted-pool-section">
            <div class="pool-header-note">
              ${this.selectedItem ? `Selected: <strong>${this.selectedItem.text}</strong>. Now tap the matching container above!` : 'Tap a card below, then tap its container above (or drag and drop):'}
            </div>
            <div class="cards-tray">
              ${unsortedItems.map(it => {
                const isSelected = this.selectedItem && this.selectedItem.id === it.id;
                return `
                  <div 
                    class="draggable-card ${isSelected ? 'selected-card' : ''}" 
                    draggable="true" 
                    data-item-id="${it.id}"
                  >
                    <span class="card-title">${it.text}</span>
                    <span class="card-hint">💡 ${it.hint}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : `
          <div class="sorter-victory-box">
            <div class="victory-header">
              <span class="victory-icon">🎉</span>
              <h4>Outstanding! All reactions and compounds categorized with 100% precision!</h4>
            </div>
            <button id="sorter-next-challenge-btn" class="btn btn-accent mt-3">
              ${this.challengeIndex < sortingChallenges.length - 1 ? 'Next Sorting Challenge ➔' : 'Replay Sorting Lab ↺'}
            </button>
          </div>
        `}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const ch = this.getCurrentChallenge();

    // 1. Draggable Cards (Mouse drag)
    const cards = this.container.querySelectorAll(".draggable-card");
    cards.forEach((card) => {
      card.addEventListener("dragstart", (e) => {
        const itemId = card.getAttribute("data-item-id");
        e.dataTransfer.setData("text/plain", itemId);
      });

      // Tap to select (Mobile touch friendly)
      card.addEventListener("click", () => {
        sounds.playClick();
        const itemId = card.getAttribute("data-item-id");
        const found = ch.items.find(i => i.id === itemId);
        this.selectedItem = this.selectedItem?.id === itemId ? null : found;
        this.render();
      });
    });

    // 2. Dropzones & Tap Zones
    const bins = this.container.querySelectorAll(".sorting-bin, .bin-dropzone");
    bins.forEach((bin) => {
      bin.addEventListener("dragover", (e) => e.preventDefault());

      bin.addEventListener("drop", (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        const catId = bin.getAttribute("data-cat-id");
        this.evaluatePlacement(itemId, catId);
      });

      bin.addEventListener("click", () => {
        if (this.selectedItem) {
          const catId = bin.getAttribute("data-cat-id");
          this.evaluatePlacement(this.selectedItem.id, catId);
        }
      });
    });

    // 3. Next challenge
    const nextBtn = this.container.querySelector("#sorter-next-challenge-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sounds.playClick();
        this.challengeIndex = (this.challengeIndex + 1) % sortingChallenges.length;
        this.placements = {};
        this.selectedItem = null;
        this.isCompleted = false;
        this.render();
      });
    }
  }

  evaluatePlacement(itemId, targetCatId) {
    const ch = this.getCurrentChallenge();
    const item = ch.items.find(i => i.id === itemId);

    if (item && item.category === targetCatId) {
      // Correct bucket!
      sounds.playSuccess();
      this.placements[itemId] = targetCatId;
      this.selectedItem = null;

      // Check if all items in challenge are placed
      if (Object.keys(this.placements).length === ch.items.length) {
        sounds.playVictory();
        confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
        scoreboard.addPoints(450, "reactionsorter");
        this.isCompleted = true;
      }
      this.render();
    } else {
      // Incorrect bucket!
      sounds.playError();
      const binEl = this.container.querySelector(`.sorting-bin[data-cat-id="${targetCatId}"]`);
      if (binEl) {
        binEl.classList.add("bin-shake-error");
        setTimeout(() => binEl.classList.remove("bin-shake-error"), 500);
      }
    }
  }
}
