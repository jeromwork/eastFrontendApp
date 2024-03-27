
import type {Ref} from "vue";
import type IScheduleState from "../interfaces/IScheduleState";
export default class BookingState implements IScheduleState{
    protected _slots: Ref<number[] | null> = ref(null);
    protected _selectedSlot:Ref<number | null> = ref(null);
    protected _selectedSlotError:Ref<string> = ref('');

    public selectedSlotCallback: (slot:number) => void = () => {};

    public setSelectedSlot(slot:number):this{
        this.selectedSlot = slot;
        return this;
}

    //public setSelectedSlot(slot:number){ }

    public get selectedSlot():number | null{
        return this._selectedSlot.value;

    }
    public set selectedSlot(slot: number | null){
        this._selectedSlot.value = slot;
        this.selectedSlotError = '';
        this.selectedSlotCallback(slot as number)
    }

    public get selectedSlotError():string{
        return this._selectedSlotError.value;
    }
    public set selectedSlotError(error:string ){
        this._selectedSlotError.value = error;
    }

    public get slots():number[] | null{
        return this._slots.value;
    }
    public set slots(slots:number[] | null ){
        this._slots.value = slots;
    }

}