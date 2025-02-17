<template>
  <div class="container">
    <div class="game-nav">
      <div class="buttons">
        <button class="accent-btn" @click="startGame" v-if="!showBoard">
          Play
        </button>
        <button class="warning-btn" @click="quitGame" v-if="showBoard">
          Quit
        </button>

        <!-- Test Buttons: -->
        <!-- <button @click="showResults = !showResults" v-if="!showBoard">Results</button> -->
        <!-- <button @click="completeGame" v-if="showBoard">Win</button> -->
        <!-- <button @click="toggleTimer" v-if="showBoard">Timer</button> -->
        <!-- <button @click="reset" v-if="showBoard">Reset</button> -->
      </div>

      <div class="select-and-timer">
        <form class="imageset">
          <label for="imageset">Image Set: </label>
          <select v-model="imageset">
            <option v-for="set in imagesets" :key="set.name" :value="set">
              {{ set.name }}
            </option>
          </select>
        </form>

        <Timer ref="timer" @reset="getTime" />
      </div>

    </div>

    <Board :imageset="imageset" @complete="completeGame" @showtimer="showTimer" v-if="showBoard" />
    <Results @close="closeResults" v-if="showResults" :results="results" />
    <Preview :imageset="imageset" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import store from '@/store.js'
import gsap from 'gsap'
import Board from '@/components/Board.vue'
import Timer from '@/components/Timer.vue'
import Results from '@/components/Results.vue'
import Preview from '@/components/Preview.vue'

export default {
  components: { Board, Timer, Results, Preview },
  setup() {
    const imagesets = ref(store.imagesets)
    let imageset = ref(store.imagesets[0])
    
    const showBoard = ref(false)
    const showResults = ref(false)
    const timer = ref(null)
    const results = ref({
      imageset,
      time: null,
      clicks: null,
    })

    // TO DO: 
    // Move animations into separate files for ease of maintenance
    // Store animations in variables for reusability

    onMounted(() => {
      gsap.set('.timer', {x:400, opacity:0})
    })

    const quitGame = () => {
      if (timer.value.isRunning) {
        gsap.timeline({onStart:toggleTimer, onComplete:reset})
          .to('.timer', {x:400, opacity:0})
          .to('.board', {y:200, opacity:0, onComplete:toggleBoard}, '<')
          .to('form', {x:0, opacity:1, delay:0.3, ease:'back'})
          .to('.preview', {y:0, opacity: 1})
      }
    }

    const startGame = () => {
      if (showResults.value) {
        gsap.timeline()
          .to('.results', {scale:0.3, duration:0.4, opacity:0, onComplete:toggleResults})
          .to('form', {x:400, opacity:0, delay:0.5, onStart:toggleBoard})
      } else {
        gsap.timeline()
          .to('.preview', {y:150, opacity:0, duration:0.4})
          .to('form', {x:400, opacity:0, delay:0.1, onStart:toggleBoard})
      }
    }

    const completeGame = (_clicks) => {
      results.value.clicks = _clicks
      gsap.timeline({delay:0.75, onStart:toggleTimer, onComplete:reset})
        .to('.card', {y:-15, duration:0.3, repeat:1, yoyo:true,
                      stagger:{amount:0.3, ease:"power1"}})
        .to('.card', {scale:1.05, delay:0.3, duration:0.3, repeat:1, yoyo:true})
        .to('.card', {opacity:0, y:-180, duration:0.8, stagger:{amount:0.8}, 
                        ease:'back.in', onComplete:toggleBoard})
        .to('.timer', {x:400, opacity:0})
        .to('form', {x:0, opacity:1, delay:0.5, ease:'back', onComplete:toggleResults})
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

    const getTime = (_time) => {
      results.value.time = _time
    }

    const toggleBoard = () => {
      showBoard.value = !showBoard.value
    }

    const closeResults = () => {
      gsap.timeline()
        .to('.results', {scale:0.3, duration:0.4, opacity:0, onComplete:toggleResults})
        .to('.preview', {y:0, opacity: 1})
    }

    const toggleResults = () => {
      showResults.value = !showResults.value
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
      getTime,
      closeResults,
      showResults,
      timer,
      results,
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
.accent-btn {
  background: var(--accent);
  color: white;
}
.warning-btn {
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
