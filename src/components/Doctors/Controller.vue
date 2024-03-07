<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted} from "vue";
import {doctorsList} from "./mockData/doctorsList";
import {DoctorsService, DoctorsRequest} from "../../EastclinicVueApi";

const doctorsService = new DoctorsService();


//В этом компоненте обращаемся к сервису за данными по докторам
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

const props = defineProps()


const buildRequest = () => {

    const currentRoute = (useRouter())?.currentRoute?.value?.path;
    return (new DoctorsRequest).forCurrentUrl(currentRoute)

}
await doctorsService.getItemsFromServer( buildRequest().forPage(1).perPage(10));

onMounted(async ()=>{


    // doctors.value = computed(doctorsService.items)
});

const doctors = computed(()=> doctorsService.items())
const typeDoctorPage = doctorsService.typeDoctorPage()
// const doctors = ref(doctorsList)
const count = ref(0);


</script>

<template>
<div v-for="(doctor, key) in doctors" v-if="doctors">
    <slot v-if="typeDoctorPage==='list'" name="doctorsList" v-bind="{doctor}"></slot>
    <slot v-if="typeDoctorPage==='single'" name="singleDoctor" v-bind="{doctor}"></slot>
</div>

</template>



<style scoped>

</style>