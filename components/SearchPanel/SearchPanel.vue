<template>
  <section class="searchpanel" id="searchpanel">
<!--    <h1 class="text-center main-Header">Запишитесь на приём к врачу онлайн</h1>-->
    <div class="searchpanel__inputs-group text-center">
      <SearchInput
        :fastLinks="fastLinks"
      />
<!--        <SearchInputModx-->
<!--          store="Search/Health"-->
<!--          placeholder="Врачи, Болезни, Услуги"-->
<!--          @searchSelect="selectHealthItem($event)"-->
<!--          :value="healthByUrl"-->
<!--          :groupsTitles="{spec:'Специальность', specChild : 'Детский доктор', serv:'Услуга', dis:'Болезнь', doc:'Доктор' }"-->
<!--        />-->
<!--        <SearchInputModx-->
<!--          store="Clinics"-->
<!--          placeholder="Выберите ближайшую клинику"-->
<!--          :value="currentClinic"-->
<!--          :metro="true"-->
<!--          @searchSelect="selectClinicItem($event)"-->
<!--          sortField="sort_metro"-->
<!--        />-->

<!--        <ec-button-->
<!--          large-->
<!--          @click="search"-->
<!--          class="search primary">Найти-->
<!--        </ec-button>-->
      <div class="searchpanel__inputs-group">
        <div class="searchpanel__choose_option"></div>
      </div>
    </div>

  </section>

</template>

<script>
  //есть 2 метода оповещения о изменении поисковых данных
  //1 - searchSelect - при выборе опции - поиск сразу
  //2 - search - при клике на кнопку поиска - поиск по запросу



  // import SearchInput from '~/widgets/SearchPanel/SearchInput';
  import SearchInputModx from '~/components/SearchPanel/SearchInputModx';
  import EcButton from '~/components/shared/EcButton.vue';

  import InputSelect from "../InputSelect";
  import Vue from "vue";
  import SearchInput from "./SearchInput.vue";
    export default {
        name: "SearchPanel",
      components:{
        SearchInput,
        InputSelect,
        SearchInputModx,
        EcButton
      },
      props: {
        fastLinks: Boolean
      },
      data: () => ({
        // apiUrlHealth:'api/search/clinic',
        apiUrlHealth:'api/search/health',
        // apiUrlClinic:'api/search/clinic',
        apiUrlClinic:'api/search/clinic',
        searchData: {},


      }),
      computed:{
        // searchData:()=>{
        //   return this.searchData
        // }


        healthByUrl(){
          let healthItem = this.$store.getters['pageInfo/getResourceInfo'];
          if(healthItem?.template == 120 ){
            if(healthItem.parents[6766] || healthItem.parents[3703] || healthItem.parents[4]){
              return {id:healthItem.id, title:(healthItem.menutitle.trim()) ? healthItem.menutitle.trim() : healthItem.title}
            }else{

              return;
            }
          }
        },
        currentClinic(){
          let currentClinic = this.$store.getters['Clinics/getCurrentClinic'];
          if(currentClinic){
            return {
              id: currentClinic.id,
              title: currentClinic.node_address,
              url: currentClinic.url,
              way: currentClinic.way,
              way_time: currentClinic.way_time
            };
          }else{
            return ;
          }

        },

      },
      created() {
        //console.log(this.$route.fullPath);
        // this.$store.dispatch('Search/Health/getItemByUrl');
      },
      methods:{
        search(){
          //console.log({...this.searchData})
        this.$emit('search', {...this.searchData});
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
          if(currentClinic?.url){
            //удаляем из роута url предыдущей клиники
            path = path  +'/' + currentClinic.url;
          }

          if(path){
            this.$router.push({path: path});
          }

        },
        selectClinicItem(selectedClinic){
          //если клиника не выбрана (очистили поле) переходим на страницу без клиники, удаляем адрес из url
          const currentClinic = this.$store.getters['Clinics/getCurrentClinic'];
          let clinicMatches;
          // console.log(currentClinic)
          let path = '';
          //возможно уже была выбрана клиник до этого
          if(currentClinic){
            let regExp = new RegExp('('+ currentClinic?.url + ')$', 'gm');
            clinicMatches = this.$route.path.match(regExp);
            // console.log(resourceUrl.match(regExp))
          }
          // todo убрать выбыр сокола на странице соколовской
          //убираем из url клинику (если ее нет то и не удалится часть адреса)
          // resourceUrl = (clinicMatches) ? resourceUrl.replace(currentClinicUrl, '') : resourceUrl;
          // пока убрал && clinicMatches потому что выбирается сокол на соколовской
          if(currentClinic?.url){
            //удаляем из роута url предыдущей клиники
            path = this.$route.path.replace('/'+currentClinic.url, '');
          }else {
            path = this.$route.path;
          }
          // еще раз удаляем
          path = (path.slice(-1) === '/' && path !== '/vrachi/') ? path.slice(0, -1) : path;
          path = (!path) ? '/vrachi/' : path;
          // console.log(path)
          if(selectedClinic?.url){
            //и переходим на выбранную клинику
            path += '/' + selectedClinic.url;

          }
          this.$router.push({path: path});
        },

        searchSelect(searchItem, type){
          if(searchItem && searchItem.id && type){
            let sd = {...this.searchData};
            sd[type] = searchItem.id;
            this.searchData = sd;
            this.$emit('searchSelect', this.searchData);
          }else{
            let sd = {...this.searchData};
            if(sd[type]){
              delete sd[type];
            }
            this.searchData = sd;
          }
        },

      },
    }
</script>

<style>
  fieldset {
    border: 0;
  }
  .v-input__slot {
    border-radius: 15px;
    display: flex;
    height: 55px;
  }
  .v-select__slot {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
