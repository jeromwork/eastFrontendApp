<template>
  <v-app>
    <Nuxt/>
<!--    <Clickfraud/>-->
  </v-app>
</template>

<script>
import Vue from "vue";
import VueYandexMetrika from "vue-yandex-metrika";
import Clickfraud from "../components/Clickfraud.vue";

export default {
  name: "clear",
  components: {Clickfraud},
  created() {
    if(process.browser) {
      Vue.use(VueYandexMetrika, {
        id: 19981279,
        router: this.$nuxt._router,
        env: process.env.NODE_ENV,
        options: {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor: true,
          ecommerce:"dataLayer"
        }
      })
    }
  },
  mounted() {
    if (sessionStorage.getItem('errorVisit')) {
      sessionStorage.removeItem('errorVisit');
    }
  }
}
</script>

<style scoped>

</style>
