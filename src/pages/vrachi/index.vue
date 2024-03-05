

<script setup>
import Doctors from "../../components/Doctors/Controller";
import DoctorCardController from '../../components/Doctors/DoctorCard/Controller'
import DoctorCardSingleDoctor from '../../components/Doctors/DoctorCard/views/SingleDoctor.vue'
import DoctorCardXL from '../../components/Doctors/DoctorCard/views/XL.vue'
import {PageInfoService} from "~/EastclinicVueApi";

const pageInfo = PageInfoService.getPageInfo
// const route = useRoute();

import { onMounted, ref, defineAsyncComponent } from 'vue';



onMounted(() => {
    // setTimeout(()=>{
    //     Doctors.value = defineAsyncComponent(async () => await import('../../components/Doctors/Controller'));
    //     console.log('load doctors component')
    // }, 10000)


});


</script>

<template>
    <div>

        <NuxtLayout name="doctors">
            <Doctors>

                <template #doctorsList="doctorInfo">
                    {{doctorInfo}}

                    <DoctorCardController v-bind="doctorInfo" #default="doctorInfoPrepared" >
                        <DoctorCardXL v-bind="doctorInfoPrepared"/>
                    </DoctorCardController>
                </template>
                <template #singleDoctor="doctorInfo">
                    <DoctorCardController v-bind="doctorInfo" #default="doctorInfoPrepared">
                        <DoctorCardSingleDoctor v-bind="doctorInfoPrepared"/>
                    </DoctorCardController>
                </template>

            </Doctors>

        </NuxtLayout>
    </div>
</template>

<style scoped>
</style>