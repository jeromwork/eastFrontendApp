import {toRef, computed, ref} from "vue";

import DefaultState from "./DefaultState";
import {reactive} from "vue";

export default class StateManager extends DefaultState{
    protected _state: { [key: string]: { count: number; itemsIds: {}; items: any[] } } = {};

    

}
