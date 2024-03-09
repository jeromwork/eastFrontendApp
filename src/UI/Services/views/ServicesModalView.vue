<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject} from 'vue';
import SelectList from "../../SelectList/index.vue";
import Modal from "../../Modal.vue";
import ServicesSelectListView from "./ServicesSelectListView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import {servicesInCartSymbol, servicesSelectedSymbol} from "../../../composables/useSymbols";
import EcButton from "../../Buttons/EcButton.vue";
import { refreshServicesInCart, servicesNameListFormCart, sumPriceInCart } from '../../../composables/useServiceCart'
import type BookingFormViewProps from '../../../components/Booking/imterfaces/BookingFormViewProprs'
import {EventOpenBookingForm} from "../../../composables/useEvents";
const props = defineProps({
    services:{type:Array, required:true },
})

const visible = defineModel('visible') as boolean


</script>

<template>

    <Modal v-model:visible="visible">
        <ServicesSelectListView :services="services" @open-booking-form="visible=false"/>

    </Modal>
</template>

<style scoped>

</style>