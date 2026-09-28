/**
 * Guess Word Engine (Chemle / Periodic Wordle)
 * 6-attempt chemistry term guessing with on-screen keyboard and board fact popup.
 */

import { guessWords } from "../data/guessWords.js";
import { sounds } from "../components/SoundController.js";
import { scoreboard } from "../components/Scoreboard.js";
import confetti from "canvas-confetti";

export class GuessWordGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.maxGuesses = 6;
    this.guesses = [];
    this.currentGuess = "";
    this.isGameOver = false;
    this.isWin = false;

    this.keyStatuses = {}; // letter -> "correct" | "present" | "absent"

    this.init();
  }

  init() {
    this.render();
    this.bindKeyboard();
  }

  getTargetWordObj() {
    return guessWords[this.currentIndex];
  }

  render() {
    if (!this.container) return;
    const targetObj = this.getTargetWordObj();
    const wordLen = targetObj.length;

    // Grid rows
    let gridHtml = "";
    for (let r = 0; r < this.maxGuesses; r++) {
      const isPastRow = r < this.guesses.length;
      const isCurrentRow = r === this.guesses.length;
      const rowGuess = isPastRow ? this.guesses[r] : isCurrentRow ? this.currentGuess : "";

      gridHtml += `<div class="wordle-row">`;
      for (let c = 0; c < wordLen; c++) {
        const char = rowGuess[c] || "";
        let cellClass = "wordle-cell";
        if (isPastRow) {
          const evalClass = this.evaluateLetter(targetObj.word, this.guesses[r], c);
          cellClass += ` ${evalClass} cell-flip`;
        } else if (char) {
          cellClass += " cell-active";
        }
        gridHtml += `<div class="${cellClass}">${char}</div>`;
      }
      gridHtml += `</div>`;
    }

    // Keyboard
    const kbRows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    const keyboardHtml = kbRows.map(row => `
      <div class="kb-row">
        ${row.map(k => {
          const status = this.keyStatuses[k] || "";
          const isWide = k === "ENTER" || k === "⌫";
          return `
            <button class="kb-key ${isWide ? 'wide-key' : ''} ${status}" data-key="${k}">
              ${k}
            </button>
          `;
        }).join('')}
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="game-card guessword-card">
        <div class="game-header">
          <div class="game-meta">
            <span class="game-badge">🔤 CHEMLE &bull; WORD #${this.currentIndex + 1}/${guessWords.length}</span>
            <span class="category-tag">${wordLen} Letters</span>
          </div>
          <div class="points-pill">+350 PTS</div>
        </div>

        <div class="chemle-hint-banner">
          💡 <strong>Hint:</strong> ${targetObj.hint}
        </div>

        <div class="wordle-grid-wrapper">
          <div class="wordle-grid">
            ${gridHtml}
          </div>
        </div>

        ${!this.isGameOver ? `
          <div class="virtual-keyboard">
            ${keyboardHtml}
          </div>
        ` : `
          <div class="wordle-endgame-box ${this.isWin ? 'win-box' : 'lose-box'}">
            <div class="victory-header">
              <span class="victory-icon">${this.isWin ? '🎉' : '💡'}</span>
              <h4>${this.isWin ? 'Genius! You cracked the code:' : 'Nice attempt! The word was:'} <strong class="highlight-text">${targetObj.word}</strong></h4>
            </div>
            <div class="board-fact-callout">
              <div class="fact-title">📋 Board Exam Application:</div>
              <p>${targetObj.fact}</p>
            </div>
            <button id="chemle-next-btn" class="btn btn-accent mt-3">
              ${this.currentIndex < guessWords.length - 1 ? 'Next Chemle Word ➔' : 'Replay Words ↺'}
            </button>
          </div>
        `}
      </div>
    `;

    this.bindEvents();
  }

  evaluateLetter(target, guess, index) {
    const letter = guess[index];
    if (target[index] === letter) {
      return "status-correct";
    }
    if (target.includes(letter)) {
      return "status-present";
    }
    return "status-absent";
  }

  bindKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (this.isGameOver) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const key = e.key.toUpperCase();
      if (key === "ENTER") {
        this.submitGuess();
      } else if (key === "BACKSPACE") {
        this.deleteLetter();
      } else if (/^[A-Z]$/.test(key)) {
        this.addLetter(key);
      }
    });
  }

  bindEvents() {
    const keys = this.container.querySelectorAll(".kb-key");
    keys.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isGameOver) return;
        const k = btn.getAttribute("data-key");
        if (k === "ENTER") {
          this.submitGuess();
        } else if (k === "⌫") {
          this.deleteLetter();
        } else {
          this.addLetter(k);
        }
      });
    });

    const nextBtn = this.container.querySelector("#chemle-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sounds.playClick();
        this.currentIndex = (this.currentIndex + 1) % guessWords.length;
        this.guesses = [];
        this.currentGuess = "";
        this.keyStatuses = {};
        this.isGameOver = false;
        this.isWin = false;
        this.render();
      });
    }
  }

  addLetter(letter) {
    const targetObj = this.getTargetWordObj();
    if (this.currentGuess.length < targetObj.length) {
      sounds.playClick();
      this.currentGuess += letter;
      this.render();
    }
  }

  deleteLetter() {
    if (this.currentGuess.length > 0) {
      sounds.playClick();
      this.currentGuess = this.currentGuess.slice(0, -1);
      this.render();
    }
  }

  submitGuess() {
    const targetObj = this.getTargetWordObj();
    if (this.currentGuess.length !== targetObj.length) {
      sounds.playError();
      return;
    }

    const guess = this.currentGuess;
    const target = targetObj.word;
    this.guesses.push(guess);
    this.currentGuess = "";

    // Update keyboard statuses
    for (let i = 0; i < guess.length; i++) {
      const char = guess[i];
      if (target[i] === char) {
        this.keyStatuses[char] = "status-correct";
      } else if (target.includes(char) && this.keyStatuses[char] !== "status-correct") {
        this.keyStatuses[char] = "status-present";
      } else if (!target.includes(char)) {
        this.keyStatuses[char] = "status-absent";
      }
    }

    // Win condition
    if (guess === target) {
      this.isGameOver = true;
      this.isWin = true;
      sounds.playVictory();
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      scoreboard.addPoints(350, "guessword");
    } else if (this.guesses.length >= this.maxGuesses) {
      // Out of guesses
      this.isGameOver = true;
      this.isWin = false;
      sounds.playError();
    } else {
      sounds.playSuccess();
    }

    this.render();
  }
}
