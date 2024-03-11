<script setup lang="ts">


import { defineProps,  ref, inject } from "vue";
import type { Ref } from 'vue'
import type {BookingService, ServiceCartInterface} from "../../../EastclinicVueApi";
import type { ServiceData} from "../../../EastclinicVueApi";
import useIsMobile from "../../../composables/useIsMobile";
import BackLink from "../../../UI/BackLink/BackLink.vue";
import ClinicsSelectView from "../../../UI/Clinics/views/ClinicsSelectView.vue";
import ScheduleCardView from "../../../UI/Schedule/views/ScheduleCardView.vue";
import type DoctorCardViewProps from "../../Doctors/Interfaces/DoctorCardViewProps";
import DoctorCardBookingView from '../../Doctors/DoctorCard/views/Booking.vue'
import {bookingServiceSymbol} from "../../../composables/useSymbols";
import ServicesCartListView from "../../../UI/Services/views/ServicesCartListView.vue";
import type BookingFormViewProps from '../imterfaces/BookingFormViewProprs'
import {ShowModalServicesDispatch} from "../../../composables/useDispatches";
import PatientFormView from "./PatientFormView.vue";

interface BookingFormProps extends DoctorCardViewProps, BookingFormViewProps {}

const props = defineProps<BookingFormProps>();


const doctor = computed(() => props.doctor).value

const showChooseClinicScheduleBlock = ref(false)

const toggleLeaveMessage = () =>{
    console.log(4343343)
}

const bookingService = inject(bookingServiceSymbol) as BookingService
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');


const showModalServices = inject(ShowModalServicesDispatch);

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
                            <span v-else-if="showDoctorBlock">на приём к врачу</span>
                            <span v-else>в клинику</span>
                        </span>
                        <span
                                class="icons closesearch pointer modal-card-title_close"
                                @click="toggleLeaveMessage"
                        ></span>
                    </div>
                    <DoctorCardBookingView v-if="showDoctorBlock" :doctor="doctor"/>
                </div>
                <div ref="booking_scroll_dialog" class="border-radius-30 scroll">
                    <div class="booking__dialog">
<!--clinic schedule block-->
                        <div v-if="showChooseClinicScheduleBlock" class="v-card-container last">
                            <BackLink @click="showChooseClinicScheduleBlock=false" to=""/>
                            <div class="slots" style="margin: 0 auto">
                                <div class="slots__header text-secondary">
                                    Врач принимает
                                    <span v-if="doctor.clinics?.length > 1">в нескольких клиниках</span>
                                    <span v-else>в клинике:</span>

                                </div>

                                <ClinicsSelectView v-if="doctor.clinics && bookingService.selectedClinic"/>
                                <div class="slots__header text-secondary">
                                    Записаться онлайн
                                </div>
                                <ScheduleCardView/>

                            </div>

                        </div>

                        <div v-if="!showChooseClinicScheduleBlock && showServicesBlock">
                            <div class="v-card-container middle divider">
                                <div class="booking__dialog__small-header mb-3">
                                    <span class="text-semibold text-regular">Услуга</span>
                                    <span v-show="bookingService.Cart.count" class="annotation">{{bookingService.Cart.count}}</span>
                                    <span v-show="bookingService.Cart.servicesList" class="annotation float-right pointer" @click="bookingService.Cart.clear()" >Удалить всё
                                        <span class="icons trash"></span>
                                    </span>
                                </div>
                                <div v-if="!bookingService.Cart.count" class="services-full-width">
                                    <div class="doctor-info__services_wrap serv">
                                        <div role="button" aria-haspopup="true" aria-expanded="false" class="doctor-info__services" @click="showModalServices( true )">
                                            <div class="doctor-info__services_title serv-title">Выберите услугу</div>
                                            <div class="doctor-info__services_price serv-price"></div>
                                            <div class="doctor-info__services_more serv-more">
                                                <span class="icons down"></span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <ServicesCartListView />



                                <div v-if="!bookingService.Cart.count"
                                     @click.prevent="showModalServices(true)"
                                     class="booking__dialog__item_row">
                                    <input type="checkbox" checked="checked"/>
                                    <span class="checkbox__label text-color-main">Записаться без услуги</span>
                                </div>

                            </div>

                            <div class="v-card-container last" id="booking-form">
                                <!-- inputs -->
                                <div class="booking__dialog__item" v-if="showShortFormTitle">
                                    <div class="booking__dialog__item">
                                        <span class="annotation">Оператор колл-центра перезвонит Вам в течение 15 минут для уточнения деталей и подтверждения записи на прием. </span>
                                    </div>
                                    <PatientFormView/>
                                </div>
                                <!-- choose time -->
                                <div
                                        v-if="bookingBlocks.calendar"
                                        @click="openCalendarWithSlots"
                                        class="booking__dialog__item pointer">
                                    <div
                                            :class="{'error-border' : !validateClinic}"
                                            class="booking__dialog__card with-icon">
                                        <div>
                                            <div class="booking__dialog__label">
                                                Дата и время приема
                                            </div>
                                            <span v-if="date">{{date}}</span>
                                            <span class="booking__dialog__card_input-text" v-else>Выбрать время</span>
                                        </div>

                                        <span class="icons pen"></span>
                                    </div>
                                    <div class="booking__dialog__card_error"
                                         v-show="errorTimeText"
                                    >
                                        <div
                                                class="v-messages theme--light error--text"
                                                v-html="errorTimeText"
                                        >
                                        </div>
                                    </div>
                                </div>
                                <!-- choose clinic -->
