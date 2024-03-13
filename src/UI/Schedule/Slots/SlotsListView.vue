
<script setup lang="ts">
import {    defineProps, reactive, ref, defineEmits, computed, onBeforeMount, onMounted, defineModel, inject} from "vue";

import type {Ref} from 'vue'
import {DoctorCartStateSymbol} from "../../../composables/useSymbols";

import { OpenBookingFormDispatch } from '../../../composables/useDispatches'
import DoctorCardState from "../../../state/DoctorCardState";
import {useDateFormat} from "@vueuse/core";


const props = defineProps<{
    isDownloaded?: Boolean,
    countShowSlots?: number; // Update the type to number[]
}>();




const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const countShowSlots = ref((props.countShowSlots) ?? 5 )

const slotSelect = ( slot:number )=>{
    doctorCardState
        .setSelectedSlot(slot)
        .setBookingFormBlocks({
            showDoctorBlock:true,
            showClinicBlock:true,
            showScheduleBlock:true,})        //settings view booking form
        .toogleModalBooking(true)
}


 const showRestSlots = () => {
     const slotsLength = (doctorCardState.slots?.length) ? doctorCardState.slots.length : 0;
     countShowSlots.value = (slotsLength === countShowSlots) ? 7 : slotsLength;
 }


</script>

<template>
    <div>

        <div v-if="  true ">
            <div class="slots__timeslots-wrapper" v-if="doctorCardState.slots">
                <template
                    v-for="(slot, j) in doctorCardState.slots"
                >
                    <button class="slots_item button primary slot"
                            v-if="j < countShowSlots || countShowSlots+1 === doctorCardState.slots.length"
                            @click.prevent="slotSelect(slot)"
                    >
                        {{useDateFormat(slot * 1000, 'HH:mm').value}}
                    </button>
                    <button class="slots_item button primary slot"
                            v-else-if="j === countShowSlots && countShowSlots+1 !== doctorCardState.slots?.length"
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
