<script setup lang="ts">
import SingleDoctor from './index.vue'

//В этом компоненте обращаемся к сервису за данными по доктору
//Возможно доктора уже загружены - в списке докторов, тогда просто отображаем данные доктора
//кроме сервиса Doctors ничего более не знаем (СЕО? Клиники?)

//данные из этого контроллера передаются в index.vue - это view.
//в этой view ничего не обрабатываем - только отобржаем/
//а так же прокидывам данные дальше по вложенным компонентам

</script>

<template>
<span>Single doctor controller</span>
    <br/>
  <SingleDoctor/>
</template>



<style scoped>

</style>