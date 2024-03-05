<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, provide } from "vue";
import type { Ref } from "vue";

import type DoctorInterface from "../../../EastclinicVueApi/interfaces/DoctorInterface";
import type ContentInterface from "../../../EastclinicVueApi/interfaces/ContentInterface";
import type ServiceData from "../../../EastclinicVueApi/interfaces/ServiceData";
import type {ClinicInterface} from "#build/src/EastclinicVueApi";
import {ScheduleService,
    ClinicsService
} from "../../../EastclinicVueApi";

import { useEventBus } from '@vueuse/core'
import {
    EventClinicMapOpen,
    EventSelectedSlot,
    EventSelectedWorkingDay,
    EventSetCurrentClinic
} from '../../../composables/useEvents'
import {DoctorsService} from "../../../EastclinicVueApi";


//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/


interface DoctorCardViewProps {
    doctor: DoctorInterface;
}


const props = defineProps<DoctorCardViewProps>();

const doctorInfo = toRef(props, 'doctor');
const specials = computed(() => {
    let specs = '';
    if (doctorInfo.value?.main_specials) {
        specs +=  doctorInfo.value.main_specials.map(special => special.name).join(' · ');
    }
    if (doctorInfo.value?.specials_of_service) {
        specs += doctorInfo.value.specials_of_service.map(special => special.name).join(' · ');
    }
    return specs;
});
doctorInfo.value.specials = specials.value;


const photo120x120 = computed(() => {
    if ( doctorInfo.value?.content ){
        for (const i in doctorInfo.value.content){
            const img = doctorInfo.value.content[i]
            if(img.type === '120x120' && img.typeFile === 'image') return img;
        }
        return doctorInfo.value.photos['120x120'][0] as ContentInterface
    } else {
        return { id : null, type:'120x120', typeFile:"image", url:'/images/photo_soon.png' } as ContentInterface;
    }
});
doctorInfo.value.photo120x120 = photo120x120.value;

//add favorite service
doctorInfo.value.favoriteService = computed(() => {
    let mainService = (doctorInfo.value?.choosen_service_data?.[0]) ?? null
    if(!mainService && doctorInfo.value?.service_data?.[0]) mainService = doctorInfo.value.service_data[0];
    return mainService as ServiceData;
}).value;


doctorInfo.value.clinics = computed(() => ClinicsService.getClinicsByIds(Object.values(doctorInfo.value.filials))).value;
provide('clinics', doctorInfo.value.clinics)




//add work days
const workDays = ScheduleService.workDaysForDoctor(doctorInfo.value.id);

const currentWorkingDay: Ref<number | null> = ref(    ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null);
const clinicWorkingSelected: Ref<ClinicInterface | null> = ref( (new DoctorsService()).clinicWorkingDefault(doctorInfo.value.id) as ClinicInterface ?? null);
// provide('clinicWorkingSelected', clinicWorkingSelected)



const slots:Ref<number[]|null> = ref(null);
if(currentWorkingDay.value && clinicWorkingSelected?.value?.id) {
    slots.value = (ScheduleService.getSlots(clinicWorkingSelected?.value?.id as number, doctorInfo.value.id, currentWorkingDay.value as number)) ?? null;
}

const selectedSlot:Ref<number|null> = ref(null);

provide('slots', slots);



const servicesSelected = ref([])



const timeAppointment:Ref<number> = ref(0)

onMounted(()=>{
})

//handle events from child
useEventBus(EventClinicMapOpen).on((e) => {

    console.log(e)
})
useEventBus(EventSetCurrentClinic).on((clinic) => {
    clinicWorkingSelected.value = clinic;
})
useEventBus(EventSelectedWorkingDay).on((day) => {
    currentWorkingDay.value = day;
})

useEventBus(EventSelectedSlot).on((slot) => {
    selectedSlot.value = slot;
    //todo booking!!!!
    alert('BOOKING!!')
})



</script>

<template>

  <slot
          v-bind="{doctor:doctorInfo, servicesSelected,  workDays, clinicWorkingSelected, slots, currentWorkingDay, selectedSlot}"

  ></slot>
</template>



<style scoped>

</style>