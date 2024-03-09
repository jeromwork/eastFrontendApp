<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import type { ServiceData, ServiceCartInterface } from "../../../EastclinicVueApi";
import {bookingServiceSymbol, servicesInCartSymbol} from "../../../composables/useSymbols";
import {serviceAddToCart, serviceRemoveFromCart} from '../../../composables/useServiceCart'
import {BookingService} from "../../../EastclinicVueApi";

const props = defineProps<{
    services:ServiceCartInterface,
}>()


const bookingService = inject(bookingServiceSymbol) as BookingService
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');



</script>

<template>
    <div
        v-for="good in bookingService.Cart.goods"
        class="doctor-info__services__cart-list">
        <div class="mb-2 text-medium">
            {{good.service.name}}
            <span v-if="good.service.option !== ''" class="text-secondary">({{good.service.option}})</span>
        </div>
        <div class="doctor-info__services list cart">
            <div class="doctor-info__services_title serv-title">
                <div class="services__count-switcher">
                <span
                    @click="bookingService.Cart.remove(good.service)"
                    class="icons minus"></span>
                    <span class="text-regular">{{good.count}}</span>
                    <span
                        @click="bookingService.Cart.add(good.service)"
                        class="icons plus"></span>
                </div>

            </div>
            <div
                v-if="good.service.custom_price && good.service.custom_price < good.service.price"
                class="doctor-info__services_price serv-price">
                <div class="doctor-info__services_price_current text-semibold">{{good.service.custom_price * good.count}}₽</div>
                <div class="doctor-info__services_price_discount_price">
                    <span class="doctor-info__services_off_price list">{{good.service.price}}₽</span>
                    <span class="doctor-info__services_discount_percent list">
                    -{{ good.service.discount}}%
                  </span>
                </div>
            </div>
            <div v-else class="doctor-info__services_price serv-price">
                <div class="doctor-info__services_price_current text-semibold text-regular">{{(good.service.price > good.service.custom_price) ? good.service.price * good.count : good.service.custom_price * good.count}}₽</div>
            </div>


        </div>
    </div>


</template>

<style scoped>

</style>