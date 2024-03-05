import {computed, reactive} from "vue";

export default class DefaultState {
    protected _state: { [key: string]: any } =  reactive({});
    public set(name: string, value: any): this {
        this._state[name] = value;
        return this;
    }


    public get(key: string) {
        return computed(()=>this._state[key]).value;
    }

    public setItems (items:any):this {
        this._state.items = (items.length === 0) ? items : {};
        return this;
    }

}