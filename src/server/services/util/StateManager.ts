import {toRef, computed} from "vue";

interface DefaultStateObject {
    [key: string]: any;
}

export default class StateManager<T extends DefaultStateObject = DefaultStateObject> {
    protected _stateName = 'default';
    // protected _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};
    protected _state: { [key: string]: T } = {};

    public set<K extends keyof T>(name: K, value: T[K]): this {
        this._state[this._stateName][name] = value;
        return this;
    }

    public get<K extends keyof T>(key: K) {
        return toRef(this._state[this._stateName], key);
    }

    public getItems(){
        return computed(()=>this._state[this._stateName]).value.items;
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
