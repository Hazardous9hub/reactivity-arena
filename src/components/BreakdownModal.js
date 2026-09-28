/**
 * Custom Concept & Reaction Breakdown Modal
 * Provides deep-dive chemical breakdowns, oxidation states, and board exam marking criteria.
 */

import { sounds } from "./SoundController.js";

export class BreakdownModal {
  constructor() {
    this.modalEl = null;
    this.createDom();
  }

  createDom() {
    const wrapper = document.createElement("div");
    wrapper.id = "breakdown-modal-container";
    wrapper.className = "breakdown-modal-backdrop hidden";
    wrapper.innerHTML = `
      <div class="breakdown-modal-content">
        <div class="breakdown-modal-header">
          <div class="breakdown-title-group">
            <span class="breakdown-badge" id="breakdown-cat">CONCEPT DEEP-DIVE</span>
            <h3 class="breakdown-title" id="breakdown-title">Chemical Breakdown</h3>
          </div>
          <button class="breakdown-close-btn" id="breakdown-close-btn" aria-label="Close modal">&times;</button>
        </div>

        <div class="breakdown-body">
          <div class="breakdown-eq-box" id="breakdown-eq"></div>

          <div class="breakdown-section">
            <h4>🔬 Detailed Reaction Mechanism</h4>
            <p id="breakdown-desc"></p>
          </div>

          <div class="breakdown-section">
            <h4>⚡ Reaction Conditions &amp; States</h4>
            <p id="breakdown-cond"></p>
          </div>

          <div class="breakdown-secret-callout">
            <div class="callout-header">🎯 CBSE Board Exam High-Yield Tip:</div>
            <p id="breakdown-trap"></p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    this.modalEl = wrapper;
    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector("#breakdown-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }

    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.hide();
    });
  }

  show(reaction) {
    if (!this.modalEl) return;
    sounds.playClick();

    this.modalEl.querySelector("#breakdown-cat").textContent = reaction.category.toUpperCase();
    this.modalEl.querySelector("#breakdown-title").textContent = reaction.title;
    this.modalEl.querySelector("#breakdown-eq").innerHTML = `
      <span class="rx-reactants">${reaction.reactants}</span>
      <span class="rx-arrow">➔</span>
      <span class="rx-products">${reaction.products}</span>
    `;
    this.modalEl.querySelector("#breakdown-desc").textContent = reaction.description;
    this.modalEl.querySelector("#breakdown-cond").textContent = reaction.conditions;
    this.modalEl.querySelector("#breakdown-trap").textContent = reaction.boardTrap;

    this.modalEl.classList.remove("hidden");
  }

  hide() {
    if (this.modalEl) this.modalEl.classList.add("hidden");
  }
}
