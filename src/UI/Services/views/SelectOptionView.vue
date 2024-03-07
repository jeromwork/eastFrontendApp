<script setup lang="ts">
import type ServiceData from "../../../EastclinicVueApi/interfaces/ServiceData";
import {ref, defineProps} from 'vue'


const props = defineProps<{service:ServiceData, selected?:boolean}>()

onMounted(()=>{
})
</script>

<template>
    <div class="doctor-info__services list" :class="(service.favorite) ? 'chosen' : ''">
        <div class="doctor-info__services_title serv-title">{{service.name}}
            <span class="text-secondary text-no-wrap">{{ service.option }}</span>
            <div
                v-if="service.discount && service.custom_price < service.price"
                class="pt-2 text-small text-green">
                Скидка на первичный прием
            </div>
        </div>
        <div
            v-if="service.custom_price && service.custom_price < service.price"
            class="doctor-info__services_price serv-price">

            <div class="doctor-info__services_price_discount_price">
                <span class="doctor-info__services_off_price list">{{usePriceFormat(service.price)}} ₽</span>
                <div class="doctor-info__services_price_current text-semibold d-inline">{{usePriceFormat(service.custom_price)}} ₽</div>
            </div>
            <span class="doctor-info__services_discount_percent list">
                        -{{service.discount}} %
                      </span>

        </div>
        <div v-else class="doctor-info__services_price serv-price">
            <div class="doctor-info__services_price_current text-semibold">{{(service.price > service.custom_price) ? usePriceFormat(service.price) : usePriceFormat(service.custom_price)}}₽</div>
        </div>

        <div
            v-if="(selected)"
            class="doctor-info__services_more serv-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                <path d="M6.00012 10.2003L2.50012 6.70031C2.11012 6.31031 1.49012 6.31031 1.10012 6.70031C0.710117 7.09031 0.710117 7.71031 1.10012 8.10031L5.29012 12.2903C5.68012 12.6803 6.31012 12.6803 6.70012 12.2903L17.3001 1.70031C17.6901 1.31031 17.6901 0.690312 17.3001 0.300312C16.9101 -0.0896875 16.2901 -0.0896875 15.9001 0.300312L6.00012 10.2003Z" fill="#58BA36"/>
            </svg>
        </div>

    </div>

</template>

<style lang="scss">
</style>
