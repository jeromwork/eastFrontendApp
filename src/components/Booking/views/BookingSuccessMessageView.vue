<script setup lang="ts">

import {inject, ref, nextTick} from "vue";
import {
    BookingServiceSymbol,
    BookingStateSymbol, ClinicsStateSymbol,
    DoctorCartStateSymbol,
    DoctorInfoSymbol, ScheduleStateSymbol
} from "../../../composables/useSymbols";
import { BookingService } from "../../../EastclinicVueApi";
import type { DoctorInterface} from "../../../EastclinicVueApi";
import DoctorCardState from "../../../state/DoctorCardState";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import type BookingFormViewProps from "../imterfaces/BookingFormViewProprs";
import type {ClinicInterface} from "../../../EastclinicVueApi";
import useIsMobile from "../../../composables/useIsMobile";
import type IBookingState from "../../../interfaces/IBookingState";
import type BookingState from "../../../state/BookingState";
import type IScheduleState from "../../../interfaces/IScheduleState";
import type IClinicsState from "../../../interfaces/IClinicsState";

const bookingState:BookingState = inject( BookingStateSymbol ) as BookingState
if(!bookingState) throw new Error('not have bookingState by BookingState');
const bookingBlocks = bookingState.bookingFormViewProps as BookingFormViewProps;
const scheduleState:IScheduleState|null = inject( ScheduleStateSymbol, null);
const doctor:DoctorInterface|null = inject( DoctorInfoSymbol, null );
const clinicsState:IClinicsState|null = inject( ClinicsStateSymbol, null )
const chosenClinicNow = clinicsState?.selectedClinic as ClinicInterface;
const fullscreen = useIsMobile();

const bookingSuccessClose = () => {

}

</script>

