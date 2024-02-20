
// import {computed, reactive, ref, toRaw} from "vue";
import PageInfoApi from '../../../api/PageInfo/PageInfoApi';
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../util/StateManager";
import ApiGetPageInfoResponseInterface from "../../../api/PageInfo/ApiGetPageInfoResponseInterface";
// import {createWebHistory, useRouter} from "vue-router";

export default class PageInfoService{
    private state: StateManager;

    constructor() {
        this.state = new StateManager();
    }
    public async getPageInfoFromServer( request:Object = {} ){


        // const previousUrl = (createWebHistory()?.state?.back) ? createWebHistory().state.back : '/';
        // const currentUrl = (useRouter())?.currentRoute?.value?.path;

        const requestData = {...request,
            component:'east',
            action:'getPageInfo',

        };
        const {data, sessionId} = await (new PageInfoApi).get(requestData) as ApiGetPageInfoResponseInterface;

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
