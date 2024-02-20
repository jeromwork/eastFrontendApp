<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount } from "vue";
import {doctorsList} from "./mockData/doctorsList";
import DoctorsService from "../../server/services/Doctors/DoctorsService";
import DoctorsRequest from "../../api/Doctors/DoctorsRequest";
import DoctorsModxRequest from "../../api/Doctors/DoctorsModxRequest";

const doctorsService = new DoctorsService();


//В этом компоненте обращаемся к сервису за данными по докторам
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам


const props = defineProps({
    //isSingleDoctor:{type:Boolean}
    isModxApi:{
        type:Boolean,
        default:true
    }
})

if(props.isModxApi){
    doctorsService.useModxApi();
}
const buildRequest = () => {

    const currentRoute = (useRouter())?.currentRoute?.value?.path;
    let request
    if(props.isModxApi){

        return (new DoctorsModxRequest)
            .forUrl(currentRoute)
            .forAction('doctors/getDoctorsMultiList')
            .forComponent('health')
    }else {
        return (new DoctorsRequest).forCurrentUrl(currentRoute)
    }

}


onBeforeMount(async ()=>{
    await doctorsService.getItemsFromServer( buildRequest().forPage(1) );
    // doctors.value = computed(doctorsService.items)
});

// const getDoctorsFromServer = async () =>{
//     //get builded request
//
//
// }
const doctors = computed(()=> doctorsService.items())
const typeDoctorPage = doctorsService.typeDoctorPage()
// const doctors = ref(doctorsList)
const count = ref(0);


</script>

<template>
<div v-for="(doctor, key) in doctors" v-if="doctors">
{{typeDoctorPage}}

    <slot v-if="typeDoctorPage==='list'" name="doctorsList" v-bind="doctor"></slot>
    <slot v-if="typeDoctorPage==='single'" name="singleDoctor" v-bind="doctor"></slot>
</div>

</template>



<style scoped>

</style>