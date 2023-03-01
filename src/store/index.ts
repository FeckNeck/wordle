import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    solution: "WORDLE",
    currentRow: 0,
    currentCol: 0,
    guesses: ["", "", "", "", "", ""],
    found: ["", "", "", "", "", ""],
    hint: ["", "", "", "", "", ""],
    miss: ["", "", "", "", "", ""],
  }),
  actions: {
    inputLetter(letter: string) {
      const isAlpha = /^[A-Z]$/;
      const word = this.guesses[this.currentRow];
      if (isAlpha.test(letter) && word.length < 5) {
        this.guesses[this.currentRow] += letter;
        this.currentCol++;
      } else if (letter == "ENTER" && word.length == 5) {
        this.wordValidation();
        this.currentRow++;
        this.currentCol = 0;
      } else if (letter == "BACKSPACE" && word.length > 0) {
        this.guesses[this.currentRow] = word.slice(0, -1);
        this.currentCol--;
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
  },
});
