
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel, inject} from "vue";
import type {Ref} from "vue";
import { DoctorCartStateSymbol } from "../../../composables/useSymbols";
import DoctorCardState from "../../../state/DoctorCardState";
import {useDateFormat} from "@vueuse/core";


const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');


</script>

<template>
    <!--                                    <Carousel>-->
    <div v-if="doctorCardState.workDays">
    <button  v-for="(day, key) in doctorCardState.workDays" @click="doctorCardState.setWorkingDay(day)">
        <div :style="{'background-color': (doctorCardState.workingDay === day) ? '#1B5BFF' : ''}">
            {{useDateFormat(day * 1000, 'DD \n ddd', { locales: 'ru' }).value}}

        </div>

    </button>

    </div>

    <!--                                    </Carousel>-->
</template>



<style scoped>

</style>