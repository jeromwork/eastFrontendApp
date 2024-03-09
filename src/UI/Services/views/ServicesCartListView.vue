<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import type { ServiceData, ServiceCartInterface } from "../../../EastclinicVueApi";
import {servicesInCartSymbol} from "../../../composables/useSymbols";
import {serviceAddToCart, serviceRemoveFromCart} from '../../../composables/useServiceCart'

const props = defineProps<{
    services:ServiceCartInterface,
}>()


const servicesInCart  =  inject(servicesInCartSymbol);




</script>

<template>
    <div
        v-for="serviceInCart in services"
        class="doctor-info__services__cart-list">
        <div class="mb-2 text-medium">
            {{serviceInCart.service.name}}
            <span v-if="serviceInCart.service.option !== ''" class="text-secondary">({{serviceInCart.service.option}})</span>
        </div>
        <div class="doctor-info__services list cart">
            <div class="doctor-info__services_title serv-title">
                <div class="services__count-switcher">
                <span
                    @click="serviceRemoveFromCart(serviceInCart.service as ServiceData, servicesInCart as ServiceCartInterface)"
                    class="icons minus"></span>
                    <span class="text-regular">{{serviceInCart.count}}</span>
                    <span
                        @click="serviceAddToCart(serviceInCart.service as ServiceData, servicesInCart as ServiceCartInterface)"
                        class="icons plus"></span>
                </div>

            </div>
            <div
                v-if="serviceInCart.service.custom_price && serviceInCart.service.custom_price < serviceInCart.service.price"
                class="doctor-info__services_price serv-price">
                <div class="doctor-info__services_price_current text-semibold">{{serviceInCart.service.custom_price * serviceInCart.count}}₽</div>
                <div class="doctor-info__services_price_discount_price">
                    <span class="doctor-info__services_off_price list">{{serviceInCart.service.price}}₽</span>
                    <span class="doctor-info__services_discount_percent list">
                    -{{ serviceInCart.service.discount}}%
                  </span>
                </div>
            </div>
            <div v-else class="doctor-info__services_price serv-price">
                <div class="doctor-info__services_price_current text-semibold text-regular">{{(serviceInCart.service.price > serviceInCart.service.custom_price) ? serviceInCart.service.price * serviceInCart.count : serviceInCart.service.custom_price * serviceInCart.count}}₽</div>
            </div>


        </div>
    </div>


</template>

<style scoped>

</style>