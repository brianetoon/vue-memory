<template>
    <div class="timer">
       Timer: {{ formattedMinutes }}:{{ formattedSeconds }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
export default {
    emits: ['reset'],
    setup(props, { emit }) {
        const timer = ref(null)
        const isRunning = ref(false)
        const seconds = ref(0)
        const minutes = ref(0)

        const startTimer = () => {
            isRunning.value = true
            timer.value = setInterval(() => {
                seconds.value ++
                if (seconds.value === 60) {
                    minutes.value ++
                    seconds.value = 0
                }
            }, 1000)
        }

        const stopTimer = () => {
            isRunning.value = false
            clearInterval(timer.value)
        }

        const resetTimer = () => {
            emit('reset', { minutes:formattedMinutes.value, seconds:formattedSeconds.value })
            seconds.value = 0
            minutes.value = 0
        }

        // onMounted(() => startTimer())

        const formattedSeconds = computed(() => {
            if (seconds.value === 0) return '00'
            if (seconds.value > 0 && seconds.value < 10) {
                return `0${seconds.value}`
            } else return seconds.value
        })
        const formattedMinutes = computed(() => {
            if (minutes.value === 0) return '00'
            if (minutes.value > 0 && minutes.value < 10) {
                return `0${minutes.value}`
            } else return minutes.value
        })

        return { 
            formattedSeconds, 
            formattedMinutes,
            startTimer,
            stopTimer,
            resetTimer,
            isRunning
        }
    }
}
</script>

<style>
.timer {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>