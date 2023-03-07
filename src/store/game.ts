import { defineStore } from "pinia";
import words from "../assets/words/words.json";

export const useGameStore = defineStore("game", {
  state: () => ({
    solution: words[Math.floor(Math.random() * words.length)],
    currentRow: 0,
    currentCol: 0,
    gameState: "going",
    guesses: ["", "", "", "", "", ""],
    found: ["", "", "", "", "", ""],
    hint: ["", "", "", "", "", ""],
    miss: ["", "", "", "", "", ""],
    isWordValid: true,
  }),
  actions: {
    inputLetter(letter: string) {
      if (this.gameState === "going") {
        const isAlpha = /^[A-Z]$/;
        const word = this.guesses[this.currentRow];
        if (isAlpha.test(letter) && word.length < 5) {
          this.guesses[this.currentRow] += letter;
          this.currentCol++;
        } else if (letter == "ENTER" && word.length == 5) {
          if (!words.includes(word)) {
            this.isWordValid = false;
            setTimeout(() => {
              this.isWordValid = true;
            }, 1700);
            return;
          }
          this.wordValidation();
          this.isGameOver();
          if (this.gameState === "going") {
            this.currentCol = 0;
          }
          this.currentRow++;
        } else if (letter == "BACKSPACE" && word.length > 0) {
          this.guesses[this.currentRow] = word.slice(0, -1);
          this.currentCol--;
        }
      }
    },
    wordValidation() {
      const word = this.guesses[this.currentRow];
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (letter == this.solution[i]) {
          this.found[this.currentRow] += letter;
        } else if (this.solution.includes(letter)) {
          this.hint[this.currentRow] += letter;
        } else {
          this.miss[this.currentRow] += letter;
        }
      }
    },
    isGameOver() {
      if (this.guesses[this.currentRow] === this.solution) {
        this.gameState = "win";
      } else if (this.currentRow === 5) {
        this.gameState = "lose";
      }
    },
  },
});
