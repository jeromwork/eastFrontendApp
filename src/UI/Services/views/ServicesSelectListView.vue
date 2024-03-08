<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import {EventServiceAddToCart} from '../../../composables/useEvents'
import {servicesInCartSymbol} from "../../../composables/useSymbols";
import type {ServiceCartInterface} from "../../../EastclinicVueApi";

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean

const addToCartOn  =  inject(EventServiceAddToCart);
const servicesInCart = inject(servicesInCartSymbol);
const servicesSelected  =  computed(() => {

    if( !servicesInCart || Object.keys(servicesInCart.value).length === 0 ) return [];
    const services = [];
    for(const s in servicesInCart.value){
        const serviceInCart = servicesInCart.value[s] as ServiceCartInterface
        services.push(serviceInCart.service)
    }

    return services;

})


</script>

<template>
    <SelectList :options="services" :modelValue="servicesSelected" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}" @click="addToCartOn(option)"></ServiceSelectOptionView>
    </SelectList>
</template>

<style scoped>

</style>