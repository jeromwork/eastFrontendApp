<template>
  <div class="v-application--wrap">
<!--    <Clickfraud/>-->
    <MobileMenu
      :menuToggle="menuToggle"
    />
    <div class="white-container">
      <div class="main-container">
        <Header
          :noMenu="true"
        />
      </div>
    </div>
    <v-app>
      <Nuxt/>
    </v-app>
<!--    <Callback2/>-->
<!--    <BookingDialog-->
<!--      :dialog="dialog"-->
<!--      :doctor="doctor"-->
<!--      :clinic="clinic"-->
<!--      :day="day"-->
<!--      :slotUnix="slot"-->
<!--    ></BookingDialog>-->
<!--    <PageFooter/>-->
<!--    <OrganizationSchemaOrg/>-->
  </div>
</template>

<script>
import Vue from "vue";
import VueYandexMetrika from "vue-yandex-metrika";
import PageFooter from "../components/PageFooter";
import MobileMenu from '~/components/Header/MobileMenu';
import BookingDialog from "../components/Booking/BookingDialog";
import Callback2 from "../components/Callback2.vue";
import Clickfraud from "../components/Clickfraud.vue";
import OrganizationSchemaOrg from "../components/SchemaOrg/Organization.vue";
export default {
  name: 'DefaultLayout',
  components: {
    Clickfraud,
    Callback2,
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
      slot: {},
      dialog: false
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
    });
    this.$nuxt.$on('toggleBookingDialog', (trigger) => {
      if(trigger) {
        this.dialog = trigger
      } else {
        this.dialog = !this.dialog;
      }

    });
  },
  mounted() {
    // console.log(sessionStorage)
    if (sessionStorage.getItem('errorVisit')) {
      sessionStorage.removeItem('errorVisit');
    }
  }
}
</script>
