
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel, inject} from "vue";


import type {Ref} from "vue";
import {useEventBus} from "@vueuse/core";
import {EventSelectedWorkingDay, EventSelectClinic} from "../../../composables/useEvents";

const props = defineProps<{
    workDays : number[] | null,
    currentWorkingDay: number | null

}>()

const currentWorkingDayModel = defineModel({ type: Number })
onMounted(async ()=>{
});

const selectWorkingDayOn = inject(EventSelectedWorkingDay);

const selectedDay = (day:number) => {
    if(props.currentWorkingDay === day) return;
    selectWorkingDayOn(day)
}

</script>

<template>
    <!--                                    <Carousel>-->
    <div v-if="workDays">
    <button  v-for="(day, key) in workDays" @click="selectedDay(day)">
        {{day}}
    </button>

    </div>

    <!--                                    </Carousel>-->
</template>



<style scoped>

</style>