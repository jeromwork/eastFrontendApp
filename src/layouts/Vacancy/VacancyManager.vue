<script>
import PlateBlock from "../../components/shared/PlateBlock.vue";

export default {
  name: "VacancyManager",
  components: {PlateBlock},
  props: {
    small: {
      type: Boolean,
      default: false
    },
  },
  computed:{
    managersInfo(){
      const resource = this.$store.getters['pageInfo/getResourceInfo']
      if( !resource || !resource.vacancyManager )   return [{name:'Ирина', phone : this.$store.getters['pageInfo/getMainPhone']}];
      return resource.vacancyManager;
    },
    phoneLink() {
      return this.$store.getters['pageInfo/getLinkPhone'];
    },
    phoneFormatted() {
      return this.$store.getters['pageInfo/getFormattedMainPhone'];
    },
    whatsAppPhone() {
      return this.$store.getters['pageInfo/getWhatsAppPhone'];
    }
  },
}
</script>

<template>
  <div>

  <plate-block
    v-for="(manager, key) in managersInfo"
    class="vacancy__manager"
    :padding="14"
    :border-radius="30"
    :max-width="429"
    :key="key"
  >
    <div class="flex-container justify-start hr-plate">
      <div
        :class="{'small': small}"
        class="flex-container align-center hr-plate__right"
      >
<!--        <a :href="'tel:'+manager.phone"-->
<!--           :class="{'small': small}"-->
<!--           class="mr-2 flex-container"-->
<!--        >-->
          <a :href="phoneLink"
             :class="{'small': small}"
             class="mr-2 flex-container"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect width="60" height="60" rx="20" fill="white"/>
            <g clip-path="url(#clip0_6410_209295)">
              <path d="M39.6401 34.347L36.2534 33.9603C35.4401 33.867 34.6401 34.147 34.0667 34.7203L31.6134 37.1737C27.8401 35.2537 24.7467 32.1737 22.8267 28.387L25.2934 25.9203C25.8667 25.347 26.1467 24.547 26.0534 23.7337L25.6667 20.3737C25.5067 19.027 24.3734 18.0137 23.0134 18.0137H20.7067C19.2001 18.0137 17.9467 19.267 18.0401 20.7737C18.7467 32.1603 27.8534 41.2537 39.2267 41.9603C40.7334 42.0537 41.9867 40.8003 41.9867 39.2937V36.987C42.0001 35.6403 40.9867 34.507 39.6401 34.347Z" fill="#4372EA"/>
            </g>
            <defs>
              <clipPath id="clip0_6410_209295">
                <rect width="32" height="32" fill="white" transform="translate(14 14)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
<!--        <a :href="this.$store.getters['pageInfo/getWhatsAppPhone']"-->
<!--           :class="{'small': small}"-->
<!--           target="_blank" class="flex-container"-->
<!--        >-->
        <a :href="whatsAppPhone"
           :class="{'small': small}"
           target="_blank" class="flex-container"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect width="60" height="60" rx="20" fill="white"/>
            <path d="M39.9093 20.0706C38.6199 18.775 37.0843 17.7479 35.392 17.049C33.6998 16.3502 31.8848 15.9936 30.0527 16.0001C22.3759 16.0001 16.1195 22.2266 16.1125 29.8705C16.1125 32.3188 16.7559 34.7005 17.9706 36.8093L16 44L23.3903 42.0715C25.4347 43.1791 27.7251 43.7597 30.0527 43.7603H30.0598C37.7383 43.7603 43.993 37.5338 44 29.8828C44.0017 28.0594 43.6411 26.2536 42.9387 24.5696C42.2363 22.8856 41.2062 21.3565 39.9076 20.0706H39.9093ZM30.0527 41.4118C27.9766 41.4125 25.9387 40.8563 24.1532 39.8018L23.7313 39.5498L19.3471 40.6943L20.5178 36.4365L20.2436 35.9973C19.083 34.1603 18.4692 32.0336 18.4734 29.8635C18.4734 23.5181 23.6715 18.3416 30.0598 18.3416C31.5817 18.3389 33.089 18.6361 34.495 19.216C35.901 19.796 37.1777 20.6473 38.2516 21.7208C39.3293 22.7902 40.1836 24.0613 40.7653 25.461C41.347 26.8606 41.6446 28.3611 41.6409 29.8758C41.6338 36.244 36.4357 41.4118 30.0527 41.4118ZM36.4076 32.7773C36.0613 32.604 34.3508 31.7658 34.0291 31.6468C33.7092 31.533 33.4754 31.4735 33.2469 31.82C33.0131 32.1648 32.345 32.9505 32.1446 33.1763C31.9442 33.409 31.7368 33.4353 31.3887 33.2638C31.0424 33.0888 29.9191 32.7248 28.5902 31.54C27.553 30.6213 26.8586 29.4838 26.6512 29.139C26.4508 28.7925 26.6318 28.607 26.8059 28.4338C26.9588 28.2798 27.1522 28.0278 27.3262 27.8283C27.502 27.6288 27.56 27.4818 27.6743 27.2508C27.7885 27.0163 27.734 26.8168 27.6479 26.6436C27.56 26.4703 26.8656 24.7606 26.5721 24.0711C26.2908 23.3903 26.0043 23.4848 25.7898 23.4761C25.5894 23.4638 25.3556 23.4638 25.1218 23.4638C24.9452 23.4682 24.7715 23.5088 24.6115 23.5832C24.4514 23.6576 24.3086 23.7641 24.1919 23.8961C23.8719 24.2426 22.9771 25.0808 22.9771 26.7906C22.9771 28.5003 24.2253 30.1435 24.4011 30.3763C24.5733 30.609 26.8516 34.1073 30.3481 35.6123C31.1743 35.971 31.8247 36.1828 32.3327 36.3438C33.1678 36.6098 33.9219 36.5695 34.5231 36.4838C35.1911 36.3823 36.5816 35.6438 36.8752 34.8335C37.1635 34.0215 37.1635 33.3285 37.0756 33.1833C36.9894 33.0363 36.7556 32.9505 36.4076 32.7773Z" fill="#4372EA"/>
          </svg>
        </a>
      </div>
      <div class="hr-plate__left">
<!--        <div-->
<!--          :class="{'small': small}"-->
<!--        >{{manager.name}} (менеджер по персоналу)</div>-->
<!--        <a :href="'tel:'+manager.phone" class="text-semibold phone-vac no-wrap" style="line-height: 35px">{{ manager.phone | VMask('# (###) ###-##-##') }}</a>-->

        <div
          :class="{'small': small}"
        >Менеджер по персоналу</div>
        <a :href="phoneLink" class="text-semibold phone-vac no-wrap" style="line-height: 35px">{{ phoneFormatted}}</a>
      </div>
    </div>


  </plate-block>

  </div>
</template>

<style scoped>

</style>
