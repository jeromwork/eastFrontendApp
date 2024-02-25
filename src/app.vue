<script setup lang="ts">
import {PageInfoService} from "./EastclinicVueApi";
// import type {PageInfoInterface} from "./EastclinicVueApi";
import {ref, toRef} from 'vue'

const pageInfo = PageInfoService.getPageInfo
if(pageInfo.value){
//         useSeoMeta(    {
//                 title: () => pageInfo.value.title,
//                 articleAuthor: () => pageInfo.value.authorArticle,
//         })
}




</script>
<template>
        <NuxtPage />
</template>
