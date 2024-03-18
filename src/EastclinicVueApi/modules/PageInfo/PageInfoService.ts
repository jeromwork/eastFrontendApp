import PageInfoApi from './api/PageInfoApi';
import type RequestAdapterInterface from "../../interfaces/RequestAdapterInterface";
import StateManager from "../../util/StateManager";
import type ApiGetPageInfoResponseInterface from "./api/ApiGetPageInfoResponseInterface";
import type PageInfoRequest from "./api/PageInfoRequest";
import type ModxRequest from "./api/PageInfoRequest";
import type {Ref} from "vue";
import {toRef} from "vue";
import type PageInfoInterface from "../../interfaces/PageInfoInterface";
// import {createWebHistory, useRouter} from "vue-router";

const state = new StateManager();
class PageInfoService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async refreshPageInfoFromServer( request:PageInfoRequest ){

        request.with('component', 'east').with('action', 'getPageInfo')

        const {data, sessionId} = await (new PageInfoApi).get(request.with('component', 'east').getRequestData()) as ApiGetPageInfoResponseInterface;
        this.state.set('pageInfo', data.resource);
        this.state.set('sessionId', sessionId);
        if(data.currentClinicId){
            this.state.set('currentClinicId', data.currentClinicId);
        }


    }


    public get getPageInfo():PageInfoInterface{
        return this.state.get('pageInfo') as PageInfoInterface;
    }

    public getSessionId(): string | null {
        return (this.state.get('sessionId')  as string) ?? null;
    }

    typeDoctorPage(){
        return this.state.get('typeDoctorPage');
    }

    public get currentClinicId(): number | null {
        return (this.state.get('currentClinicId')) ?? null
    }

}
// const pageInfoService = new PageInfoService()
export default new PageInfoService()
