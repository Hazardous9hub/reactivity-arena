/**
 * Student Scoreboard & CBSE Readiness Tracker
 * Tracks points, game streaks, unlocked badges, and saves to localStorage.
 */

const STORAGE_KEY = "alchemix_student_progress";

class Scoreboard {
  constructor() {
    this.data = this.loadData();
    this.listeners = [];
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("LocalStorage access failed, using memory state", e);
    }
    return {
      points: 0,
      gamesPlayed: 0,
      streak: 0,
      lastPlayedDate: null,
      badges: [],
      completedGames: {
        pinpoint: 0,
        crossclimb: 0,
        crossword: 0,
        guessword: 0,
        reactionsorter: 0
      }
    };
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Failed to persist to localStorage", e);
    }
    this.notify();
  }

  addPoints(amount, gameKey) {
    this.data.points += amount;
    this.data.gamesPlayed += 1;
    if (gameKey && this.data.completedGames[gameKey] !== undefined) {
      this.data.completedGames[gameKey] += 1;
    }
    this.checkBadges();
    this.saveData();
    return this.data.points;
  }

  checkBadges() {
    const b = this.data.badges;
    if (this.data.points >= 500 && !b.includes("alchemist-novice")) {
      b.push("alchemist-novice");
    }
    if (this.data.points >= 1500 && !b.includes("reactivity-scholar")) {
      b.push("reactivity-scholar");
    }
    if (this.data.points >= 3000 && !b.includes("metallurgy-prodigy")) {
      b.push("metallurgy-prodigy");
    }
    if (this.data.points >= 5000 && !b.includes("cbse-centum-legend")) {
      b.push("cbse-centum-legend");
    }
  }

  getBoardReadiness() {
    // Calculates a 0-100% board readiness score
    const targetPoints = 3500;
    const pct = Math.min(100, Math.round((this.data.points / targetPoints) * 100));
    return pct;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.data);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.data));
  }
}

export const scoreboard = new Scoreboard();
