<script lang="ts" setup>
import Grid from "./components/Grid/Grid.vue";
import Keyboard from "./components/Keyboard/Keyboard.vue";
import Header from "./components/Header/Header.vue";
import Statistiques from "./components/Modals/Statistiques.vue";
import Help from "./components/Modals/Help.vue";
import { ref, watch } from "vue";
import { useGameStore } from "./store/game";
import { useUserStore } from "./store/user";
import { storeToRefs } from "pinia";

const store = useGameStore();
const { gameState, currentRow, solution } = storeToRefs(store);
const { setUserStats } = useUserStore();

const isStatsOpen = ref(false);
const isHelpOpen = ref(false);

watch(gameState, () => {
  if (gameState.value != "going") {
    setUserStats(gameState.value, currentRow.value - 1);
    setTimeout(() => {
      isStatsOpen.value = true;
    }, 1500);
  }
});
</script>

<template>
  <div class="container">
    <Header @openStats="isStatsOpen = true" @openHelp="isHelpOpen = true" />
    <div class="game">
      <Grid />
      <Keyboard />
    </div>
  </div>
  <Transition name="fade">
    <div class="modal" v-if="isStatsOpen || isHelpOpen">
      <div v-show="isStatsOpen" class="modal-content">
        <Statistiques @closeStats="isStatsOpen = false" />
      </div>
      <div v-show="isHelpOpen" class="modal-content">
        <Help @closeHelp="isHelpOpen = false" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.game {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1rem;
  flex-grow: 1;
}

.modal {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 450px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
