
// import {computed, reactive, ref, toRaw} from "vue";
import PageInfoApi from '../../../api/PageInfo/PageInfoApi';
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../../util/StateManager";
import type ApiGetPageInfoResponseInterface from "./api/ApiGetPageInfoResponseInterface";
// import {createWebHistory, useRouter} from "vue-router";

export default class PageInfoService{
    private state: StateManager;
    protected fetch = null;

    constructor() {
        this.state = new StateManager();
    }
    public async getPageInfoFromServer( request:Object = {} ){


        const requestData = {...request,
            component:'east',
            action:'getPageInfo',

        };

        // useFetchEastApi()


        const {data, sessionId} = await (new PageInfoApi).get(requestData) as ApiGetPageInfoResponseInterface;
        //
        // this.state.set('pageInfo', data.resource);
        // this.state.set('sessionId', sessionId);
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

    withFetch(f:any):this{
        this.fetch = f
        return this;
    }

}
