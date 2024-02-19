
// import {computed, reactive, ref, toRaw} from "vue";
import DoctorsApi from '../../../api/Doctors/DoctorsApi';
import MultiStateManager from "../util/MultiStateManager";//probably to use one state manage for many services - its global state
import type RequestAdapterInterface from "../../../api/RequestAdapterInterface";
import StateManager from "../util/StateManager";

const globalMultiState = new MultiStateManager();
export default class DoctorsService{
    private state: StateManager;

    constructor(state?: StateManager) {
        if(state){
            this.state = state;
        }else{
            this.state = globalMultiState;
        }

    }
    async getItemsFromServer(request:RequestAdapterInterface){

        const res = await (new DoctorsApi).get(request.getRequestData())
        if(res.data ){

            return res.data;
        }else {
        //     todo handle errors from server
        }
    }
    items(condition:any) {
        return this.state.getItems();
    };

    count() {
        // return this.state.count();
    };



}
