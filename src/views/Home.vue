<template>
  <div class="home">
    <h2>Home</h2>
    <button @click="showBoard = !showBoard">Toggle Board</button>
    <Board v-if="showBoard"/>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import { ref } from '@vue/reactivity'
export default {
  components: { Board },
  setup() {
    const showBoard = ref(true)

    return { showBoard }
  }
}
</script>
