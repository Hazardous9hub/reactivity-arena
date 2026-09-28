/**
 * Privacy & Cookies Policy Modal
 * Details DPDP Act 2023 / GDPR compliance, zero tracking, and local storage data manager.
 */

import { scoreboard } from "./Scoreboard.js";
import { sounds } from "./SoundController.js";

export class PrivacyModal {
  constructor() {
    this.modalEl = null;
    this.createDom();
  }

  createDom() {
    const wrapper = document.createElement("div");
    wrapper.id = "privacy-modal-container";
    wrapper.className = "privacy-modal-backdrop hidden";
    wrapper.innerHTML = `
      <div class="privacy-modal-content">
        <div class="privacy-modal-header">
          <div class="privacy-title-group">
            <span class="privacy-badge">PRIVACY &bull; STUDENT SAFETY FIRST</span>
            <h3 class="privacy-title">🔒 Privacy &amp; Data Transparency Policy</h3>
          </div>
          <button class="privacy-close-btn" id="privacy-close-btn" aria-label="Close modal">&times;</button>
        </div>

        <div class="privacy-modal-body">
          <div class="policy-section">
            <h4>1. Zero Third-Party Tracking &amp; Advertising</h4>
            <p>
              Reactivity Arena does NOT utilize tracking cookies, advertising beacons, Google AdSense, or third-party behavioral analytics. Your learning sessions are 100% private, safe, and untracked.
            </p>
          </div>

          <div class="policy-section">
            <h4>2. What Data is Stored Locally?</h4>
            <p>
              We only use your browser's standard <strong>HTML5 LocalStorage</strong> to save your gameplay achievements locally on your device:
            </p>
            <ul class="policy-list">
              <li><strong>Points &amp; Score</strong>: Total points earned across Pinpoint, Crossclimb, Crossword, Chemle, and Reaction Lab.</li>
              <li><strong>Board Readiness Score</strong>: Calculated progress percentage toward Class 10 mastery.</li>
              <li><strong>Unlocked Badges</strong>: e.g. <em>Reactivity Scholar</em>, <em>Metallurgy Prodigy</em>.</li>
              <li><strong>Banner Preference</strong>: Dismissing the bottom privacy notification.</li>
            </ul>
          </div>

          <div class="policy-section">
            <h4>3. Compliance with Student Protection (DPDP Act 2023 &amp; GDPR)</h4>
            <p>
              Because this website is designed for school students and board aspirants, we strictly refrain from requesting names, emails, passwords, phone numbers, or device locations. Zero user data leaves your device.
            </p>
          </div>

          <div class="policy-danger-zone">
            <h4>⚠️ Local Data Management</h4>
            <p>You can reset all your locally saved scores, streaks, and badges at any time:</p>
            <button id="reset-storage-btn" class="btn btn-secondary btn-sm mt-2">
              🗑️ Clear My Saved Progress
            </button>
            <span id="reset-confirm-msg" class="reset-confirm-text"></span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    this.modalEl = wrapper;
    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector("#privacy-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }

    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.hide();
    });

    const resetBtn = this.modalEl.querySelector("#reset-storage-btn");
    const confirmMsg = this.modalEl.querySelector("#reset-confirm-msg");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sounds.playClick();
        if (confirm("Are you sure you want to reset all your points and badges?")) {
          localStorage.removeItem("alchemix_student_progress");
          scoreboard.data = scoreboard.loadData();
          scoreboard.notify();
          if (confirmMsg) {
            confirmMsg.textContent = "✓ Local progress wiped cleanly!";
            setTimeout(() => { confirmMsg.textContent = ""; }, 3000);
          }
        }
      });
    }
  }

  show() {
    if (this.modalEl) this.modalEl.classList.remove("hidden");
  }

  hide() {
    if (this.modalEl) this.modalEl.classList.add("hidden");
  }
}
