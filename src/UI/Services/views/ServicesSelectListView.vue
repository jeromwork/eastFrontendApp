<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import {EventServiceAddToCart} from '../../../composables/useEvents'
import {servicesSelectedSymbol} from "../../../composables/useSymbols";

const props = defineProps({
    services:{type:Array, required:true },
})


const addToCartOn  =  inject(EventServiceAddToCart);
const servicesSelected  =  inject(servicesSelectedSymbol);


</script>

<template>
    <SelectList :options="services" v-model="servicesSelected" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}" >
            <button v-if="selected" @click.stop="addToCartOn(option)"> sadfwefwefsd</button>
        </ServiceSelectOptionView>
    </SelectList>
</template>

<style scoped>

</style>