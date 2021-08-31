<template>
  <div class="container">
    <div class="game-nav">
      <div class="buttons">
        <button class="play" @click="startGame" v-if="!showBoard">
          Play
        </button>
        <button class="quit" @click="quitGame" v-if="showBoard">
          Quit
        </button>
        <button @click="completeGame" v-if="showBoard">Win</button>
        <button @click="jump" v-if="showBoard">Jump</button>
      </div>

      <form class="imageset">
        <label for="imageset">Image Set: </label>
        <select v-model="imageset">
          <option v-for="(set, index) in imagesets" :key="index" :value="set">
            {{ set.name }}
          </option>
        </select>
      </form>

    </div>

    <Board :imageset="imageset" @complete="completeGame" v-if="showBoard"/>
  </div>
</template>

<script>
import store from '@/store.js'
import gsap from 'gsap'
import Board from '@/components/Board.vue'
import { ref } from '@vue/reactivity'

export default {
  components: { Board },
  setup() {
    const imagesets = ref(store.imagesets)
    let imageset = ref(imagesets.value[0])
    const showBoard = ref(false)

    const jump = () => {
      gsap.timeline()
        .to('.card', {y:-15, duration:0.3, stagger:{amount:0.3, ease:"power1"}})
        .to('.card', {scale:1.05, duration:0.3, repeat:1, yoyo:true})
        .to('.card', {y:0, duration:0.3, stagger:{amount:0.3}})
    }

    const quitGame = () => {
      gsap.timeline()
        .to('.board', {y:200, opacity:0, onComplete:toggleBoard})
        .to('form', {x:0, opacity:1, ease:'back'})
    }

    const startGame = () => {
      gsap.to('form', {x:400, opacity:0, onStart:toggleBoard})
    }

    const completeGame = () => { 
      gsap.timeline({delay:0.75})
        .to('.card', {y:-15, duration:0.3, stagger:{amount:0.3, ease:'power1'}})
        .to('.card', {opacity:0, y:-180, duration:0.8, stagger:{amount:0.8}, 
                        ease:'back.in', onComplete:toggleBoard})
        .to('form', {x:0, opacity:1, delay:0.5, ease:'back'})
    }

    function toggleBoard() {
      showBoard.value = !showBoard.value
    }

    return { showBoard, imageset, imagesets, startGame, quitGame, completeGame, jump }
  }
}
</script>

<style>
.game-nav {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.game-nav button {
  margin-right: 10px;
}
label {
  font-weight: bold;
  margin-right: 10px;
}
.play {
  background: teal;
  color: white;
}
.quit {
  background: crimson;
  color: white;
}
</style>
