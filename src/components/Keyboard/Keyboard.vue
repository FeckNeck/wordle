<script lang="ts" setup>
import Key from "./Key.vue";
import { onMounted } from "vue";
import { useGameStore } from "../../store/game";

const { inputLetter } = useGameStore();

const keyboard = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"],
];

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    const letter = e.key.toUpperCase();
    inputLetter(letter);
  });
});
</script>

<template>
  <div class="keyboard">
    <div v-for="row in keyboard" class="keyboard-row">
      <Key v-for="key in row" @inputLetter="inputLetter" :letter="key" />
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.keyboard-row {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

@media only screen and (max-width: 640px) {
  .keyboard,
  .keyboard-row {
    gap: 0.1rem;
  }
}
</style>
