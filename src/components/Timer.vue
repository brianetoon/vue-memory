<template>
    <div class="timer">
       Timer: {{formattedMinutes}}:{{ formattedSeconds }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
export default {
    setup(){
        const seconds = ref(0)
        const minutes = ref(0)

        onMounted(() => startTimer())

        const startTimer = () => {
            setInterval(() => {
                seconds.value ++
                if (seconds.value == 60) {
                    minutes.value ++
                    seconds.value = 0
                }
            }, 1000)
        }

        const formattedSeconds = computed(() => {
            if (seconds.value == 0 ) return '00'
            if (seconds.value > 0 && seconds.value < 10) {
                return `0${seconds.value}`
            } else return seconds.value
        })
        const formattedMinutes = computed(() => {
            if (minutes.value == 0 ) return '00'
            if (minutes.value > 0 && minutes.value < 10) {
                return `0${minutes.value}`
            } else return minutes.value
        })

        return { formattedSeconds, formattedMinutes }
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