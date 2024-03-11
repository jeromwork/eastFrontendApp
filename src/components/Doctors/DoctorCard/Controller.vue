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
    EventServiceAddToCart, EventOpenBookingForm
} from '../../../composables/useEvents'
import {ShowModalBookingFormDispatch, ShowModalServicesDispatch, OpenBookingFormDispatch} from '../../../composables/useDispatches'


import {
    bookingServiceSymbol,
    currentWorkingDayRefSymbol, DoctorCartStateSymbol,
    DoctorInfoSymbol,
    servicesInCartSymbol,
    servicesSelectedSymbol,
    servicesSymbol,
    slotsRefSymbol,
    workDaysReadonlyRefSymbol
} from '../../../composables/useSymbols'



import {DoctorsService} from "../../../EastclinicVueApi";
import DoctorCardBooking from '../DoctorCard/views/Booking.vue'
import {BookingService} from "../../../EastclinicVueApi";
import BookingController from "../../Booking/BookingController.vue";
import BookingFormWithChoiceView from "../../Booking/views/BookingFormWithChoiceView.vue";
import Modal from "../../../UI/Modal.vue";
import type BookingFormViewProps from "../../Booking/imterfaces/BookingFormViewProprs";
import ServicesSelectListView from "../../../UI/Services/views/ServicesSelectListView.vue";
import DoctorCardState from "../DoctorCardState";


//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/



const props = defineProps<{    doctor: DoctorInterface }>();
provide(DoctorCartStateSymbol, new DoctorCardState(props.doctor))

const doctorInfo = toRef(props, 'doctor');


const clinicWorkingSelected: Ref<ClinicInterface | null> = ref( (new DoctorsService()).clinicWorkingDefault(doctorInfo.value.id) as ClinicInterface ?? null);

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
provide(bookingServiceSymbol, new BookingService().setWorkingDay(currentWorkingDay.value).setClinic(clinicWorkingSelected.value));

provide(DoctorInfoSymbol, doctorInfo)


//
// provide(EventSelectClinic, (clinic:ClinicInterface) => {
//     clinicWorkingSelected.value = clinic;
//     currentWorkingDay.value = ScheduleService.nearestWorkDayForDoctor(doctorInfo.value.id) as number ?? null
// })


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