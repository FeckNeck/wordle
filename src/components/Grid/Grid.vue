<script setup lang="ts">
import Case from "./Case.vue";
import { useGameStore } from "../../store/game";
import { storeToRefs } from "pinia";

const store = useGameStore();
const { guesses, currentRow, isWordValid } = storeToRefs(store);

function setTransition(index: number) {
  return {
    transitionDelay: 0.1 + index * 0.3 + "s",
  };
}

function isComplete(row: number) {
  return {
    complete: currentRow.value > row,
  };
}
</script>

<template>
  <div v-if="!isWordValid" class="error">Ce mot n'est pas dans la liste</div>
  <main class="grid-container">
    <div
      v-for="(word, row) in guesses"
      class="row"
      :class="{ shake: !isWordValid && currentRow == row }"
    >
      <Case
        v-for="col in 5"
        :row="row"
        :col="col - 1"
        :letter="word[col - 1]"
        :style="setTransition(col - 1)"
        :class="isComplete(row)"
      />
    </div>
  </main>
</template>

<style scoped>
.grid-container {
  display: grid;
  flex-direction: column;
  gap: 0.7rem;
  justify-content: center;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.7rem;
}

.complete {
  transform: rotateX(360deg);
}

.error {
  position: absolute;
  top: 0;
  margin-top: 1.5rem;
  background-color: var(--ternary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  animation: fadeIn 0.5s, fadeOut 0.5s 1.5s;
}

.shake {
  animation: shake 0.8s ease-in-out both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
