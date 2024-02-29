import ScheduleApi from './api/ScheduleApi';
import StateManager from "../../util/StateManager";
import type ApiScheduleResponseInterface from "./api/ApiScheduleResponseInterface";
import type PageInfoRequest from "./api/PageInfoRequest";
import type ModxRequest from "./api/PageInfoRequest";
import type {Ref} from "vue";
import {toRef} from "vue";
import type ScheduleInterface from "../../interfaces/ScheduleInterface";

//singleton state
const state = new StateManager();
class PageInfoService{
    private state: StateManager;

    constructor() {
        this.state = state;
    }

    public async refreshPageInfoFromServer( request:PageInfoRequest ){

        request.with('component', 'east').with('action', 'getPageInfo')

        const { schedules } = await (new ScheduleApi).get(request.with('component', 'east').getRequestData()) as ApiScheduleResponseInterface;

        this.state.set('pageInfo', schedules);
    }


    public get getSchedule():Ref<ScheduleInterface>{
        return this.state.get('pageInfo') as Ref<ScheduleInterface>;
    }

    public getSessionId(){
        return this.state.get('sessionId');
    }

    typeDoctorPage(){
        return this.state.get('typeDoctorPage');
    }


}
// const pageInfoService = new PageInfoService()
export default new PageInfoService()
