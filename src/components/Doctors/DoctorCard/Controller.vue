<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, provide, watch, watchEffect } from "vue";
import type { Ref, InjectionKey } from "vue";

import type {DoctorInterface, ContentInterface, ServiceData, ServiceCartInterface, ClinicInterface} from "../../../EastclinicVueApi";
import {ScheduleService,
    ClinicsService
} from "../../../EastclinicVueApi";

import {
    currentWorkingDayRefSymbol, DoctorCartStateSymbol,
    DoctorInfoSymbol,
    servicesInCartSymbol,
    servicesSelectedSymbol,
    servicesSymbol,
    ScheduleStateSymbol,
    ClinicsStateSymbol, BookingStateSymbol, BookingServiceSymbol
} from '../../../composables/useSymbols'



import {DoctorsService} from "../../../EastclinicVueApi";
import DoctorCardBooking from '../DoctorCard/views/Booking.vue'
import {BookingService} from "../../../EastclinicVueApi";
import BookingFormWithChoiceView from "../../Booking/views/BookingFormWithChoiceView.vue";
import Modal from "../../../UI/Modal.vue";
import ServicesSelectListView from "../../../UI/Services/views/ServicesSelectListView.vue";
import DoctorCardState from "../../../state/DoctorCardState";
import BookingSuccessMessageView from '../../Booking/views/BookingSuccessMessageView.vue'

//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/



const props = defineProps<{    doctor: DoctorInterface }>();


//handle services of doctor


const doctorCardState =  new DoctorCardState().withDoctor(props.doctor).withBookingService(new BookingService())

provide( DoctorCartStateSymbol,doctorCardState )
provide( ScheduleStateSymbol, doctorCardState.scheduleState )
provide( DoctorInfoSymbol, doctorCardState.Doctor )
provide( ClinicsStateSymbol, doctorCardState )
provide( BookingStateSymbol, doctorCardState.bookingState )
provide( BookingServiceSymbol, doctorCardState.BookingService )


watch(doctorCardState.bookingState._showBookingSuccessMessage, ()=>{
    console.log(3235234626888888)
})
</script>

<template>

        <Modal  v-model:visible="doctorCardState.bookingState.showModalBooking"  >
            <BookingFormWithChoiceView />
        </Modal>
        <Modal v-model:visible="doctorCardState.bookingState.showBookingSuccessMessage" >
            <BookingSuccessMessageView />
        </Modal>
        <Modal v-model:visible="doctorCardState.showModalServices">
            <ServicesSelectListView :services="doctor.service_data"/>
        </Modal>
  <slot></slot>
</template>



<style scoped>

</style>