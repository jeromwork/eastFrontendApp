<script setup lang="ts">

import {inject, ref} from "vue";
import {bookingServiceSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";

const bookingService = inject(bookingServiceSymbol) as BookingService
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');

const fio = ref('')




</script>

<template>
    {{bookingService.Patient.fio}}
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