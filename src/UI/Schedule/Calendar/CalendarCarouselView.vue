
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel, inject} from "vue";
import type {Ref} from "vue";
import { DoctorCartStateSymbol } from "../../../composables/useSymbols";
import DoctorCardState from "../../../modules/DoctorCardState";



const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');


</script>

<template>
    <!--                                    <Carousel>-->
    <div v-if="doctorCardState.workDays">
    <button  v-for="(day, key) in doctorCardState.workDays" @click="doctorCardState.setWorkingDay(day)">
        <div :style="{'background-color': (doctorCardState.workingDay === day) ? '#1B5BFF' : ''}">
            {{day}}
        </div>

    </button>

    </div>

    <!--                                    </Carousel>-->
</template>



<style scoped>

</style>