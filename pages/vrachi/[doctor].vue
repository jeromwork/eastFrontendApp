

<script setup>
import {ref} from "vue";
import SingleDoctorController from '../../components/SingleDoctor/Controller'

const isSingleDoctor = ref(true);
// const route = useRoute();

import { onMounted } from 'vue';

onMounted(() => {


});


</script>

<template>
    <NuxtLayout name="doctors">
        <div v-if="isSingleDoctor">
            <SingleDoctorController/>
        </div>



    </NuxtLayout>
</template>

<style scoped>
</style>