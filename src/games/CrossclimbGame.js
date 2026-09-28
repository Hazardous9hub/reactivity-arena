/**
 * Crossclimb Game Engine (Inspired by LinkedIn Crossclimb & SciChamp)
 * Vertical Reactivity Series ladder climb testing metal hierarchies and displacement.
 */

import { ladderRounds, reactivitySeries } from "../data/reactivityLadder.js";
import { sounds } from "../components/SoundController.js";
import { scoreboard } from "../components/Scoreboard.js";
import confetti from "canvas-confetti";

export class CrossclimbGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentRoundIndex = 0;
    this.solvedRungs = new Set();
    this.selectedOption = null;
    this.isRoundComplete = false;
    this.init();
  }

  init() {
    this.render();
  }

  getCurrentRound() {
    return ladderRounds[this.currentRoundIndex];
  }

  render() {
    if (!this.container) return;
    const round = this.getCurrentRound();

    // Prepare selectable options for this round
    const options = [...round.rungs].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div class="game-card crossclimb-card">
        <div class="game-header">
          <div class="game-meta">
            <span class="game-badge">🧗 CROSSCLIMB &bull; ROUND ${this.currentRoundIndex + 1}/${ladderRounds.length}</span>
            <span class="category-tag">${round.title}</span>
          </div>
          <div class="points-pill">+400 PTS PER LADDER</div>
        </div>

        <p class="game-instruction">${round.instruction}</p>

        <div class="crossclimb-layout">
          <!-- The Vertical Ladder -->
          <div class="vertical-ladder">
            ${round.rungs.map((rung, index) => {
              const isSolved = this.solvedRungs.has(rung.id);
              const rungNum = round.rungs.length - index; // climbing 4, 3, 2, 1
              return `
                <div class="ladder-rung ${isSolved ? 'rung-solved' : 'rung-unsolved'}" data-rung-id="${rung.id}">
                  <div class="rung-side-rail left-rail"></div>
                  <div class="rung-content">
                    <span class="rung-step-badge">Rung ${rungNum}</span>
                    <span class="rung-prompt">${rung.prompt}</span>
                    <div class="rung-target-slot ${isSolved ? 'filled' : ''}" data-rung-id="${rung.id}">
                      ${isSolved ? `<span class="metal-pill">${rung.answer} (${rung.symbol})</span>` : 'Drop or Tap Metal Here'}
                    </div>
                  </div>
                  <div class="rung-side-rail right-rail"></div>
                </div>
              `;
            }).reverse().join('')}
          </div>

          <!-- The Pool of Selectable Metals -->
          ${!this.isRoundComplete ? `
            <div class="metal-options-pool">
              <div class="pool-title">Tap a Metal, then tap the matching Rung:</div>
              <div class="options-grid">
                ${options.map((r) => {
                  const alreadyUsed = this.solvedRungs.has(r.id);
                  const isSelected = this.selectedOption === r.answer;
                  return `
                    <button 
                      class="metal-token ${alreadyUsed ? 'disabled' : ''} ${isSelected ? 'selected' : ''}"
                      data-symbol="${r.answer}"
                      data-rung-id="${r.id}"
                      ${alreadyUsed ? 'disabled' : ''}
                    >
                      <span class="token-symbol">${r.answer}</span>
                      <span class="token-name">${r.symbol}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : `
            <div class="ladder-cleared-box">
              <div class="victory-header">
                <span class="victory-icon">🏆</span>
                <h4>Summit Reached! Reactivity Series Mastered!</h4>
              </div>
              <div class="board-fact-callout">
                <div class="fact-title">📋 CBSE Marking Key:</div>
                <p>${round.boardNote}</p>
              </div>
              <button id="crossclimb-next-round" class="btn btn-accent mt-3">
                ${this.currentRoundIndex < ladderRounds.length - 1 ? 'Next Ladder Round ➔' : 'Replay Ladders ↺'}
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 1. Selecting metal tokens
    const tokens = this.container.querySelectorAll(".metal-token:not([disabled])");
    tokens.forEach((btn) => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        const symbol = btn.getAttribute("data-symbol");
        this.selectedOption = this.selectedOption === symbol ? null : symbol;
        this.render();
      });
    });

    // 2. Tapping on a target rung
    const rungs = this.container.querySelectorAll(".ladder-rung.rung-unsolved");
    rungs.forEach((rungEl) => {
      rungEl.addEventListener("click", () => {
        if (!this.selectedOption) return;
        const rungId = rungEl.getAttribute("data-rung-id");
        this.attemptPlace(rungId, this.selectedOption);
      });
    });

    // 3. Next round button
    const nextBtn = this.container.querySelector("#crossclimb-next-round");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sounds.playClick();
        this.currentRoundIndex = (this.currentRoundIndex + 1) % ladderRounds.length;
        this.solvedRungs.clear();
        this.selectedOption = null;
        this.isRoundComplete = false;
        this.render();
      });
    }
  }

  attemptPlace(rungId, chosenSymbol) {
    const round = this.getCurrentRound();
    const targetRung = round.rungs.find(r => r.id === rungId);

    if (targetRung && targetRung.answer === chosenSymbol) {
      // Correct rung!
      sounds.playSuccess();
      this.solvedRungs.add(rungId);
      this.selectedOption = null;

      // Check if all rungs solved
      if (this.solvedRungs.size === round.rungs.length) {
        sounds.playVictory();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        scoreboard.addPoints(400, "crossclimb");
        this.isRoundComplete = true;
      }
      this.render();
    } else {
      // Wrong rung
      sounds.playError();
      const rungEl = this.container.querySelector(`[data-rung-id="${rungId}"]`);
      if (rungEl) {
        rungEl.classList.add("rung-shake");
        setTimeout(() => rungEl.classList.remove("rung-shake"), 500);
      }
    }
  }
}
