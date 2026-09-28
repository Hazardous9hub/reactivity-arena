/**
 * Interactive Crossword Puzzle Engine
 * Class 10 CBSE Board Exam Chapter 3 Edition
 */

import { crosswordPuzzles } from "../data/crosswordClues.js";
import { sounds } from "../components/SoundController.js";
import { scoreboard } from "../components/Scoreboard.js";
import confetti from "canvas-confetti";

export class CrosswordGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.puzzle = crosswordPuzzles[0];
    this.grid = {}; // key: "r,c" -> { letter, answer, number, words: [] }
    this.activeWord = null;
    this.activeCell = null;
    this.isCompleted = false;

    this.buildGridModel();
    this.init();
  }

  buildGridModel() {
    this.puzzle.words.forEach((w) => {
      const isAcross = w.direction === "across";
      for (let i = 0; i < w.answer.length; i++) {
        const r = isAcross ? w.row : w.row + i;
        const c = isAcross ? w.col + i : w.col;
        const key = `${r},${c}`;

        if (!this.grid[key]) {
          this.grid[key] = {
            row: r,
            col: c,
            letter: "",
            answer: w.answer[i],
            number: i === 0 ? w.number : null,
            words: []
          };
        } else if (i === 0 && !this.grid[key].number) {
          this.grid[key].number = w.number;
        }
        this.grid[key].words.push(w);
      }
    });
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;
    const size = this.puzzle.size;

    let cellsHtml = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const key = `${r},${c}`;
        const cellData = this.grid[key];

        if (cellData) {
          const isSelected = this.activeCell === key;
          const isHighlighted = this.activeWord && cellData.words.some(w => w.number === this.activeWord.number && w.direction === this.activeWord.direction);
          const isCorrect = cellData.letter.toUpperCase() === cellData.answer;

          cellsHtml += `
            <div 
              class="crossword-cell active-cell ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${isCorrect ? 'correct' : ''}" 
              data-key="${key}"
              data-row="${r}"
              data-col="${c}"
            >
              ${cellData.number ? `<span class="cell-num">${cellData.number}</span>` : ''}
              <input 
                type="text" 
                maxlength="1" 
                class="cell-input" 
                value="${cellData.letter}" 
                data-key="${key}"
                autocomplete="off"
                autocapitalize="characters"
              />
            </div>
          `;
        } else {
          cellsHtml += `<div class="crossword-cell block-cell"></div>`;
        }
      }
    }

    const acrossWords = this.puzzle.words.filter(w => w.direction === "across");
    const downWords = this.puzzle.words.filter(w => w.direction === "down");

    this.container.innerHTML = `
      <div class="game-card crossword-card">
        <div class="game-header">
          <div class="game-meta">
            <span class="game-badge">🧩 CHEMICAL CROSSWORD</span>
            <span class="category-tag">CBSE Chapter 3 Board Grid</span>
          </div>
          <div class="points-pill">+500 PTS ON CLEAR</div>
        </div>

        <div class="crossword-layout">
          <!-- Crossword Grid -->
          <div class="crossword-grid-wrapper">
            <div class="crossword-grid" style="grid-template-columns: repeat(${size}, 1fr);">
              ${cellsHtml}
            </div>

            <div class="crossword-toolbar">
              <button id="crossword-check-btn" class="btn btn-primary">✓ Check Answers</button>
              <button id="crossword-hint-btn" class="btn btn-secondary">💡 Reveal Letter</button>
            </div>
          </div>

          <!-- Clue Lists -->
          <div class="crossword-clues-panel">
            <div class="clue-section">
              <h4 class="clue-heading">Across</h4>
              <div class="clue-list">
                ${acrossWords.map(w => `
                  <div class="clue-item ${this.activeWord === w ? 'active-clue' : ''}" data-word-num="${w.number}" data-dir="across">
                    <span class="clue-num-tag">${w.number}</span>
                    <span class="clue-text">${w.clue} <strong class="word-len">(${w.answer.length})</strong></span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="clue-section">
              <h4 class="clue-heading">Down</h4>
              <div class="clue-list">
                ${downWords.map(w => `
                  <div class="clue-item ${this.activeWord === w ? 'active-clue' : ''}" data-word-num="${w.number}" data-dir="down">
                    <span class="clue-num-tag">${w.number}</span>
                    <span class="clue-text">${w.clue} <strong class="word-len">(${w.answer.length})</strong></span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        ${this.isCompleted ? `
          <div class="crossword-congrats">
            🎉 Brilliant! You've completely solved the Class 10 Chemical Crossword! (+500 PTS)
          </div>
        ` : ''}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // 1. Inputs handling
    const inputs = this.container.querySelectorAll(".cell-input");
    inputs.forEach((input) => {
      const key = input.getAttribute("data-key");

      input.addEventListener("focus", () => {
        this.activeCell = key;
        const cellData = this.grid[key];
        if (cellData && cellData.words.length > 0) {
          if (!this.activeWord || !cellData.words.includes(this.activeWord)) {
            this.activeWord = cellData.words[0];
          }
        }
        this.renderHighlightsOnly();
      });

      input.addEventListener("input", (e) => {
        sounds.playClick();
        const val = e.target.value.toUpperCase();
        this.grid[key].letter = val;

        if (val) {
          this.advanceFocus(key);
        }
        this.checkAllWordsSilently();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !this.grid[key].letter) {
          this.retreatFocus(key);
        }
      });
    });

    // 2. Clue clicks
    const clueItems = this.container.querySelectorAll(".clue-item");
    clueItems.forEach((item) => {
      item.addEventListener("click", () => {
        sounds.playClick();
        const num = parseInt(item.getAttribute("data-word-num"));
        const dir = item.getAttribute("data-dir");
        const found = this.puzzle.words.find(w => w.number === num && w.direction === dir);
        if (found) {
          this.activeWord = found;
          this.activeCell = `${found.row},${found.col}`;
          this.render();
          const targetInput = this.container.querySelector(`.cell-input[data-key="${this.activeCell}"]`);
          if (targetInput) targetInput.focus();
        }
      });
    });

    // 3. Check button
    const checkBtn = this.container.querySelector("#crossword-check-btn");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        this.validateAll();
      });
    }

    // 4. Hint button
    const hintBtn = this.container.querySelector("#crossword-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        sounds.playClick();
        this.revealActiveCell();
      });
    }
  }

  advanceFocus(currentKey) {
    if (!this.activeWord) return;
    const [r, c] = currentKey.split(",").map(Number);
    const nextKey = this.activeWord.direction === "across" ? `${r},${c + 1}` : `${r + 1},${c}`;
    const nextInput = this.container.querySelector(`.cell-input[data-key="${nextKey}"]`);
    if (nextInput) nextInput.focus();
  }

  retreatFocus(currentKey) {
    if (!this.activeWord) return;
    const [r, c] = currentKey.split(",").map(Number);
    const prevKey = this.activeWord.direction === "across" ? `${r},${c - 1}` : `${r - 1},${c}`;
    const prevInput = this.container.querySelector(`.cell-input[data-key="${prevKey}"]`);
    if (prevInput) prevInput.focus();
  }

  renderHighlightsOnly() {
    this.container.querySelectorAll(".crossword-cell.active-cell").forEach((el) => {
      const key = el.getAttribute("data-key");
      const cellData = this.grid[key];
      const isSelected = this.activeCell === key;
      const isHighlighted = this.activeWord && cellData.words.some(w => w.number === this.activeWord.number && w.direction === this.activeWord.direction);

      el.classList.toggle("selected", isSelected);
      el.classList.toggle("highlighted", isHighlighted);
    });

    this.container.querySelectorAll(".clue-item").forEach((el) => {
      const num = parseInt(el.getAttribute("data-word-num"));
      const dir = el.getAttribute("data-dir");
      const isActive = this.activeWord && this.activeWord.number === num && this.activeWord.direction === dir;
      el.classList.toggle("active-clue", isActive);
    });
  }

  revealActiveCell() {
    if (!this.activeCell || !this.grid[this.activeCell]) return;
    const cell = this.grid[this.activeCell];
    cell.letter = cell.answer;
    const inp = this.container.querySelector(`.cell-input[data-key="${this.activeCell}"]`);
    if (inp) inp.value = cell.answer;
    this.advanceFocus(this.activeCell);
    this.checkAllWordsSilently();
  }

  checkAllWordsSilently() {
    let allSolved = true;
    for (const key in this.grid) {
      if (this.grid[key].letter.toUpperCase() !== this.grid[key].answer) {
        allSolved = false;
        break;
      }
    }
    if (allSolved && !this.isCompleted) {
      this.isCompleted = true;
      sounds.playVictory();
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      scoreboard.addPoints(500, "crossword");
      this.render();
    }
  }

  validateAll() {
    let mistakes = 0;
    for (const key in this.grid) {
      const cell = this.grid[key];
      const el = this.container.querySelector(`.crossword-cell[data-key="${key}"]`);
      if (cell.letter) {
        if (cell.letter.toUpperCase() === cell.answer) {
          if (el) el.classList.add("correct");
        } else {
          mistakes++;
          if (el) {
            el.classList.add("incorrect");
            setTimeout(() => el.classList.remove("incorrect"), 800);
          }
        }
      } else {
        mistakes++;
      }
    }

    if (mistakes === 0) {
      this.isCompleted = true;
      sounds.playVictory();
      confetti({ particleCount: 100, spread: 80 });
      scoreboard.addPoints(500, "crossword");
      this.render();
    } else {
      sounds.playError();
    }
  }
}
