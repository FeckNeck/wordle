<script lang="ts" setup>
const emit = defineEmits(["openStats", "openHelp"]);
</script>
<template>
  <header>
    <div class="header-container">
      <button class="header-icons" @click="emit('openStats')">
        <img src="../../assets/icons/stats.svg" alt="stats" />
      </button>
      <p>Wordle</p>
      <button class="header-icons" @click="emit('openHelp')">
        <img src="../../assets/icons/help.svg" alt="help" />
      </button>
    </div>
  </header>
</template>
<style scoped>
header {
  width: 100%;
}

.header-container {
  align-items: center;
  background-color: var(--secondary);
  display: flex;
  gap: 9rem;
  justify-content: center;
  padding-block: 1rem;
}

.header-icons {
  background-color: var(--ternary);
  border-radius: 0.25rem;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

@media only screen and (max-width: 640px) {
  .header-container {
    gap: 6rem;
  }
}
</style>
