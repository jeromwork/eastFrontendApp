import {toRef, computed} from "vue";

export default class StateManager {
    protected _stateName = 'default';
    protected _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};
    public getItems(){
        return computed(()=>this._state[this._stateName]).value.items; };
    public setItems (items:any):this {
        return this;
    }
}
