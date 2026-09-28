/**
 * Pinpoint Game Engine (Inspired by LinkedIn Pinpoint)
 * 5-Clue Deductions testing Class 10 Chemistry concepts.
 */

import { pinpointQuestions } from "../data/pinpointQuestions.js";
import { sounds } from "../components/SoundController.js";
import { scoreboard } from "../components/Scoreboard.js";
import confetti from "canvas-confetti";

export class PinpointGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.revealedClues = 1;
    this.isSolved = false;
    this.init();
  }

  init() {
    this.render();
  }

  getCurrentQuestion() {
    return pinpointQuestions[this.currentIndex];
  }

  getPointsForCurrentClue() {
    const pointsMap = [500, 400, 300, 200, 100];
    return pointsMap[this.revealedClues - 1] || 100;
  }

  render() {
    if (!this.container) return;
    const q = this.getCurrentQuestion();
    const potentialPoints = this.getPointsForCurrentClue();

    this.container.innerHTML = `
      <div class="game-card pinpoint-card">
        <div class="game-header">
          <div class="game-meta">
            <span class="game-badge">🎯 PINPOINT &bull; MYSTERY #${this.currentIndex + 1}/${pinpointQuestions.length}</span>
            <span class="category-tag">${q.category}</span>
          </div>
          <div class="points-pill">Worth: +${potentialPoints} PTS</div>
        </div>

        <div class="pinpoint-clues-list">
          ${q.clues.map((clue, idx) => `
            <div class="pinpoint-clue ${idx < this.revealedClues ? 'revealed' : 'locked'}">
              <span class="clue-number">Clue ${idx + 1}</span>
              <span class="clue-text">${idx < this.revealedClues ? clue : '••••••••••••••••••••••••••••••••••••'}</span>
            </div>
          `).join('')}
        </div>

        ${!this.isSolved ? `
          <div class="pinpoint-controls">
            <form id="pinpoint-form" class="guess-form">
              <input 
                type="text" 
                id="pinpoint-input" 
                class="game-input" 
                placeholder="Type your guess (e.g. Zinc, Cinnabar, Al₂O₃)..." 
                autocomplete="off" 
                required 
              />
              <button type="submit" class="btn btn-primary">Submit Guess</button>
            </form>

            <div class="pinpoint-actions">
              ${this.revealedClues < 5 ? `
                <button id="pinpoint-reveal-btn" class="btn btn-secondary">
                  💡 Need a hint? Reveal Clue ${this.revealedClues + 1} (-100 pts)
                </button>
              ` : `
                <span class="all-clues-revealed">All clues revealed! Take your best shot.</span>
              `}
            </div>
          </div>
          <div id="pinpoint-feedback" class="game-feedback"></div>
        ` : `
          <div class="pinpoint-victory-box">
            <div class="victory-header">
              <span class="victory-icon">🎉</span>
              <h4>Correct! The answer is <strong class="highlight-text">${q.target}</strong></h4>
            </div>
            <div class="board-fact-callout">
              <div class="fact-title">📋 CBSE Board Exam Key Concept:</div>
              <p>${q.boardFact}</p>
            </div>
            <button id="pinpoint-next-btn" class="btn btn-accent mt-4">
              ${this.currentIndex < pinpointQuestions.length - 1 ? 'Next Mystery ➔' : 'Play Again ↺'}
            </button>
          </div>
        `}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector("#pinpoint-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = this.container.querySelector("#pinpoint-input");
        this.checkGuess(input.value.trim());
      });
    }

    const revealBtn = this.container.querySelector("#pinpoint-reveal-btn");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.revealedClues < 5) {
          this.revealedClues++;
          this.render();
          const inp = this.container.querySelector("#pinpoint-input");
          if (inp) inp.focus();
        }
      });
    }

    const nextBtn = this.container.querySelector("#pinpoint-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sounds.playClick();
        this.currentIndex = (this.currentIndex + 1) % pinpointQuestions.length;
        this.revealedClues = 1;
        this.isSolved = false;
        this.render();
      });
    }
  }

  checkGuess(guess) {
    const q = this.getCurrentQuestion();
    const cleanGuess = guess.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanTarget = q.target.toLowerCase().replace(/[^a-z0-9]/g, "");
    const matchSynonym = q.synonyms.some(s => s.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanGuess);

    const feedback = this.container.querySelector("#pinpoint-feedback");

    if (cleanGuess === cleanTarget || matchSynonym) {
      // Solved!
      sounds.playSuccess();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      const earned = this.getPointsForCurrentClue();
      scoreboard.addPoints(earned, "pinpoint");
      this.isSolved = true;
      this.render();
    } else {
      // Wrong guess
      sounds.playError();
      if (feedback) {
        feedback.innerHTML = `<span class="feedback-error">❌ "${guess}" is incorrect. Try another element or reveal the next clue!</span>`;
      }
      // If clues remain, optionally reveal next clue automatically on mistake
      if (this.revealedClues < 5) {
        this.revealedClues++;
        setTimeout(() => this.render(), 900);
      }
    }
  }
}
