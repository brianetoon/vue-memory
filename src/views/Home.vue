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
        <button @click="toggleTimer" v-if="showBoard">Timer</button>
        <button @click="reset" v-if="showBoard">Reset</button>
      </div>

      <div class="select-and-timer">
        <form class="imageset">
          <label for="imageset">Image Set: </label>
          <select v-model="imageset">
            <option v-for="(set, index) in imagesets" :key="index" :value="set">
              {{ set.name }}
            </option>
          </select>
        </form>

        <Timer ref="timer" />
      </div>

    </div>

    <Board :imageset="imageset" @complete="completeGame" @showtimer="showTimer" v-if="showBoard"/>
  </div>
</template>

<script>
import store from '@/store.js'
import gsap from 'gsap'
import Board from '@/components/Board.vue'
import Timer from '@/components/Timer.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  components: { Board, Timer },
  setup() {
    const imagesets = ref(store.imagesets)
    let imageset = ref(store.imagesets[0])
    
    const showBoard = ref(false)
    const timer = ref(null)

    onMounted(() => {
      gsap.set('.timer', {x:400, opacity:0})
    })

    const quitGame = () => {
      gsap.timeline({onStart:toggleTimer, onComplete:reset})
        .to('.timer', {x:400, opacity:0})
        .to('.board', {y:200, opacity:0, onComplete:toggleBoard}, '<')
        .to('form', {x:0, opacity:1, delay:0.5, ease:'back'})
    }

    const startGame = () => {
      gsap.to('form', {x:400, opacity:0, onStart:toggleBoard})
    }

    const completeGame = () => { 
      gsap.timeline({delay:0.75, onStart:toggleTimer, onComplete:reset})
        .to('.card', {y:-15, duration:0.3, repeat:1, yoyo:true,
                      stagger:{amount:0.3, ease:"power1"}})
        .to('.card', {scale:1.05, delay:0.3, duration:0.3, repeat:1, yoyo:true})
        .to('.card', {opacity:0, y:-180, duration:0.8, stagger:{amount:0.8}, 
                        ease:'back.in', onComplete:toggleBoard})
        .to('.timer', {x:400, opacity:0})
        .to('form', {x:0, opacity:1, delay:0.5, ease:'back'})
    }

    // stops & starts the timer
    const toggleTimer = () => {
      if (timer.value.isRunning) {
        timer.value.stopTimer()
        return
      }
      timer.value.startTimer()
    }
    // resets the timer
    const reset = () => {
      timer.value.resetTimer()
    }

    const showTimer = () => {
      gsap.to('.timer', {x:0, opacity:1, ease:'back', onComplete:toggleTimer})
    }

    const toggleBoard = () => {
      showBoard.value = !showBoard.value
    }

    return { 
      showBoard,
      imageset,
      imagesets,
      startGame,
      quitGame,
      completeGame,
      showTimer,
      toggleTimer,
      timer,
      reset
    }
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
.select-and-timer {
  position: relative;
}
.timer {
  position: absolute;
  right: 0;
  top: 6px;
}
</style>
