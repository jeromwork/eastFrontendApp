
<script setup lang="ts">
import {onBeforeRouteUpdate} from "vue-router";
useSeoMeta({
        title: 'My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
})

console.log('99909990')

// await callOnce(async () => {
//         websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
// })
</script>
<template>


        <NuxtPage />
</template>
