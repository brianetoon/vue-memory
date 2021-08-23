<template>
  <div class="home">
    <h2>Memory</h2>
    <button @click="showBoard = !showBoard">Play</button>
    <Board v-if="showBoard"/>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import { ref } from '@vue/reactivity'
export default {
  components: { Board },
  setup() {
    const showBoard = ref(false)

    return { showBoard }
  }
}
</script>

<style>
button {
  margin-bottom: 20px;
}
</style>
