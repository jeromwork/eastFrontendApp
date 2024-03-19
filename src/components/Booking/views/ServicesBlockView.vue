<script setup lang="ts">

import {inject, ref} from "vue";
import {BookingServiceSymbol, DoctorCartStateSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import ServicesCartListView from "../../../UI/Services/views/ServicesCartListView.vue";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService;




</script>

<template>
    <div class="v-card-container middle divider">
        <div class="booking__dialog__small-header mb-3">
            <span class="text-semibold text-regular">Услуга</span>
            <span v-show="bookingService.Cart.count" class="annotation">{{bookingService.Cart.count}}</span>
            <span v-show="bookingService.Cart.selectedServicesList" class="annotation float-right pointer" @click="bookingService.Cart.clear()" >Удалить всё
                                        <span class="icons trash"></span>
                                    </span>
        </div>
        <div v-if="!bookingService.Cart.count" class="services-full-width">
            <div class="doctor-info__services_wrap serv">
                <div role="button" aria-haspopup="true" aria-expanded="false" class="doctor-info__services" @click="doctorCardState.toogleModalServices(true)">
                    <div class="doctor-info__services_title serv-title">Выберите услугу</div>
                    <div class="doctor-info__services_price serv-price"></div>
                    <div class="doctor-info__services_more serv-more">
                        <span class="icons down"></span>
                    </div>
                </div>
            </div>

        </div>
        <ServicesCartListView />



        <div v-if="!bookingService.Cart.count"
             @click.prevent="doctorCardState.toogleModalServices(true)"
             class="booking__dialog__item_row">
            <input type="checkbox" checked="checked"/>
            <span class="checkbox__label text-color-main">Записаться без услуги</span>
        </div>

    </div>
</template>

<style scoped>

</style>