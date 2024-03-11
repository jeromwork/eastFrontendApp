
<script setup lang="ts">
import {    defineProps, reactive, ref, defineEmits, computed, onBeforeMount, onMounted, defineModel, inject} from "vue";

import type {Ref} from 'vue'
import BookingFormViewProps from "../../../components/Booking/imterfaces/BookingFormViewProprs";
import {bookingServiceSymbol} from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";
import { OpenBookingFormDispatch } from '../../../composables/useDispatches'

const props = defineProps<{
    isDownloaded?: Boolean,
    countShowSlots?: number; // Update the type to number[]
}>();


const bookingService = inject(bookingServiceSymbol) as BookingService
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');


const countShowSlots = ref((props.countShowSlots) ?? 5 )

const slotSelect = ( slot:number )=>{

    const viewProps:BookingFormViewProps = {
        showDoctorBlock:true,
        showClinicBlock:true,
        showScheduleBlock:true,
    }
    const openBookingFormOn = inject(OpenBookingFormDispatch)
    openBookingFormOn(viewProps);
}
 const showRestSlots = () => {
     const slotsLength = (props.slots?.length) ? props.slots.length : 0;
     countShowSlots.value = (slotsLength === countShowSlots) ? 7 : slotsLength;
 }


</script>

<template>
    <div>

        <div v-if="  true ">
            <div class="slots__timeslots-wrapper" v-if="slots">
                <template
                    v-for="(slot, j) in slots"
                >
                    <button class="slots_item button primary slot"
                            v-if="j < countShowSlots || countShowSlots+1 === slots.length"
                            @click.prevent="slotSelect(slot)"
                    >
                        {{slot}}
                    </button>
                    <button class="slots_item button primary slot"
                            v-else-if="j === countShowSlots && countShowSlots+1 !== slots?.length"
                            @click.prevent="showRestSlots"
                    >
                        <span class="icons down-white"></span>
                    </button>
                </template>
            </div>
            <div v-else>
                <div class="slots__resting">
                    <span class="icons camp" style="width: 28px;height: 28px"></span>
                    <span >В этот день врач отдыхает, вы можете выбрать любой другой день</span>

                </div>
            </div>
        </div>
        <div v-else>
<!--                <skeleton-loader />-->
        </div>


    </div>
</template>



<style lang="scss">
.button.slot {
    width: auto;
    padding: 5px 16px;
    border-radius: 10px !important;
    font-size: 14px;
}
</style>
