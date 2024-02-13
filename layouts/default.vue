<template>
  <div class="v-application--wrap">
<!--    <Clickfraud/>-->
    <MobileMenu
      :menuToggle="menuToggle"
    />
    <div class="white-container">
<!--      <a href="/srochnyj-test-na-covid-19" class="covid-banner text-semibold">-->
<!--        <span>Тесты на COVID-19</span>-->
<!--        <span class="icons forward-white"></span>-->

<!--      </a>-->
      <div class="main-container">
        <Header />
      </div>
    </div>
      <v-app>
        <Nuxt/>
      </v-app>
      <PageFooter/>
    <OrganizationSchemaOrg/>
  </div>
</template>

<script>
import Vue from "vue";
import VueYandexMetrika from "vue-yandex-metrika";
import PageFooter from "../components/PageFooter";
import MobileMenu from '~/components/Header/MobileMenu';
import BookingDialog from "../components/Booking/BookingDialog";
import Clickfraud from "../components/Clickfraud.vue";
import OrganizationSchemaOrg from "../components/SchemaOrg/Organization";
export default {
  name: 'DefaultLayout',
  components: {
    Clickfraud,
    PageFooter,
    MobileMenu,
    BookingDialog,
    OrganizationSchemaOrg
  },
  data () {
    return {
      menuToggle: false,
      clinic: {},
      doctor: {},
      day:{},
      slot: {}
    }
  },
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
    this.$nuxt.$on('drawerUp', (e) => {
      this.menuToggle = e;
    })
  },
  mounted() {
    if (sessionStorage.getItem('errorVisit')) {
      sessionStorage.removeItem('errorVisit');
    }
  }
}
</script>
