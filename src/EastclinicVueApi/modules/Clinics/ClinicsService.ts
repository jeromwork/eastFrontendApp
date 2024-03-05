

import StateManager from "../../util/StateManager";
import type {Ref} from "vue";
import {toRef, ref} from "vue";
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


    public getClinic( id:number):ClinicInterface|null{
        return (this.state.get('clinics')?.[id]) ? this.state.get('clinics')[id] : null
    }

    public getClinicsByIds(ids: number[]): { [key: number]: ClinicInterface } | null {

        if (!this.state.get('clinics')) return null;
        const clinics: { [key: number]: ClinicInterface } = {};

        for (const i in ids) {
            const clinicId = ids[i];
            const clinic = this.getClinic(clinicId) as ClinicInterface;
            if (clinic) {
                clinics[clinicId] = clinic;
            }
        }

        return Object.keys(clinics).length > 0 ? clinics: null;
    }


    public setCurrentClinic(clinic:ClinicInterface|number):this{
        if (typeof clinic === 'number') {
            const clinicFind= this.getClinic(clinic)
            if(clinicFind) this.state.set('currentClinic', clinicFind);
        } else {
            this.state.set('currentClinic', clinic);
        }
        return this;
    }

}
export default new ClinicsService()
