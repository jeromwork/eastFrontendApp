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
const mainPhone:string = '+74951747474';
const vacancyPhone:string = '+74951871791';
const vacancyFormattedPhone:string = '+7 (495) 187-17-91';
const formattedMainPhone:string = '+7 (495) 174-74-74';
const whatsAppPhone:{ [key: number]: string } = {
    0: 'https://wa.me/79150800638',
    1: 'https://wa.me/79150800638',
    2: 'https://wa.me/79169200710', //mytishchi
    3: 'https://wa.me/79175851624', //luybercy
    6: 'https://wa.me/79175841608', //belyaevo
    18: 'https://wa.me/79932623498', // odintsovo
    23: 'https://wa.me/79154501608', // univer
    45: 'https://wa.me/79932743530', //volokolamskaya
}

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

    public get pageInfo():PageInfoInterface{
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

    public getMainPhone():string {
        return (this.isVacancyPage()) ? mainPhone : vacancyPhone
    }
    public getLinkPhone():string {
        return (this.isVacancyPage()) ? 'tel:' + vacancyPhone : 'tel:' + mainPhone
    }
    public getFormattedMainPhone():string {
        return (this.isVacancyPage()) ? vacancyFormattedPhone : formattedMainPhone
    }
    public getWhatsAppPhone():string {
        return (this.currentClinicId && whatsAppPhone[this.currentClinicId]) ? whatsAppPhone[this.currentClinicId] : whatsAppPhone[0]
    }


    protected isVacancyPage() {
        return ( this.pageInfo.id === 12 || this.pageInfo.parents[12])
    }
}
// const pageInfoService = new PageInfoService()
export default new PageInfoService()
