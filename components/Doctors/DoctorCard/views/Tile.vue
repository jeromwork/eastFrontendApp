<script setup lang="ts">
import DoctorCardView from '../View.vue'
import Reviews from '../../../components/Reviews/Controller.vue'
//в этом компоненте составляется, комбинируется карточка доктора
//тут можно в слоты карточки передавать различные компоненты
//все это можно делать непосредственно в контроллере - но тогда контроллер будет заточен только под эту комбинацию view карточки
//эта комбинация карточки доктора, может быть вынесена допустим на страницу докторов
//но тогда будет страница докторов заполнена вызовами
//если не большая комбинация карточки доктора, то можно и туда вынести, посмотрим

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

    <DoctorCardView v-bind:="props" >
    <template #body>

        <Reviews/>
    </template>

    </DoctorCardView>
</template>


<style scoped>

</style>