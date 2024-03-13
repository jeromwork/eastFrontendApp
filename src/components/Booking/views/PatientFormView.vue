<script setup lang="ts">

import {inject, ref} from "vue";
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService;



</script>

<template>

    <form   ref="bookingForm"
            id="booking-inputs"
            class="">

        <div class="booking__dialog__item">
<!--            может быть вынести input в отдельный компонент-->
            <input type="text" name="fio" @input="bookingService.Patient.setFio($event.target.value)"
                   placeholder="Введите имя и фамилию"
            >
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.fioError}}</span>



        </div>
        <div class="booking__dialog__item">
            <input type="text" name="fio" @input="bookingService.Patient.setPhone($event.target.value)"
              placeholder="Номер телефона"
            >
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.phoneError}}</span>
        </div>



    </form>
</template>

<style scoped>

</style>