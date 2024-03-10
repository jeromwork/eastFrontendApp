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
            <input type="text" name="fio" id="" @input="bookingService.Patient.setFio($event.target.value)">

<!--            <v-text-field-->
<!--                    autofocus-->
<!--                    class="input full-width"-->
<!--                    :class="{'text-color-main': isFilledFio}"-->
<!--                    ref="fio"-->
<!--                    validate-on-blur-->
<!--                    v-mask="'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC'"-->
<!--                    :rules="[-->
<!--                            rules.fio, rules.fioLength-->
<!--                        ]"-->
<!--                    @keydown="blockCharacters"-->
<!--                    @paste="blockPaste"-->
<!--                    @input="onFioChange($event)"-->
<!--                    :error="fioError"-->
<!--                    outlined-->
<!--                    label="Ваше имя и фамилия"-->
<!--                    placeholder="Введите имя и фамилию"-->
<!--                    hide-details="auto"-->
<!--                    v-model="fio"-->
<!--            >-->
<!--                <template v-slot:label>-->
<!--                    <span class="v-label theme&#45;&#45;light ">Ваше имя и фамилия</span>-->
<!--                </template>-->


<!--            </v-text-field>-->
        </div>
        <div class="booking__dialog__item">
<!--            <v-text-field-->
<!--                    class="input full-width"-->
<!--                    :class="{'text-color-main': isFilledPhone}"-->
<!--                    label="Номер телефона"-->
<!--                    ref="phone"-->
<!--                    v-mask="'+# (###) ###-##-##'"-->
<!--                    :error="phoneError"-->
<!--                    :rules="[-->
<!--                      rules.phoneContent-->
<!--                    ]"-->
<!--                    validate-on-blur-->
<!--                    @input="onPhoneChange($event)"-->
<!--                    outlined-->
<!--                    hide-details="auto"-->
<!--                    v-model="phone"-->
<!--                    @blur="onPhoneComplete"-->
<!--            >-->
<!--                <template v-slot:label>-->
<!--                    <span class="v-label theme&#45;&#45;light ">Номер телефона</span>-->
<!--                </template>-->
<!--            </v-text-field>-->
        </div>



    </form>
</template>

<style scoped>

</style>