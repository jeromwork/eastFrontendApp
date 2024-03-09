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
const emit = defineEmits(['update:visible'])

const servicesSelected  =  inject(  servicesSelectedSymbol  );
if(!servicesSelected?.value) throw new Error('not have services cart by servicesSelectedSymbol');

const servicesInCart = inject(  servicesInCartSymbol );
if(!servicesInCart?.value) throw new Error('not have services cart by servicesInCartSymbol');

const servicesSelectedCount = computed(()=>servicesSelected?.value.length)
const totalPrice = computed(() => sumPriceInCart(servicesInCart.value));
const servicesNames = computed(() => servicesNameListFormCart(servicesInCart.value));

watch(servicesSelected.value,  () => {
    servicesInCart.value = refreshServicesInCart(servicesSelected.value, servicesInCart.value );
})

const openBookingFormOn = inject(EventOpenBookingForm)
const openBookingForm = () =>{
    const viewProps:BookingFormViewProps = {
        showDoctorBlock:true,
        showServicesBlock:true,
        // showClinicBlock:true,
        showScheduleBlock:true,
    }
    emit('update:visible', false);
    openBookingFormOn(viewProps);

}

</script>

<template>

    <Modal v-model:visible="visible">
        <ServicesSelectListView :services="services"/>
        <EcButton class="primary full-width shadow-button services-button-container"
                  @click="openBookingForm">
            <span>Записаться</span>
            <span v-show="!servicesSelectedCount">
              <div style="font-size: 12px; color: #B6C8F3">без выбора услуги</div>
       </span>

            <div v-show="servicesSelectedCount" class="services-button">
                <div class="d-flex align-center" style="width: 95%;">
                    <div class="d-flex align-center margin-right-6">
                        <span class="icons cart margin-right-2"></span>
                        <span>{{servicesSelectedCount}}</span>
                    </div>
                    <div class="services-cart">
                        <div class="text-left">
                            <span class="margin-right-2">Корзина</span>
                            <span class="text-blue">
                      <span>{{totalPrice}}₽</span>
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
    </Modal>
</template>

<style scoped>

</style>