
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
        if(this.isModxApi){
            const response = await (new DoctorsModxApi).get(request.getRequestData())

        }else {
            const res = await (new DoctorsApi).get(request.getRequestData())
            if( res.data ){

                return res.data;
            }else {
                //     todo handle errors from server
            }
        }

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