<template>
    <div  class=" vcard-padding booking-dialog booking__dialog__success"
            :class="{'rounded-xl' : !fullscreen}"
    >
        <div class="booking__dialog__success_header">
            <div class="modal-card-title">
                <div class="booking__dialog__success_header_item">
                    <svg class="booking__dialog__success_header_item_svg" xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                        <path d="M90 45C90 69.8528 69.8528 90 45 90C20.1472 90 0 69.8528 0 45C0 20.1472 20.1472 0 45 0C69.8528 0 90 20.1472 90 45Z" fill="white" fill-opacity="0.2"/>
                        <path d="M79.9138 44.6121C79.9138 64.1087 64.1087 79.9138 44.6121 79.9138C25.1155 79.9138 9.31034 64.1087 9.31034 44.6121C9.31034 25.1155 25.1155 9.31034 44.6121 9.31034C64.1087 9.31034 79.9138 25.1155 79.9138 44.6121Z" fill="white" fill-opacity="0.5"/>
                        <path d="M69.0517 45C69.0517 58.2834 58.2834 69.0517 45 69.0517C31.7166 69.0517 20.9483 58.2834 20.9483 45C20.9483 31.7166 31.7166 20.9483 45 20.9483C58.2834 20.9483 69.0517 31.7166 69.0517 45Z" fill="#25CA56"/>
                        <path d="M45 18.4914C30.3672 18.4914 18.4914 30.3672 18.4914 45C18.4914 59.6328 30.3672 71.5086 45 71.5086C59.6328 71.5086 71.5086 59.6328 71.5086 45C71.5086 30.3672 59.6328 18.4914 45 18.4914ZM37.8162 56.3722L28.2996 46.8556C27.2657 45.8218 27.2657 44.1517 28.2996 43.1179C29.3334 42.0841 31.0034 42.0841 32.0373 43.1179L39.6983 50.7524L57.9362 32.5144C58.97 31.4806 60.6401 31.4806 61.6739 32.5144C62.7078 33.5483 62.7078 35.2183 61.6739 36.2522L41.5539 56.3722C40.5466 57.406 38.85 57.406 37.8162 56.3722Z" fill="white"/>
                    </svg>
                    <div class="booking__dialog__success_header_item_side">
                        <div class="booking__dialog__success_header_item_head">Вы успешно записаны<span v-if="doctor"> к врачу</span>!</div>
                    </div>
                </div>

                <svg
                        class="modal-card-title_close align-self-start pointer"
                        @click="bookingSuccessClose()"
                        xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13.3007 0.710703C12.9107 0.320703 12.2807 0.320703 11.8907 0.710703L7.0007 5.5907L2.1107 0.700703C1.7207 0.310703 1.0907 0.310703 0.700703 0.700703C0.310703 1.0907 0.310703 1.7207 0.700703 2.1107L5.5907 7.0007L0.700703 11.8907C0.310703 12.2807 0.310703 12.9107 0.700703 13.3007C1.0907 13.6907 1.7207 13.6907 2.1107 13.3007L7.0007 8.4107L11.8907 13.3007C12.2807 13.6907 12.9107 13.6907 13.3007 13.3007C13.6907 12.9107 13.6907 12.2807 13.3007 11.8907L8.4107 7.0007L13.3007 2.1107C13.6807 1.7307 13.6807 1.0907 13.3007 0.710703Z" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="scroll v-card-text">
            <div class="booking__dialog__success_message">
                <div v-if="bookingBlocks?.showDoctorBlock && doctor" class="booking__dialog__doctor-card  mb-6">
                    <div class="booking__dialog__doctor-card_photo">
                        <img :src="doctor?.photo120x120" :alt="doctor?.fullname">
                    </div>
                    <div class="booking__dialog__doctor-card_info">
                        <div class="text-semibold">{{doctor?.fullname}}</div>
                        <div class="booking__dialog__doctor-card_info_desc">{{doctor?.specials}}</div>
                    </div>
                </div>
                <div v-if="!bookingBlocks?.showShortFormTitle"><span class="text-semibold">{{bookingState.Patient.fio}}</span>, ждем вас:</div>

                <div  v-if="bookingBlocks?.showShortFormTitle">
                    <span class="text-semibold">{{bookingState.Patient.fio}}</span>, оператор колл-центра перезвонит Вам в течение 15 минут для уточнения деталей и подтверждения записи на прием.
                </div>
                <div
                        v-if="bookingBlocks?.showScheduleBlock"
                        class="booking__dialog__success_datatable">
                    <div class="booking__dialog__success_datatable_row" v-if="scheduleState?.selectedSlot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="20" fill="#F2F3F6"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9C15.5523 9 16 9.44772 16 10V11H24V10C24 9.44772 24.4477 9 25 9C25.5523 9 26 9.44772 26 10V11H26.6667C28.5076 11 30 12.511 30 14.375V26.625C30 28.489 28.5076 30 26.6667 30H13.3333C11.4924 30 10 28.489 10 26.625V14.375C10 12.511 11.4924 11 13.3333 11H14V10C14 9.44772 14.4477 9 15 9ZM13 16.0833C12.4477 16.0833 12 16.531 12 17.0833V26.9167C12 27.515 12.5117 28 13.1429 28H26.8571C27.4883 28 28 27.515 28 26.9167V17.0833C28 16.531 27.5523 16.0833 27 16.0833H13ZM15 19V21H17V19H15ZM19 19H21V21H19V19ZM23 19V21H25V19H23ZM25 23V25H23V23H25ZM21 23H19V25H21V23ZM17 23V25H15V23H17Z" fill="#171E36"/>
                        </svg>
                        <span>{{useDateFormat(scheduleState?.selectedSlot * 1000, 'DD \n ddd', { locales: 'ru' }).value}}</span>
                    </div>
                    <div class="booking__dialog__success_datatable_row align-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="20" fill="#F2F3F6"/>
                            <path d="M21.0536 28.9473C21.0536 29.5287 20.5814 30 19.9989 30C19.4164 30 18.9442 29.5287 18.9442 28.9473C18.9442 28.3658 19.4164 27.8945 19.9989 27.8945C20.5814 27.8945 21.0536 28.3658 21.0536 28.9473Z" fill="#171E36"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 17.3692C12.5 13.2993 15.8582 10 20 10C24.1418 10 27.5 13.3003 27.5 17.3692C27.5 20.2695 25.7967 22.7771 23.3192 23.9804C21.7002 24.8068 20.752 25.6701 20.4208 26.5702C20.3607 26.7354 20.1761 26.846 20 26.846C19.8239 26.846 19.6372 26.7354 19.5771 26.5702C19.2459 25.6701 18.3009 24.8068 16.6808 23.9804C14.2044 22.7761 12.5 20.2685 12.5 17.3692Z" fill="#171E36"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0082 21.5781C17.6716 21.5781 15.7801 19.684 15.7801 17.3671C15.7801 15.0501 17.6716 13.1561 19.9897 13.1561C22.3077 13.1561 24.2178 15.0501 24.2178 17.3671C24.2178 19.684 22.3262 21.5781 20.0082 21.5781ZM18.9442 16.3144C18.7959 16.204 18.5432 16.1116 18.3392 16.3691C18.1352 16.6265 18.0982 17.0361 18.2465 17.1464C18.3949 17.2568 18.7403 17.0982 18.9442 16.8407C19.1482 16.5833 19.0926 16.4247 18.9442 16.3144ZM22.6129 15.1812C22.6228 15.1225 22.5576 15.1101 22.5344 15.165C21.6986 17.1469 18.7531 18.0525 18.1167 17.4039C17.64 16.9168 18.1085 16.0393 18.3389 15.6751C18.3582 15.6447 18.3198 15.6092 18.2923 15.6325C17.2981 16.4754 17.4571 17.8303 17.616 18.2681C17.8571 18.9301 18.2465 19.2059 18.3021 19.2611C19.089 19.9593 19.9684 19.9441 20.3665 19.8907C20.4215 19.8833 20.4238 19.8066 20.3721 19.7866C19.7364 19.5411 18.7645 18.7245 20.2864 17.9371C22.094 16.993 22.5155 15.7537 22.6129 15.1812Z" fill="white"/>
                        </svg>
                        <div class="booking__dialog__success_datatable_row_item-right">
                            <div class="pb-2">
                                <span v-show="chosenClinicNow.id !== 42" :class="'metro-label m'+ chosenClinicNow.node_color"></span>
                                {{chosenClinicNow.node_address}}
                                <span v-if="chosenClinicNow.way !== null" class="icons guy"></span>
                                <span v-if="chosenClinicNow.way !== null" class="text-secondary text-medium">{{chosenClinicNow.way}} м</span>
                                <span v-if="chosenClinicNow.way === null && chosenClinicNow.way_time" class="text-secondary text-medium text-no-wrap"><span class="icons guy"></span> {{chosenClinicNow.way_time}}</span>
                            </div>
                            <div v-show="chosenClinicNow.full_name" class="pb-1">
                                <span class="no-wrap">{{chosenClinicNow.full_name}}</span>
                            </div>
