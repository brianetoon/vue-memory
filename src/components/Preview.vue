<template>
    <div class="preview">
        <h3>Image Set Preview:</h3>
        <transition name="preview" mode="out-in">
            <div class="grid" :key="imageset.name">
                <div class="preview-card" v-for="(image, index) in imageset.images" :key="index">
                    <img :src="require(`@/assets/images/${imageset.folder}/${image}.jpg`)" 
                    :alt="image">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['imageset']
}
</script>

<style>
.preview .grid {
    position: relative;
}
.preview-card {
    grid-column: span 1;
    width: 100%;
}
.preview-card img {
    width: 100%;
    border-radius: 10px;
    display: block;
}

/* transition classes */
.preview-enter-from {
    right: -80%;
    opacity: 0;
}
.preview-enter-to {
    right: 0;
    opacity: 1;
}
.preview-leave-from {
    left: 0;
    opacity: 1;
}
.preview-leave-to {
    left: -80%;
    opacity: 0;
}
.preview-enter-active, .preview-leave-active {
    transition: all ease-in-out 0.4s;
}
</style>