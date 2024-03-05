import {computed, reactive} from "vue";
import {renderTemplate} from "rollup-plugin-visualizer/dist/plugin/render-template";

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

    public getItems():any[]|null{
        return computed(()=>(this._state?.items) ?? null).value;
    };

    public getItem(val: any, field:string = 'id'): any|null {
        return computed(()=>{
            if(!this._state?.items) return null;
            return (this._state.items.find((item:any) => item[field] === val)) ?? null;
        }).value;

    }


}