<!--                            <div-->
<!--                                    class="dialog"-->
<!--                                    v-model="mapDialog"-->
<!--                                    scrollable-->
<!--                                    :fullscreen="fullscreen"-->
<!--                                    width="600px"-->
<!--                            >-->
<!--                                <template v-slot:activator="{ on, attrs }">-->
<!--                                    <a-->
<!--                                            @click.prevent="map()"-->
<!--                                            class="main-color"-->
<!--                                            href="">-->
<!--                                        <span>{{chosenClinicNow.address}}</span>-->
<!--                                    </a>-->
<!--                                </template>-->
<!--                                <v-card-->
<!--                                        class=""-->
<!--                                        :class="{'rounded-xl' : !fullscreen}"-->
<!--                                >-->

<!--                                    <v-card-text v-html="renderMap" class="scroll v-card-text">-->
<!--                                    </v-card-text>-->
<!--                                    <div class="grid map-dialog__button">-->
<!--                                        <button @click="mapDialog = false" type="button" class="button primary small search justify-self-end">Закрыть</button>-->
<!--                                    </div>-->
<!--                                </v-card>-->
<!--                            </div>-->
                        </div>

                    </div>
                </div>
                <EcButton
                        large
                        class="primary full-width mt-6"
                        @click="bookingState.toogleBookingSuccessMessage(false)"
                >Отлично
                </EcButton>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>