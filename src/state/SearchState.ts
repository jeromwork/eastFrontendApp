import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
import {ClinicsService, PlaceLocationsService, SearchService} from "../EastclinicVueApi";
import { useRoute } from 'vue-router'
// import { DoctorsService, ScheduleService, BookingService, ScheduleRequest} from "../EastclinicVueApi";
// import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
// import { YandexMetrika } from "../composables/useYandexMetrika";
// import useCalltouch from "../composables/useCalltouch";


type SearchSeoResult = {
    title: string;
    id: number;
    type: string;
    url: string;
}

export default class SearchState {
    public currentClinic:Ref<ClinicInterface|null> = ref(null);
    public clinics?:Ref<ClinicInterface>;

    public searchSeoResults:Ref<SearchSeoResult[]> = ref([])




    protected _searchSeoString:Ref<string> = ref('');
    protected _showClinicsList:Ref<boolean> = ref(false);
    protected _showSeoList:Ref<boolean> = ref(false);
    protected _showResultsPanel:Ref<boolean> = ref(false);

    protected _noResults:Ref<boolean> = ref(true);



    constructor() {
        //init search data from url
        if(ClinicsService.currentClinic) this.currentClinic.value = ClinicsService.currentClinic;
        if(ClinicsService.clinics)    this.clinics = ClinicsService.clinics;
        this.searchSeoResults.value = SearchService.foundItems() as SearchSeoResult[];
    }


    public selectClinic(clinic:ClinicInterface){
        let url = useRoute().path;
        if (clinic.url){

        }
        url = PlaceLocationsService.getUrlWithPlace(url, (clinic?.url) ?? '');
        this.showResultsPanel = false;

        // if(this.$router.history.$url === url) {
        //     this.hideClinicOverlay();
        // }else{
        //     if(this.$router.history.$url === '/') {
        //         url = '/vrachi' + url;
        //     }
        //     this.$router.push({path: url});
        // }
    }



    public set searchSeoString(search:string){
        this._searchSeoString.value = search
            //todo clear symbols
        SearchService.searchFetch(search);
    }
    public get searchSeoString():string{return this._searchSeoString.value;}



    public toggleShowClinicsList(show:boolean):this{
        this.setShowClinicsList(show);
        return this;
    }

    public toggleShowSeoList(show:boolean):this{
        this.setShowClinicsList(show);
        return this;
    }


    public get showClinicsList():boolean{   return this._showClinicsList.value; }
    public set showClinicsList( show:boolean ){ this.setShowClinicsList(show); }

    public get showSeoList():boolean{   return this._showSeoList.value; }
    public set showSeoList( show:boolean ){ this.setShowSeoList(show); }

    public get showResultsPanel():boolean{   return this._showResultsPanel.value; }
    public set showResultsPanel( show:boolean ){
        this._showResultsPanel.value = show;
        if (!show){
            this.setShowSeoList(false);
            this.setShowClinicsList(false);
        }
    }
    public get noResults():boolean{   return this._noResults.value; }

    public clearClinic():this{
        this.currentClinic.value = null;
        return this;
    }



    protected setShowClinicsList( show:boolean ){
        this._showClinicsList.value = show;
        this._showSeoList.value = !show;
        this._showResultsPanel.value = true;
    }
    protected setShowSeoList( show:boolean ){
        this._showSeoList.value = show;
        this._showClinicsList.value = !show;
        this._showResultsPanel.value = true;
    }


}


// export default new SearchState()