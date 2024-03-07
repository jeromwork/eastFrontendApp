<script setup lang="ts">


import { defineProps,  ref } from "vue";
import type { Ref } from 'vue'
import {BookingService} from "../../../EastclinicVueApi";
import useIsMobile from "../../../composables/useIsMobile";



const props = defineProps<{bookingService:BookingService}>();
const doctor = props.bookingService.doctor

</script>

<template>
    <div  :class="{'mobile': false}" class="booking__dialog__wrapper"    >
        <div

                class="vcard-padding position-relative booking-container"
                :class="{'rounded-xl' : !useIsMobile()}"
        >
            <div class="booking__dialog__scroll"
                 id="booking__dialog__wrapper"

            >
                <div class="v-card-container divider">
                    <div class="modal-card-title">
            <span class="text-semibold">Запись
              <span v-if="doctor.is_cabinet">в кабинет диангостики</span>
              <span v-else-if="bookingBlocks.doctor">на приём к врачу</span>
              <span v-else>в клинику</span></span>
                        <span
                                class="icons closesearch pointer modal-card-title_close"
                                @click="toggleLeaveMessage"
                        ></span>
                    </div>
                    <div
                            v-if="bookingBlocks.doctor"
                            class="booking__dialog__doctor-card">
                        <div class="booking__dialog__doctor-card_photo">
                            <img :src="photo" :alt="doctor.fullname">
                        </div>
                        <div class="booking__dialog__doctor-card_info">
                            <div class="text-semibold">{{doctor.fullname}}</div>
                            <div class="booking__dialog__doctor-card_info_desc">{{specials}}</div>
                        </div>
                    </div>
                </div>
                <div
                        ref="booking_scroll_dialog"
                        class="border-radius-30 scroll">
                    <div class="booking__dialog">
                        <div
                                v-show="!chooseClinicDialog"
                        >
                            <div
                                    v-show="bookingBlocks.services"
                                    class="v-card-container middle divider">
                                <div class="">
                                    <div
                                            @click="clearAllServices"
                                            class="booking__dialog__small-header mb-3">
                                        <span class="text-semibold text-regular">Услуга</span> <span v-show="Object.keys(chooseServices).length" class="annotation">{{Object.keys(chooseServices).length}}</span>
                                        <span v-show="Object.keys(chooseServices).length" class="annotation float-right pointer">Удалить всё <span class="icons trash"></span></span>
                                    </div>
                                    <div
                                            v-show="Object.keys(chooseServices).length === 0"
                                            class="services-full-width">
                                        <services
                                                :doctor="doctor"
                                                :openServicesDialog="openServicesDialog"
                                                :clickable="true"
                                                :mainServices="mainService"
                                                :allServices="services"
                                                @closeServicesDialog="toggleServicesDialog()"
                                                @clickServicesDialog="toggleServicesDialog()"
                                        ></services>
                                    </div>
                                    <div
                                            v-for="service in chooseServices"
                                            class="doctor-info__services__cart-list">
                                        <div class="mb-2 text-medium">
                                            {{(service.title) ? service.title :  service.name}}
                                            <span v-if="service.option !== ''" class="text-secondary">({{service.option}})</span>
                                        </div>
                                        <div class="doctor-info__services list cart">
                                            <div class="doctor-info__services_title serv-title">
                                                <div class="services__count-switcher">
                    <span
                            @click="serviceMinusCount(service)"
                            class="icons minus"></span>
                                                    <span class="text-regular">{{serviceCount(service)}}</span>
                                                    <span
                                                            @click="servicePlusCount(service)"
                                                            class="icons plus"></span>
                                                </div>

                                            </div>
                                            <div
                                                    v-if="service.custom_price && service.custom_price < service.price"
                                                    class="doctor-info__services_price serv-price">
                                                <div class="doctor-info__services_price_current text-semibold">{{service.custom_price * service.counter}}₽</div>
                                                <div class="doctor-info__services_price_discount_price">
                                                    <span class="doctor-info__services_off_price list">{{service.price}}₽</span>
                                                    <span class="doctor-info__services_discount_percent list">
                        -{{ Math.floor(((service.price - service.custom_price) / service.price) * 100)}}%
                      </span>
                                                </div>
                                            </div>
                                            <div v-else class="doctor-info__services_price serv-price">
                                                <div class="doctor-info__services_price_current text-semibold text-regular">{{(service.price > service.custom_price) ? service.price * service.counter : service.custom_price * service.counter}}₽</div>
                                            </div>

                                            <!--                  <div-->
                                            <!--                    @click="deleteService(service)"-->
                                            <!--                    class="doctor-info__services_delete serv-delete">-->
                                            <!--                    <span style="filter: opacity(0.4);" class="icons close"></span>-->
                                            <!--                  </div>-->

                                        </div>
                                    </div>
                                    <!--              <div-->
                                    <!--                v-show="Object.keys(chooseServices).length > 1"-->
                                    <!--                class="doctor-info__services list cart mt-4">-->
                                    <!--                <div class="doctor-info__services_title serv-title">-->
                                    <!--                  <span class="text-semibold text-regular">Общая сумма услуг:</span>-->
                                    <!--                </div>-->
                                    <!--                <div class="doctor-info__services_price serv-price">-->
                                    <!--                  <div class="doctor-info__services_price_current text-semibold text-regular">{{totalPrice}}₽</div>-->
                                    <!--                </div>-->
                                    <!--              </div>-->
                                    <div
                                            v-show="Object.keys(chooseServices).length !== 0"
                                            @click="toggleServicesDialog(true)"
                                            class="booking__dialog__add-service mt-4">
                                        <div class="annotation d-flex align-center">
                                            <span class="mr-3 text-regular">Добавить услугу</span>
                                            <span class="icons closesearch turn filter-gray"></span>
                                        </div>
                                    </div>
                                    <div class="booking__dialog__item_row">
                                        <v-checkbox
                                                v-if="Object.keys(chooseServices).length === 0"
                                                :input-value="false"
                                                class="checkbox"
                                                color="black"
                                                :ripple="false"
                                                off-icon="icons-checkbox-off"
                                                on-icon='icons-checkbox'
                                                readonly
                                                v-model="serviceCheckbox"
                                                @click="toggleServicesDialog(true)"
                                        >
                                            <template v-slot:label>
                                                <span class="checkbox__label text-color-main">Записаться без услуги</span>
                                            </template>
                                        </v-checkbox>
                                    </div>
                                </div>
                            </div>

                            <div class="v-card-container last" id="booking-form">
                                <!-- inputs -->
                                <div class="booking__dialog__item">
                                    <v-form
                                            ref="bookingForm"
                                            id="booking-inputs"
                                            class="">
                                        <div
                                                v-if="bookingBlocks.short"
                                                class="booking__dialog__item">
                                            <span class="annotation">Оператор колл-центра перезвонит Вам в течение 15 минут для уточнения деталей и подтверждения записи на прием. </span>
                                        </div>
                                        <div class="booking__dialog__item">
                                            <v-text-field
                                                    autofocus
                                                    class="input full-width"
                                                    :class="{'text-color-main': isFilledFio}"
                                                    ref="fio"
                                                    validate-on-blur
                                                    v-mask="'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC'"
                                                    :rules="[
                            rules.fio, rules.fioLength
                        ]"
                                                    @keydown="blockCharacters"
                                                    @paste="blockPaste"
                                                    @input="onFioChange($event)"
                                                    :error="fioError"
                                                    outlined
                                                    label="Ваше имя и фамилия"
                                                    placeholder="Введите имя и фамилию"
                                                    hide-details="auto"
                                                    v-model="fio"
                                            >
                                                <template v-slot:label>
                                                    <span class="v-label theme--light ">Ваше имя и фамилия</span>
                                                </template>


                                            </v-text-field>
                                        </div>
                                        <div class="booking__dialog__item">
                                            <v-text-field
                                                    class="input full-width"
                                                    :class="{'text-color-main': isFilledPhone}"
                                                    label="Номер телефона"
                                                    ref="phone"
                                                    v-mask="'+# (###) ###-##-##'"
                                                    :error="phoneError"
                                                    :rules="[
                      rules.phoneContent
                    ]"
                                                    validate-on-blur
                                                    @input="onPhoneChange($event)"
                                                    outlined
                                                    hide-details="auto"
                                                    v-model="phone"
                                                    @blur="onPhoneComplete"
                                            >
                                                <template v-slot:label>
                                                    <span class="v-label theme--light ">Номер телефона</span>
                                                </template>
                                            </v-text-field>
                                        </div>



                                    </v-form>
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
                                        <!--                <ec-button-->
                                        <!--                  large-->
                                        <!--                  class="primary"-->
                                        <!--                  @click="openCalendarWithSlots"-->
                                        <!--                >Выбрать другое время-->
                                        <!--                </ec-button>-->
                                    </div>
                                    <!--              <div-->
                                    <!--                v-show="!validateClinic"-->
                                    <!--                class="booking__dialog__card_error">-->
                                    <!--                <div class="v-messages theme&#45;&#45;light error&#45;&#45;text">-->
                                    <!--                  <div class="v-messages__message">Выберите клинику</div>-->
                                    <!--                </div>-->
                                    <!--              </div>-->
                                </div>
                                <!-- choose clinic -->
                                <div
                                        v-if="bookingBlocks.chooseClinic"
                                        class="booking__dialog__item pointer">
                                    <div
                                            @click="openCalendarWithSlots"
                                            :class="{'error-border' : !validateClinic}"
                                            class="booking__dialog__card with-icon" style="padding-bottom: 7px; padding-top: 7px">
                                        <div>
                                            <div class="booking__dialog__label">
                                                Клиника
                                            </div>

                                            <div v-if="Object.keys(chosenClinicNow).length !== 0">
                                                <span v-if="chosenClinicNow.id !== 42" style="top: 0" :class="'metro-label m'+chosenClinicNow.node_color"></span>
                                                <span >{{ chosenClinicNow.node_address }}</span>
                                                <span v-if="chosenClinicNow.way !== null" class="icons guy"></span>
                                                <span v-if="chosenClinicNow.way !== null" class="text-secondary text-medium">{{chosenClinicNow.way}} м</span>
                                                <span v-if="chosenClinicNow.way === null && chosenClinicNow.way_time" class="text-secondary text-medium text-no-wrap"><span class="icons guy"></span> {{chosenClinicNow.way_time}}</span>


                                                <v-dialog
                                                        class="dialog"
                                                        v-model="mapDialog"
                                                        scrollable
                                                        :fullscreen="fullscreen"
                                                        width="600px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <div>
                                                            <div class="">
                                                                {{ chosenClinicNow.full_name }}
                                                                <a
                                                                        style="display: inline"
                                                                        class="slots__clinic-changer_clinic-info_link"
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        @click.prevent="map()"
                                                                        href="">

                                  <span
                                          v-show="chosenClinicNow.address"
                                          class="slots__clinic-changer_clinic-info_addr text-no-wrap"><span class="icons map"></span>{{ chosenClinicNow.address }}</span>

                                                                </a>
                                                            </div>


                                                        </div>

                                                    </template>
                                                    <v-card
                                                            class=" vcard-padding"
                                                            :class="{'rounded-xl' : !fullscreen}"
                                                    >
                                                        <div class="modal-card-title">
                                                            <span>На карте</span> <span
                                                                class="icons close modal-card-title_close"
                                                                @click="mapDialog = false"
                                                        ></span>
                                                        </div>

                                                        <v-card-text v-html="renderMap" class="scroll v-card-text">
                                                        </v-card-text>
                                                        <div class="grid">
                                                            <button @click="mapDialog = false" type="button" class="button primary small search justify-self-end">Закрыть</button>
                                                        </div>
                                                    </v-card>
                                                </v-dialog>
                                            </div>
                                            <div v-else class="">
                                                <span class="booking__dialog__card_input-text">Выбрать клинику</span>
                                            </div>
                                        </div>

                                        <span class="icons pen"></span>
                                    </div>

                                </div>

                            </div>
                            <div class="v-card-container button-container padding-c">
                                <div class="booking__dialog__error_wrap"
                                     v-if="errorText"
                                >
                                    <div
                                            class="error--text booking__dialog__error"
                                            v-html="errorText"
                                    >
                                    </div>
                                </div>
                                <!--                         <YandexCaptcha ref="yandexCaptcha" v-model="captchaToken" :captchaServerKey="captchaServerKey" :invisible="true"/>//todo #captha_enable -->
                                <ec-button
                                        @click="runCheck"
                                        large
                                        :loading="loading"
                                        :disabled="loading"
                                        class="primary full-width shadow-button services-button-container"
                                >
                  <span v-show="!Object.keys(chooseServices).length">
                    <span>Записаться</span>
                    <span
                            v-show="bookingBlocks.services"
                            style="font-size: 12px; color: #B6C8F3; display: block">без выбора услуги</span>
                  </span>

                                    <div v-show="Object.keys(chooseServices).length" class="services-button">
                                        <div class="d-flex align-center" style="width: 95%">
                                            <div class="d-flex align-center margin-right-6">
                                                <span class="icons cart margin-right-2"></span>
                                                <span>{{Object.keys(chooseServices).length}}</span>
                                            </div>
                                            <div class="services-cart">
                                                <div class="text-left">
                                                    <span class="margin-right-2">Записаться</span>
                                                    <span class="text-blue">
                      <span>{{totalPrice}}₽</span>
                    </span>
                                                </div>
                                                <div class="services-cart__list-of-services text-small text-left mt-1">
                                                    {{servicesNames}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex align-center">
                                            <span class="icons arrow-white"></span>
                                        </div>
                                    </div>

                                </ec-button>


                                <div class="mt-4 booking__annotation annotation">Нажимая «Записаться», я даю <a target="_blank" href="https://eastclinic.ru/assets-new/docs/soglasie-na-obrabotku.pdf">согласие на обработку персональных данных</a>
                                    и принимаю <a target="_blank" href="https://yandex.ru/legal/smartcaptcha_notice/">политику обработки данных</a>.</div>
                            </div>
                        </div>

                        <div
                                v-show="chooseClinicDialog"
                                class="v-card-container last">
                            <div
                                    @click="chooseClinicDialog = !chooseClinicDialog"
                                    class="booking__back-arrow-container">
            <span
                    class="icons back-arrow mr-1"

            ></span><span class="annotation">Назад</span>
                            </div>

                            <div class="slots" style="margin: 0 auto">
                                <div class="slots__header text-secondary">
                                    Врач принимает
                                    <span v-if="doctorClinics.length > 1">в нескольких клиниках</span>
                                    <span v-else>в клинике:</span>

                                </div>
                                <ClinicSelection
                                        v-if="bookingBlocks.chooseClinic"
                                        :clinics="doctorClinics"
                                        :chosenClinic="chosenClinic"
                                        @clinicSelected="clinicSelected"
                                />
                                <div class="slots__header text-secondary">
                                    Записаться онлайн
                                </div>

                                <ScheduleAllClinics
                                        :clinics="doctorClinics"
                                        :clinic="chosenClinic"
                                        :doctor="doctor"
                                        :countDaysInBox="5"
                                        :countDaysBoxes="6"
                                        @clinicSelected="clinicSelected"
                                        @closeChooseClinicDialog="openCalendarWithSlots"
                                />


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