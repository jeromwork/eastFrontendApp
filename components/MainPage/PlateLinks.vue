<template>
  <div class="main-container">
    <div class="mainpage-container">
      <div class="plates-link">
        <nuxt-link
          v-for="(plate, key) in plates"
          :to="plate.url"
          :key="key"
          class="plates-link__item">
          <div class="plates-link__item__wrapper">
            <div class="plates-link__item__left">
              <img :src="plate.photo" />
              <span v-html="plate.text"></span>
            </div>
            <span class="icons forward gray"></span>
          </div>

        </nuxt-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "PlateLinks",
  data: () => ({
    plates: [
      {'text': 'Записаться <br><b>к врачу на приём</b>', 'url':'/vrachi', 'photo': 'https://eastclinic.ru/assets/images/plates/plate-doctor.png'},
      {'text': 'Записаться <br><b>на УЗИ</b>', 'url':'/vrachi/vrach-uzi', 'photo': 'https://eastclinic.ru/assets/images/plates/plate-uzi.png'},
      {'text': 'Получить <br><b>онлайн консультацию</b>', 'url':'/vrachi/telemed', 'photo': 'https://eastclinic.ru/assets/images/plates/plate-online.png'},
      {'text': 'Записаться на сдачу<br><b>медицинских анализов</b>', 'url':'/vrachi/medsestra', 'photo': 'https://eastclinic.ru/assets/images/plates/plate-microscope.png'},
    ]
  }),
}
</script>

<style scoped>

</style>
