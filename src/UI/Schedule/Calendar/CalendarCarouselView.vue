
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";

import { ScheduleService } from "../../../EastclinicVueApi";
import type {Ref} from "vue";

const props = defineProps({
    workDays : Array as () => number[] | Ref<number[]>|null,

})

const currentWorkingDayModel = defineModel({ type: Number })
onMounted(async ()=>{
});

// const schedules = computed(()=> ScheduleService.schedules)


</script>

<template>
    <!--                                    <Carousel>-->
    <div v-if="workDays">


    </div>

    <!--                                    </Carousel>-->
</template>



<style scoped>

</style>