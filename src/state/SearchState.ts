import type {DoctorInterface, ClinicInterface} from "../EastclinicVueApi";
import type {Ref} from 'vue'
import {computed, ref} from "vue";
// import { DoctorsService, ScheduleService, BookingService, ScheduleRequest} from "../EastclinicVueApi";
// import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
// import { YandexMetrika } from "../composables/useYandexMetrika";
// import useCalltouch from "../composables/useCalltouch";




export default class SearchState {
    public currentClinic:Ref<ClinicInterface|null> = ref(null);
    public overlay:Ref<boolean> = ref(false);

    protected _searchSeoString:Ref<string> = ref('');
    protected _showClinicsList:Ref<boolean> = ref(false);

    public set searchSeoString(search:string){this._searchSeoString.value = search}
    public get searchSeoString():string{return this._searchSeoString.value;}


    public toggleShowClinicsList(show:boolean):this{
        this._showClinicsList.value = show;
        return this;
    }

    public get showClinicsList():boolean{   return this._showClinicsList.value; }


    public clearClinic():this{
        this.currentClinic.value = null;
        return this;
    }




}


// export default new SearchState()