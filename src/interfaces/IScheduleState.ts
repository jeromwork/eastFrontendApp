
import type {Ref} from "vue";

export default interface IScheduleState{
    slots: Readonly<number[]> | null;
    selectedSlot: number|null;
    selectedSlotError?:string;
}
