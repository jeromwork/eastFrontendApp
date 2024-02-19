<template>
  <div id="values">
    <div class="text-center">
      <div class="vacancy__preheader">Наши</div>
      <h2 class="text-semibold">Ценности</h2>
    </div>
    <div class="content__divider"></div>
    <div class="values">
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-1.png"></v-img>
          </div>
          <span>Мы уважительно относимся к пациентам и не обесцениваем их чувства. Мы принимаем их мысли и поведение, воспринимаем пациента как равнозначного.</span>
        </PlateBlock>
      </div>
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-2.png"></v-img>
          </div>
          <span class="values__item__text">Мы индивидуально рассматриваем проблемы каждого пациента, отслеживаем его судьбу, отзываемся на обращения.</span>
        </PlateBlock>
      </div>
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-3.png"></v-img>
          </div>
          <span class="values__item__text">Мы готовы к конструктивной критике или жалобе от пациента/коллег. Воспринимаем их как возможность профессионального роста и расширения кругозора.</span>
        </PlateBlock>
      </div>
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-4.png"></v-img>
          </div>
          <span class="values__item__text">Нам важен результат лечения. Мы пользуемся возможностями попросить помощи у коллег, а также оказываем её сами.</span>
        </PlateBlock>
      </div>
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-5.png"></v-img>
          </div>
          <span class="values__item__text">Мы не извлекаем выгоды из дополнительных услуг, оказанных пациентам.</span>
        </PlateBlock>
      </div>
      <div class="values__item">
        <PlateBlock
          class="flex-container align-center justify-center"
          :padding="15"
          :border-radius="30"
          :max-width="575"
          :min-height="120"
        >
          <div class="values__item__icon">
            <v-img src="https://eastclinic.ru/assets/images/vacancy/value-6.png"></v-img>
          </div>
          <span class="values__item__text">Мы чувствуем себя командой, активно участвуем в жизни клиники и стремимся взаимодействовать с коллегами.</span>
        </PlateBlock>
      </div>
    </div>
  </div>

</template>

<script>
import PlateBlock from "../../components/shared/PlateBlock.vue";

export default {
  name: "Values",
  components: {PlateBlock}
}
</script>
