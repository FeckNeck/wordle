<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, reactive, watch } from "vue";
import { useGameStore } from "../../store/index";

const store = useGameStore();
const { found, hint, miss, currentRow } = storeToRefs(store);
const props = defineProps<{ letter: string }>();

const state = reactive({
  isFound: false,
  isHint: false,
  isMiss: false,
});

const keyState = computed(() => ({
  hint: state.isHint,
  miss: state.isMiss,
  found: state.isFound,
}));

watch(currentRow, () => {
  if (found.value[currentRow.value - 1].includes(props.letter)) {
    state.isFound = true;
    state.isHint = false;
    state.isMiss = false;
  } else if (hint.value[currentRow.value - 1].includes(props.letter)) {
    state.isFound = false;
    state.isHint = true;
    state.isMiss = false;
  } else if (miss.value[currentRow.value - 1].includes(props.letter)) {
    state.isFound = false;
    state.isHint = false;
    state.isMiss = true;
  }
});
</script>

<template>
  <button class="key" @click="$emit('inputLetter', letter)" :class="keyState">
    {{ letter }}
  </button>
</template>

<style scoped>
.key {
  padding: 1rem;
  background-color: var(--ternary);
  border: 2px solid var(--secondary);
  border-radius: 0.5rem;
  color: inherit;
  font-family: inherit;
  cursor: pointer;
}

.key:hover {
  background-color: var(--secondary);
  border-color: var(--ternary);
}

@media only screen and (max-width: 640px) {
  .key {
    padding: 0.8rem;
  }
}
</style>
