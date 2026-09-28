/**
 * Cyber-Chemistry Preloader Screen
 * Shows glowing atomic simulation, progress bar, and tips before fading out smoothly via GSAP.
 */

import { gsap } from "gsap";

export class Loader {
  constructor() {
    this.loaderEl = null;
    this.createDom();
  }

  createDom() {
    const loader = document.createElement("div");
    loader.id = "app-preloader";
    loader.className = "preloader-overlay";
    loader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-atom">
          <div class="atom-core-pulse">⚗️</div>
          <div class="preloader-ring ring-1"></div>
          <div class="preloader-ring ring-2"></div>
          <div class="preloader-ring ring-3"></div>
        </div>

        <h2 class="preloader-brand">REACTIVITY <span class="accent-3d">ARENA</span></h2>
        <div class="preloader-subtitle">Igniting Class 10 Science &bull; Metals &amp; Non-Metals</div>

        <div class="preloader-bar-wrapper">
          <div class="preloader-bar" id="preloader-bar-fill"></div>
        </div>

        <div class="preloader-status" id="preloader-status-text">Synthesizing 3D atomic lattices...</div>
      </div>
    `;
    document.body.appendChild(loader);
    this.loaderEl = loader;
  }

  start() {
    const bar = document.getElementById("preloader-bar-fill");
    const statusText = document.getElementById("preloader-status-text");

    const steps = [
      { pct: 25, text: "Charging electrolytes & copper ions..." },
      { pct: 55, text: "Calibrating reactivity series ladder..." },
      { pct: 85, text: "Heating crucible for thermite welding..." },
      { pct: 100, text: "Reactivity Arena Ready!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const s = steps[currentStep];
        if (bar) bar.style.width = `${s.pct}%`;
        if (statusText) statusText.textContent = s.text;
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => this.finish(), 300);
      }
    }, 180);
  }

  finish() {
    if (!this.loaderEl) return;
    gsap.to(this.loaderEl, {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        if (this.loaderEl && this.loaderEl.parentNode) {
          this.loaderEl.parentNode.removeChild(this.loaderEl);
        }
      }
    });
  }
}
