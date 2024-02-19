<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount } from "vue";
import {doctorsList} from "./mockData/doctorsList";
import DoctorsService from "../../server/services/Doctors/DoctorsService";
import DoctorsRequest from "../../api/Doctors/DoctorsRequest";

const doctorsService = new DoctorsService();

//В этом компоненте обращаемся к сервису за данными по докторам
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам


const props = defineProps({
    //isSingleDoctor:{type:Boolean}
})

const getRequest = () => {
    const router = useRouter();

    const currentRoute = (useRouter()).currentRoute.value.path;

    const request = new DoctorsRequest;
    request.forCurrentUrl(currentRoute)
    //
    console.log(currentRoute)
    //
    // return request;
    return '';
}


onBeforeMount(()=>{
    getDoctorsFromServer();
});

const getDoctorsFromServer = async () =>{
    //get builded request

    await doctorsService.getItemsFromServer(getRequest());
}

const isOnline = ref(true);
const fullName = ref('Клюев Борис Борисович');

const doctors = ref(doctorsList)
const count = ref(0);

let de = computed(()=>    fullName.value+count.value)
const slotProps = {isOnline:isOnline, fullName:de, doctor_id:1};


</script>

<template>

<div v-for="(doctor, key) in doctors">
    <slot name="doctor" v-bind="doctor"></slot>
</div>

</template>



<style scoped>

</style>