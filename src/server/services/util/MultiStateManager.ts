import { ref, reactive, computed, toRef } from 'vue';
import StateManager from "./StateManager";


export default class MultiStateManager extends StateManager{
    _stateName = 'default';
    _requestData = {};

    constructor( name = 'default') {
        super();
        this._stateName = name;
        this._state[name] = reactive({ count: 0, itemsIds: {}, items: [] });
    }
    //mutations


    public setCount(count:number){
        this._state[this._stateName].count = count;
        return this;
    };


    //getters
    // public getItems(){        return toRef(this._state[this._stateName], 'items'); };
    public count() {
        return toRef(this._state[this._stateName], 'count');
        }
    public setItems (items:any):this {
        this._state[this._stateName].items = items;
        if(items.length === 0){
            this._state[this._stateName].itemsIds = {};
            return this;
        }
        return this;
    }
}


// export const GlobalMultiStateManager = new MultiStateManager();