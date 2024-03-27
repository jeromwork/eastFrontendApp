<script setup lang="ts">
import {ref, defineProps, defineEmits, defineModel, inject, provide} from 'vue';
import type {Ref} from 'vue';
import SelectList from "../../SelectList/index.vue";
import ServiceSelectOptionView from "./SelectOptionView.vue";
import type { ServiceData } from "../../../EastclinicVueApi";
import { BookingService } from "../../../EastclinicVueApi";
import { DoctorCartStateSymbol} from "../../../composables/useSymbols";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import {EventOpenBookingForm} from "../../../composables/useEvents";
import type BookingFormViewProps from "../../../components/Booking/imterfaces/BookingFormViewProprs";
import DoctorCardState from "../../../state/DoctorCardState";
import { YandexMetrika } from "../../../composables/useYandexMetrika";


const props = defineProps({
    services:{type:Array, required:true },
})


const doctorCardState = inject( DoctorCartStateSymbol )
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const bookingService = doctorCardState.BookingService

const servicesNames = computed(() => (bookingService.Cart.selectedServicesList?.reverse().slice(-3).map((service) => service.name).join(' · ')) ?? '');



const openBookingForm = () =>{
    YandexMetrika?.reachGoal('service_booking');
    doctorCardState.bookingState.setBookingFormBlocks( {showDoctorBlock:true,
        showServicesBlock:true,
        showScheduleBlock:true,} );
    doctorCardState.toogleModalServices(false );
    doctorCardState.toogleModalBooking(true );
}

</script>

<template>
        <SelectList :options="services" :model-value="bookingService.Cart.selectedServicesList" @update:modelValue="bookingService.Cart.toogleService($event)" #default="{option, selected } " optionValue="id" >
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