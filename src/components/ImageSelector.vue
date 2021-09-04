<template>
    <form class="imageset">
        <label for="imageset">Image Set: </label>
        <select v-model="imageset">
            <option v-for="(set, index) in imagesets" :key="index" :value="set">
                {{ set.name }}
            </option>
        </select>
    </form>
</template>

<script>
import store from '@/store.js'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    setup(props, { emit }) {
        const imagesets = ref(store.imagesets)
        let imageset = ref(imagesets.value[0])

        const updateImages = () => {
            emit('update', imageset.value)
        }

        onMounted(() => {
            updateImages()
        })

        return { imagesets, imageset }
    }
}
</script>

<style>

</style>