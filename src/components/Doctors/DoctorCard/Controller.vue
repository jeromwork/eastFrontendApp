<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";
import type { Ref } from "vue";

import type DoctorInterface from "../../../EastclinicVueApi/interfaces/DoctorInterface";
import type ContentInterface from "../../../EastclinicVueApi/interfaces/ContentInterface";
import type ServiceData from "../../../EastclinicVueApi/interfaces/ServiceData";
//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

/** рейтинг доктора относится к данным доктора
 * Рейтинг скорее всего кэшируется, что бы не нагружать систему
 * Данные по рейтингу приходят с данными доктора*/





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


const photo120x120 = computed(() => {
    if ( doctorInfo.value?.content ){
        for (const i in doctorInfo.value.content){
            const img = doctorInfo.value.content[i]
            if(img.type === '120x120' && img.typeFile === 'image') return img;
        }
        return doctorInfo.value.photos['120x120'][0] as ContentInterface
    } else {
        return { id : null, type:'120x120', typeFile:"image", url:'/images/photo_soon.png' } as ContentInterface;
    }
});
doctorInfo.value.photo120x120 = photo120x120.value;

const favoriteService = computed(() => {
    let mainService = (doctorInfo.value?.choosen_service_data?.[0]) ?? null
    if(!mainService && doctorInfo.value?.service_data?.[0]) mainService = doctorInfo.value.service_data[0];
    return mainService as ServiceData;
});
doctorInfo.value.favoriteService = favoriteService.value;


</script>

<template>

  <slot
          v-bind="{doctor:doctorInfo}"

  ></slot>
</template>



<style scoped>

</style>