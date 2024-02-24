
// import {computed, reactive, ref, toRaw} from "vue";
import PageInfoApi from './api/PageInfoApi';
import type RequestAdapterInterface from "../../interfaces/RequestAdapterInterface";
import StateManager from "../../util/StateManager";
import type ApiGetPageInfoResponseInterface from "./api/ApiGetPageInfoResponseInterface";
import type PageInfoRequest from "./api/PageInfoRequest";
import type ModxRequest from "./api/PageInfoRequest";
// import {createWebHistory, useRouter} from "vue-router";

const state = new StateManager();
export default class PageInfoService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async refreshPageInfoFromServer( request:PageInfoRequest ){


        request.with('component', 'east').with('action', 'getPageInfo')


        const {data, sessionId} = await (new PageInfoApi).get(request.with('component', 'east').getRequestData()) as ApiGetPageInfoResponseInterface;
        //
        this.state.set('pageInfo', data.resource);
        this.state.set('sessionId', sessionId);
    }


    public getPageInfo(){
        return this.state.get('pageInfo');
    }

    public getSessionId(){
        return this.state.get('sessionId');
    }

    typeDoctorPage(){
        return this.state.get('typeDoctorPage');
    }


}
