<script setup lang="ts">
import { defineProps, reactive, ref, toRef, defineEmits, computed, toRaw } from "vue";


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

const props = defineProps({
    id:{type:Number},
    fullname:{type:String},

});



const isOnline = ref(true);
const fullName = ref('Клюев Борис Борисович');
const count = ref(0);

let de = computed(()=>    fullName.value+count.value)
const slotProps = {isOnline:isOnline, fullName:de, doctor_id:1};


</script>

<template>

  <slot
          v-bind="props"

  ></slot>
</template>



<style scoped>

</style>