

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

//todo doctorInfo.isSingleDoctor we can define and use in props DoctorCardController, or use special props doctors and other props, including isSingleDoctor
</script>

<template>
    <NuxtLayout name="doctors">
        <Doctors :is-modx-api="true">
            <template #doctor="doctorInfo">

                <DoctorCardController v-bind="doctorInfo" #default="doctorInfoPrepared" >
                    <DoctorCardXL v-bind="{doctor:doctorInfoPrepared}"/>
                </DoctorCardController>

            </template>
            <template #singleDoctor="doctorInfo">
                <DoctorCardController v-bind="doctorInfo" #default="doctorInfoPrepared">
                    <DoctorCardSingleDoctor v-bind="doctorInfoPrepared"/>
                </DoctorCardController>
            </template>

        </Doctors>






    </NuxtLayout>
</template>

<style scoped>
</style>