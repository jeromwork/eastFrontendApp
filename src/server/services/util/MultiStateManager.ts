import { ref, reactive, computed, toRef } from 'vue';



export default class MultiStateManager {
    _stateName = 'default';
    _requestData = {};
    private _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};

    constructor( name = 'default') {
        this._stateName = name;
        this._state[name] = reactive({ count: 0, itemsIds: {}, items: [] });
    }
    //mutations


    public setCount(count:number){
        this._state[this._stateName].count = count;
        return this;
    };


    //getters
    public getItems(){        return toRef(this._state[this._stateName], 'items'); };
    public count() {
        return toRef(this._state[this._stateName], 'count');
        }
    public setItems (items:any):MultiStateManager {
        this._state[this._stateName].items = items;
        if(items.length === 0){
            this._state[this._stateName].itemsIds = {};
            return this;
        }
        // let i = 0;
        // const itemsIds
        // for (const item of items) {
        //     if(!item.id) break;
        //     this._state[this._stateName].itemsIds[item.id] = i;
        //     i++;
        // }
        return this;
    }
}


// export const GlobalMultiStateManager = new MultiStateManager();