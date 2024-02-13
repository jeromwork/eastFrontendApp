<template>

  <div
    :class="{'main-page': mainPage}"
    class="searchpanel__container">
    <v-overlay
      :z-index="100"
      :value="overlay"
      :class="{'transparent': mobile}"
      @click="hideAll"
    >
    </v-overlay>
    <transition name="fade">
      <div
        :class="{'mobile': focusMobile, 'active': overlay, 'main-page': mainPage}"
        class="searchpanel__search-dropdown">
        <div class="searchpanel__wrapper">
          <div class="searchpanel__mobile-close">
            <span
              v-show="focusMobile && showSearch"
              @click="hideSearchOverlay"
              class="icons closesearch"></span>
            <span
              v-show="focusMobile && showClinic"
              @click="hideClinicOverlay"
              class="icons closesearch"></span>
          </div>

          <!--search input -->
          <v-text-field
            v-show="showSearch"
            class="search-input left"
            @focus="showSearchOverlay"
            @input="onInput"
            @keydown="blockCharacters"
            @paste="blockPaste"
            :value="searchString"
            outlined
            ref="searchinput"
            label="Врачи, Болезни, Услуги"
            name="search"
            autocomplete="off"
            hide-details="auto"
          >
            <template v-slot:prepend-inner>
              <svg
                class="search-input__search" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12.5 11H11.71L11.43 10.73C12.63 9.33002 13.25 7.42002 12.91 5.39002C12.44 2.61002 10.12 0.390015 7.32001 0.0500152C3.09001 -0.469985 -0.469985 3.09001 0.0500152 7.32001C0.390015 10.12 2.61002 12.44 5.39002 12.91C7.42002 13.25 9.33002 12.63 10.73 11.43L11 11.71V12.5L15.25 16.75C15.66 17.16 16.33 17.16 16.74 16.75C17.15 16.34 17.15 15.67 16.74 15.26L12.5 11ZM6.50002 11C4.01002 11 2.00002 8.99002 2.00002 6.50002C2.00002 4.01002 4.01002 2.00002 6.50002 2.00002C8.99002 2.00002 11 4.01002 11 6.50002C11 8.99002 8.99002 11 6.50002 11Z" fill="#878FA2"/>
              </svg>
            </template>
            <template v-slot:label>
              <span class="v-label theme--light ">Поиск врача, услуги, заболевания</span>
            </template>
            <template v-slot:append>
              <span
                @click="clearInput"
                v-show="searchString"
                class=" mdi mdi-close pointer _close-button" style="transform: translateY(4px)"></span>
            </template>
          </v-text-field>

          <!-- clinic input -->
          <div
            v-show="showClinic"
            class="fake-search-input right"
            :class="{'mobile': mobile, 'active': clinicResults}"
            @click="toggleClinicOverlay"
            @input="clinicsSearch"
          >
            <svg class="fake-search-input__prepend" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.05365 18.9473C9.05365 19.5287 8.58144 20 7.99895 20C7.41645 20 6.94424 19.5287 6.94424 18.9473C6.94424 18.3658 7.41645 17.8945 7.99895 17.8945C8.58144 17.8945 9.05365 18.3658 9.05365 18.9473Z" fill="#878FA2"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 7.3692C0.5 3.29929 3.85818 0 8 0C12.1418 0 15.5 3.30035 15.5 7.3692C15.5 10.2695 13.7967 12.7771 11.3192 13.9804C9.70018 14.8068 8.752 15.6701 8.42083 16.5702C8.36071 16.7354 8.17614 16.846 8 16.846C7.82386 16.846 7.63718 16.7354 7.57706 16.5702C7.24589 15.6701 6.30087 14.8068 4.68085 13.9804C2.2044 12.7761 0.5 10.2684 0.5 7.3692Z" fill="#878FA2"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00822 11.5781C5.67164 11.5781 3.78013 9.68405 3.78013 7.36709C3.78013 5.05014 5.67164 3.15612 7.98967 3.15612C10.3077 3.15612 12.2178 5.05014 12.2178 7.36709C12.2178 9.68405 10.3262 11.5781 8.00822 11.5781ZM6.94424 6.31435C6.79589 6.20402 6.54322 6.11164 6.33924 6.36907C6.13525 6.62651 6.09816 7.0361 6.24651 7.14643C6.39487 7.25676 6.74025 7.09816 6.94424 6.84072C7.14823 6.58328 7.0926 6.42468 6.94424 6.31435ZM10.6129 5.18117C10.6228 5.12251 10.5576 5.11012 10.5344 5.16496C9.69858 7.14687 6.75314 8.0525 6.1167 7.40387C5.63999 6.91684 6.10854 6.03926 6.33894 5.67513C6.35818 5.64472 6.31977 5.60917 6.29231 5.63246C5.29813 6.47536 5.45707 7.83034 5.61601 8.26813C5.85708 8.93012 6.24651 9.20594 6.30215 9.26111C7.08903 9.95925 7.96841 9.94405 8.36649 9.89068C8.42151 9.88331 8.42384 9.80657 8.37207 9.78657C7.73641 9.5411 6.76451 8.72449 8.28638 7.93714C10.094 6.99303 10.5155 5.75367 10.6129 5.18117Z" fill="white"/>
            </svg>
            <span
              class="fake-search-input__input no-focus"
              v-if="Object.keys(currentClinic).length > 0 && !mobile || !overlay && mobile && Object.keys(currentClinic).length > 0"
            >
              <div
                class="dropdown-panel__items-list__item no-hover clinic"
                v-if="currentClinic.id !== 42"
              >
                <ClinicName
                  :name="nodeName"
                  :color="nodeColor"
                  :way="way"
                  :wayTime="wayTime"
                />
                </div>
                <div
                  class="dropdown-panel__items-list__item no-hover clinic pointer"
                  v-else
                >

                  <span >{{currentClinic.node_address}}</span>
                </div>
            </span>
            <span v-else class="fake-search-input__input"><span class="text-secondary">Выберите клинику</span></span>
            <span
              @click="clearClinic"
              v-show="showClinic && Object.keys(currentClinic).length > 0 && overlay && !mobile || mobile && !overlay && Object.keys(currentClinic).length > 0"
              class="mdi mdi-close pointer _close-button" style="transform: translateY(1px); margin-right: 10px"></span>

            <svg class="fake-search-input__append" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><path d="M9.78722 0.999052L5.90722 4.87905L2.02722 0.999052C1.93463 0.90647 1.82472 0.833031 1.70376 0.782926C1.5828 0.732821 1.45315 0.707031 1.32222 0.707031C1.19129 0.707031 1.06164 0.732821 0.940673 0.782926C0.819709 0.833031 0.709798 0.90647 0.617216 0.999052C0.524634 1.09163 0.451194 1.20154 0.401089 1.32251C0.350984 1.44347 0.325195 1.57312 0.325195 1.70405C0.325195 1.83498 0.350984 1.96463 0.401089 2.0856C0.451194 2.20656 0.524634 2.31647 0.617216 2.40905L5.20722 6.99905C5.59722 7.38905 6.22722 7.38905 6.61722 6.99905L11.2072 2.40905C11.2999 2.31654 11.3735 2.20665 11.4236 2.08568C11.4738 1.9647 11.4997 1.83502 11.4997 1.70405C11.4997 1.57308 11.4738 1.4434 11.4236 1.32243C11.3735 1.20145 11.2999 1.09157 11.2072 0.999052C10.8172 0.619052 10.1772 0.609052 9.78722 0.999052Z" fill="#757F93"></path></svg>


          </div>
        </div>

        <SearchFastLinks
          v-if="fastLinks && !overlay"
        />
        <!-- overlay -->
        <div
          v-show="overlay"
          class="searchpanel__results">
          <div
            v-show="leftPanel"
            class="searchpanel__results__left-side">
            <transition name="fade">
              <div
                v-show="searchResults"
                class="searchpanel__results__items">

                <div
                  v-for="item in items"
                  @click="chooseItem(item)"
                  v-html="textHighlighting(item.title)"
                  class="dropdown-panel__items-list__item pointer"></div>
              </div>
            </transition>
          </div>


          <transition name="fade">
            <div
              v-show="clinicResults"
              class="searchpanel__results__right-side">
              <div
                v-for="clinic in clinics"
                @click="selectClinicItem(clinic)"
              >
                <div
                  class="dropdown-panel__items-list__item clinic pointer"
                  :class="{'active': (currentClinic.id === clinic.id && activeClass && mobile)}"
                  v-if="clinic.id !== 42"
                >
                  <ClinicName
                    :name="clinic.title"
                    :color="toStringValue(clinic.color)"
                    :way="toStringValue(clinic.way)"
                    :wayTime="toStringValue(clinic.way_time)"
                  />

                </div>
                <div
                  class="dropdown-panel__items-list__online-item clinic pointer"
                  v-else
                >
                  <div class="dropdown-panel__items-list__online-item__icon"></div>
                  <div class="dropdown-panel__items-list__online-item__text">
                    <div class="dropdown-panel__items-list__online-item__text_header text-semibold">Врачи онлайн</div>
                    <div class="dropdown-panel__items-list__online-item__text_desc">Быстрая помощь</div>
                  </div>
                  <div class="dropdown-panel__items-list__online-item__forward">
                    <span class="icons forward" style="width: 10px; filter: contrast(0.1)"></span>
                  </div>

                </div>
              </div>

            </div>
          </transition>
          <transition name="fade">
            <div
              v-show="noResults"
              class="searchpanel__results__no-results">
              <div class="searchpanel__results__no-results__search-image"></div>
              <div class="searchpanel__results__no-results__search-header text-semibold">По вашему запросу ничего не найдено</div>
              <div class="searchpanel__results__no-results__search-desc text-secondary">Попробуйте изменить запрос или перейдите на страницу врачей</div>
              <div class="searchpanel__results__no-results__search-button">
                <ec-button
                  @click="goToDoctorsPage"
                  class="primary"
                >Посмотреть врачей</ec-button>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import EcButton from "../shared/EcButton.vue";
  import SearchFastLinks from "./SearchFastLinks.vue";
  import {createLogger} from "vuex";
  import ClinicName from "../Clinic/ClinicName.vue";

  export default {
    name: "SearchInput",
    components:{
      ClinicName,
      SearchFastLinks,
      EcButton

    },
    props:{
      fastLinks: Boolean
    },
    data:() => ({
      overlay: false,
      activeClass: true,
      searchString: '',
      clinicString: '',
      searchResults: false,
      searchDefaultItems: [],
      clinicResults: false,
      noResults: false,
      mobile: false,
      focusMobile: false,
      showSearch: true,
      showClinic: true,
      clearButton: false,
      items: [],
      clinics: [],
      leftPanel: true,
    }),
    mounted() {
      this.mobileDetect();
      window.addEventListener('resize', this.mobileDetect)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.mobileDetect)
    },
    created() {
      this.search('');
      this.searchString = this.menuTitle;
    },
    computed: {
      // leftPanel() {
      //     return (this.searchResults || !this.mobile || this.searchResults && this.items);
      // },
      healthItem() {
        return this.$store.getters['pageInfo/getResourceInfo'];
      },
      mainPage() {
        return (this.healthItem?.id === 1)
      },
      menuTitle(){
        // console.log(healthItem)
        if(this.healthItem?.template === 120 ) {
          if(this.healthItem?.parents[6766] || this.healthItem?.parents[3703] || this.healthItem?.parents[4] || this.healthItem?.parents[6]) {
            return (this.healthItem?.menutitle) ? this.healthItem?.menutitle.trim() : this.healthItem?.pagetitle.trim();
            // return {id:healthItem.id, title:(healthItem.menutitle.trim()) ? healthItem.menutitle.trim() : healthItem.title}
          }
        } else {
          if(this.healthItem?.parents[6]) {
            return (this.healthItem?.menutitle) ? this.healthItem?.menutitle.trim() : this.healthItem?.pagetitle.trim();
            // return {id:healthItem.id, title:(healthItem.menutitle.trim()) ? healthItem.menutitle.trim() : healthItem.title}
          }
        }
      },
      currentClinic() {
        return (this.$store.getters['Clinics/getCurrentClinic']) ? this.$store.getters['Clinics/getCurrentClinic'] : {};
      },
      nodeName() {
        return (this.currentClinic.node_address) ? this.currentClinic.node_address : '';
      },
      nodeColor() {
        return (this.currentClinic.node_color) ? this.currentClinic.node_color?.toString() : '';
      },
      wayTime() {
        return (this.currentClinic.way_time) ? this.currentClinic.way_time?.toString() : '';
      },
      way() {
        return (this.currentClinic.way) ? this.currentClinic.way?.toString() : '';
      }
    },
    watch: {
      mobile() {
        if (this.overlay) this.overlay = false;
        if (this.focusMobile) this.focusMobile = false;
        if (this.clinicResults) this.clinicResults = false;
        if (!this.showSearch) this.showSearch = true;
        if (!this.showClinic) this.showClinic = true;
      },
      searchString() {
        this.search(this.searchString);
      }
    },
    methods: {
      overlayShow() {
        this.overlay = true;

        setTimeout(() => {
          let html = document.getElementsByTagName('html')[0];
          html.scrollTop = 0;
        }, 50);
      },
      blockCharacters(event) {
        //viva chatGPT!
        if (event.key?.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '') === '') {
          event.preventDefault();
        }
        if (event.key === 'Backspace') {
          if (event.repeat) {
            this.searchString = '';
          }
        }
      },
      toStringValue(item) {
        return (item) ? item.toString() : '';
      },
      blockPaste(event) {
        // Get the pasted text from the clipboard
        const clipboardText = event.clipboardData.getData('text').replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '');
        // Check if the pasted text contains any blocked characters
        if (clipboardText=== '') {
          // Prevent the pasted text from being entered in the textarea
          event.preventDefault();
        }
      },
      onInput(val){
        this.searchString = val.trimStart();
        this.toggleSearchOverlay();

      },
      toggleSearchOverlay() {
        if(this.searchString ) {

          this.overlay = true;
          this.searchResults = true;
          if(!this.items) {
            this.overlay = false;
            this.searchResults = false;
          }
        } else {
          this.search('');
          this.searchResults = true;
        }
      },
      async search(string, goal) {
        if(string === this.menuTitle) return ;
        if(Object.keys(this.searchDefaultItems).length === 0) {
          await this.$store.dispatch('Search/Health/search', {searchString:'', manualInput:(this.overlay), isMobile:(this.mobile)});
          this.searchDefaultItems = this.$store.getters['Search/Health/all'];
        }
        if(string !== '') {
          await this.$store.dispatch('Search/Health/search', {searchString:string, manualInput:(this.overlay), isMobile:(this.mobile), goal:goal})
        }
        let items = (string === '') ? this.searchDefaultItems : this.$store.getters['Search/Health/all'];
        if(Object.keys(items).length > 0){
          this.items = items;
          this.searchResults = true;
          this.noResults = false;
          this.leftPanel = true;
        } else {
          //console.log('else')
          this.searchResults = false;
          this.leftPanel = false;
          this.noResults = true;
        }
      },
      async clinicsSearch() {
        await this.$store.dispatch('Clinics/search')
        let items = this.$store.getters['Clinics/getSearchDataIdTitle']('', 'sort_metro');

        if(items){
          this.clinics = items;
        }
      },
      chooseItem(item) {
        //this.searchString = item.title;
        this.items = [];
        this.selectHealthItem(item);
        this.hideSearchOverlay();
      },
      showSearchOverlay(e) {
        if(this.searchString === this.menuTitle) {
          this.overlay = true;
          this.searchResults = true;
        } else if(this.searchString) {
          this.overlay = true;
          this.searchResults = true;
        }
        if(this.mobile) {
          this.overlayShow();
          this.searchResults = true;
        }
        this.overlay = true;
        this.searchResults = true;
        this.clearButton = true;
        this.clinicResults = false;
        this.showMobileVersion('search');
      },
      hideSearchOverlay(e) {
        if(e?.relatedTarget?.tagName === 'INPUT') {
          this.searchResults = true;
          this.overlay = true;
        } else {
          this.searchResults = false;
          this.overlay = false;

        }
        if(this.menuTitle) {
          //console.log('menutitle')
          this.searchString = this.menuTitle;
        }
        this.clearButton = false;
        this.hideMobileVersion();
      },
      toggleClinicOverlay(e) {
        if(this.clinicResults) {
          this.hideClinicOverlay();
        } else {
          this.showClinicOverlay(e);
        }
      },
      showClinicOverlay(e) {
        if(e?.target.classList.value.includes("_close-button")) {
          return this.clinicsSearch();
        }
        this.clinicsSearch();
        this.showMobileVersion('clinic');
        this.noResults = false;
        this.overlay = true;
        this.searchResults = false;
        setTimeout(()=>{
          if(!this.mobile) {
            this.leftPanel = true;
          }
          this.clinicResults = true;
        }, 100);
      },
      hideClinicOverlay() {
        this.overlay = false;
        this.clinicResults = false;
        this.hideMobileVersion();
      },
      hideAll() {
        this.searchResults = false;
        this.clinicResults = false;
        this.overlay = false;
        this.hideMobileVersion();
      },
      clearInput() {
        this.searchString = '';
        this.search('');
        this.leftPanel = false;
        this.searchResults = true;
        if(!this.overlay) {
          this.showSearchOverlay();
        }
        // this.overlay = false;
        // this.selectHealthItem();
      },
      clearClinic() {
        this.selectClinicItem();
        this.overlay = false;
      },
      showMobileVersion(input) {
        if(this.mobile) {
          this.focusMobile = true;
          this.showSearch = (input === 'search');
          this.showClinic = (input === 'clinic');
          this.leftPanel = (input !== 'clinic');
        }
      },
      hideMobileVersion() {
        if(this.mobile) {
          this.focusMobile = false
          this.showSearch = true;
          this.showClinic = true;
        }
      },
      mobileDetect() {
        this.mobile = window.innerWidth <= 680;
      },
      textHighlighting(inputString) {
        // console.log(string, this.searchString)
        const searchString = (this.searchString) ? this.searchString.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '') : '';
        let matchString = inputString.match(new RegExp( searchString, 'gi')),
          space = new RegExp( ' ', 'g');
        if(matchString) {
          return inputString.replace(space, '&nbsp;').replace(matchString[0], `<span class="main-color">${matchString[0]}</span>`);
        } else {
          return inputString;
        }
      },
      selectHealthItem(searchItem){
        let path = '';
        if(searchItem?.url){
          path = "/" + searchItem.url
          // this.$router.push({path: '/'+ searchItem.url});
          // return;
        }else{
          //если не выбрано ничего, очищаем и переходим на родительскую страницу
          // console.log('ничего не выбрано')
          const healthUrl= this.$store.getters['pageInfo/getResourceUrl'];
          path = '/vrachi/';
        }
        // console.log(path)
        //для одинаковой работы, удаляем слэш в конце, если есть
        path = (path.slice(-1) === '/' && path !== '/vrachi/') ? path.slice(0, -1) : path;

        const currentClinic = this.$store.getters['Clinics/getCurrentClinic'];
        if(currentClinic?.url && searchItem?.type !== 'doc'){
          //удаляем из роута url предыдущей клиники
          path = path  +'/' + currentClinic.url;
        }

        if(path){
          this.search(searchItem.title, true);
          this.$router.push({path: path});
        }

      },
      selectClinicItem(selectedClinic){
        this.activeClass = false;
        let url = this.$router.history.$url;

        if( selectedClinic?.url ){
          url = this.$store.getters['PlaceLocations/getUrlByPlace'](this.$route.path, selectedClinic.url);
        }else{
          url = this.$store.getters['PlaceLocations/getUrlWithoutPlace'](this.$route.path);
        }

        if(this.$router.history.$url === url) {
          this.hideClinicOverlay();
        }else{
          if(this.$router.history.$url === '/') {
            url = '/vrachi' + url;
          }
          this.$router.push({path: url});
        }
      },
      goToDoctorsPage() {
        if(this.$router.history.$url === '/vrachi') {
          this.hideAll();
        } else {
          this.$router.push({path: '/vrachi'});
        }

      }
    },
  }
</script>
