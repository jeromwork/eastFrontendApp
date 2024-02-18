<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";
import type { Ref } from 'vue'
interface DoctorCardViewProps {
    isOnline: boolean | Ref<boolean>;
    fullName: string | Ref<string>;
    doctor_id?: number;
}


const props = withDefaults(defineProps<DoctorCardViewProps>(), {
    isOnline: false,
    fullName: ref('Просто доктор'),
    doctor_id: undefined,
});
</script>

<template>
<span>Single doctor index</span>
    <h1>!!{{props.fullName}}</h1>
    <div
            v-if="isOnline"
            class="single-doctor__add-info__item">
        <span>Доктор ведет приём только онлайн</span>
    </div>
    <slot name="body"></slot>
</template>



<style scoped>

</style>