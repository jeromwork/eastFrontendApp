

import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef} from "vue";
import ClinicsRequest from "./api/ClinicsRequest";
import ClinicsApi from "./api/ClinicsApi";
import type ClinicInterface from "../../interfaces/ClinicInterface";

const state = new StateManager();
class PageInfoService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async getClinicsFromServer( request:ClinicsRequest ){

        request.with('component', 'east').with('action', 'getPageInfo')

        const {data, sessionId} = await (new ClinicsApi).get(request.with('component', 'east').getRequestData()) ;

        this.state.set('clinics', data.resource);
    }


    public get clinics():Ref<ClinicInterface>{
        return this.state.get('clinics') as Ref<ClinicInterface>;
    }


    public getClinic( id:number):Ref<ClinicInterface>|null{
        return (this.state.get('clinics')?.value?.[id]) ? toRef(this.state.get('clinics').value[id]) : null
    }

    public getClinicByIds( ids:number[]):Ref<ClinicInterface>[]|null{
        if(!this.state.get('clinics')?.value) return null;
        const clinics: Ref<ClinicInterface>[] = [];

        for (const i in ids) {
            const clinic = this.getClinic(ids[i]);

            if (clinic) {
                clinics.push(clinic);
            }
        }
        return clinics.length > 0 ? clinics : null;
    }

}
// const pageInfoService = new PageInfoService()
export default new PageInfoService()
