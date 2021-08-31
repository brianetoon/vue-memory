<template>
    <div class="board">
        <div class="card active" v-for="(image, index) in shuffledImages" 
                :key="index" 
                :name="image"
                @click="handleClick">
            <div class="back face"></div>
            <img :src="require(`@/assets/images/${folder}/${image}.jpg`)" 
                :alt="image"
                class="front face">
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    props: ['imageset'],
    emits: ['complete'],
    setup(props, { emit }) {
        const imageset = props.imageset
        const folder = imageset.folder

        const images = imageset.images.sort(() => Math.random() - 0.5)
        const slicedImages = images.slice(0,8)
        const doubleImages = [...slicedImages, ...slicedImages]
        const shuffledImages = doubleImages.sort(() => Math.random() - 0.5)

        let playing = ref(false)
        const startPlaying = () => playing.value = true
        const matches = ref(0)

        onMounted(() => {
            gsap.timeline({onComplete: startPlaying})
                .set('.card', {transformStyle: "preserve-3d", transformPerspective: 1000})
                .set('.face', {transformStyle: "preserve-3d", transformOrigin: "50% 50%"})
                .set('.back', {rotationY: 180, rotationZ: 180})
                .from('.card', {y: 150, stagger: 0.08, opacity: 0, duration: 0.5})
                .to('.card', {rotationX:"+=180", duration:0.6, stagger:{ amount:0.75}})
        })

        const pulse = (el) => gsap.to(el, { scale:1.07, duration:0.2, repeat:1, yoyo:true})

        const updateMatches = () => {
            matches.value++
            if (matches.value === slicedImages.length) {
                emit('complete')
            }
        }

        const comparing = ref([])

        const handleClick = (e) => {
            let card = e.currentTarget
            if (card.classList.contains('active') && comparing.value.length < 2 && playing.value) {
                card.classList.remove('active')
                gsap.to(card, {rotationX: "+=180", duration: 0.6, onComplete: push})

                function push() {
                    comparing.value.push(card)
                    compare()
                }

                function compare() {
                    if (comparing.value.length === 2) {
                        if (comparing.value[0].getAttribute('name') === comparing.value[1].getAttribute('name')) {
                             comparing.value.forEach(item => pulse(item))
                             updateMatches()
                        } else {
                            comparing.value.forEach(item => {
                                setTimeout(() => {
                                    gsap.to(item, {rotationX: "+=180", duration:0.6, onComplete:reactivate})
                                    function reactivate() {
                                        item.classList.add('active')
                                    }
                                }, 600)
                            })
                        }
                        comparing.value = []
                    }
                }
            } else {
                console.log('click a different square')
            }
        }

        return { handleClick, shuffledImages, folder }
    }
}
</script>

<style>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
}
.card {
    grid-column: span 1;
    position: relative;
    border-radius: 10px;
    width: 100%;
    padding-bottom: 100%;
    perspective: 1000px;
    cursor: pointer;
}
.card .front {
    display: block;
    position: absolute;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
}
.card .back {
    background: var(--accent);
    width: 100%;
    border-radius: 10px;
    padding: 50% 0;
    position: absolute;
    text-align: center;
}
.face {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>