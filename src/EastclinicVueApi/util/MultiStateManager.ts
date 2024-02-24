import { ref, reactive, computed, toRef } from 'vue';
import type DefaultState from "./DefaultState";

export default class MultiStateManager <T extends DefaultState = DefaultState>{
    protected _state: { [key: string]: any } = { };
    protected _stateName = 'default'
    _requestData = {};

    constructor( name = 'default') {
        this._stateName = name;
        this._state[name] = reactive({ count: 0, itemsIds: {}, items: [] });
    }
    //mutations
    public set<K extends keyof T>(name: string, value: T[K]): this {
        this._state[this._stateName][name] = value;
        return this;
    }

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
        console.log(items)
        this._state[this._stateName].items = items;
        if(items.length === 0){
            this._state[this._stateName].itemsIds = {};
            return this;
        }
        return this;
    }

    public getItems(){
        return computed(()=>this._state[this._stateName]).value.items;
    };
    public get<K extends keyof T>(key: string) {
        return toRef(this._state[this._stateName], key);
    }


}


// export const GlobalMultiStateManager = new MultiStateManager();