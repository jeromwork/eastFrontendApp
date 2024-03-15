<script setup lang="ts">
import {defineProps, inject} from 'vue'
import type { ClinicInterface } from '../../../EastclinicVueApi'
import {DoctorCartStateSymbol} from "../../../composables/useSymbols";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const chosenClinicNow = doctorCardState.selectedClinic

</script>

<template>
    <div
        @click="doctorCardState.toogleBookingScheduleBlock(true)"
        class="booking__dialog__card with-icon" style="padding-bottom: 7px; padding-top: 7px" :class="{'error-border':!!(doctorCardState.selectedSlotError)}">
        <div>
            <div class="booking__dialog__label">
                Клиника
            </div>

            <div v-if="chosenClinicNow">
                <span v-if="chosenClinicNow.id !== 42" style="top: 0" :class="'metro-label m'+chosenClinicNow.node_color"></span>
                <span >{{ chosenClinicNow.node_address }}</span>
                <span v-if="chosenClinicNow.way !== null" class="icons guy"></span>
                <span v-if="chosenClinicNow.way !== null" class="text-secondary text-medium">{{chosenClinicNow.way}} м</span>
                <span v-if="chosenClinicNow.way === null && chosenClinicNow.way_time" class="text-secondary text-medium text-no-wrap"><span class="icons guy"></span> {{chosenClinicNow?.way_time}}</span>

            </div>
            <div v-else class="">
                <span class="booking__dialog__card_input-text">Выбрать клинику</span>
            </div>
        </div>

        <span class="icons pen"></span>
    </div>

</template>

<style scoped>


</style>