import type {DoctorInterface, ClinicInterface} from "../../EastclinicVueApi";
import type {Ref} from 'vue'
import {ref} from "vue";
import {ClinicsService, PageInfoService, PlaceLocationsService, SearchService} from "../../EastclinicVueApi";

export default class SearchState {
    public currentClinic:Ref<ClinicInterface|null> = ref(null);
    public clinics?:Ref<ClinicInterface>;
    protected _showClinicsList:Ref<boolean> = ref(false);




    constructor() {
        //init search data from url
        if(ClinicsService.currentClinic) this.currentClinic.value = ClinicsService.currentClinic;
        if(ClinicsService.clinics)    this.clinics = ClinicsService.clinics;
    }


    public selectClinic(clinic:ClinicInterface){
        let url = window.location.pathname;
        url = PlaceLocationsService.getUrlWithPlace(url, (clinic?.url) ?? '');
        useNuxtApp().$router.push(url)
    }



    public toggleShowClinicsList():this{
        this.setShowClinicsList();
        return this;
    }

    public get showClinicsList():boolean{   return this._showClinicsList.value; }
    public set showClinicsList( show:boolean ){ this.setShowClinicsList(show); }

    public clearClinic():this{
        this.currentClinic.value = null;
        this._showClinicsList.value = true;
        return this;
    }


    protected setShowClinicsList( show?:boolean ){
        if(show === undefined) show = !this._showClinicsList.value
        this._showClinicsList.value = show;
    }

}


// export default new SearchState()