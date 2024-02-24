import {toRef, computed} from "vue";

import type DefaultState from "./DefaultState";

export default class StateManager<T extends DefaultState = DefaultState> {
    // protected _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};
    protected _state: { [key: string]: T } = {};

    public set<K extends keyof T>(name: string, value: T[K]): this {
        this._state[name] = value;
        return this;
    }

    public get<K extends keyof T>(key: string) {
        return toRef(this._state, key);
    }

    public getItems(){
        return computed(()=>this._state).value.items;
    };
    public setItems (items:any):this {
        return this;
    }
    // public set(name: string, value: any): this {
    //     this._state[this._stateName][name] = value;
    //     return this;
    // }
    //
    // public get(key: string) {
    //     return toRef(this._state[this._stateName], key);
    // }


}
