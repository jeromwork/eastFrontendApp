

<script setup>
import {ref} from "vue";
import DoctorCardController from '../../components/Doctors/DoctorCard/Controller'
import DoctorCardSingleDoctor from '../../components/Doctors/DoctorCard/Views/SingleDoctor.vue'

const isSingleDoctor = ref(true);
// const route = useRoute();

import { onMounted } from 'vue';

onMounted(() => {


});


</script>

<template>
    <NuxtLayout name="doctors">
        <div v-if="isSingleDoctor">

            <DoctorCardController v-slot="slotProps">
                <DoctorCardSingleDoctor v-bind="slotProps"/>
            </DoctorCardController>
        </div>



    </NuxtLayout>
</template>

<style scoped>
</style>