/**
 * Animated Header & Navigation HUD Component
 * Features glowing neon logo, audio toggle, and QR Code modal trigger.
 */

import { sounds } from "./SoundController.js";
import { scoreboard } from "./Scoreboard.js";

export class Header {
  constructor(containerId, qrModal) {
    this.container = document.getElementById(containerId);
    this.qrModal = qrModal;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <header class="app-header">
        <div class="header-inner">
          <!-- Animated Neon Logo -->
          <div class="brand-logo" id="logo-trigger">
            <div class="logo-symbol">
              <span class="atom-core">⚗️</span>
              <div class="electron-orbit orbit-1"></div>
              <div class="electron-orbit orbit-2"></div>
            </div>
            <div class="logo-text">
              <span class="logo-title">ALCHEMIX <span class="accent-3d">3D</span></span>
              <span class="logo-subtitle">Class 10 CBSE Science &bull; Metals &amp; Non-Metals</span>
            </div>
          </div>

          <!-- Navigation & Quick Stats HUD -->
          <div class="header-hud">
            <div class="hud-stat" id="readiness-hud" title="CBSE Board Readiness Index">
              <span class="hud-label">Readiness</span>
              <span class="hud-value" id="hud-readiness-val">0%</span>
            </div>
            <div class="hud-stat points-hud" title="Accumulated Alchemist Points">
              <span class="hud-label">Points</span>
              <span class="hud-value" id="hud-points-val">0</span>
            </div>

            <!-- Controls -->
            <button id="sound-toggle-btn" class="header-icon-btn" aria-label="Toggle Sound" title="Sound Effects">
              <span id="sound-icon">🔊</span>
            </button>

            <button id="qr-trigger-btn" class="btn btn-qr-glow" title="Generate QR Code for Students">
              <span class="qr-btn-icon">📱</span>
              <span class="qr-btn-text">Share QR</span>
            </button>
          </div>
        </div>
      </header>
    `;

    this.bindEvents();
    this.subscribeScoreboard();
  }

  bindEvents() {
    const qrBtn = this.container.querySelector("#qr-trigger-btn");
    if (qrBtn && this.qrModal) {
      qrBtn.addEventListener("click", () => {
        sounds.playClick();
        this.qrModal.show();
      });
    }

    const soundBtn = this.container.querySelector("#sound-toggle-btn");
    const soundIcon = this.container.querySelector("#sound-icon");
    if (soundBtn && soundIcon) {
      soundBtn.addEventListener("click", () => {
        const isMuted = sounds.toggleMute();
        soundIcon.textContent = isMuted ? "🔇" : "🔊";
      });
    }

    const logo = this.container.querySelector("#logo-trigger");
    if (logo) {
      logo.addEventListener("click", () => {
        sounds.playClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  subscribeScoreboard() {
    scoreboard.subscribe((data) => {
      const pointsVal = this.container.querySelector("#hud-points-val");
      const readinessVal = this.container.querySelector("#hud-readiness-val");
      if (pointsVal) pointsVal.textContent = data.points;
      if (readinessVal) readinessVal.textContent = `${scoreboard.getBoardReadiness()}%`;
    });
  }
}
