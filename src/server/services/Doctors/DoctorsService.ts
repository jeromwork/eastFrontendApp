
// import {computed, reactive, ref, toRaw} from "vue";
import DoctorsApi from '../../../api/Doctors/DoctorsApi';
import DoctorsModxApi from '../../../api/Doctors/DoctorsModxApi';
import MultiStateManager from "../util/MultiStateManager";//probably to use one state manage for many services - its global state
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../util/StateManager";

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
            console.log(request)
            response = await (new DoctorsModxApi).get(request.getRequestData())

        }else {
            response = await (new DoctorsModxApi).get(request.getRequestData())
        }

        console.log(response)

    }
    items(condition:any) {
        return this.state.getItems();
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
