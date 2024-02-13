<template>
  <v-app>
<!--    <Clickfraud/>-->
    <MobileMenu
      :menuToggle="menuToggle"
    />
    <BookingDialog
      :dialog="dialog"
      :doctor="doctor"
      :clinic="clinic"
      :day="day"
      :slotUnix="slot"
    ></BookingDialog>
    <Nuxt />
    <MapLink
      :clinic="clinic"
      :mapOpen="mapOpen"
    />
    <OrganizationSchemaOrg/>
  </v-app>
</template>

<script>
import MobileMenu from '~/components/Header/MobileMenu';
import Vue from "vue";
import VueYandexMetrika from "vue-yandex-metrika";
import BookingDialog from "../components/Booking/BookingDialog";
import MapLink from "../components/MapLink";
import Clickfraud from "../components/Clickfraud.vue";
import OrganizationSchemaOrg from "../components/SchemaOrg/Organization.vue";
export default {
  name: 'Doctors',
  components: {
    Clickfraud,
    MapLink,
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
      slot: 0,
      dialog: false,
      mapOpen: false,
      browserName: '',
      mobile: false
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.browserName + this.isMobile
      },
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
    this.$nuxt.$on('toggleBookingDialog', (trigger) => {
      if(trigger) {
        this.dialog = trigger
      } else {
        this.dialog = !this.dialog;
      }

    })
    this.$nuxt.$on('mapToggle', (clinic) => {
      this.mapOpen = !this.mapOpen;
      if(clinic) {
        this.clinic = clinic;
      }

    })
  },
  computed: {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.$browser.agent())) {
        return ' mobile';
      } else {
        return ' desktop';
      }
    }
  },
  mounted() {
    this.browserName = this.$browser.get();
    if (sessionStorage.getItem('errorVisit')) {
      sessionStorage.removeItem('errorVisit');
    }
  }
}
</script>
