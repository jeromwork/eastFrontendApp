<script setup lang="ts">

import {inject, ref} from "vue";
import { Patient} from "../../../EastclinicVueApi";

const props = defineProps<{ statePatient : Patient }>()


//its inpossible!! not working :value = bookingService.Patient.phone

const dsd = ref('')
const setFio = (e) => {
    props.statePatient.setFio(e.target.value)
    e.target.value = props.statePatient.fio
};





</script>

<template>

    <form   ref="bookingForm"
            id="booking-inputs"
            class="">

        <div class="booking__dialog__item" >
            <div class="booking__dialog__card" :class="{'error-border':!!(statePatient.fioError)}">
            <!-- may be move input to special component -->
                <input type="text"
                       id="fio"
                       name="fio"
                       @input="setFio"
                       :value="statePatient.fio"
                       @blur="statePatient.checkFioResume()"
                       placeholder="Введите имя и фамилию"
                >
            </div>
            <span v-if="statePatient.fioError">{{statePatient.fioError}}</span>
        </div>
        <div class="booking__dialog__item" >
            <div class="booking__dialog__card" :class="{'error-border':!!(statePatient.phoneError)}">
                <input type="tel"
                       id="phone"
                       name="phone"
                       v-mask="'+# (###) ###-##-##'"
                       @input=" statePatient.setPhone($event.target.value)"
                       @blur="statePatient.checkPhoneResume()"
                       v-model="statePatient.phone"
                       :class="{'text-color-main': statePatient.isFilledPhone}"
                       placeholder="Номер телефона"
                >
            </div>
            <span v-if="statePatient.phoneError">{{statePatient.phoneError}}</span>
        </div>



    </form>
</template>

<style scoped>

</style>