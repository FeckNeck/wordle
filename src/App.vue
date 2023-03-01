<script lang="ts" setup>
import Grid from './components/Grid/Grid.vue';
import Keyboard from './components/Keyboard/Keyboard.vue';
</script>

<template>
  <div class="container">
    <div class="game">
      <Grid />
      <Keyboard />
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  display: flex;
  min-height: 100%;
  justify-content: center;
}

.game {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
}
</style>
