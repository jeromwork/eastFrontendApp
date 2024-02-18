<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";

const props = defineProps({
    /**     doctor online or not        */
    isOnline: {
        type:Boolean,
        default: false,
    },
    modelValue:Object,
    doctor_id:{         type:Number   }
})

</script>

<template>
<span>Single doctor index</span>
</template>

<div
    v-if="isOnline"
    class="single-doctor__add-info__item">
<span>Доктор ведет приём только онлайн</span>
</div>

<style scoped>

</style>