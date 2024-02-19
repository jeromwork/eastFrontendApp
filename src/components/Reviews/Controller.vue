<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";


const raiting = computed(()=>    4.5)
const reviewsList = [
    { id:1, body:'Отзыв 1'},
    { id:3, body:'Отзыв 3'}
];



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

    <div v-for="(review, key) in reviewsList">
        <slot name="review" v-bind="review"></slot>
    </div>

</template>



<style scoped>

</style>