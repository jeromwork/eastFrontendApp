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
    EventSelectClinic,
    EventServiceAddToCart, EventOpenBookingForm
} from '../../../composables/useEvents'
import {ShowModalBookingFormDispatch, ShowModalServicesDispatch, OpenBookingFormDispatch} from '../../../composables/useDispatches'


import {
    bookingServiceSymbol, clinicsOfDoctorReadonlyRefSymbol, clinicWorkingSelectedRefSymbol, currentWorkingDayRefSymbol,
    servicesInCartSymbol,
    servicesSelectedSymbol,
    servicesSymbol, slotsRefSymbol, workDaysReadonlyRefSymbol
} from '../../../composables/useSymbols'



import {DoctorsService} from "../../../EastclinicVueApi";
import DoctorCardBooking from '../DoctorCard/views/Booking.vue'
import {BookingService} from "../../../EastclinicVueApi";
import BookingController from "../../Booking/BookingController.vue";
import BookingFormWithChoiceView from "../../Booking/views/BookingFormWithChoiceView.vue";
import Modal from "../../../UI/Modal.vue";
import type BookingFormViewProps from "../../Booking/imterfaces/BookingFormViewProprs";
import ServicesSelectListView from "../../../UI/Services/views/ServicesSelectListView.vue";


//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора

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


// doctorInfo.value.clinics = computed(() => ClinicsService.getClinicsByIds(Object.values(doctorInfo.value.filials))).value;




const clinicWorkingSelected: Ref<ClinicInterface | null> = ref( (new DoctorsService()).clinicWorkingDefault(doctorInfo.value.id) as ClinicInterface ?? null);
provide(clinicWorkingSelectedRefSymbol, clinicWorkingSelected);

provide(clinicsOfDoctorReadonlyRefSymbol, readonly( ref(computed(() => ClinicsService.getClinicsByIds(Object.values(doctorInfo.value.filials))).value)))



//add work days

provide(workDaysReadonlyRefSymbol, readonly(ref(computed( () => ScheduleService.workDays(doctorInfo.value.id, (clinicWorkingSelected.value) ? clinicWorkingSelected.value?.id : null)).value)))

const currentWorkingDay: Ref<number | null> = ref(    ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null);
provide(currentWorkingDayRefSymbol,  ref(currentWorkingDay))

const slots = computed(() => {
    if (!currentWorkingDay.value || !clinicWorkingSelected?.value?.id) return null;
    const slotsDoctor = ScheduleService.getSlots(clinicWorkingSelected?.value?.id as number, doctorInfo.value.id, currentWorkingDay.value as number);
    return slotsDoctor ?? null;
}).value;

provide(slotsRefSymbol, readonly(ref(slots)))


//handle services of doctor
provide(bookingServiceSymbol, new BookingService().setWorkingDay(currentWorkingDay.value));


provide(EventSelectClinic, (clinic:ClinicInterface) => {
    clinicWorkingSelected.value = clinic;
    currentWorkingDay.value = ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null
})


const showModalBooking = ref(false)


provide(ShowModalBookingFormDispatch, (show:boolean) => {
    showModalServices.value = false;
    showModalBooking.value = show;
})



const showModalServices = ref(false)
provide(ShowModalServicesDispatch, (show:boolean) => {
    showModalServices.value = show;
})


const bookingFormViewProps:Ref<BookingFormViewProps> = ref({});


provide(OpenBookingFormDispatch, (viewProps:BookingFormViewProps) => {
     showModalBooking.value = true;
    bookingFormViewProps.value = viewProps;
})



</script>

<template>
    <Modal  v-model:visible="showModalBooking" v-if="showModalBooking" >
          <BookingFormWithChoiceView v-bind="{doctor:doctorInfo,
          ...bookingFormViewProps}" >
          </BookingFormWithChoiceView>
    </Modal>
    <Modal v-model:visible="showModalServices">
        <ServicesSelectListView :services="doctor.service_data"/>
    </Modal>

  <slot
          v-bind="{ doctor:doctorInfo }"

  ></slot>
</template>



<style scoped>

</style>