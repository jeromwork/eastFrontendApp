<script setup lang="ts">

import {inject, ref, nextTick} from "vue";
import {
    BookingServiceSymbol,
    BookingStateSymbol, ClinicsStateSymbol,
    DoctorCartStateSymbol,
    DoctorInfoSymbol, ScheduleStateSymbol
} from "../../../composables/useSymbols";

import { PageInfoService } from "../../../EastclinicVueApi";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import useIsMobile from "../../../composables/useIsMobile";
import type BookingState from "../../../state/BookingState";

const bookingState:BookingState = inject( BookingStateSymbol ) as BookingState
if(!bookingState) throw new Error('not have bookingState by BookingState');
const fullscreen = useIsMobile();

const closeBookingDialog = () => {
    bookingState.showModalBooking = false;
    bookingState.showLeaveMessage = false;
}

const backToBooking = () => {
    bookingState.showLeaveMessage = false;
    bookingState.showModalBooking = true;
}

</script>

<template>

    <div class="booking__dialog__leave">
        <div class="booking__dialog__leave_container">
            <div class="booking__dialog__leave_head text-semibold">
                Вы действительно хотите прервать запись?
            </div>
            <div class="booking__dialog__leave_desc">
                Если у вас возникли вопросы, позвоните нам по телефону:<br>
                <a class="booking__dialog__leave_phone" :href="PageInfoService.getLinkPhone()">{{PageInfoService.getFormattedMainPhone()}}</a>
            </div>
            <div class="">
                <EcButton
                    large
                    class="button secondary-l text-semibold full-width mb-4"
                    @click="closeBookingDialog()"
                >Прервать запись
                </EcButton>


                <EcButton
                    large
                    class="button primary text-semibold full-width"
                    @click="backToBooking()"
                >Вернуться к записи
                </EcButton>
            </div>
        </div>
        <span
            class="icons close modal-card-title_close booking__dialog__leave_close"
            style="align-self: flex-start"
            @click="closeBookingDialog"
        ></span>
    </div>



</template>

<style scoped>

</style>