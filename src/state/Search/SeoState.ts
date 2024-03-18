import type {DoctorInterface, ClinicInterface} from "../../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref, watch} from "vue";
import {ClinicsService, PageInfoService, PlaceLocationsService, SearchService} from "../../EastclinicVueApi";
import { useRoute } from 'vue-router'
import type {SearchResultInterface} from "../../EastclinicVueApi";
// import { DoctorsService, ScheduleService, BookingService, ScheduleRequest} from "../EastclinicVueApi";
// import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
// import { YandexMetrika } from "../composables/useYandexMetrika";
// import useCalltouch from "../composables/useCalltouch";


export default class SeoState {

    public _searchSeoResults:Ref<SearchResultInterface[]> = ref([])
    protected _searchSeoString:Ref<string> = ref('');

    constructor() {
        //init search data from url

        this._searchSeoResults = computed(() => SearchService.foundItems());
        const pageInfo = PageInfoService.getPageInfo;
        const pageType = pageInfo.type;
        this._searchSeoString.value = (pageType === 'disease' || pageType === 'service' || pageType === 'speciality' ) ? pageInfo.menutitle : '';


        watch(this._searchSeoString, async () => {
            await SearchService.searchFetch(this._searchSeoString.value);
        })

    }




    public set searchSeoString(search:string){
        //todo clear symbols
        search = search.replace(/[^0-9a-zA-ZА-ЯЁёа-я- ]+/ug, '');
        this._searchSeoString.value = search

    }
    public get searchSeoString():string{return this._searchSeoString.value;}
    public get searchSeoResults():SearchResultInterface[]{   return this._searchSeoResults.value; }

    public goSeoUrl(seoItem?:SearchResultInterface){
        let path = (seoItem?.url) ? "/" + seoItem.url : '/vrachi/';

        //clear last slash for correct work
        path = (path.slice(-1) === '/' && path !== '/vrachi/') ? path.slice(0, -1) : path;

        const currentClinic = ClinicsService.currentClinic;
        if(currentClinic?.url && seoItem?.type !== 'doc'){
            path = path  +'/' + currentClinic.url;
        }

        if(path){
            useNuxtApp().$router.push(path)
        }
    }




}


// export default new SearchState()