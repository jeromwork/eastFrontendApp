import { ref, reactive, computed, toRef } from 'vue';
import type DefaultState from "./DefaultState";

export default class MultiStateManager <T extends DefaultState = DefaultState>{
    protected _state: { [key: string]: any } = { };
    protected _stateName = 'default'
    _requestData = {};

    constructor( name = 'default') {
        this._stateName = name;
        this._state[name] = reactive({ count: 0, itemsIds: [], items: [] });
        this._state['_cash'] = reactive({});
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
        this.setCacheItems(items).setItemsIds(items);

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
        return computed(()=>this._state[this._stateName][key]).value;
        // return toRef(this._state[this._stateName], key);
    }


    public getItem<K extends keyof T>(val: string, field:string = 'id') {
        return computed(()=>{
            if(field === 'id'){
                return (this._state?._cash?.[val]) ? this._state._cash[val] : null;
            }else {
                return this._state._cash.find((item:any) => item[field] === val);
            }


        }).value;

    }

    setCacheItems( items:any[] ):this {
        const _cashItems = (this._state?.['_cash']) ? this._state?.['_cash'] : {};
        for(const i in items){
            const item = items[i];
            _cashItems[item.id] = (_cashItems[item.id]) ? Object.assign(_cashItems[item.id], item) : item;
        }
        this._state._cash = _cashItems;
        return this;
    }

    protected setItemsIds(items:any[]):this{
        const itemsIds = [];
        for(const i in items){
            const item = items[i];
            if(!item.id) throw new Error('not exists item id')
            itemsIds.push(item.id);
        }
        this._state[this._stateName]['itemsIds'] = itemsIds;
        return this;
    }


}


// export const GlobalMultiStateManager = new MultiStateManager();