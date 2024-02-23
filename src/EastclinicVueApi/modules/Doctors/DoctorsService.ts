
// import {computed, reactive, ref, toRaw} from "vue";
import DoctorsApi from './api/DoctorsApi';
import DoctorsModxApi from '../../../api/Doctors/DoctorsModxApi';
import MultiStateManager from "../../util/MultiStateManager";//probably to use one state manage for many services - its global state
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../../util/StateManager";
import type ApiDoctorsResponseInterface from "./api/ResponceInterfaces/ApiDoctorsResponseInterface";

const globalMultiState = new MultiStateManager();
export default class DoctorsService{
    private state: StateManager;
    private stateName: string = 'default';
    private modxApiUrl:string = '';
    protected isModxApi:boolean = false;

    constructor(stateName:string = 'default', state?: StateManager) {
        if(state){
            this.state = state;
        }else{
            this.state = globalMultiState;
        }
        this.stateName = stateName;

    }
    async getItemsFromServer(request:RequestAdapterInterface){

        let response;
        if(this.isModxApi){
            response = await (new DoctorsModxApi).get(request.getRequestData()) as ApiDoctorsResponseInterface;
        }else {
            response = await (new DoctorsModxApi).get(request.getRequestData()) as ApiDoctorsResponseInterface;
        }
//todo add to state info type doctor page: list, single doctor, dismiss doctor from server
        if(response.doctors && response.doctors.length === 1){
            this.state.set('typeDoctorPage', 'single');
        }else {
            this.state.set('typeDoctorPage', 'list');
        }

        this.state.setItems(response.doctors);
    }
    items(condition?:any) {
        return this.state.getItems();
    };

    count() {
        // return this.state.count();
    };

    typeDoctorPage(){
        return this.state.get('typeDoctorPage');
    }
    public useModxApiUrl( url:string ):this{
        this.modxApiUrl = url;
        return this;
    }

    public useModxApi():this{
        this.isModxApi = true;
        return this;
    }

}
