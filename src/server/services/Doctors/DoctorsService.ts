
import {computed, reactive, ref, toRaw} from "vue";
// import DoctorsApi from '../api/DoctorsApi';
import MultiStateManager from "~/server/services/util/MultiStateManager";//probably to use one state manage for many services - its global state


export default class DoctorsService{
    private state = new MultiStateManager();
    constructor() {
    }
    async getItemsFromServer(request:Object){
        console.log(request)
    }
    items(condition:any) {
        // return this.state.getItems();
    };

    count() {
        // return this.state.count();
    };



}