<!--                                <div-->
<!--                                        v-if="bookingBlocks.chooseClinic"-->
<!--                                        class="booking__dialog__item pointer">-->
<!--                                    <div-->
<!--                                            @click="openCalendarWithSlots"-->
<!--                                            :class="{'error-border' : !validateClinic}"-->
<!--                                            class="booking__dialog__card with-icon" style="padding-bottom: 7px; padding-top: 7px">-->
<!--                                        <div>-->
<!--                                            <div class="booking__dialog__label">-->
<!--                                                Клиника-->
<!--                                            </div>-->

<!--                                            <div v-if="Object.keys(chosenClinicNow).length !== 0">-->
<!--                                                <span v-if="chosenClinicNow.id !== 42" style="top: 0" :class="'metro-label m'+chosenClinicNow.node_color"></span>-->
<!--                                                <span >{{ chosenClinicNow.node_address }}</span>-->
<!--                                                <span v-if="chosenClinicNow.way !== null" class="icons guy"></span>-->
<!--                                                <span v-if="chosenClinicNow.way !== null" class="text-secondary text-medium">{{chosenClinicNow.way}} м</span>-->
<!--                                                <span v-if="chosenClinicNow.way === null && chosenClinicNow.way_time" class="text-secondary text-medium text-no-wrap"><span class="icons guy"></span> {{chosenClinicNow.way_time}}</span>-->


<!--                                                <v-dialog-->
<!--                                                        class="dialog"-->
<!--                                                        v-model="mapDialog"-->
<!--                                                        scrollable-->
<!--                                                        :fullscreen="fullscreen"-->
<!--                                                        width="600px"-->
<!--                                                >-->
<!--                                                    <template v-slot:activator="{ on, attrs }">-->
<!--                                                        <div>-->
<!--                                                            <div class="">-->
<!--                                                                {{ chosenClinicNow.full_name }}-->
<!--                                                                <a-->
<!--                                                                        style="display: inline"-->
<!--                                                                        class="slots__clinic-changer_clinic-info_link"-->
<!--                                                                        v-bind="attrs"-->
<!--                                                                        v-on="on"-->
<!--                                                                        @click.prevent="map()"-->
<!--                                                                        href="">-->

<!--                                  <span-->
<!--                                          v-show="chosenClinicNow.address"-->
<!--                                          class="slots__clinic-changer_clinic-info_addr text-no-wrap"><span class="icons map"></span>{{ chosenClinicNow.address }}</span>-->

