<script setup lang="ts">
import type DoctorCardViewProps from "../../Interfaces/DoctorCardViewProps";

import { defineProps,  ref } from "vue";
import type { Ref } from 'vue'
import type {DoctorInterface} from "../../../../EastclinicVueApi";
import {inject} from "vue";
import {DoctorCartStateSymbol} from "../../../../composables/useSymbols";
import DoctorCardState from "../../../../modules/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const doctor = doctorCardState.Doctor as DoctorInterface

</script>

<template>
    <div  class="booking__dialog__doctor-card">
        <div class="booking__dialog__doctor-card_photo">
            <img :src="doctor.photo120x120" :alt="doctor.fullname">
        </div>
        <div class="booking__dialog__doctor-card_info">
            <div class="text-semibold">{{doctor.fullname}}</div>
            <div class="booking__dialog__doctor-card_info_desc" v-if="doctor.specials">{{doctor.specials}}</div>
        </div>
    </div>
</template>


<style scoped>

</style>