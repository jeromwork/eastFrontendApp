
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";

import { ScheduleService } from "../../EastclinicVueApi";

const props = defineProps({
    doctorId : Number,
    clinicId : Number

})

const workingDay = defineModel({ type: Number })

onMounted(async ()=>{
});

// const schedules = computed(()=> ScheduleService.schedules)


</script>

<template>

    <div >

    </div>

</template>



<style scoped>

</style>