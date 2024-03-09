<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject, provide} from 'vue';
import type {Ref} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData, ServiceCartInterface } from "../../../EastclinicVueApi";
import {servicesInCartSymbol, servicesSelectedSymbol} from "../../../composables/useSymbols";


const props = defineProps({
    services:{type:Array, required:true },
})


const servicesSelected  =  inject(  servicesSelectedSymbol  );
if(!servicesSelected?.value) throw new Error('not have services cart by servicesSelectedSymbol');

const servicesInCart = inject(  servicesInCartSymbol );
if(!servicesInCart?.value) throw new Error('not have services cart by servicesInCartSymbol');


</script>

<template>
    <SelectList :options="services" v-model="servicesSelected" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}">
        </ServiceSelectOptionView>
    </SelectList>

</template>

<style scoped>

</style>