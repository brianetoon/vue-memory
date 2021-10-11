<template>
    <div class="results">
        <i class="material-icons close" @click="close">clear</i>
        <h2>Game Results</h2>
        <div class="details">
            <p>Image Set:</p>
            <p>{{ results.imageset.name }}</p>
        </div>
        <div class="details">
            <p>Time:</p>
            <p>{{ results.time.minutes }}:{{ results.time.seconds }}</p>
        </div>
        <div class="details">
            <p>Clicks:</p>
            <p>{{ results.clicks }}</p>
        </div>
        <div class="details">
            <p>Score:</p>
            <p>1205</p>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
import { onMounted } from '@vue/runtime-core'

export default {
    emits: ['close'],
    props: ['results'],
    setup(props, { emit }) {

        const results = props.results

        onMounted(() => {
            gsap.from('.results', {scale:0.3, duration:0.4, opacity:0})
        })

        const close = () => {
            emit('close')
        }

        return { close, results }
    }
}
</script>

<style>
.results {
    background: white;
    width: 100%;
    border-radius: 10px;
    padding: 30px 60px 90px;
    margin: 10px auto;
    box-sizing: border-box;
    position: relative;
}
.results .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.results h2 {
    text-align: center;
    margin: 20px 0;
}
.details {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px dashed lightgray;
    padding: 12px 0 4px;
}
</style>