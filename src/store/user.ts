import { defineStore } from "pinia";

export const useUserStore = defineStore("stats", {
  state: () => {
    return {
      nbGames: 0,
      nbWins: 0,
      bestStreak: 0,
      currentStreak: 0,
      nbAttempts: new Array<number>(7).fill(0),
    };
  },
  actions: {
    initUserStats() {
      const userStats = localStorage.getItem("user");
      if (userStats) {
        const user = JSON.parse(userStats as string);
        this.nbGames = user.nbGames;
        this.nbWins = user.nbWins;
        this.bestStreak = user.bestStreak;
        this.currentStreak = user.currentStreak;
        this.nbAttempts = user.nbAttempts;
      }
    },
    saveToLocalStorage() {
      const user = {
        nbGames: this.nbGames,
        nbWins: this.nbWins,
        bestStreak: this.bestStreak,
        currentStreak: this.currentStreak,
        nbAttempts: this.nbAttempts,
      };
      localStorage.setItem("user", JSON.stringify(user));
    },
    setUserStats(gameState: string, nbAttempts: number) {
      this.nbGames++;
      if (gameState === "win") {
        this.nbWins++;
        this.currentStreak++;
        this.nbAttempts[nbAttempts] += 1;
        if (this.currentStreak > this.bestStreak) {
          this.bestStreak = this.currentStreak;
        }
      } else {
        this.currentStreak = 0;
        this.nbAttempts[6] += 1;
      }
      this.saveToLocalStorage();
    },
  },
});
