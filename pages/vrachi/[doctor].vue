

<script setup>
import {ref} from "vue";
import Doctors from "../../components/Doctors/Controller";
import DoctorCardController from '../../components/Doctors/DoctorCard/Controller'
import DoctorCardSingleDoctor from '../../components/Doctors/DoctorCard/views/SingleDoctor.vue'
import DoctorCardXL from '../../components/Doctors/DoctorCard/views/XL.vue'

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

                <DoctorCardController v-bind="doctorInfo" #default="doctorInfoPrepared">
                    <DoctorCardSingleDoctor v-bind="doctorInfoPrepared"/>
                </DoctorCardController>
            </template>

            <template #doctor="doctorInfo" v-else>
                <DoctorCardController :doctor="doctorInfo" v-slot="doctorInfo">
                    <DoctorCardXL v-bind="doctorInfo"/>
                </DoctorCardController>
            </template>
        </Doctors>






    </NuxtLayout>
</template>

<style scoped>
</style>