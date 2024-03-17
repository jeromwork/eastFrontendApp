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

    protected _noResults:Ref<boolean> = ref(false);



    constructor() {
        //init search data from url
        if(ClinicsService.currentClinic) this.currentClinic.value = ClinicsService.currentClinic;
        if(ClinicsService.clinics)    this.clinics = ClinicsService.clinics;

        this.searchSeoResults.value = SearchService.foundItems() as SearchSeoResult[];
    }


    public selectClinic(clinic:ClinicInterface){
        let url = window.location.pathname;
        url = PlaceLocationsService.getUrlWithPlace(url, (clinic?.url) ?? '');
        this.showResultsPanel = false;
        useNuxtApp().$router.push(url)
    }



    public set searchSeoString(search:string){
        this._searchSeoString.value = search
            //todo clear symbols
        SearchService.searchFetch(search);
    }
    public get searchSeoString():string{return this._searchSeoString.value;}



    public toggleShowClinicsList():this{
        this.setShowClinicsList();
        return this;
    }

    public toggleShowSeoList():this{
        this.setShowSeoList();
        return this;
    }


    public get showClinicsList():boolean{   return this._showClinicsList.value; }
    public set showClinicsList( show:boolean ){ this.setShowClinicsList(show); }

    public get showSeoList():boolean{   return this._showSeoList.value; }
    public set showSeoList( show:boolean ){ this.setShowSeoList(show); }

    public get showResultsPanel():boolean{   return this._showResultsPanel.value; }
    public set showResultsPanel( show:boolean ){
        console.log(show)
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



    protected setShowClinicsList( show?:boolean ){
        if(show === undefined) show = !this._showClinicsList.value
        this._showClinicsList.value = show;
        this._showSeoList.value = false;
        this._showResultsPanel.value = show;
    }
    protected setShowSeoList(show?:boolean){
        if(show === undefined) show = !this._showSeoList.value
        this._showSeoList.value = show;
        this._showClinicsList.value = false;
        this._showResultsPanel.value = show;
    }


}


// export default new SearchState()