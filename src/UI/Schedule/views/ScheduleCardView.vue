
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";
import type {Ref} from 'vue'
import CalendarCarouselView from "../Calendar/CalendarCarouselView.vue";
import SlotsListView from "../Slots/SlotsListView.vue";


interface ScheduleCardViewProps {
    workDays: number[] | null;
    slots: number[]|Ref<number[]>|null;
    currentWorkingDay: number|null

}



const props = defineProps<ScheduleCardViewProps>();

const currentWorkingDayModel = defineModel('currentDayModel',{ type: Number })
const currentSlotModel = defineModel('currentSlotModel',{ type: Number })

const emit = defineEmits(['slotSelected'])

onMounted(async ()=>{
});

// const schedules = computed(()=> ScheduleService.schedules)


</script>

<template>

    <div class="slots mt-6">

        <div class="doctor-card-2__slots">

            <CalendarCarouselView :workDays :currentWorkingDay >

            </CalendarCarouselView>

            <SlotsListView :slots="slots" v-model="currentSlotModel"></SlotsListView>
        </div>
    </div>

</template>



<style scoped>

</style>