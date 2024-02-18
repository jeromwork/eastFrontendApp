<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";


const raiting = computed(()=>    4.5)

const props = defineProps({
    target:{type:String},
    targetId:{type:Number},
    targetIds:{type:Array},
});


const isOnline = ref(true);
const fullName = ref('Клюев Борис Борисович');
const count = ref(0);

let de = computed(()=>    fullName.value+count.value)
const slotProps = {isOnline:isOnline, fullName:de, doctor_id:1};


</script>

<template>
<span>Reviewsssss</span>

</template>



<style scoped>

</style>