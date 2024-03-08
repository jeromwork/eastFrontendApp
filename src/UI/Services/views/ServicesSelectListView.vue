<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import {EventServiceAddToCart} from '../../../composables/useEvents'

const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean
const servicesSelected =  defineModel('servicesSelected' )

const addToCartOn  =  inject(EventServiceAddToCart);

</script>

<template>
    {{servicesSelected}}
    <SelectList :options="services" v-model="servicesSelected" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}" @click="addToCartOn(option)"></ServiceSelectOptionView>
    </SelectList>
</template>

<style scoped>

</style>