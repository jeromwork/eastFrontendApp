
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";
import Calendar from "#build/src/UI/Schedule/Calendar/Controller.vue";
import ScheduleController from "#build/src/UI/Schedule/Controller.vue";

const props = defineProps({
    workDays : Array as () => number[],
    slots : Array as () => number[],

})

const currentDay = defineModel('currentDay',{ type: Number })
const currentSlot = defineModel('currentSlot',{ type: Number })

const emit = defineEmits(['slotSelected'])

onMounted(async ()=>{
});

// const schedules = computed(()=> ScheduleService.schedules)


</script>

<template>

    <div class="slots mt-6">

        <div class="doctor-card-2__slots">

            <Calendar :doctor-id="doctor.id" :clinic-id="1"></Calendar>

            <SlotView></SlotView>
        </div>
    </div>

</template>



<style scoped>

</style>