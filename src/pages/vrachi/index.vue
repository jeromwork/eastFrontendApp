

<script setup>
import Doctors from "../../components/Doctors/Controller";
import DoctorCardController from '../../components/Doctors/DoctorCard/Controller'
import SingleDoctor from '../../components/Doctors/DoctorCard/views/SingleDoctor.vue'
// import DoctorCardXL from '../../components/Doctors/DoctorCard/views/XL.vue'
import {PageInfoService} from "~/EastclinicVueApi";

const pageInfo = PageInfoService.getPageInfo
// const route = useRoute();

import { onMounted, ref, defineAsyncComponent } from 'vue';
import MainPageSearch from "../../components/SearchPanel/MainPageSearchView.vue";
import MainSearchView from "../../components/SearchPanel/views/MainSearchView.vue";
import XL from "../../components/Doctors/DoctorCard/views/XL.vue";



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

            <MainSearchView/>

            <Doctors>
                <template #doctorsList="{doctor}">

                    <DoctorCardController v-bind="{doctor}" #default="doctorInfoPrepared" >
                        <XL v-bind="doctorInfoPrepared"/>
                    </DoctorCardController>
                </template>
                <template #singleDoctor="{doctor}">
                    <DoctorCardController v-bind="{doctor}" #default="doctorInfoPrepared">
                        <SingleDoctor v-bind="doctorInfoPrepared"/>
                    </DoctorCardController>
                </template>

            </Doctors>

        </NuxtLayout>
    </div>
</template>

<style scoped>
</style>