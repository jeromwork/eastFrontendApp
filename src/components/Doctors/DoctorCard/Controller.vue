<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, provide, watch, watchEffect } from "vue";
import type { Ref, InjectionKey } from "vue";

import type {DoctorInterface, ContentInterface, ServiceData, ServiceCartInterface, ClinicInterface} from "../../../EastclinicVueApi";
import {ScheduleService,
    ClinicsService
} from "../../../EastclinicVueApi";

import { useEventBus, injectLocal, provideLocal } from '@vueuse/core'
import {
    EventClinicMapOpen,
    EventSelectedSlot,
    EventSelectedWorkingDay,
    EventSelectClinic,
    EventServiceAddToCart
} from '../../../composables/useEvents'


import {servicesInCartSymbol, servicesSelectedSymbol} from '../../../composables/useSymbols'



import {DoctorsService} from "../../../EastclinicVueApi";
import DoctorCardBooking from '../DoctorCard/views/Booking.vue'
import {BookingService} from "../../../EastclinicVueApi";
import BookingController from "../../Booking/BookingController.vue";
import BookingFormWithChoiceView from "../../Booking/views/BookingFormWithChoiceView.vue";
import Modal from "../../../UI/Modal.vue";


//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/



const props = defineProps<{    doctor: DoctorInterface }>();

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




const clinicWorkingSelected: Ref<ClinicInterface | null> = ref( (new DoctorsService()).clinicWorkingDefault(doctorInfo.value.id) as ClinicInterface ?? null);

//add work days
const workDays = computed( () => ScheduleService.workDays(doctorInfo.value.id, (clinicWorkingSelected.value) ? clinicWorkingSelected.value?.id : null));

const currentWorkingDay: Ref<number | null> = ref(    ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null);

// provide('clinicWorkingSelected', clinicWorkingSelected)



const slots = computed(() => {
    if (!currentWorkingDay.value || !clinicWorkingSelected?.value?.id) return null;
    const slotsDoctor = ScheduleService.getSlots(clinicWorkingSelected?.value?.id as number, doctorInfo.value.id, currentWorkingDay.value as number);
    return slotsDoctor ?? null;
});



const selectedSlot:Ref<number|null> = ref(null);

provide('slots', slots);


//handle services of doctor
const servicesInCart: Ref<ServiceCartInterface> = ref({} )
const servicesSelected: Ref<ServiceData[]> = ref([] )

provide(servicesInCartSymbol, servicesInCart)
provide(servicesSelectedSymbol, servicesSelected)




provide(EventServiceAddToCart, ( service: ServiceData ) => {
    // servicesInCart.value = useServiceAddToCart(service, servicesInCart.value, multiple);
    // const serviceExistsIndex = servicesSelected.value.findIndex(obj => obj.id === service.id);
    // if (serviceExistsIndex > -1) {
    //     servicesSelected.value.splice(serviceExistsIndex, 1);
    // } else {
    //     servicesSelected.value.push({...service});
    // }

});

onMounted(()=>{
})

//handle events from child


provide(EventSelectClinic, (clinic:ClinicInterface) => {
    clinicWorkingSelected.value = clinic;
    currentWorkingDay.value = ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null
})

provide(EventSelectedWorkingDay, (day:number) => {
    currentWorkingDay.value = day;
})







const showModalBooking = ref(false)
const showDoctorBlock = ref(false);
const showServicesBlock = ref(false);
const showClinicBlock = ref(false);
const showScheduleBlock = ref(false);

provide(EventSelectedSlot, (slot:number) => {
    selectedSlot.value = slot;
    //todo booking!!!!

    // bookingService = new BookingService()
    //     .withDoctor(doctorInfo.value)
    //     .withSlot(slot)
    //     .withClinic(clinicWorkingSelected.value)


    showModalBooking.value=true;
    showDoctorBlock.value = true;
    showClinicBlock.value = true;
    showScheduleBlock.value = true;
    showServicesBlock.value = true;





})



</script>

<template>
    <Modal  v-model:visible="showModalBooking" v-if="showModalBooking" >

          <BookingFormWithChoiceView v-bind="{doctor:doctorInfo,  workDays, clinicWorkingSelected, slots, currentWorkingDay, selectedSlot,
          showDoctorBlock, showServicesBlock, showClinicBlock, showScheduleBlock}" >


          </BookingFormWithChoiceView>
    </Modal>
  <slot
          v-bind="{doctor:doctorInfo, servicesInCart,  workDays, clinicWorkingSelected, slots, currentWorkingDay, selectedSlot}"

  ></slot>
</template>



<style scoped>

</style>