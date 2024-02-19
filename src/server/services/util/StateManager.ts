import {toRef} from "vue";

export default class StateManager {
    protected _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};
    public getItems(){        return toRef(this._state, 'items'); };
}
