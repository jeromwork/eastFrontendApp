<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import {defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions} from "vue";
import type { Ref } from 'vue'
interface DoctorCardViewProps {
    doctor: Object;
}

defineOptions({
    inheritAttrs: false
})
const props = withDefaults(defineProps<DoctorCardViewProps>(), {
    doctor: {},
});
</script>


<template>

    <h1>!!{{doctor.fullname}}</h1>
    <div
            v-if="doctor.isOnline"
            class="single-doctor__add-info__item">
        <span>Доктор ведет приём только онлайн</span>
    </div>
    <slot name="body"></slot>
</template>

<style scoped>

</style>