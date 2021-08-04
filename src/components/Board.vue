<template>
    <div class="board">
        <div class="square" v-for="(image, index) in shuffledImages" :key="index">
            <img :src="require(`@/assets/images/${image}.jpg`)" 
                :alt="image"
                :name="image"
                class="active"
                @click="handleClick"
            >
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
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

        const comparing = ref([])

        const handleClick = (e) => {
            // check if class list does not already contain disabled
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active')
                comparing.value.push(e.target)
                console.log(comparing.value)
                if (comparing.value.length === 2) {
                    if (comparing.value[0].name === comparing.value[1].name) {
                        console.log('match!')
                        // run animation for match
                    } else {
                        comparing.value.forEach(item => {
                            setTimeout(() => {
                                item.classList.add('active')
                            }, 1000)
                            // run animatiom for no match
                        })
                        console.log('not a match')
                    }
                    comparing.value = []
                }
            } else {
                console.log('click a different square')
            }

        }

        return { handleClick, shuffledImages }
    }
}
</script>

<style>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}
.square {
    grid-column: span 1;
    position: relative;
    background: grey;
    border-radius: 5px;
}
.square img {
    display: block;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
}
img.active {
    opacity: 0;
}
</style>