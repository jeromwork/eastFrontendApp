
<script setup lang="ts">
import {defineProps} from 'vue';


import {BookingService} from "../../EastclinicVueApi";




const props = defineProps<{bookingService:BookingService}>();
// const bookingService = ref(props.bookingService)

</script>


<template>
    <slot v-bind="{bookingService}"></slot>
</template>

<style scoped>

</style>