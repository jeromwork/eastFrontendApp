<script setup lang="ts">
import type ServiceData from "../../EastclinicVueApi/interfaces/ServiceData";
import {ref, defineProps} from 'vue'
import {usePriceFormat} from "../../composables/usePriceFormat";


const props = defineProps<{service: ServiceData}>()

</script>

<template>
    <div class="doctor-card-2__price">
        <div class="annotation font-12">Приём в клинике</div>
        <div class="doctor-card-2__price__title">
            <span>{{service.name}} </span>
            <span class="secondary-text"> {{service.option}}</span>
        </div>
        <div
            v-if="!service.discount"
            class="doctor-card-2__price__item"
        >
            <span class="doctor-card-2__price__text">{{service.price}} р.</span>
        </div>
        <div
            v-else
            class="doctor-card-2__price__item"
        >

            <span class="doctor-card-2__price__text__old-price">{{usePriceFormat(service.price)}} р.</span>
            <span class="doctor-card-2__price__text discount"> {{usePriceFormat(service.custom_price)}} р.</span>
            <span class="doctor-card-2__price__text__discount-text">-{{service.discount}}% скидка на первый приём</span>
        </div>
    </div>
</template>

<style lang="scss">
@import "~/public/scss/parts/_colors";
@import "~/public/scss/parts/_mixins";
.doctor-card-2__price {
    &__item {
        display: flex;
        align-items: center;
        @media (max-width: 404px) {
            flex-wrap: wrap;
        }
        & span:not(:last-child) {
            margin-right: 5px;
        }
    }
    &__text {
        &.discount {
            font-size: inherit;
            color: $discount-color;
            white-space: nowrap;
        }
        &__old-price {
            color: $text-secondary-color;
            text-decoration: line-through;
            white-space: nowrap;
        }
        &__discount-text {
            display: inline-flex;
            line-height: inherit;
            align-items: center;
            background-color: $discount-back-color;
            color: $discount-color;
            font-size: 11px;
            min-height: 13px;
            padding: 4px 8px;
            border-radius: 7px;
            white-space: nowrap;
        }
    }
}
</style>
