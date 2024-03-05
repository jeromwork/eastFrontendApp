

import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef} from "vue";
import ClinicsRequest from "./api/ClinicsRequest";
import ClinicsApi from "./api/ClinicsApi";
import type ClinicInterface from "../../interfaces/ClinicInterface";

const state = new StateManager();
class ClinicsService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async getClinicsFromServer( request:ClinicsRequest ){

        request.with('component', 'east_filial').with('action', 'filials/get')

        const {data} = await (new ClinicsApi).get(request.getRequestData()) ;
        this.state.set('clinics', data);
    }


    public get clinics():Ref<ClinicInterface>{
        return this.state.get('clinics') as Ref<ClinicInterface>;
    }


    public getClinic( id:number):Ref<ClinicInterface>|null{
        return (this.state.get('clinics')?.value?.[id]) ? toRef(this.state.get('clinics').value[id]) : null
    }

    public getClinicsByIds( ids:number[]):Ref<ClinicInterface>[]|null{
        if(!this.state.get('clinics')?.value) return null;
        const clinics: Ref<ClinicInterface>[] = [];

        for (const i in ids) {
            const clinicId = ids[i];
            const clinic = this.getClinic(clinicId);

            if (clinic) {
                clinics[clinicId] = clinic;
            }
        }
        return clinics.length > 0 ? clinics : null;
    }

}
export default new ClinicsService()
