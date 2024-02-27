<script setup lang="ts">
import { useCycleList } from '@vueuse/core'
import { ref } from 'vue'

const list = ref([
    'https://tinyurl.com/2p8dav94',
    'https://tinyurl.com/2p9yrrhs',
    'https://tinyurl.com/ycxurpah',
])

const { state, next, prev } = useCycleList(list)
</script>

<template>
    <div>
        <div class="text-primary text-lg font-bold">
            <img :src="state" alt="">
        </div>
        <button @click="prev()">
            Prev
        </button>
        <button @click="next()">
            Next
        </button>
    </div>
</template>

<style>
img{
    width: 100%;
}
</style>