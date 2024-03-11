
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel, inject} from "vue";
import type {Ref} from "vue";
import { bookingServiceSymbol, workDaysReadonlyRefSymbol } from "../../../composables/useSymbols";
import {BookingService} from "../../../EastclinicVueApi";


const bookingService = inject(bookingServiceSymbol) as BookingService;
if(!bookingService) throw new Error('not have BookingService by bookingServiceSymbol');

const workDays = inject(workDaysReadonlyRefSymbol);

</script>

<template>
    <!--                                    <Carousel>-->
    <div v-if="workDays">
    <button  v-for="(day, key) in workDays" @click="bookingService.setWorkingDay(day)">
        <div :style="{'background-color': (bookingService.selectedWorkDay === day) ? '#1B5BFF' : ''}">
            {{day}}
        </div>

    </button>

    </div>

    <!--                                    </Carousel>-->
</template>



<style scoped>

</style>