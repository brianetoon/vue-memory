<template>
    <div class="board">
        <div class="card active" v-for="(image, index) in shuffledImages" 
                :key="index" 
                :name="image"
                @click="handleClick">
            <div class="back face"></div>
            <img :src="require(`@/assets/images/${image}.jpg`)" :alt="image"
                class="active front face">
        </div>
    </div>
    <p>{{ comparing.length }}</p>
</template>

<script>
import gsap from 'gsap'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    setup() {
        const images = ref([
            'beach',
            'bubbles',
            'coast',
            'nature',
            'night',
            'skyline',
            'solarsystem',
            'squares'
        ])

        const doubleImages = [...images.value, ...images.value]
        const shuffledImages = doubleImages.sort(() => Math.random() - 0.5)

        const timing = 0.6

        onMounted(() => {
            gsap.timeline()
                .set('.card', {transformStyle: "preserve-3d", transformPerspective: 1000})
                .set('.face', {transformStyle: "preserve-3d", transformOrigin: "50% 50%"})
                .set('.back', {rotationY: 180, rotationZ: 180})
                .from('.card', {y: 150, stagger: 0.08, opacity: 0, duration: 0.5})
                .to('.card', {rotationX:"+=180", duration: timing, stagger:{ amount:0.75}})
        })

        const comparing = ref([])

        const handleClick = (e) => {
            let card = e.currentTarget
            if (card.classList.contains('active') && comparing.value.length < 2) {
                card.classList.remove('active')
                comparing.value.push(card)
                gsap.to(card, {rotationX: "+=180", duration: timing, onComplete: compare})

                function compare() {
                    if (comparing.value.length === 2) {
                        if (comparing.value[0].getAttribute('name') === comparing.value[1].getAttribute('name')) {
                            console.log("match!")
                        } else {
                            comparing.value.forEach(item => {
                                setTimeout(() => {
                                    item.classList.add('active')
                                    gsap.to(item, {rotationX: "+=180", duration: timing})
                                }, 500)
                            })
                        }
                        comparing.value = []
                    }
                }
            } else {
                console.log('click a different square')
            }
        }

        return { handleClick, shuffledImages, comparing }
    }
}
</script>

<style>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;
    width: 100%;
    max-width: 550px;
    margin: 0 auto;

}
.card {
    grid-column: span 1;
    position: relative;
    border-radius: 5px;
    width: 100%;
    padding-bottom: 100%;
    perspective: 1000px;
    cursor: pointer;
}
.card .front {
    display: block;
    position: absolute;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
}
.card .back {
    background: orange;
    width: 100%;
    border-radius: 5px;
    padding: 50% 0;
    position: absolute;
}
.face {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
img.active {
    /* opacity: 0; */
    -webkit-user-drag: none;
}
</style>