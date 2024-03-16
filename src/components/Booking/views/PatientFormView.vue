<script setup lang="ts">

import {inject, ref, nextTick} from "vue";
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import DoctorCardState from "../../../state/DoctorCardState";
import {useDateFormat} from "@vueuse/core/index";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService as BookingService;

// const phone = computed(() => bookingService.Patient.phone)

//its inpassible!! not working :value = bookingService.Patient.phone

const dsd = ref('')
const setFio = (e) => {
    bookingService.Patient.setFio(e.target.value)
    e.target.value = bookingService.Patient.fio
};





</script>

<template>

    <form   ref="bookingForm"
            id="booking-inputs"
            class="">

        <div class="booking__dialog__item" >
            <div class="booking__dialog__card" :class="{'error-border':!!(bookingService.Patient.fioError)}">
            <!-- may be move input to special component -->
                <input type="text"
                       id="fio"
                       name="fio"
                       @input="setFio"
                       :value="bookingService.Patient.fio"
                       @blur="bookingService.Patient.checkFioResume()"
                       placeholder="Введите имя и фамилию"
                >
            </div>
            <span v-if="bookingService.Patient.fioError">{{bookingService.Patient.fioError}}</span>
        </div>
        <div class="booking__dialog__item" >
            <div class="booking__dialog__card" :class="{'error-border':!!(bookingService.Patient.phoneError)}">
                <input type="tel"
                       id="phone"
                       name="phone"
                       v-mask="'+# (###) ###-##-##'"
                       @input=" bookingService.Patient.setPhone($event.target.value)"
                       @blur="bookingService.Patient.checkPhoneResume()"
                       v-model="bookingService.Patient.phone"
                       :class="{'text-color-main': bookingService.Patient.isFilledPhone}"
                       placeholder="Номер телефона"
                >
            </div>
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.phoneError}}</span>
        </div>



    </form>
</template>

<style scoped>

</style>