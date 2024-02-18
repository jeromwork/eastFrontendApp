

<script setup>
import {ref} from "vue";
import Doctors from "../../components/Doctors/Controller";
import DoctorCardController from '../../components/Doctors/DoctorCard/Controller'
import DoctorCardSingleDoctor from '../../components/Doctors/DoctorCard/views/SingleDoctor.vue'

const isSingleDoctor = ref(true);
// const route = useRoute();

import { onMounted } from 'vue';

onMounted(() => {


});


</script>

<template>
    <NuxtLayout name="doctors">
        <Doctors>
            <template #doctor="doctorInfo" v-if="isSingleDoctor">
                <DoctorCardController :doctor="doctorInfo" v-slot="slotProps">
                    <DoctorCardSingleDoctor v-bind="slotProps"/>
                </DoctorCardController>
            </template>
        </Doctors>






    </NuxtLayout>
</template>

<style scoped>
</style>