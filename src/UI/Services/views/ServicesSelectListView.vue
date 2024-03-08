<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import {EventServiceAddToCart} from '../../../composables/useEvents'
import {servicesSelectedSymbol} from "../../../composables/useSymbols";
import type {ServiceCartInterface} from "../../../EastclinicVueApi";

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean

const addToCartOn  =  inject(EventServiceAddToCart);
const servicesSelected  =  inject(servicesSelectedSymbol);



</script>

<template>
    <SelectList :options="services" :selected="servicesSelected" @update:selected="addToCartOn(option)" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}" @click=""></ServiceSelectOptionView>
    </SelectList>
</template>

<style scoped>

</style>