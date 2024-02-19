
// import {computed, reactive, ref, toRaw} from "vue";
import DoctorsApi from '../../../api/Doctors/DoctorsApi';
import DoctorsModxApi from '../../../api/Doctors/DoctorsModxApi';
import MultiStateManager from "../util/MultiStateManager";//probably to use one state manage for many services - its global state
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../util/StateManager";
import ApiDoctorsResponseInterface from "../../../api/Doctors/ResponceInterfaces/ApiDoctorsResponseInterface";

const globalMultiState = new MultiStateManager();
export default class DoctorsService{
    private state: StateManager;
    private modxApiUrl:string = '';
    protected isModxApi:boolean = false;

    constructor(state?: StateManager) {
        if(state){
            this.state = state;
        }else{
            this.state = globalMultiState;
        }

    }
    async getItemsFromServer(request:RequestAdapterInterface){

        let response;
        if(this.isModxApi){
            response = await (new DoctorsModxApi).get(request.getRequestData()) as ApiDoctorsResponseInterface;
        }else {
            response = await (new DoctorsModxApi).get(request.getRequestData()) as ApiDoctorsResponseInterface;
        }
        //todo set response doctors data to state
        this.state.setItems(response.doctors);
    }
    items(condition?:any) {
        return this.state.getItems();
        return [];
    };

    count() {
        // return this.state.count();
    };

    public useModxApiUrl( url:string ):this{
        this.modxApiUrl = url;
        return this;
    }

    public useModxApi():this{
        this.isModxApi = true;
        return this;
    }

}
