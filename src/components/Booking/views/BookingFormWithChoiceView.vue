<script setup lang="ts">


import { defineProps,  ref, inject } from "vue";
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
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import ServicesCartListView from "../../../UI/Services/views/ServicesCartListView.vue";
import type BookingFormViewProps from '../imterfaces/BookingFormViewProprs'
import PatientFormView from "./PatientFormView.vue";
import ServicesBlockView from "./ServicesBlockView.vue";
import DoctorCardState from "../../../state/DoctorCardState";
import ClinicCardSelectedBookingView from "../../../UI/Clinics/views/ClinicCardSelectedBookingView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import { YandexMetrika } from "../../../composables/useYandexMetrika";


const props = defineProps<BookingFormViewProps>();

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService;


const bookingBlocks = doctorCardState.bookingFormViewProps as BookingFormViewProps;

const doctor = doctorCardState.Doctor as DoctorInterface



</script>

<template>
    <div  :class="{'mobile': false}" class="booking__dialog__wrapper"    >

        <div

                class="vcard-padding position-relative booking-container"
                :class="{'rounded-xl' : !useIsMobile()}"
        >

            <div v-if="doctor" class="booking__dialog__scroll" id="booking__dialog__wrapper" >
                <div class="v-card-container divider" >
                    <div class="modal-card-title">
                        <span class="text-semibold">Запись
                            <span v-if="doctor.is_cabinet">в кабинет диангостики</span>
                            <span v-else-if="bookingBlocks.showDoctorBlock">на приём к врачу</span>
                            <span v-else>в клинику</span>
                        </span>
                        <span
                                class="icons closesearch pointer modal-card-title_close"
                                @click="doctorCardState.toggleBookingLeaveMessage(true)"
                        ></span>
                    </div>
                    <DoctorCardBookingView v-if="bookingBlocks.showDoctorBlock" />
                </div>
                <div ref="booking_scroll_dialog" class="border-radius-30 scroll">
                    <div class="booking__dialog">



                        <div v-if=" !doctorCardState.showBookingScheduleBlock ">

                            <ServicesBlockView v-if="bookingBlocks.showServicesBlock"/>

                            <div class="v-card-container last" id="booking-form">
                                <!-- inputs -->
                                <div class="booking__dialog__item" v-if="bookingBlocks.showShortFormTitle">
                                    <div class="booking__dialog__item">
                                        <span class="annotation">Оператор колл-центра перезвонит Вам в течение 15 минут для уточнения деталей и подтверждения записи на прием. </span>
                                    </div>

                                </div>
                                <PatientFormView/>



                                <!-- choose time -->
                                <div
                                        v-if="bookingBlocks.showScheduleBlock"
                                        @click="doctorCardState.toogleBookingScheduleBlock(true )"
                                        class="booking__dialog__item pointer">
                                    <div class="booking__dialog__card with-icon" :class="{'error-border':!!(doctorCardState.selectedSlotError)}">
                                        <div>

                                            <div class="booking__dialog__label">
                                                Дата и время приема
                                            </div>

                                            <span v-if="doctorCardState.selectedSlot">{{ useDateFormat(doctorCardState.selectedSlot *1000, 'YYYY-MM-DD HH:mm:ss').value}}</span>
                                            <span class="booking__dialog__card_input-text" v-else>Выбрать время</span>
                                        </div>

                                        <span class="icons pen"></span>
                                    </div>
                                    <div class="booking__dialog__card_error" v-show="doctorCardState.selectedSlotError"  >
                                        <div
                                                class="v-messages theme--light error--text"
                                                v-html="doctorCardState.selectedSlotError"
                                        >
                                        </div>
                                    </div>
                                </div>


                                <div
                                    v-if="bookingBlocks.showClinicBlock"
                                    class="booking__dialog__item pointer">
                                    <ClinicCardSelectedBookingView/>

                                </div>


                                <EcButton class="primary full-width shadow-button services-button-container"
                                          @click="doctorCardState.book()">
                                    <span>Записаться</span>

                                </EcButton>
                                <div class="mt-4 booking__annotation annotation">Нажимая «Записаться», я даю <a target="_blank" href="https://eastclinic.ru/assets-new/docs/soglasie-na-obrabotku.pdf">согласие на обработку персональных данных</a>
                                    и принимаю <a target="_blank" href="https://yandex.ru/legal/smartcaptcha_notice/">политику обработки данных</a>.</div>
                            </div>
                        </div>


                        <!--clinic schedule block-->
                        <div v-if="doctorCardState.showBookingScheduleBlock" class="v-card-container last">
                            <BackLink @click="doctorCardState.toogleBookingScheduleBlock(false)" to=""/>
                            <div class="slots" style="margin: 0 auto">
                                <div class="slots__header text-secondary">
                                    Врач принимает
                                    <span v-if="doctor.clinics?.length > 1">в нескольких клиниках</span>
                                    <span v-else>в клинике:</span>

                                </div>
                                <ClinicsSelectView
                                    v-if="doctor.clinics && doctorCardState.selectedClinic"
                                    :clinics="doctor.clinics"
                                    :modelValue = "doctorCardState.selectedClinic"
                                    @update:modelValue="doctorCardState.setSelectedClinic($event);"

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