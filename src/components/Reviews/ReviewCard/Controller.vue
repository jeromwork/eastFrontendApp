<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";

const props = defineProps({
    id:{type:Number},
    body:{type:String},
});
const makeid = (length:Number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const description = ref('')

onMounted(()=>{
    description.value = makeid(14)
})


</script>

<template>
  <slot v-bind="{...props, description}"/>
</template>



<style scoped>

</style>