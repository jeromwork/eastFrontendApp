<script setup lang="ts">
import { useRouter  } from 'vue-router';
import { ref } from 'vue';
const previousRoutePath = ref('/');

const router = useRouter();

onMounted(() => {
    if(router?.options?.history?.state?.back){
        previousRoutePath.value = router.options.history.state.back as string;
    }
});

</script>

<template>
    <nuxt-link :to="previousRoutePath" class="single-doctor__top-toolbar__back">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_12273_256011)">
                <path d="M19 12.9997H7.83L12.71 17.8797C13.1 18.2697 13.1 18.9097 12.71 19.2997C12.32 19.6897 11.69 19.6897 11.3 19.2997L4.71 12.7097C4.32 12.3197 4.32 11.6897 4.71 11.2997L11.29 4.69973C11.68 4.30973 12.31 4.30973 12.7 4.69973C13.09 5.08973 13.09 5.71973 12.7 6.10973L7.83 10.9997H19C19.55 10.9997 20 11.4497 20 11.9997C20 12.5497 19.55 12.9997 19 12.9997Z" fill="#272727"/>
            </g>
            <defs>
                <clipPath id="clip0_12273_256011">
                    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
                </clipPath>
            </defs>
        </svg>
    </nuxt-link>
</template>


<style scoped>

</style>