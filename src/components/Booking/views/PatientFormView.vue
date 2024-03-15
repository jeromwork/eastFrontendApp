<script setup lang="ts">

import {inject, ref, nextTick} from "vue";
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService as BookingService;

// const phone = computed(() => bookingService.Patient.phone)

//its inpassible!! not working :value = bookingService.Patient.phone


const setFio = (e) => {
    bookingService.Patient.setFio(e.target.value)
    e.target.value = bookingService.Patient.fio
};

const setPhone = (e) => {
    bookingService.Patient.setPhone(e.target.value)
    e.target.value = bookingService.Patient.phone
};



</script>

<template>

    <form   ref="bookingForm"
            id="booking-inputs"
            class="">

        <div class="booking__dialog__item">
<!--            может быть вынести input в отдельный компонент-->
            <input type="text"
                   id="fio"
                   name="fio"
                   @input="setFio"
                   :value="bookingService.Patient.fio"
                   @blur="bookingService.Patient.checkFioResume()"
                   placeholder="Введите имя и фамилию"
            >
            <span v-if="bookingService.Patient.fioError">{{bookingService.Patient.fioError}}</span>



        </div>
        <div class="booking__dialog__item">
            <input type="tel"
                   id="phone"
                   name="phone"
                   @input="setPhone"
                   @blur="bookingService.Patient.checkPhoneResume()"
                   :value="bookingService.Patient.phone"
                   :class="{'text-color-main': bookingService.Patient.isFilledPhone}"
              placeholder="Номер телефона"
            >
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.phoneError}}</span>
        </div>



    </form>
</template>

<style scoped>

</style>