
<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw, onBeforeMount , onMounted, defineModel} from "vue";
import { useEventBus } from '@vueuse/core'

const bus = useEventBus<string>('news')


const props = defineProps({
slots:

})

const workingDay = defineModel({ type: Number })

onMounted(async ()=>{
});

// const schedules = computed(()=> ScheduleService.schedules)


</script>

<template>

    <div @click="bus.emit('The Tokyo Olympics has begun')">

    </div>

</template>



<style scoped>

</style>