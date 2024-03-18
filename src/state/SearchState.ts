import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref, watch} from "vue";
import {ClinicsService, PlaceLocationsService, SearchService} from "../EastclinicVueApi";
import { useRoute } from 'vue-router'
import type {SearchResultInterface} from "../EastclinicVueApi";
// import { DoctorsService, ScheduleService, BookingService, ScheduleRequest} from "../EastclinicVueApi";
// import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
// import { YandexMetrika } from "../composables/useYandexMetrika";
// import useCalltouch from "../composables/useCalltouch";


export default class SearchState {
    public currentClinic:Ref<ClinicInterface|null> = ref(null);
    public clinics?:Ref<ClinicInterface>;

    public _searchSeoResults:Ref<SearchResultInterface[]> = ref([])




    protected _searchSeoString:Ref<string> = ref('');
    protected _showClinicsList:Ref<boolean> = ref(false);
    protected _showSeoList:Ref<boolean> = ref(false);
    protected _showResultsPanel:Ref<boolean> = ref(false);

    protected _noResults:Ref<boolean> = ref(false);



    constructor() {
        //init search data from url
        if(ClinicsService.currentClinic) this.currentClinic.value = ClinicsService.currentClinic;
        if(ClinicsService.clinics)    this.clinics = ClinicsService.clinics;

        this._searchSeoResults.value = SearchService.foundItems() as SearchResultInterface[];
        watch(this._searchSeoString, async () => {
            await SearchService.searchFetch(this._searchSeoString.value);
            this._noResults.value = !(this._searchSeoResults.value.length > 0)
        })

    }


    public selectClinic(clinic:ClinicInterface){
        let url = window.location.pathname;
        url = PlaceLocationsService.getUrlWithPlace(url, (clinic?.url) ?? '');
        this.showResultsPanel = false;
        useNuxtApp().$router.push(url)
    }



    public set searchSeoString(search:string){
        //todo clear symbols
        this._searchSeoString.value = search



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


    public get searchSeoResults():SearchResultInterface[]{   return this._searchSeoResults.value; }
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

    public selectSeoItem(seoItem?:SearchResultInterface){
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