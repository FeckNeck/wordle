<script setup lang="ts">
import Case from "./Case.vue";
import { useGameStore } from "../../store/index";
import { storeToRefs } from "pinia";

const store = useGameStore();
const { guesses } = storeToRefs(store);
</script>
<template>
  <main class="grid-container">
    <div v-for="(word, row) in guesses" class="row">
      <Case
        v-for="col in 5"
        :row="row"
        :col="col - 1"
        :letter="word[col - 1]"
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
</style>
