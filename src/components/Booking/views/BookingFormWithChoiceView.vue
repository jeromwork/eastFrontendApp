<script setup lang="ts">


import { defineProps,  ref, inject, watch } from "vue";
import type { Ref } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'
import type {BookingService, ServiceCartInterface, DoctorInterface} from "../../../EastclinicVueApi";
import type { ServiceData} from "../../../EastclinicVueApi";
import useIsMobile from "../../../composables/useIsMobile";
import BackLink from "../../../UI/BackLink/BackLink.vue";
import ClinicsSelectView from "../../../UI/Clinics/views/ClinicsSelectView.vue";
import ScheduleCardView from "../../../UI/Schedule/views/ScheduleCardView.vue";
import type DoctorCardViewProps from "../../Doctors/Interfaces/DoctorCardViewProps";
import DoctorCardBookingView from '../../Doctors/DoctorCard/views/Booking.vue'
import {
    BookingStateSymbol,
    ClinicsStateSymbol,
    DoctorCartStateSymbol,
    DoctorInfoSymbol,
    ScheduleStateSymbol
} from "../../../composables/useSymbols";
import ServicesCartListView from "../../../UI/Services/views/ServicesCartListView.vue";
import type BookingFormViewProps from '../imterfaces/BookingFormViewProprs'
import PatientFormView from "./PatientFormView.vue";
import ServicesBlockView from "./ServicesBlockView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import { YandexMetrika } from "../../../composables/useYandexMetrika";
import {onClickOutside} from "@vueuse/core";
import type IScheduleState from "../../../interfaces/IScheduleState";
import ClinicCardSelectedView from "../../../UI/Clinics/views/ClinicCardSelectedView.vue";
import type IClinicsState from "../../../interfaces/IClinicsState";
import type BookingState from "../../../state/BookingState";
import BookingSuccessMessageView from "../../Booking/views/BookingSuccessMessageView.vue";
import Modal from "../../../UI/Modal.vue";
import type {ClinicInterface} from "../../../EastclinicVueApi";


const props = defineProps<BookingFormViewProps>();






const doctor:DoctorInterface|null = inject( DoctorInfoSymbol, null );
const scheduleState:IScheduleState|null = inject( ScheduleStateSymbol, null);
const clinicsState:IClinicsState|null = inject( ClinicsStateSymbol, null )
const bookingState = inject( BookingStateSymbol ) as BookingState
const patient = bookingState.Patient;
const bookingBlocks = bookingState.bookingFormViewProps as BookingFormViewProps;

const showLeaveMessage:Ref<boolean> = ref(false)

const refBookingDialog = ref(null)
onClickOutside(refBookingDialog, event => {
    //not work
    showLeaveMessage.value = true;
})

watch(bookingState._showBookingSuccessMessage, ()=>{
    console.log(3235234626888888)
})
</script>

<template>
    <div  :class="{'mobile': false}" class="booking__dialog__wrapper"  ref="refBookingDialog"  >
        <div
                class="vcard-padding position-relative booking-container"
                :class="{'rounded-xl' : !useIsMobile()}"
        >
            <div class="booking__dialog__scroll" id="booking__dialog__wrapper" >
                <div class="v-card-container divider" >
                    <div class="modal-card-title">
                        <span class="text-semibold">Запись
                            <span v-if="doctor?.is_cabinet">в кабинет диангостики</span>
                            <span v-else-if="doctor && bookingBlocks.showDoctorBlock">на приём к врачу</span>
                            <span v-else>в клинику</span>
                        </span>
                        <span class="icons closesearch pointer modal-card-title_close"
                                @click="showLeaveMessage = true"
                        >X</span>
                    </div>
                    <DoctorCardBookingView v-if="bookingBlocks.showDoctorBlock" />
                </div>
                <div ref="booking_scroll_dialog" class="border-radius-30 scroll">
                    <div class="booking__dialog">
                        <div v-if="!bookingState.showBookingScheduleBlock">

                            <ServicesBlockView v-if="bookingBlocks.showServicesBlock"/>

                            <div class="v-card-container last" id="booking-form">
                                <!-- inputs -->
                                <div class="booking__dialog__item" v-if="bookingBlocks.showShortFormTitle">
                                    <div class="booking__dialog__item">
                                        <span class="annotation">Оператор колл-центра перезвонит Вам в течение 15 минут для уточнения деталей и подтверждения записи на прием. </span>
                                    </div>

                                </div>
                                <PatientFormView :state-patient="patient"/>

