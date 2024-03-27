
<script setup lang="ts">
import {
    defineProps,
    reactive,
    ref,
    toRef,
    defineEmits,
    computed,
    toRaw,
    onBeforeMount,
    onMounted,
    defineModel,
    inject
} from "vue";
import type {Ref} from 'vue'
import CalendarCarouselView from "../Calendar/CalendarCarouselView.vue";
import SlotsListView from "../Slots/SlotsListView.vue";
import {DoctorCartStateSymbol} from "../../../composables/useSymbols";
import DoctorCardState from "../../../state/DoctorCardState";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

</script>

<template>

    <div class="slots mt-6">

        <div class="doctor-card-2__slots">

            <CalendarCarouselView />

            <SlotsListView :state="doctorCardState"/>
        </div>
    </div>

</template>



<style scoped>

</style>