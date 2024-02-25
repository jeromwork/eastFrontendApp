<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";

import type DoctorInterface from "../../../EastclinicVueApi/interfaces/DoctorInterface";
//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/
const raiting = computed(()=>    4.5)






interface DoctorCardViewProps {
    doctor: DoctorInterface;
}


const props = defineProps<DoctorCardViewProps>();

const doctorInfo = toRef(props, 'doctor');
const specials = computed(() => {
    let specs = '';
    if (doctorInfo.value?.main_specials) {
        specs +=  doctorInfo.value.main_specials.map(special => special.name).join(' · ');
    }
    if (doctorInfo.value?.specials_of_service) {
        specs += doctorInfo.value.specials_of_service.map(special => special.name).join(' · ');
    }
    return specs;
});
doctorInfo.value.specials = specials.value;



</script>

<template>

  <slot
          v-bind="{doctor:doctorInfo}"

  ></slot>
</template>



<style scoped>

</style>