<!-- selected time -->
                                <div
                                        v-if="bookingBlocks.showScheduleBlock && scheduleState"
                                        @click="bookingState.showBookingScheduleBlock = true"
                                        class="booking__dialog__item pointer">
                                    <div class="booking__dialog__card with-icon" :class="{'error-border':!!(scheduleState?.selectedSlotError)}">
                                        <div>

                                            <div class="booking__dialog__label">
                                                Дата и время приема
                                            </div>

                                            <span v-if="scheduleState?.selectedSlot">{{ useDateFormat(scheduleState?.selectedSlot *1000, 'YYYY-MM-DD HH:mm:ss').value}}</span>
                                            <span class="booking__dialog__card_input-text" v-else>Выбрать время</span>
                                        </div>

                                        <span class="icons pen"></span>
                                    </div>
                                    <div class="booking__dialog__card_error" v-show="scheduleState?.selectedSlotError"  >
                                        <div
                                                class="v-messages theme--light error--text"
                                                v-html="scheduleState?.selectedSlotError"
                                        >
                                        </div>
                                    </div>
                                </div>
<!-- /selected time -->
<!-- selected clinic -->
                                <div
                                    v-if="bookingBlocks.showClinicBlock"
                                    class="booking__dialog__item pointer">
                                    <div
                                        @click="bookingState.showBookingScheduleBlock = true"
                                        class="booking__dialog__card with-icon" style="padding-bottom: 7px; padding-top: 7px" :class="{'error-border':!!(scheduleState?.selectedSlotError)}">
                                        <div>
                                            <div class="booking__dialog__label">
                                                Клиника
                                            </div>

                                            <div v-if="clinicsState?.selectedClinic">
                                                <ClinicCardSelectedView :clinic="clinicsState.selectedClinic"/>
                                            </div>
                                            <div v-else class="">
                                                <span class="booking__dialog__card_input-text">Выбрать клинику</span>
                                            </div>
                                        </div>

                                        <span class="icons pen"></span>
                                    </div>

                                </div>
<!-- /selected clinic -->

                                <div class="booking__dialog__error_wrap"
                                     v-if="bookingState.errorText"
                                >
                                    <div
                                        class="error--text booking__dialog__error"
                                        v-html="bookingState.errorText"
                                    >
                                    </div>
                                </div>
                                <EcButton class="primary full-width shadow-button services-button-container"
                                          @click="bookingState.book()">
                                    <span>Записаться</span>

                                </EcButton>
                                <div class="mt-4 booking__annotation annotation">Нажимая «Записаться», я даю <a target="_blank" href="https://eastclinic.ru/assets-new/docs/soglasie-na-obrabotku.pdf">согласие на обработку персональных данных</a>
                                    и принимаю <a target="_blank" href="https://yandex.ru/legal/smartcaptcha_notice/">политику обработки данных</a>.</div>
                            </div>
                        </div>


<!--clinic schedule block-->
                        <div v-if="bookingState.showBookingScheduleBlock" class="v-card-container last">
                            <BackLink @click="bookingState.showBookingScheduleBlock = false" to=""/>
                            <div class="slots" style="margin: 0 auto">
                                <div class="slots__header text-secondary">
                                    Врач принимает
                                    <span v-if="doctor?.clinics?.length > 1">в нескольких клиниках</span>
                                    <span v-else>в клинике:</span>

                                </div>
                                <ClinicsSelectView
                                    v-if="doctor?.clinics && clinicsState?.selectedClinic"
                                    :clinics="doctor?.clinics as ClinicInterface[]"
                                    :modelValue = "clinicsState?.selectedClinic"
                                    @update:modelValue="clinicsState?.setSelectedClinic($event);"

                                />
                                <div class="slots__header text-secondary">
                                    Записаться онлайн
                                </div>
                                <ScheduleCardView/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>



        </div>


    </div>


</template>


<style scoped>
.booking__dialog__item_row .v-input__slot {
    height: auto;
}
.booking__dialog__item_row .v-messages {
    min-height: 0;
}
</style>