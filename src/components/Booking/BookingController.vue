
<script setup lang="ts">


import {BookingService} from "../../EastclinicVueApi";



const props = defineProps<{bookingService:BookingService}>();

</script>


<template>
    <slot v-bind="{bookingService}"></slot>
</template>

<style scoped>

</style>