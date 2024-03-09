<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject, provide} from 'vue';
import type {Ref} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData, ServiceCartInterface } from "../../../EastclinicVueApi";
import { BookingService } from "../../../EastclinicVueApi";
import {bookingServiceSymbol, servicesInCartSymbol, servicesSelectedSymbol} from "../../../composables/useSymbols";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import {EventOpenBookingForm} from "../../../composables/useEvents";
import type BookingFormViewProps from "../../../components/Booking/imterfaces/BookingFormViewProprs";
import {refreshServicesInCart, servicesNameListFormCart, sumPriceInCart} from "../../../composables/useServiceCart";





const props = defineProps({
    services:{type:Array, required:true },
})

const bookingService = inject(bookingServiceSymbol) as BookingService
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');

const servicesNames = computed(() => (bookingService.Cart.servicesList?.reverse().slice(-3).map((service) => service.name).join(' · ')) ?? '');

const toogleService =(service) => {
    bookingService.Cart.toogleService(service)
}


const openBookingFormOn = inject(EventOpenBookingForm)
const openBookingForm = () =>{
    const viewProps:BookingFormViewProps = {
        showDoctorBlock:true,
        showServicesBlock:true,
        // showClinicBlock:true,
        showScheduleBlock:true,
    }

    openBookingFormOn(viewProps);
}

</script>

<template>
    <SelectList :options="services" :model-value="bookingService.Cart.servicesList" @update:modelValue="toogleService" #default="{option, selected } " optionValue="id" >
        <ServiceSelectOptionView v-bind="{service:option as ServiceData, selected}">
        </ServiceSelectOptionView>
    </SelectList>
    <EcButton class="primary full-width shadow-button services-button-container"
              @click="openBookingForm">
        <span>Записаться</span>
        <span v-show="!bookingService.Cart.count">
              <div style="font-size: 12px; color: #B6C8F3">без выбора услуги</div>
       </span>

        <div v-show="bookingService.Cart.count" class="services-button">
            <div class="d-flex align-center" style="width: 95%;">
                <div class="d-flex align-center margin-right-6">
                    <span class="icons cart margin-right-2"></span>
                    <span>{{bookingService.Cart.count}}</span>
                </div>
                <div class="services-cart">
                    <div class="text-left">
                        <span class="margin-right-2">Корзина</span>
                        <span class="text-blue">
                      <span>{{bookingService.Cart.sum}}₽</span>
                    </span>
                    </div>
                    <div class="services-cart__list-of-services text-small text-left mt-1">
                        {{servicesNames}}
                    </div>
                </div>
            </div>
            <div class="d-flex align-center">
                <span class="icons arrow-white"></span>
            </div>
        </div>
    </EcButton>
</template>

<style scoped>

</style>