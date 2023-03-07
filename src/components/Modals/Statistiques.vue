<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useUserStore } from "../../store/user";
import { useGameStore } from "../../store/game";

const userStore = useUserStore();
const gameStore = useGameStore();

const { initUserStats } = userStore;
const { nbGames, nbWins, currentStreak, bestStreak, nbAttempts } =
  storeToRefs(userStore);
const { solution, currentRow, gameState } = storeToRefs(gameStore);

const emit = defineEmits(["closeStats"]);

onMounted(() => initUserStats());

const winRatio = computed(() => {
  return nbGames.value === 0
    ? 0
    : Math.round((nbWins.value / nbGames.value) * 100);
});

function checkAttempts(row: number) {
  return {
    active: currentRow.value - 1 === row && gameState.value == "win",
  };
}

function restart() {
  gameStore.$reset();
  emit("closeStats");
}
</script>
<template>
  <div class="modal-header">
    <p class="modal-title">Statistiques</p>
    <button class="modal-button" @click="emit('closeStats')">
      <img src="../../assets/icons/x.svg" alt="close modal" />
    </button>
  </div>
  <div class="stats-content">
    <div class="stats-item">
      <p class="item-title">{{ nbGames }}</p>
      <p class="item-label">parties</p>
    </div>
    <div class="stats-item">
      <p class="item-title">{{ winRatio }}</p>
      <p class="item-label">Victoires(%)</p>
    </div>
    <div class="stats-item">
      <p class="item-title">{{ currentStreak }}</p>
      <p class="item-label">Série actuelle</p>
    </div>
    <div class="stats-item">
      <p class="item-title">{{ bestStreak }}</p>
      <p class="item-label">Meilleure série</p>
    </div>
  </div>
  <p class="stats-title">Performances</p>
  <div class="perf-container">
    <div v-for="(attempt, index) in nbAttempts">
      <div v-if="index == 6" class="perf-item">
        <img src="../../assets/icons/skull.svg" alt="skull" class="skull" />
        <div
          class="perf-bar"
          :class="{ active: gameState === 'lose' }"
          :style="{ width: (attempt / nbGames) * 100 + '%' }"
        >
          {{ attempt }}
        </div>
      </div>
      <div v-else class="perf-item">
        <p>{{ index + 1 }}</p>
        <div
          class="perf-bar"
          :class="checkAttempts(index)"
          :style="{ width: (attempt / nbGames) * 100 + '%' }"
        >
          {{ attempt }}
        </div>
      </div>
    </div>
  </div>
  <div class="solution-container" v-if="gameState != 'going'">
    <p class="soluton-subtitle">The word was</p>
    <p class="soluton-title">{{ solution }}</p>
  </div>
  <button class="restart" @click="restart()">Restart</button>
</template>
<style scoped>
.stats-content {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}
.stats-item {
  text-align: center;
  background-color: var(--ternary);
  padding: 1rem 0.5rem;
  border-radius: 0.25rem;
}

.item-title {
  color: var(--teal);
  font-size: 1.25rem;
  font-weight: bold;
}

.item-label {
  font-size: 0.75rem;
}

.perf-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.perf-item {
  display: flex;
  gap: 0.5rem;
  height: 22px;
}

.skull {
  width: 10px;
}

.perf-bar {
  min-width: 1rem;
  background-color: var(--ternary);
  border-radius: 0.25rem;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 0.5rem;
  font-size: x-small;
}

.active {
  background-color: var(--teal);
}

.solution-container {
  text-align: center;
}

.soluton-subtitle {
  font-size: small;
}

.soluton-title {
  font-weight: bold;
}

.restart {
  background-color: var(--teal);
  border: none;
  border-radius: 0.5rem;
  padding-block: 0.5rem;
  color: inherit;
  font-family: inherit;
}
</style>
