<script lang="ts" setup>
const emit = defineEmits(["closeHelp"]);
</script>
<template>
  <div class="modal-header">
    <p class="help-title">Comment jouer ?</p>
    <button class="modal-button" @click="emit('closeHelp')">
      <img src="../../assets/icons/x.svg" alt="close modal" />
    </button>
  </div>
  <div class="help-content">
    <p>Ce jeu est une version français du jeu bien connue Wordle.</p>
    <p>
      Un mot de 5 lettres est choisi aléatoirement. Vous devez le deviner en 6
      essais.
    </p>
    <p>
      À chaque essai, les lettres du mot que vous avez proposé changeront de
      couleur en fonction de à quel point vous êtes proche de le trouver.
    </p>
    <div class="help-example">
      <div class="help-word">
        <div class="found">V</div>
        <div>I</div>
        <div>L</div>
        <div>L</div>
        <div>L</div>
      </div>
      <p>
        La lettre <span class="text-found">V</span> est dans le mot, à la bonne
        place.
      </p>
    </div>
    <div class="help-example">
      <div class="help-word">
        <div>G</div>
        <div>L</div>
        <div class="hint">A</div>
        <div>C</div>
        <div>E</div>
      </div>
      <p>
        La lettre <span class="text-hint">A</span> est dans le mot, mais pas à
        la bonne place.
      </p>
    </div>
    <div class="help-example">
      <div class="help-word">
        <div>P</div>
        <div>A</div>
        <div>R</div>
        <div>I</div>
        <div class="missed">S</div>
      </div>
      <p>La lettre <span class="text-miss">S</span> n'est pas dans le mot.</p>
    </div>
  </div>
</template>
<style scoped>
.help-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.help-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.help-content,
p {
  font-size: 0.9rem;
}

.help-example {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.help-word {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.help-word > div {
  width: 2rem;
  height: 2rem;
  border: 0.2rem solid var(--ternary);
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.missed {
  background-color: var(--ternary);
}

.text-found {
  color: var(--found);
  font-weight: bold;
}

.text-hint {
  color: var(--hint);
  font-weight: bold;
}

.text-miss {
  color: var(--ternary);
  font-weight: bold;
}
</style>
