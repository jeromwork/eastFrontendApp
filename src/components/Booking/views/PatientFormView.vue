<script setup lang="ts">

import {inject, ref} from "vue";
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService as BookingService;

const formattedPhone = ref('+7 999 999')


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
                   @input="bookingService.Patient.setFio($event.target.value)"
                   placeholder="Введите имя и фамилию"
            >
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.fioError}}</span>



        </div>
        {{bookingService.Patient.phone}}
        <div class="booking__dialog__item">
            <input type="tel"
                   pattern="[0-9]{1}([0-9]{3})-[0-9]{3}-[0-9]{4}"
                   id="phone"
                   name="phone"
                   @keydown.stop="bookingService.Patient.setPhone($event.target.value)"
                   v-model="formattedPhone"
                   :class="{'text-color-main': bookingService.Patient.isFilledPhone}"
              placeholder="Номер телефона"
            >
            <span v-if="bookingService.Patient.phoneError">{{bookingService.Patient.phoneError}}</span>
        </div>



    </form>
</template>

<style scoped>

</style>