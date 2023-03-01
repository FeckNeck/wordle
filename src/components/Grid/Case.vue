<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useGameStore } from "../../store/index";

const store = useGameStore();
const { currentCol, currentRow, found, hint, miss } = storeToRefs(store);

const props = defineProps<{
  row: number;
  col: number;
  letter: string;
}>();

const isActive = computed(() => ({
  active: props.row == currentRow.value && props.col == currentCol.value,
}));

const wordState = computed(() => ({
  found:
    currentRow.value > props.row &&
    found.value[props.row][props.col] == props.letter,
  hint:
    currentRow.value > props.row &&
    hint.value[props.row].includes(props.letter),
  miss:
    currentRow.value > props.row &&
    miss.value[props.row].includes(props.letter),
}));
</script>

<template>
  <div class="case" :class="[isActive, wordState]">{{ letter }}</div>
</template>

<style scoped>
.case {
  width: 4rem;
  height: 4rem;
  border: 0.25rem solid var(--ternary);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
}

.active {
  border-color: var(--teal);
}
</style>
