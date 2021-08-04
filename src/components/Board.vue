<template>
    <div class="board">
        <div class="square" 
            v-for="(image, index) in shuffledImages" :key="index"
            @click="handleClick">
            <img :src="require(`@/assets/images/${image}`)" :alt="image" class="">
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const images = ref([
            'beach.jpg',
            'bubbles.jpg',
            'coast.jpg',
            'nature.jpg',
            'night.jpg',
            'skyline.jpg',
            'solarsystem.jpg',
            'squares.jpg'
        ])

        const doubleImages = [...images.value, ...images.value]

        const shuffledImages = doubleImages.sort(() => Math.random() - 0.5)      

        const handleClick = (e) => {
            e.target.classList.toggle('hidden')
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
    cursor: pointer;
    background: grey;
    border-radius: 5px;
}
.square img {
    display: block;
    width: 100%;
    border-radius: 5px;
}
img.hidden {
    opacity: 0;
}
</style>