<!--                                                                </a>-->
<!--                                                            </div>-->


<!--                                                        </div>-->

<!--                                                    </template>-->
<!--                                                    <v-card-->
<!--                                                            class=" vcard-padding"-->
<!--                                                            :class="{'rounded-xl' : !fullscreen}"-->
<!--                                                    >-->
<!--                                                        <div class="modal-card-title">-->
<!--                                                            <span>На карте</span> <span-->
<!--                                                                class="icons close modal-card-title_close"-->
<!--                                                                @click="mapDialog = false"-->
<!--                                                        ></span>-->
<!--                                                        </div>-->

<!--                                                        <v-card-text v-html="renderMap" class="scroll v-card-text">-->
<!--                                                        </v-card-text>-->
<!--                                                        <div class="grid">-->
<!--                                                            <button @click="mapDialog = false" type="button" class="button primary small search justify-self-end">Закрыть</button>-->
<!--                                                        </div>-->
<!--                                                    </v-card>-->
<!--                                                </v-dialog>-->
<!--                                            </div>-->
<!--                                            <div v-else class="">-->
<!--                                                <span class="booking__dialog__card_input-text">Выбрать клинику</span>-->
<!--                                            </div>-->
<!--                                        </div>-->

<!--                                        <span class="icons pen"></span>-->
<!--                                    </div>-->

<!--                                </div>-->

                            </div>
<!--                            <div class="v-card-container button-container padding-c">-->
<!--                                <div class="booking__dialog__error_wrap"-->
<!--                                     v-if="errorText"-->
<!--                                >-->
<!--                                    <div-->
<!--                                            class="error&#45;&#45;text booking__dialog__error"-->
<!--                                            v-html="errorText"-->
<!--                                    >-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash;                         <YandexCaptcha ref="yandexCaptcha" v-model="captchaToken" :captchaServerKey="captchaServerKey" :invisible="true"/>//todo #captha_enable &ndash;&gt;-->
<!--                                <ec-button-->
<!--                                        @click="runCheck"-->
<!--                                        large-->
<!--                                        :loading="loading"-->
<!--                                        :disabled="loading"-->
<!--                                        class="primary full-width shadow-button services-button-container"-->
<!--                                >-->
<!--                  <span v-show="!Object.keys(chooseServices).length">-->
<!--                    <span>Записаться</span>-->
<!--                    <span-->
<!--                            v-show="bookingBlocks.services"-->
<!--                            style="font-size: 12px; color: #B6C8F3; display: block">без выбора услуги</span>-->
<!--                  </span>-->

<!--                                    <div v-show="Object.keys(chooseServices).length" class="services-button">-->
<!--                                        <div class="d-flex align-center" style="width: 95%">-->
<!--                                            <div class="d-flex align-center margin-right-6">-->
<!--                                                <span class="icons cart margin-right-2"></span>-->
<!--                                                <span>{{Object.keys(chooseServices).length}}</span>-->
<!--                                            </div>-->
<!--                                            <div class="services-cart">-->
<!--                                                <div class="text-left">-->
<!--                                                    <span class="margin-right-2">Записаться</span>-->
<!--                                                    <span class="text-blue">-->
<!--                      <span>{{totalPrice}}₽</span>-->
<!--                    </span>-->
<!--                                                </div>-->
<!--                                                <div class="services-cart__list-of-services text-small text-left mt-1">-->
<!--                                                    {{servicesNames}}-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="d-flex align-center">-->
<!--                                            <span class="icons arrow-white"></span>-->
<!--                                        </div>-->
<!--                                    </div>-->

<!--                                </ec-button>-->


<!--                                <div class="mt-4 booking__annotation annotation">Нажимая «Записаться», я даю <a target="_blank" href="https://eastclinic.ru/assets-new/docs/soglasie-na-obrabotku.pdf">согласие на обработку персональных данных</a>-->
<!--                                    и принимаю <a target="_blank" href="https://yandex.ru/legal/smartcaptcha_notice/">политику обработки данных</a>.</div>-->
<!--                            </div>-->
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